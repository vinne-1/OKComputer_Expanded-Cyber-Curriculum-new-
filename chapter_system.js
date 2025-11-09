// Chapter System Management
class ChapterSystem {
    constructor() {
        this.chapterData = null;
        this.userProgress = this.loadProgress();
        this.init();
    }

    async init() {
        await this.loadChapterData();
        this.renderChapters();
        this.updateProgressDisplay();
        this.initializeVanta();
    }

    async loadChapterData() {
        try {
            const response = await fetch('chapter_curriculum.json');
            if (response.ok) {
                this.chapterData = await response.json();
            } else {
                throw new Error('Failed to load chapter curriculum');
            }
        } catch (error) {
            console.log('Using embedded chapter data');
            // Use embedded curriculum data
            this.chapterData = this.getCompleteCurriculumData();
        }
    }

    getCompleteCurriculumData() {
        return {
            "levels": {
                "1": {
                    "title": "Foundation Building",
                    "description": "Master the fundamental concepts of cybersecurity, networking, and security principles",
                    "total_chapters": 4,
                    "chapters": {
                        "1": {
                            "title": "Cybersecurity Fundamentals",
                            "description": "Introduction to cybersecurity concepts, threats, and the security landscape",
                            "learning_objectives": [
                                "Understand the CIA Triad (Confidentiality, Integrity, Availability)",
                                "Identify common cybersecurity threats and attack vectors",
                                "Explain the importance of defense in depth",
                                "Recognize different types of malware and their characteristics"
                            ],
                            "topics": [
                                "What is Cybersecurity?",
                                "The CIA Triad Explained",
                                "Common Threat Landscape",
                                "Types of Cyber Attacks",
                                "Malware Categories",
                                "Security Frameworks Overview"
                            ],
                            "estimated_time": "2-3 hours",
                            "quiz": {
                                "easy": {
                                    "questions": 8,
                                    "passing_score": 75,
                                    "time_limit": 15,
                                    "focus": "Basic concepts and definitions"
                                },
                                "medium": {
                                    "questions": 12,
                                    "passing_score": 80,
                                    "time_limit": 20,
                                    "focus": "Threat identification and security principles"
                                },
                                "hard": {
                                    "questions": 15,
                                    "passing_score": 85,
                                    "time_limit": 25,
                                    "focus": "Complex scenarios and threat analysis"
                                }
                            }
                        },
                        "2": {
                            "title": "Networking Essentials",
                            "description": "Understanding network protocols, architecture, and network security basics",
                            "learning_objectives": [
                                "Master the OSI and TCP/IP models",
                                "Understand IP addressing and subnetting",
                                "Identify common network protocols and their security implications",
                                "Explain network topology and architecture concepts"
                            ],
                            "topics": [
                                "OSI Model Deep Dive",
                                "TCP/IP Protocol Suite",
                                "IP Addressing and Subnetting",
                                "Network Protocols (HTTP, HTTPS, FTP, SSH)",
                                "Network Topologies",
                                "Basic Network Security Concepts"
                            ],
                            "estimated_time": "3-4 hours",
                            "quiz": {
                                "easy": {
                                    "questions": 10,
                                    "passing_score": 75,
                                    "time_limit": 18,
                                    "focus": "OSI layers and basic protocols"
                                },
                                "medium": {
                                    "questions": 14,
                                    "passing_score": 80,
                                    "time_limit": 22,
                                    "focus": "Protocol security and network architecture"
                                },
                                "hard": {
                                    "questions": 18,
                                    "passing_score": 85,
                                    "time_limit": 28,
                                    "focus": "Network troubleshooting and security analysis"
                                }
                            }
                        },
                        "3": {
                            "title": "Risk Management & Governance",
                            "description": "Learn risk assessment methodologies and security governance frameworks",
                            "learning_objectives": [
                                "Conduct basic risk assessments",
                                "Understand compliance requirements and frameworks",
                                "Explain security policies and procedures",
                                "Identify key governance principles"
                            ],
                            "topics": [
                                "Risk Management Fundamentals",
                                "Risk Assessment Methodologies",
                                "Compliance Frameworks (NIST, ISO 27001)",
                                "Security Policies and Procedures",
                                "Business Continuity Planning",
                                "Incident Response Basics"
                            ],
                            "estimated_time": "2-3 hours",
                            "quiz": {
                                "easy": {
                                    "questions": 8,
                                    "passing_score": 75,
                                    "time_limit": 15,
                                    "focus": "Risk concepts and basic frameworks"
                                },
                                "medium": {
                                    "questions": 12,
                                    "passing_score": 80,
                                    "time_limit": 20,
                                    "focus": "Risk assessment and compliance"
                                },
                                "hard": {
                                    "questions": 15,
                                    "passing_score": 85,
                                    "time_limit": 25,
                                    "focus": "Complex risk scenarios and governance"
                                }
                            }
                        },
                        "4": {
                            "title": "Security Tools & Technologies",
                            "description": "Explore essential security tools and technologies used in cybersecurity",
                            "learning_objectives": [
                                "Identify essential security tools and their purposes",
                                "Understand basic cryptography concepts",
                                "Explain authentication and authorization mechanisms",
                                "Describe security monitoring and logging"
                            ],
                            "topics": [
                                "Essential Security Tools Overview",
                                "Introduction to Cryptography",
                                "Authentication Methods",
                                "Access Control Models",
                                "Security Monitoring Tools",
                                "Log Analysis Basics"
                            ],
                            "estimated_time": "3-4 hours",
                            "quiz": {
                                "easy": {
                                    "questions": 10,
                                    "passing_score": 75,
                                    "time_limit": 18,
                                    "focus": "Tool identification and basic concepts"
                                },
                                "medium": {
                                    "questions": 14,
                                    "passing_score": 80,
                                    "time_limit": 22,
                                    "focus": "Tool applications and cryptography"
                                },
                                "hard": {
                                    "questions": 18,
                                    "passing_score": 85,
                                    "time_limit": 28,
                                    "focus": "Advanced tool usage and security implementation"
                                }
                            }
                        }
                    }
                },
                "2": {
                    "title": "Technical Implementation",
                    "description": "Dive deep into technical security controls, systems hardening, and defense mechanisms",
                    "total_chapters": 4,
                    "chapters": {
                        "1": {
                            "title": "System Hardening & Configuration",
                            "description": "Learn to secure operating systems, applications, and infrastructure components",
                            "learning_objectives": [
                                "Implement operating system hardening techniques",
                                "Configure secure application settings",
                                "Apply security baselines and benchmarks",
                                "Understand patch management processes"
                            ],
                            "topics": [
                                "Operating System Hardening",
                                "Windows Security Configuration",
                                "Linux Security Hardening",
                                "Application Security Settings",
                                "Security Baselines (CIS Benchmarks)",
                                "Patch Management Strategies"
                            ],
                            "estimated_time": "4-5 hours",
                            "quiz": {
                                "easy": {
                                    "questions": 12,
                                    "passing_score": 75,
                                    "time_limit": 20,
                                    "focus": "Basic hardening concepts"
                                },
                                "medium": {
                                    "questions": 16,
                                    "passing_score": 80,
                                    "time_limit": 25,
                                    "focus": "Configuration and implementation"
                                },
                                "hard": {
                                    "questions": 20,
                                    "passing_score": 85,
                                    "time_limit": 30,
                                    "focus": "Advanced hardening scenarios"
                                }
                            }
                        },
                        "2": {
                            "title": "Network Security Controls",
                            "description": "Master firewall configuration, intrusion detection, and network segmentation",
                            "learning_objectives": [
                                "Configure and manage firewall rules",
                                "Implement intrusion detection and prevention systems",
                                "Design secure network architectures",
                                "Apply network segmentation strategies"
                            ],
                            "topics": [
                                "Firewall Technologies",
                                "IDS/IPS Implementation",
                                "Network Access Control (NAC)",
                                "VPN Configuration",
                                "Network Segmentation",
                                "DMZ Design and Implementation"
                            ],
                            "estimated_time": "4-5 hours",
                            "quiz": {
                                "easy": {
                                    "questions": 12,
                                    "passing_score": 75,
                                    "time_limit": 20,
                                    "focus": "Basic network security concepts"
                                },
                                "medium": {
                                    "questions": 16,
                                    "passing_score": 80,
                                    "time_limit": 25,
                                    "focus": "Configuration and management"
                                },
                                "hard": {
                                    "questions": 20,
                                    "passing_score": 85,
                                    "time_limit": 30,
                                    "focus": "Complex network security scenarios"
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    loadProgress() {
        const saved = localStorage.getItem('chapterProgress');
        return saved ? JSON.parse(saved) : {
            completedChapters: [],
            levelProgress: { 1: 0, 2: 0, 3: 0, 4: 0 },
            overallProgress: 0,
            totalChapters: 16
        };
    }

    saveProgress() {
        localStorage.setItem('chapterProgress', JSON.stringify(this.userProgress));
    }

    renderChapters() {
        const container = document.getElementById('chapters-container');
        if (!container || !this.chapterData) return;

        container.innerHTML = '';

        Object.entries(this.chapterData.levels).forEach(([levelNum, levelData]) => {
            const levelSection = document.createElement('div');
            levelSection.className = 'fade-in';
            levelSection.innerHTML = `
                <div class="glass-effect rounded-xl p-6 mb-6">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h2 class="text-2xl font-bold mb-2">Level ${levelNum}: ${levelData.title}</h2>
                            <p class="text-slate-300">${levelData.description}</p>
                        </div>
                        <div class="text-right">
                            <div class="text-3xl font-bold text-emerald-400" id="level-${levelNum}-percent">0%</div>
                            <div class="text-sm text-slate-400">Complete</div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="level-${levelNum}-chapters">
                        ${this.renderLevelChapters(levelNum, levelData)}
                    </div>
                </div>
            `;
            container.appendChild(levelSection);
        });
    }

    renderLevelChapters(levelNum, levelData) {
        return Object.entries(levelData.chapters).map(([chapterNum, chapter]) => {
            const chapterId = `${levelNum}-${chapterNum}`;
            const isCompleted = this.userProgress.completedChapters.includes(chapterId);
            const isLocked = this.isChapterLocked(levelNum, chapterNum);
            
            return `
                <div class="chapter-card bg-slate-800/50 rounded-lg p-6 border border-slate-700 ${isLocked ? 'opacity-50' : 'cursor-pointer'}" 
                     ${!isLocked ? `onclick="chapterSystem.startChapter('${levelNum}', '${chapterNum}')"` : ''}>
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-2 mb-2">
                                <span class="bg-emerald-600 text-xs px-2 py-1 rounded">${levelNum}-${chapterNum}</span>
                                ${isCompleted ? '<i class="fas fa-check-circle text-emerald-400"></i>' : 
                                  isLocked ? '<i class="fas fa-lock text-slate-500"></i>' : '<i class="fas fa-play-circle text-blue-400"></i>'}
                            </div>
                            <h3 class="text-lg font-semibold mb-2">${chapter.title}</h3>
                            <p class="text-slate-300 text-sm mb-4">${chapter.description}</p>
                        </div>
                    </div>
                    
                    ${!isLocked && chapter.topics ? `
                        <div class="mb-4">
                            <div class="text-xs text-slate-400 mb-2">Learning Objectives:</div>
                            <div class="flex flex-wrap gap-1">
                                ${chapter.topics.slice(0, 3).map(topic => 
                                    `<span class="bg-slate-700 text-xs px-2 py-1 rounded">${topic}</span>`
                                ).join('')}
                                ${chapter.topics.length > 3 ? '<span class="text-xs text-slate-400">+more</span>' : ''}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="flex items-center justify-between">
                        <div class="text-xs text-slate-400">
                            ${chapter.estimated_time ? `⏱️ ${chapter.estimated_time}` : 'Self-paced'}
                        </div>
                        ${chapter.quiz ? `
                            <div class="flex space-x-1">
                                <span class="difficulty-badge bg-green-600">Easy</span>
                                <span class="difficulty-badge bg-yellow-600">Medium</span>
                                <span class="difficulty-badge bg-red-600">Hard</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${isCompleted ? `
                        <div class="mt-4 p-3 bg-emerald-900/30 rounded-lg border border-emerald-700">
                            <div class="flex items-center space-x-2 text-emerald-400 text-sm">
                                <i class="fas fa-trophy"></i>
                                <span>Completed</span>
                            </div>
                        </div>
                    ` : isLocked ? `
                        <div class="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                            <div class="flex items-center space-x-2 text-slate-400 text-sm">
                                <i class="fas fa-lock"></i>
                                <span>Complete previous chapters to unlock</span>
                            </div>
                        </div>
                    ` : `
                        <div class="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700">
                            <div class="flex items-center space-x-2 text-blue-400 text-sm">
                                <i class="fas fa-play"></i>
                                <span>Click to start chapter</span>
                            </div>
                        </div>
                    `}
                </div>
            `;
        }).join('');
    }

    isChapterLocked(levelNum, chapterNum) {
        const chapterId = `${levelNum}-${chapterNum}`;
        
        // First chapter of first level is always unlocked
        if (levelNum === '1' && chapterNum === '1') return false;
        
        // Check if previous chapter in same level is completed
        if (chapterNum !== '1') {
            const prevChapterId = `${levelNum}-${parseInt(chapterNum) - 1}`;
            if (!this.userProgress.completedChapters.includes(prevChapterId)) {
                return true;
            }
        }
        
        // For first chapter of levels 2-4, check if previous level is completed
        if (chapterNum === '1' && parseInt(levelNum) > 1) {
            const prevLevel = parseInt(levelNum) - 1;
            const prevLevelChapters = Object.keys(this.chapterData.levels[prevLevel].chapters);
            const prevLevelCompleted = prevLevelChapters.every(ch => 
                this.userProgress.completedChapters.includes(`${prevLevel}-${ch}`)
            );
            return !prevLevelCompleted;
        }
        
        return false;
    }

    startChapter(levelNum, chapterNum) {
        const chapterId = `${levelNum}-${chapterNum}`;
        const chapter = this.chapterData.levels[levelNum].chapters[chapterNum];
        
        // Check if chapter is already completed
        if (this.userProgress.completedChapters.includes(chapterId)) {
            this.showNotification(`✅ Chapter ${levelNum}-${chapterNum} already completed!`, 'info');
            return;
        }
        
        // Show chapter content first, then quiz options
        this.showChapterContent(levelNum, chapterNum, chapter);
    }

    showChapterContent(levelNum, chapterNum, chapter) {
        const modal = document.createElement('div');
        modal.id = 'chapter-content-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        
        // Get detailed chapter content
        const detailedContent = chapterContent.renderChapterContent(levelNum, chapterNum);
        
        modal.innerHTML = `
            <div class="glass-effect rounded-xl p-8 max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold">Chapter ${levelNum}-${chapterNum}: ${chapter.title}</h2>
                    <button onclick="chapterSystem.closeModal()" class="text-slate-400 hover:text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                ${detailedContent || this.generateBasicContent(levelNum, chapterNum, chapter)}
                
                <div class="mt-8 p-6 bg-slate-800/50 rounded-lg border border-emerald-700">
                    <h3 class="text-xl font-bold mb-4 text-emerald-400">Chapter Quiz (30 Questions)</h3>
                    <p class="text-slate-300 mb-6">Complete a combined quiz of 10 Easy, 10 Medium, and 10 Hard questions. Passing score: 80% to unlock the next module.</p>
                    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <button onclick="chapterSystem.startModuleQuiz('${levelNum}', '${chapterNum}')"
                                class="bg-emerald-600 hover:bg-emerald-700 p-4 rounded-lg transition-colors text-center">
                            <div class="font-bold mb-1">Start Chapter Quiz</div>
                            <div class="text-sm opacity-80">30 questions • ~40 minutes • 80% passing</div>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    generateBasicContent(levelNum, chapterNum, chapter) {
        return `
            <div class="mb-8">
                <h3 class="text-xl font-bold mb-4">Learning Objectives</h3>
                <ul class="space-y-2">
                    ${chapter.learning_objectives.map(obj => `<li class="flex items-start"><i class="fas fa-check-circle text-emerald-400 mr-2 mt-1"></i><span>${obj}</span></li>`).join('')}
                </ul>
            </div>
            
            <div class="mb-8">
                <h3 class="text-xl font-bold mb-4">Topics Covered</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${chapter.topics.map(topic => `<div class="bg-slate-800/50 p-3 rounded-lg text-sm">${topic}</div>`).join('')}
                </div>
            </div>
            
            <div class="mb-8">
                <h3 class="text-xl font-bold mb-4">Study Guide</h3>
                <div class="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                    <p class="text-blue-200">This chapter covers essential concepts in ${chapter.title.toLowerCase()}. Make sure to understand all learning objectives before attempting the quiz.</p>
                    <p class="text-blue-300 mt-2"><strong>Estimated Time:</strong> ${chapter.estimated_time}</p>
                </div>
            </div>
        `;
    }

    showChapterModal(levelNum, chapterNum, chapter) {
        const modal = document.createElement('div');
        modal.id = 'chapter-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="glass-effect rounded-xl p-8 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold">Chapter ${levelNum}-${chapterNum}: ${chapter.title}</h2>
                    <button onclick="chapterSystem.closeModal()" class="text-slate-400 hover:text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="space-y-6">
                    <div>
                        <h3 class="text-lg font-semibold mb-3">Description</h3>
                        <p class="text-slate-300">${chapter.description}</p>
                    </div>
                    
                    ${chapter.learning_objectives ? `
                        <div>
                            <h3 class="text-lg font-semibold mb-3">Learning Objectives</h3>
                            <ul class="space-y-2">
                                ${chapter.learning_objectives.map(obj => `
                                    <li class="flex items-start space-x-2">
                                        <i class="fas fa-check-circle text-emerald-400 mt-1"></i>
                                        <span class="text-slate-300">${obj}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${chapter.topics ? `
                        <div>
                            <h3 class="text-lg font-semibold mb-3">Topics Covered</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                ${chapter.topics.map(topic => `
                                    <div class="bg-slate-800/50 p-3 rounded-lg text-sm text-slate-300">
                                        ${topic}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${chapter.quiz ? `
                        <div>
                            <h3 class="text-lg font-semibold mb-3">Quiz Information</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-green-900/30 p-4 rounded-lg border border-green-700">
                                    <div class="text-green-400 font-semibold mb-2">Easy</div>
                                    <div class="text-sm text-slate-300">
                                        <div>${chapter.quiz.easy.questions} questions</div>
                                        <div>${chapter.quiz.easy.time_limit} minutes</div>
                                        <div>${chapter.quiz.easy.passing_score}% to pass</div>
                                    </div>
                                </div>
                                <div class="bg-yellow-900/30 p-4 rounded-lg border border-yellow-700">
                                    <div class="text-yellow-400 font-semibold mb-2">Medium</div>
                                    <div class="text-sm text-slate-300">
                                        <div>${chapter.quiz.medium.questions} questions</div>
                                        <div>${chapter.quiz.medium.time_limit} minutes</div>
                                        <div>${chapter.quiz.medium.passing_score}% to pass</div>
                                    </div>
                                </div>
                                <div class="bg-red-900/30 p-4 rounded-lg border border-red-700">
                                    <div class="text-red-400 font-semibold mb-2">Hard</div>
                                    <div class="text-sm text-slate-300">
                                        <div>${chapter.quiz.hard.questions} questions</div>
                                        <div>${chapter.quiz.hard.time_limit} minutes</div>
                                        <div>${chapter.quiz.hard.passing_score}% to pass</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="flex space-x-4 pt-4">
                        <button onclick="chapterSystem.startQuiz('${levelNum}', '${chapterNum}', 'easy')" 
                                class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition-colors flex-1">
                            Start Easy Quiz
                        </button>
                        <button onclick="chapterSystem.startQuiz('${levelNum}', '${chapterNum}', 'medium')" 
                                class="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg transition-colors flex-1">
                            Start Medium Quiz
                        </button>
                        <button onclick="chapterSystem.startQuiz('${levelNum}', '${chapterNum}', 'hard')" 
                                class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors flex-1">
                            Start Hard Quiz
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    closeModal() {
        const modal = document.getElementById('chapter-modal');
        if (modal) {
            modal.remove();
        }
    }

    startQuiz(levelNum, chapterNum, difficulty) {
        this.closeModal();
        
        // Store current quiz context
        sessionStorage.setItem('currentQuiz', JSON.stringify({
            level: levelNum,
            chapter: chapterNum,
            difficulty: difficulty,
            chapterTitle: this.chapterData.levels[levelNum].chapters[chapterNum].title
        }));
        
        // Navigate to quiz page
        window.location.href = `quiz.html?level=${levelNum}&chapter=${chapterNum}&difficulty=${difficulty}`;
    }

    startModuleQuiz(levelNum, chapterNum) {
        this.closeModal();
        const chapterTitle = this.chapterData.levels[levelNum].chapters[chapterNum].title;
        // Store current quiz context for 30-question module quiz
        sessionStorage.setItem('currentQuiz', JSON.stringify({
            level: levelNum,
            chapter: chapterNum,
            difficulty: 'module',
            mode: 'module',
            chapterTitle
        }));
        window.location.href = `quiz.html?level=${levelNum}&chapter=${chapterNum}&mode=module`;
    }

    completeChapter(levelNum, chapterNum, difficulty, score) {
        const chapterId = `${levelNum}-${chapterNum}`;
        
        // Mark chapter as completed if not already
        if (!this.userProgress.completedChapters.includes(chapterId)) {
            this.userProgress.completedChapters.push(chapterId);
            
            // Update level progress
            const levelChapters = Object.keys(this.chapterData.levels[levelNum].chapters);
            const completedInLevel = levelChapters.filter(ch => 
                this.userProgress.completedChapters.includes(`${levelNum}-${ch}`)
            ).length;
            
            this.userProgress.levelProgress[levelNum] = Math.round((completedInLevel / levelChapters.length) * 100);
            
            // Update overall progress
            this.userProgress.overallProgress = Math.round((this.userProgress.completedChapters.length / this.userProgress.totalChapters) * 100);
            
            this.saveProgress();
            this.updateProgressDisplay();
            this.showAchievement();
        }
    }

    showAchievement() {
        const modal = document.getElementById('achievement-modal');
        if (modal) {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 3000);
        }
    }

    updateProgressDisplay() {
        // Update overall progress
        const overallElement = document.getElementById('overall-progress');
        if (overallElement) {
            overallElement.textContent = `${this.userProgress.overallProgress}%`;
        }
        
        // Update level progress rings
        for (let level = 1; level <= 4; level++) {
            const progressRing = document.getElementById(`level${level}-progress`);
            const percentElement = document.getElementById(`level-${level}-percent`);
            
            if (progressRing) {
                const progress = this.userProgress.levelProgress[level] || 0;
                const circumference = 2 * Math.PI * 36; // radius = 36
                const offset = circumference - (progress / 100) * circumference;
                progressRing.style.strokeDashoffset = offset;
            }
            
            if (percentElement) {
                percentElement.textContent = `${this.userProgress.levelProgress[level] || 0}%`;
            }
        }
    }

    initializeVanta() {
        VANTA.BIRDS({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x0f172a,
            color1: 0x10b981,
            color2: 0x3b82f6,
            birdSize: 1.20,
            wingSpan: 25.00,
            speedLimit: 3.00,
            separation: 20.00,
            alignment: 20.00,
            cohesion: 20.00,
            quantity: 3.00
        });
    }
}

// Global functions
function closeAchievementModal() {
    document.getElementById('achievement-modal').classList.add('hidden');
}

// Initialize the chapter system
const chapterSystem = new ChapterSystem();

// Handle quiz completion callbacks
window.addEventListener('message', event => {
    if (event.data.type === 'quizCompleted') {
        const { level, chapter, difficulty, score } = event.data;
        chapterSystem.completeChapter(level, chapter, difficulty, score);
    }
    
    if (event.data.type === 'chapterCompleted') {
        const { level, chapter, averageScore } = event.data;
        chapterSystem.showNotification(`🎉 Chapter ${level}-${chapter} completed with ${averageScore}% average!`, 'success');
        chapterSystem.updateProgressDisplay();
    }
});