/* ============================================================
   Arts et Math — Data & Content
   ============================================================ */

const APP_DATA = {
  lang: 'fr',
  lessons: [
    {
      id: 'l1',
      section: '26',
      icon: '⚖️',
      title: { fr: 'Expressions équivalentes et terme manquant', en: 'Equivalent Expressions & Missing Terms' },
      desc: { fr: 'Trouve le terme manquant et vérifie l\'équivalence.', en: 'Find the missing term and check equivalence.' },
      content: {
        fr: `
          <h3>Qu'est-ce qu'une expression équivalente ?</h3>
          <p>Deux expressions sont <strong>équivalentes</strong> si elles ont la même valeur pour toutes les valeurs possibles des variables.</p>
          <div class="example-box">
            <details><summary>Exemple : Vérifier l'équivalence</summary>
            <p>3x + 5 et 5 + 3x sont équivalentes grâce à la commutativité.</p>
            <p>Pour x = 2 : 3×2 + 5 = 11 et 5 + 3×2 = 11 ✓</p>
            </details>
          </div>
          <h3>Trouver le terme manquant</h3>
          <p>On isole l'inconnue en utilisant les opérations inverses.</p>
          <div class="example-box">
            <details><summary>Exemple : Terme manquant</summary>
            <p><span class="missing-box">?</span> + 7 = 15 → <span class="missing-box">?</span> = 15 − 7 = <strong>8</strong></p>
            <p><span class="missing-box">?</span> × 4 = 28 → <span class="missing-box">?</span> = 28 ÷ 4 = <strong>7</strong></p>
            </details>
          </div>
          <div class="practice-box">
            <p><strong>Pratique :</strong> Trouve le terme manquant.</p>
            <p>1) <span class="missing-box">?</span> + 12 = 25 <input type="number" class="practice-input" data-answer="13"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
            <p>2) 8 × <span class="missing-box">?</span> = 64 <input type="number" class="practice-input" data-answer="8"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
            <p>3) <span class="missing-box">?</span> − 9 = 14 <input type="number" class="practice-input" data-answer="23"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
          </div>
        `,
        en: `
          <h3>What is an equivalent expression?</h3>
          <p>Two expressions are <strong>equivalent</strong> if they have the same value for all possible variable values.</p>
          <div class="example-box">
            <details><summary>Example: Check equivalence</summary>
            <p>3x + 5 and 5 + 3x are equivalent by commutativity.</p>
            <p>For x = 2: 3×2 + 5 = 11 and 5 + 3×2 = 11 ✓</p>
            </details>
          </div>
          <h3>Finding the missing term</h3>
          <p>Isolate the unknown using inverse operations.</p>
          <div class="example-box">
            <details><summary>Example: Missing term</summary>
            <p><span class="missing-box">?</span> + 7 = 15 → <span class="missing-box">?</span> = 15 − 7 = <strong>8</strong></p>
            <p><span class="missing-box">?</span> × 4 = 28 → <span class="missing-box">?</span> = 28 ÷ 4 = <strong>7</strong></p>
            </details>
          </div>
          <div class="practice-box">
            <p><strong>Practice:</strong> Find the missing term.</p>
            <p>1) <span class="missing-box">?</span> + 12 = 25 <input type="number" class="practice-input" data-answer="13"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
            <p>2) 8 × <span class="missing-box">?</span> = 64 <input type="number" class="practice-input" data-answer="8"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
            <p>3) <span class="missing-box">?</span> − 9 = 14 <input type="number" class="practice-input" data-answer="23"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
          </div>
        `
      }
    },
    {
      id: 'l2',
      section: '26',
      icon: '🌳',
      title: { fr: 'Décomposition en facteurs premiers', en: 'Prime Factorization' },
      desc: { fr: 'Décompose un nombre en produit de nombres premiers.', en: 'Break down a number into a product of primes.' },
      content: {
        fr: `
          <h3>Nombre premier</h3>
          <p>Un nombre premier n'est divisible que par 1 et lui-même. Exemples : 2, 3, 5, 7, 11, 13...</p>
          <h3>L'arbre de facteurs</h3>
          <p>On divise le nombre par le plus petit premier possible, et on recommence jusqu'à obtenir que des premiers.</p>
          <div class="example-box">
            <details><summary>Exemple : 60</summary>
            <p>60 = 2 × 30</p>
            <p>30 = 2 × 15</p>
            <p>15 = 3 × 5</p>
            <p>Donc <strong>60 = 2 × 2 × 3 × 5 = 2² × 3 × 5</strong></p>
            </details>
          </div>
          <div class="practice-box">
            <p><strong>Pratique :</strong> Décompose en facteurs premiers.</p>
            <p>1) 36 = <input type="text" class="practice-input" data-answer="2x2x3x3" placeholder="2×2×3×3"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
            <p>2) 48 = <input type="text" class="practice-input" data-answer="2x2x2x2x3" placeholder="2×2×2×2×3"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
            <p>3) 100 = <input type="text" class="practice-input" data-answer="2x2x5x5" placeholder="2×2×5×5"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
          </div>
        `,
        en: `
          <h3>Prime number</h3>
          <p>A prime number is only divisible by 1 and itself. Examples: 2, 3, 5, 7, 11, 13...</p>
          <h3>Factor tree</h3>
          <p>Divide the number by the smallest possible prime, and repeat until only primes remain.</p>
          <div class="example-box">
            <details><summary>Example: 60</summary>
            <p>60 = 2 × 30</p>
            <p>30 = 2 × 15</p>
            <p>15 = 3 × 5</p>
            <p>So <strong>60 = 2 × 2 × 3 × 5 = 2² × 3 × 5</strong></p>
            </details>
          </div>
          <div class="practice-box">
            <p><strong>Practice:</strong> Decompose into prime factors.</p>
            <p>1) 36 = <input type="text" class="practice-input" data-answer="2x2x3x3" placeholder="2×2×3×3"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
            <p>2) 48 = <input type="text" class="practice-input" data-answer="2x2x2x2x3" placeholder="2×2×2×2×3"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
            <p>3) 100 = <input type="text" class="practice-input" data-answer="2x2x5x5" placeholder="2×2×5×5"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
          </div>
        `
      }
    },
    {
      id: 'l3',
      section: '27',
      icon: '🎨',
      title: { fr: 'Multiplier un nombre naturel par une fraction', en: 'Multiplying a Whole Number by a Fraction' },
      desc: { fr: 'Comprendre 3 × ¼ grâce aux bandes de fractions.', en: 'Understand 3 × ¼ using fraction strips.' },
      content: {
        fr: `
          <h3>Le principe</h3>
          <p>Multiplier un nombre par une fraction, c'est prendre cette fraction du nombre.</p>
          <p><strong>3 × ½</strong> = trois demis = <strong>3/2 = 1,5</strong></p>
          <div class="example-box">
            <details><summary>Exemple visuel</summary>
            <p>Imagine 3 barres de chocolat. Tu en prends la moitié de chacune : tu as 3 demi-barres, soit 1 barre et demie.</p>
            </details>
          </div>
          <h3>Méthode de calcul</h3>
          <p>a × <sup>b</sup>⁄<sub>c</sub> = <sup>a×b</sup>⁄<sub>c</sub></p>
          <div class="practice-box">
            <p><strong>Pratique :</strong> Calcule.</p>
            <p>1) 4 × ⅖ = <input type="text" class="practice-input" data-answer="8/5" placeholder="8/5"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
            <p>2) 6 × ¾ = <input type="text" class="practice-input" data-answer="18/4" placeholder="18/4"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
            <p>3) 5 × ⅓ = <input type="text" class="practice-input" data-answer="5/3" placeholder="5/3"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
          </div>
        `,
        en: `
          <h3>The principle</h3>
          <p>Multiplying a number by a fraction means taking that fraction of the number.</p>
          <p><strong>3 × ½</strong> = three halves = <strong>3/2 = 1.5</strong></p>
          <div class="example-box">
            <details><summary>Visual example</summary>
            <p>Imagine 3 chocolate bars. You take half of each: you have 3 half-bars, which is 1 and a half bars.</p>
            </details>
          </div>
          <h3>Calculation method</h3>
          <p>a × <sup>b</sup>⁄<sub>c</sub> = <sup>a×b</sup>⁄<sub>c</sub></p>
          <div class="practice-box">
            <p><strong>Practice:</strong> Calculate.</p>
            <p>1) 4 × ⅖ = <input type="text" class="practice-input" data-answer="8/5" placeholder="8/5"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
            <p>2) 6 × ¾ = <input type="text" class="practice-input" data-answer="18/4" placeholder="18/4"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
            <p>3) 5 × ⅓ = <input type="text" class="practice-input" data-answer="5/3" placeholder="5/3"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
          </div>
        `
      }
    },
    {
      id: 'l4',
      section: '28',
      icon: '🔢',
      title: { fr: 'Opérations avec les nombres décimaux', en: 'Decimal Operations' },
      desc: { fr: '×10, ×100, ×1000 et multiplication décimale.', en: '×10, ×100, ×1000 and decimal multiplication.' },
      content: {
        fr: `
          <h3>Multiplier par 10, 100, 1000</h3>
          <p>La virgule se déplace vers la <strong>droite</strong> d'autant de positions qu'il y a de zéros.</p>
          <div class="example-box">
            <details><summary>Exemples</summary>
            <p>3,45 × 10 = 34,5 (1 zéro → 1 position)</p>
            <p>3,45 × 100 = 345 (2 zéros → 2 positions)</p>
            <p>3,45 × 1000 = 3450 (3 zéros → 3 positions)</p>
            </details>
          </div>
          <h3>Multiplier deux décimaux</h3>
          <p>On multiplie comme des entiers, puis on replace la virgule (nombre total de décimales).</p>
          <div class="example-box">
            <details><summary>Exemple : 2,3 × 1,4</summary>
            <p>23 × 14 = 322</p>
            <p>2,3 a 1 décimale, 1,4 a 1 décimale → total 2 décimales</p>
            <p>Résultat : <strong>3,22</strong></p>
            </details>
          </div>
          <div class="practice-box">
            <p><strong>Pratique :</strong></p>
            <p>1) 5,67 × 100 = <input type="text" class="practice-input" data-answer="567" placeholder="567"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
            <p>2) 0,8 × 0,3 = <input type="text" class="practice-input" data-answer="0.24" placeholder="0,24"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
            <p>3) 1,25 × 0,4 = <input type="text" class="practice-input" data-answer="0.5" placeholder="0,5"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
          </div>
        `,
        en: `
          <h3>Multiplying by 10, 100, 1000</h3>
          <p>The decimal point moves to the <strong>right</strong> by as many places as there are zeros.</p>
          <div class="example-box">
            <details><summary>Examples</summary>
            <p>3.45 × 10 = 34.5 (1 zero → 1 place)</p>
            <p>3.45 × 100 = 345 (2 zeros → 2 places)</p>
            <p>3.45 × 1000 = 3450 (3 zeros → 3 places)</p>
            </details>
          </div>
          <h3>Multiplying two decimals</h3>
          <p>Multiply as whole numbers, then place the decimal point (total number of decimal places).</p>
          <div class="example-box">
            <details><summary>Example: 2.3 × 1.4</summary>
            <p>23 × 14 = 322</p>
            <p>2.3 has 1 decimal, 1.4 has 1 decimal → total 2 decimals</p>
            <p>Answer: <strong>3.22</strong></p>
            </details>
          </div>
          <div class="practice-box">
            <p><strong>Practice:</strong></p>
            <p>1) 5.67 × 100 = <input type="text" class="practice-input" data-answer="567" placeholder="567"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
            <p>2) 0.8 × 0.3 = <input type="text" class="practice-input" data-answer="0.24" placeholder="0.24"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
            <p>3) 1.25 × 0.4 = <input type="text" class="practice-input" data-answer="0.5" placeholder="0.5"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
          </div>
        `
      }
    },
    {
      id: 'l5',
      section: '29',
      icon: '🔷',
      title: { fr: 'Transformations géométriques', en: 'Geometric Transformations' },
      desc: { fr: 'Translation, réflexion, frises et dallages.', en: 'Translation, reflection, friezes and tilings.' },
      content: {
        fr: `
          <h3>Translation</h3>
          <p>Déplacement d'une figure sans rotation ni changement de taille. On note le déplacement par une flèche (vecteur).</p>
          <div class="example-box">
            <details><summary>Exemple</summary>
            <p>Un triangle dont chaque point se déplace de 3 cases à droite et 2 cases vers le haut subit une translation de (+3, +2).</p>
            </details>
          </div>
          <h3>Réflexion (symétrie axiale)</h3>
          <p>La figure est retournée par rapport à une droite (axe de symétrie). Chaque point et son image sont à égale distance de l'axe.</p>
          <h3>Frises et dallages</h3>
          <p>Une <strong>frise</strong> est un motif qui se répète par translation le long d'une ligne.</p>
          <p>Un <strong>dallage</strong> (pavage) est un motif qui se répète pour couvrir tout un plan.</p>
          <div class="practice-box">
            <p><strong>Pratique :</strong></p>
            <p>1) Un carré se déplace de 4 cases à gauche et 1 case vers le bas. Quelle est la translation ? <input type="text" class="practice-input" data-answer="(-4,-1)" placeholder="(-4,-1)"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
            <p>2) Vrai ou Faux : une réflexion conserve les distances. <input type="text" class="practice-input" data-answer="vrai" placeholder="vrai"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
          </div>
        `,
        en: `
          <h3>Translation</h3>
          <p>Moving a figure without rotating or resizing it. The movement is described by an arrow (vector).</p>
          <div class="example-box">
            <details><summary>Example</summary>
            <p>A triangle where each point moves 3 squares right and 2 squares up undergoes a translation of (+3, +2).</p>
            </details>
          </div>
          <h3>Reflection (line symmetry)</h3>
          <p>The figure is flipped across a line (axis of symmetry). Each point and its image are equally distant from the axis.</p>
          <h3>Friezes and tilings</h3>
          <p>A <strong>frieze</strong> is a pattern that repeats by translation along a line.</p>
          <p>A <strong>tiling</strong> is a pattern that repeats to cover an entire plane.</p>
          <div class="practice-box">
            <p><strong>Practice:</strong></p>
            <p>1) A square moves 4 squares left and 1 square down. What is the translation? <input type="text" class="practice-input" data-answer="(-4,-1)" placeholder="(-4,-1)"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
            <p>2) True or False: a reflection preserves distances. <input type="text" class="practice-input" data-answer="true" placeholder="true"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
          </div>
        `
      }
    },
    {
      id: 'l6',
      section: '30',
      icon: '🎲',
      title: { fr: 'Probabilité', en: 'Probability' },
      desc: { fr: 'Fraction, décimale, pourcentage et expérimentation.', en: 'Fraction, decimal, percentage and experimentation.' },
      content: {
        fr: `
          <h3>Qu'est-ce qu'une probabilité ?</h3>
          <p>La probabilité mesure la chance qu'un événement se produise. Elle est toujours entre 0 (impossible) et 1 (certain).</p>
          <h3>Les trois notations</h3>
          <ul>
            <li><strong>Fraction</strong> : <sup>favorables</sup>⁄<sub>totaux</sub></li>
            <li><strong>Décimale</strong> : fraction ÷ 1</li>
            <li><strong>Pourcentage</strong> : décimale × 100</li>
          </ul>
          <div class="example-box">
            <details><summary>Exemple : Lancer un dé</summary>
            <p>Probabilité d'obtenir un 3 :</p>
            <p>Fraction : <sup>1</sup>⁄<sub>6</sub></p>
            <p>Décimale : 1 ÷ 6 ≈ 0,167</p>
            <p>Pourcentage : 0,167 × 100 ≈ 16,7 %</p>
            </details>
          </div>
          <h3>Théorique vs expérimental</h3>
          <p>La probabilité <strong>théorique</strong> se calcule par le raisonnement.</p>
          <p>La probabilité <strong>expérimentale</strong> se mesure en réalisant de nombreuses fois l'expérience.</p>
          <p>Plus on répète l'expérience, plus le résultat expérimental se rapproche du théorique.</p>
          <div class="practice-box">
            <p><strong>Pratique :</strong> Une urne contient 3 billes rouges et 7 billes bleues.</p>
            <p>1) P(rouge) en fraction : <input type="text" class="practice-input" data-answer="3/10" placeholder="3/10"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
            <p>2) P(rouge) en décimale : <input type="text" class="practice-input" data-answer="0.3" placeholder="0,3"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
            <p>3) P(rouge) en % : <input type="text" class="practice-input" data-answer="30%" placeholder="30%"><button class="practice-check">Vérifier</button><span class="practice-feedback"></span></p>
          </div>
        `,
        en: `
          <h3>What is probability?</h3>
          <p>Probability measures how likely an event is to happen. It is always between 0 (impossible) and 1 (certain).</p>
          <h3>The three notations</h3>
          <ul>
            <li><strong>Fraction</strong>: <sup>favourable</sup>⁄<sub>total</sub></li>
            <li><strong>Decimal</strong>: fraction ÷ 1</li>
            <li><strong>Percentage</strong>: decimal × 100</li>
          </ul>
          <div class="example-box">
            <details><summary>Example: Roll a die</summary>
            <p>Probability of rolling a 3:</p>
            <p>Fraction: <sup>1</sup>⁄<sub>6</sub></p>
            <p>Decimal: 1 ÷ 6 ≈ 0.167</p>
            <p>Percentage: 0.167 × 100 ≈ 16.7%</p>
            </details>
          </div>
          <h3>Theoretical vs experimental</h3>
          <p><strong>Theoretical</strong> probability is calculated by reasoning.</p>
          <p><strong>Experimental</strong> probability is measured by repeating the experiment many times.</p>
          <p>The more you repeat, the closer experimental gets to theoretical.</p>
          <div class="practice-box">
            <p><strong>Practice:</strong> An urn has 3 red marbles and 7 blue marbles.</p>
            <p>1) P(red) as fraction: <input type="text" class="practice-input" data-answer="3/10" placeholder="3/10"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
            <p>2) P(red) as decimal: <input type="text" class="practice-input" data-answer="0.3" placeholder="0.3"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
            <p>3) P(red) as %: <input type="text" class="practice-input" data-answer="30%" placeholder="30%"><button class="practice-check">Check</button><span class="practice-feedback"></span></p>
          </div>
        `
      }
    }
  ],

  quizzes: [
    {
      id: 'q1',
      section: '26',
      title: { fr: 'Expressions équivalentes', en: 'Equivalent Expressions' },
      questions: [
        { q: { fr: 'Quelle expression est équivalente à 4x + 3x ?', en: 'Which expression is equivalent to 4x + 3x?' }, options: { fr: ['7x','7x²','12x','x⁷'], en: ['7x','7x²','12x','x⁷'] }, correct: 0 },
        { q: { fr: 'Trouve le terme manquant : <span class="missing-box">?</span> + 8 = 17', en: 'Find the missing term: <span class="missing-box">?</span> + 8 = 17' }, options: { fr: ['7','8','9','10'], en: ['7','8','9','10'] }, correct: 2 },
        { q: { fr: 'Trouve le terme manquant : 6 × <span class="missing-box">?</span> = 42', en: 'Find the missing term: 6 × <span class="missing-box">?</span> = 42' }, options: { fr: ['6','7','8','9'], en: ['6','7','8','9'] }, correct: 1 },
        { q: { fr: 'Quelle expression est équivalente à 5 + 2y − 1 ?', en: 'Which expression is equivalent to 5 + 2y − 1?' }, options: { fr: ['2y + 4','6y','4y','2y + 6'], en: ['2y + 4','6y','4y','2y + 6'] }, correct: 0 },
        { q: { fr: 'Trouve le terme manquant : <span class="missing-box">?</span> − 15 = 23', en: 'Find the missing term: <span class="missing-box">?</span> − 15 = 23' }, type: 'fill', correct: '38' },
        { q: { fr: 'Trouve le terme manquant : 72 ÷ <span class="missing-box">?</span> = 9', en: 'Find the missing term: 72 ÷ <span class="missing-box">?</span> = 9' }, type: 'fill', correct: '8' },
        { q: { fr: 'Vrai ou faux : 3a + 2 et 2 + 3a sont équivalentes.', en: 'True or false: 3a + 2 and 2 + 3a are equivalent.' }, options: { fr: ['Vrai','Faux'], en: ['True','False'] }, correct: 0 },
        { q: { fr: 'Quelle expression est équivalente à 3(x + 2) ?', en: 'Which expression is equivalent to 3(x + 2)?' }, options: { fr: ['3x + 2','3x + 6','x + 6','3x + 5'], en: ['3x + 2','3x + 6','x + 6','3x + 5'] }, correct: 1 }
      ]
    },
    {
      id: 'q2',
      section: '26',
      title: { fr: 'Facteurs premiers', en: 'Prime Factorization' },
      questions: [
        { q: { fr: 'Quel est le plus petit nombre premier ?', en: 'What is the smallest prime number?' }, options: { fr: ['0','1','2','3'], en: ['0','1','2','3'] }, correct: 2 },
        { q: { fr: 'Le nombre 15 est-il premier ?', en: 'Is 15 a prime number?' }, options: { fr: ['Oui','Non'], en: ['Yes','No'] }, correct: 1 },
        { q: { fr: 'Décompose 24 en facteurs premiers.', en: 'Decompose 24 into prime factors.' }, options: { fr: ['2×2×2×3','2×3×4','2×12','3×8'], en: ['2×2×2×3','2×3×4','2×12','3×8'] }, correct: 0 },
        { q: { fr: 'Décompose 50 en facteurs premiers.', en: 'Decompose 50 into prime factors.' }, type: 'fill', correct: '2x5x5' },
        { q: { fr: 'Quelle est la décomposition de 81 ?', en: 'What is the prime factorization of 81?' }, options: { fr: ['3×3×3×3','9×9','3×27','3×3×9'], en: ['3×3×3×3','9×9','3×27','3×3×9'] }, correct: 0 },
        { q: { fr: 'Le nombre 29 est-il premier ?', en: 'Is 29 a prime number?' }, options: { fr: ['Oui','Non'], en: ['Yes','No'] }, correct: 0 },
        { q: { fr: 'Combien y a-t-il de nombres premiers entre 1 et 10 ?', en: 'How many prime numbers are there between 1 and 10?' }, options: { fr: ['3','4','5','6'], en: ['3','4','5','6'] }, correct: 1 },
        { q: { fr: 'Décompose 72 en facteurs premiers.', en: 'Decompose 72 into prime factors.' }, type: 'fill', correct: '2x2x2x3x3' }
      ]
    },
    {
      id: 'q3',
      section: '27',
      title: { fr: 'Multiplier par une fraction', en: 'Multiplying by a Fraction' },
      questions: [
        { q: { fr: 'Calcule 2 × ¾.', en: 'Calculate 2 × ¾.' }, options: { fr: ['6/4','8/3','3/2','5/4'], en: ['6/4','8/3','3/2','5/4'] }, correct: 0 },
        { q: { fr: 'Calcule 5 × ⅖.', en: 'Calculate 5 × ⅖.' }, options: { fr: ['10/5 = 2','25/2','7/5','10/25'], en: ['10/5 = 2','25/2','7/5','10/25'] }, correct: 0 },
        { q: { fr: 'Calcule 3 × ⅓.', en: 'Calculate 3 × ⅓.' }, type: 'fill', correct: '1' },
        { q: { fr: 'Quel est le résultat de 4 × ⅚ ?', en: 'What is the result of 4 × ⅚?' }, options: { fr: ['20/6','24/5','9/6','4/30'], en: ['20/6','24/5','9/6','4/30'] }, correct: 0 },
        { q: { fr: 'Calcule 7 × ½.', en: 'Calculate 7 × ½.' }, type: 'fill', correct: '7/2' },
        { q: { fr: 'Un gâteau partagé en 8 parts. Tu en manges 3/8 de 2 gâteaux. Combien de parts ?', en: 'A cake cut into 8 slices. You eat 3/8 of 2 cakes. How many slices?' }, options: { fr: ['6','3','8','16'], en: ['6','3','8','16'] }, correct: 0 }
      ]
    },
    {
      id: 'q4',
      section: '28',
      title: { fr: 'Nombres décimaux', en: 'Decimal Numbers' },
      questions: [
        { q: { fr: 'Calcule 4,56 × 10.', en: 'Calculate 4.56 × 10.' }, options: { fr: ['45,6','0,456','456','45,06'], en: ['45.6','0.456','456','45.06'] }, correct: 0 },
        { q: { fr: 'Calcule 0,73 × 1000.', en: 'Calculate 0.73 × 1000.' }, options: { fr: ['730','73','7,3','0,073'], en: ['730','73','7.3','0.073'] }, correct: 0 },
        { q: { fr: 'Calcule 2,5 × 0,4.', en: 'Calculate 2.5 × 0.4.' }, type: 'fill', correct: '1' },
        { q: { fr: 'Calcule 1,2 × 0,3.', en: 'Calculate 1.2 × 0.3.' }, options: { fr: ['0,36','3,6','36','0,036'], en: ['0.36','3.6','36','0.036'] }, correct: 0 },
        { q: { fr: 'Calcule 0,6 × 0,7.', en: 'Calculate 0.6 × 0.7.' }, type: 'fill', correct: '0.42' },
        { q: { fr: 'Calcule 5,5 × 100.', en: 'Calculate 5.5 × 100.' }, type: 'fill', correct: '550' },
        { q: { fr: 'Combien de décimales dans 0,25 × 0,4 ?', en: 'How many decimal places in 0.25 × 0.4?' }, options: { fr: ['2','3','1','4'], en: ['2','3','1','4'] }, correct: 1 }
      ]
    },
    {
      id: 'q5',
      section: '29',
      title: { fr: 'Transformations géométriques', en: 'Geometric Transformations' },
      questions: [
        { q: { fr: 'Une translation conserve-t-elle les longueurs ?', en: 'Does a translation preserve lengths?' }, options: { fr: ['Oui','Non'], en: ['Yes','No'] }, correct: 0 },
        { q: { fr: 'Quel type de transformation retourne une figure par rapport à une droite ?', en: 'What transformation flips a figure across a line?' }, options: { fr: ['Réflexion','Translation','Rotation','Homothétie'], en: ['Reflection','Translation','Rotation','Dilation'] }, correct: 0 },
        { q: { fr: 'Un point se déplace de (−3, +2). Il part de (5; 4). Où arrive-t-il ?', en: 'A point moves by (−3, +2). It starts at (5, 4). Where does it end?' }, options: { fr: ['(2; 6)','(8; 2)','(2; 2)','(8; 6)'], en: ['(2, 6)','(8, 2)','(2, 2)','(8, 6)'] }, correct: 0 },
        { q: { fr: 'Une frise se répète par...', en: 'A frieze repeats by...' }, options: { fr: ['Translation','Réflexion','Rotation','Agrandissement'], en: ['Translation','Reflection','Rotation','Enlargement'] }, correct: 0 },
        { q: { fr: 'Vrai ou faux : un dallage couvre tout un plan.', en: 'True or false: a tiling covers an entire plane.' }, options: { fr: ['Vrai','Faux'], en: ['True','False'] }, correct: 0 }
      ]
    },
    {
      id: 'q6',
      section: '30',
      title: { fr: 'Probabilité', en: 'Probability' },
      questions: [
        { q: { fr: 'On lance une pièce. Quelle est P(pile) ?', en: 'Flip a coin. What is P(heads)?' }, options: { fr: ['½','⅓','¼','1'], en: ['½','⅓','¼','1'] }, correct: 0 },
        { q: { fr: 'Une urne a 2 rouges et 3 verts. P(rouge) = ?', en: 'An urn has 2 red and 3 green. P(red) = ?' }, options: { fr: ['2/5','⅖','0,4','Toutes ces réponses'], en: ['2/5','⅖','0.4','All of these'] }, correct: 3 },
        { q: { fr: 'P = 0,25. En pourcentage, c\'est...', en: 'P = 0.25. As a percentage, this is...' }, options: { fr: ['25 %','2,5 %','0,25 %','250 %'], en: ['25%','2.5%','0.25%','250%'] }, correct: 0 },
        { q: { fr: 'P = ¾. En décimale, c\'est...', en: 'P = ¾. As a decimal, this is...' }, type: 'fill', correct: '0.75' },
        { q: { fr: 'Un dé à 6 faces. P(nombre > 4) = ?', en: 'A 6-sided die. P(number > 4) = ?' }, options: { fr: ['2/6 = 1/3','⅔','¼','⅙'], en: ['2/6 = 1/3','⅔','¼','⅙'] }, correct: 0 },
        { q: { fr: 'Vrai ou faux : une probabilité peut être de 1,2.', en: 'True or false: a probability can be 1.2.' }, options: { fr: ['Vrai','Faux'], en: ['True','False'] }, correct: 1 }
      ]
    },
    {
      id: 'q7',
      section: 'REV',
      title: { fr: 'Révision complète', en: 'Full Review' },
      questions: [
        { q: { fr: 'Trouve le terme manquant : <span class="missing-box">?</span> × 9 = 81', en: 'Find the missing term: <span class="missing-box">?</span> × 9 = 81' }, options: { fr: ['8','9','10','7'], en: ['8','9','10','7'] }, correct: 1 },
        { q: { fr: 'Décompose 120 en facteurs premiers.', en: 'Decompose 120 into prime factors.' }, options: { fr: ['2×2×2×3×5','2×3×4×5','2×60','3×4×10'], en: ['2×2×2×3×5','2×3×4×5','2×60','3×4×10'] }, correct: 0 },
        { q: { fr: 'Calcule 6 × ⅔.', en: 'Calculate 6 × ⅔.' }, options: { fr: ['12/3 = 4','18/2','8/3','3'], en: ['12/3 = 4','18/2','8/3','3'] }, correct: 0 },
        { q: { fr: 'Calcule 3,7 × 100.', en: 'Calculate 3.7 × 100.' }, type: 'fill', correct: '370' },
        { q: { fr: 'Calcule 0,5 × 0,6.', en: 'Calculate 0.5 × 0.6.' }, type: 'fill', correct: '0.3' },
        { q: { fr: 'Une translation de (+4, −2) part de (1; 3). Image ?', en: 'A translation of (+4, −2) from (1, 3). Image?' }, options: { fr: ['(5; 1)','(−3; 5)','(5; 5)','(1; 1)'], en: ['(5, 1)','(−3, 5)','(5, 5)','(1, 1)'] }, correct: 0 },
        { q: { fr: 'Vrai ou faux : une réflexion conserve les angles.', en: 'True or false: a reflection preserves angles.' }, options: { fr: ['Vrai','Faux'], en: ['True','False'] }, correct: 0 },
        { q: { fr: 'P = ⅖. En décimale :', en: 'P = ⅖. As a decimal:' }, options: { fr: ['0,4','0,25','0,5','0,2'], en: ['0.4','0.25','0.5','0.2'] }, correct: 0 },
        { q: { fr: 'On tire une carte parmi 52. P(as de cœur) = ?', en: 'Draw a card from 52. P(ace of hearts) = ?' }, options: { fr: ['1/52','¼','1/13','⅙'], en: ['1/52','¼','1/13','⅙'] }, correct: 0 },
        { q: { fr: 'Calcule 0,25 × 0,4.', en: 'Calculate 0.25 × 0.4.' }, type: 'fill', correct: '0.1' }
      ]
    }
  ],

  games: [
    { id: 'g1', key: 'expressionMatch', icon: '🃏', title: { fr: 'Expression Match', en: 'Expression Match' }, topic: { fr: 'Expressions équivalentes', en: 'Equivalent expressions' } },
    { id: 'g2', key: 'factorTree', icon: '🌳', title: { fr: 'Arbre de facteurs', en: 'Factor Tree' }, topic: { fr: 'Facteurs premiers', en: 'Prime factors' } },
    { id: 'g3', key: 'missingNumber', icon: '🔍', title: { fr: 'Détective du nombre', en: 'Missing Number Detective' }, topic: { fr: 'Terme manquant', en: 'Missing terms' } },
    { id: 'g4', key: 'fractionPainter', icon: '🖌️', title: { fr: 'Peintre de fractions', en: 'Fraction Painter' }, topic: { fr: 'Fractions', en: 'Fractions' } },
    { id: 'g5', key: 'decimalDash', icon: '⚡', title: { fr: 'Course aux décimales', en: 'Decimal Dash' }, topic: { fr: '×10, ×100, ×1000', en: '×10, ×100, ×1000' } },
    { id: 'g6', key: 'decimalMultiply', icon: '✖️', title: { fr: 'Multiplication décimale', en: 'Decimal Multiply' }, topic: { fr: 'Décimaux', en: 'Decimals' } },
    { id: 'g7', key: 'translationStudio', icon: '🔷', title: { fr: 'Studio de translation', en: 'Translation Studio' }, topic: { fr: 'Translations', en: 'Translations' } },
    { id: 'g8', key: 'patternBuilder', icon: '🧩', title: { fr: 'Constructeur de motifs', en: 'Pattern Builder' }, topic: { fr: 'Frises & dallages', en: 'Friezes & tilings' } }
  ],

  formulas: [
    {
      title: { fr: 'Terme manquant', en: 'Missing term' },
      formula: '<span class="missing-box">?</span> + a = b → <span class="missing-box">?</span> = b − a',
      example: { fr: '<span class="missing-box">?</span> + 7 = 15 → <span class="missing-box">?</span> = 8', en: '<span class="missing-box">?</span> + 7 = 15 → <span class="missing-box">?</span> = 8' }
    },
    {
      title: { fr: 'Terme manquant (multiplication)', en: 'Missing term (multiplication)' },
      formula: '<span class="missing-box">?</span> × a = b → <span class="missing-box">?</span> = b ÷ a',
      example: { fr: '<span class="missing-box">?</span> × 4 = 28 → <span class="missing-box">?</span> = 7', en: '<span class="missing-box">?</span> × 4 = 28 → <span class="missing-box">?</span> = 7' }
    },
    {
      title: { fr: 'Nombre × fraction', en: 'Number × fraction' },
      formula: 'a × b/c = (a×b)/c',
      example: { fr: '3 × ½ = 3/2', en: '3 × ½ = 3/2' }
    },
    {
      title: { fr: '× 10, 100, 1000', en: '× 10, 100, 1000' },
      formula: '×10ⁿ → virgule décalée de n vers la droite',
      example: { fr: '3,45 × 100 = 345', en: '3.45 × 100 = 345' }
    },
    {
      title: { fr: 'Multiplication de décimaux', en: 'Decimal multiplication' },
      formula: 'compter les décimales au total',
      example: { fr: '2,3 × 1,4 = 3,22', en: '2.3 × 1.4 = 3.22' }
    },
    {
      title: { fr: 'Translation', en: 'Translation' },
      formula: '(x, y) → (x+a, y+b)',
      example: { fr: '(3; 4) avec (+2, −1) → (5; 3)', en: '(3, 4) with (+2, −1) → (5, 3)' }
    },
    {
      title: { fr: 'Probabilité', en: 'Probability' },
      formula: 'P = favorables / totaux',
      example: { fr: 'P(3 sur un dé) = 1/6 ≈ 0,167 ≈ 16,7 %', en: 'P(3 on a die) = 1/6 ≈ 0.167 ≈ 16.7%' }
    },
    {
      title: { fr: 'Conversion probabilité', en: 'Probability conversion' },
      formula: 'fraction → ÷1 → décimale → ×100 → %',
      example: { fr: '¾ = 0,75 = 75 %', en: '¾ = 0.75 = 75%' }
    }
  ],

  achievements: [
    { id: 'a1', icon: '🔍', name: { fr: 'Détective des nombres', en: 'Number Detective' }, desc: { fr: 'Complète la leçon sur les termes manquants', en: 'Complete the missing terms lesson' } },
    { id: 'a2', icon: '🌳', name: { fr: 'Expert en facteurs', en: 'Factor Expert' }, desc: { fr: 'Complète la leçon sur la décomposition', en: 'Complete the factorization lesson' } },
    { id: 'a3', icon: '🎨', name: { fr: 'Maître des fractions', en: 'Fraction Master' }, desc: { fr: 'Complète la leçon sur les fractions', en: 'Complete the fractions lesson' } },
    { id: 'a4', icon: '🔢', name: { fr: 'Magicien des décimaux', en: 'Decimal Wizard' }, desc: { fr: 'Complète la leçon sur les décimaux', en: 'Complete the decimals lesson' } },
    { id: 'a5', icon: '🔷', name: { fr: 'Géomètre en herbe', en: 'Junior Geometer' }, desc: { fr: 'Complète la leçon sur les transformations', en: 'Complete the transformations lesson' } },
    { id: 'a6', icon: '🎲', name: { fr: 'Probabilité Pro', en: 'Probability Pro' }, desc: { fr: 'Complète la leçon sur la probabilité', en: 'Complete the probability lesson' } },
    { id: 'a7', icon: '🎯', name: { fr: 'As du quiz', en: 'Quiz Ace' }, desc: { fr: 'Gagne un quiz avec 3 vies restantes', en: 'Win a quiz with 3 lives remaining' } },
    { id: 'a8', icon: '🏆', name: { fr: 'Champion(ne)', en: 'Champion' }, desc: { fr: 'Atteint 500 XP', en: 'Reach 500 XP' } }
  ],

  i18n: {
    fr: {
      'app.title': 'Arts et Math',
      'home.title': 'Arts<br><span class="hero-accent">et Math</span>',
      'home.subtitle': 'Explore, pratique et maîtrise les maths !',
      'home.lessons': 'Leçons',
      'home.lessons.desc': 'Explore les 6 sections',
      'home.quiz': 'Quiz',
      'home.quiz.desc': 'Teste tes connaissances',
      'home.games': 'Mini-Jeux',
      'home.games.desc': 'Joue et apprends !',
      'home.formulas': 'Formules',
      'home.formulas.desc': 'Aide-mémoire rapide',
      'home.progress': 'Progrès',
      'home.progress.desc': 'Tes accomplissements',
      'mascot.welcome': 'Salut ! Clique sur une section pour commencer ! 🚀',
      'mascot.lessons': 'Les leçons t\'attendent ! 📚',
      'mascot.quiz': 'Prêt(e) pour un défi ? 🎯',
      'mascot.games': 'Amuse-toi bien ! 🎮',
      'lessons.title': '📚 Leçons',
      'lesson.complete': '✅ Leçon terminée !',
      'quiz.title': '🎯 Quiz',
      'quiz.next': 'Suivant →',
      'quiz.submit': 'Valider',
      'quiz.lives': 'Vies',
      'games.title': '🎮 Mini-Jeux',
      'formulas.title': '📐 Formules',
      'progress.title': '🏆 Progrès',
      'results.home': '🏠 Accueil',
      'results.retry': '🔄 Réessayer',
      'toast.lessonComplete': 'Leçon terminée ! +50 XP',
      'toast.quizComplete': 'Quiz terminé ! +{score} XP',
      'toast.gameComplete': 'Jeu terminé ! +{score} XP',
      'toast.achievement': 'Badge débloqué : {name} !',
      'practice.correct': 'Correct ! 🎉',
      'practice.wrong': 'Essaie encore...'
    },
    en: {
      'app.title': 'Arts & Math',
      'home.title': 'Arts<br><span class="hero-accent">& Math</span>',
      'home.subtitle': 'Explore, practice and master math!',
      'home.lessons': 'Lessons',
      'home.lessons.desc': 'Explore 6 sections',
      'home.quiz': 'Quiz',
      'home.quiz.desc': 'Test your knowledge',
      'home.games': 'Mini-Games',
      'home.games.desc': 'Play and learn!',
      'home.formulas': 'Formulas',
      'home.formulas.desc': 'Quick cheat sheet',
      'home.progress': 'Progress',
      'home.progress.desc': 'Your achievements',
      'mascot.welcome': 'Hi there! Click a section to start! 🚀',
      'mascot.lessons': 'Lessons are waiting! 📚',
      'mascot.quiz': 'Ready for a challenge? 🎯',
      'mascot.games': 'Have fun! 🎮',
      'lessons.title': '📚 Lessons',
      'lesson.complete': '✅ Lesson complete!',
      'quiz.title': '🎯 Quiz',
      'quiz.next': 'Next →',
      'quiz.submit': 'Submit',
      'quiz.lives': 'Lives',
      'games.title': '🎮 Mini-Games',
      'formulas.title': '📐 Formulas',
      'progress.title': '🏆 Progress',
      'results.home': '🏠 Home',
      'results.retry': '🔄 Retry',
      'toast.lessonComplete': 'Lesson complete! +50 XP',
      'toast.quizComplete': 'Quiz complete! +{score} XP',
      'toast.gameComplete': 'Game complete! +{score} XP',
      'toast.achievement': 'Achievement unlocked: {name}!',
      'practice.correct': 'Correct! 🎉',
      'practice.wrong': 'Try again...'
    }
  }
};
