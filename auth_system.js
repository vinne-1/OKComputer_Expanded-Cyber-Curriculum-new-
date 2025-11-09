// Enhanced Authentication System for CyberGuard Academy
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        this.initializeVanta();
        this.setupEventListeners();
        this.checkAuthState();
    }

    initializeVanta() {
        VANTA.TOPOLOGY({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x6366f1,
            backgroundColor: 0x0f172a
        });
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup();
            });
        }

        // Forgot password form
        const forgotForm = document.getElementById('forgotForm');
        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleForgotPassword();
            });
        }
    }

    loadUsers() {
        const saved = localStorage.getItem('cyberGuardUsers');
        const defaultUsers = {
            'admin@cyberguard.com': {
                id: 'admin_001',
                email: 'admin@cyberguard.com',
                username: 'admin',
                firstName: 'System',
                lastName: 'Administrator',
                password: this.hashPassword('admin123'),
                role: 'admin',
                createdAt: new Date().toISOString(),
                lastLogin: null,
                isVerified: true,
                progress: {
                    level1: 100,
                    level2: 100,
                    level3: 100,
                    level4: 100,
                    completedChapters: ['1-1', '1-2', '1-3', '1-4', '2-1', '2-2', '2-3', '2-4', '3-1', '3-2', '3-3', '3-4', '4-1', '4-2', '4-3', '4-4'],
                    totalStudyTime: 999999,
                    completedQuizzes: []
                },
                achievements: ['first_quiz', 'level1_master', 'quiz_warrior', 'chapter_explorer', 'difficulty_master', 'all_levels'],
                leaderboardStats: {
                    totalScore: 999999,
                    quizAccuracy: 100,
                    studyStreak: 365,
                    chaptersCompleted: 16,
                    rank: 1
                }
            }
        };
        return saved ? JSON.parse(saved) : defaultUsers;
    }

    saveUsers() {
        localStorage.setItem('cyberGuardUsers', JSON.stringify(this.users));
    }

    hashPassword(password) {
        // Simple hash function for demo purposes
        // In production, use bcrypt or similar
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        const user = this.users[email];
        if (!user) {
            this.showNotification('Invalid email or password', 'error');
            return;
        }

        if (user.password !== this.hashPassword(password)) {
            this.showNotification('Invalid email or password', 'error');
            return;
        }

        // Require email verification before login
        if (!user.isVerified) {
            this.showNotification('Please verify your email to continue', 'warning');
            this.showVerificationModal(email);
            return;
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        this.saveUsers();

        // Set current user
        this.currentUser = user;
        this.setAuthUser(user, rememberMe);

        this.showNotification(`Welcome back, ${user.firstName}!`, 'success');
        
        // Redirect based on role
        setTimeout(() => {
            if (user.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        }, 1500);
    }

    handleSignup() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('signupEmail').value.trim().toLowerCase();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        // Validation
        if (!firstName || !lastName || !email || !username || !password) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (!agreeTerms) {
            this.showNotification('Please agree to the Terms of Service and Privacy Policy', 'error');
            return;
        }

        if (password.length < 8) {
            this.showNotification('Password must be at least 8 characters long', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }

        if (this.users[email]) {
            this.showNotification('Email address already registered', 'error');
            return;
        }

        // Check if username is taken
        const usernameTaken = Object.values(this.users).some(user => user.username === username);
        if (usernameTaken) {
            this.showNotification('Username already taken', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: this.generateUserId(),
            email: email,
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: this.hashPassword(password),
            role: 'student',
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isVerified: false,
            progress: {
                level1: 0,
                level2: 0,
                level3: 0,
                level4: 0,
                completedChapters: [],
                totalStudyTime: 0,
                completedQuizzes: []
            },
            achievements: [],
            leaderboardStats: {
                totalScore: 0,
                quizAccuracy: 0,
                studyStreak: 0,
                chaptersCompleted: 0,
                rank: 0
            }
        };

        // Attach verification metadata
        const verificationCode = this.generateVerificationCode();
        newUser.verification = {
            code: verificationCode,
            generatedAt: Date.now(),
            expiresAt: Date.now() + (15 * 60 * 1000), // 15 minutes
            attempts: 0
        };

        this.users[email] = newUser;
        this.saveUsers();

        this.showNotification('Account created! We sent a verification code to your email.', 'success');

        // Try to send verification code via configured provider (optional)
        this.sendVerificationCode(email, verificationCode);

        // Show verification modal
        this.showVerificationModal(email);
    }

    handleForgotPassword() {
        const email = document.getElementById('forgotEmail').value.trim().toLowerCase();
        
        if (!email) {
            this.showNotification('Please enter your email address', 'error');
            return;
        }

        if (!this.users[email]) {
            this.showNotification('Email address not found', 'error');
            return;
        }

        // Simulate sending reset email
        this.showNotification('Password reset instructions sent to your email', 'success');
        
        setTimeout(() => {
            this.showLogin();
        }, 2000);
    }

    socialLogin(provider) {
        // Simulate social login
        this.showNotification(`${provider} login coming soon!`, 'info');
    }

    // Verification helpers
    generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    showVerificationModal(email) {
        const modal = document.getElementById('verification-modal');
        const emailField = document.getElementById('verificationEmail');
        const infoBox = document.getElementById('verificationInfo');
        if (emailField) emailField.value = email || '';
        if (infoBox) {
            infoBox.textContent = `Enter the 6-digit code sent to ${email}`;
        }
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideVerificationModal() {
        const modal = document.getElementById('verification-modal');
        if (modal) modal.classList.add('hidden');
    }

    verifyCode() {
        const email = (document.getElementById('verificationEmail').value || '').trim().toLowerCase();
        const code = (document.getElementById('verificationCodeInput').value || '').trim();
        if (!email || !code) {
            this.showNotification('Enter your email and verification code', 'error');
            return;
        }
        const user = this.users[email];
        if (!user || !user.verification) {
            this.showNotification('No verification pending for this email', 'error');
            return;
        }
        if (Date.now() > user.verification.expiresAt) {
            this.showNotification('Verification code expired. Please resend.', 'error');
            return;
        }
        user.verification.attempts = (user.verification.attempts || 0) + 1;
        if (user.verification.attempts > 5) {
            this.showNotification('Too many attempts. Please resend a new code.', 'error');
            this.saveUsers();
            return;
        }
        if (code !== user.verification.code) {
            this.saveUsers();
            this.showNotification('Invalid code. Try again.', 'error');
            return;
        }
        // Success
        user.isVerified = true;
        user.verification.verifiedAt = Date.now();
        user.lastLogin = new Date().toISOString();
        this.users[email] = user;
        this.saveUsers();
        this.setAuthUser(user, false);
        this.hideVerificationModal();
        this.showNotification('Email verified! Welcome to CyberGuard Academy.', 'success');
        setTimeout(() => {
            window.location.href = user.role === 'admin' ? 'admin.html' : 'index.html';
        }, 1200);
    }

    resendVerificationCode() {
        const email = (document.getElementById('verificationEmail').value || '').trim().toLowerCase();
        const user = this.users[email];
        if (!user) {
            this.showNotification('Email not found', 'error');
            return;
        }
        const newCode = this.generateVerificationCode();
        user.verification = {
            code: newCode,
            generatedAt: Date.now(),
            expiresAt: Date.now() + (15 * 60 * 1000),
            attempts: 0
        };
        this.users[email] = user;
        this.saveUsers();
        this.sendVerificationCode(email, newCode);
        this.showNotification('A new verification code has been sent.', 'success');
    }

    sendVerificationCode(email, code) {
        try {
            // Optional EmailJS integration if EMAIL_CONFIG is provided on window
            // window.EMAIL_CONFIG = { serviceId, templateId, publicKey }
            if (window.EMAIL_CONFIG && window.emailjs) {
                emailjs.init(window.EMAIL_CONFIG.publicKey);
                emailjs.send(window.EMAIL_CONFIG.serviceId, window.EMAIL_CONFIG.templateId, {
                    to_email: email,
                    verification_code: code
                }).then(() => {
                    this.showNotification('Verification email sent', 'info');
                }).catch(() => {
                    // Fallback to displaying code for local/dev usage
                    this.showNotification(`Dev mode: Your code is ${code}`, 'warning');
                });
            } else {
                // Fallback: display code (dev/local environment)
                this.showNotification(`Dev mode: Your code is ${code}`, 'warning');
            }
        } catch (e) {
            this.showNotification(`Unable to send email. Dev code: ${code}`, 'warning');
        }
    }

    checkPasswordStrength(password) {
        const strengthBar = document.getElementById('strength-bar');
        const strengthText = document.getElementById('strength-text');
        const strengthLabel = document.getElementById('strength-label');

        if (!password) {
            strengthBar.style.width = '0%';
            strengthLabel.textContent = 'Too short';
            return;
        }

        let score = 0;
        
        // Length check
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        
        // Character variety
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        let strength = 'weak';
        let label = 'Weak';
        let width = '20%';

        if (score >= 5) {
            strength = 'strong';
            label = 'Strong';
            width = '100%';
        } else if (score >= 3) {
            strength = 'medium';
            label = 'Medium';
            width = '60%';
        }

        strengthBar.className = `h-full w-0 transition-all duration-300 strength-${strength}`;
        strengthBar.style.width = width;
        strengthLabel.textContent = label;
    }

    setAuthUser(user, rememberMe = false) {
        const userData = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        };

        if (rememberMe) {
            localStorage.setItem('authUser', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('authUser', JSON.stringify(userData));
        }
    }

    getAuthUser() {
        const user = sessionStorage.getItem('authUser') || localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    }

    logout() {
        sessionStorage.removeItem('authUser');
        localStorage.removeItem('authUser');
        this.currentUser = null;
        window.location.href = 'auth.html';
    }

    checkAuthState() {
        const user = this.getAuthUser();
        if (user) {
            // User is logged in, redirect to main app
            if (window.location.pathname.includes('auth.html')) {
                window.location.href = 'index.html';
            }
        }
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

    // Update user progress
    updateUserProgress(email, progressData) {
        if (this.users[email]) {
            this.users[email].progress = { ...this.users[email].progress, ...progressData };
            this.saveUsers();
        }
    }

    // Update leaderboard stats
    updateLeaderboardStats(email, stats) {
        if (this.users[email]) {
            this.users[email].leaderboardStats = { 
                ...this.users[email].leaderboardStats, 
                ...stats,
                lastUpdated: new Date().toISOString()
            };
            this.saveUsers();
        }
    }

    // Get all users (for admin)
    getAllUsers() {
        return this.users;
    }

    // Delete user (for admin)
    deleteUser(email) {
        if (this.users[email] && email !== 'admin@cyberguard.com') {
            delete this.users[email];
            this.saveUsers();
            return true;
        }
        return false;
    }

    // Promote user to admin (for admin)
    promoteUser(email) {
        if (this.users[email]) {
            this.users[email].role = 'admin';
            this.saveUsers();
            return true;
        }
        return false;
    }
}

// Authentication form functions
function showSignup() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('forgot-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('forgot-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

function showForgotPassword() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('forgot-form').classList.remove('hidden');
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Initialize authentication system
const authSystem = new AuthSystem();

// Export for global access
window.authSystem = authSystem;