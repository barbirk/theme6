# Arts et Math — Interactive Learning PWA

Build a fun, captivating, bilingual (French/English) PWA to help an 11-year-old prepare for a math exam. Content is based on **Thème 6 — Arts et math!** covering Sections 26–30 plus Revision/Situation d'application pages.

## Math Content Summary (from 36 scanned pages)

| Section | Topic (FR) | Topic (EN) | Pages |
|---------|-----------|-----------|-------|
| **26** | Expressions équivalentes, terme manquant, décomposition en facteurs premiers | Equivalent expressions, missing terms, prime factorization | pp.98–105 |
| **27** | Multiplication d'un nombre naturel par une fraction | Multiplying a whole number by a fraction | pp.106–110 |
| **28** | Multiplication/division de nombres décimaux (×10, ×100, ×1000), multiplication décimal × décimal | Decimal multiplication & division (×10, ×100, ×1000), decimal × decimal | pp.111–117 |
| **29** | Translation, réflexion, frises et dallages | Translation, reflection, friezes & tilings | pp.120–125 |
| **30** | Probabilité (notation fractionnaire, décimale, pourcentage), comparaison résultats théoriques/expérimentaux | Probability (fraction, decimal, percentage notation), comparing theoretical vs. experimental results | pp.126–133 |
| **Révision** | Combined review of all topics + Situation d'application | Comprehensive review + Applied problem-solving | pp.134–139 |

---

## Architecture

Pure HTML + CSS + Vanilla JS (no frameworks). Same proven architecture as the Québec history app.

```
theme6/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── data.js          # All lesson content, quiz banks, game configs, i18n strings
│   ├── i18n.js          # Language switching engine
│   ├── games.js         # All mini-game engines
│   └── app.js           # Navigation, state, XP, theme toggle, analytics
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
├── manifest.json
├── sw.js                # Service worker for PWA/offline
├── LICENSE
├── README.md
├── reference/           # (existing scans — not deployed)
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## Design System (via Stitch)

### Color Palette
- **Primary**: Rich purple `#7C3AED` (creative/art theme)
- **Secondary**: Warm coral `#F97316`
- **Accent**: Golden yellow `#FBBF24` (XP stars)
- **Success**: Emerald `#10B981`
- **Error**: Rose `#F43F5E`
- **Dark mode background**: `#0F172A` (deep slate)
- **Light mode background**: `#FFF7ED` (warm cream)

### Typography
- **Headings**: Fredoka One (fun, rounded)
- **Body**: Nunito (friendly, readable)

### Shape
- Large rounded corners (16px cards, 24px modals)
- Playful, bubbly UI components

> [!IMPORTANT]
> All text must remain legible in both themes. Light text on dark backgrounds, dark text on light backgrounds. No dark-on-dark.

---

## Proposed Features

### 1. Home Screen
- Animated hero with floating math symbols (÷, ×, +, fractions, shapes)
- 🎨 Art-themed mascot (paintbrush character) with speech bubbles
- 5 navigation cards: **Lessons**, **Quiz**, **Mini-Games**, **Formula Sheet**, **Progress**
- Progress bars on each card
- XP counter in header

### 2. Lesson System (5 Interactive Lessons)
Each lesson has:
- **Concept explanation** with animated visuals (no scanned images)
- **Interactive examples** (tap to reveal steps)
- **Practice problems** (3-5 per lesson)
- **"Got it!" button** to mark as complete

#### Lesson Content:
1. **Equivalent Expressions & Missing Terms** — Interactive balance scale visualization
2. **Prime Factorization** — Animated factor tree builder
3. **Multiplying Whole Numbers × Fractions** — Visual fraction strips with shading
4. **Decimal Operations** — Decimal point slider animation, column multiplication
5. **Geometric Transformations** — Interactive grid canvas for translations/reflections
6. **Probability** — Spinner wheels, dice, card draws with live calculation

### 3. Quiz Engine
- **6 topic-specific quizzes** (one per section) + **1 comprehensive exam-style quiz**
- Multiple question types:
  - Multiple choice
  - Fill-in-the-blank (numeric input)
  - True/False
  - Matching (drag or tap)
  - Ordering (arrange steps)
- 3 lives system (❤️❤️❤️)
- Progress bar during quiz
- Animated results screen with XP rewards
- Questions drawn from expanded pool (not just textbook exercises — new examples generated)

### 4. Mini-Games (10+ games)

| # | Game | Topic | Mechanic |
|---|------|-------|----------|
| 1 | **Expression Match** | Equivalent expressions | Memory card game — match pairs of equivalent expressions |
| 2 | **Factor Tree Builder** | Prime factorization | Build the tree by choosing correct factors |
| 3 | **Missing Number Detective** | Missing terms | Fill in the blank in equations racing against a timer |
| 4 | **Fraction Painter** | Multiply whole × fraction | Paint the correct fraction of a canvas |
| 5 | **Decimal Dash** | Decimal ×10/×100/×1000 | Place the decimal point correctly as numbers fly by |
| 6 | **Decimal Multiply Challenge** | Decimal × decimal | Step-by-step column multiplication with validation |
| 7 | **Translation Studio** | Translations | Move shapes on a grid following arrow instructions |
| 8 | **Pattern Builder** | Friezes & tilings | Complete a frieze or tiling pattern by placing pieces |
| 9 | **Probability Spinner** | Probability | Spin wheels, predict outcomes, compare theory vs. experiment |
| 10 | **Speed Math** | All arithmetic | Rapid-fire calculations with combo streaks |
| 11 | **Equation Balance** | Equivalent expressions | Balance a scale by dragging expressions to each side |
| 12 | **Art Gallery Area** | Decimal multiplication & area | Calculate areas of paintings to hang them on the correct wall |

### 5. Formula Sheet / Cheat Sheet
- Quick-reference cards for each topic
- Tap to expand with examples
- Always accessible from any screen

### 6. Progress & Gamification
- **XP System**: Earn stars for completing lessons (+50), quizzes (+100), games (+25-75)
- **Streak counter**: Days in a row
- **Achievement badges**: "Prime Detective", "Fraction Master", "Decimal Wizard", etc.
- **Progress dashboard**: Topic mastery bars
- All state persisted in `localStorage`

### 7. Gender-Neutral Language
- No gendered pronouns in FR or EN
- Use "tu" (informal, gender-neutral in French)
- Avoid "il/elle" — use inclusive phrasing
- No assumptions about the user's gender anywhere

### 8. IP Tracking
- On app load, call a free API (e.g., `https://api.ipify.org?format=json`) to get the user's IP
- Log IP + timestamp + user-agent to a lightweight logging endpoint
- Since this is a static GitHub Pages site, we'll use a free service:
  - **Option A**: Log to a Google Sheet via Google Apps Script webhook
  - **Option B**: Use a free analytics pixel/beacon service
- Display a small privacy notice on first visit

> [!IMPORTANT]
> **IP tracking implementation**: Since GitHub Pages is static-only, we'll embed a tracking pixel that calls a Google Apps Script endpoint to log visits to a Google Sheet. This requires you to set up a Google Apps Script — I'll provide the template. Alternatively, I can embed a free analytics service like GoatCounter.

### 9. Dark/Light Mode
- Toggle button in header (🌙/☀️)
- CSS custom properties for all colors
- Preference saved in `localStorage`
- Respects `prefers-color-scheme` on first visit
- **Strict contrast checking** — no dark text on dark backgrounds

### 10. Bilingual (FR/EN)
- All strings in `data.js` with `fr` and `en` keys
- French is default
- English translations written naturally (not literal)
- Toggle button in header

---

## Proposed Changes

### Core Files

#### [NEW] [index.html](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/index.html)
- Full HTML structure with all views (home, lessons, lesson-detail, quiz list, active quiz, games list, active game, formula sheet, progress, results)
- PWA meta tags, manifest link, service worker registration
- Google Fonts (Fredoka One + Nunito)
- Semantic HTML5 with unique IDs for all interactive elements
- No gender assumptions in any static text

#### [NEW] [css/styles.css](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/css/styles.css)
- Full design system with CSS custom properties for both themes
- Responsive grid layouts (tablet-first, iPad-friendly)
- Card components, quiz components, game containers
- Animations (floating symbols, confetti, transitions)
- Dark/light theme variables with strict contrast rules

#### [NEW] [js/data.js](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/js/data.js)
- All 6 lesson objects with concept explanations, examples, practice problems
- Quiz question banks (50+ questions total, going beyond the textbook)
- Game configuration objects
- Formula sheet content
- Complete i18n strings (FR + EN)
- Glossary of math terms

#### [NEW] [js/i18n.js](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/js/i18n.js)
- Language switching engine
- DOM traversal for `data-i18n` attributes
- Placeholder translation support

#### [NEW] [js/games.js](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/js/games.js)
- All 12 mini-game engines
- Canvas-based games for geometry (translation grid)
- Timer and scoring systems
- Sound effects via Web Audio API (optional, togglable)

#### [NEW] [js/app.js](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/js/app.js)
- SPA navigation engine
- XP/progress state management
- Theme toggle logic
- Analytics/IP tracking
- Service worker registration
- Quiz engine (question rendering, scoring, lives)

---

### PWA & Deployment

#### [NEW] [manifest.json](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/manifest.json)
- App name: "Arts et Math"
- Theme color matching design system
- Icons at 192px and 512px
- Start URL, display: standalone

#### [NEW] [sw.js](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/sw.js)
- Cache-first strategy for all app assets
- Offline capability

#### [NEW] [icons/](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/icons/)
- Generated app icons (192, 512, apple-touch-icon)

#### [NEW] [.github/workflows/deploy.yml](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/.github/workflows/deploy.yml)
- GitHub Actions workflow for GitHub Pages deployment
- Deploys on push to main branch
- Excludes `/reference` directory from deployment

---

### Repository Files

#### [NEW] [LICENSE](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/LICENSE)
- MIT License

#### [NEW] [README.md](file:///Volumes/External/Users/karim/Projects/cursor/education/math/theme6/README.md)
- App description, features, tech stack
- Deployment instructions
- Screenshot placeholder

---

## Open Questions

> [!IMPORTANT]
> **IP Tracking**: For a static GitHub Pages site, the best approach is to use a lightweight analytics service. Options:
> 1. **GoatCounter** (free, privacy-friendly, hosted) — just add a script tag
> 2. **Google Apps Script webhook** — logs IP/timestamp to a Google Sheet you own
> 3. **Simple beacon** — send data to a free endpoint
>
> Which approach do you prefer? I'll default to **GoatCounter** as it's the simplest and most privacy-compliant.

> [!NOTE]
> **Stitch Design**: I'll create a project in Stitch with the design system (purple/coral art theme) and generate key screens (home, lesson, quiz, game) for visual reference before coding.

---

## Verification Plan

### Automated Tests
- Build & serve locally, verify all views render
- Test dark/light mode toggle
- Test FR/EN language switching
- Test quiz scoring logic
- Test game mechanics
- Verify PWA installability (manifest, service worker)

### Browser Testing
- Open in browser, navigate all sections
- Test on tablet viewport (768×1024)
- Verify no dark-on-dark text issues
- Test all 12 mini-games
- Complete a quiz end-to-end

### Deployment
- Push to GitHub, verify Actions workflow runs
- Confirm site is live at `https://barbirk.github.io/theme6/`
- Test PWA install on iPad
