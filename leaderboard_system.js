// Leaderboard System for CyberGuard Academy
class LeaderboardSystem {
    constructor() {
        this.currentUser = null;
        this.currentView = 'overall';
        this.displayedUsers = 20;
        this.init();
    }

    init() {
        this.initializeVanta();
        this.loadCurrentUser();
        this.setupEventListeners();
        this.loadLeaderboard();
        this.initializeStatsChart();
    }

    initializeVanta() {
        VANTA.WAVES({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x6366f1,
            backgroundColor: 0x0f172a,
            waveHeight: 15.00,
            waveSpeed: 0.75,
            zoom: 0.65
        });
    }

    loadCurrentUser() {
        const authUser = sessionStorage.getItem('authUser') || localStorage.getItem('authUser');
        if (authUser) {
            this.currentUser = JSON.parse(authUser);
            this.showUserStats();
            this.setupUserMenu();
        }
    }

    setupUserMenu() {
        const userMenu = document.getElementById('user-menu');
        const username = document.getElementById('username');
        const userAvatar = document.getElementById('user-avatar');
        
        if (userMenu && this.currentUser) {
            userMenu.classList.remove('hidden');
            username.textContent = this.currentUser.username || this.currentUser.firstName;
            userAvatar.src = this.generateAvatar(this.currentUser.username || this.currentUser.firstName);
        }
    }

    generateAvatar(name) {
        const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
        const color = colors[name.charCodeAt(0) % colors.length];
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color.substring(1)}&color=fff&size=128`;
    }

    showUserStats() {
        const userStatsCard = document.getElementById('user-stats-card');
        if (!userStatsCard || !this.currentUser) return;

        userStatsCard.classList.remove('hidden');
        
        // Get user data from auth system
        const users = JSON.parse(localStorage.getItem('cyberGuardUsers') || '{}');
        const userData = users[this.currentUser.email];
        
        if (userData) {
            const stats = userData.leaderboardStats;
            const progress = userData.progress;
            
            // Update display
            document.getElementById('user-rank').textContent = stats.rank || '-';
            document.getElementById('user-display-name').textContent = `${userData.firstName} ${userData.lastName}`;
            document.getElementById('user-level-info').textContent = this.getLevelInfo(progress);
            document.getElementById('user-total-score').textContent = stats.totalScore.toLocaleString();
            document.getElementById('user-chapters').textContent = stats.chaptersCompleted;
            document.getElementById('user-accuracy').textContent = `${stats.quizAccuracy}%`;
            document.getElementById('user-streak').textContent = stats.studyStreak;
            document.getElementById('user-study-time').textContent = `${Math.floor(progress.totalStudyTime / 60)}h`;
            
            // Set rank badge color
            const rankBadge = document.getElementById('user-rank-badge');
            if (stats.rank === 1) {
                rankBadge.className = 'w-16 h-16 rank-1 rounded-full flex items-center justify-center text-2xl font-bold';
            } else if (stats.rank === 2) {
                rankBadge.className = 'w-16 h-16 rank-2 rounded-full flex items-center justify-center text-2xl font-bold';
            } else if (stats.rank === 3) {
                rankBadge.className = 'w-16 h-16 rank-3 rounded-full flex items-center justify-center text-2xl font-bold';
            } else {
                rankBadge.className = 'w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-2xl font-bold';
            }
        }
    }

    getLevelInfo(progress) {
        if (progress.level4 >= 100) return 'Level 4 - Strategic Leadership';
        if (progress.level3 >= 100) return 'Level 3 - Advanced Defense';
        if (progress.level2 >= 100) return 'Level 2 - Technical Implementation';
        return 'Level 1 - Foundation Building';
    }

    setupEventListeners() {
        // No additional event listeners needed
    }

    loadLeaderboard() {
        const users = JSON.parse(localStorage.getItem('cyberGuardUsers') || '{}');
        const userList = Object.values(users).filter(user => user.role !== 'admin');
        
        // Calculate rankings
        this.calculateRanks(userList);
        
        // Update current user rank
        if (this.currentUser && users[this.currentUser.email]) {
            this.updateCurrentUserRank(userList);
        }
        
        // Display leaderboard
        this.displayLeaderboard(userList);
        this.showRecentAchievements(userList);
        
        // Update total players
        document.getElementById('total-players').textContent = `${userList.length} players`;
    }

    calculateRanks(users) {
        // Sort by total score (primary), then by chapters completed, then by accuracy
        users.sort((a, b) => {
            const aStats = a.leaderboardStats;
            const bStats = b.leaderboardStats;
            
            if (bStats.totalScore !== aStats.totalScore) {
                return bStats.totalScore - aStats.totalScore;
            }
            if (bStats.chaptersCompleted !== aStats.chaptersCompleted) {
                return bStats.chaptersCompleted - aStats.chaptersCompleted;
            }
            return bStats.quizAccuracy - aStats.quizAccuracy;
        });
        
        // Assign ranks
        users.forEach((user, index) => {
            user.leaderboardStats.rank = index + 1;
        });
    }

    updateCurrentUserRank(userList) {
        const users = JSON.parse(localStorage.getItem('cyberGuardUsers') || '{}');
        const currentUserData = users[this.currentUser.email];
        if (currentUserData) {
            const rankedUser = userList.find(u => u.id === currentUserData.id);
            if (rankedUser) {
                currentUserData.leaderboardStats.rank = rankedUser.leaderboardStats.rank;
                users[this.currentUser.email] = currentUserData;
                localStorage.setItem('cyberGuardUsers', JSON.stringify(users));
            }
        }
    }

    displayLeaderboard(users) {
        const leaderboardList = document.getElementById('leaderboard-list');
        const podium = document.getElementById('podium');
        
        // Show top 3 on podium
        if (users.length >= 3) {
            podium.classList.remove('hidden');
            document.getElementById('rank-1-name').textContent = users[0].username;
            document.getElementById('rank-1-score').textContent = users[0].leaderboardStats.totalScore.toLocaleString();
            document.getElementById('rank-2-name').textContent = users[1].username;
            document.getElementById('rank-2-score').textContent = users[1].leaderboardStats.totalScore.toLocaleString();
            document.getElementById('rank-3-name').textContent = users[2].username;
            document.getElementById('rank-3-score').textContent = users[2].leaderboardStats.totalScore.toLocaleString();
        }
        
        // Display remaining users
        const startIndex = users.length >= 3 ? 3 : 0;
        const endIndex = Math.min(startIndex + this.displayedUsers, users.length);
        const usersToShow = users.slice(startIndex, endIndex);
        
        leaderboardList.innerHTML = usersToShow.map((user, index) => {
            const actualRank = startIndex + index + 1;
            return this.createUserCard(user, actualRank);
        }).join('');
        
        // Show/hide load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (endIndex < users.length) {
            loadMoreBtn.classList.remove('hidden');
        } else {
            loadMoreBtn.classList.add('hidden');
        }
    }

    createUserCard(user, rank) {
        const stats = user.leaderboardStats;
        const isCurrentUser = this.currentUser && user.email === this.currentUser.email;
        
        return `
            <div class="leaderboard-card bg-slate-800/50 rounded-lg p-4 border border-slate-700 ${isCurrentUser ? 'ring-2 ring-emerald-500' : ''}">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 ${this.getRankColor(rank)} rounded-full flex items-center justify-center font-bold text-lg">
                            ${rank}
                        </div>
                        <div class="flex items-center space-x-3">
                            <img src="${this.generateAvatar(user.username)}" alt="${user.username}" class="w-10 h-10 rounded-full">
                            <div>
                                <div class="font-semibold text-lg ${isCurrentUser ? 'text-emerald-400' : ''}">${user.username}</div>
                                <div class="text-sm text-slate-400">${user.firstName} ${user.lastName}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-right">
                        <div class="text-2xl font-bold text-emerald-400">${stats.totalScore.toLocaleString()}</div>
                        <div class="flex items-center space-x-4 text-sm text-slate-400">
                            <span>📚 ${stats.chaptersCompleted} chapters</span>
                            <span>🎯 ${stats.quizAccuracy}% accuracy</span>
                            <span>🔥 ${stats.studyStreak} day streak</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getRankColor(rank) {
        switch (rank) {
            case 1: return 'bg-yellow-500 text-black';
            case 2: return 'bg-gray-400 text-black';
            case 3: return 'bg-orange-500 text-white';
            default: return 'bg-slate-600 text-white';
        }
    }

    showRecentAchievements(users) {
        const achievements = [
            { icon: '🏆', text: 'Completed first chapter', user: 'CyberMaster', time: '2 hours ago' },
            { icon: '🎯', text: 'Scored 100% on quiz', user: 'SecurityPro', time: '4 hours ago' },
            { icon: '💪', text: 'Completed hard difficulty quiz', user: 'TechGuardian', time: '6 hours ago' },
            { icon: '📚', text: 'Completed 5 chapters', user: 'CodeNinja', time: '8 hours ago' },
            { icon: '⚡', text: '7-day study streak', user: 'CyberWarrior', time: '12 hours ago' }
        ];

        const container = document.getElementById('recent-achievements');
        container.innerHTML = achievements.map(achievement => `
            <div class="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                <div class="text-2xl">${achievement.icon}</div>
                <div class="flex-1">
                    <div class="text-sm font-medium">${achievement.text}</div>
                    <div class="text-xs text-slate-400">${achievement.user} • ${achievement.time}</div>
                </div>
            </div>
        `).join('');
    }

    initializeStatsChart() {
        const data = [
            {
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                y: [45, 68, 92, 125, 178, 245],
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Active Users',
                line: { color: '#10b981', width: 3 },
                marker: { color: '#10b981', size: 8 }
            },
            {
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                y: [12, 25, 38, 52, 78, 112],
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Chapters Completed',
                line: { color: '#3b82f6', width: 3 },
                marker: { color: '#3b82f6', size: 8 }
            }
        ];

        const layout = {
            title: {
                text: 'Platform Growth',
                font: { color: '#ffffff', size: 16 }
            },
            xaxis: {
                title: 'Month',
                color: '#94a3b8',
                gridcolor: '#334155'
            },
            yaxis: {
                title: 'Count',
                color: '#94a3b8',
                gridcolor: '#334155'
            },
            plot_bgcolor: 'transparent',
            paper_bgcolor: 'transparent',
            font: { color: '#ffffff' },
            legend: {
                x: 0,
                y: 1,
                bgcolor: 'rgba(15, 23, 42, 0.8)',
                bordercolor: '#334155',
                borderwidth: 1
            },
            margin: { t: 50, r: 20, b: 50, l: 60 }
        };

        const config = {
            displayModeBar: false,
            responsive: true
        };

        Plotly.newPlot('stats-chart', data, layout, config);
    }

    switchLeaderboard(view) {
        this.currentView = view;
        
        // Update tab styles
        document.querySelectorAll('[id^="tab-"]').forEach(tab => {
            tab.className = 'px-6 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 font-medium transition-colors';
        });
        document.getElementById(`tab-${view}`).className = 'px-6 py-2 rounded-lg bg-emerald-600 text-white font-medium transition-colors';
        
        // Update title
        const titles = {
            overall: 'Overall Leaderboard',
            weekly: 'Weekly Leaderboard',
            monthly: 'Monthly Leaderboard',
            achievements: 'Achievement Leaderboard'
        };
        document.getElementById('leaderboard-title').textContent = titles[view];
        
        // Reload with filtered data
        this.loadLeaderboard();
    }

    loadMoreUsers() {
        this.displayedUsers += 20;
        this.loadLeaderboard();
    }
}

// Global functions
function switchLeaderboard(view) {
    leaderboardSystem.switchLeaderboard(view);
}

function loadMoreUsers() {
    leaderboardSystem.loadMoreUsers();
}

function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('hidden');
}

// Initialize leaderboard system
const leaderboardSystem = new LeaderboardSystem();

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const userMenu = document.getElementById('user-menu');
    const dropdown = document.getElementById('user-dropdown');
    
    if (userMenu && !userMenu.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});

// Update leaderboard when user completes activities
function updateLeaderboard(email, activityData) {
    const users = JSON.parse(localStorage.getItem('cyberGuardUsers') || '{}');
    const user = users[email];
    
    if (user) {
        const stats = user.leaderboardStats;
        
        // Update based on activity
        if (activityData.quizCompleted) {
            stats.totalScore += activityData.score || 0;
            
            // Update accuracy
            const totalQuizzes = (stats.totalQuizzes || 0) + 1;
            const correctAnswers = (stats.correctAnswers || 0) + (activityData.correctAnswers || 0);
            const totalQuestions = (stats.totalQuestions || 0) + (activityData.totalQuestions || 0);
            
            stats.totalQuizzes = totalQuizzes;
            stats.correctAnswers = correctAnswers;
            stats.totalQuestions = totalQuestions;
            stats.quizAccuracy = Math.round((correctAnswers / totalQuestions) * 100) || 0;
        }
        
        if (activityData.chapterCompleted) {
            stats.chaptersCompleted = Math.min(stats.chaptersCompleted + 1, 16);
            stats.totalScore += 100; // Bonus for completing chapter
        }
        
        if (activityData.studyTime) {
            stats.studyStreak = Math.max(stats.studyStreak + 1, 1);
        }
        
        stats.lastUpdated = new Date().toISOString();
        
        users[email] = user;
        localStorage.setItem('cyberGuardUsers', JSON.stringify(users));
    }
}

// Export for global access
window.updateLeaderboard = updateLeaderboard;