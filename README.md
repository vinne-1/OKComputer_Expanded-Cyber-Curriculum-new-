# CyberGuard Academy — Enhanced Cybersecurity Learning Platform

[![Static Site](https://img.shields.io/badge/type-static_site-blue)](#)
[![Built with](https://img.shields.io/badge/built_with-HTML5%20%7C%20CSS%20%7C%20JavaScript-orange)](#)
[![Status](https://img.shields.io/badge/status-active-brightgreen)](#)
[![Scope](https://img.shields.io/badge/modules-16%20chapters%20%7C%204%20levels-6f42c1)](#)

A comprehensive, chapter‑based learning platform for cybersecurity. Progress through **16 chapters** across **4 levels**, take **difficulty‑tiered quizzes**, track achievements, and explore a curated **resource library**—all in a fast, privacy‑friendly static site.

---

## Table of Contents

- [Highlights](#highlights)
- [Learning Path](#learning-path)
- [Architecture Overview](#architecture-overview)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Quiz System](#quiz-system)
- [Progress & Achievements](#progress--achievements)
- [Resources Library](#resources-library)
- [Configuration (JSON Data)](#configuration-json-data)
- [Accessibility & Performance](#accessibility--performance)
- [Security & Privacy](#security--privacy)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Support & Troubleshooting](#support--troubleshooting)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Highlights

### 📚 Chapter‑Based Learning
- **16 chapters** grouped into **4 progressive levels**
- Clear **learning objectives**, topic coverage, and **estimated times**
- Difficulty curves per chapter (Easy → Medium → Hard)

### 🎯 Quizzes with Feedback
- Difficulty‑tiered question sets with **immediate explanations**
- **Timer** options to simulate exam pressure
- Mixed question types: MCQ, scenario, “apply the concept”

### 📊 Progress & Analytics
- Local **progress tracking** and **achievement badges**
- Level/Chapter completion indicators
- Quiz performance history and study time hints

### 🛡️ Curated Resources
- **100+ vetted links**: videos, courses, hands‑on labs, tools
- Powerful **filtering/search** and quick‑add to favorites

### 🧰 Admin & Utilities (optional modules)
- Basic **admin** and **auth** pages for future multi‑user flows
- Leaderboard scaffolding for classroom or cohort use

---

## Learning Path

### Level 1 — Foundation Building (1–4)
1. **Cybersecurity Fundamentals** – CIA triad, threat landscape, malware basics  
2. **Networking Essentials** – OSI/TCP‑IP, protocols, basic hardening  
3. **Risk & Governance** – Risk assessment, security policies, frameworks  
4. **Tools & Crypto Basics** – Core security tooling, crypto fundamentals

### Level 2 — Technical Implementation (5–8)
5. **System Hardening** – OS/app hardening, baselines, patching  
6. **Network Security Controls** – Firewalls, IDS/IPS, segmentation  
7. **Cryptography & PKI** – Ciphers, TLS/SSL, certificates, revocation  
8. **Identity & Access Mgmt** – AuthN/AuthZ, SSO, IAM workflows

### Level 3 — Advanced Defense (9–12)
9. **SOC Operations** – SIEM, alerting, triage, IR runbooks  
10. **Threat Hunting & Intel** – Hypotheses, hunts, intel feeds, APTs  
11. **DFIR** – Acquisition, forensics, chain of custody, malware basics  
12. **Advanced Threats** – TTPs, detections, countermeasures

### Level 4 — Strategic Leadership (13–16)
13. **Enterprise Security Architecture** – Zero‑Trust, reference models  
14. **Governance & Compliance** – Risk, regulatory mapping, audits  
15. **Program Management** – Metrics, budgets, stakeholder comms  
16. **Emerging Tech & Future** – AI/ML, IoT/OT, cloud, post‑quantum

---

## Architecture Overview

- **Frontend only (static site):** HTML + CSS (Tailwind) + Vanilla JS  
- **Pages:** `index.html` (dashboard), `chapters.html`, `quiz.html`, `resources.html`, optional `leaderboard.html`, `admin.html`, `auth.html`, and `enhanced_index.html` variant
- **State:** Browser Local Storage for progress/achievements; Session Storage for quiz context
- **Data:** JSON files for curriculum & resources; quiz DB embedded in `quiz_system.js`
- **UX libraries:** Vanta.js (visuals), Font Awesome (icons)

> _No backend is required. If you later add one (for cloud sync or accounts), ensure privacy notices and consent._

---

## File Structure

```
.
├─ index.html                   # Dashboard / Landing
├─ enhanced_index.html          # Optional enhanced landing
├─ chapters.html                # Chapters overview & deep links
├─ quiz.html                    # Quiz interface
├─ resources.html               # Resource library
├─ enhanced_resources.html      # Optional enhanced resources UI
├─ leaderboard.html             # Leaderboard (optional)
├─ admin.html                   # Admin (optional)
├─ auth.html                    # Authentication (optional)
│
├─ main.js                      # Core app bootstrap
├─ fixed_main.js                # Stable main logic variant
├─ enhanced_main.js             # Enhanced dashboard logic
├─ chapter_system.js            # Chapter navigation + state
├─ quiz_system.js               # Quiz logic (includes question DB)
├─ resources.js                 # Resource catalog logic
├─ enhanced_resources.js        # Enhanced resources UX
├─ leaderboard_system.js        # Leaderboard logic
├─ admin_system.js              # Admin logic
├─ auth_system.js               # Auth logic
│
├─ chapter_curriculum.json      # Chapter metadata + mapping
├─ curriculum_structure.json    # High‑level structure
├─ expanded_curriculum.json     # Rich resource catalog
│
└─ README.md                    # You’re here
```

> **Note:** Some environments block `fetch()` of local JSON over `file://`. Run a local web server for a smooth experience.

---

## Getting Started

### Prerequisites
- Modern browser (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- **Recommended:** Local HTTP server (one of):
  - Python: `python -m http.server 8000`
  - Node: `npx http-server -p 8000`
  - VS Code: _Live Server_ extension

### Quick Start
```bash
# from the project root
python -m http.server 8000
# open in your browser:
#   http://localhost:8000/index.html
# or:
#   http://localhost:8000/enhanced_index.html
```

---

## Usage Guide

1. **Dashboard → Chapters**: Explore levels/chapters, read objectives, check estimated time.  
2. **Take Quizzes**: Launch Easy/Medium/Hard sets from each chapter; timer optional.  
3. **Track Progress**: Progress & achievements persist locally in your browser.  
4. **Use Resources**: Filter/search resources by level, type, topic, difficulty.  
5. **(Optional) Admin/Auth/Leaderboard**: Experimental pages for future cohorts.

---

## Quiz System

- **Easy:** 8–10 Qs, pass ≥ 75%, 15–20 min  
- **Medium:** 12–18 Qs, pass ≥ 80%, 20–28 min  
- **Hard:** 15–24 Qs, pass ≥ 85%, 25–40 min

**Question Types:** MCQ, scenario, applied concepts, best practices.  
**Feedback:** Immediate explanation + result summary.  
**Persistence:** Results recorded locally for analytics and badges.

---

## Progress & Achievements

Badges you can unlock:
- **First Steps** – First quiz completed  
- **Foundation Master** – Level 1 completed  
- **Chapter Explorer** – 4 chapters completed  
- **Difficulty Master** – Any Hard quiz passed  
- **Quiz Warrior** – 5 quizzes completed  
- **Cyber Guardian** – All levels completed

_Reset progress_: clear this site’s data via your browser (Site Settings → Clear data).

---

## Resources Library

- 100+ vetted items (videos, courses, labs, tools)  
- Filter by **type**, **level**, **topic**, **difficulty**  
- Save favorites and track what you’ve opened

_Tip_: Use the search bar for quick matches (e.g., “SIEM”, “PKI”, “DFIR”).

---

## Configuration (JSON Data)

This project reads JSON files to render chapters and resources. Keep your JSON **valid**.

### `chapter_curriculum.json` (example)
```json
{
  "levels": [
    {
      "id": 1,
      "title": "Foundation Building",
      "chapters": [
        {
          "id": 1,
          "title": "Cybersecurity Fundamentals",
          "objectives": ["CIA Triad", "Threats", "Malware"],
          "estimatedMinutes": 45
        }
      ]
    }
  ]
}
```

### `expanded_curriculum.json` (example)
```json
{
  "resources": [
    {
      "id": "vid-osi-overview",
      "type": "video",
      "level": 1,
      "chapter": 2,
      "title": "OSI Model Explained",
      "url": "https://example.com/osi",
      "difficulty": "easy",
      "tags": ["networking", "osi", "basics"]
    }
  ]
}
```

> The quiz database is bundled inside `quiz_system.js` by default.

---

## Accessibility & Performance

- **Semantic HTML**, ARIA labels, keyboard navigation  
- High‑contrast palettes; responsive layouts (CSS Grid/Flex)  
- Lazy loading where possible; minimal dependencies  
- Works offline once loaded (static assets + local state)

---

## Security & Privacy

- No backend by default; **no data leaves your browser**  
- Progress, preferences, and analytics stored in **Local Storage**  
- If you deploy a backend later, add consent & privacy notices

---

## Roadmap

- Cloud sync for progress & profiles  
- Advanced analytics/export dashboards  
- Cohort collaboration & leaderboards  
- Mobile‑first PWA  
- LMS integrations  
- Certification prep tracks (mock exams)  
- Virtual labs & interactive coding

---

## Contributing

1. Fork the repo  
2. Create a feature branch: `git checkout -b feat/awesome`  
3. Commit: `git commit -m "feat: add awesome thing"`  
4. Push: `git push -u origin feat/awesome`  
5. Open a Pull Request

_Code style_: small functions, documented modules, composable patterns.

---

## Support & Troubleshooting

**JSON won’t load locally**  
- Don’t open via `file://`. Run a local server (see _Getting Started_).

**Progress didn’t update**  
- Hard refresh; ensure Local Storage isn’t blocked.

**README case didn’t change on Windows**  
```bash
git mv -f README.md tmp && git commit -m "temp rename"
git mv -f tmp README.md && git commit -m "rename back"
git push
```

**Where to start?**  
- Open `index.html` (or `enhanced_index.html` if present) and follow the dashboard.

---

## License

This project is provided for **educational purposes**.  
If you plan to redistribute or commercialize, add a proper license (e.g., MIT) and update this section.

---

## Acknowledgments

- Cybersecurity community and educators who share knowledge  
- Open‑source libraries and icon sets  
- Learners and practitioners providing continual feedback

---

> **Start your cybersecurity journey with CyberGuard Academy—learn, test, and track your growth.**
