// Enhanced Main JavaScript with Chapter-Based Learning System
// This file integrates the quiz system, chapter progression, and fixes the automatic level completion issue

document.addEventListener('DOMContentLoaded', function() {
    initializeVantaBackground();
    initializeScrollAnimations();
    initializeProgressTracking();
    initializeInteractiveElements();
    initializeResourceModal();
    initializeCertificationRoadmap();
    initializeQuizIntegration();
    initializeChapterSystem();
});

// Initialize Vanta.js background with enhanced settings
function initializeVantaBackground() {
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x6366f1,
            backgroundColor: 0x0a0a0a,
            points: 8.00,
            maxDistance: 25.00,
            spacing: 18.00
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .resource-card, .level-card').forEach(item => {
        observer.observe(item);
    });
}

// Progress tracking with proper validation
function initializeProgressTracking() {
    const userProgress = loadUserProgress();
    updateProgressBars(userProgress);
    updateOverallProgress(userProgress);
}

function loadUserProgress() {
    const saved = localStorage.getItem('cyberMasteryProgress');
    return saved ? JSON.parse(saved) : {
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0,
        completedResources: [],
        accessedResources: [],
        engagedResources: [],
        totalStudyTime: 0,
        completedQuizzes: [],
        savedResources: [],
        quizAttempts: {},
        levelStartTimes: {}
    };
}

function saveUserProgress(progress) {
    localStorage.setItem('cyberMasteryProgress', JSON.stringify(progress));
}

function updateProgressBars(progress) {
    for (let i = 1; i <= 4; i++) {
        const progressBar = document.getElementById(`progress-${i}`);
        const progressText = document.getElementById(`progress-text-${i}`);
        
        if (progressBar) {
            const width = progress[`level${i}`] || 0;
            progressBar.style.width = width + '%';
        }
        
        if (progressText) {
            progressText.textContent = (progress[`level${i}`] || 0) + '%';
        }
    }
}

function updateOverallProgress(progress) {
    const totalProgress = Object.values(progress).filter(v => typeof v === 'number' && v >= 0).reduce((a, b) => a + b, 0) / 4;
    const overallProgressElement = document.getElementById('overall-progress');
    if (overallProgressElement) {
        overallProgressElement.textContent = Math.round(totalProgress) + '%';
    }
}

// Interactive elements
function initializeInteractiveElements() {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            createParticleEffect(this);
        });
    });

    initializeCardHoverEffects();
}

function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const particles = 5;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #6366f1;
            border-radius: 50%;
            pointer-events: none;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: particle-float 1s ease-out forwards;
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

function initializeCardHoverEffects() {
    document.querySelectorAll('.resource-card, .level-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(99, 102, 241, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Quiz integration
function initializeQuizIntegration() {
    // Load quiz system if available
    if (typeof startQuiz !== 'undefined') {
        console.log('Quiz system integrated successfully');
    }
}

// Fixed level start function with proper progression
function startLevel(level) {
    const progress = loadUserProgress();
    const currentProgress = progress[`level${level}`] || 0;
    
    // Check if level is already completed
    if (currentProgress >= 100) {
        showNotification(`✅ Level ${level} already completed! Ready for the next challenge?`, 'info');
        return;
    }
    
    // Check prerequisites for levels 2-4
    if (level > 1) {
        const previousLevelProgress = progress[`level${level-1}`] || 0;
        if (previousLevelProgress < 100) {
            showNotification(`🔒 You must complete Level ${level-1} first! Previous level progress: ${previousLevelProgress}%`, 'warning');
            return;
        }
    }
    
    // Navigate to chapters page for detailed chapter-based learning
    window.location.href = 'chapters.html';
}

// Quick quiz function for immediate testing
function startQuickQuiz(level, difficulty = 'easy') {
    // Store quiz context for immediate quiz access
    sessionStorage.setItem('currentQuiz', JSON.stringify({
        level: level,
        chapter: '1', // Default to first chapter
        difficulty: difficulty,
        chapterTitle: `Level ${level} - Quick Assessment`
    }));
    
    // Navigate to quiz page
    window.location.href = `quiz.html?level=${level}&chapter=1&difficulty=${difficulty}`;
}

function showLevelStartModal(level) {
    const levelNames = {
        1: 'Foundation Building',
        2: 'Technical Skills Development', 
        3: 'Security Specialization',
        4: 'Advanced Mastery'
    };
    
    const objectives = window.learningObjectives ? window.learningObjectives[level] : [
        "Complete learning modules",
        "Pass knowledge check quiz",
        "Demonstrate practical skills"
    ];
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50';
    modal.innerHTML = `
        <div class="flex items-center justify-center min-h-screen p-4">
            <div class="bg-gray-800 rounded-2xl max-w-2xl w-full p-8 border border-gray-700">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold">${level}</span>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">${levelNames[level]}</h3>
                    <p class="text-gray-400">Ready to test your knowledge?</p>
                </div>
                
                <div class="mb-6">
                    <h4 class="text-lg font-semibold mb-3">Learning Objectives:</h4>
                    <ul class="space-y-2">
                        ${objectives.map(objective => `
                            <li class="flex items-center text-sm text-gray-300">
                                <i class="fas fa-check text-green-400 mr-3"></i>
                                ${objective}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="bg-indigo-600/20 border border-indigo-600 rounded-lg p-4 mb-6">
                    <h5 class="font-semibold text-indigo-400 mb-2">Knowledge Check Required</h5>
                    <p class="text-sm text-gray-300">You must pass a quiz with at least ${window.quizDatabase ? window.quizDatabase[level].passingScore : 70}% to complete this level.</p>
                    <p class="text-xs text-gray-400 mt-2">Time limit: ${window.quizDatabase ? window.quizDatabase[level].timeLimit : 20} minutes</p>
                </div>
                
                <div class="flex space-x-4">
                    <button onclick="closeModal()" class="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg transition-colors">
                        <i class="fas fa-times mr-2"></i>Cancel
                    </button>
                    <button onclick="startLevelQuiz(${level})" class="flex-1 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg transition-colors">
                        <i class="fas fa-play mr-2"></i>Start Quiz
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Remove modal when closed
    const closeModal = () => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    };
    
    // Add close functionality
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    window.closeModal = closeModal;
}

function startLevelQuiz(level) {
    closeModal();
    
    // Record quiz attempt
    const progress = loadUserProgress();
    if (!progress.quizAttempts) progress.quizAttempts = {};
    progress.quizAttempts[level] = (progress.quizAttempts[level] || 0) + 1;
    saveUserProgress(progress);
    
    // Start the quiz
    if (typeof startQuiz !== 'undefined') {
        startQuiz(level);
    } else {
        showNotification('Quiz system loading... Please try again in a moment.', 'info');
        setTimeout(() => startLevelQuiz(level), 1000);
    }
}

// Enhanced show resources function with progress tracking
function showResources(level) {
    const modal = document.getElementById('resourceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const data = window.enhancedCurriculumData ? window.enhancedCurriculumData[level] : null;
    if (!data) {
        showNotification(`Resources for Level ${level} not available yet!`, 'warning');
        return;
    }
    
    modalTitle.textContent = data.title;
    
    let content = '';
    
    // Add learning path if available
    if (data.learningPath) {
        content += generateLearningPathHTML(data.learningPath);
    }
    
    // Add specializations if available
    if (data.specializations) {
        content += generateSpecializationsHTML(data.specializations);
    }
    
    // YouTube Resources
    if (data.resources.youtube) {
        content += generateYouTubeSection(data.resources.youtube);
    }
    
    // Online Courses
    if (data.resources.courses) {
        content += generateCoursesSection(data.resources.courses);
    }
    
    // Labs and Tools
    if (data.resources.labs) {
        content += generateLabsSection(data.resources.labs);
    }
    
    // Tools
    if (data.resources.tools) {
        content += generateToolsSection(data.resources.tools);
    }
    
    modalContent.innerHTML = content;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Add event listeners for resource tracking
    addResourceTracking();
}

// Helper functions for resource display
function generateLearningPathHTML(learningPath) {
    return `
        <div class="mb-8">
            <h4 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-route text-indigo-500 mr-3"></i>
                Learning Path
            </h4>
            <div class="grid gap-4">
                ${learningPath.map((week, index) => `
                    <div class="bg-gray-700/50 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h5 class="font-semibold text-lg">Week ${week.week}: ${week.topic}</h5>
                            <button class="text-indigo-400 hover:text-indigo-300 text-sm" onclick="toggleWeekDetails(${index})">
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </div>
                        <div class="week-details-${index} hidden">
                            <div class="mb-3">
                                <h6 class="font-medium text-gray-300 mb-2">Objectives:</h6>
                                <ul class="list-disc list-inside text-sm text-gray-400 space-y-1">
                                    ${week.objectives.map(obj => `<li>${obj}</li>`).join('')}
                                </ul>
                            </div>
                            <div>
                                <h6 class="font-medium text-gray-300 mb-2">Resources:</h6>
                                <div class="space-y-2">
                                    ${week.resources.map(resource => `
                                        <div class="flex items-center justify-between bg-gray-600/50 rounded p-2">
                                            <div>
                                                <span class="font-medium">${resource.title}</span>
                                                <span class="text-xs text-gray-400 ml-2">${resource.type}</span>
                                            </div>
                                            <div class="flex items-center space-x-2">
                                                <span class="text-xs text-gray-400">${resource.duration}</span>
                                                <a href="${resource.url}" target="_blank" class="text-indigo-400 hover:text-indigo-300 text-xs">
                                                    <i class="fas fa-external-link-alt"></i>
                                                </a>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateSpecializationsHTML(specializations) {
    return `
        <div class="mb-8">
            <h4 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-crosshairs text-purple-500 mr-3"></i>
                Specialization Tracks
            </h4>
            <div class="grid gap-4">
                ${specializations.map(spec => `
                    <div class="bg-gray-700/50 rounded-lg p-4">
                        <div class="flex items-center mb-2">
                            <i class="fas fa-shield-alt text-purple-400 mr-3"></i>
                            <h5 class="font-semibold text-lg">${spec.name}</h5>
                        </div>
                        <p class="text-gray-300 text-sm mb-3">${spec.description}</p>
                        <div class="mb-3">
                            <h6 class="font-medium text-gray-300 mb-2">Topics Covered:</h6>
                            <div class="flex flex-wrap gap-2">
                                ${spec.topics.map(topic => `<span class="text-xs bg-purple-600 px-2 py-1 rounded">${topic}</span>`).join('')}
                            </div>
                        </div>
                        <div>
                            <h6 class="font-medium text-gray-300 mb-2">Recommended Resources:</h6>
                            <div class="space-y-1">
                                ${spec.resources.map(resource => `
                                    <div class="flex items-center justify-between bg-gray-600/50 rounded p-2">
                                        <span class="font-medium text-sm">${resource.title}</span>
                                        <div class="flex items-center space-x-2">
                                            <span class="text-xs text-gray-400">${resource.duration}</span>
                                            <a href="${resource.url}" target="_blank" class="text-purple-400 hover:text-purple-300 text-xs">
                                                <i class="fas fa-external-link-alt"></i>
                                            </a>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateYouTubeSection(youtubeResources) {
    return `
        <div class="mb-8">
            <h4 class="text-xl font-bold mb-4 flex items-center">
                <i class="fab fa-youtube text-red-500 mr-3"></i>
                YouTube Playlists & Videos
            </h4>
            <div class="grid gap-4">
                ${youtubeResources.map(resource => `
                    <div class="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors">
                        <div class="flex items-start justify-between mb-2">
                            <h5 class="font-semibold text-lg">${resource.title}</h5>
                            <span class="text-sm text-gray-400">${resource.duration}</span>
                        </div>
                        <p class="text-gray-300 text-sm mb-3">${resource.description}</p>
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center space-x-4">
                                <span class="text-xs bg-red-600 px-2 py-1 rounded">YouTube</span>
                                <span class="text-xs text-gray-400">⭐ ${resource.rating}</span>
                                <span class="text-xs text-gray-400">👁 ${resource.views || 'N/A'}</span>
                                <span class="text-xs text-gray-400">👥 ${resource.subscribers || 'N/A'}</span>
                            </div>
                            <span class="text-xs text-gray-400">${resource.verified ? '✅ Verified' : '⚠️ Check URL'}</span>
                        </div>
                        <a href="${resource.url}" target="_blank" class="inline-flex items-center text-red-400 hover:text-red-300 text-sm">
                            <i class="fab fa-youtube mr-2"></i>Watch Now
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateCoursesSection(courseResources) {
    return `
        <div class="mb-8">
            <h4 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-graduation-cap text-blue-500 mr-3"></i>
                Online Courses
            </h4>
            <div class="grid gap-4">
                ${courseResources.map(course => `
                    <div class="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors">
                        <div class="flex items-start justify-between mb-2">
                            <h5 class="font-semibold text-lg">${course.title}</h5>
                            <span class="text-sm text-gray-400">${course.platform}</span>
                        </div>
                        <p class="text-gray-300 text-sm mb-3">${course.description}</p>
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center space-x-4">
                                <span class="text-xs bg-blue-600 px-2 py-1 rounded">Course</span>
                                <span class="text-xs text-gray-400">⭐ ${course.rating}</span>
                                <span class="text-xs text-gray-400">👥 ${course.students || 'N/A'} students</span>
                            </div>
                            <span class="text-xs text-gray-400">${course.verified ? '✅ Verified' : '⚠️ Check URL'}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-400">${course.duration}</span>
                            <a href="${course.url}" target="_blank" class="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm">
                                <i class="fas fa-graduation-cap mr-2"></i>Start Course
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateLabsSection(labResources) {
    return `
        <div class="mb-8">
            <h4 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-flask text-green-500 mr-3"></i>
                Hands-on Labs & Practice
            </h4>
            <div class="grid gap-4">
                ${labResources.map(lab => `
                    <div class="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors">
                        <div class="flex items-start justify-between mb-2">
                            <h5 class="font-semibold text-lg">${lab.title}</h5>
                            <span class="text-sm text-gray-400">${lab.type}</span>
                        </div>
                        <p class="text-gray-300 text-sm mb-3">${lab.description}</p>
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center space-x-4">
                                <span class="text-xs bg-green-600 px-2 py-1 rounded">Lab</span>
                                <span class="text-xs text-gray-400">👥 ${lab.users || lab.players || lab.participants || 'N/A'} users</span>
                            </div>
                            <span class="text-xs text-gray-400">${lab.verified ? '✅ Verified' : '⚠️ Check URL'}</span>
                        </div>
                        <a href="${lab.url}" target="_blank" class="inline-flex items-center text-green-400 hover:text-green-300 text-sm">
                            <i class="fas fa-flask mr-2"></i>Access Lab
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateToolsSection(toolResources) {
    return `
        <div class="mb-8">
            <h4 class="text-xl font-bold mb-4 flex items-center">
                <i class="fas fa-tools text-purple-500 mr-3"></i>
                Security Tools & Software
            </h4>
            <div class="grid gap-4">
                ${toolResources.map(tool => `
                    <div class="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors">
                        <div class="flex items-start justify-between mb-2">
                            <h5 class="font-semibold text-lg">${tool.title}</h5>
                            <span class="text-sm text-gray-400">${tool.type}</span>
                        </div>
                        <p class="text-gray-300 text-sm mb-3">${tool.description}</p>
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center space-x-4">
                                <span class="text-xs bg-purple-600 px-2 py-1 rounded">Tool</span>
                                <span class="text-xs text-gray-400">📥 ${tool.downloads || 'N/A'} downloads</span>
                            </div>
                            <span class="text-xs text-gray-400">${tool.verified ? '✅ Verified' : '⚠️ Check URL'}</span>
                        </div>
                        <a href="${tool.url}" target="_blank" class="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm">
                            <i class="fas fa-download mr-2"></i>Download Tool
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function toggleWeekDetails(weekIndex) {
    const details = document.querySelector(`.week-details-${weekIndex}`);
    const button = document.querySelector(`button[onclick="toggleWeekDetails(${weekIndex})"] i`);
    
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        button.classList.remove('fa-chevron-down');
        button.classList.add('fa-chevron-up');
    } else {
        details.classList.add('hidden');
        button.classList.remove('fa-chevron-up');
        button.classList.add('fa-chevron-down');
    }
}

function closeModal() {
    const modal = document.getElementById('resourceModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Resource tracking
function addResourceTracking() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            trackResourceClick(this.href, this.textContent);
        });
    });
}

function trackResourceClick(url, title) {
    const progress = loadUserProgress();
    if (!progress.accessedResources.includes(url)) {
        progress.accessedResources.push(url);
        progress.totalStudyTime += 1;
        saveUserProgress(progress);
        updateProgressBars(progress);
        
        showNotification(`📚 Resource accessed: ${title.substring(0, 30)}...`);
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        info: 'bg-indigo-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-600',
        error: 'bg-red-600'
    };
    
    notification.className = `fixed top-20 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Certification roadmap
function initializeCertificationRoadmap() {
    const certifications = [
        {
            name: "CompTIA Network+",
            level: "Foundation",
            cost: "$370",
            description: "Networking fundamentals certification",
            prerequisites: "None",
            careerPaths: ["Network Administrator", "Network Technician"],
            studyTime: "3-6 months"
        },
        {
            name: "CompTIA Security+",
            level: "Intermediate",
            cost: "$392",
            description: "Core cybersecurity skills certification",
            prerequisites: "Network+ recommended",
            careerPaths: ["Security Analyst", "SOC Analyst", "Security Engineer"],
            studyTime: "6-12 months"
        },
        {
            name: "Certified Ethical Hacker (CEH)",
            level: "Advanced",
            cost: "$1,199",
            description: "Ethical hacking and penetration testing",
            prerequisites: "2 years experience",
            careerPaths: ["Penetration Tester", "Ethical Hacker", "Security Consultant"],
            studyTime: "12-18 months"
        },
        {
            name: "Offensive Security Certified Professional (OSCP)",
            level: "Expert",
            cost: "$1,599",
            description: "Hands-on penetration testing certification",
            prerequisites: "Advanced technical skills",
            careerPaths: ["Senior Penetration Tester", "Red Team Member"],
            studyTime: "18-24 months"
        }
    ];

    const certSection = document.getElementById('certifications');
    if (certSection) {
        addCertificationInteractivity();
    }
}

function addCertificationInteractivity() {
    document.querySelectorAll('.certification-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            showCertificationDetails(index);
        });
    });
}

function showCertificationDetails(certIndex) {
    const certifications = [
        'CompTIA Network+ - Foundation level networking certification',
        'CompTIA Security+ - Core cybersecurity skills certification', 
        'CEH - Certified Ethical Hacker for penetration testing',
        'OSCP - Offensive Security Certified Professional for advanced pentesting'
    ];
    
    showNotification(`📋 ${certifications[certIndex]} - Complete the learning path to prepare for this certification!`, 'info');
}

// Utility functions
function celebrateCompletion() {
    const celebration = document.createElement('div');
    celebration.className = 'fixed inset-0 pointer-events-none z-50';
    celebration.innerHTML = '🎉🎊🥳'.repeat(20);
    document.body.appendChild(celebration);
    
    setTimeout(() => celebration.remove(), 3000);
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-float {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(0); opacity: 0; }
    }
    
    .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .timeline-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .resource-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px rgba(99, 102, 241, 0.2);
    }
    
    .level-card:hover {
        transform: scale(1.02);
    }
`;
document.head.appendChild(style);

// Chapter System Integration
function initializeChapterSystem() {
    // Add chapter progress tracking to existing progress system
    const progress = loadUserProgress();
    if (!progress.completedChapters) {
        progress.completedChapters = [];
    }
    if (!progress.chapterProgress) {
        progress.chapterProgress = {};
    }
    saveUserProgress(progress);
    
    // Update dashboard with chapter information
    updateChapterDisplay();
}

function updateChapterDisplay() {
    const progress = loadUserProgress();
    const chaptersElement = document.getElementById('completed-chapters');
    if (chaptersElement && progress.completedChapters) {
        chaptersElement.textContent = `${progress.completedChapters.length}/16`;
    }
}

// Enhanced achievement system with chapter progress
function loadAchievements() {
    const progress = loadUserProgress();
    const achievementContainer = document.getElementById('achievements-container');
    
    if (!achievementContainer) return;
    
    const achievements = [
        { id: 'first_quiz', name: 'First Steps', description: 'Complete your first quiz', icon: '🎯', unlocked: progress.completedQuizzes && progress.completedQuizzes.length > 0 },
        { id: 'level1_master', name: 'Foundation Master', description: 'Complete Level 1', icon: '🏆', unlocked: progress.level1 >= 100 },
        { id: 'quiz_warrior', name: 'Quiz Warrior', description: 'Complete 5 quizzes', icon: '⚔️', unlocked: progress.completedQuizzes && progress.completedQuizzes.length >= 5 },
        { id: 'chapter_explorer', name: 'Chapter Explorer', description: 'Complete 4 chapters', icon: '📚', unlocked: progress.completedChapters && progress.completedChapters.length >= 4 },
        { id: 'difficulty_master', name: 'Difficulty Master', description: 'Complete a hard quiz', icon: '💪', unlocked: progress.completedQuizzes && progress.completedQuizzes.some(q => q.difficulty === 'hard') },
        { id: 'all_levels', name: 'Cyber Guardian', description: 'Complete all levels', icon: '🛡️', unlocked: progress.level1 >= 100 && progress.level2 >= 100 && progress.level3 >= 100 && progress.level4 >= 100 }
    ];
    
    achievementContainer.innerHTML = achievements.map(achievement => `
        <div class="achievement-card relative p-4 rounded-lg border ${achievement.unlocked ? 'bg-emerald-900/30 border-emerald-700' : 'bg-slate-800/50 border-slate-600'}">
            <div class="text-2xl mb-2">${achievement.icon}</div>
            <div class="font-semibold text-sm ${achievement.unlocked ? 'text-emerald-400' : 'text-slate-400'}">${achievement.name}</div>
            <div class="text-xs text-slate-400 mt-1">${achievement.description}</div>
            ${achievement.unlocked ? '<i class="fas fa-check-circle text-emerald-400 absolute top-2 right-2"></i>' : '<i class="fas fa-lock text-slate-500 absolute top-2 right-2"></i>'}
        </div>
    `).join('');
}

// Export functions
window.startLevel = startLevel;
window.showResources = showResources;
window.closeModal = closeModal;
window.startLevelQuiz = startLevelQuiz;
window.toggleWeekDetails = toggleWeekDetails;
window.startQuickQuiz = startQuickQuiz;

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        if (typeof closeQuiz !== 'undefined') closeQuiz();
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
           