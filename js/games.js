/* ============================================================
   Arts et Math — Mini-Games
   ============================================================ */

const Games = {
  active: null,
  score: 0,
  timer: null,
  arena: null,
  onEnd: null,

  start(key, arena, onEnd) {
    this.stop();
    this.arena = arena;
    this.onEnd = onEnd;
    this.score = 0;
    this.active = key;
    const fn = this.engines[key];
    if (!fn) {
      console.error('Game engine not found:', key);
      arena.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Game not found</p>';
      return;
    }
    try {
      fn.call(this, arena);
    } catch (e) {
      console.error('Game engine error:', e);
      arena.innerHTML = '<p style="text-align:center;color:var(--error);">⚠️ Game failed to load. Check console.</p>';
    }
  },

  stop() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    this.active = null;
  },

  updateScore(points) {
    this.score += points;
    const badge = document.getElementById('game-score-badge');
    if (badge) badge.textContent = this.score + ' pts';
  },

  endGame() {
    this.stop();
    if (this.onEnd) this.onEnd(this.score);
  },

  engines: {
    /* ---- 1. Expression Match (Memory) ---- */
    expressionMatch(arena) {
      const pairs = [
        ['3x+2x','5x'],['4+7','11'],['2×6','12'],['15÷3','5'],
        ['8−3','5'],['9+6','15'],['20÷4','5'],['7×3','21']
      ];
      const selected = pairs.sort(() => 0.5 - Math.random()).slice(0, 6);
      const cards = [];
      selected.forEach(([a,b], i) => { cards.push({id:i,text:a,pair:i}); cards.push({id:i,text:b,pair:i}); });
      cards.sort(() => 0.5 - Math.random());

      let first = null, matches = 0, moves = 0;
      const grid = document.createElement('div');
      grid.className = 'memory-grid';
      arena.appendChild(grid);

      cards.forEach((c, idx) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.textContent = '?';
        card.dataset.idx = idx;
        card.dataset.pair = c.pair;
        card.dataset.text = c.text;
        card.addEventListener('click', () => {
          if (card.classList.contains('flipped') || card.classList.contains('matched') || first === card) return;
          card.classList.add('flipped');
          card.textContent = c.text;
          if (!first) { first = card; return; }
          moves++;
          if (first.dataset.pair === card.dataset.pair) {
            first.classList.add('matched');
            card.classList.add('matched');
            first = null; matches++;
            this.updateScore(15);
            if (matches === selected.length) setTimeout(() => this.endGame(), 600);
          } else {
            const a = first, b = card;
            first = null;
            setTimeout(() => { a.classList.remove('flipped'); a.textContent = '?'; b.classList.remove('flipped'); b.textContent = '?'; }, 800);
          }
        });
        grid.appendChild(card);
      });
    },

    /* ---- 2. Factor Tree ---- */
    factorTree(arena) {
      const targets = [24,36,48,60,72,84,90,100];
      const target = targets[Math.floor(Math.random()*targets.length)];
      let current = target;
      let score = 0;

      const wrap = document.createElement('div');
      wrap.innerHTML = `<h3 style="text-align:center;margin-bottom:12px;">${I18n.lang==='fr'?'Décompose':'Decompose'} ${target}</h3>`;
      arena.appendChild(wrap);

      const tree = document.createElement('div');
      tree.className = 'factor-tree';
      wrap.appendChild(tree);

      const renderNode = (n, container) => {
        const node = document.createElement('div');
        node.className = 'factor-node';
        node.textContent = n;
        container.appendChild(node);

        if (this.isPrime(n)) {
          node.classList.add('prime');
          return;
        }

        const branch = document.createElement('div');
        branch.className = 'factor-branch';
        container.appendChild(branch);

        // Find a valid factor pair
        let a = 2;
        while (n % a !== 0) a++;
        const b = n / a;

        const makeChoice = (correct, other) => {
          const div = document.createElement('div');
          div.style.display = 'flex';
          div.style.flexDirection = 'column';
          div.style.alignItems = 'center';
          div.style.gap = '8px';

          const opts = [correct, other].sort(() => 0.5 - Math.random());
          opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-primary';
            btn.style.padding = '8px 16px';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
              if (opt === correct) {
                this.updateScore(10);
                div.innerHTML = '';
                renderNode(opt, div);
                if (opt !== correct && this.isPrime(opt)) node.classList.add('prime');
              } else {
                btn.style.background = 'var(--error)';
                setTimeout(() => btn.style.background = '', 400);
              }
            });
            div.appendChild(btn);
          });
          return div;
        };

        branch.appendChild(makeChoice(a, a === 2 ? 3 : a-1));
        branch.appendChild(makeChoice(b, b === 2 ? 3 : b+1));
      };

      renderNode(target, tree);

      // End button
      const endBtn = document.createElement('button');
      endBtn.className = 'btn-primary btn-large';
      endBtn.style.marginTop = '20px';
      endBtn.textContent = I18n.lang==='fr'?'Terminer':'Finish';
      endBtn.addEventListener('click', () => this.endGame());
      wrap.appendChild(endBtn);
    },

    /* ---- 3. Missing Number Detective ---- */
    missingNumber(arena) {
      let score = 0, rounds = 0, timeLeft = 60;
      const maxRounds = 10;

      const wrap = document.createElement('div');
      wrap.style.textAlign = 'center';
      arena.appendChild(wrap);

      const timerEl = document.createElement('div');
      timerEl.style.fontSize = '1.4rem';
      timerEl.style.fontWeight = '700';
      timerEl.style.color = 'var(--secondary)';
      timerEl.textContent = `⏱️ ${timeLeft}s`;
      wrap.appendChild(timerEl);

      const qEl = document.createElement('div');
      qEl.style.fontSize = '1.6rem';
      qEl.style.margin = '20px 0';
      qEl.style.fontWeight = '700';
      wrap.appendChild(qEl);

      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'practice-input';
      input.style.width = '100px';
      input.style.fontSize = '1.2rem';
      wrap.appendChild(input);

      const checkBtn = document.createElement('button');
      checkBtn.className = 'btn-primary';
      checkBtn.style.marginLeft = '8px';
      checkBtn.textContent = I18n.t('quiz.submit');
      wrap.appendChild(checkBtn);

      const feedback = document.createElement('div');
      feedback.style.marginTop = '12px';
      feedback.style.fontWeight = '700';
      wrap.appendChild(feedback);

      let answer = 0;

      const next = () => {
        if (rounds >= maxRounds) { this.endGame(); return; }
        rounds++;
        const ops = ['+','-','*'];
        const op = ops[Math.floor(Math.random()*ops.length)];
        const a = Math.floor(Math.random()*12)+2;
        const b = Math.floor(Math.random()*12)+2;
        let eq = '', ans = 0;
        if (op === '+') { eq = `${a} + □ = ${a+b}`; ans = b; }
        else if (op === '-') { eq = `${a+b} − □ = ${a}`; ans = b; }
        else { eq = `${a} × □ = ${a*b}`; ans = b; }
        qEl.textContent = eq;
        answer = ans;
        input.value = '';
        input.focus();
        feedback.textContent = '';
      };

      const check = () => {
        const val = parseInt(input.value, 10);
        if (val === answer) {
          this.updateScore(10);
          feedback.textContent = I18n.t('practice.correct');
          feedback.style.color = 'var(--success)';
          setTimeout(next, 500);
        } else {
          feedback.textContent = I18n.t('practice.wrong');
          feedback.style.color = 'var(--error)';
        }
      };

      checkBtn.addEventListener('click', check);
      input.addEventListener('keypress', e => { if (e.key === 'Enter') check(); });

      this.timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `⏱️ ${timeLeft}s`;
        if (timeLeft <= 0) { clearInterval(this.timer); this.endGame(); }
      }, 1000);

      next();
    },

    /* ---- 4. Fraction Painter ---- */
    fractionPainter(arena) {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 200;
      canvas.className = 'fraction-canvas';
      arena.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      const numerators = [1,2,3,4,5];
      const denominators = [2,3,4,5,6,8];
      const den = denominators[Math.floor(Math.random()*denominators.length)];
      const validNums = numerators.filter(n => n <= den);
      const num = validNums[Math.floor(Math.random()*validNums.length)];
      const target = num / den;
      let painted = 0;
      const cols = den <= 4 ? den : 8;
      const rows = Math.ceil(den / cols);
      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;
      let filled = new Array(den).fill(false);

      const info = document.createElement('div');
      info.style.textAlign = 'center';
      info.style.margin = '12px 0';
      info.innerHTML = `<strong>${I18n.lang==='fr'?'Colorie':'Paint'} ${num}/${den}</strong> (${Math.round(target*100)}%)`;
      arena.appendChild(info);

      const draw = () => {
        const bg = getComputedStyle(canvas).backgroundColor;
        ctx.fillStyle = bg && bg !== 'rgba(0, 0, 0, 0)' ? bg : (document.documentElement.getAttribute('data-theme') === 'dark' ? '#0F172A' : '#FFF7ED');
        ctx.fillRect(0,0,canvas.width,canvas.height);
        for (let i = 0; i < den; i++) {
          const c = i % cols, r = Math.floor(i / cols);
          ctx.fillStyle = filled[i] ? '#7C3AED' : (document.documentElement.getAttribute('data-theme') === 'dark' ? '#334155' : '#E5E7EB');
          ctx.fillRect(c*cellW+2, r*cellH+2, cellW-4, cellH-4);
          ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#475569' : '#9CA3AF';
          ctx.strokeRect(c*cellW+2, r*cellH+2, cellW-4, cellH-4);
        }
      };
      draw();

      canvas.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        const c = Math.floor(x / cellW);
        const r = Math.floor(y / cellH);
        const idx = r * cols + c;
        if (idx >= 0 && idx < den) {
          filled[idx] = !filled[idx];
          painted = filled.filter(Boolean).length / den;
          draw();
          const diff = Math.abs(painted - target);
          if (diff < 0.01) {
            this.updateScore(50);
            setTimeout(() => this.endGame(), 600);
          }
        }
      });
    },

    /* ---- 5. Decimal Dash ---- */
    decimalDash(arena) {
      let score = 0, rounds = 0, timeLeft = 45;
      const wrap = document.createElement('div');
      wrap.style.textAlign = 'center';
      arena.appendChild(wrap);

      const timerEl = document.createElement('div');
      timerEl.style.fontSize = '1.4rem';
      timerEl.style.fontWeight = '700';
      timerEl.style.color = 'var(--secondary)';
      timerEl.textContent = `⏱️ ${timeLeft}s`;
      wrap.appendChild(timerEl);

      const numEl = document.createElement('div');
      numEl.style.fontSize = '2rem';
      numEl.style.fontFamily = 'ui-monospace, monospace';
      numEl.style.margin = '20px 0';
      wrap.appendChild(numEl);

      const optsWrap = document.createElement('div');
      optsWrap.style.display = 'flex';
      optsWrap.style.gap = '10px';
      optsWrap.style.justifyContent = 'center';
      optsWrap.style.flexWrap = 'wrap';
      wrap.appendChild(optsWrap);

      const feedback = document.createElement('div');
      feedback.style.marginTop = '12px';
      feedback.style.fontWeight = '700';
      wrap.appendChild(feedback);

      let currentAnswer = '';

      const next = () => {
        if (rounds >= 8) { this.endGame(); return; }
        rounds++;
        const base = (Math.random() * 50 + 1).toFixed(2);
        const mults = [10, 100, 1000];
        const m = mults[Math.floor(Math.random()*mults.length)];
        const correct = (parseFloat(base) * m).toString().replace('.',',');
        currentAnswer = correct;
        numEl.textContent = `${base} × ${m} = ?`;

        optsWrap.innerHTML = '';
        const answers = [correct];
        while (answers.length < 4) {
          const wrong = (parseFloat(base) * m * (0.1 + Math.random()*2)).toFixed(Math.random()>0.5?1:0).toString().replace('.',',');
          if (!answers.includes(wrong)) answers.push(wrong);
        }
        answers.sort(() => 0.5 - Math.random());
        answers.forEach(ans => {
          const btn = document.createElement('button');
          btn.className = 'btn-primary';
          btn.style.minWidth = '100px';
          btn.textContent = ans;
          btn.addEventListener('click', () => {
            if (ans === correct) {
              this.updateScore(10);
              feedback.textContent = I18n.t('practice.correct');
              feedback.style.color = 'var(--success)';
              setTimeout(next, 500);
            } else {
              feedback.textContent = I18n.t('practice.wrong');
              feedback.style.color = 'var(--error)';
              btn.disabled = true;
            }
          });
          optsWrap.appendChild(btn);
        });
      };

      this.timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `⏱️ ${timeLeft}s`;
        if (timeLeft <= 0) { clearInterval(this.timer); this.endGame(); }
      }, 1000);

      next();
    },

    /* ---- 6. Decimal Multiply Challenge ---- */
    decimalMultiply(arena) {
      const a = (Math.random()*8+1).toFixed(1);
      const b = (Math.random()*8+1).toFixed(1);
      const correct = (parseFloat(a)*parseFloat(b)).toFixed(2);

      const wrap = document.createElement('div');
      wrap.style.textAlign = 'center';
      arena.appendChild(wrap);

      wrap.innerHTML = `
        <h3>${a} × ${b} = ?</h3>
        <p style="color:var(--text-muted);font-size:.9rem;">${I18n.lang==='fr'?'Multiplie comme des entiers, puis replace la virgule.':'Multiply as whole numbers, then place the decimal.'}</p>
        <div style="margin:16px 0;font-family:ui-monospace,monospace;font-size:1.3rem;">
          ${a.replace('.',',')} × ${b.replace('.',',')} = <input type="text" class="practice-input" id="dm-input" style="width:120px;">
        </div>
        <button class="btn-primary" id="dm-check">${I18n.t('quiz.submit')}</button>
        <div id="dm-feedback" style="margin-top:12px;font-weight:700;"></div>
      `;

      document.getElementById('dm-check').addEventListener('click', () => {
        const val = document.getElementById('dm-input').value.trim().replace(',','.');
        const fb = document.getElementById('dm-feedback');
        if (val === correct) {
          this.updateScore(50);
          fb.textContent = I18n.t('practice.correct');
          fb.style.color = 'var(--success)';
          setTimeout(() => this.endGame(), 800);
        } else {
          fb.textContent = I18n.t('practice.wrong');
          fb.style.color = 'var(--error)';
        }
      });
    },

    /* ---- 7. Translation Studio ---- */
    translationStudio(arena) {
      const canvas = document.createElement('canvas');
      canvas.width = 360;
      canvas.height = 360;
      canvas.className = 'fraction-canvas';
      arena.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      const gridSize = 30;
      const sx = 3, sy = 4;
      const tx = Math.floor(Math.random()*6)+1, ty = Math.floor(Math.random()*4)-2;
      const targetX = sx + tx, targetY = sy + ty;
      let playerX = sx, playerY = sy;

      const info = document.createElement('div');
      info.style.textAlign = 'center';
      info.style.margin = '12px 0';
      info.innerHTML = `<strong>${I18n.lang==='fr'?'Déplace le carré de':'Move the square by'} (${tx>=0?'+':''}${tx}, ${ty>=0?'+':''}${ty})</strong>`;
      arena.appendChild(info);

      const controls = document.createElement('div');
      controls.style.display = 'flex';
      controls.style.gap = '8px';
      controls.style.justifyContent = 'center';
      controls.style.marginBottom = '12px';
      controls.innerHTML = `
        <button class="ctrl-btn" id="ts-up">⬆️</button>
        <button class="ctrl-btn" id="ts-down">⬇️</button>
        <button class="ctrl-btn" id="ts-left">⬅️</button>
        <button class="ctrl-btn" id="ts-right">➡️</button>
      `;
      arena.appendChild(controls);

      const draw = () => {
        const bg2 = getComputedStyle(canvas).backgroundColor;
        ctx.fillStyle = bg2 && bg2 !== 'rgba(0, 0, 0, 0)' ? bg2 : (document.documentElement.getAttribute('data-theme') === 'dark' ? '#0F172A' : '#FFF7ED');
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#475569' : '#CBD5E1';
        for (let i = 0; i <= 12; i++) {
          ctx.beginPath(); ctx.moveTo(i*gridSize,0); ctx.lineTo(i*gridSize,canvas.height); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0,i*gridSize); ctx.lineTo(canvas.width,i*gridSize); ctx.stroke();
        }
        // Target
        ctx.fillStyle = 'rgba(16,185,129,.3)';
        ctx.fillRect(targetX*gridSize, targetY*gridSize, gridSize, gridSize);
        // Player
        ctx.fillStyle = '#7C3AED';
        ctx.fillRect(playerX*gridSize+2, playerY*gridSize+2, gridSize-4, gridSize-4);
      };
      draw();

      const move = (dx, dy) => {
        playerX = Math.max(0, Math.min(11, playerX + dx));
        playerY = Math.max(0, Math.min(11, playerY + dy));
        draw();
        if (playerX === targetX && playerY === targetY) {
          this.updateScore(50);
          setTimeout(() => this.endGame(), 500);
        }
      };

      document.getElementById('ts-up').addEventListener('click', () => move(0,-1));
      document.getElementById('ts-down').addEventListener('click', () => move(0,1));
      document.getElementById('ts-left').addEventListener('click', () => move(-1,0));
      document.getElementById('ts-right').addEventListener('click', () => move(1,0));
    },

    /* ---- 8. Pattern Builder ---- */
    patternBuilder(arena) {
      const patterns = [
        { seq: ['🔴','🔵','🟡','🔴','🔵','🟡','🔴','🔵','?'], ans: '🟡' },
        { seq: ['⬜','⬛','⬜','⬛','⬜','⬛','⬜','?'], ans: '⬛' },
        { seq: ['🔺','🔻','🔺','🔻','🔺','🔻','🔺','?'], ans: '🔻' },
        { seq: ['🟥','🟧','🟨','🟩','🟥','🟧','🟨','?'], ans: '🟩' }
      ];
      const pat = patterns[Math.floor(Math.random()*patterns.length)];

      const wrap = document.createElement('div');
      wrap.style.textAlign = 'center';
      arena.appendChild(wrap);

      const title = document.createElement('h3');
      title.textContent = I18n.lang==='fr'?'Complète le motif :':'Complete the pattern:';
      wrap.appendChild(title);

      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.gap = '8px';
      row.style.justifyContent = 'center';
      row.style.fontSize = '1.8rem';
      row.style.margin = '16px 0';
      wrap.appendChild(row);

      pat.seq.forEach((item, i) => {
        const span = document.createElement('span');
        span.textContent = item;
        span.style.display = 'inline-block';
        span.style.width = '40px';
        span.style.height = '40px';
        span.style.lineHeight = '40px';
        span.style.textAlign = 'center';
        span.style.borderRadius = '8px';
        span.style.background = item === '?' ? 'var(--bg-elevated)' : 'transparent';
        span.style.border = item === '?' ? '2px dashed var(--primary)' : 'none';
        row.appendChild(span);
      });

      const optsWrap = document.createElement('div');
      optsWrap.style.display = 'flex';
      optsWrap.style.gap = '10px';
      optsWrap.style.justifyContent = 'center';
      wrap.appendChild(optsWrap);

      const choices = [pat.ans, '🔴','🔵','🟡','⬜','⬛','🔺','🔻'].filter((v,i,a) => a.indexOf(v)===i).slice(0,4);
      choices.sort(() => 0.5 - Math.random());

      choices.forEach(ch => {
        const btn = document.createElement('button');
        btn.className = 'btn-primary';
        btn.style.fontSize = '1.6rem';
        btn.style.minWidth = '60px';
        btn.textContent = ch;
        btn.addEventListener('click', () => {
          if (ch === pat.ans) {
            this.updateScore(40);
            setTimeout(() => this.endGame(), 500);
          } else {
            btn.style.opacity = '0.4';
            btn.disabled = true;
          }
        });
        optsWrap.appendChild(btn);
      });
    }
  },

  isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
    return true;
  }
};

window.Games = Games;
