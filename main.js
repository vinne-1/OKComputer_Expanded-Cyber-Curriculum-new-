// Initialize Vanta.js background
document.addEventListener('DOMContentLoaded', function() {
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

    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize progress bars with real progress
    renderLevelProgress();

    // Fallback: ensure timeline items are visible if observer doesn't trigger
    setTimeout(() => {
        document.querySelectorAll('.timeline-item').forEach(item => {
            if (!item.classList.contains('visible')) {
                item.classList.add('visible');
            }
        });
    }, 500);
});

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    try {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
    
        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
    } catch (e) {
        // If IntersectionObserver is unavailable, show items immediately
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.classList.add('visible');
        });
    }
}

// Progress calculation and rendering
const levelChapterCounts = { 1: 4, 2: 4, 3: 4, 4: 4 };

function slugify(text) {
    return (text || '')
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

function getResourceIdsForLevel(level) {
    const data = curriculumData[level];
    if (!data) return [];
    const ids = [];
    const res = data.resources || {};
    const addFrom = (arr, prefix) => {
        if (Array.isArray(arr)) {
            arr.forEach(item => {
                if (item && (item.url || item.title)) {
                    ids.push(`${prefix}:${slugify(item.title || item.url)}`);
                }
            });
        }
    };
    addFrom(res.youtube, 'yt');
    addFrom(res.courses, 'course');
    addFrom(res.labs, 'lab');
    addFrom(res.books, 'book');
    addFrom(res.tools, 'tool');
    // specializations and advancedTopics may not have URLs; omit from "must visit"
    return ids;
}

function getResourceProgressStore() {
    try {
        return JSON.parse(localStorage.getItem('resourceProgress') || '{}');
    } catch {
        return {};
    }
}

function saveResourceProgressStore(store) {
    localStorage.setItem('resourceProgress', JSON.stringify(store));
}

function markResourceVisited(level, resId) {
    const store = getResourceProgressStore();
    const key = `level${level}`;
    if (!store[key]) store[key] = { visited: [] };
    if (!store[key].visited.includes(resId)) {
        store[key].visited.push(resId);
        saveResourceProgressStore(store);
        showNotification('Resource marked as visited ✅');
        renderLevelProgress();
    }
}

function hasCompletedAllResources(level) {
    const required = getResourceIdsForLevel(level);
    const store = getResourceProgressStore();
    const visited = (store[`level${level}`]?.visited) || [];
    return required.length > 0 && required.every(id => visited.includes(id));
}

function getLevelChapterCompletion(level) {
    try {
        const progress = JSON.parse(localStorage.getItem('chapterProgress') || '{}');
        const completed = progress.completedChapters || [];
        const count = levelChapterCounts[level] || 0;
        let completedInLevel = 0;
        for (let i = 1; i <= count; i++) {
            if (completed.includes(`${level}-${i}`)) completedInLevel++;
        }
        return { completedInLevel, count };
    } catch {
        return { completedInLevel: 0, count: levelChapterCounts[level] || 0 };
    }
}

function hasCompletedAllQuizzes(level) {
    const { completedInLevel, count } = getLevelChapterCompletion(level);
    return count > 0 && completedInLevel === count;
}

function computeLevelProgressPercent(level) {
    // 50% resources + 50% quizzes
    const required = getResourceIdsForLevel(level);
    const store = getResourceProgressStore();
    const visited = (store[`level${level}`]?.visited) || [];
    const resourcePercent = required.length ? Math.min(100, Math.round((visited.length / required.length) * 100)) : 0;
    const { completedInLevel, count } = getLevelChapterCompletion(level);
    const quizPercent = count ? Math.min(100, Math.round((completedInLevel / count) * 100)) : 0;
    const total = Math.round(resourcePercent * 0.5 + quizPercent * 0.5);
    return total;
}

function renderLevelProgress() {
    [1,2,3,4].forEach(level => {
        const percent = computeLevelProgressPercent(level);
        const bar = document.getElementById(`progress-${level}`);
        if (bar) bar.style.width = percent + '%';
    });
}

// Curriculum data
const curriculumData = {
    1: {
        title: "Foundation Building - Resources",
        resources: {
            youtube: [
                {
                    title: "NetworkChuck - CCNA Playlist",
                    url: "https://www.youtube.com/playlist?list=PLIhvCqeVj4n5n4YfX8U0d9d9Mn8mLQsHR",
                    description: "Comprehensive CCNA networking fundamentals with hands-on labs",
                    duration: "40+ hours",
                    icon: "fab fa-youtube text-red-500"
                },
                {
                    title: "Professor Messer - Network+ Training",
                    url: "https://www.youtube.com/playlist?list=PLG49S3nxzabmK6pxr5mxFzSMg1wX2Q-ek",
                    description: "Free Network+ certification training course covering all exam objectives",
                    duration: "30+ hours", 
                    icon: "fab fa-youtube text-red-500"
                },
                {
                    title: "The Cyber Mentor - Linux Basics",
                    url: "https://www.youtube.com/watch?v=IVquJh3DXUA",
                    description: "Essential Linux command line skills for cybersecurity",
                    duration: "2 hours",
                    icon: "fab fa-youtube text-red-500"
                }
            ],
            courses: [
                {
                    title: "Cisco Networking Basics",
                    platform: "Cybrary",
                    url: "https://www.cybrary.it/course/cisco-networking-fundamentals",
                    description: "Free introduction to Cisco networking concepts and configurations",
                    duration: "8 hours",
                    icon: "fas fa-graduation-cap text-blue-500"
                },
                {
                    title: "Introduction to Computer Networks",
                    platform: "Coursera",
                    url: "https://www.coursera.org/learn/computer-networking",
                    description: "University-level networking fundamentals from Stanford",
                    duration: "12 weeks",
                    icon: "fas fa-university text-blue-500"
                },
                {
                    title: "Networking Fundamentals",
                    platform: "Cisco Networking Academy",
                    url: "https://www.netacad.com/courses/networking/networking-fundamentals",
                    description: "Official Cisco networking fundamentals course",
                    duration: "16 hours",
                    icon: "fas fa-certificate text-green-500"
                }
            ],
            labs: [
                {
                    title: "Cisco Packet Tracer",
                    url: "https://www.netacad.com/courses/packet-tracer",
                    description: "Free network simulation tool from Cisco for hands-on practice",
                    type: "Software",
                    icon: "fas fa-flask text-green-500"
                },
                {
                    title: "TryHackMe - Networking Basics",
                    url: "https://tryhackme.com/room/networking101",
                    description: "Interactive networking fundamentals with guided exercises",
                    type: "Interactive Lab",
                    icon: "fas fa-flask text-green-500"
                },
                {
                    title: "GNS3 Network Simulator",
                    url: "https://www.gns3.com/",
                    description: "Advanced network simulation platform for complex topologies",
                    type: "Software",
                    icon: "fas fa-flask text-green-500"
                }
            ],
            books: [
                {
                    title: "Computer Networking: A Top-Down Approach",
                    author: "Kurose & Ross",
                    description: "Comprehensive networking textbook used in universities",
                    url: "https://www.pearson.com/us/higher-education/series/kurose-ross-computer-networking-a-top-down-approach-series/106371.html",
                    icon: "fas fa-book text-orange-500"
                },
                {
                    title: "Network+ Study Guide",
                    author: "Exam Cram",
                    description: "Focused study guide for CompTIA Network+ certification",
                    url: "https://www.amazon.com/CompTIA-Network-Study-Guide-Exam/dp/1119433076",
                    icon: "fas fa-book text-orange-500"
                }
            ]
        }
    },
    2: {
        title: "Technical Skills Development - Resources",
        resources: {
            youtube: [
                {
                    title: "Professor Messer - Security+ SY0-701",
                    url: "https://www.youtube.com/playlist?list=PLG49S3nxzabkK6pxr5mxFzSMg1wX2Q-ek",
                    description: "Complete free Security+ training course for certification",
                    duration: "35+ hours",
                    icon: "fab fa-youtube text-red-500"
                },
                {
                    title: "John Hammond - Python for Security",
                    url: "https://www.youtube.com/playlist?list=PLx4x_zx8vUo8J-2-g4GJrxjYnxz1nn6oi",
                    description: "Python scripting for cybersecurity automation and tools",
                    duration: "15+ hours",
                    icon: "fab fa-youtube text-red-500"
                },
                {
                    title: "NetworkChuck - Linux for Hackers",
                    url: "https://www.youtube.com/watch?v=IVquJh3DXUA",
                    description: "Essential Linux skills and command line mastery",
                    duration: "3 hours",
                    icon: "fab fa-youtube text-red-500"
                }
            ],
            courses: [
                {
                    title: "CompTIA Security+ SY0-701",
                    platform: "Professor Messer",
                    url: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video-course/",
                    description: "Free comprehensive Security+ certification training",
                    duration: "35 hours",
                    icon: "fas fa-graduation-cap text-blue-500"
                },
                {
                    title: "Linux System Administration",
                    platform: "Linux Foundation",
                    url: "https://training.linuxfoundation.org/training/linux-system-administration/",
                    description: "Free Linux admin fundamentals and command line skills",
                    duration: "20 hours",
                    icon: "fas fa-graduation-cap text-blue-500"
                },
                {
                    title: "Python for Cybersecurity",
                    platform: "Cybrary",
                    url: "https://www.cybrary.it/course/python-for-security",
                    description: "Learn Python for security automation and scripting",
                    duration: "12 hours",
                    icon: "fas fa-graduation-cap text-blue-500"
                }
            ],
            labs: [
                {
                    title: "TryHackMe - Linux Fundamentals",
                    url: "https://tryhackme.com/room/linuxfundamentals",
                    description: "Hands-on Linux learning with real-world scenarios",
                    type: "Interactive Lab",
                    icon: "fas fa-flask text-green-500"
                },
                {
                    title: "Hack The Box - Starting Point",
                    url: "https://www.hackthebox.com/starting-point",
                    description: "Beginner-friendly penetration testing labs",
                    type: "Virtual Lab",
                    icon: "fas fa-flask text-green-500"
                },
                {
                    title: "OverTheWire - Bandit",
                    url: "https://overthewire.org/wargames/bandit/",
                    description: "Linux command line security challenges",
                    type: "Wargame",
                    icon: "fas fa-flask text-green-500"
                }
            ],
            tools: [
                {
                    title: "Nmap Network Scanner",
                    url: "https://nmap.org/",
                    description: "Network discovery and security auditing tool",
                    type: "Security Tool",
                    icon: "fas fa-tools text-purple-500"
                },
                {
                    title: "Wireshark Packet Analyzer",
                    url: "https://www.wireshark.org/",
                    description: "Network protocol analyzer for traffic inspection",
                    type: "Security Tool",
                    icon: "fas fa-tools text-purple-500"
                },
                {
                    title: "Metasploit Framework",
                    url: "https://www.metasploit.com/",
                    description: "Penetration testing framework",
                    type: "Security Tool",
                    icon: "fas fa-tools text-purple-500"
                }
            ]
        }
    },
    3: {
        title: "Security Specialization - Resources",
        resources: {
            youtube: [
                {
                    title: "IppSec - HackTheBox Walkthroughs",
                    url: "https://www.youtube.com/c/IppSec",
                    description: "Penetration testing techniques and methodology",
                    duration: "100+ hours",
                    icon: "fab fa-youtube text-red-500"
                },
                {
                    title: "STÖK - Web Application Security",
                    url: "https://www.youtube.com/c/STOK",
                    description: "Advanced web security concepts and bug bounty hunting",
                    duration: "50+ hours",
                    icon: "fab fa-youtube text-red-500"
                },
                {
                    title: "SANS DFIR - Digital Forensics",
                    url: "https://www.youtube.com/c/SANSInstitute",
                    description: "Digital forensics and incident response techniques",
                    duration: "30+ hours",
                    icon: "fab fa-youtube text-red-500"
                }
            ],
            courses: [
                {
                    title: "Ethical Hacking Essentials",
                    platform: "SANS Cyber Aces",
                    url: "https://cyberaces.org/courses/",
                    description: "Free ethical hacking fundamentals from SANS Institute",
                    duration: "15 hours",
                    icon: "fas fa-graduation-cap text-blue-500"
                },
                {
                    title: "Digital Forensics Basics",
                    platform: "Cybrary",
                    url: "https://www.cybrary.it/course/digital-forensics",
                    description: "Introduction to digital forensics and incident response",
                    duration: "10 hours",
                    icon: "fas fa-graduation-cap text-blue-500"
                },
                {
                    title: "Web Application Security",
                    platform: "PortSwigger Academy",
                    url: "https://portswigger.net/web-security-academy",
                    description: "Free web application security training from Burp Suite creators",
                    duration: "Self-paced",
                    icon: "fas fa-graduation-cap text-blue-500"
                }
            ],
            labs: [
                {
                    title: "TryHackMe - OWASP Top 10",
                    url: "https://tryhackme.com/room/owasptop10",
                    description: "Web application security vulnerabilities hands-on practice",
                    type: "Interactive Lab",
                    icon: "fas fa-flask text-green-500"
                },
                {
                    title: "CyberDefenders - Blue Team Labs",
                    url: "https://cyberdefenders.org/",
                    description: "Defensive security challenges and forensics practice",
                    type: "Challenge Platform",
                    icon: "fas fa-flask text-green-500"
                },
                {
                    title: "HackTheBox Machines",
                    url: "https://www.hackthebox.com/machines",
                    description: "Penetration testing practice on realistic targets",
                    type: "Virtual Lab",
                    icon: "fas fa-flask text-green-500"
                }
            ],
            specializations: [
                {
                    title: "Penetration Testing",
                    description: "Offensive security and ethical hacking techniques",
                    path: "Red Team",
                    icon: "fas fa-bug text-red-500"
                },
                {
                    title: "Digital Forensics",
                    description: "Incident response and digital investigation",
                    path: "Blue Team",
                    icon: "fas fa-search text-blue-500"
                },
                {
                    title: "Malware Analysis",
                    description: "Reverse engineering and malware research",
                    path: "Research",
                    icon: "fas fa-microscope text-green-500"
                }
            ]
        }
    },
    4: {
        title: "Advanced Mastery - Resources",
        resources: {
            youtube: [
                {
                    title: "Black Hat Conference Talks",
                    url: "https://www.youtube.com/c/BlackHatOfficial",
                    description: "Latest cybersecurity research and industry trends",
                    duration: "200+ hours",
                    icon: "fab fa-youtube text-red-500"
                },
                {
                    title: "DEF CON Conference Videos",
                    url: "https://www.youtube.com/user/DEFCONConference",
                    description: "Advanced security research and hacking techniques",
                    duration: "300+ hours",
                    icon: "fab fa-youtube text-red-500"
                },
                {
                    title: "SANS Webcasts",
                    url: "https://www.youtube.com/c/SANSInstitute",
                    description: "Professional cybersecurity training and insights",
                    duration: "100+ hours",
                    icon: "fab fa-youtube text-red-500"
                }
            ],
            courses: [
                {
                    title: "Advanced Cybersecurity Training",
                    platform: "MIT OpenCourseWare",
                    url: "https://ocw.mit.edu/courses/cybersecurity/",
                    description: "University-level cybersecurity courses from MIT",
                    duration: "Various",
                    icon: "fas fa-graduation-cap text-blue-500"
                },
                {
                    title: "Cloud Security Fundamentals",
                    platform: "Cloud Security Alliance",
                    url: "https://cloudsecurityalliance.org/education/",
                    description: "Cloud security best practices and frameworks",
                    duration: "20 hours",
                    icon: "fas fa-graduation-cap text-blue-500"
                },
                {
                    title: "Industrial Control Systems Security",
                    platform: "SANS Institute",
                    url: "https://www.sans.org/courses/ics-security/",
                    description: "SCADA and ICS cybersecurity specialization",
                    duration: "40 hours",
                    icon: "fas fa-graduation-cap text-blue-500"
                }
            ],
            labs: [
                {
                    title: "AttackDefense - Advanced Labs",
                    url: "https://attackdefense.com/",
                    description: "1800+ cybersecurity lab exercises across all domains",
                    type: "Lab Platform",
                    icon: "fas fa-flask text-green-500"
                },
                {
                    title: "RangeForce - SOC Training",
                    url: "https://rangeforce.com/",
                    description: "Security operations center simulation and training",
                    type: "Simulation",
                    icon: "fas fa-flask text-green-500"
                },
                {
                    title: "Immersive Labs Community",
                    url: "https://immersivelabs.com/",
                    description: "Advanced cybersecurity skills development platform",
                    type: "Challenge Platform",
                    icon: "fas fa-flask text-green-500"
                }
            ],
            advancedTopics: [
                {
                    title: "Threat Hunting",
                    description: "Proactive threat detection and analysis",
                    tools: ["Elastic Stack", "Sigma Rules", "YARA"],
                    icon: "fas fa-search text-yellow-500"
                },
                {
                    title: "Malware Analysis",
                    description: "Advanced reverse engineering techniques",
                    tools: ["IDA Pro", "Ghidra", "Cuckoo Sandbox"],
                    icon: "fas fa-virus text-red-500"
                },
                {
                    title: "Cloud Security",
                    description: "AWS, Azure, and GCP security",
                    tools: ["Prowler", "ScoutSuite", "CloudSploit"],
                    icon: "fas fa-cloud text-blue-500"
                },
                {
                    title: "ICS/SCADA Security",
                    description: "Industrial control systems protection",
                    tools: ["Nmap ICS", "Metasploit ICS", "Shodan"],
                    icon: "fas fa-industry text-orange-500"
                }
            ]
        }
    }
};

// Show resources modal
function showResources(level) {
    const modal = document.getElementById('resourceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const data = curriculumData[level];
    if (!data) return;
    
    modalTitle.textContent = data.title;
    
    let content = '';
    
    // YouTube Resources
    if (data.resources.youtube) {
        content += `
            <div class="mb-8">
                <h4 class="text-xl font-bold mb-4 flex items-center">
                    <i class="fab fa-youtube text-red-500 mr-3"></i>
                    YouTube Playlists & Videos
                </h4>
                <div class="grid gap-4">
        `;
        
        data.resources.youtube.forEach(resource => {
            const resId = `yt:${slugify(resource.title || resource.url)}`;
            content += `
                <div class="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors">
                    <div class="flex items-start justify-between mb-2">
                        <h5 class="font-semibold text-lg">${resource.title}</h5>
                        <span class="text-sm text-gray-400">${resource.duration}</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-3">${resource.description}</p>
                    <a href="${resource.url}" target="_blank" class="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm" onclick="markResourceVisited(${level}, '${resId}')">
                        <i class="fas fa-external-link-alt mr-2"></i>Watch Now
                    </a>
                </div>
            `;
        });
        
        content += `</div></div>`;
    }
    
    // Online Courses
    if (data.resources.courses) {
        content += `
            <div class="mb-8">
                <h4 class="text-xl font-bold mb-4 flex items-center">
                    <i class="fas fa-graduation-cap text-blue-500 mr-3"></i>
                    Online Courses
                </h4>
                <div class="grid gap-4">
        `;
        
        data.resources.courses.forEach(course => {
            const resId = `course:${slugify(course.title || course.url)}`;
            content += `
                <div class="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors">
                    <div class="flex items-start justify-between mb-2">
                        <h5 class="font-semibold text-lg">${course.title}</h5>
                        <span class="text-sm text-gray-400">${course.platform}</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-3">${course.description}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-400">${course.duration}</span>
                        <a href="${course.url}" target="_blank" class="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm" onclick="markResourceVisited(${level}, '${resId}')">
                            <i class="fas fa-external-link-alt mr-2"></i>Start Course
                        </a>
                    </div>
                </div>
            `;
        });
        
        content += `</div></div>`;
    }
    
    // Labs and Tools
    if (data.resources.labs) {
        content += `
            <div class="mb-8">
                <h4 class="text-xl font-bold mb-4 flex items-center">
                    <i class="fas fa-flask text-green-500 mr-3"></i>
                    Hands-on Labs & Tools
                </h4>
                <div class="grid gap-4">
        `;
        
        data.resources.labs.forEach(lab => {
            const resId = `lab:${slugify(lab.title || lab.url)}`;
            content += `
                <div class="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors">
                    <div class="flex items-start justify-between mb-2">
                        <h5 class="font-semibold text-lg">${lab.title}</h5>
                        <span class="text-sm text-gray-400">${lab.type}</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-3">${lab.description}</p>
                    <a href="${lab.url}" target="_blank" class="inline-flex items-center text-green-400 hover:text-green-300 text-sm" onclick="markResourceVisited(${level}, '${resId}')">
                        <i class="fas fa-external-link-alt mr-2"></i>Access Lab
                    </a>
                </div>
            `;
        });
        
        content += `</div></div>`;
    }
    
    // Specializations (Level 3)
    if (data.resources.specializations) {
        content += `
            <div class="mb-8">
                <h4 class="text-xl font-bold mb-4 flex items-center">
                    <i class="fas fa-route text-purple-500 mr-3"></i>
                    Specialization Paths
                </h4>
                <div class="grid gap-4">
        `;
        
        data.resources.specializations.forEach(spec => {
            content += `
                <div class="bg-gray-700/50 rounded-lg p-4">
                    <div class="flex items-center mb-2">
                        <i class="${spec.icon} mr-3 text-xl"></i>
                        <h5 class="font-semibold text-lg">${spec.title}</h5>
                    </div>
                    <p class="text-gray-300 text-sm mb-2">${spec.description}</p>
                    <span class="text-xs text-gray-400">Path: ${spec.path}</span>
                </div>
            `;
        });
        
        content += `</div></div>`;
    }
    
    // Advanced Topics (Level 4)
    if (data.resources.advancedTopics) {
        content += `
            <div class="mb-8">
                <h4 class="text-xl font-bold mb-4 flex items-center">
                    <i class="fas fa-rocket text-yellow-500 mr-3"></i>
                    Advanced Topics
                </h4>
                <div class="grid gap-4">
        `;
        
        data.resources.advancedTopics.forEach(topic => {
            content += `
                <div class="bg-gray-700/50 rounded-lg p-4">
                    <div class="flex items-center mb-2">
                        <i class="${topic.icon} mr-3 text-xl"></i>
                        <h5 class="font-semibold text-lg">${topic.title}</h5>
                    </div>
                    <p class="text-gray-300 text-sm mb-3">${topic.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${topic.tools.map(tool => `<span class="text-xs bg-gray-600 px-2 py-1 rounded">${tool}</span>`).join('')}
                    </div>
                </div>
            `;
        });
        
        content += `</div></div>`;
    }
    
    // Quick CTA to chapters
    content += `
        <div class="mt-6 text-right">
            <button class="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg text-sm" onclick="window.location.href='chapters.html'">
                Go to Chapters & Quizzes
            </button>
        </div>
    `;
    modalContent.innerHTML = content;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('resourceModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Start level
function startLevel(level) {
    // Gate completion by resources + quizzes
    const resourcesDone = hasCompletedAllResources(level);
    const quizzesDone = hasCompletedAllQuizzes(level);
    if (!resourcesDone) {
        showNotification(`Complete all Level ${level} resources before proceeding. Opening resources...`);
        showResources(level);
        return;
    }
    if (!quizzesDone) {
        showNotification(`Now complete all Level ${level} chapter quizzes to pass. Redirecting...`);
        // Navigate to chapters to take quizzes
        window.location.href = 'chapters.html';
        return;
    }
    // If both complete, mark level as completed and render progress
    showNotification(`Level ${level} completed! 🎉`);
    renderLevelProgress();
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('resourceModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.resource-card, .level-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Progress tracking simulation
let userProgress = {
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0
};

function updateProgress(level, progress) {
    userProgress[`level${level}`] = progress;
    const progressBar = document.getElementById(`progress-${level}`);
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// Initial render already handled by renderLevelProgress()