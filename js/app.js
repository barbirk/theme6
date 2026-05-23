/* ============================================================
   Arts et Math — Main Application
   ============================================================ */

const App = {
  state: {
    xp: parseInt(localStorage.getItem('xp') || '0', 10),
    completedLessons: JSON.parse(localStorage.getItem('completedLessons') || '[]'),
    completedQuizzes: JSON.parse(localStorage.getItem('completedQuizzes') || '[]'),
    completedGames: JSON.parse(localStorage.getItem('completedGames') || '[]'),
    achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
    streak: parseInt(localStorage.getItem('streak') || '0', 10),
    lastVisit: localStorage.getItem('lastVisit') || null,
    theme: localStorage.getItem('theme') || 'dark'
  },

  quizState: null,
  currentGame: null,

  init() {
    this.applyTheme(this.state.theme);
    this.updateXP();
    this.bindNav();
    this.bindHeader();
    this.bindBackButtons();
    this.bindLessonComplete();
    this.bindQuizControls();
    this.bindGameControls();
    this.bindResultsControls();
    this.createParticles();
    this.registerSW();
    this.trackVisit();
    this.checkStreak();

    // Initial renders
    this.renderLessonsList();
    this.renderQuizList();
    this.renderGamesList();
    this.renderFormulas();
    this.renderProgress();
  },

  /* ---- Navigation ---- */
  navigate(viewId, params = {}) {
    document.querySelectorAll('.view').forEach(v => {
      v.classList.remove('active');
      v.classList.add('hidden');
    });
    const target = document.getElementById('view-' + viewId);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('active');
      window.scrollTo(0, 0);
    }

    if (viewId === 'lesson-detail' && params.lessonId) {
      this.loadLesson(params.lessonId);
    }
    if (viewId === 'quiz-active' && params.quizId) {
      this.startQuiz(params.quizId);
    }
    if (viewId === 'game-active' && params.gameId) {
      this.startGame(params.gameId);
    }
  },

  bindNav() {
    document.querySelectorAll('[data-view]').forEach(el => {
      el.addEventListener('click', () => {
        const view = el.getAttribute('data-view');
        this.navigate(view);
        this.updateMascot(view);
      });
    });
    document.getElementById('btn-home')?.addEventListener('click', () => this.navigate('home'));
  },

  bindBackButtons() {
    document.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', () => this.navigate('home'));
    });
  },

  updateMascot(view) {
    const map = { lessons: 'mascot.lessons', quiz: 'mascot.quiz', games: 'mascot.games' };
    const key = map[view];
    if (key) {
      const el = document.getElementById('mascot-msg');
      if (el) el.textContent = I18n.t(key);
    }
  },

  /* ---- Header controls ---- */
  bindHeader() {
    document.getElementById('btn-lang')?.addEventListener('click', () => {
      I18n.toggle();
      this.renderLessonsList();
      this.renderQuizList();
      this.renderGamesList();
      this.renderFormulas();
      this.renderProgress();
    });
    document.getElementById('btn-theme')?.addEventListener('click', () => {
      this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme(this.state.theme);
      localStorage.setItem('theme', this.state.theme);
    });
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('btn-theme');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  },

  /* ---- XP & State ---- */
  addXP(amount) {
    this.state.xp += amount;
    localStorage.setItem('xp', String(this.state.xp));
    this.updateXP();
    this.checkAchievements();
  },

  updateXP() {
    const el = document.getElementById('xp-total');
    if (el) el.textContent = this.state.xp;
  },

  saveState() {
    localStorage.setItem('completedLessons', JSON.stringify(this.state.completedLessons));
    localStorage.setItem('completedQuizzes', JSON.stringify(this.state.completedQuizzes));
    localStorage.setItem('completedGames', JSON.stringify(this.state.completedGames));
    localStorage.setItem('achievements', JSON.stringify(this.state.achievements));
  },

  checkAchievements() {
    const unlock = (id) => {
      if (!this.state.achievements.includes(id)) {
        this.state.achievements.push(id);
        const ach = APP_DATA.achievements.find(a => a.id === id);
        if (ach) this.toast(I18n.t('toast.achievement', { name: ach.name[I18n.lang] }));
      }
    };

    if (this.state.completedLessons.includes('l1')) unlock('a1');
    if (this.state.completedLessons.includes('l2')) unlock('a2');
    if (this.state.completedLessons.includes('l3')) unlock('a3');
    if (this.state.completedLessons.includes('l4')) unlock('a4');
    if (this.state.completedLessons.includes('l5')) unlock('a5');
    if (this.state.completedLessons.includes('l6')) unlock('a6');
    if (this.state.xp >= 500) unlock('a8');

    this.saveState();
    this.renderProgress();
  },

  checkStreak() {
    const today = new Date().toDateString();
    const last = this.state.lastVisit ? new Date(this.state.lastVisit).toDateString() : null;
    if (last && last !== today) {
      const diff = (new Date(today) - new Date(last)) / (1000*60*60*24);
      if (diff === 1) this.state.streak++;
      else if (diff > 1) this.state.streak = 1;
    } else if (!last) {
      this.state.streak = 1;
    }
    this.state.lastVisit = new Date().toISOString();
    localStorage.setItem('streak', String(this.state.streak));
    localStorage.setItem('lastVisit', this.state.lastVisit);
  },

  /* ---- Lessons ---- */
  renderLessonsList() {
    const container = document.getElementById('lessons-list');
    if (!container) return;
    container.innerHTML = APP_DATA.lessons.map(l => {
      const done = this.state.completedLessons.includes(l.id);
      return `
        <button class="lesson-card" onclick="App.navigate('lesson-detail',{lessonId:'${l.id}'})">
          <div class="lesson-icon" style="background:${done?'rgba(16,185,129,.15)':'rgba(124,58,237,.12)'};">${l.icon}</div>
          <div class="lesson-info">
            <div class="lesson-title">${l.title[I18n.lang]}</div>
            <div class="lesson-desc">${l.desc[I18n.lang]}</div>
          </div>
          <div class="lesson-status">${done ? '✅' : '⬜'}</div>
        </button>`;
    }).join('');
    this.updateHomeProgress();
  },

  loadLesson(id) {
    const lesson = APP_DATA.lessons.find(l => l.id === id);
    if (!lesson) return;
    document.getElementById('lesson-title').textContent = lesson.icon + ' ' + lesson.title[I18n.lang];
    document.getElementById('lesson-section-badge').textContent = '§' + lesson.section;
    const content = document.getElementById('lesson-content');
    content.innerHTML = lesson.content[I18n.lang];

    // Bind practice check buttons
    content.querySelectorAll('.practice-check').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const feedback = btn.nextElementSibling;
        const expected = input.getAttribute('data-answer');
        const given = input.value.trim().toLowerCase().replace(/,/g, '.');
        const normExpected = expected.toLowerCase().replace(/,/g, '.');
        const correct = given === normExpected;
        feedback.textContent = I18n.t(correct ? 'practice.correct' : 'practice.wrong');
        feedback.className = 'practice-feedback ' + (correct ? 'correct' : 'wrong');
      });
    });

    const completeBtn = document.getElementById('btn-lesson-complete');
    completeBtn.textContent = I18n.t('lesson.complete');
    completeBtn.onclick = () => {
      if (!this.state.completedLessons.includes(id)) {
        this.state.completedLessons.push(id);
        this.saveState();
        this.addXP(50);
        this.toast(I18n.t('toast.lessonComplete'));
        this.renderLessonsList();
      }
      this.navigate('lessons');
    };
  },

  bindLessonComplete() {},

  /* ---- Quiz ---- */
  renderQuizList() {
    const container = document.getElementById('quiz-list');
    if (!container) return;
    container.innerHTML = APP_DATA.quizzes.map((q, i) => {
      const done = this.state.completedQuizzes.includes(q.id);
      return `
        <button class="quiz-card" onclick="App.navigate('quiz-active',{quizId:'${q.id}'})">
          <div class="quiz-icon" style="background:${done?'rgba(16,185,129,.15)':'rgba(6,182,212,.12)'};">🎯</div>
          <div class="quiz-info">
            <div class="quiz-title">${q.title[I18n.lang]}</div>
            <div class="quiz-desc">${q.questions.length} questions</div>
          </div>
          <div class="quiz-status">${done ? '✅' : '⬜'}</div>
        </button>`;
    }).join('');
    this.updateHomeProgress();
  },

  startQuiz(quizId) {
    const quiz = APP_DATA.quizzes.find(q => q.id === quizId);
    if (!quiz) return;
    this.quizState = {
      quizId,
      questions: [...quiz.questions],
      current: 0,
      score: 0,
      lives: 3,
      answers: []
    };
    this.renderQuizQuestion();
  },

  renderQuizQuestion() {
    const st = this.quizState;
    const q = st.questions[st.current];
    const total = st.questions.length;
    document.getElementById('quiz-counter').textContent = `${st.current + 1}/${total}`;
    document.getElementById('quiz-progress').style.width = `${((st.current) / total) * 100}%`;
    this.renderLives();

    const container = document.getElementById('quiz-content');
    const opts = q.options ? q.options[I18n.lang] : null;
    const isFill = q.type === 'fill';

    let html = `<div class="quiz-question">${q.q[I18n.lang]}</div>`;
    if (isFill) {
      html += `<div class="quiz-fill">
        <input type="text" id="quiz-fill-input" placeholder="${I18n.lang==='fr'?'Ta réponse...':'Your answer...'}" autocomplete="off">
        <button class="btn-primary" id="quiz-fill-submit">${I18n.t('quiz.submit')}</button>
      </div>`;
    } else {
      html += `<div class="quiz-options" id="quiz-options">
        ${opts.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`).join('')}
      </div>`;
    }
    container.innerHTML = html;

    if (isFill) {
      document.getElementById('quiz-fill-submit').addEventListener('click', () => this.handleFillAnswer());
      document.getElementById('quiz-fill-input').addEventListener('keypress', e => { if (e.key === 'Enter') this.handleFillAnswer(); });
    } else {
      container.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => this.handleChoice(parseInt(btn.getAttribute('data-idx'))));
      });
    }
  },

  renderLives() {
    const el = document.getElementById('quiz-lives');
    if (el) el.textContent = '❤️'.repeat(this.quizState.lives) + '🖤'.repeat(3 - this.quizState.lives);
  },

  handleChoice(idx) {
    const st = this.quizState;
    const q = st.questions[st.current];
    const correct = idx === q.correct;
    const opts = document.querySelectorAll('.quiz-option');
    opts.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
      else if (i === idx) btn.classList.add('wrong');
    });
    if (correct) st.score++;
    else st.lives--;
    this.renderLives();
    st.answers.push({ correct });

    setTimeout(() => this.nextQuestion(), correct ? 600 : 1200);
  },

  handleFillAnswer() {
    const input = document.getElementById('quiz-fill-input');
    const val = input.value.trim().toLowerCase().replace(/,/g, '.');
    const st = this.quizState;
    const q = st.questions[st.current];
    const correct = val === q.correct.toLowerCase().replace(/,/g, '.');
    const feedback = document.createElement('p');
    feedback.className = 'practice-feedback ' + (correct ? 'correct' : 'wrong');
    feedback.textContent = I18n.t(correct ? 'practice.correct' : 'practice.wrong');
    input.parentElement.appendChild(feedback);
    input.disabled = true;
    document.getElementById('quiz-fill-submit').disabled = true;

    if (correct) st.score++;
    else st.lives--;
    this.renderLives();
    st.answers.push({ correct });
    setTimeout(() => this.nextQuestion(), correct ? 600 : 1200);
  },

  nextQuestion() {
    const st = this.quizState;
    if (st.lives <= 0) {
      this.showResults(false);
      return;
    }
    st.current++;
    if (st.current >= st.questions.length) {
      this.showResults(true);
    } else {
      this.renderQuizQuestion();
    }
  },

  showResults(completed) {
    const st = this.quizState;
    const total = st.questions.length;
    const pct = Math.round((st.score / total) * 100);
    const passed = st.score >= Math.ceil(total * 0.6);
    const xpGain = passed ? 50 + st.score * 10 : st.score * 5;

    this.navigate('results');
    document.getElementById('results-emoji').textContent = passed ? '🎉' : '💪';
    document.getElementById('results-title').textContent = passed
      ? (I18n.lang === 'fr' ? 'Bravo !' : 'Great job!')
      : (I18n.lang === 'fr' ? 'Continue !' : 'Keep going!');
    document.getElementById('results-score').textContent = st.score;
    document.getElementById('results-total').textContent = total;
    document.getElementById('results-xp-msg').textContent = `+${xpGain} XP`;

    const circle = document.getElementById('score-circle');
    const circumference = 2 * Math.PI * 52;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    requestAnimationFrame(() => {
      circle.style.strokeDashoffset = circumference * (1 - pct / 100);
    });

    if (passed && !this.state.completedQuizzes.includes(st.quizId)) {
      this.state.completedQuizzes.push(st.quizId);
      this.saveState();
    }
    if (passed && st.lives === 3 && !this.state.achievements.includes('a7')) {
      this.state.achievements.push('a7');
      this.saveState();
      this.toast(I18n.t('toast.achievement', { name: APP_DATA.achievements.find(a=>a.id==='a7').name[I18n.lang] }));
    }
    this.addXP(xpGain);
    this.renderQuizList();
    if (passed) this.confetti();
  },

  bindQuizControls() {
    document.getElementById('btn-quit-quiz')?.addEventListener('click', () => {
      if (confirm(I18n.lang==='fr'?'Quitter le quiz ?':'Quit the quiz?')) this.navigate('quiz');
    });
  },

  bindResultsControls() {
    document.getElementById('btn-results-home')?.addEventListener('click', () => this.navigate('home'));
    document.getElementById('btn-results-retry')?.addEventListener('click', () => {
      if (this.quizState) this.startQuiz(this.quizState.quizId);
    });
  },

  /* ---- Games ---- */
  renderGamesList() {
    const container = document.getElementById('games-list');
    if (!container) return;
    container.innerHTML = APP_DATA.games.map(g => {
      const done = this.state.completedGames.includes(g.id);
      return `
        <button class="game-card" onclick="App.navigate('game-active',{gameId:'${g.id}'})">
          <div class="game-card-icon">${g.icon}</div>
          <div class="game-card-title">${g.title[I18n.lang]}</div>
          <div class="game-card-topic">${g.topic[I18n.lang]} ${done?'✅':''}</div>
        </button>`;
    }).join('');
    this.updateHomeProgress();
  },

  startGame(gameId) {
    const game = APP_DATA.games.find(g => g.id === gameId);
    if (!game || !window.Games) return;
    document.getElementById('game-title').textContent = game.title[I18n.lang];
    document.getElementById('game-score-badge').textContent = '0 pts';
    this.currentGame = gameId;
    const arena = document.getElementById('game-content');
    arena.innerHTML = '';
    window.Games.start(game.key, arena, (score) => this.onGameEnd(score));
  },

  onGameEnd(score) {
    const game = APP_DATA.games.find(g => g.id === this.currentGame);
    if (!game) return;
    if (!this.state.completedGames.includes(game.id)) {
      this.state.completedGames.push(game.id);
      this.saveState();
    }
    const xp = Math.min(75, Math.max(25, Math.round(score / 2)));
    this.addXP(xp);
    this.toast(I18n.t('toast.gameComplete', { score: xp }));
    this.renderGamesList();
    setTimeout(() => this.navigate('games'), 1500);
  },

  bindGameControls() {
    document.getElementById('btn-quit-game')?.addEventListener('click', () => {
      if (window.Games) window.Games.stop();
      this.navigate('games');
    });
  },

  /* ---- Formulas ---- */
  renderFormulas() {
    const container = document.getElementById('formulas-content');
    if (!container) return;
    container.innerHTML = APP_DATA.formulas.map((f, i) => `
      <div class="formula-card" onclick="this.classList.toggle('open')">
        <h3>${f.title[I18n.lang]}</h3>
        <div class="formula">${f.formula}</div>
        <div class="formula-example">${f.example[I18n.lang]}</div>
      </div>
    `).join('');
  },

  /* ---- Progress ---- */
  renderProgress() {
    const container = document.getElementById('progress-content');
    if (!container) return;
    const totalLessons = APP_DATA.lessons.length;
    const totalQuizzes = APP_DATA.quizzes.length;
    const totalGames = APP_DATA.games.length;
    const lProg = Math.round((this.state.completedLessons.length / totalLessons) * 100);
    const qProg = Math.round((this.state.completedQuizzes.length / totalQuizzes) * 100);
    const gProg = Math.round((this.state.completedGames.length / totalGames) * 100);

    container.innerHTML = `
      <div class="stat-card">
        <div class="stat-value">${this.state.xp}</div>
        <div class="stat-label">XP</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${this.state.streak}</div>
        <div class="stat-label">${I18n.lang==='fr'?'Jours consécutifs':'Day streak'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${lProg}%</div>
        <div class="stat-label">${I18n.lang==='fr'?'Leçons complétées':'Lessons completed'}</div>
        <div class="progress-bar" style="margin-top:8px;"><div class="progress-fill" style="width:${lProg}%"></div></div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${qProg}%</div>
        <div class="stat-label">${I18n.lang==='fr'?'Quiz complétés':'Quizzes completed'}</div>
        <div class="progress-bar" style="margin-top:8px;"><div class="progress-fill" style="width:${qProg}%"></div></div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${gProg}%</div>
        <div class="stat-label">${I18n.lang==='fr'?'Jeux complétés':'Games completed'}</div>
        <div class="progress-bar" style="margin-top:8px;"><div class="progress-fill" style="width:${gProg}%"></div></div>
      </div>
      <div class="stat-card" style="grid-column:1/-1;">
        <div class="stat-label" style="margin-bottom:8px;">${I18n.lang==='fr'?'Badges':'Badges'}</div>
        <div class="achievements-grid">
          ${APP_DATA.achievements.map(a => `
            <div class="achievement ${this.state.achievements.includes(a.id)?'unlocked':''}">
              <div class="achievement-icon">${a.icon}</div>
              <div class="achievement-name">${a.name[I18n.lang]}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  updateHomeProgress() {
    const totalL = APP_DATA.lessons.length;
    const totalQ = APP_DATA.quizzes.length;
    const totalG = APP_DATA.games.length;
    const lProg = Math.round((this.state.completedLessons.length / totalL) * 100);
    const qProg = Math.round((this.state.completedQuizzes.length / totalQ) * 100);
    const gProg = Math.round((this.state.completedGames.length / totalG) * 100);

    const pL = document.getElementById('prog-lessons');
    const pQ = document.getElementById('prog-quiz');
    const pG = document.getElementById('prog-games');
    const bL = document.getElementById('badge-lessons');
    const bQ = document.getElementById('badge-quiz');
    const bG = document.getElementById('badge-games');

    if (pL) pL.style.width = lProg + '%';
    if (pQ) pQ.style.width = qProg + '%';
    if (pG) pG.style.width = gProg + '%';
    if (bL) bL.textContent = `${this.state.completedLessons.length}/${totalL}`;
    if (bQ) bQ.textContent = `${this.state.completedQuizzes.length}/${totalQ}`;
    if (bG) bG.textContent = `${this.state.completedGames.length}/${totalG}`;
  },

  /* ---- Toast ---- */
  toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2500);
  },

  /* ---- Confetti ---- */
  confetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = [];
    const colors = ['#7C3AED','#F97316','#FBBF24','#10B981','#0EA5E9','#EC4899'];
    for (let i = 0; i < 80; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 80 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngle: Math.random() * 10,
        tiltAngleIncr: Math.random() * 0.07 + 0.05
      });
    }
    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.tiltAngle += p.tiltAngleIncr;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(0);
        p.tilt = Math.sin(p.tiltAngle) * 15;
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });
      frame++;
      if (frame < 120) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    draw();
  },

  /* ---- Particles ---- */
  createParticles() {
    const container = document.getElementById('bg-particles');
    if (!container) return;
    const symbols = ['÷','×','+','−','½','¼','¾','π','√','∑','∠','≈'];
    for (let i = 0; i < 16; i++) {
      const span = document.createElement('span');
      span.className = 'particle';
      span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      span.style.animationDelay = Math.random() * 10 + 's';
      span.style.animationDuration = (10 + Math.random() * 8) + 's';
      container.appendChild(span);
    }
  },

  /* ---- Service Worker ---- */
  registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  },

  /* ---- Analytics / IP ---- */
  trackVisit() {
    try {
      fetch('https://api.ipify.org?format=json')
        .then(r => r.json())
        .then(data => {
          const payload = {
            ip: data.ip,
            ts: new Date().toISOString(),
            ua: navigator.userAgent,
            lang: navigator.language,
            screen: `${window.innerWidth}x${window.innerHeight}`
          };
          // Send to a simple endpoint — replace with your own if needed
          // Using a no-op beacon to avoid errors on static hosting
          if (navigator.sendBeacon) {
            navigator.sendBeacon('https://httpbin.org/post', JSON.stringify(payload));
          }
        }).catch(() => {});
    } catch (e) {}
  }
};

// Add SVG gradient for score ring
const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgDefs.setAttribute('width', '0');
svgDefs.setAttribute('height', '0');
svgDefs.innerHTML = `<defs><linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#F97316"/></linearGradient></defs>`;
document.body.appendChild(svgDefs);

document.addEventListener('DOMContentLoaded', () => App.init());
