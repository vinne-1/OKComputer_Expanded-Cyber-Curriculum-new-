// Initialize Vanta.js background
document.addEventListener('DOMContentLoaded', function() {
    if (typeof VANTA !== 'undefined') {
        VANTA.DOTS({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x6366f1,
            color2: 0x8b5cf6,
            backgroundColor: 0x0a0a0a,
            size: 3.0,
            spacing: 25.0
        });
    }

    // Initialize resources
    loadResources();
    initializeFilters();
    initializeSearch();
});

// Comprehensive resources database
const resourcesDatabase = [
    // YouTube Resources
    {
        id: 1,
        title: "NetworkChuck - CCNA Playlist",
        category: "youtube",
        type: "Video Course",
        description: "Comprehensive CCNA networking fundamentals with hands-on labs and real-world scenarios.",
        url: "https://www.youtube.com/playlist?list=PLIhvCqeVj4n5n4YfX8U0d9d9Mn8mLQsHR",
        duration: "40+ hours",
        difficulty: "Beginner",
        platform: "YouTube",
        rating: 4.9,
        free: true,
        tags: ["networking", "CCNA", "cisco", "fundamentals", "hands-on"],
        icon: "fab fa-youtube text-red-500"
    },
    {
        id: 2,
        title: "Professor Messer - Security+ SY0-701",
        category: "youtube",
        type: "Video Course",
        description: "Complete free Security+ training course covering all exam objectives with practice questions.",
        url: "https://www.youtube.com/playlist?list=PLG49S3nxzabkK6pxr5mxFzSMg1wX2Q-ek",
        duration: "35+ hours",
        difficulty: "Intermediate",
        platform: "YouTube",
        rating: 4.9,
        free: true,
        tags: ["security+", "comptia", "certification", "security fundamentals"],
        icon: "fab fa-youtube text-red-500"
    },
    {
        id: 3,
        title: "The Cyber Mentor - Linux for Hackers",
        category: "youtube",
        type: "Tutorial Series",
        description: "Essential Linux command line skills and techniques for cybersecurity professionals.",
        url: "https://www.youtube.com/watch?v=IVquJh3DXUA",
        duration: "3 hours",
        difficulty: "Beginner",
        platform: "YouTube",
        rating: 4.8,
        free: true,
        tags: ["linux", "command line", "bash", "fundamentals"],
        icon: "fab fa-youtube text-red-500"
    },
    {
        id: 4,
        title: "John Hammond - Python for Security",
        category: "youtube",
        type: "Programming Course",
        description: "Python scripting for cybersecurity automation, tools, and penetration testing.",
        url: "https://www.youtube.com/playlist?list=PLx4x_zx8vUo8J-2-g4GJrxjYnxz1nn6oi",
        duration: "15+ hours",
        difficulty: "Intermediate",
        platform: "YouTube",
        rating: 4.7,
        free: true,
        tags: ["python", "scripting", "automation", "penetration testing"],
        icon: "fab fa-youtube text-red-500"
    },
    {
        id: 5,
        title: "IppSec - HackTheBox Walkthroughs",
        category: "youtube",
        type: "Penetration Testing",
        description: "Detailed penetration testing techniques and methodology on HackTheBox machines.",
        url: "https://www.youtube.com/c/IppSec",
        duration: "100+ hours",
        difficulty: "Advanced",
        platform: "YouTube",
        rating: 4.9,
        free: true,
        tags: ["penetration testing", "hackthebox", "methodology", "advanced"],
        icon: "fab fa-youtube text-red-500"
    },
    {
        id: 6,
        title: "STÖK - Web Application Security",
        category: "youtube",
        type: "Web Security",
        description: "Advanced web security concepts, bug bounty hunting, and vulnerability research.",
        url: "https://www.youtube.com/c/STOK",
        duration: "50+ hours",
        difficulty: "Advanced",
        platform: "YouTube",
        rating: 4.8,
        free: true,
        tags: ["web security", "bug bounty", "vulnerabilities", "advanced"],
        icon: "fab fa-youtube text-red-500"
    },

    // Online Courses
    {
        id: 7,
        title: "Cisco Networking Basics",
        category: "courses",
        type: "Online Course",
        description: "Free introduction to Cisco networking concepts, configurations, and best practices.",
        url: "https://www.cybrary.it/course/cisco-networking-fundamentals",
        duration: "8 hours",
        difficulty: "Beginner",
        platform: "Cybrary",
        rating: 4.6,
        free: true,
        tags: ["networking", "cisco", "fundamentals", "certification prep"],
        icon: "fas fa-graduation-cap text-blue-500"
    },
    {
        id: 8,
        title: "Introduction to Computer Networks",
        category: "courses",
        type: "University Course",
        description: "Stanford University-level networking fundamentals covering all layers of the OSI model.",
        url: "https://www.coursera.org/learn/computer-networking",
        duration: "12 weeks",
        difficulty: "Intermediate",
        platform: "Coursera",
        rating: 4.7,
        free: true,
        tags: ["networking", "stanford", "university", "osi model"],
        icon: "fas fa-graduation-cap text-blue-500"
    },
    {
        id: 9,
        title: "CompTIA Security+ SY0-701",
        category: "courses",
        type: "Certification Course",
        description: "Free comprehensive Security+ certification training with practice exams and labs.",
        url: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video-course/",
        duration: "35 hours",
        difficulty: "Intermediate",
        platform: "Professor Messer",
        rating: 4.9,
        free: true,
        tags: ["security+", "comptia", "certification", "exam prep"],
        icon: "fas fa-graduation-cap text-blue-500"
    },
    {
        id: 10,
        title: "Linux System Administration",
        category: "courses",
        type: "System Administration",
        description: "Free Linux admin fundamentals, command line skills, and system management.",
        url: "https://training.linuxfoundation.org/training/linux-system-administration/",
        duration: "20 hours",
        difficulty: "Beginner",
        platform: "Linux Foundation",
        rating: 4.5,
        free: true,
        tags: ["linux", "system administration", "command line", "fundamentals"],
        icon: "fas fa-graduation-cap text-blue-500"
    },
    {
        id: 11,
        title: "Ethical Hacking Essentials",
        category: "courses",
        type: "Security Course",
        description: "Free ethical hacking fundamentals from SANS Institute with hands-on exercises.",
        url: "https://cyberaces.org/courses/",
        duration: "15 hours",
        difficulty: "Intermediate",
        platform: "SANS Cyber Aces",
        rating: 4.8,
        free: true,
        tags: ["ethical hacking", "penetration testing", "sans", "hands-on"],
        icon: "fas fa-graduation-cap text-blue-500"
    },
    {
        id: 12,
        title: "Web Application Security",
        category: "courses",
        type: "Web Security",
        description: "Free web application security training from the creators of Burp Suite.",
        url: "https://portswigger.net/web-security-academy",
        duration: "Self-paced",
        difficulty: "Intermediate",
        platform: "PortSwigger",
        rating: 4.9,
        free: true,
        tags: ["web security", "burp suite", "vulnerabilities", "practical"],
        icon: "fas fa-graduation-cap text-blue-500"
    },

    // Hands-on Labs
    {
        id: 13,
        title: "Cisco Packet Tracer",
        category: "labs",
        type: "Network Simulator",
        description: "Free network simulation tool from Cisco for hands-on networking practice.",
        url: "https://www.netacad.com/courses/packet-tracer",
        duration: "Unlimited",
        difficulty: "Beginner",
        platform: "Cisco",
        rating: 4.7,
        free: true,
        tags: ["networking", "simulation", "cisco", "hands-on"],
        icon: "fas fa-flask text-green-500"
    },
    {
        id: 14,
        title: "TryHackMe - Linux Fundamentals",
        category: "labs",
        type: "Interactive Lab",
        description: "Hands-on Linux learning with real-world scenarios and guided exercises.",
        url: "https://tryhackme.com/room/linuxfundamentals",
        duration: "4 hours",
        difficulty: "Beginner",
        platform: "TryHackMe",
        rating: 4.8,
        free: true,
        tags: ["linux", "hands-on", "interactive", "fundamentals"],
        icon: "fas fa-flask text-green-500"
    },
    {
        id: 15,
        title: "Hack The Box - Starting Point",
        category: "labs",
        type: "Virtual Lab",
        description: "Beginner-friendly penetration testing labs with step-by-step guidance.",
        url: "https://www.hackthebox.com/starting-point",
        duration: "10+ hours",
        difficulty: "Beginner",
        platform: "HackTheBox",
        rating: 4.9,
        free: true,
        tags: ["penetration testing", "virtual lab", "beginner", "guided"],
        icon: "fas fa-flask text-green-500"
    },
    {
        id: 16,
        title: "TryHackMe - OWASP Top 10",
        category: "labs",
        type: "Web Security Lab",
        description: "Interactive web application security vulnerabilities practice.",
        url: "https://tryhackme.com/room/owasptop10",
        duration: "6 hours",
        difficulty: "Intermediate",
        platform: "TryHackMe",
        rating: 4.8,
        free: true,
        tags: ["web security", "owasp", "vulnerabilities", "hands-on"],
        icon: "fas fa-flask text-green-500"
    },
    {
        id: 17,
        title: "CyberDefenders - Blue Team Labs",
        category: "labs",
        type: "Defensive Lab",
        description: "Defensive security challenges, digital forensics, and threat hunting practice.",
        url: "https://cyberdefenders.org/",
        duration: "8+ hours",
        difficulty: "Intermediate",
        platform: "CyberDefenders",
        rating: 4.7,
        free: true,
        tags: ["blue team", "forensics", "threat hunting", "defensive"],
        icon: "fas fa-flask text-green-500"
    },
    {
        id: 18,
        title: "OverTheWire - Bandit",
        category: "labs",
        type: "Security Game",
        description: "Linux command line security challenges for beginners.",
        url: "https://overthewire.org/wargames/bandit/",
        duration: "5+ hours",
        difficulty: "Beginner",
        platform: "OverTheWire",
        rating: 4.6,
        free: true,
        tags: ["linux", "command line", "wargame", "beginner"],
        icon: "fas fa-flask text-green-500"
    },

    // Security Tools
    {
        id: 19,
        title: "Nmap Network Scanner",
        category: "tools",
        type: "Network Tool",
        description: "Network discovery and security auditing tool for reconnaissance.",
        url: "https://nmap.org/",
        duration: "Unlimited",
        difficulty: "Intermediate",
        platform: "Open Source",
        rating: 4.8,
        free: true,
        tags: ["network scanning", "reconnaissance", "open source", "cli"],
        icon: "fas fa-tools text-purple-500"
    },
    {
        id: 20,
        title: "Wireshark Packet Analyzer",
        category: "tools",
        type: "Network Analysis",
        description: "Network protocol analyzer for deep packet inspection and analysis.",
        url: "https://www.wireshark.org/",
        duration: "Unlimited",
        difficulty: "Intermediate",
        platform: "Open Source",
        rating: 4.9,
        free: true,
        tags: ["packet analysis", "network protocols", "forensics", "gui"],
        icon: "fas fa-tools text-purple-500"
    },
    {
        id: 21,
        title: "Metasploit Framework",
        category: "tools",
        type: "Penetration Testing",
        description: "Comprehensive penetration testing framework with exploits and payloads.",
        url: "https://www.metasploit.com/",
        duration: "Unlimited",
        difficulty: "Advanced",
        platform: "Rapid7",
        rating: 4.7,
        free: true,
        tags: ["penetration testing", "exploits", "payloads", "framework"],
        icon: "fas fa-tools text-purple-500"
    },
    {
        id: 22,
        title: "Burp Suite Community",
        category: "tools",
        type: "Web Security",
        description: "Web application security testing platform with manual testing tools.",
        url: "https://portswigger.net/burp/communitydownload",
        duration: "Unlimited",
        difficulty: "Intermediate",
        platform: "PortSwigger",
        rating: 4.8,
        free: true,
        tags: ["web security", "proxy", "scanner", "manual testing"],
        icon: "fas fa-tools text-purple-500"
    },
    {
        id: 23,
        title: "Kali Linux",
        category: "tools",
        type: "Penetration Testing OS",
        description: "Debian-based Linux distribution with pre-installed security tools.",
        url: "https://www.kali.org/",
        duration: "Unlimited",
        difficulty: "Intermediate",
        platform: "Offensive Security",
        rating: 4.9,
        free: true,
        tags: ["penetration testing", "linux", "security tools", "os"],
        icon: "fas fa-tools text-purple-500"
    },

    // Books and Reading Materials
    {
        id: 24,
        title: "Computer Networking: A Top-Down Approach",
        category: "books",
        type: "Textbook",
        description: "Comprehensive networking textbook used in universities worldwide.",
        url: "https://www.pearson.com/us/higher-education/series/kurose-ross-computer-networking-a-top-down-approach-series/106371.html",
        duration: "40+ hours",
        difficulty: "Intermediate",
        platform: "Pearson",
        rating: 4.6,
        free: false,
        tags: ["networking", "textbook", "university", "comprehensive"],
        icon: "fas fa-book text-orange-500"
    },
    {
        id: 25,
        title: "The Web Application Hacker's Handbook",
        category: "books",
        type: "Security Book",
        description: "Definitive guide to web application security testing and exploitation.",
        url: "https://www.amazon.com/Web-Application-Hackers-Handbook-Exploiting/dp/1118026470",
        duration: "30+ hours",
        difficulty: "Advanced",
        platform: "Wiley",
        rating: 4.8,
        free: false,
        tags: ["web security", "penetration testing", "exploitation", "advanced"],
        icon: "fas fa-book text-orange-500"
    },
    {
        id: 26,
        title: "Practical Malware Analysis",
        category: "books",
        type: "Technical Book",
        description: "Hands-on guide to dissecting malicious software and malware analysis.",
        url: "https://www.nostarch.com/malware",
        duration: "25+ hours",
        difficulty: "Advanced",
        platform: "No Starch Press",
        rating: 4.7,
        free: false,
        tags: ["malware analysis", "reverse engineering", "forensics", "advanced"],
        icon: "fas fa-book text-orange-500"
    },
    {
        id: 27,
        title: "Network+ Study Guide",
        category: "books",
        type: "Study Guide",
        description: "Focused study guide for CompTIA Network+ certification exam preparation.",
        url: "https://www.amazon.com/CompTIA-Network-Study-Guide-Exam/dp/1119433076",
        duration: "20+ hours",
        difficulty: "Beginner",
        platform: "Sybex",
        rating: 4.5,
        free: false,
        tags: ["network+", "comptia", "certification", "study guide"],
        icon: "fas fa-book text-orange-500"
    }
];

let currentResources = [];
let displayedResources = [];
let currentCategory = 'all';
let currentPage = 1;
const resourcesPerPage = 9;

// Load and display resources
function loadResources(category = 'all', searchTerm = '') {
    currentResources = filterResources(category, searchTerm);
    displayedResources = currentResources.slice(0, resourcesPerPage);
    currentPage = 1;
    
    renderResources();
    updateLoadMoreButton();
}

// Filter resources based on category and search term
function filterResources(category, searchTerm) {
    let filtered = resourcesDatabase;
    
    // Filter by category
    if (category !== 'all') {
        filtered = filtered.filter(resource => resource.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(resource => 
            resource.title.toLowerCase().includes(term) ||
            resource.description.toLowerCase().includes(term) ||
            resource.tags.some(tag => tag.toLowerCase().includes(term))
        );
    }
    
    return filtered;
}

// Render resources in the grid
function renderResources() {
    const grid = document.getElementById('resourcesGrid');
    
    if (displayedResources.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-4xl text-gray-600 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-400 mb-2">No resources found</h3>
                <p class="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = displayedResources.map(resource => createResourceCard(resource)).join('');
}

// Create resource card HTML
function createResourceCard(resource) {
    const difficultyColor = {
        'Beginner': 'bg-green-600',
        'Intermediate': 'bg-yellow-600',
        'Advanced': 'bg-red-600'
    };
    
    return `
        <div class="resource-card rounded-xl p-6" data-category="${resource.category}">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center">
                    <i class="${resource.icon} text-2xl mr-3"></i>
                    <div>
                        <h3 class="text-lg font-bold">${resource.title}</h3>
                        <p class="text-sm text-gray-400">${resource.platform}</p>
                    </div>
                </div>
                <div class="flex flex-col items-end space-y-1">
                    <span class="text-xs ${difficultyColor[resource.difficulty]} px-2 py-1 rounded">${resource.difficulty}</span>
                    ${resource.free ? '<span class="text-xs bg-green-600 px-2 py-1 rounded">Free</span>' : '<span class="text-xs bg-gray-600 px-2 py-1 rounded">Paid</span>'}
                </div>
            </div>
            
            <p class="text-gray-300 text-sm mb-4 line-clamp-3">${resource.description}</p>
            
            <div class="flex items-center justify-between mb-4">
                <span class="text-xs text-gray-400">${resource.duration}</span>
                <div class="flex items-center">
                    <span class="text-yellow-400 mr-1">⭐</span>
                    <span class="text-sm text-gray-400">${resource.rating}</span>
                </div>
            </div>
            
            <div class="flex flex-wrap gap-1 mb-4">
                ${resource.tags.slice(0, 3).map(tag => `<span class="text-xs bg-gray-700 px-2 py-1 rounded">${tag}</span>`).join('')}
            </div>
            
            <div class="flex space-x-2">
                <a href="${resource.url}" target="_blank" class="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded text-center text-sm transition-colors">
                    <i class="fas fa-external-link-alt mr-2"></i>Access Resource
                </a>
                <button onclick="shareResource(${resource.id})" class="bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded text-sm transition-colors">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>
        </div>
    `;
}

// Initialize category filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.category-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category and update current category
            const category = this.dataset.category;
            currentCategory = category;
            
            // Get search term
            const searchTerm = document.getElementById('searchInput').value;
            
            // Load filtered resources
            loadResources(category, searchTerm);
        });
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = this.value;
            loadResources(currentCategory, searchTerm);
        }, 300);
    });
}

// Load more resources
function loadMoreResources() {
    const nextPage = currentPage + 1;
    const startIndex = currentPage * resourcesPerPage;
    const endIndex = startIndex + resourcesPerPage;
    const additionalResources = currentResources.slice(startIndex, endIndex);
    
    if (additionalResources.length > 0) {
        displayedResources = [...displayedResources, ...additionalResources];
        currentPage = nextPage;
        
        const grid = document.getElementById('resourcesGrid');
        const newCardsHTML = additionalResources.map(resource => createResourceCard(resource)).join('');
        grid.insertAdjacentHTML('beforeend', newCardsHTML);
        
        updateLoadMoreButton();
    }
}

// Update load more button visibility
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hasMoreResources = displayedResources.length < currentResources.length;
    
    if (hasMoreResources) {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.onclick = loadMoreResources;
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// Share resource function
function shareResource(resourceId) {
    const resource = resourcesDatabase.find(r => r.id === resourceId);
    if (!resource) return;
    
    if (navigator.share) {
        navigator.share({
            title: resource.title,
            text: resource.description,
            url: resource.url
        });
    } else {
        // Fallback: copy to clipboard
        const shareText = `${resource.title}\n${resource.description}\n${resource.url}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Resource link copied to clipboard!');
        });
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add smooth scrolling and hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to resource cards
    const cards = document.querySelectorAll('.resource-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});