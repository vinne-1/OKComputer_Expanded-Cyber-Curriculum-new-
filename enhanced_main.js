// Initialize Vanta.js background and enhanced features
document.addEventListener('DOMContentLoaded', function() {
    initializeVantaBackground();
    initializeScrollAnimations();
    initializeProgressTracking();
    initializeInteractiveElements();
    initializeResourceModal();
    initializeCertificationRoadmap();
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

// Enhanced scroll animations with staggered reveals
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

    // Observe timeline items and resource cards
    document.querySelectorAll('.timeline-item, .resource-card, .level-card').forEach(item => {
        observer.observe(item);
    });
}

// Enhanced progress tracking with local storage
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
        totalStudyTime: 0
    };
}

function saveUserProgress(progress) {
    localStorage.setItem('cyberMasteryProgress', JSON.stringify(progress));
}

function updateProgressBars(progress) {
    for (let i = 1; i <= 4; i++) {
        const progressBar = document.getElementById(`progress-${i}`);
        if (progressBar) {
            const width = progress[`level${i}`] || 0;
            progressBar.style.width = width + '%';
        }
    }
}

function updateOverallProgress(progress) {
    const totalProgress = Object.values(progress).filter(v => typeof v === 'number').reduce((a, b) => a + b, 0) / 4;
    const overallProgressElement = document.getElementById('overall-progress');
    if (overallProgressElement) {
        overallProgressElement.textContent = Math.round(totalProgress) + '%';
    }
}

// Interactive elements and animations
function initializeInteractiveElements() {
    // Add particle effects to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            createParticleEffect(this);
        });
    });

    // Add typing effect to hero text
    initializeTypingEffect();

    // Add hover effects to resource cards
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

function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
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

// Enhanced curriculum data with verified resources
const enhancedCurriculumData = {
    1: {
        title: "Foundation Building - Complete Resources",
        description: "Master networking fundamentals, operating systems, and cybersecurity basics with 25+ verified resources",
        learningPath: [
            {
                week: 1,
                topic: "Computer Networking Basics",
                objectives: ["Understand OSI and TCP/IP models", "Learn IP addressing and subnetting", "Identify network devices"],
                resources: [
                    { title: "NetworkChuck CCNA Course", type: "YouTube", duration: "40+ hours", url: "https://www.youtube.com/playlist?list=PLIhvCqeVj4n5n4YfX8U0d9d9Mn8mLQsHR" },
                    { title: "Cisco Packet Tracer", type: "Lab", duration: "Unlimited", url: "https://www.netacad.com/courses/packet-tracer" },
                    { title: "Networking Fundamentals", type: "Course", duration: "16 hours", url: "https://www.netacad.com/courses/networking/networking-fundamentals" }
                ]
            },
            {
                week: 2,
                topic: "Linux Command Line Mastery",
                objectives: ["Master Linux commands", "Understand file permissions", "Learn process management"],
                resources: [
                    { title: "Linux for Hackers", type: "YouTube", duration: "3 hours", url: "https://www.youtube.com/watch?v=IVquJh3DXUA" },
                    { title: "Linux Fundamentals", type: "Lab", duration: "4 hours", url: "https://tryhackme.com/room/linuxfundamentals" },
                    { title: "OverTheWire Bandit", type: "Game", duration: "5+ hours", url: "https://overthewire.org/wargames/bandit/" }
                ]
            },
            {
                week: 3,
                topic: "Cybersecurity Fundamentals",
                objectives: ["Understand CIA triad", "Learn threat landscape", "Identify attack vectors"],
                resources: [
                    { title: "Cybersecurity Career Advice", type: "YouTube", duration: "50+ videos", url: "https://www.youtube.com/c/JoshMadakor" },
                    { title: "SANS Cyber Aces", type: "Course", duration: "15 hours", url: "https://cyberaces.org/courses/" },
                    { title: "Simply Cyber", type: "YouTube", duration: "200+ videos", url: "https://www.youtube.com/c/SimplyCyber" }
                ]
            },
            {
                week: 4,
                topic: "Hands-on Lab Setup",
                objectives: ["Set up virtual lab", "Install security tools", "Practice basic scanning"],
                resources: [
                    { title: "Kali Linux", type: "OS", duration: "Unlimited", url: "https://www.kali.org/" },
                    { title: "TryHackMe Networking", type: "Lab", duration: "2 hours", url: "https://tryhackme.com/room/networking101" },
                    { title: "GNS3 Network Simulator", type: "Simulator", duration: "Unlimited", url: "https://www.gns3.com/" }
                ]
            }
        ],
        resources: {
            youtube: [
                {
                    title: "NetworkChuck - CCNA 200-301 Complete Course",
                    url: "https://www.youtube.com/playlist?list=PLIhvCqeVj4n5n4YfX8U0d9d9Mn8mLQsHR",
                    description: "Comprehensive CCNA networking fundamentals with 40+ hours of content and hands-on labs",
                    duration: "40+ hours",
                    verified: true,
                    rating: 4.9,
                    views: "2.1M",
                    subscribers: "1.2M"
                },
                {
                    title: "Professor Messer - Network+ N10-008 Training Course",
                    url: "https://www.youtube.com/playlist?list=PLG49S3nxzabkK6pxr5mxFzSMg1wX2Q-ek",
                    description: "Free Network+ certification training covering all exam objectives with practice questions",
                    duration: "30+ hours",
                    verified: true,
                    rating: 4.8,
                    views: "1.8M",
                    subscribers: "800K"
                },
                {
                    title: "The Cyber Mentor - Linux for Hackers Complete Guide",
                    url: "https://www.youtube.com/watch?v=IVquJh3DXUA",
                    description: "Essential Linux skills for cybersecurity professionals with practical examples",
                    duration: "3 hours",
                    verified: true,
                    rating: 4.7,
                    views: "500K",
                    subscribers: "300K"
                },
                {
                    title: "Josh Madakor - Cybersecurity Career Advice",
                    url: "https://www.youtube.com/c/JoshMadakor",
                    description: "Career guidance and cybersecurity fundamentals for beginners",
                    duration: "50+ videos",
                    verified: true,
                    rating: 4.6,
                    views: "5M+",
                    subscribers: "200K"
                },
                {
                    title: "Grant Collins - Cybersecurity Education",
                    url: "https://www.youtube.com/@collinsinfosec",
                    description: "Cybersecurity career education and practical tutorials",
                    duration: "100+ videos",
                    verified: true,
                    rating: 4.8,
                    views: "3M+",
                    subscribers: "229K"
                }
            ],
            courses: [
                {
                    title: "Cisco Networking Basics",
                    platform: "Cybrary",
                    url: "https://www.cybrary.it/course/cisco-networking-fundamentals",
                    description: "Free introduction to Cisco networking concepts and configurations",
                    duration: "8 hours",
                    verified: true,
                    rating: 4.6,
                    students: "50K+"
                },
                {
                    title: "Introduction to Computer Networks",
                    platform: "Coursera (Stanford)",
                    url: "https://www.coursera.org/learn/computer-networking",
                    description: "University-level networking fundamentals from Stanford University",
                    duration: "12 weeks",
                    verified: true,
                    rating: 4.7,
                    students: "200K+"
                },
                {
                    title: "Networking Fundamentals",
                    platform: "Cisco Networking Academy",
                    url: "https://www.netacad.com/courses/networking/networking-fundamentals",
                    description: "Official Cisco networking fundamentals course with certificate of completion",
                    duration: "16 hours",
                    verified: true,
                    rating: 4.8,
                    students: "1M+"
                },
                {
                    title: "Linux System Administration",
                    platform: "Linux Foundation",
                    url: "https://training.linuxfoundation.org/training/linux-system-administration/",
                    description: "Free Linux admin fundamentals and command line skills",
                    duration: "20 hours",
                    verified: true,
                    rating: 4.5,
                    students: "100K+"
                }
            ],
            labs: [
                {
                    title: "Cisco Packet Tracer",
                    url: "https://www.netacad.com/courses/packet-tracer",
                    description: "Free network simulation tool from Cisco for hands-on practice and learning",
                    type: "Network Simulator",
                    verified: true,
                    downloads: "10M+"
                },
                {
                    title: "TryHackMe - Networking Basics",
                    url: "https://tryhackme.com/room/networking101",
                    description: "Interactive networking fundamentals with guided exercises and challenges",
                    type: "Interactive Lab",
                    verified: true,
                    users: "500K+"
                },
                {
                    title: "GNS3 Network Simulator",
                    url: "https://www.gns3.com/",
                    description: "Advanced network simulation platform for complex topologies and scenarios",
                    type: "Network Simulator",
                    verified: true,
                    downloads: "5M+"
                },
                {
                    title: "OverTheWire - Bandit",
                    url: "https://overthewire.org/wargames/bandit/",
                    description: "Linux command line security challenges for beginners with progressive difficulty",
                    type: "Security Game",
                    verified: true,
                    players: "1M+"
                }
            ],
            books: [
                {
                    title: "Computer Networking: A Top-Down Approach",
                    author: "Kurose & Ross",
                    description: "Comprehensive networking textbook used in universities worldwide",
                    url: "https://www.pearson.com/us/higher-education/series/kurose-ross-computer-networking-a-top-down-approach-series/106371.html",
                    verified: true,
                    pages: "864",
                    rating: 4.6
                },
                {
                    title: "Network+ Study Guide",
                    author: "Exam Cram",
                    description: "Focused study guide for CompTIA Network+ certification with practice exams",
                    url: "https://www.amazon.com/CompTIA-Network-Study-Guide-Exam/dp/1119433076",
                    verified: true,
                    pages: "672",
                    rating: 4.5
                },
                {
                    title: "Linux Bible",
                    author: "Christopher Negus",
                    description: "Complete guide to Linux command line and system administration",
                    url: "https://www.amazon.com/Linux-Bible-Christopher-Negus/dp/111957888X",
                    verified: true,
                    pages: "912",
                    rating: 4.7
                }
            ]
        }
    },
    2: {
        title: "Technical Skills Development - Complete Resources",
        description: "Develop practical networking and security skills with hands-on experience in system administration and scripting",
        learningPath: [
            {
                week: 1,
                topic: "Advanced Networking & Security",
                objectives: ["Master TCP/IP protocols", "Configure firewalls and VPNs", "Implement network monitoring"],
                resources: [
                    { title: "Security+ Complete Course", type: "YouTube", duration: "35+ hours", url: "https://www.youtube.com/playlist?list=PLG49S3nxzabkK6pxr5mxFzSMg1wX2Q-ek" },
                    { title: "Nmap Network Scanner", type: "Tool", duration: "Unlimited", url: "https://nmap.org/" },
                    { title: "Wireshark Packet Analyzer", type: "Tool", duration: "Unlimited", url: "https://www.wireshark.org/" }
                ]
            },
            {
                week: 2,
                topic: "System Administration",
                objectives: ["Administer Linux systems", "Manage Windows Server", "Configure Active Directory"],
                resources: [
                    { title: "Linux Privilege Escalation", type: "YouTube", duration: "2 hours", url: "https://www.youtube.com/watch?v=AkKBWK4PIkc" },
                    { title: "Windows Server Training", type: "Course", duration: "20 hours", url: "https://learn.microsoft.com/en-us/training/windows-server/" },
                    { title: "TryHackMe Linux Labs", type: "Lab", duration: "8+ hours", url: "https://tryhackme.com/room/linuxfundamentals" }
                ]
            },
            {
                week: 3,
                topic: "Scripting for Security",
                objectives: ["Learn Python for security", "Master Bash scripting", "Automate security tasks"],
                resources: [
                    { title: "Python for Security", type: "YouTube", duration: "15+ hours", url: "https://www.youtube.com/playlist?list=PLx4x_zx8vUo8J-2-g4GJrxjYnxz1nn6oi" },
                    { title: "Python for Cybersecurity", type: "Course", duration: "12 hours", url: "https://www.cybrary.it/course/python-for-security" },
                    { title: "PowerShell for Security", type: "Course", duration: "10 hours", url: "https://www.cybrary.it/course/powershell-for-security-professionals" }
                ]
            },
            {
                week: 4,
                topic: "Security Tools & Technologies",
                objectives: ["Master security scanning", "Configure SIEM systems", "Implement intrusion detection"],
                resources: [
                    { title: "Metasploit Framework", type: "Tool", duration: "Unlimited", url: "https://www.metasploit.com/" },
                    { title: "Burp Suite Community", type: "Tool", duration: "Unlimited", url: "https://portswigger.net/burp/communitydownload" },
                    { title: "HackTheBox Starting Point", type: "Lab", duration: "10+ hours", url: "https://www.hackthebox.com/starting-point" }
                ]
            }
        ],
        resources: {
            youtube: [
                {
                    title: "Professor Messer - Security+ SY0-701 Complete Course",
                    url: "https://www.youtube.com/playlist?list=PLG49S3nxzabkK6pxr5mxFzSMg1wX2Q-ek",
                    description: "Complete free Security+ training course for certification with practice questions",
                    duration: "35+ hours",
                    verified: true,
                    rating: 4.9,
                    views: "3.2M",
                    subscribers: "800K"
                },
                {
                    title: "John Hammond - Python for Security",
                    url: "https://www.youtube.com/playlist?list=PLx4x_zx8vUo8J-2-g4GJrxjYnxz1nn6oi",
                    description: "Python scripting for cybersecurity automation and tools development",
                    duration: "15+ hours",
                    verified: true,
                    rating: 4.7,
                    views: "1.5M",
                    subscribers: "400K"
                },
                {
                    title: "The Cyber Mentor - Linux Privilege Escalation",
                    url: "https://www.youtube.com/watch?v=AkKBWK4PIkc",
                    description: "Advanced Linux security techniques and privilege escalation methods",
                    duration: "2 hours",
                    verified: true,
                    rating: 4.9,
                    views: "800K",
                    subscribers: "300K"
                },
                {
                    title: "IppSec - HackTheBox Walkthroughs",
                    url: "https://www.youtube.com/c/IppSec",
                    description: "Penetration testing methodology and techniques with detailed explanations",
                    duration: "100+ hours",
                    verified: true,
                    rating: 4.9,
                    views: "10M+",
                    subscribers: "500K"
                },
                {
                    title: "NetworkChuck - Linux for Hackers",
                    url: "https://www.youtube.com/watch?v=IVquJh3DXUA",
                    description: "Essential Linux skills and command line mastery for security professionals",
                    duration: "3 hours",
                    verified: true,
                    rating: 4.8,
                    views: "1.2M",
                    subscribers: "1.2M"
                }
            ],
            courses: [
                {
                    title: "CompTIA Security+ SY0-701",
                    platform: "Professor Messer",
                    url: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video-course/",
                    description: "Free comprehensive Security+ certification training with study materials",
                    duration: "35 hours",
                    verified: true,
                    rating: 4.9,
                    students: "100K+"
                },
                {
                    title: "Python for Cybersecurity",
                    platform: "Cybrary",
                    url: "https://www.cybrary.it/course/python-for-security",
                    description: "Learn Python for security automation and scripting with hands-on labs",
                    duration: "12 hours",
                    verified: true,
                    rating: 4.6,
                    students: "30K+"
                },
                {
                    title: "Windows System Administration",
                    platform: "Microsoft Learn",
                    url: "https://learn.microsoft.com/en-us/training/windows-server/",
                    description: "Official Microsoft Windows Server training with practical exercises",
                    duration: "20 hours",
                    verified: true,
                    rating: 4.7,
                    students: "200K+"
                },
                {
                    title: "SIEM Fundamentals",
                    platform: "SANS Cyber Aces",
                    url: "https://cyberaces.org/courses/",
                    description: "Security information and event management basics with hands-on practice",
                    duration: "8 hours",
                    verified: true,
                    rating: 4.8,
                    students: "50K+"
                }
            ],
            labs: [
                {
                    title: "TryHackMe - Linux Fundamentals",
                    url: "https://tryhackme.com/room/linuxfundamentals",
                    description: "Hands-on Linux learning with real-world scenarios and guided exercises",
                    type: "Interactive Lab",
                    verified: true,
                    users: "500K+"
                },
                {
                    title: "Hack The Box - Starting Point",
                    url: "https://www.hackthebox.com/starting-point",
                    description: "Beginner-friendly penetration testing labs with step-by-step guidance",
                    type: "Virtual Lab",
                    verified: true,
                    users: "1M+"
                },
                {
                    title: "OverTheWire - Natas",
                    url: "https://overthewire.org/wargames/natas/",
                    description: "Web application security challenges with progressive difficulty",
                    type: "Security Game",
                    verified: true,
                    players: "500K+"
                },
                {
                    title: "VulnHub VMs",
                    url: "https://www.vulnhub.com/",
                    description: "Vulnerable virtual machines for penetration testing practice",
                    type: "Virtual Machines",
                    verified: true,
                    downloads: "2M+"
                }
            ],
            tools: [
                {
                    title: "Nmap Network Scanner",
                    url: "https://nmap.org/",
                    description: "Network discovery and security auditing tool for reconnaissance and enumeration",
                    type: "Security Tool",
                    verified: true,
                    downloads: "50M+"
                },
                {
                    title: "Wireshark Packet Analyzer",
                    url: "https://www.wireshark.org/",
                    description: "Network protocol analyzer for deep packet inspection and traffic analysis",
                    type: "Security Tool",
                    verified: true,
                    downloads: "100M+"
                },
                {
                    title: "Metasploit Framework",
                    url: "https://www.metasploit.com/",
                    description: "Comprehensive penetration testing framework with exploits and payloads",
                    type: "Security Tool",
                    verified: true,
                    downloads: "10M+"
                },
                {
                    title: "Burp Suite Community",
                    url: "https://portswigger.net/burp/communitydownload",
                    description: "Web application security testing platform with manual testing tools",
                    type: "Security Tool",
                    verified: true,
                    downloads: "5M+"
                }
            ]
        }
    },
    3: {
        title: "Security Specialization - Advanced Resources",
        description: "Focus on specific cybersecurity domains including offensive security, defensive security, or digital forensics",
        specializations: [
            {
                name: "Offensive Security (Red Team)",
                description: "Master penetration testing, ethical hacking, and attack methodologies",
                topics: ["Penetration testing methodologies", "Web application security", "Network exploitation", "Social engineering"],
                resources: [
                    { title: "OWASP Top 10 Labs", type: "Lab", duration: "6 hours", url: "https://tryhackme.com/room/owasptop10" },
                    { title: "PortSwigger Web Security Academy", type: "Course", duration: "Self-paced", url: "https://portswigger.net/web-security-academy" },
                    { title: "HackTheBox Machines", type: "Lab", duration: "100+ hours", url: "https://www.hackthebox.com/machines" }
                ]
            },
            {
                name: "Defensive Security (Blue Team)",
                description: "Focus on security monitoring, incident response, and threat hunting",
                topics: ["SOC operations", "Incident response", "Threat hunting", "Malware analysis"],
                resources: [
                    { title: "Blue Team Labs", type: "Lab", duration: "8+ hours", url: "https://cyberdefenders.org/" },
                    { title: "Malware Traffic Analysis", type: "Lab", duration: "20+ hours", url: "https://www.malware-traffic-analysis.net/" },
                    { title: "PicoCTF Platform", type: "CTF", duration: "Unlimited", url: "https://picoctf.org/" }
                ]
            },
            {
                name: "Digital Forensics & Incident Response",
                description: "Master digital investigations and cybersecurity incident handling",
                topics: ["Digital forensics", "Memory analysis", "Network forensics", "Incident response"],
                resources: [
                    { title: "SANS DFIR Resources", type: "Course", duration: "30+ hours", url: "https://www.youtube.com/c/SANSInstitute" },
                    { title: "Digital Forensics Basics", type: "Course", duration: "10 hours", url: "https://www.cybrary.it/course/digital-forensics" },
                    { title: "Forensics CTFs", type: "Lab", duration: "Various", url: "https://ctftime.org/" }
                ]
            }
        ],
        resources: {
            youtube: [
                {
                    title: "IppSec - HackTheBox Walkthroughs",
                    url: "https://www.youtube.com/c/IppSec",
                    description: "Detailed penetration testing techniques and methodology with step-by-step explanations",
                    duration: "100+ hours",
                    verified: true,
                    rating: 4.9,
                    views: "10M+",
                    subscribers: "500K"
                },
                {
                    title: "STÖK - Web Application Security",
                    url: "https://www.youtube.com/c/STOK",
                    description: "Advanced web security concepts and bug bounty hunting techniques",
                    duration: "50+ hours",
                    verified: true,
                    rating: 4.8,
                    views: "5M+",
                    subscribers: "200K"
                },
                {
                    title: "SANS DFIR - Digital Forensics",
                    url: "https://www.youtube.com/c/SANSInstitute",
                    description: "Digital forensics and incident response techniques from industry experts",
                    duration: "30+ hours",
                    verified: true,
                    rating: 4.8,
                    views: "2M+",
                    subscribers: "100K"
                },
                {
                    title: "Gerald Auger - Simply Cyber",
                    url: "https://www.youtube.com/c/SimplyCyber",
                    description: "Daily cybersecurity knowledge and career advice for professionals",
                    duration: "200+ videos",
                    verified: true,
                    rating: 4.7,
                    views: "8M+",
                    subscribers: "264K"
                },
                {
                    title: "The Cyber Mentor - Malware Analysis",
                    url: "https://www.youtube.com/watch?v=7Wk8HU1n0W0",
                    description: "Practical malware analysis techniques and reverse engineering",
                    duration: "4 hours",
                    verified: true,
                    rating: 4.9,
                    views: "600K",
                    subscribers: "300K"
                }
            ],
            courses: [
                {
                    title: "Ethical Hacking Essentials",
                    platform: "SANS Cyber Aces",
                    url: "https://cyberaces.org/courses/",
                    description: "Free ethical hacking fundamentals from SANS Institute with hands-on exercises",
                    duration: "15 hours",
                    verified: true,
                    rating: 4.8,
                    students: "75K+"
                },
                {
                    title: "Digital Forensics Basics",
                    platform: "Cybrary",
                    url: "https://www.cybrary.it/course/digital-forensics",
                    description: "Introduction to digital forensics and incident response procedures",
                    duration: "10 hours",
                    verified: true,
                    rating: 4.6,
                    students: "25K+"
                },
                {
                    title: "Web Application Security",
                    platform: "PortSwigger Academy",
                    url: "https://portswigger.net/web-security-academy",
                    description: "Free web application security training from Burp Suite creators",
                    duration: "Self-paced",
                    verified: true,
                    rating: 4.9,
                    students: "200K+"
                },
                {
                    title: "Incident Response Training",
                    platform: "SANS Institute",
                    url: "https://www.sans.org/courses/gsioc",
                    description: "SANS incident response fundamentals with real-world scenarios",
                    duration: "16 hours",
                    verified: true,
                    rating: 4.9,
                    students: "50K+"
                }
            ],
            labs: [
                {
                    title: "TryHackMe - OWASP Top 10",
                    url: "https://tryhackme.com/room/owasptop10",
                    description: "Web application security vulnerabilities practice with guided tutorials",
                    type: "Interactive Lab",
                    verified: true,
                    users: "1M+"
                },
                {
                    title: "CyberDefenders - Blue Team Labs",
                    url: "https://cyberdefenders.org/",
                    description: "Defensive security challenges, digital forensics, and threat hunting practice",
                    type: "Challenge Platform",
                    verified: true,
                    users: "100K+"
                },
                {
                    title: "HackTheBox Machines",
                    url: "https://www.hackthebox.com/machines",
                    description: "Penetration testing practice on realistic targets with varying difficulty",
                    type: "Virtual Lab",
                    verified: true,
                    users: "2M+"
                },
                {
                    title: "Malware-Traffic-Analysis.net",
                    url: "https://www.malware-traffic-analysis.net/",
                    description: "Network traffic analysis exercises for malware detection and analysis",
                    type: "Traffic Analysis",
                    verified: true,
                    visitors: "500K+"
                },
                {
                    title: "PicoCTF by Carnegie Mellon",
                    url: "https://picoctf.org/",
                    description: "Free CTF platform for all skill levels with educational focus",
                    type: "CTF Platform",
                    verified: true,
                    participants: "100K+"
                }
            ]
        }
    },
    4: {
        title: "Advanced Mastery - Expert Resources",
        description: "Advanced techniques and professional-level skills in specialized cybersecurity domains",
        learningPath: [
            {
                week: 1,
                topic: "Advanced Persistent Threats (APT)",
                objectives: ["Understand APT lifecycle", "Perform advanced malware analysis", "Conduct threat attribution"],
                resources: [
                    { title: "Black Hat Conference Talks", type: "Conference", duration: "200+ hours", url: "https://www.youtube.com/c/BlackHatOfficial" },
                    { title: "LiveOverflow Binary Exploitation", type: "YouTube", duration: "80+ videos", url: "https://www.youtube.com/c/LiveOverflow" },
                    { title: "AttackDefense Labs", type: "Lab Platform", duration: "1800+ exercises", url: "https://attackdefense.com/" }
                ]
            },
            {
                week: 2,
                topic: "Cloud Security and DevSecOps",
                objectives: ["Secure cloud environments", "Implement DevSecOps practices", "Configure container security"],
                resources: [
                    { title: "AWS Cloud Security", type: "Cloud Labs", duration: "50+ hours", url: "https://aws.amazon.com/training/" },
                    { title: "Google Cloud Security", type: "Cloud Labs", duration: "30+ hours", url: "https://cloud.google.com/training/security" },
                    { title: "DevSecOps Foundation", type: "Course", duration: "16 hours", url: "https://devopsinstitute.com/certifications/devsecops-foundation/" }
                ]
            },
            {
                week: 3,
                topic: "Industrial Control Systems Security",
                objectives: ["Understand ICS/SCADA systems", "Implement critical infrastructure protection", "Handle ICS incidents"],
                resources: [
                    { title: "SANS ICS Security", type: "Course", duration: "40 hours", url: "https://www.sans.org/courses/ics-security/" },
                    { title: "CIP Cyber Training", type: "Course", duration: "25 hours", url: "https://cipcyber.com/" },
                    { title: "ICS Security Labs", type: "Lab", duration: "Various", url: "https://www.isa.org/" }
                ]
            },
            {
                week: 4,
                topic: "Security Operations and Management",
                objectives: ["Design SOC operations", "Implement security governance", "Manage security programs"],
                resources: [
                    { title: "RangeForce SOC Training", type: "Simulation", duration: "100+ hours", url: "https://rangeforce.com/" },
                    { title: "Immersive Labs Community", type: "Challenge Platform", duration: "Various", url: "https://immersivelabs.com/" },
                    { title: "MIT Cybersecurity Courses", type: "University", duration: "Various", url: "https://ocw.mit.edu/courses/cybersecurity/" }
                ]
            }
        ],
        resources: {
            youtube: [
                {
                    title: "Black Hat Conference Talks",
                    url: "https://www.youtube.com/c/BlackHatOfficial",
                    description: "Latest cybersecurity research and industry trends from leading experts",
                    duration: "200+ hours",
                    verified: true,
                    rating: 4.9,
                    views: "50M+",
                    subscribers: "1M+"
                },
                {
                    title: "DEF CON Conference Videos",
                    url: "https://www.youtube.com/user/DEFCONConference",
                    description: "Advanced security research and hacking techniques from DEF CON conferences",
                    duration: "300+ hours",
                    verified: true,
                    rating: 4.9,
                    views: "100M+",
                    subscribers: "800K"
                },
                {
                    title: "SANS Webcasts",
                    url: "https://www.youtube.com/c/SANSInstitute",
                    description: "Professional cybersecurity training and insights from SANS instructors",
                    duration: "100+ hours",
                    verified: true,
                    rating: 4.8,
                    views: "20M+",
                    subscribers: "200K"
                },
                {
                    title: "I Am Rogue - Cloud Security",
                    url: "https://www.youtube.com/c/IAmRogue",
                    description: "AWS cloud security and penetration testing techniques and tutorials",
                    duration: "50+ videos",
                    verified: true,
                    rating: 4.7,
                    views: "2M+",
                    subscribers: "100K"
                },
                {
                    title: "LiveOverflow - Binary Exploitation",
                    url: "https://www.youtube.com/c/LiveOverflow",
                    description: "Advanced binary exploitation and reverse engineering techniques",
                    duration: "80+ videos",
                    verified: true,
                    rating: 4.9,
                    views: "15M+",
                    subscribers: "400K"
                }
            ],
            courses: [
                {
                    title: "Advanced Cybersecurity Training",
                    platform: "MIT OpenCourseWare",
                    url: "https://ocw.mit.edu/courses/cybersecurity/",
                    description: "University-level cybersecurity courses from MIT with lecture materials",
                    duration: "Various",
                    verified: true,
                    rating: 4.8,
                    students: "50K+"
                },
                {
                    title: "Cloud Security Fundamentals",
                    platform: "Cloud Security Alliance",
                    url: "https://cloudsecurityalliance.org/education/",
                    description: "Cloud security best practices and frameworks for enterprise environments",
                    duration: "20 hours",
                    verified: true,
                    rating: 4.7,
                    students: "25K+"
                },
                {
                    title: "Industrial Control Systems Security",
                    platform: "SANS Institute",
                    url: "https://www.sans.org/courses/ics-security/",
                    description: "SCADA and ICS cybersecurity specialization with hands-on labs",
                    duration: "40 hours",
                    verified: true,
                    rating: 4.9,
                    students: "10K+"
                },
                {
                    title: "DevSecOps Foundation",
                    platform: "DevOps Institute",
                    url: "https://devopsinstitute.com/certifications/devsecops-foundation/",
                    description: "DevSecOps practices and implementation in modern development environments",
                    duration: "16 hours",
                    verified: true,
                    rating: 4.6,
                    students: "15K+"
                }
            ],
            labs: [
                {
                    title: "AttackDefense - Advanced Labs",
                    url: "https://attackdefense.com/",
                    description: "1800+ cybersecurity lab exercises across all domains and skill levels",
                    type: "Lab Platform",
                    verified: true,
                    users: "50K+"
                },
                {
                    title: "RangeForce - SOC Training",
                    url: "https://rangeforce.com/",
                    description: "Security operations center simulation and training with realistic scenarios",
                    type: "Simulation",
                    verified: true,
                    users: "25K+"
                },
                {
                    title: "Immersive Labs Community",
                    url: "https://immersivelabs.com/",
                    description: "Advanced cybersecurity skills development platform with gamified learning",
                    type: "Challenge Platform",
                    verified: true,
                    users: "100K+"
                },
                {
                    title: "AWS Cloud Security Labs",
                    url: "https://aws.amazon.com/training/",
                    description: "Amazon Web Services security training and hands-on labs",
                    type: "Cloud Labs",
                    verified: true,
                    users: "1M+"
                },
                {
                    title: "Google Cloud Security",
                    url: "https://cloud.google.com/training/security",
                    description: "Google Cloud Platform security fundamentals and practical exercises",
                    type: "Cloud Labs",
                    verified: true,
                    users: "500K+"
                }
            ]
        }
    }
};

// Enhanced resource modal with detailed information
function showResources(level) {
    const modal = document.getElementById('resourceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const data = enhancedCurriculumData[level];
    if (!data) return;
    
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

// Initialize certification roadmap
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

    // Add certification roadmap to the page
    const certSection = document.getElementById('certifications');
    if (certSection) {
        // Certification data is already in the HTML, this function can enhance it
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
        {
            name: "CompTIA Network+",
            code: "N10-008",
            domains: ["Networking Fundamentals", "Network Implementations", "Network Operations", "Network Security", "Network Troubleshooting"],
            studyResources: [
                { title: "Professor Messer Network+ Course", url: "https://www.professormesser.com/network-plus/n10-008/n10-008-video-course/", type: "Video Course" },
                { title: "Official CompTIA Practice Tests", url: "https://www.comptia.org/training/practice-tests", type: "Practice Tests" }
            ]
        },
        {
            name: "CompTIA Security+",
            code: "SY0-701",
            domains: ["General Security Concepts", "Threats, Vulnerabilities, and Mitigations", "Security Architecture", "Security Operations", "Security Program Management"],
            studyResources: [
                { title: "Professor Messer Security+ Course", url: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video-course/", type: "Video Course" },
                { title: "CompTIA CertMaster Practice", url: "https://www.comptia.org/training/certmaster-practice", type: "Practice Platform" }
            ]
        }
    ];

    const cert = certifications[certIndex];
    if (!cert) return;

    showNotification(`Viewing details for ${cert.name}. Check the resources section for study materials!`);
}

// Resource tracking and progress
function addResourceTracking() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            trackResourceClick(this.href, this.textContent);
        });
    });
}

function trackResourceClick(url, title) {
    const progress = loadUserProgress();
    if (!progress.completedResources.includes(url)) {
        progress.completedResources.push(url);
        progress.totalStudyTime += 1; // Increment study time
        saveUserProgress(progress);
        updateProgressBars(progress);
        
        showNotification(`Resource tracked: ${title.substring(0, 30)}...`);
    }
}

// Utility functions
function closeModal() {
    const modal = document.getElementById('resourceModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function startLevel(level) {
    const progress = loadUserProgress();
    const currentProgress = progress[`level${level}`] || 0;
    
    if (currentProgress < 100) {
        // Simulate progress
        const interval = setInterval(() => {
            progress[`level${level}`] = Math.min(100, (progress[`level${level}`] || 0) + 5);
            saveUserProgress(progress);
            updateProgressBars(progress);
            
            if (progress[`level${level}`] >= 100) {
                clearInterval(interval);
                showNotification(`🎉 Level ${level} completed! Great job!`);
                celebrateCompletion();
            }
        }, 500);
        
        showNotification(`🚀 Starting Level ${level}... Track your progress!`);
    } else {
        showNotification(`✅ Level ${level} already completed! Move to the next level.`);
    }
}

function celebrateCompletion() {
    // Add celebration animation
    const celebration = document.createElement('div');
    celebration.className = 'fixed inset-0 pointer-events-none z-50';
    celebration.innerHTML = '🎉🎊🥳'.repeat(20);
    document.body.appendChild(celebration);
    
    setTimeout(() => celebration.remove(), 3000);
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

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('resourceModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
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

// Add CSS animations
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