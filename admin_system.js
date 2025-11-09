// Admin System for CyberGuard Academy
class AdminSystem {
    constructor() {
        this.currentTab = 'overview';
        this.users = [];
        this.filteredUsers = [];
        this.init();
    }

    init() {
        this.initializeVanta();
        this.loadUsers();
        this.initializeCharts();
        this.loadOverviewStats();
        this.loadRecentActivity();
        this.loadUsersTable();
    }

    initializeVanta() {
        VANTA.FOG({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0x10b981,
            midtoneColor: 0x0f172a,
            lowlightColor: 0x1e293b,
            baseColor: 0x0f172a,
            blurFactor: 0.6,
            speed: 1.0,
            zoom: 1.0
        });
    }

    loadUsers() {
        const usersData = JSON.parse(localStorage.getItem('cyberGuardUsers') || '{}');
        this.users = Object.values(usersData);
        this.filteredUsers = [...this.users];
    }

    loadOverviewStats() {
        const totalUsers = this.users.length;
        const activeToday = this.users.filter(user => {
            const lastLogin = new Date(user.lastLogin || 0);
            const today = new Date();
            return (today - lastLogin) < (24 * 60 * 60 * 1000);
        }).length;
        
        const totalQuizzes = this.users.reduce((sum, user) => {
            return sum + (user.progress?.completedQuizzes?.length || 0);
        }, 0);
        
        const avgScore = this.calculateAverageScore();
        
        // Update sidebar
        document.getElementById('total-users').textContent = totalUsers;
        document.getElementById('active-today').textContent = activeToday;
        document.getElementById('total-quizzes').textContent = totalQuizzes;
        
        // Update overview cards
        document.getElementById('overview-users').textContent = totalUsers;
        document.getElementById('overview-chapters').textContent = this.getTotalChaptersCompleted();
        document.getElementById('overview-quizzes').textContent = totalQuizzes;
        document.getElementById('overview-avg-score').textContent = `${avgScore}%`;
    }

    calculateAverageScore() {
        const usersWithQuizzes = this.users.filter(user => 
            user.progress?.completedQuizzes && user.progress.completedQuizzes.length > 0
        );
        
        if (usersWithQuizzes.length === 0) return 0;
        
        const totalScore = usersWithQuizzes.reduce((sum, user) => {
            const scores = user.progress.completedQuizzes.map(q => q.score || 0);
            const avgScore = scores.reduce((s, score) => s + score, 0) / scores.length;
            return sum + avgScore;
        }, 0);
        
        return Math.round(totalScore / usersWithQuizzes.length);
    }

    getTotalChaptersCompleted() {
        return this.users.reduce((sum, user) => {
            return sum + (user.progress?.completedChapters?.length || 0);
        }, 0);
    }

    loadRecentActivity() {
        const activities = [
            { user: 'john.doe@email.com', action: 'Completed Chapter 1-1', time: '2 hours ago', type: 'chapter' },
            { user: 'jane.smith@email.com', action: 'Scored 85% on quiz', time: '3 hours ago', type: 'quiz' },
            { user: 'mike.wilson@email.com', action: 'Joined platform', time: '5 hours ago', type: 'join' },
            { user: 'sarah.jones@email.com', action: 'Completed Chapter 2-3', time: '6 hours ago', type: 'chapter' },
            { user: 'alex.brown@email.com', action: 'Scored 92% on quiz', time: '8 hours ago', type: 'quiz' }
        ];

        const container = document.getElementById('recent-activity');
        container.innerHTML = activities.map(activity => {
            const icon = this.getActivityIcon(activity.type);
            const color = this.getActivityColor(activity.type);
            
            return `
                <div class="flex items-center space-x-4 p-3 bg-slate-800/50 rounded-lg">
                    <div class="w-10 h-10 ${color} rounded-full flex items-center justify-center">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold">${activity.action}</div>
                        <div class="text-sm text-slate-400">${activity.user} • ${activity.time}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    getActivityIcon(type) {
        switch (type) {
            case 'chapter': return 'fa-book';
            case 'quiz': return 'fa-question-circle';
            case 'join': return 'fa-user-plus';
            default: return 'fa-info-circle';
        }
    }

    getActivityColor(type) {
        switch (type) {
            case 'chapter': return 'bg-emerald-600';
            case 'quiz': return 'bg-blue-600';
            case 'join': return 'bg-purple-600';
            default: return 'bg-slate-600';
        }
    }

    initializeCharts() {
        this.initializeUserGrowthChart();
        this.initializeChapterChart();
        this.initializeQuizPerformanceChart();
        this.initializeEngagementChart();
    }

    initializeUserGrowthChart() {
        const data = [
            {
                x: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                y: [12, 25, 38, 52, 78, 112],
                type: 'scatter',
                mode: 'lines+markers',
                name: 'New Users',
                line: { color: '#10b981', width: 3 },
                marker: { color: '#10b981', size: 8 }
            },
            {
                x: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                y: [8, 18, 28, 35, 45, 58],
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Active Users',
                line: { color: '#3b82f6', width: 3 },
                marker: { color: '#3b82f6', size: 8 }
            }
        ];

        const layout = {
            title: {
                text: 'User Growth Trends',
                font: { color: '#ffffff', size: 16 }
            },
            xaxis: {
                title: 'Time Period',
                color: '#94a3b8',
                gridcolor: '#334155'
            },
            yaxis: {
                title: 'Number of Users',
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

        Plotly.newPlot('user-growth-chart', data, layout, config);
    }

    initializeChapterChart() {
        const data = [
            {
                values: [45, 38, 28, 16],
                labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
                type: 'pie',
                hole: 0.4,
                marker: {
                    colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
                },
                textinfo: 'label+percent',
                textposition: 'outside',
                textfont: { color: '#ffffff' }
            }
        ];

        const layout = {
            title: {
                text: 'Chapter Completion by Level',
                font: { color: '#ffffff', size: 16 }
            },
            plot_bgcolor: 'transparent',
            paper_bgcolor: 'transparent',
            font: { color: '#ffffff' },
            showlegend: false,
            margin: { t: 50, r: 20, b: 20, l: 20 }
        };

        const config = {
            displayModeBar: false,
            responsive: true
        };

        Plotly.newPlot('chapter-chart', data, layout, config);
    }

    initializeQuizPerformanceChart() {
        const data = [
            {
                x: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
                y: [85, 78, 72, 68],
                type: 'bar',
                name: 'Easy',
                marker: { color: '#10b981' }
            },
            {
                x: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
                y: [78, 71, 65, 61],
                type: 'bar',
                name: 'Medium',
                marker: { color: '#f59e0b' }
            },
            {
                x: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
                y: [71, 64, 58, 54],
                type: 'bar',
                name: 'Hard',
                marker: { color: '#ef4444' }
            }
        ];

        const layout = {
            title: {
                text: 'Quiz Performance by Level',
                font: { color: '#ffffff', size: 16 }
            },
            xaxis: {
                title: 'Level',
                color: '#94a3b8',
                gridcolor: '#334155'
            },
            yaxis: {
                title: 'Average Score (%)',
                color: '#94a3b8',
                gridcolor: '#334155'
            },
            plot_bgcolor: 'transparent',
            paper_bgcolor: 'transparent',
            font: { color: '#ffffff' },
            barmode: 'group',
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

        Plotly.newPlot('quiz-performance-chart', data, layout, config);
    }

    initializeEngagementChart() {
        const data = [
            {
                x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                y: [45, 52, 38, 67, 73, 41, 29],
                type: 'scatter',
                mode: 'lines+markers',
                fill: 'tonexty',
                fillcolor: 'rgba(16, 185, 129, 0.2)',
                line: { color: '#10b981', width: 3 },
                marker: { color: '#10b981', size: 8 },
                name: 'Daily Active Users'
            }
        ];

        const layout = {
            title: {
                text: 'Weekly User Engagement',
                font: { color: '#ffffff', size: 16 }
            },
            xaxis: {
                title: 'Day of Week',
                color: '#94a3b8',
                gridcolor: '#334155'
            },
            yaxis: {
                title: 'Active Users',
                color: '#94a3b8',
                gridcolor: '#334155'
            },
            plot_bgcolor: 'transparent',
            paper_bgcolor: 'transparent',
            font: { color: '#ffffff' },
            showlegend: false,
            margin: { t: 50, r: 20, b: 50, l: 60 }
        };

        const config = {
            displayModeBar: false,
            responsive: true
        };

        Plotly.newPlot('engagement-chart', data, layout, config);
    }

    loadUsersTable() {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;

        tbody.innerHTML = this.filteredUsers.map(user => {
            const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never';
            const progress = this.calculateUserProgress(user);
            
            return `
                <tr class="hover:bg-slate-800/30">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <img src="${this.generateAvatar(user.username)}" alt="${user.username}" class="w-8 h-8 rounded-full mr-3">
                            <div>
                                <div class="font-semibold">${user.username}</div>
                                <div class="text-sm text-slate-400">${user.firstName} ${user.lastName}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-slate-300">${user.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'}">
                            ${user.role}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="w-16 bg-slate-700 rounded-full h-2">
                            <div class="bg-emerald-600 h-2 rounded-full" style="width: ${progress}%"></div>
                        </div>
                        <div class="text-xs text-slate-400 mt-1">${progress}%</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-slate-300">${lastLogin}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex space-x-2">
                            <button onclick="viewUser('${user.email}')" class="text-blue-400 hover:text-blue-300">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="editUser('${user.email}')" class="text-yellow-400 hover:text-yellow-300">
                                <i class="fas fa-edit"></i>
                            </button>
                            ${user.role !== 'admin' ? `
                                <button onclick="deleteUser('${user.email}')" class="text-red-400 hover:text-red-300">
                                    <i class="fas fa-trash"></i>
                                </button>
                            ` : ''}
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    calculateUserProgress(user) {
        if (!user.progress) return 0;
        const completedChapters = user.progress.completedChapters?.length || 0;
        return Math.round((completedChapters / 16) * 100);
    }

    generateAvatar(name) {
        const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
        const color = colors[name.charCodeAt(0) % colors.length];
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color.substring(1)}&color=fff&size=128`;
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Update sidebar
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        document.getElementById(`tab-${tabName}`).classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`content-${tabName}`).classList.remove('hidden');
        
        // Load tab-specific data
        switch (tabName) {
            case 'users':
                this.loadUsersTable();
                break;
            case 'analytics':
                // Charts are already initialized
                break;
        }
    }

    searchUsers(query) {
        this.filteredUsers = this.users.filter(user => {
            const searchTerm = query.toLowerCase();
            return user.username.toLowerCase().includes(searchTerm) ||
                   user.firstName.toLowerCase().includes(searchTerm) ||
                   user.lastName.toLowerCase().includes(searchTerm) ||
                   user.email.toLowerCase().includes(searchTerm);
        });
        this.loadUsersTable();
    }

    filterUsers(filter) {
        switch (filter) {
            case 'active':
                this.filteredUsers = this.users.filter(user => {
                    const lastLogin = new Date(user.lastLogin || 0);
                    const weekAgo = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));
                    return lastLogin > weekAgo;
                });
                break;
            case 'inactive':
                this.filteredUsers = this.users.filter(user => {
                    const lastLogin = new Date(user.lastLogin || 0);
                    const monthAgo = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));
                    return lastLogin < monthAgo;
                });
                break;
            case 'admin':
                this.filteredUsers = this.users.filter(user => user.role === 'admin');
                break;
            default:
                this.filteredUsers = [...this.users];
        }
        this.loadUsersTable();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: 'bg-emerald-600',
            error: 'bg-red-600',
            warning: 'bg-yellow-600',
            info: 'bg-blue-600'
        };
        
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Global functions
function switchTab(tabName) {
    adminSystem.switchTab(tabName);
}

function viewUser(email) {
    const user = adminSystem.users.find(u => u.email === email);
    if (user) {
        const details = `
            Name: ${user.firstName} ${user.lastName}
            Email: ${user.email}
            Username: ${user.username}
            Role: ${user.role}
            Joined: ${new Date(user.createdAt).toLocaleDateString()}
            Last Login: ${user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
            Chapters Completed: ${user.progress?.completedChapters?.length || 0}/16
            Total Score: ${user.leaderboardStats?.totalScore || 0}
        `;
        alert(details);
    }
}

function editUser(email) {
    adminSystem.showNotification('User editing feature coming soon!', 'info');
}

function deleteUser(email) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        if (authSystem.deleteUser(email)) {
            adminSystem.showNotification('User deleted successfully', 'success');
            adminSystem.loadUsers();
            adminSystem.loadUsersTable();
            adminSystem.loadOverviewStats();
        } else {
            adminSystem.showNotification('Failed to delete user', 'error');
        }
    }
}

function exportUsers() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        "Name,Email,Role,Chapters Completed,Total Score,Last Login\n" +
        adminSystem.filteredUsers.map(user => 
            `"${user.firstName} ${user.lastName}","${user.email}","${user.role}",${user.progress?.completedChapters?.length || 0},${user.leaderboardStats?.totalScore || 0},"${user.lastLogin || 'Never'}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    adminSystem.showNotification('User data exported successfully', 'success');
}

function confirmDataReset() {
    const confirmation = prompt('Type "RESET ALL DATA" to confirm:');
    if (confirmation === 'RESET ALL DATA') {
        if (confirm('This will delete ALL user data and progress. Are you absolutely sure?')) {
            localStorage.clear();
            adminSystem.showNotification('All data has been reset', 'success');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    } else {
        adminSystem.showNotification('Data reset cancelled', 'info');
    }
}

// Search and filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('user-search');
    const filterSelect = document.getElementById('user-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            adminSystem.searchUsers(this.value);
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            adminSystem.filterUsers(this.value);
        });
    }
});

// Initialize admin system
const adminSystem = new AdminSystem();