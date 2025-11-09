// Comprehensive Chapter Content System
class ChapterContent {
    constructor() {
        this.content = this.initializeContent();
    }

    initializeContent() {
        return {
            "1-1": { // Level 1, Chapter 1: Cybersecurity Fundamentals
                title: "Cybersecurity Fundamentals",
                description: "Master the core principles of cybersecurity and understand the threat landscape",
                sections: [
                    {
                        title: "Introduction to Cybersecurity",
                        content: `
                            <h3>What is Cybersecurity?</h3>
                            <p>Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.</p>
                            
                            <h4>Key Aspects of Cybersecurity:</h4>
                            <ul>
                                <li><strong>Confidentiality:</strong> Ensuring information is accessible only to authorized individuals</li>
                                <li><strong>Integrity:</strong> Maintaining accuracy and completeness of data</li>
                                <li><strong>Availability:</strong> Ensuring systems and data are accessible when needed</li>
                            </ul>
                            
                            <h4>Why Cybersecurity Matters:</h4>
                            <p>In today's interconnected world, cybersecurity affects everyone. From personal devices to critical infrastructure, the need for robust security measures has never been greater. Cyber threats continue to evolve, making it essential for organizations and individuals to stay vigilant and prepared.</p>
                            
                            <div class="highlight-box">
                                <h5>📊 Cybersecurity Statistics:</h5>
                                <ul>
                                    <li>A cyberattack occurs every 39 seconds</li>
                                    <li>95% of cybersecurity breaches are caused by human error</li>
                                    <li>The average cost of a data breach is $4.45 million</li>
                                    <li>It takes an average of 287 days to identify and contain a breach</li>
                                </ul>
                            </div>
                        `,
                        keyPoints: [
                            "Cybersecurity protects against digital attacks",
                            "The CIA Triad is fundamental to security",
                            "Human error is the leading cause of breaches",
                            "Prevention is more cost-effective than response"
                        ]
                    },
                    {
                        title: "The CIA Triad Explained",
                        content: `
                            <h3>Understanding the CIA Triad</h3>
                            <p>The CIA Triad is the foundation of cybersecurity, representing three core principles that guide security policies and implementations.</p>
                            
                            <h4>1. Confidentiality</h4>
                            <p>Confidentiality ensures that sensitive information is accessed only by authorized individuals. This involves:</p>
                            <ul>
                                <li>Data encryption (at rest and in transit)</li>
                                <li>Access controls and authentication</li>
                                <li>Data classification and handling procedures</li>
                                <li>Non-disclosure agreements and training</li>
                            </ul>
                            
                            <h4>2. Integrity</h4>
                            <p>Integrity maintains the accuracy and completeness of information throughout its lifecycle. Key aspects include:</p>
                            <ul>
                                <li>Hash functions and checksums</li>
                                <li>Digital signatures</li>
                                <li>Version control systems</li>
                                <li>Audit trails and logging</li>
                            </ul>
                            
                            <h4>3. Availability</h4>
                            <p>Availability ensures that systems and data are accessible to authorized users when needed. This involves:</p>
                            <ul>
                                <li>Redundancy and failover systems</li>
                                <li>Regular maintenance and updates</li>
                                <li>Disaster recovery planning</li>
                                <li>Distributed denial-of-service (DDoS) protection</li>
                            </ul>
                            
                            <div class="highlight-box">
                                <h5>🎯 Real-World Application:</h5>
                                <p>Consider a banking system:</p>
                                <ul>
                                    <li><strong>Confidentiality:</strong> Only you can see your account balance</li>
                                    <li><strong>Integrity:</strong> Your balance accurately reflects all transactions</li>
                                    <li><strong>Availability:</strong> You can access your account 24/7</li>
                                </ul>
                            </div>
                        `,
                        keyPoints: [
                            "CIA Triad is the foundation of cybersecurity",
                            "Confidentiality protects against unauthorized access",
                            "Integrity ensures data accuracy and completeness",
                            "Availability guarantees system accessibility"
                        ]
                    },
                    {
                        title: "Common Threat Landscape",
                        content: `
                            <h3>Understanding the Threat Landscape</h3>
                            <p>The cybersecurity threat landscape is constantly evolving, with new threats emerging daily. Understanding common threats is essential for effective defense.</p>
                            
                            <h4>Major Threat Categories:</h4>
                            
                            <h5>1. Malware</h5>
                            <p>Malicious software designed to damage, disrupt, or gain unauthorized access to systems:</p>
                            <ul>
                                <li><strong>Viruses:</strong> Self-replicating programs that attach to other files</li>
                                <li><strong>Worms:</strong> Self-propagating malware that spreads through networks</li>
                                <li><strong>Trojans:</strong> Disguised as legitimate software but contains malicious code</li>
                                <li><strong>Ransomware:</strong> Encrypts data and demands payment for decryption</li>
                                <li><strong>Spyware:</strong> Secretly monitors user activity and collects information</li>
                            </ul>
                            
                            <h5>2. Social Engineering</h5>
                            <p>Psychological manipulation to trick users into revealing sensitive information:</p>
                            <ul>
                                <li><strong>Phishing:</strong> Fraudulent emails or websites to steal credentials</li>
                                <li><strong>Spear Phishing:</strong> Targeted phishing attacks against specific individuals</li>
                                <li><strong>Whaling:</strong> Phishing attacks targeting high-profile executives</li>
                                <li><strong>Vishing:</strong> Voice-based phishing using phone calls</li>
                                <li><strong>Smishing:</strong> SMS-based phishing attacks</li>
                            </ul>
                            
                            <h5>3. Network Attacks</h5>
                            <p>Attacks targeting network infrastructure and communications:</p>
                            <ul>
                                <li><strong>Man-in-the-Middle (MitM):</strong> Intercepting communications between parties</li>
                                <li><strong>Denial of Service (DoS):</strong> Overwhelming systems with traffic</li>
                                <li><strong>DNS Spoofing:</strong> Redirecting traffic to malicious sites</li>
                                <li><strong>Packet Sniffing:</strong> Capturing and analyzing network traffic</li>
                            </ul>
                            
                            <div class="highlight-box">
                                <h5>🚨 Current Threat Trends:</h5>
                                <ul>
                                    <li>Ransomware attacks increased by 150% in 2021</li>
                                    <li>Phishing attacks account for 90% of data breaches</li>
                                    <li>Cryptojacking (unauthorized cryptocurrency mining) is on the rise</li>
                                    <li>IoT devices are increasingly targeted by attackers</li>
                                </ul>
                            </div>
                        `,
                        keyPoints: [
                            "Malware includes viruses, worms, Trojans, and ransomware",
                            "Social engineering exploits human psychology",
                            "Network attacks target infrastructure and communications",
                            "Threat landscape evolves constantly requiring vigilance"
                        ]
                    },
                    {
                        title: "Defense in Depth Strategy",
                        content: `
                            <h3>Defense in Depth: Layered Security Approach</h3>
                            <p>Defense in depth is a cybersecurity strategy that uses multiple layers of security controls to protect against threats. The principle is that if one layer fails, others continue to provide protection.</p>
                            
                            <h4>Physical Layer</h4>
                            <p>Physical security measures to protect hardware and infrastructure:</p>
                            <ul>
                                <li>Secure facilities with access controls</li>
                                <li>Environmental controls (temperature, humidity)</li>
                                <li>Surveillance and monitoring systems</li>
                                <li>Hardware locks and tamper-evident seals</li>
                            </ul>
                            
                            <h4>Network Layer</h4>
                            <p>Network-based security controls:</p>
                            <ul>
                                <li>Firewalls and network segmentation</li>
                                <li>Intrusion Detection/Prevention Systems (IDS/IPS)</li>
                                <li>Virtual Private Networks (VPNs)</li>
                                <li>Network Access Control (NAC)</li>
                            </ul>
                            
                            <h4>Host Layer</h4>
                            <p>Security measures on individual systems:</p>
                            <ul>
                                <li>Antivirus and anti-malware software</li>
                                <li>Host-based firewalls</li>
                                <li>System hardening and configuration management</li>
                                <li>Endpoint Detection and Response (EDR)</li>
                            </ul>
                            
                            <h4>Application Layer</h4>
                            <p>Security controls within applications:</p>
                            <ul>
                                <li>Secure coding practices</li>
                                <li>Input validation and sanitization</li>
                                <li>Authentication and authorization controls</li>
                                <li>Encryption of sensitive data</li>
                            </ul>
                            
                            <h4>Data Layer</h4>
                            <p>Protection of data itself:</p>
                            <ul>
                                <li>Encryption at rest and in transit</li>
                                <li>Data loss prevention (DLP)</li>
                                <li>Backup and recovery procedures</li>
                                <li>Data classification and handling</li>
                            </ul>
                            
                            <div class="highlight-box">
                                <h5>🛡️ Benefits of Defense in Depth:</h5>
                                <ul>
                                    <li>Reduces single points of failure</li>
                                    <li>Provides multiple opportunities to detect threats</li>
                                    <li>Makes it harder for attackers to succeed</li>
                                    <li>Allows for graceful degradation of security</li>
                                </ul>
                            </div>
                        `,
                        keyPoints: [
                            "Defense in depth uses multiple security layers",
                            "Physical, network, host, application, and data layers",
                            "Reduces single points of failure",
                            "Provides comprehensive protection against threats"
                        ]
                    }
                ],
                quiz: {
                    easy: [
                        {
                            question: "What does the 'C' in CIA Triad stand for?",
                            options: ["Control", "Confidentiality", "Compliance", "Communication"],
                            correct: 1,
                            explanation: "Confidentiality ensures that information is accessible only to authorized individuals."
                        },
                        {
                            question: "Which of the following is an example of malware?",
                            options: ["Firewall", "Antivirus", "Ransomware", "Router"],
                            correct: 2,
                            explanation: "Ransomware is a type of malware that encrypts files and demands payment for decryption."
                        },
                        {
                            question: "What is the primary goal of cybersecurity?",
                            options: ["Make computers faster", "Protect information and systems", "Create viruses", "Improve internet speed"],
                            correct: 1,
                            explanation: "The primary goal of cybersecurity is to protect digital information, systems, and networks from unauthorized access, damage, or theft."
                        }
                    ],
                    medium: [
                        {
                            question: "Which attack involves manipulating people rather than systems?",
                            options: ["SQL injection", "Social engineering", "Buffer overflow", "DDoS attack"],
                            correct: 1,
                            explanation: "Social engineering attacks manipulate people into revealing confidential information or performing actions that compromise security."
                        },
                        {
                            question: "What principle ensures data accuracy and completeness?",
                            options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
                            correct: 1,
                            explanation: "Integrity maintains the accuracy and completeness of information throughout its lifecycle."
                        }
                    ],
                    hard: [
                        {
                            question: "In defense in depth, what happens when one security layer fails?",
                            options: ["System becomes vulnerable", "Other layers continue protection", "All layers fail", "Attack is automatically blocked"],
                            correct: 1,
                            explanation: "In defense in depth, if one layer fails, other layers continue to provide protection, reducing single points of failure."
                        }
                    ]
                }
            },
            "1-2": { // Level 1, Chapter 2: Networking Essentials
                title: "Networking Essentials",
                description: "Master network protocols, architecture, and security fundamentals",
                sections: [
                    {
                        title: "OSI Model Deep Dive",
                        content: `
                            <h3>Understanding the OSI Model</h3>
                            <p>The Open Systems Interconnection (OSI) model is a conceptual framework that standardizes the communication functions of a telecommunication or computing system into seven distinct layers.</p>
                            
                            <h4>Layer 7: Application Layer</h4>
                            <p>The top layer that interfaces with end-user applications:</p>
                            <ul>
                                <li>Provides network services to applications</li>
                                <li>Protocols: HTTP, FTP, SMTP, DNS, DHCP</li>
                                <li>Data unit: Data</li>
                                <li>Functions: File transfer, email, web browsing</li>
                            </ul>
                            
                            <h4>Layer 6: Presentation Layer</h4>
                            <p>Handles data formatting and encryption:</p>
                            <ul>
                                <li>Data translation and formatting</li>
                                <li>Encryption and compression</li>
                                <li>Protocols: SSL/TLS, MIME, XDR</li>
                                <li>Data unit: Data</li>
                            </ul>
                            
                            <h4>Layer 5: Session Layer</h4>
                            <p>Manages communication sessions:</p>
                            <ul>
                                <li>Establishes, maintains, and terminates sessions</li>
                                <li>Dialog control and synchronization</li>
                                <li>Protocols: NetBIOS, RPC, SQL</li>
                                <li>Data unit: Data</li>
                            </ul>
                            
                            <h4>Layer 4: Transport Layer</h4>
                            <p>Provides end-to-end communication services:</p>
                            <ul>
                                <li>Segmentation and reassembly</li>
                                <li>Flow control and error recovery</li>
                                <li>Protocols: TCP, UDP</li>
                                <li>Data unit: Segment (TCP) or Datagram (UDP)</li>
                            </ul>
                            
                            <h4>Layer 3: Network Layer</h4>
                            <p>Handles routing and logical addressing:</p>
                            <ul>
                                <li>Path determination and logical addressing</li>
                                <li>Routing between networks</li>
                                <li>Protocols: IP, ICMP, ARP, RIP, OSPF</li>
                                <li>Data unit: Packet</li>
                            </ul>
                            
                            <h4>Layer 2: Data Link Layer</h4>
                            <p>Provides physical addressing and error detection:</p>
                            <ul>
                                <li>Framing and physical addressing</li>
                                <li>Error detection and correction</li>
                                <li>Protocols: Ethernet, PPP, HDLC, ARP</li>
                                <li>Data unit: Frame</li>
                            </ul>
                            
                            <h4>Layer 1: Physical Layer</h4>
                            <p>Transmits raw bitstream over physical medium:</p>
                            <ul>
                                <li>Electrical, optical, and radio transmission</li>
                                <li>Bit synchronization and encoding</li>
                                <li>Standards: RS-232, Ethernet (physical), USB</li>
                                <li>Data unit: Bits</li>
                            </ul>
                            
                            <div class="highlight-box">
                                <h5>📝 Memory Tip:</h5>
                                <p><strong>A</strong>ll <strong>P</strong>eople <strong>S</strong>eem <strong>T</strong>o <strong>N</strong>eed <strong>D</strong>ata <strong>P</strong>rocessing</p>
                                <p>(Application, Presentation, Session, Transport, Network, Data Link, Physical)</p>
                            </div>
                        `,
                        keyPoints: [
                            "OSI model has 7 layers from Physical to Application",
                            "Each layer has specific functions and protocols",
                            "Data flows down through layers at sender, up at receiver",
                            "Layered approach simplifies network communication"
                        ]
                    },
                    {
                        title: "TCP/IP Protocol Suite",
                        content: `
                            <h3>TCP/IP Protocol Suite Overview</h3>
                            <p>The TCP/IP protocol suite is the foundation of the internet and modern networking. It consists of four layers that map to the OSI model.</p>
                            
                            <h4>Application Layer (OSI Layers 5-7)</h4>
                            <p>Protocols that provide services to applications:</p>
                            <ul>
                                <li><strong>HTTP/HTTPS:</strong> Web browsing and secure web communication</li>
                                <li><strong>FTP/SFTP:</strong> File transfer protocols</li>
                                <li><strong>SMTP/POP3/IMAP:</strong> Email protocols</li>
                                <li><strong>DNS:</strong> Domain name resolution</li>
                                <li><strong>DHCP:</strong> Dynamic IP address assignment</li>
                            </ul>
                            
                            <h4>Transport Layer (OSI Layer 4)</h4>
                            <p>Provides end-to-end communication services:</p>
                            <ul>
                                <li><strong>TCP (Transmission Control Protocol):</strong></li>
                                <ul>
                                    <li>Connection-oriented, reliable delivery</li>
                                    <li>Flow control and error recovery</li>
                                    <li>Used for: Web browsing, email, file transfer</li>
                                    <li>Header size: 20-60 bytes</li>
                                </ul>
                                <li><strong>UDP (User Datagram Protocol):</strong></li>
                                <ul>
                                    <li>Connectionless, best-effort delivery</li>
                                    <li>Minimal overhead, faster transmission</li>
                                    <li>Used for: DNS, streaming media, online gaming</li>
                                    <li>Header size: 8 bytes</li>
                                </ul>
                            </ul>
                            
                            <h4>Internet Layer (OSI Layer 3)</h4>
                            <p>Handles routing and logical addressing:</p>
                            <ul>
                                <li><strong>IP (Internet Protocol):</strong> Core protocol for addressing and routing</li>
                                <li><strong>ICMP (Internet Control Message Protocol):</strong> Network diagnostics and error reporting</li>
                                <li><strong>ARP (Address Resolution Protocol):</strong> Maps IP addresses to MAC addresses</li>
                                <li><strong>RARP (Reverse ARP):</strong> Maps MAC addresses to IP addresses</li>
                            </ul>
                            
                            <h4>Link Layer (OSI Layers 1-2)</h4>
                            <p>Handles physical network access:</p>
                            <ul>
                                <li><strong>Ethernet:</strong> Most common LAN technology</li>
                                <li><strong>Wi-Fi (802.11):</strong> Wireless LAN standard</li>
                                <li><strong>PPP (Point-to-Point Protocol):</strong> Direct connection between two nodes</li>
                            </ul>
                            
                            <div class="highlight-box">
                                <h5>🔍 TCP vs UDP Comparison:</h5>
                                <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
                                    <tr style="background: rgba(16, 185, 129, 0.1);">
                                        <th style="padding: 8px; border: 1px solid #10b981;">Feature</th>
                                        <th style="padding: 8px; border: 1px solid #10b981;">TCP</th>
                                        <th style="padding: 8px; border: 1px solid #10b981;">UDP</th>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px; border: 1px solid #10b981;">Connection</td>
                                        <td style="padding: 8px; border: 1px solid #10b981;">Connection-oriented</td>
                                        <td style="padding: 8px; border: 1px solid #10b981;">Connectionless</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px; border: 1px solid #10b981;">Reliability</td>
                                        <td style="padding: 8px; border: 1px solid #10b981;">High (guaranteed delivery)</td>
                                        <td style="padding: 8px; border: 1px solid #10b981;">Best effort</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px; border: 1px solid #10b981;">Speed</td>
                                        <td style="padding: 8px; border: 1px solid #10b981;">Slower (more overhead)</td>
                                        <td style="padding: 8px; border: 1px solid #10b981;">Faster (less overhead)</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px; border: 1px solid #10b981;">Use Cases</td>
                                        <td style="padding: 8px; border: 1px solid #10b981;">Web, email, file transfer</td>
                                        <td style="padding: 8px; border: 1px solid #10b981;">Streaming, gaming, DNS</td>
                                    </tr>
                                </table>
                            </div>
                        `,
                        keyPoints: [
                            "TCP/IP has 4 layers compared to OSI's 7 layers",
                            "TCP is reliable and connection-oriented",
                            "UDP is fast and connectionless",
                            "TCP/IP is the foundation of internet communication"
                        ]
                    }
                ],
                quiz: {
                    easy: [
                        {
                            question: "How many layers does the OSI model have?",
                            options: ["5 layers", "6 layers", "7 layers", "8 layers"],
                            correct: 2,
                            explanation: "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application."
                        },
                        {
                            question: "Which protocol operates at the Transport layer?",
                            options: ["HTTP", "TCP", "IP", "Ethernet"],
                            correct: 1,
                            explanation: "TCP (Transmission Control Protocol) operates at the Transport layer (Layer 4) of the OSI model."
                        },
                        {
                            question: "What is the primary function of the Network layer?",
                            options: ["Data encryption", "Routing and addressing", "Error correction", "Data formatting"],
                            correct: 1,
                            explanation: "The Network layer handles routing between networks and logical addressing (IP addresses)."
                        }
                    ],
                    medium: [
                        {
                            question: "Which layer handles data encryption and compression?",
                            options: ["Application", "Presentation", "Session", "Transport"],
                            correct: 1,
                            explanation: "The Presentation layer (Layer 6) handles data formatting, encryption, and compression."
                        },
                        {
                            question: "What's the main difference between TCP and UDP?",
                            options: ["TCP is faster", "TCP is reliable, UDP is not", "UDP is more secure", "No difference"],
                            correct: 1,
                            explanation: "TCP provides reliable, connection-oriented delivery with error recovery, while UDP provides best-effort, connectionless delivery."
                        }
                    ],
                    hard: [
                        {
                            question: "In which OSI layer would you find SSL/TLS encryption?",
                            options: ["Network Layer", "Transport Layer", "Session Layer", "Presentation Layer"],
                            correct: 3,
                            explanation: "SSL/TLS operates at the Presentation Layer (Layer 6) of the OSI model, providing encryption and authentication services."
                        }
                    ]
                }
            },
            "1-3": { // Level 1, Chapter 3: Risk Management & Governance
                title: "Risk Management & Governance",
                description: "Build a strong foundation in risk methodologies, governance frameworks, and compliance.",
                sections: [
                    {
                        title: "Risk Management Fundamentals",
                        content: `
                            <h3>Understanding Risk</h3>
                            <p>Risk is the potential for loss or harm when a threat exploits a vulnerability. Effective risk management balances cost, impact, and likelihood to reduce risk to acceptable levels.</p>
                            <h4>Core Concepts</h4>
                            <ul>
                                <li><strong>Threat:</strong> Potential cause of an unwanted incident</li>
                                <li><strong>Vulnerability:</strong> Weakness that can be exploited</li>
                                <li><strong>Impact:</strong> Magnitude of harm if risk materializes</li>
                                <li><strong>Likelihood:</strong> Probability of occurrence</li>
                                <li><strong>Risk:</strong> Likelihood × Impact</li>
                            </ul>
                            <h4>Risk Treatment Options</h4>
                            <ul>
                                <li><strong>Mitigate:</strong> Reduce likelihood/impact with controls</li>
                                <li><strong>Transfer:</strong> Shift risk (e.g., insurance)</li>
                                <li><strong>Avoid:</strong> Eliminate the risky activity</li>
                                <li><strong>Accept:</strong> Acknowledge and monitor residual risk</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Risk = likelihood × impact",
                            "Treatment: mitigate, transfer, avoid, accept",
                            "Reduce risk to acceptable levels"
                        ]
                    },
                    {
                        title: "Governance & Frameworks",
                        content: `
                            <h3>Security Governance</h3>
                            <p>Governance aligns security with business objectives, ensures accountability, and drives policy, standards, and oversight.</p>
                            <h4>Key Frameworks</h4>
                            <ul>
                                <li><strong>NIST CSF:</strong> Identify, Protect, Detect, Respond, Recover</li>
                                <li><strong>ISO/IEC 27001:</strong> ISMS lifecycle and continuous improvement</li>
                                <li><strong>COBIT:</strong> Governance and management of enterprise IT</li>
                            </ul>
                            <h4>Policies & Compliance</h4>
                            <ul>
                                <li>Policy hierarchy: policies → standards → procedures → guidelines</li>
                                <li>Compliance: regulatory (e.g., GDPR, HIPAA) and contractual (e.g., PCI DSS)</li>
                                <li>Audits: internal vs external; evidence-based assurance</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Governance aligns security to business",
                            "NIST CSF and ISO 27001 guide maturity",
                            "Policies operationalize governance"
                        ]
                    }
                ]
            },
            "1-4": { // Level 1, Chapter 4: Security Tools & Technologies
                title: "Security Tools & Technologies",
                description: "Learn the essential tooling ecosystem powering modern cybersecurity operations.",
                sections: [
                    {
                        title: "Core Security Tooling",
                        content: `
                            <h3>Visibility and Control</h3>
                            <ul>
                                <li><strong>EDR/XDR:</strong> Endpoint detection and response for behavior analytics and containment</li>
                                <li><strong>SIEM:</strong> Centralized log collection, correlation, and alerting</li>
                                <li><strong>SOAR:</strong> Orchestrate automated, repeatable responses</li>
                                <li><strong>Vulnerability Scanners:</strong> Identify and prioritize weaknesses</li>
                            </ul>
                            <h4>Network Security</h4>
                            <ul>
                                <li><strong>Firewalls/WAF:</strong> Policy-based traffic control and application protections</li>
                                <li><strong>IDS/IPS:</strong> Detect or block malicious patterns</li>
                                <li><strong>NAC:</strong> Enforce device posture and access</li>
                            </ul>
                        `,
                        keyPoints: [
                            "SIEM + EDR provide detection & investigation",
                            "SOAR automates triage and containment",
                            "Network controls segment and prevent"
                        ]
                    },
                    {
                        title: "Crypto, Auth, and Monitoring",
                        content: `
                            <h3>Cryptography & Authentication</h3>
                            <ul>
                                <li>Symmetric vs asymmetric encryption; TLS protects data in transit</li>
                                <li>PKI validates identity via certificates</li>
                                <li>MFA and SSO strengthen identity assurance</li>
                            </ul>
                            <h3>Monitoring & Observability</h3>
                            <ul>
                                <li>Log pipelines and normalization</li>
                                <li>Detection engineering and use-case tuning</li>
                                <li>Dashboards, metrics, and alert fidelity</li>
                            </ul>
                        `,
                        keyPoints: [
                            "TLS & PKI underpin secure comms",
                            "MFA/SSO reduce identity risk",
                            "Detection engineering improves signal"
                        ]
                    }
                ]
            },
            "2-1": { // Level 2, Chapter 1: System Hardening & Configuration
                title: "System Hardening & Configuration",
                description: "Secure operating systems and applications using baselines, least privilege, and patching.",
                sections: [
                    {
                        title: "OS & Baseline Hardening",
                        content: `
                            <h3>Baseline Controls</h3>
                            <ul>
                                <li><strong>CIS Benchmarks:</strong> Prescriptive baselines for Windows/Linux/macOS</li>
                                <li><strong>Least Privilege:</strong> Minimize admin rights and use JIT/JEA</li>
                                <li><strong>Secure Config:</strong> Disable services, enforce strong crypto, logging</li>
                            </ul>
                            <h4>Patch & Vulnerability Management</h4>
                            <ul>
                                <li>Prioritize based on risk (exposure, exploitability, asset criticality)</li>
                                <li>Automate deployments; measure SLAs and exceptions</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Apply CIS baselines and least privilege",
                            "Continuously patch and verify",
                            "Secure defaults reduce attack surface"
                        ]
                    },
                    {
                        title: "Application Hardening",
                        content: `
                            <h3>Harden the App Stack</h3>
                            <ul>
                                <li>Secure headers (HSTS, CSP), input validation, output encoding</li>
                                <li>Dependency hygiene (SBOM, scanning, pinning)</li>
                                <li>Secrets management (vaults, rotation, zero-trust access)</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Shift-left security in the SDLC",
                            "Protect secrets and dependencies",
                            "Enforce secure defaults in apps"
                        ]
                    }
                ]
            },
            "2-2": { // Level 2, Chapter 2: Network Security Controls
                title: "Network Security Controls",
                description: "Architect resilient networks with segmentation, strong perimeter, and secure remote access.",
                sections: [
                    {
                        title: "Segmentation & Perimeter",
                        content: `
                            <h3>Design for Containment</h3>
                            <ul>
                                <li>Microsegmentation to limit lateral movement</li>
                                <li>DMZ patterns for internet-facing services</li>
                                <li>WAF and reverse proxies to protect applications</li>
                            </ul>
                            <h4>Secure Connectivity</h4>
                            <ul>
                                <li>VPN, ZTNA, and SDP reduce implicit trust</li>
                                <li>Strong cipher suites and certificate hygiene</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Segment to reduce blast radius",
                            "Prefer ZTNA over legacy perimeter",
                            "Harden TLS and manage certs"
                        ]
                    },
                    {
                        title: "Detection & Enforcement",
                        content: `
                            <h3>Inline and Out-of-Band Controls</h3>
                            <ul>
                                <li>IDS/IPS with tuned signatures and anomaly detection</li>
                                <li>NAC for device posture enforcement</li>
                                <li>NetFlow and packet capture for investigations</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Combine prevention with detection",
                            "Use NAC for zero-trust device access",
                            "Retain telemetry for incident response"
                        ]
                    }
                ]
            },
            "2-3": { // Level 2, Chapter 3: Cryptography & PKI
                title: "Cryptography & PKI",
                description: "Apply modern cryptography, manage keys and certificates, and build secure protocols.",
                sections: [
                    {
                        title: "Algorithms & Use Cases",
                        content: `
                            <h3>Crypto Primitives</h3>
                            <ul>
                                <li>Symmetric (AES-GCM), Asymmetric (RSA/ECC), Hashing (SHA-2/SHA-3)</li>
                                <li>Signatures and MACs for integrity and authenticity</li>
                                <li>Key exchange (ECDH) and forward secrecy</li>
                            </ul>
                            <h4>Common Pitfalls</h4>
                            <ul>
                                <li>Homegrown crypto, weak RNGs, outdated ciphers (RC4, MD5)</li>
                                <li>Key reuse, improper padding, insecure modes</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Use vetted algorithms and libraries",
                            "Enable forward secrecy where possible",
                            "Avoid deprecated ciphers and hashes"
                        ]
                    },
                    {
                        title: "PKI & Certificate Management",
                        content: `
                            <h3>Trust and Lifecycle</h3>
                            <ul>
                                <li>Root and intermediate CAs, CRL/OCSP</li>
                                <li>Automate issuance/renewal (ACME), rotate keys, enforce pinning when safe</li>
                                <li>Inventory certificates; monitor expiry and mis-issuance</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Treat certificates as critical assets",
                            "Automate issuance and rotation",
                            "Continuously monitor trust chains"
                        ]
                    }
                ]
            },
            "2-4": { // Level 2, Chapter 4: Identity & Access Management
                title: "Identity & Access Management",
                description: "Design robust identity, authentication, and authorization across users and services.",
                sections: [
                    {
                        title: "Authentication & Federation",
                        content: `
                            <h3>Strong Auth</h3>
                            <ul>
                                <li>MFA everywhere; phishing-resistant methods (FIDO2/WebAuthn)</li>
                                <li>SSO and federation (SAML, OIDC) for seamless and secure access</li>
                                <li>Session management and token security (JWT, refresh tokens)</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Prefer phishing-resistant MFA",
                            "Use standards-based SSO",
                            "Secure tokens and sessions"
                        ]
                    },
                    {
                        title: "Authorization & Lifecycle",
                        content: `
                            <h3>Who can do what, where, and when?</h3>
                            <ul>
                                <li>RBAC/ABAC policies and least privilege</li>
                                <li>Joiner-Mover-Leaver (JML) processes</li>
                                <li>Privileged Access Management (PAM) and break-glass procedures</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Continuously review access",
                            "Automate JML at scale",
                            "Constrain privilege and monitor use"
                        ]
                    }
                ]
            },
            "3-1": { // Level 3, Chapter 1: Security Operations Center (SOC)
                title: "Security Operations Center (SOC)",
                description: "Design, operate, and mature a modern SOC for detection and response.",
                sections: [
                    {
                        title: "SOC Architecture & Processes",
                        content: `
                            <h3>People, Process, Technology</h3>
                            <ul>
                                <li>Tiers and roles (L1 triage to L3 hunters)</li>
                                <li>Intake, triage, investigation, containment, recovery</li>
                                <li>Runbooks, playbooks, KPIs, and feedback loops</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Define clear triage and escalation",
                            "Measure MTTD/MTTR",
                            "Continuously tune processes"
                        ]
                    },
                    {
                        title: "SIEM/SOAR & Detection Engineering",
                        content: `
                            <h3>From Logs to Action</h3>
                            <ul>
                                <li>SIEM for correlation, baselines, and anomaly detection</li>
                                <li>SOAR to automate containment and enrichments</li>
                                <li>Detection engineering lifecycle: create, test, deploy, measure</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Automate repetitive actions",
                            "Continuously improve detections",
                            "Balance precision and recall"
                        ]
                    }
                ]
            },
            "3-2": { // Level 3, Chapter 2: Threat Hunting & Intelligence
                title: "Threat Hunting & Intelligence",
                description: "Proactively hunt threats and operationalize intelligence for better defenses.",
                sections: [
                    {
                        title: "Hunting Methodologies",
                        content: `
                            <h3>Hypothesis-Driven Hunting</h3>
                            <ul>
                                <li>Form hypotheses from TTPs (MITRE ATT&CK)</li>
                                <li>Use telemetry (endpoint, network, cloud) to test hypotheses</li>
                                <li>Document findings and operationalize detections</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Use ATT&CK as a backbone",
                            "Instrument rich telemetry",
                            "Turn hunts into detections"
                        ]
                    },
                    {
                        title: "Threat Intelligence",
                        content: `
                            <h3>From Indicators to Insights</h3>
                            <ul>
                                <li>IOC vs IOA; context is king</li>
                                <li>Sources: ISACs, vendors, open-source, sharing communities</li>
                                <li>Enrich cases and guide prioritization</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Prioritize contextual intelligence",
                            "Blend internal/external sources",
                            "Drive action, not just awareness"
                        ]
                    }
                ]
            },
            "3-3": { // Level 3, Chapter 3: Digital Forensics & Incident Response
                title: "Digital Forensics & Incident Response",
                description: "Investigate incidents and perform forensic triage across endpoints and networks.",
                sections: [
                    {
                        title: "Forensic Foundations",
                        content: `
                            <h3>Sound Evidence Handling</h3>
                            <ul>
                                <li>Chain of custody and preservation</li>
                                <li>Memory, disk, and artifact acquisition</li>
                                <li>Timeline analysis and case documentation</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Maintain evidence integrity",
                            "Collect memory early",
                            "Document timelines thoroughly"
                        ]
                    },
                    {
                        title: "Incident Lifecycle",
                        content: `
                            <h3>Respond Effectively</h3>
                            <ul>
                                <li>Preparation → Detection → Containment → Eradication → Recovery → Lessons learned</li>
                                <li>Contain quickly while preserving evidence</li>
                                <li>Post-incident improvements and communication</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Contain before eradicate",
                            "Capture lessons learned",
                            "Improve controls post-incident"
                        ]
                    }
                ]
            },
            "3-4": { // Level 3, Chapter 4: Advanced Persistent Threats
                title: "Advanced Persistent Threats",
                description: "Recognize and counter sophisticated adversaries and long-lived intrusions.",
                sections: [
                    {
                        title: "APT Tactics & Lifecycle",
                        content: `
                            <h3>Kill Chain & ATT&CK</h3>
                            <ul>
                                <li>Initial access, persistence, privilege escalation, lateral movement</li>
                                <li>Command & control, exfiltration, anti-forensics</li>
                                <li>Map detections to ATT&CK coverage</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Understand adversary playbooks",
                            "Cover key ATT&CK techniques",
                            "Monitor for long dwell times"
                        ]
                    },
                    {
                        title: "Counter-APT Strategies",
                        content: `
                            <h3>Resilience and Deception</h3>
                            <ul>
                                <li>Zero trust segmentation and identity hardening</li>
                                <li>Threat intel-driven detection and hunting</li>
                                <li>Deception tech (honeypots, canary tokens)</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Reduce lateral movement",
                            "Use intel to disrupt campaigns",
                            "Detect early with deception"
                        ]
                    }
                ]
            },
            "4-1": { // Level 4, Chapter 1: Enterprise Security Architecture
                title: "Enterprise Security Architecture",
                description: "Architect enterprise-wide security with zero trust and cloud-native patterns.",
                sections: [
                    {
                        title: "Architecture Frameworks",
                        content: `
                            <h3>Principles & Patterns</h3>
                            <ul>
                                <li>Security by design and defense in depth</li>
                                <li>Zero Trust: verify explicitly, least privilege, assume breach</li>
                                <li>Cloud reference architectures and shared responsibility</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Bake in security early",
                            "Adopt zero trust principles",
                            "Align to cloud models"
                        ]
                    },
                    {
                        title: "Architecture Governance",
                        content: `
                            <h3>From Design to Operations</h3>
                            <ul>
                                <li>Architecture reviews, threat modeling, and exceptions</li>
                                <li>Reference designs, guardrails, and automation</li>
                                <li>KPIs and regular posture assessments</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Standardize via reference designs",
                            "Automate guardrails",
                            "Measure control effectiveness"
                        ]
                    }
                ]
            },
            "4-2": { // Level 4, Chapter 2: Cybersecurity Governance & Compliance
                title: "Cybersecurity Governance & Compliance",
                description: "Establish enterprise governance, risk management, and compliance at scale.",
                sections: [
                    {
                        title: "Governance at Scale",
                        content: `
                            <h3>From Policies to Outcomes</h3>
                            <ul>
                                <li>Enterprise risk management and appetite</li>
                                <li>Control catalogs and mappings (NIST, ISO, CIS, SOC2)</li>
                                <li>Awareness, training, and culture change</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Define risk appetite",
                            "Map and rationalize controls",
                            "Invest in culture and training"
                        ]
                    },
                    {
                        title: "Compliance Operations",
                        content: `
                            <h3>Prove and Improve</h3>
                            <ul>
                                <li>Continuous control monitoring and evidence collection</li>
                                <li>Regulatory alignment (GDPR, HIPAA, SOX)</li>
                                <li>Third-party risk and attestation</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Automate evidence where possible",
                            "Keep pace with regulation",
                            "Vet and monitor vendors"
                        ]
                    }
                ]
            },
            "4-3": { // Level 4, Chapter 3: Cybersecurity Program Management
                title: "Cybersecurity Program Management",
                description: "Plan and lead security programs, measure impact, and drive transformation.",
                sections: [
                    {
                        title: "Program Strategy & Metrics",
                        content: `
                            <h3>Plan the Work, Measure the Work</h3>
                            <ul>
                                <li>Roadmaps, OKRs, and stakeholder alignment</li>
                                <li>KPIs and KRIs for security (coverage, MTTD/MTTR, patch SLAs)</li>
                                <li>Reporting for executives and the board</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Tie security to business outcomes",
                            "Use metrics to drive prioritization",
                            "Communicate to leadership"
                        ]
                    },
                    {
                        title: "Delivery & Operations",
                        content: `
                            <h3>From Projects to Programs</h3>
                            <ul>
                                <li>Portfolio and vendor management</li>
                                <li>Budgeting, ROI, and risk-based investments</li>
                                <li>Maturity assessments and capability models</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Manage portfolios, not just projects",
                            "Invest based on risk reduction",
                            "Assess and mature capabilities"
                        ]
                    }
                ]
            },
            "4-4": { // Level 4, Chapter 4: Emerging Threats & Future Technologies
                title: "Emerging Threats & Future Technologies",
                description: "Look ahead to new threats and adapt your defenses to future realities.",
                sections: [
                    {
                        title: "Emerging Threat Landscape",
                        content: `
                            <h3>What’s Next?</h3>
                            <ul>
                                <li>AI-enabled attacks and defenses</li>
                                <li>Supply-chain and firmware threats</li>
                                <li>Cloud-native and container security challenges</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Track adversary innovation",
                            "Harden supply chains",
                            "Secure cloud-native stacks"
                        ]
                    },
                    {
                        title: "Future Tech & Strategy",
                        content: `
                            <h3>Build Future-Ready Security</h3>
                            <ul>
                                <li>Quantum-safe cryptography planning</li>
                                <li>IoT and edge security models</li>
                                <li>Security co-pilots and automation at scale</li>
                            </ul>
                        `,
                        keyPoints: [
                            "Start quantum-safe planning early",
                            "Treat IoT as untrusted by default",
                            "Use automation to scale defenses"
                        ]
                    }
                ]
            }
        };
    }

    getChapterContent(level, chapter) {
        const key = `${level}-${chapter}`;
        return this.content[key] || null;
    }

    renderChapterContent(level, chapter) {
        const chapterData = this.getChapterContent(level, chapter);
        if (!chapterData) return null;

        let html = `
            <div class="chapter-content">
                <div class="chapter-header mb-8">
                    <h1 class="text-3xl font-bold mb-4 text-emerald-400">${chapterData.title}</h1>
                    <p class="text-xl text-slate-300 mb-6">${chapterData.description}</p>
                </div>
        `;

        chapterData.sections.forEach((section, index) => {
            html += `
                <div class="section mb-12 p-6 glass-effect rounded-xl">
                    <h2 class="text-2xl font-bold mb-4 text-blue-400">${section.title}</h2>
                    <div class="section-content text-slate-300 leading-relaxed">
                        ${section.content}
                    </div>
                    <div class="key-points mt-6 p-4 bg-slate-800/50 rounded-lg">
                        <h4 class="font-semibold text-emerald-400 mb-2">Key Points to Remember:</h4>
                        <ul class="list-disc list-inside space-y-1 text-sm">
                            ${section.keyPoints.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }
}

// Initialize chapter content system
const chapterContent = new ChapterContent();