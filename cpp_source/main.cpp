/*
 * Survive the Night - C++ Multithreading Demo
 * Parallel and Distributed Computing Lab Project
 *
 * Team: Hifsa Jabeen Satti, Ayesha Khan, Aliza Ali
 *
 * This program demonstrates key multithreading concepts:
 * - std::thread for concurrent execution
 * - std::mutex for shared resource protection
 * - std::condition_variable for thread synchronization
 * - std::atomic for lock-free operations
 * - Deadlock demonstration and prevention
 *
 * Compile: g++ -std=c++17 -pthread main.cpp -o survive_the_night
 * Run:     ./survive_the_night
 */

#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <atomic>
#include <chrono>
#include <vector>
#include <string>
#include <random>
#include <functional>

using namespace std;

// ============================================================
// Game Constants
// ============================================================
const int NUM_ENEMIES = 4;
const int NUM_COLLECTIBLES = 3;
const int GAME_DURATION_SECONDS = 15;

// ============================================================
// Shared Game State (protected by mutex)
// ============================================================
struct GameState {
    int fox_health = 10;
    int fox_score = 0;
    int enemies_defeated = 0;
    bool game_running = true;
    string current_zone = "Enchanted Forest";

    // Zones to traverse
    vector<string> zones = {
        "Enchanted Forest",
        "Crystal Cave",
        "Storm Peaks",
        "Shadow Realm"
    };
    int zone_index = 0;
};

// Shared state and mutex
GameState g_state;
mutex g_mutex;
condition_variable g_cv;
atomic<int> active_threads{0};

// ============================================================
// Utility: Random number generator
// ============================================================
int random_int(int min_val, int max_val) {
    static thread_local mt19937 rng(random_device{}());
    uniform_int_distribution<int> dist(min_val, max_val);
    return dist(rng);
}

void print_safe(const string& msg) {
    lock_guard<mutex> lock(g_mutex);
    cout << msg << endl;
}

// ============================================================
// Thread 1: Enemy Thread
// Each enemy runs in its own thread, trying to attack the fox
// ============================================================
void enemy_thread(int enemy_id, const string& enemy_type) {
    active_threads++;
    print_safe("[Enemy #" + to_string(enemy_id) + " " + enemy_type + "] Spawned!");

    while (true) {
        {
            lock_guard<mutex> lock(g_mutex);
            if (!g_state.game_running) break;
        }

        // Simulate enemy movement/thinking
        this_thread::sleep_for(chrono::milliseconds(random_int(800, 2000)));

        {
            lock_guard<mutex> lock(g_mutex);
            if (!g_state.game_running) break;

            // Random chance to attack
            if (random_int(1, 100) <= 40) {
                int damage = random_int(1, 3);
                g_state.fox_health -= damage;
                cout << "[Enemy #" << enemy_id << " " << enemy_type << "] "
                     << "attacks for " << damage << " damage! "
                     << "(Fox HP: " << g_state.fox_health << ")" << endl;

                if (g_state.fox_health <= 0) {
                    g_state.fox_health = 0;
                    g_state.game_running = false;
                    g_cv.notify_all();
                    break;
                }
            } else {
                cout << "[Enemy #" << enemy_id << " " << enemy_type << "] "
                     << "misses the attack!" << endl;
            }
        }

        this_thread::sleep_for(chrono::milliseconds(500));
    }

    print_safe("[Enemy #" + to_string(enemy_id) + " " + enemy_type + "] Despawned.");
    active_threads--;
}

// ============================================================
// Thread 2: Collectible Thread
// Spawns collectibles that the fox can pick up
// ============================================================
void collectible_thread(int item_id) {
    active_threads++;
    vector<string> items = {"Berry", "Firefly", "Potato", "Aliza's Shield", "Hifsa's Speed Boost"};

    string item_name = items[item_id % items.size()];
    print_safe("[Collectible] " + item_name + " appeared!");

    while (true) {
        {
            lock_guard<mutex> lock(g_mutex);
            if (!g_state.game_running) break;
        }

        this_thread::sleep_for(chrono::milliseconds(random_int(1500, 3000)));

        {
            lock_guard<mutex> lock(g_mutex);
            if (!g_state.game_running) break;

            // Random chance the fox collects it
            if (random_int(1, 100) <= 50) {
                int points = 0;
                if (item_name == "Berry") points = 10;
                else if (item_name == "Firefly") points = 25;
                else if (item_name == "Potato") points = 100;
                else if (item_name == "Aliza's Shield") {
                    points = 50;
                    g_state.fox_health = min(g_state.fox_health + 2, 10);
                    cout << "[Collectible] Aliza's Shield activated! Minty fresh protection! (+2 HP)" << endl;
                }
                else if (item_name == "Hifsa's Speed Boost") {
                    points = 50;
                    cout << "[Collectible] Hifsa's Speed Boost! She's fast at coding too!" << endl;
                }

                g_state.fox_score += points;
                cout << "[Collectible] Fox found " << item_name << "! +"
                     << points << " points (Score: " << g_state.fox_score << ")" << endl;
            }
        }
    }

    active_threads--;
}

// ============================================================
// Thread 3: Zone Progression Thread
// Advances the fox through different zones
// ============================================================
void zone_thread() {
    active_threads++;

    while (true) {
        {
            lock_guard<mutex> lock(g_mutex);
            if (!g_state.game_running) break;
            if (g_state.zone_index >= (int)g_state.zones.size() - 1) break;
        }

        this_thread::sleep_for(chrono::seconds(random_int(3, 5)));

        {
            lock_guard<mutex> lock(g_mutex);
            if (!g_state.game_running) break;

            g_state.zone_index++;
            g_state.current_zone = g_state.zones[g_state.zone_index];
            cout << "\n========================================" << endl;
            cout << "[ZONE] Entering: " << g_state.current_zone << endl;
            cout << "========================================\n" << endl;
        }
    }

    active_threads--;
}

// ============================================================
// Thread 4: Fox/Player Thread
// The fox fights back!
// ============================================================
void fox_thread() {
    active_threads++;
    print_safe("[Fox] The fox begins its journey through the night...");

    while (true) {
        {
            lock_guard<mutex> lock(g_mutex);
            if (!g_state.game_running) break;
        }

        this_thread::sleep_for(chrono::milliseconds(random_int(1000, 2500)));

        {
            lock_guard<mutex> lock(g_mutex);
            if (!g_state.game_running) break;

            // Fox attacks an enemy
            if (random_int(1, 100) <= 55) {
                g_state.enemies_defeated++;
                g_state.fox_score += 50;
                cout << "[Fox] Attack hits! Enemy defeated! "
                     << "(Defeated: " << g_state.enemies_defeated
                     << ", Score: " << g_state.fox_score << ")" << endl;
            } else {
                cout << "[Fox] Attack missed!" << endl;
            }

            // Random potato find (1% chance)
            if (random_int(1, 100) == 1) {
                g_state.fox_score += 100;
                cout << "[Fox] +1 FOUND A POTATO... nice" << endl;
            }

            // Random trip (1% chance)
            if (random_int(1, 100) == 1) {
                cout << "[Fox] The fox tripped! (1% chance lol)" << endl;
            }
        }
    }

    active_threads--;
}

// ============================================================
// Thread 5: Game Timer Thread
// Controls the overall game duration
// ============================================================
void timer_thread(int duration_seconds) {
    active_threads++;
    print_safe("[Timer] Game started! Survive for " + to_string(duration_seconds) + " seconds!");

    for (int i = duration_seconds; i > 0; i--) {
        {
            lock_guard<mutex> lock(g_mutex);
            if (!g_state.game_running) break;
        }

        if (i <= 5 || i % 5 == 0) {
            cout << "[Timer] " << i << " seconds remaining..." << endl;
        }

        this_thread::sleep_for(chrono::seconds(1));
    }

    {
        lock_guard<mutex> lock(g_mutex);
        if (g_state.game_running) {
            g_state.game_running = false;
            cout << "\n========================================" << endl;
            cout << "[Timer] TIME'S UP! YOU SURVIVED THE NIGHT!" << endl;
            cout << "========================================\n" << endl;
            g_cv.notify_all();
        }
    }

    active_threads--;
}

// ============================================================
// DEADLOCK DEMONSTRATION
// Shows how deadlock can occur and how to prevent it
// ============================================================
mutex mutex_a;
mutex mutex_b;

void deadlock_thread_1() {
    cout << "\n[Deadlock Demo] Thread 1 trying to lock A then B..." << endl;
    lock_guard<mutex> lock_a(mutex_a);
    this_thread::sleep_for(chrono::milliseconds(100));
    cout << "[Deadlock Demo] Thread 1 locked A, now trying B..." << endl;
    // This would cause deadlock if Thread 2 holds B
    // lock_guard<mutex> lock_b(mutex_b);  // DANGEROUS!
    cout << "[Deadlock Demo] Thread 1 would deadlock here in naive implementation!" << endl;
}

void deadlock_thread_2() {
    cout << "[Deadlock Demo] Thread 2 trying to lock B then A..." << endl;
    lock_guard<mutex> lock_b(mutex_b);
    this_thread::sleep_for(chrono::milliseconds(100));
    cout << "[Deadlock Demo] Thread 2 locked B, now trying A..." << endl;
    // This would cause deadlock if Thread 1 holds A
    // lock_guard<mutex> lock_a(mutex_a);  // DANGEROUS!
    cout << "[Deadlock Demo] Thread 2 would deadlock here in naive implementation!" << endl;
}

void demonstrate_deadlock_prevention() {
    cout << "\n╔══════════════════════════════════════╗" << endl;
    cout << "║     DEADLOCK DEMONSTRATION           ║" << endl;
    cout << "╚══════════════════════════════════════╝\n" << endl;

    cout << "Naive approach (would cause deadlock):" << endl;
    cout << "  Thread 1: lock(A) -> lock(B)" << endl;
    cout << "  Thread 2: lock(B) -> lock(A)" << endl;
    cout << "  Result: DEADLOCK! Both wait forever.\n" << endl;

    cout << "Safe approach using std::lock():" << endl;
    cout << "  std::lock(mutex_a, mutex_b) locks both atomically!" << endl;

    // Safe: using std::lock to acquire both mutexes atomically
    {
        mutex local_a, local_b;
        std::lock(local_a, local_b);
        lock_guard<mutex> la(local_a, adopt_lock);
        lock_guard<mutex> lb(local_b, adopt_lock);
        cout << "  Both mutexes locked safely! No deadlock.\n" << endl;
    }

    cout << "Another safe approach: consistent lock ordering" << endl;
    cout << "  Thread 1: lock(A) -> lock(B)" << endl;
    cout << "  Thread 2: lock(A) -> lock(B)  // Same order!" << endl;
    cout << "  Result: No deadlock - consistent ordering prevents circular wait.\n" << endl;
}

// ============================================================
// MAIN
// ============================================================
int main() {
    cout << "╔════════════════════════════════════════════╗" << endl;
    cout << "║     SURVIVE THE NIGHT                      ║" << endl;
    cout << "║     C++ Multithreading Demo                ║" << endl;
    cout << "║     Parallel & Distributed Computing Lab   ║" << endl;
    cout << "║                                            ║" << endl;
    cout << "║     Team: Hifsa, Ayesha & Aliza           ║" << endl;
    cout << "╚════════════════════════════════════════════╝\n" << endl;

    // ---- Part 1: Deadlock Demonstration ----
    demonstrate_deadlock_prevention();

    cout << "Starting game simulation...\n" << endl;
    cout << "========================================" << endl;
    cout << "[ZONE] Starting in: Enchanted Forest" << endl;
    cout << "========================================\n" << endl;

    // ---- Part 2: Game Simulation with Threads ----
    vector<thread> threads;

    // Enemy threads
    vector<string> enemy_types = {"Slime", "Bat", "Golem", "Shadow"};
    for (int i = 0; i < NUM_ENEMIES; i++) {
        threads.emplace_back(enemy_thread, i + 1, enemy_types[i]);
    }

    // Collectible threads
    for (int i = 0; i < NUM_COLLECTIBLES; i++) {
        threads.emplace_back(collectible_thread, i);
    }

    // Zone progression thread
    threads.emplace_back(zone_thread);

    // Fox thread
    threads.emplace_back(fox_thread);

    // Timer thread
    threads.emplace_back(timer_thread, GAME_DURATION_SECONDS);

    // Wait for all threads to complete
    for (auto& t : threads) {
        if (t.joinable()) {
            t.join();
        }
    }

    // ---- Final Score ----
    cout << "\n╔══════════════════════════════════════╗" << endl;
    cout << "║          GAME RESULTS                ║" << endl;
    cout << "╠══════════════════════════════════════╣" << endl;

    {
        lock_guard<mutex> lock(g_mutex);
        cout << "║  Final Score:    " << g_state.fox_score << endl;
        cout << "║  Fox Health:     " << g_state.fox_health << "/10" << endl;
        cout << "║  Enemies Killed: " << g_state.enemies_defeated << endl;
        cout << "║  Zone Reached:   " << g_state.current_zone << endl;

        if (g_state.fox_health > 0) {
            cout << "║  Status:         SURVIVED!" << endl;
        } else {
            cout << "║  Status:         RIP little guy" << endl;
        }
    }

    cout << "╚══════════════════════════════════════╝\n" << endl;

    cout << "Active threads remaining: " << active_threads << endl;
    cout << "\nTHANKS FOR PLAYING!" << endl;

    return 0;
}
