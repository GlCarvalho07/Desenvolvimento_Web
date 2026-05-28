/* ═══════════════════════════════════════════════
   BASQUETE — NBA GL
   main.js
   Autor: Guilherme Carvalho
════════════════════════════════════════════════ */
 
// ── VLibras + Header scroll ──────────────────────────
try { new window.VLibras.Widget('https://vlibras.gov.br/app'); } catch(e) {}
 
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}
 
// ── Scroll Reveal ────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));
 
// ── Alto Contraste ───────────────────────────────────
function toggleContrast() {
  document.body.classList.toggle('high-contrast');
  const btn = document.getElementById('btn-contrast');
  if (btn) {
    btn.textContent = document.body.classList.contains('high-contrast')
      ? '⚪ Desativar'
      : '👁 Contraste';
  }
}
 
// ════════════════════════════════════════════════════
//  LINHA DO TEMPO (só executa se o elemento existir)
// ════════════════════════════════════════════════════
const track = document.querySelector('.timeline-track');
if (track) {
  const events = [
    { year: 1891, title: 'Invenção',     desc: 'James Naismith cria o basquete em Springfield, MA.' },
    { year: 1936, title: 'Olimpíadas',   desc: 'O basquete estreia nos Jogos Olímpicos de Berlim.' },
    { year: 1946, title: 'NBA Nasce',    desc: 'Fundação da Basketball Association of America, que vira NBA.' },
    { year: 1962, title: 'Wilt 100 pts', desc: 'Wilt Chamberlain marca 100 pontos em uma única partida.' },
    { year: 1979, title: 'Linha de 3',   desc: 'A NBA adota oficialmente a linha de 3 pontos.' },
    { year: 1984, title: 'Era Jordan',   desc: 'Michael Jordan é draftado pelo Chicago Bulls.' },
    { year: 1992, title: 'Dream Team',   desc: 'EUA manda estrelas da NBA para as Olimpíadas de Barcelona.' },
    { year: 2003, title: 'LeBron Chega', desc: 'LeBron James entra para a NBA direto do colégio.' },
    { year: 2016, title: 'Remontada',    desc: 'Cleveland desfaz 3-1 e quebra jejum de 52 anos do título.' },
    { year: 2023, title: 'Recorde',      desc: 'LeBron ultrapassa Kareem como maior pontuador da história.' },
  ];
 
  events.forEach((ev) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.setAttribute('role', 'listitem');
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <p class="timeline-year">${ev.year}</p>
      <p class="timeline-event-title">${ev.title}</p>
      <p class="timeline-event-desc">${ev.desc}</p>
    `;
    item.addEventListener('click', () => {
      document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
      item.classList.toggle('active');
    });
    track.appendChild(item);
  });
}
 
// ════════════════════════════════════════════════════
//  SIMULADOR DE PONTUAÇÃO
// ════════════════════════════════════════════════════
let scores   = { A: 0, B: 0 };
let simHistory = { A: [], B: [] };
let quarter  = 1;
const quarters = ['1º QUARTO', '2º QUARTO', '3º QUARTO', '4º QUARTO', 'PRORROGAÇÃO'];
 
function addPoints(team, pts) {
  scores[team] += pts;
  simHistory[team].push(pts);
  const el = document.getElementById('score' + team);
  if (!el) return;
  el.textContent = scores[team];
  el.classList.add('pop');
  setTimeout(() => el.classList.remove('pop'), 200);
  updateHistory();
}
 
function undo(team) {
  if (!simHistory[team].length) return;
  const last = simHistory[team].pop();
  scores[team] = Math.max(0, scores[team] - last);
  const el = document.getElementById('score' + team);
  if (el) el.textContent = scores[team];
  updateHistory();
}
 
function updateHistory() {
  const list = document.getElementById('historyList');
  if (!list) return;
 
  const nameA = (document.getElementById('nameA') || {}).textContent || 'TIME A';
  const nameB = (document.getElementById('nameB') || {}).textContent || 'TIME B';
 
  const allMoves = [
    ...simHistory.A.map((p, i) => ({ team: nameA, pts: p, idx: i * 2     })),
    ...simHistory.B.map((p, i) => ({ team: nameB, pts: p, idx: i * 2 + 1 }))
  ].sort((a, b) => a.idx - b.idx);
 
  if (!allMoves.length) {
    list.innerHTML = '<p style="font-size:14px;color:var(--gray)">Nenhum ponto marcado ainda.</p>';
    return;
  }
 
  let running = {};
  running[nameA] = 0;
  running[nameB] = 0;
 
  list.innerHTML = allMoves.map(m => {
    running[m.team] += m.pts;
    return `<div class="sim-history-item">
      <span class="sim-history-team">${m.team}</span>
      <span class="sim-history-pts">+${m.pts}</span>
      <span class="sim-history-total">${running[m.team]}</span>
    </div>`;
  }).reverse().join('');
}
 
function nextQuarter() {
  if (quarter < quarters.length) quarter++;
  const display = document.getElementById('quarterDisplay');
  if (display) display.textContent = quarters[quarter - 1] || 'PRORROGAÇÃO';
}
 
function resetGame() {
  scores     = { A: 0, B: 0 };
  simHistory = { A: [], B: [] };
  quarter    = 1;
  const sA = document.getElementById('scoreA');
  const sB = document.getElementById('scoreB');
  const qD = document.getElementById('quarterDisplay');
  if (sA) sA.textContent = '0';
  if (sB) sB.textContent = '0';
  if (qD) qD.textContent = '1º QUARTO';
  updateHistory();
}
 
// ════════════════════════════════════════════════════
//  QUIZ (só executa se o elemento existir)
//  O HTML usa React para o quiz — este bloco é fallback
// ════════════════════════════════════════════════════
const quizContainer = document.getElementById('quizContainer');
if (quizContainer) {
  const questions = [
    {
      q: 'Quantos títulos Michael Jordan conquistou pela NBA?',
      options: ['4', '5', '6', '8'], answer: 2,
      feedback: 'Jordan ganhou 6 títulos com o Chicago Bulls: 1991, 1992, 1993, 1996, 1997 e 1998.'
    },
    {
      q: 'Quem inventou o basquete?',
      options: ['Larry Bird', 'James Naismith', 'Bill Russell', 'John Wooden'], answer: 1,
      feedback: 'James Naismith, professor canadense, criou o basquete em dezembro de 1891.'
    },
    {
      q: 'Qual o recorde de pontos em uma única partida da NBA?',
      options: ['81 pontos', '92 pontos', '100 pontos', '73 pontos'], answer: 2,
      feedback: 'Wilt Chamberlain marcou 100 pontos em 2 de março de 1962, pelo Philadelphia Warriors.'
    },
    {
      q: 'Quantos jogadores de cada time estão em quadra ao mesmo tempo?',
      options: ['4', '5', '6', '7'], answer: 1,
      feedback: 'Cada equipe tem 5 jogadores em quadra simultaneamente.'
    },
    {
      q: 'Qual o apelido de Kobe Bryant?',
      options: ['The Flash', 'Black Mamba', 'The King', 'Air'], answer: 1,
      feedback: 'Kobe se apelidou de "Black Mamba" como alter ego — uma cobra rápida e letal.'
    },
    {
      q: 'Em que ano a linha de 3 pontos foi introduzida na NBA?',
      options: ['1973', '1976', '1979', '1984'], answer: 2,
      feedback: 'A NBA adotou a linha de 3 pontos na temporada 1979-80.'
    },
    {
      q: 'Quantos segundos o time tem para arremessar na NBA?',
      options: ['14 segundos', '20 segundos', '24 segundos', '30 segundos'], answer: 2,
      feedback: 'O shot clock da NBA é de 24 segundos. A FIBA também usa 24 segundos.'
    }
  ];
 
  let currentQ = 0, quizScore = 0, quizAnswered = false;
 
  function renderQuestion() {
    const q = questions[currentQ];
    const numEl  = document.getElementById('quizNum');
    const questEl= document.getElementById('quizQuestion');
    const progEl = document.getElementById('quizProgress');
    const scoreEl= document.getElementById('quizScoreText');
 
    if (numEl)   numEl.textContent   = `Pergunta ${currentQ + 1} de ${questions.length}`;
    if (questEl) questEl.textContent = q.q;
    if (progEl)  progEl.style.width  = `${(currentQ / questions.length) * 100}%`;
    if (scoreEl) scoreEl.textContent = `Pontuação: ${quizScore}`;
 
    const letters = ['A', 'B', 'C', 'D'];
    const optsEl  = document.getElementById('quizOptions');
    if (optsEl) {
      optsEl.innerHTML = q.options.map((opt, i) =>
        `<button class="quiz-option" onclick="selectAnswer(${i})">
          <span class="quiz-option-letter">${letters[i]}</span>
          <span>${opt}</span>
        </button>`
      ).join('');
    }
 
    const fb = document.getElementById('quizFeedback');
    if (fb) { fb.className = 'quiz-feedback'; fb.textContent = ''; }
    const nextBtn = document.getElementById('quizNext');
    if (nextBtn) nextBtn.className = 'quiz-next';
    quizAnswered = false;
  }
 
  window.selectAnswer = function(idx) {
    if (quizAnswered) return;
    quizAnswered = true;
    const q    = questions[currentQ];
    const opts = document.querySelectorAll('.quiz-option');
    opts.forEach(o => o.classList.add('answered'));
 
    const fb = document.getElementById('quizFeedback');
    if (idx === q.answer) {
      opts[idx].classList.add('correct');
      quizScore++;
      if (fb) { fb.className = 'quiz-feedback correct-fb show'; fb.innerHTML = `✅ <strong>Correto!</strong> ${q.feedback}`; }
    } else {
      opts[idx].classList.add('wrong');
      opts[q.answer].classList.add('revealed');
      if (fb) { fb.className = 'quiz-feedback wrong-fb show'; fb.innerHTML = `❌ <strong>Errou!</strong> ${q.feedback}`; }
    }
    const scoreEl = document.getElementById('quizScoreText');
    if (scoreEl) scoreEl.textContent = `Pontuação: ${quizScore}`;
    const nextBtn = document.getElementById('quizNext');
    if (nextBtn) nextBtn.className = 'quiz-next show';
  };
 
  window.nextQuestion = function() {
    currentQ++;
    if (currentQ >= questions.length) showResult();
    else renderQuestion();
  };
 
  function showResult() {
    quizContainer.style.display = 'none';
    const result = document.getElementById('quizResult');
    if (!result) return;
    result.className = 'quiz-result show';
    const progEl = document.getElementById('quizProgress');
    if (progEl) progEl.style.width = '100%';
 
    const pct = quizScore / questions.length;
    let emoji, title, sub;
    if      (pct === 1)  { emoji = '🏆'; title = 'PERFEITO!'; sub = 'Você é uma lenda da NBA!'; }
    else if (pct >= 0.7) { emoji = '🔥'; title = 'ÓTIMO!';    sub = 'Você conhece bem o basquete.'; }
    else if (pct >= 0.4) { emoji = '👍'; title = 'BOM!';      sub = 'Continue estudando as regras e a história.'; }
    else                 { emoji = '📚'; title = 'PRATIQUE!'; sub = 'Explore o site e aprenda mais sobre a NBA.'; }
 
    const eEl = document.getElementById('resultEmoji');
    const tEl = document.getElementById('resultTitle');
    const sEl = document.getElementById('resultSub');
    const scEl= document.getElementById('resultScore');
    if (eEl) eEl.textContent = emoji;
    if (tEl) tEl.textContent = title;
    if (sEl) sEl.textContent = sub;
    if (scEl) scEl.textContent = `${quizScore} / ${questions.length}`;
  }
 
  window.restartQuiz = function() {
    currentQ = 0; quizScore = 0; quizAnswered = false;
    quizContainer.style.display = 'block';
    const result = document.getElementById('quizResult');
    if (result) result.className = 'quiz-result';
    renderQuestion();
  };
 
  renderQuestion();
}
 
// ════════════════════════════════════════════════════
//  COMPARADOR DE JOGADORES (só executa se o elemento existir)
//  O HTML usa React para o comparador — este bloco é fallback
// ════════════════════════════════════════════════════
const comparadorStats = document.getElementById('comparadorStats');
if (comparadorStats) {
  const playerData = {
    jordan: { name: 'Michael Jordan',   pts: 30.1, reb: 6.2,  ast: 5.3,  titles: 6, mvps: 5, pct: 49.7 },
    lebron: { name: 'LeBron James',     pts: 27.1, reb: 7.5,  ast: 7.4,  titles: 4, mvps: 4, pct: 50.6 },
    kobe:   { name: 'Kobe Bryant',      pts: 25.0, reb: 5.2,  ast: 4.7,  titles: 5, mvps: 1, pct: 44.7 },
    magic:  { name: 'Magic Johnson',    pts: 19.5, reb: 7.2,  ast: 11.2, titles: 5, mvps: 3, pct: 52.0 },
    bird:   { name: 'Larry Bird',       pts: 24.3, reb: 10.0, ast: 6.3,  titles: 3, mvps: 3, pct: 49.6 },
    shaq:   { name: "Shaquille O'Neal", pts: 23.7, reb: 10.9, ast: 2.5,  titles: 4, mvps: 1, pct: 58.2 },
  };
 
  const statDefs = [
    { key: 'pts',    label: 'Pontos / Jogo',      max: 35 },
    { key: 'reb',    label: 'Rebotes / Jogo',      max: 14 },
    { key: 'ast',    label: 'Assistências / Jogo', max: 12 },
    { key: 'titles', label: 'Títulos NBA',          max: 7  },
    { key: 'mvps',   label: 'MVPs',                 max: 6  },
    { key: 'pct',    label: '% Arremessos',         max: 65 },
  ];
 
  window.updateComparison = function() {
    const selA = document.getElementById('playerA');
    const selB = document.getElementById('playerB');
    if (!selA || !selB) return;
    const a = playerData[selA.value];
    const b = playerData[selB.value];
 
    comparadorStats.innerHTML = statDefs.map(s => {
      const aWin = a[s.key] > b[s.key];
      const bWin = b[s.key] > a[s.key];
      const aW   = (a[s.key] / s.max) * 50;
      const bW   = (b[s.key] / s.max) * 50;
      return `<div class="stat-row">
        <div class="stat-val-a ${aWin ? 'winner' : ''}">${a[s.key]}</div>
        <div class="stat-bar-wrap">
          <span class="stat-bar-label">${s.label}</span>
          <div class="stat-bar">
            <div class="stat-bar-fill-a" style="width:${aW}%"></div>
            <div class="stat-bar-fill-b" style="width:${bW}%"></div>
          </div>
        </div>
        <div class="stat-val-b ${bWin ? 'winner' : ''}">${b[s.key]}</div>
      </div>`;
    }).join('');
  };
 
  updateComparison();
}
 
