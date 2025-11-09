// Enhanced Quiz System with Chapter Integration (with 30-question module quiz mode)
class QuizSystem {
    constructor() {
        this.currentQuiz = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.timer = null;
        this.timeRemaining = 0;
        this.startTime = null;
        this.difficultySettings = {
            easy: { color: 'green', questions: 8, timeLimit: 15, passingScore: 75 },
            medium: { color: 'yellow', questions: 12, timeLimit: 20, passingScore: 80 },
            hard: { color: 'red', questions: 15, timeLimit: 25, passingScore: 85 }
        };
        this.moduleSettings = { questions: 30, timeLimit: 40, passingScore: 80 }; // 30 Q: 10/10/10
        this.init();
    }

    init() {
        this.loadQuizContext();
        this.initializeVanta();
        this.loadQuestions();
    }

    loadQuizContext() {
        const urlParams = new URLSearchParams(window.location.search);
        const storedQuiz = sessionStorage.getItem('currentQuiz');
        if (storedQuiz) {
            this.currentQuiz = JSON.parse(storedQuiz);
        } else {
            this.currentQuiz = {
                level: urlParams.get('level') || '1',
                chapter: urlParams.get('chapter') || '1',
                difficulty: urlParams.get('difficulty') || 'easy',
                mode: urlParams.get('mode') || 'difficulty',
                chapterTitle: 'Cybersecurity Fundamentals'
            };
        }
        this.updateQuizHeader();
    }

    updateQuizHeader() {
        const isModuleMode = this.currentQuiz.mode === 'module';
        const cfg = isModuleMode ? this.moduleSettings : this.difficultySettings[this.currentQuiz.difficulty];
        const levelNames = { '1': 'Foundation Building', '2': 'Technical Implementation', '3': 'Advanced Defense', '4': 'Strategic Leadership' };
        const title = isModuleMode
            ? `${this.currentQuiz.chapterTitle} - Chapter Quiz (30 Questions)`
            : `${this.currentQuiz.chapterTitle} - ${this.currentQuiz.difficulty.charAt(0).toUpperCase() + this.currentQuiz.difficulty.slice(1)} Quiz`;
        const subtitle = `Level ${this.currentQuiz.level}: ${levelNames[this.currentQuiz.level]}`;
        const titleEl = document.getElementById('quiz-title');
        const subEl = document.getElementById('quiz-subtitle');
        if (titleEl) titleEl.textContent = title;
        if (subEl) subEl.textContent = subtitle;
        this.timeRemaining = cfg.timeLimit * 60;
        this.startTime = Date.now();
        this.startTimer();
    }

    loadQuestions() {
        if (this.currentQuiz.mode === 'module') {
            this.questions = this.getCombinedQuestions(this.currentQuiz.level, this.currentQuiz.chapter);
        } else {
            this.questions = this.getQuestionsForQuiz(this.currentQuiz.level, this.currentQuiz.chapter, this.currentQuiz.difficulty);
        }
        const totalEl = document.getElementById('total-questions');
        const maxScoreEl = document.getElementById('max-score');
        if (totalEl) totalEl.textContent = this.questions.length;
        if (maxScoreEl) maxScoreEl.textContent = this.questions.length;
        this.displayQuestion();
    }

    // Minimal per-chapter database plus OSI model content; fills with generic if needed
    getRawDatabase() {
        return {
            '1': {
                '1': { // Cybersecurity Fundamentals
                    easy: [
                        { question: "What does CIA stand for in security?", options: ["Control, Inspect, Audit","Confidentiality, Integrity, Availability","Cyber, Intelligence, Analysis","Compliance, Integrity, Access"], correct: 1, explanation: "CIA triad: Confidentiality, Integrity, Availability." },
                        { question: "Which is social engineering?", options: ["ARP spoofing","Phishing","Port scanning","SQL injection"], correct: 1, explanation: "Phishing manipulates humans to disclose info." },
                        { question: "Primary goal of cybersecurity?", options: ["Speed","Security","Cost","Convenience"], correct: 1, explanation: "Protect systems and data." },
                        { question: "Strong password example?", options: ["Password1","Qwerty!","X#mK9$pL2@vN","Summer2024"], correct: 2, explanation: "High entropy with symbols and cases." }
                    ],
                    medium: [
                        { question: "Zero-day means?", options: ["Patched bug","Known misconfig","Unknown vulnerability","Insider threat"], correct: 2, explanation: "Unknown to vendor; no patch available." },
                        { question: "Least privilege is about?", options: ["Max access","Same access for all","Minimum required access","Temporary admin"], correct: 2, explanation: "Grant minimum access needed." }
                    ],
                    hard: [
                        { question: "IDS vs IPS primary diff?", options: ["Detect vs prevent","HW vs SW","Speed","No diff"], correct: 0, explanation: "IDS detects; IPS prevents." },
                        { question: "Broken hash function?", options: ["SHA-256","MD5","SHA-3","BLAKE2"], correct: 1, explanation: "MD5 is collision-prone." }
                    ]
                },
                '2': { // Networking Essentials (OSI)
                    easy: [
                        { question: "How many OSI layers?", options: ["5","6","7","8"], correct: 2, explanation: "Seven layers from Physical to Application." },
                        { question: "Transport layer protocols?", options: ["IP, ICMP","TCP, UDP","HTTP, DNS","Ethernet, Wi-Fi"], correct: 1, explanation: "TCP and UDP are Layer 4." }
                    ],
                    medium: [
                        { question: "SSL/TLS maps to which OSI layer?", options: ["Network","Transport","Session","Presentation"], correct: 3, explanation: "Commonly considered Layer 6 (Presentation)." },
                        { question: "Main diff TCP vs UDP?", options: ["TCP faster","UDP reliable","TCP connection-oriented","No diff"], correct: 2, explanation: "TCP provides reliable, connection-oriented delivery." }
                    ],
                    hard: [
                        { question: "IPv6 address bits?", options: ["32","64","128","256"], correct: 2, explanation: "IPv6 uses 128-bit addresses." },
                        { question: "Which layer handles routing?", options: ["Data Link","Network","Transport","Session"], correct: 1, explanation: "Layer 3 handles routing." }
                    ]
                }
            }
        };
    }

    getQuestionsForQuiz(level, chapter, difficulty, limitOverride) {
        const db = this.getRawDatabase();
        const raw = (((db[level] || {})[chapter] || {})[difficulty] || []).slice();
        const target = typeof limitOverride === 'number' ? limitOverride : this.difficultySettings[difficulty].questions;
        while (raw.length < target) {
            raw.push(...this.getGenericQuestions(difficulty));
            if (raw.length > target + 10) break;
        }
        return this.shuffleArray(raw).slice(0, target);
    }

    getCombinedQuestions(level, chapter) {
        const easy = this.getQuestionsForQuiz(level, chapter, 'easy', 10);
        const medium = this.getQuestionsForQuiz(level, chapter, 'medium', 10);
        const hard = this.getQuestionsForQuiz(level, chapter, 'hard', 10);
        return this.shuffleArray([...easy, ...medium, ...hard]);
    }

    getGenericQuestions(difficulty) {
        const generic = {
            easy: [
                { question: "Which is a good security practice?", options: ["Share passwords","Regular updates","Disable locks","Ignore alerts"], correct: 1, explanation: "Update to patch vulnerabilities." },
                { question: "2FA adds what?", options: ["More speed","Second factor","Auto backups","Admin rights"], correct: 1, explanation: "Two different auth factors." }
            ],
            medium: [
                { question: "Principle of least privilege means?", options: ["Max access","Same for all","Only needed access","Temporary root"], correct: 2, explanation: "Limit access to required tasks." },
                { question: "DMZ is used to?", options: ["Encrypt data","Buffer internal from external","Detect malware","Accelerate LAN"], correct: 1, explanation: "Add isolation between networks." }
            ],
            hard: [
                { question: "Nonce stands for?", options: ["New once cipher","Number used once","Network once","Null once"], correct: 1, explanation: "Prevents replay attacks." },
                { question: "MITM is easiest against?", options: ["HTTPS valid cert","HTTP","SSH verified keys","IPSec with auth"], correct: 1, explanation: "HTTP is plaintext." }
            ]
        };
        return this.shuffleArray(generic[difficulty].slice());
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    displayQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }
        const question = this.questions[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        const pbar = document.getElementById('progress-bar');
        if (pbar) pbar.style.width = `${progress}%`;
        const cq = document.getElementById('current-question');
        const tq = document.getElementById('total-questions');
        if (cq) cq.textContent = this.currentQuestionIndex + 1;
        if (tq) tq.textContent = this.questions.length;
        const qText = document.getElementById('question-text');
        if (qText) qText.textContent = question.question;
        const optionsContainer = document.getElementById('options-container');
        if (optionsContainer) optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option-card bg-slate-800/50 border border-slate-600 rounded-lg p-4';
            optionElement.innerHTML = `
                <div class="flex items-center space-x-3">
                    <div class="w-6 h-6 border-2 border-slate-400 rounded-full flex items-center justify-center">
                        <div class="w-3 h-3 bg-emerald-400 rounded-full hidden option-indicator"></div>
                    </div>
                    <span class="text-slate-200">${option}</span>
                </div>
            `;
            optionElement.onclick = () => this.selectOption(index, optionElement);
            optionsContainer.appendChild(optionElement);
        });
        const prev = document.getElementById('prev-btn');
        const next = document.getElementById('next-btn');
        const submit = document.getElementById('submit-btn');
        if (prev) prev.disabled = this.currentQuestionIndex === 0;
        if (next) next.style.display = 'none';
        if (submit) {
            submit.style.display = 'block';
            submit.disabled = true;
        }
        this.selectedOption = null;
    }

    selectOption(index, element) {
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
            const dot = card.querySelector('.option-indicator');
            if (dot) dot.classList.add('hidden');
        });
        element.classList.add('selected');
        element.querySelector('.option-indicator').classList.remove('hidden');
        this.selectedOption = index;
        const submit = document.getElementById('submit-btn');
        if (submit) submit.disabled = false;
    }

    submitAnswer() {
        if (this.selectedOption === null) return;
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = this.selectedOption === question.correct;
        this.userAnswers.push({ questionIndex: this.currentQuestionIndex, selectedOption: this.selectedOption, correct: isCorrect });
        if (isCorrect) this.score++;
        const cur = document.getElementById('current-score');
        const max = document.getElementById('max-score');
        if (cur) cur.textContent = this.score;
        if (max) max.textContent = this.questions.length;
        this.showAnswerFeedback(isCorrect, question);
        const submit = document.getElementById('submit-btn');
        const next = document.getElementById('next-btn');
        if (submit) submit.style.display = 'none';
        if (next) next.style.display = 'block';
    }

    showAnswerFeedback(isCorrect, question) {
        const options = document.querySelectorAll('.option-card');
        options[question.correct].classList.add('correct');
        options[question.correct].querySelector('.option-indicator').classList.remove('hidden');
        options[question.correct].querySelector('.option-indicator').style.backgroundColor = '#10b981';
        if (!isCorrect && this.selectedOption !== null) {
            options[this.selectedOption].classList.add('incorrect');
        }
        const explanationElement = document.createElement('div');
        explanationElement.className = 'mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-700';
        explanationElement.innerHTML = `
            <div class="flex items-start space-x-2">
                <i class="fas fa-info-circle text-blue-400 mt-1"></i>
                <div>
                    <div class="font-semibold text-blue-400 mb-1">Explanation:</div>
                    <div class="text-slate-300">${question.explanation}</div>
                </div>
            </div>
        `;
        const container = document.getElementById('options-container');
        if (container) container.appendChild(explanationElement);
        options.forEach(option => { option.style.pointerEvents = 'none'; });
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.displayQuestion();
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            if (this.timeRemaining <= 0) this.timeUp();
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const el = document.getElementById('timer-display');
        if (el) el.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (el) {
            if (this.timeRemaining <= 60) {
                el.className = 'text-3xl font-bold text-red-400 pulse';
            } else if (this.timeRemaining <= 300) {
                el.className = 'text-3xl font-bold text-yellow-400';
            }
        }
    }

    timeUp() {
        clearInterval(this.timer);
        this.showResults();
    }

    showResults() {
        clearInterval(this.timer);
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        const isModuleMode = this.currentQuiz.mode === 'module';
        const passingScore = isModuleMode ? this.moduleSettings.passingScore : this.difficultySettings[this.currentQuiz.difficulty].passingScore;
        const passed = percentage >= passingScore;
        const icon = document.getElementById('results-icon');
        const title = document.getElementById('results-title');
        const message = document.getElementById('results-message');
        if (icon) icon.textContent = passed ? '🎉' : '📚';
        if (title) title.textContent = passed ? 'Quiz Passed!' : 'Quiz Complete';
        if (message) message.textContent = passed ? 'Great work! Chapter progress updated.' : 'Review the material and try again.';
        const finalScore = document.getElementById('final-score');
        if (finalScore) finalScore.textContent = `${percentage}%`;
        const finalTime = document.getElementById('final-time');
        if (finalTime) finalTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        const correctEl = document.getElementById('correct-answers');
        if (correctEl) correctEl.textContent = `${this.score}/${this.questions.length}`;
        const diffBadge = document.getElementById('difficulty-badge');
        if (diffBadge) diffBadge.textContent = isModuleMode ? 'Module' : (this.currentQuiz.difficulty.charAt(0).toUpperCase() + this.currentQuiz.difficulty.slice(1));
        if (finalScore) {
            if (percentage >= 90) finalScore.className = 'text-2xl font-bold text-emerald-400';
            else if (percentage >= 70) finalScore.className = 'text-2xl font-bold text-yellow-400';
            else finalScore.className = 'text-2xl font-bold text-red-400';
        }
        const modal = document.getElementById('results-modal');
        if (modal) modal.classList.remove('hidden');
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'quizCompleted',
                level: this.currentQuiz.level,
                chapter: this.currentQuiz.chapter,
                difficulty: this.currentQuiz.difficulty,
                score: percentage,
                passed: passed
            }, '*');
        }
        this.saveQuizResults(percentage, passed);
    }

    saveQuizResults(score, passed) {
        const results = {
            level: this.currentQuiz.level,
            chapter: this.currentQuiz.chapter,
            difficulty: this.currentQuiz.difficulty,
            score,
            passed,
            timestamp: Date.now(),
            questions: this.questions.length,
            correct: this.score,
            mode: this.currentQuiz.mode || 'difficulty'
        };
        const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        history.push(results);
        localStorage.setItem('quizHistory', JSON.stringify(history));
        if (this.currentQuiz.mode === 'module' && passed) {
            this.markChapterCompleted();
        }
    }

    markChapterCompleted() {
        const chapterId = `${this.currentQuiz.level}-${this.currentQuiz.chapter}`;
        const progress = JSON.parse(localStorage.getItem('chapterProgress') || '{}');
        if (!progress.completedChapters) progress.completedChapters = [];
        if (!progress.completedChapters.includes(chapterId)) {
            progress.completedChapters.push(chapterId);
            localStorage.setItem('chapterProgress', JSON.stringify(progress));
            this.showNotification(`🎉 Chapter ${chapterId} completed!`, 'success');
            if (window.parent !== window) {
                window.parent.postMessage({ type: 'chapterCompleted', level: this.currentQuiz.level, chapter: this.currentQuiz.chapter, averageScore: null }, '*');
            }
        }
        const authUser = sessionStorage.getItem('authUser') || localStorage.getItem('authUser');
        if (authUser) {
            const { email } = JSON.parse(authUser);
            const users = JSON.parse(localStorage.getItem('cyberGuardUsers') || '{}');
            const user = users[email];
            if (user) {
                if (!user.progress.completedChapters.includes(chapterId)) {
                    user.progress.completedChapters.push(chapterId);
                    user.leaderboardStats.chaptersCompleted = Math.min((user.leaderboardStats.chaptersCompleted || 0) + 1, 16);
                    user.leaderboardStats.totalScore = (user.leaderboardStats.totalScore || 0) + 100;
                }
                const correctAnswers = this.score;
                const totalQuestions = this.questions.length;
                user.leaderboardStats.totalQuizzes = (user.leaderboardStats.totalQuizzes || 0) + 1;
                user.leaderboardStats.correctAnswers = (user.leaderboardStats.correctAnswers || 0) + correctAnswers;
                user.leaderboardStats.totalQuestions = (user.leaderboardStats.totalQuestions || 0) + totalQuestions;
                user.leaderboardStats.quizAccuracy = Math.round((user.leaderboardStats.correctAnswers / user.leaderboardStats.totalQuestions) * 100) || 0;
                users[email] = user;
                localStorage.setItem('cyberGuardUsers', JSON.stringify(users));
                if (window.updateLeaderboard) {
                    window.updateLeaderboard(email, { quizCompleted: true, score: Math.round((correctAnswers / totalQuestions) * 100), correctAnswers, totalQuestions, chapterCompleted: true });
                }
            }
        }
    }

    retakeQuiz() {
        const modal = document.getElementById('results-modal');
        if (modal) modal.classList.add('hidden');
        this.resetQuiz();
        this.loadQuestions();
    }

    nextDifficulty() {
        if (this.currentQuiz.mode === 'module') {
            this.backToChapters();
            return;
        }
        const difficulties = ['easy', 'medium', 'hard'];
        const currentIndex = difficulties.indexOf(this.currentQuiz.difficulty);
        if (currentIndex < difficulties.length - 1) {
            const next = difficulties[currentIndex + 1];
            this.currentQuiz.difficulty = next;
            sessionStorage.setItem('currentQuiz', JSON.stringify(this.currentQuiz));
            const modal = document.getElementById('results-modal');
            if (modal) modal.classList.add('hidden');
            this.resetQuiz();
            this.updateQuizHeader();
            this.loadQuestions();
        } else {
            this.backToChapters();
        }
    }

    backToChapters() {
        window.location.href = 'chapters.html';
    }

    resetQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.selectedOption = null;
        const isModuleMode = this.currentQuiz.mode === 'module';
        const cfg = isModuleMode ? this.moduleSettings : this.difficultySettings[this.currentQuiz.difficulty];
        this.timeRemaining = cfg.timeLimit * 60;
        this.startTime = Date.now();
        if (this.timer) clearInterval(this.timer);
        const cur = document.getElementById('current-score');
        const timer = document.getElementById('timer-display');
        if (cur) cur.textContent = '0';
        if (timer) timer.className = 'text-3xl font-bold text-emerald-400';
    }

    initializeVanta() {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3b82f6,
            backgroundColor: 0x0f172a,
            points: 8.00,
            maxDistance: 25.00,
            spacing: 18.00
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = { success: 'bg-emerald-600', error: 'bg-red-600', warning: 'bg-yellow-600', info: 'bg-blue-600' };
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => { if (document.body.contains(notification)) document.body.removeChild(notification); }, 300);
        }, 4000);
    }
}

// Initialize quiz system
const quizSystem = new QuizSystem();

