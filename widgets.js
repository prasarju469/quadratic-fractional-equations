/* Interactive widgets used inside lessons. Each takes a host element and fills it. */
const widgets = {};

const svgNS = 'http://www.w3.org/2000/svg';

/* ---- Day 1: the missing corner ---- */
widgets.square = function (host) {
  host.innerHTML = `
    <div class="widget">
      <h4>Build the square</h4>
      <p class="muted">The big blue square has sides of length <i>x</i> (we don't know how long). We glue two strips onto it, one on the right and one at the bottom. Together the strips make the <i>bx</i> part.</p>
      <div class="controls">
        <label>b = <input type="range" id="sq-b" min="2" max="12" step="2" value="6"> <b id="sq-bv">6</b></label>
        <label class="check"><input type="checkbox" id="sq-add"> add the missing corner</label>
      </div>
      <svg id="sq-svg" viewBox="0 0 330 330" role="img" aria-label="Square with two strips and a missing corner"></svg>
      <p id="sq-txt" class="eqline"></p>
    </div>`;
  const b = host.querySelector('#sq-b'), bv = host.querySelector('#sq-bv'), add = host.querySelector('#sq-add');
  const svg = host.querySelector('#sq-svg'), txt = host.querySelector('#sq-txt');
  function draw() {
    const B = +b.value, half = B / 2, u = 14, X = 12 * u, sw = half * u, o = 24;
    bv.textContent = B;
    const corner = add.checked;
    svg.innerHTML = `
      <rect x="${o}" y="${o}" width="${X}" height="${X}" fill="#bfd7ff" stroke="#2f5fb3"/>
      <text x="${o + X / 2}" y="${o + X / 2 + 6}" text-anchor="middle" class="svt">x²</text>
      <rect x="${o + X}" y="${o}" width="${sw}" height="${X}" fill="#ffd9b3" stroke="#c8641a"/>
      <rect x="${o}" y="${o + X}" width="${X}" height="${sw}" fill="#ffd9b3" stroke="#c8641a"/>
      <text x="${o + X + sw / 2}" y="${o + X / 2}" text-anchor="middle" class="svs">${half}x</text>
      <text x="${o + X / 2}" y="${o + X + sw / 2 + 4}" text-anchor="middle" class="svs">${half}x</text>
      <rect x="${o + X}" y="${o + X}" width="${sw}" height="${sw}" fill="${corner ? '#b9e8c4' : 'none'}" stroke="${corner ? '#1f8a3b' : '#d33'}" stroke-width="2" ${corner ? '' : 'stroke-dasharray="5 4"'}/>
      <text x="${o + X + sw / 2}" y="${o + X + sw / 2 + 4}" text-anchor="middle" class="svs">${corner ? half * half : '?'}</text>
      <text x="${o + X / 2}" y="14" text-anchor="middle" class="svs">x</text>
      <text x="${o + X + sw / 2}" y="14" text-anchor="middle" class="svs">${half}</text>`;
    txt.innerHTML = corner
      ? `x² + ${B}x + ${half * half} = (x + ${half})²  ✔ a perfect square`
      : `x² + ${B}x has a hole in the corner, so it is <b>not</b> a square yet.<br>The corner is ${half} by ${half}. What area is that?`;
  }
  b.oninput = draw; add.onchange = draw; draw();
};

/* ---- Day 2: deriving the formula, step by step ---- */
widgets.derive = function (host) {
  const steps = [
    { op: 'Start with the equation.', L: 'x^2+4x-3=0', G: 'ax^2+bx+c=0' },
    { op: 'Divide everything by a, so that x² has no number in front. (Here a = 1, so nothing changes.)', L: 'x^2+4x-3=0', G: 'x^2+\\dfrac{b}{a}x+\\dfrac{c}{a}=0' },
    { op: 'Move the constant term to the right-hand side.', L: 'x^2+4x=3', G: 'x^2+\\dfrac{b}{a}x=-\\dfrac{c}{a}' },
    { op: 'Complete the square: add (half of the x-coefficient)² to BOTH sides.', L: 'x^2+4x+2^2=3+2^2', G: 'x^2+\\dfrac{b}{a}x+\\left(\\dfrac{b}{2a}\\right)^2=-\\dfrac{c}{a}+\\left(\\dfrac{b}{2a}\\right)^2' },
    { op: 'Left side is now a perfect square. Tidy the right side (common denominator 4a²).', L: '(x+2)^2=7', G: '\\left(x+\\dfrac{b}{2a}\\right)^2=\\dfrac{b^2-4ac}{4a^2}' },
    { op: 'Take square roots of both sides. Do not forget ±.', L: 'x+2=\\pm\\sqrt{7}', G: 'x+\\dfrac{b}{2a}=\\pm\\dfrac{\\sqrt{b^2-4ac}}{2a}' },
    { op: 'Get x on its own.', L: 'x=-2\\pm\\sqrt{7}', G: 'x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}' },
  ];
  let i = 0;
  host.innerHTML = `
    <div class="widget">
      <h4>Same steps, numbers on the left, letters on the right</h4>
      <p class="muted">Before you click: say out loud <b>"What would we do next?"</b>. Then check yourself.</p>
      <div class="derive-grid" id="dv-grid"></div>
      <div class="controls">
        <button class="btn primary" id="dv-next">Show next step</button>
        <button class="btn ghost" id="dv-reset">Start again</button>
      </div>
    </div>`;
  const grid = host.querySelector('#dv-grid'), next = host.querySelector('#dv-next');
  function draw() {
    grid.innerHTML = `<div class="dh">With numbers</div><div class="dh">In general</div>` +
      steps.slice(0, i + 1).map((s, k) => `
        <div class="dop">Step ${k}: ${s.op}</div>
        <div class="dcell">\\[${s.L}\\]</div><div class="dcell">\\[${s.G}\\]</div>`).join('');
    next.disabled = i >= steps.length - 1;
    next.textContent = i >= steps.length - 1 ? 'That is the quadratic formula!' : 'Show next step';
    if (window.renderMathInElement) renderMathInElement(grid, { delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }], throwOnError: false });
  }
  next.onclick = () => { if (i < steps.length - 1) { i++; draw(); } };
  host.querySelector('#dv-reset').onclick = () => { i = 0; draw(); };
  draw();
};

/* ---- Day 4: graph explorer ---- */
widgets.graph = function (host) {
  const st = { mode: 'fact', s: 1, h: 1, k: -3, p: 1, q: -4 };
  host.innerHTML = `
    <div class="widget">
      <h4>Graph explorer</h4>
      <div class="controls">
        <label class="check"><input type="radio" name="gm" value="fact" checked> factorised form: y = ±(x − h)(x − k)</label>
        <label class="check"><input type="radio" name="gm" value="cs"> completed-square form: y = ±(x − p)² + q</label>
      </div>
      <div class="controls">
        <label class="check"><input type="radio" name="gs" value="1" checked> positive (U-shape)</label>
        <label class="check"><input type="radio" name="gs" value="-1"> negative (upside-down)</label>
      </div>
      <div class="controls" id="gx-sliders"></div>
      <svg id="gx-svg" viewBox="0 0 520 380" role="img" aria-label="Graph of a quadratic"></svg>
      <p id="gx-read" class="eqline"></p>
      <p class="muted"><span class="dot blue"></span>x-intercepts &nbsp; <span class="dot red"></span>turning point &nbsp; <span class="dot green"></span>y-intercept &nbsp; dashed line = line of symmetry</p>
    </div>`;
  const sl = host.querySelector('#gx-sliders'), svg = host.querySelector('#gx-svg'), read = host.querySelector('#gx-read');
  function sliders() {
    const defs = st.mode === 'fact' ? [['h', -6, 6], ['k', -6, 6]] : [['p', -6, 6], ['q', -8, 8]];
    sl.innerHTML = defs.map(([n, lo, hi]) => `<label>${n} = <input type="range" min="${lo}" max="${hi}" step="1" value="${st[n]}" data-n="${n}"> <b>${st[n]}</b></label>`).join('');
    sl.querySelectorAll('input').forEach((el) => { el.oninput = () => { st[el.dataset.n] = +el.value; el.nextElementSibling.textContent = el.value; draw(); }; });
  }
  const sg = (n) => (n < 0 ? `+ ${-n}` : `- ${n}`);
  function draw() {
    const { s, h, k, p, q } = st;
    let f, tx, ty, roots;
    if (st.mode === 'fact') {
      f = (x) => s * (x - h) * (x - k); tx = (h + k) / 2; ty = f(tx); roots = [...new Set([h, k])];
    } else {
      f = (x) => s * (x - p) * (x - p) + q; tx = p; ty = q;
      roots = s * q < 0 ? [p - Math.sqrt(-q / s), p + Math.sqrt(-q / s)] : s * q === 0 ? [p] : [];
    }
    const yi = f(0);
    const lo = Math.min(0, ty, yi), hi = Math.max(0, ty, yi), pad = Math.max(3, (hi - lo) * 0.25);
    const ymin = lo - pad, ymax = hi + pad, xmin = -10, xmax = 10;
    const W = 520, H = 380, mx = 30, my = 16;
    const X = (x) => mx + ((x - xmin) / (xmax - xmin)) * (W - 2 * mx);
    const Y = (y) => H - my - ((y - ymin) / (ymax - ymin)) * (H - 2 * my);
    const span = ymax - ymin, step = span > 60 ? 10 : span > 30 ? 5 : span > 14 ? 2 : 1;
    let g = `<defs><clipPath id="gx-clip"><rect x="${mx}" y="${my}" width="${W - 2 * mx}" height="${H - 2 * my}"/></clipPath></defs>`;
    for (let x = -10; x <= 10; x += 2) g += `<line x1="${X(x)}" y1="${my}" x2="${X(x)}" y2="${H - my}" class="gl"/>${x !== 0 ? `<text x="${X(x)}" y="${Y(0) + 14 > H - 2 ? H - 4 : Y(0) + 14}" class="gt" text-anchor="middle">${x}</text>` : ''}`;
    for (let y = Math.ceil(ymin / step) * step; y <= ymax; y += step) g += `<line x1="${mx}" y1="${Y(y)}" x2="${W - mx}" y2="${Y(y)}" class="gl"/>${y !== 0 ? `<text x="${X(0) - 4}" y="${Y(y) + 4}" class="gt" text-anchor="end">${y}</text>` : ''}`;
    g += `<line x1="${mx}" y1="${Y(0)}" x2="${W - mx}" y2="${Y(0)}" class="ga"/><line x1="${X(0)}" y1="${my}" x2="${X(0)}" y2="${H - my}" class="ga"/>`;
    g += `<line x1="${X(tx)}" y1="${my}" x2="${X(tx)}" y2="${H - my}" class="gs"/>`;
    let d = '';
    for (let x = xmin; x <= xmax + 1e-9; x += 0.1) d += (d ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(f(x)).toFixed(1);
    g += `<path d="${d}" class="gc" clip-path="url(#gx-clip)"/>`;
    roots.forEach((r) => { g += `<circle cx="${X(r)}" cy="${Y(0)}" r="5" fill="#3be8ff"/>`; });
    g += `<circle cx="${X(tx)}" cy="${Y(ty)}" r="5.5" fill="#ff4fa3"/><circle cx="${X(0)}" cy="${Y(yi)}" r="5" fill="#b6ff3b"/>`;
    svg.innerHTML = g;
    const r2 = (n) => Math.round(n * 100) / 100;
    const eq = st.mode === 'fact'
      ? `y = ${s < 0 ? '−' : ''}(x ${sg(h)})(x ${sg(k)})`
      : `y = ${s < 0 ? '−' : ''}(x ${sg(p)})² ${q < 0 ? '− ' + -q : q > 0 ? '+ ' + q : ''}`;
    read.innerHTML = `<b>${eq}</b><br>` +
      `x-intercepts: ${roots.length ? roots.map(r2).join(' and ') : 'none (the curve never reaches the x-axis)'}<br>` +
      `turning point (${s > 0 ? 'minimum' : 'maximum'}): (${r2(tx)}, ${r2(ty)}) &nbsp; line of symmetry: x = ${r2(tx)}<br>y-intercept: ${r2(yi)}`;
  }
  host.querySelectorAll('input[name=gm]').forEach((el) => { el.onchange = () => { st.mode = el.value; sliders(); draw(); }; });
  host.querySelectorAll('input[name=gs]').forEach((el) => { el.onchange = () => { st.s = +el.value; draw(); }; });
  sliders(); draw();
};

/* ---- Day 4 game: Root Hunter. Click where the curve crosses the x-axis. ---- */
widgets.rootHunt = function (host) {
  const TOTAL = 5, W = 520, H = 320, mx = 24, my = 14, xmin = -10, xmax = 10;
  let round = 0, score = 0, tries = 0, marks = [], cur = null, solved = false;
  host.innerHTML = `<div class="widget hunt"><h4>🎯 Root Hunter</h4>
    <p class="muted">Don't use algebra yet. The curve below is the graph of the left-hand side. Click the x-axis where the equation is true (where the curve crosses it). Click a marker again to remove it.</p>
    <div class="eqline" id="rh-eq"></div><svg id="rh-svg" viewBox="0 0 ${W} ${H}"></svg>
    <div class="hunt-actions"><button class="btn primary" id="rh-check">Check my roots</button><button class="btn ghost" id="rh-clear">Clear</button><span class="pill" id="rh-score"></span></div>
    <div id="rh-fb" class="fb"></div></div>`;
  const svg = host.querySelector('#rh-svg'), fb = host.querySelector('#rh-fb'), eq = host.querySelector('#rh-eq'), sc = host.querySelector('#rh-score'), chk = host.querySelector('#rh-check');
  const mathIt = (n) => { if (window.renderMathInElement) renderMathInElement(n, { delimiters: [{ left: '\\(', right: '\\)', display: false }], throwOnError: false }); };

  function newRound() {
    let h, k;
    do { h = R(-8, 8); k = R(-8, 8); } while (h === k || Math.abs(h - k) < 2);
    const s = Math.random() < 0.7 ? 1 : -1;
    cur = { h, k, s, f: (x) => s * (x - h) * (x - k) };
    marks = []; tries = 0; solved = false; chk.disabled = false; fb.innerHTML = '';
    eq.innerHTML = `Round ${round + 1} of ${TOTAL}: find the solutions of \\(${poly(s, -s * (h + k), s * h * k)} = 0\\)`;
    mathIt(eq); sc.textContent = `${score} correct so far`; draw();
  }
  function frame() {
    const mid = (cur.h + cur.k) / 2, ty = cur.f(mid), yi = cur.f(0);
    const lo = Math.min(0, ty, yi), hi = Math.max(0, ty, yi), pad = Math.max(3, (hi - lo) * 0.2);
    return { ymin: lo - pad, ymax: hi + pad };
  }
  function draw() {
    const { ymin, ymax } = frame();
    const X = (x) => mx + ((x - xmin) / (xmax - xmin)) * (W - 2 * mx), Y = (y) => H - my - ((y - ymin) / (ymax - ymin)) * (H - 2 * my);
    const step = (ymax - ymin) > 60 ? 10 : (ymax - ymin) > 30 ? 5 : (ymax - ymin) > 14 ? 2 : 1;
    let g = `<defs><clipPath id="rh-clip"><rect x="${mx}" y="${my}" width="${W - 2 * mx}" height="${H - 2 * my}"/></clipPath></defs>`;
    for (let x = -10; x <= 10; x++) g += `<line x1="${X(x)}" y1="${my}" x2="${X(x)}" y2="${H - my}" class="gl"/>` + (x !== 0 && x % 2 === 0 ? `<text x="${X(x)}" y="${Math.min(Y(0) + 14, H - 3)}" class="gt" text-anchor="middle">${x}</text>` : '');
    for (let y = Math.ceil(ymin / step) * step; y <= ymax; y += step) g += `<line x1="${mx}" y1="${Y(y)}" x2="${W - mx}" y2="${Y(y)}" class="gl"/>` + (y !== 0 ? `<text x="${X(0) - 4}" y="${Y(y) + 4}" class="gt" text-anchor="end">${y}</text>` : '');
    g += `<line x1="${mx}" y1="${Y(0)}" x2="${W - mx}" y2="${Y(0)}" class="ga"/><line x1="${X(0)}" y1="${my}" x2="${X(0)}" y2="${H - my}" class="ga"/>`;
    let d = ''; for (let x = xmin; x <= xmax + 1e-9; x += 0.1) d += (d ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(cur.f(x)).toFixed(1);
    g += `<path d="${d}" class="gc" clip-path="url(#rh-clip)"/>`;
    marks.forEach((m) => { g += `<circle cx="${X(m)}" cy="${Y(0)}" r="7" fill="#ff4fa3" stroke="#fff" stroke-width="2"/><text x="${X(m)}" y="${Y(0) - 12}" class="gt" text-anchor="middle" style="font-size:13px;fill:#fff">${m}</text>`; });
    svg.innerHTML = g;
    svg._X = X;
  }
  svg.addEventListener('click', (e) => {
    if (solved) return;
    const r = svg.getBoundingClientRect(), px = ((e.clientX - r.left) / r.width) * W;
    const x = Math.round(xmin + ((px - mx) / (W - 2 * mx)) * (xmax - xmin));
    if (x < xmin || x > xmax) return;
    const i = marks.indexOf(x);
    if (i >= 0) marks.splice(i, 1); else if (marks.length < 2) marks.push(x); else return;
    draw();
  });
  host.querySelector('#rh-clear').onclick = () => { if (!solved) { marks = []; draw(); } };
  chk.onclick = () => {
    if (solved) return;
    const want = [cur.h, cur.k].sort((a, b) => a - b), got = [...marks].sort((a, b) => a - b);
    const ok = got.length === 2 && got[0] === want[0] && got[1] === want[1];
    if (ok) {
      solved = true; chk.disabled = true;
      const clean = tries === 0; if (clean) score++;
      if (window.kqRecord) window.kqRecord('roothunt', clean);
      const last = round + 1 >= TOTAL;
      fb.innerHTML = `<span class="ok">✔ Yes! The solutions are \\(x=${want[0]}\\) and \\(x=${want[1]}\\).${clean ? ' <span class="xpgain">+10 XP</span>' : ''}</span>
        <p class="muted">Check with algebra: \\(${fac(cur.h)}${fac(cur.k)}=0\\) gives the same two numbers. Solutions of the equation <b>are</b> the x-intercepts.</p>
        <div class="actions"><button class="btn primary" id="rh-next">${last ? 'Finish' : 'Next round'}</button></div>`;
      mathIt(fb);
      fb.querySelector('#rh-next').onclick = () => {
        round++;
        if (round >= TOTAL) { if (window.kqClear) window.kqClear(host.dataset.id); fb.innerHTML = `<p><b>Root Hunter complete: ${score} of ${TOTAL} first time.</b></p><div class="actions"><button class="btn" id="rh-again">Play again</button></div>`; fb.querySelector('#rh-again').onclick = () => { round = 0; score = 0; newRound(); }; sc.textContent = ''; }
        else newRound();
      };
    } else {
      tries++;
      fb.innerHTML = `<span class="no">✘ Not yet.</span> <span class="muted">${marks.length < 2 ? 'This curve crosses the axis twice. ' : ''}Look at exactly where the green curve cuts the horizontal axis.</span>`;
    }
  };
  newRound();
};

const wMath = (n) => { if (window.renderMathInElement) renderMathInElement(n, { delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }], throwOnError: false }); };
const wShuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---- Day 2 game: Derivation Jigsaw. Put the lines of the formula derivation in order. ---- */
widgets.jigsaw = function (host) {
  const steps = [
    { op: 'Divide everything by a.', tex: 'x^2+\\dfrac{b}{a}x+\\dfrac{c}{a}=0' },
    { op: 'Move the constant term to the right.', tex: 'x^2+\\dfrac{b}{a}x=-\\dfrac{c}{a}' },
    { op: 'Add (half of the x-coefficient)² to both sides.', tex: 'x^2+\\dfrac{b}{a}x+\\left(\\dfrac{b}{2a}\\right)^2=-\\dfrac{c}{a}+\\left(\\dfrac{b}{2a}\\right)^2' },
    { op: 'Write the left side as a perfect square; tidy the right side.', tex: '\\left(x+\\dfrac{b}{2a}\\right)^2=\\dfrac{b^2-4ac}{4a^2}' },
    { op: 'Take square roots of both sides (±).', tex: 'x+\\dfrac{b}{2a}=\\pm\\dfrac{\\sqrt{b^2-4ac}}{2a}' },
    { op: 'Get x on its own.', tex: 'x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}' },
  ];
  let next, mistakes, pool;
  host.innerHTML = `<div class="widget"><h4>🧩 Derivation Jigsaw</h4>
    <p class="muted">These are the lines of the quadratic formula derivation, shuffled. Click them in the order they appear. Before you click, say out loud what happened between the lines.</p>
    <div class="eqline">Start: \\(ax^2+bx+c=0\\)</div><div id="jg-done"></div>
    <div id="jg-pool" class="jg-pool"></div><div id="jg-fb" class="fb"></div></div>`;
  const done = host.querySelector('#jg-done'), poolEl = host.querySelector('#jg-pool'), fb = host.querySelector('#jg-fb');
  function start() {
    next = 0; mistakes = 0; pool = wShuffle(steps.map((s, i) => i)); done.innerHTML = ''; fb.innerHTML = '';
    poolEl.innerHTML = pool.map((i) => `<button class="opt jg" data-i="${i}">\\(${steps[i].tex}\\)</button>`).join('');
    poolEl.querySelectorAll('button').forEach((b) => { b.onclick = () => pick(b); });
    wMath(host);
  }
  function pick(b) {
    const i = +b.dataset.i;
    if (i === next) {
      b.remove(); next++;
      done.insertAdjacentHTML('beforeend', `<div class="jg-row"><div class="muted">${next}. ${steps[i].op}</div><div>\\[${steps[i].tex}\\]</div></div>`);
      wMath(done); fb.innerHTML = '';
      if (next === steps.length) {
        if (window.kqClear) window.kqClear(host.dataset.id);
        if (window.kqRecord) window.kqRecord('jigsaw', mistakes === 0);
        fb.innerHTML = `<span class="ok">✔ You rebuilt the quadratic formula!${mistakes === 0 ? ' <span class="xpgain">+10 XP</span>' : ` (${mistakes} wrong click${mistakes > 1 ? 's' : ''})`}</span>
          <div class="actions"><button class="btn" id="jg-again">Shuffle and play again</button></div>`;
        fb.querySelector('#jg-again').onclick = start;
      }
    } else {
      mistakes++; b.classList.add('wrong');
      setTimeout(() => b.classList.remove('wrong'), 600);
      fb.innerHTML = `<span class="no">Not the next line.</span> <span class="muted">What is the very next thing we do to the last line?</span>`;
    }
  }
  start();
};

/* ---- Day 3 game: Rejection Court. Is each candidate answer valid, or must it be rejected? ---- */
widgets.court = function (host) {
  const TOTAL = 5; let round = 0, score = 0, cur;
  host.innerHTML = `<div class="widget"><h4>⚖️ Rejection Court</h4>
    <p class="muted">A student solved the equation and found two answers. Decide for each answer: <b>valid</b>, or <b>reject</b> (it would make a denominator zero).</p>
    <div id="ct-eq" class="eqline"></div><div id="ct-rows"></div>
    <div class="actions"><button class="btn primary" id="ct-go">Deliver verdict</button></div><div id="ct-fb" class="fb"></div></div>`;
  const eq = host.querySelector('#ct-eq'), rows = host.querySelector('#ct-rows'), fb = host.querySelector('#ct-fb'), go = host.querySelector('#ct-go');
  function build() {
    if (Math.random() < 0.65) {
      let a, r, w, z;
      do { a = nz(-6, 6); r = nz(-6, 6); } while (a === r);
      w = nz(-3, 3); z = R(-6, 6);
      const u = w - a - r, v = z + a * r;
      return { tex: `\\dfrac{${poly(1, u, v)}}{${lin(-a)}} = \\dfrac{${poly(0, w, z)}}{${lin(-a)}}`, cands: wShuffle([a, r]), bad: a, why: `${lin(-a)} would be 0` };
    }
    let m, n, r1, r2, a;
    do { m = nz(-5, 5); n = nz(-5, 5); r1 = nz(-7, 7); r2 = -(m + n) - r1; a = (r1 + n) * (r1 + m); }
    while (r1 === r2 || r1 === -m || r2 === -m || a === 0 || Math.abs(a) > 36);
    return { tex: `\\dfrac{${a}}{${lin(m)}} = ${lin(n)}`, cands: wShuffle([r1, r2]), bad: -m, why: `${lin(m)} would be 0` };
  }
  function newRound() {
    cur = build(); cur.pick = {}; go.disabled = false; fb.innerHTML = '';
    eq.innerHTML = `Round ${round + 1} of ${TOTAL}: \\(${cur.tex}\\)<br>The student's answers:`;
    rows.innerHTML = cur.cands.map((c, i) => `<div class="ct-row"><b>\\(x=${c}\\)</b>
      <button class="opt sm" data-i="${i}" data-v="valid">✅ Valid</button><button class="opt sm" data-i="${i}" data-v="reject">🚫 Reject</button></div>`).join('');
    rows.querySelectorAll('button').forEach((b) => { b.onclick = () => {
      cur.pick[b.dataset.i] = b.dataset.v;
      rows.querySelectorAll(`button[data-i="${b.dataset.i}"]`).forEach((o) => o.classList.toggle('sel', o === b));
    }; });
    wMath(host);
  }
  go.onclick = () => {
    if (Object.keys(cur.pick).length < cur.cands.length) { fb.innerHTML = '<span class="no">Give a verdict on both answers first.</span>'; return; }
    const ok = cur.cands.every((c, i) => (cur.pick[i] === 'reject') === (c === cur.bad));
    go.disabled = true; if (ok) score++;
    if (window.kqRecord) window.kqRecord('court', ok);
    const bad = cur.cands.includes(cur.bad);
    const why = bad ? `\\(x=${cur.bad}\\) must be rejected: ${cur.why}. The other answer is valid.` : 'Both answers are valid: neither makes a denominator zero.';
    fb.innerHTML = `<span class="${ok ? 'ok' : 'no'}">${ok ? '✔ Correct verdict!' + ' <span class="xpgain">+10 XP</span>' : '✘ Wrong verdict.'}</span><div class="reveal">${why}</div>
      <div class="actions"><button class="btn primary" id="ct-next">${round + 1 >= TOTAL ? 'Finish' : 'Next case'}</button></div>`;
    wMath(fb);
    fb.querySelector('#ct-next').onclick = () => {
      round++;
      if (round >= TOTAL) { if (window.kqClear) window.kqClear(host.dataset.id); rows.innerHTML = ''; eq.innerHTML = ''; go.disabled = true; fb.innerHTML = `<p><b>Court adjourned: ${score} of ${TOTAL} verdicts right.</b></p><div class="actions"><button class="btn" id="ct-again">New cases</button></div>`; fb.querySelector('#ct-again').onclick = () => { round = 0; score = 0; newRound(); }; }
      else newRound();
    };
  };
  newRound();
};

/* ---- Day 5 game: Launch Lab. Choose the launch speed so the ball peaks exactly at the target. ---- */
widgets.launch = function (host) {
  const TOTAL = 4; let round = 0, score = 0, c, T, k, tries, solved;
  host.innerHTML = `<div class="widget"><h4>🚀 Launch Lab</h4>
    <p class="muted">The ball's height is \\(h=-t^2+bt+c\\). Slide <i>b</i> (launch strength) until the highest point of the ball <b>just touches the target line</b>. Look at how the peak height changes as you slide: can you spot the pattern?</p>
    <div class="eqline" id="ll-eq"></div>
    <div class="controls"><label>b = <input type="range" id="ll-b" min="0" max="12" step="0.5" value="2"> <b id="ll-bv">2</b></label></div>
    <svg id="ll-svg" viewBox="0 0 520 300"></svg><p class="eqline" id="ll-read"></p>
    <div class="actions"><button class="btn primary" id="ll-fire">🔥 Fire!</button></div><div id="ll-fb" class="fb"></div></div>`;
  const b = host.querySelector('#ll-b'), bv = host.querySelector('#ll-bv'), svg = host.querySelector('#ll-svg'), read = host.querySelector('#ll-read'), eq = host.querySelector('#ll-eq'), fb = host.querySelector('#ll-fb'), fire = host.querySelector('#ll-fire');
  function newRound() {
    c = R(1, 3); k = R(2, 5); T = c + k * k; tries = 0; solved = false; fire.disabled = false; fb.innerHTML = '';
    b.value = 2; bv.textContent = 2;
    eq.innerHTML = `Round ${round + 1} of ${TOTAL}: \\(h=-t^2+bt${plus(c) ? ' ' + plus(c) : ''}\\). Target height: <b>${T} m</b>.`; wMath(eq); draw();
  }
  function draw() {
    const B = +b.value; bv.textContent = B;
    const W = 520, H = 300, mx = 36, my = 14, tmax = 13, ymax = T + 4;
    const X = (t) => mx + (t / tmax) * (W - 2 * mx), Y = (h) => H - 24 - (h / ymax) * (H - 24 - my);
    let g = `<defs><clipPath id="ll-clip"><rect x="${mx}" y="${my}" width="${W - 2 * mx}" height="${H - 24 - my}"/></clipPath></defs>`;
    for (let t = 0; t <= tmax; t += 1) g += `<line x1="${X(t)}" y1="${my}" x2="${X(t)}" y2="${H - 24}" class="gl"/><text x="${X(t)}" y="${H - 8}" class="gt" text-anchor="middle">${t}</text>`;
    const stepY = ymax > 30 ? 10 : 5; for (let h = 0; h <= ymax; h += stepY) g += `<line x1="${mx}" y1="${Y(h)}" x2="${W - mx}" y2="${Y(h)}" class="gl"/><text x="${mx - 4}" y="${Y(h) + 4}" class="gt" text-anchor="end">${h}</text>`;
    g += `<line x1="${mx}" y1="${Y(0)}" x2="${W - mx}" y2="${Y(0)}" class="ga"/><line x1="${mx}" y1="${Y(T)}" x2="${W - mx}" y2="${Y(T)}" stroke="#ff4fa3" stroke-width="2.5" stroke-dasharray="7 5"/>`;
    g += `<text x="${W - mx}" y="${Y(T) - 6}" class="gt" text-anchor="end" style="fill:#ff4fa3;font-size:13px">target ${T} m</text>`;
    let d = ''; for (let t = 0; t <= tmax; t += 0.05) d += (d ? 'L' : 'M') + X(t).toFixed(1) + ',' + Y(-t * t + B * t + c).toFixed(1);
    g += `<path d="${d}" class="gc" clip-path="url(#ll-clip)"/>`;
    const pk = c + (B / 2) * (B / 2);
    g += `<circle cx="${X(B / 2)}" cy="${Y(pk)}" r="6" fill="#ffd23b" clip-path="url(#ll-clip)"/>`;
    svg.innerHTML = g;
    read.innerHTML = `Peak: <b>${Math.round(pk * 100) / 100} m</b> at t = ${B / 2} s`;
  }
  b.oninput = () => { if (!solved) draw(); };
  fire.onclick = () => {
    if (solved) return;
    const B = +b.value, pk = c + (B / 2) * (B / 2);
    if (Math.abs(pk - T) < 1e-9) {
      solved = true; fire.disabled = true; const clean = tries === 0; if (clean) score++;
      if (window.kqRecord) window.kqRecord('launch', clean);
      fb.innerHTML = `<span class="ok">🎯 Direct hit!${clean ? ' <span class="xpgain">+10 XP</span>' : ''}</span>
        <div class="reveal">Why it works: \\(h=-t^2+${B}t${plus(c) ? ' ' + plus(c) : ''} = -\\left(t-${B / 2}\\right)^2 + ${pk}\\). Completing the square shows the peak is \\(c+(b/2)^2\\) at \\(t=b/2\\). Here \\(${c}+${B / 2}^2=${pk}\\).</div>
        <div class="actions"><button class="btn primary" id="ll-next">${round + 1 >= TOTAL ? 'Finish' : 'Next target'}</button></div>`;
      wMath(fb);
      fb.querySelector('#ll-next').onclick = () => {
        round++;
        if (round >= TOTAL) { if (window.kqClear) window.kqClear(host.dataset.id); fb.innerHTML = `<p><b>Lab complete: ${score} of ${TOTAL} first-try hits.</b></p><div class="actions"><button class="btn" id="ll-again">Play again</button></div>`; fb.querySelector('#ll-again').onclick = () => { round = 0; score = 0; newRound(); }; }
        else newRound();
      };
    } else {
      tries++;
      fb.innerHTML = `<span class="no">${pk < T ? 'Too low' : 'Too high'}: the peak is ${Math.round(pk * 100) / 100} m and the target is ${T} m.</span> <span class="muted">${tries >= 2 ? `Pattern: peak − ${c} = ${Math.round((pk - c) * 100) / 100} = (b/2)². How big must (b/2)² be?` : 'Slide b and watch how the peak changes.'}</span>`;
    }
  };
  newRound();
};

/* ---- Level 4 game: Match the Graph. Pick the equation that belongs to the sketch (book 1.5 Class Discussion). ---- */
widgets.match = function (host) {
  const TOTAL = 6; let round = 0, score = 0, cur, tries, solved;
  host.innerHTML = `<div class="widget"><h4>🧩 Match the Graph</h4>
    <p class="muted">Read the clues on the sketch: does it open up or down? Where does it cross the x-axis? Where is the turning point? Then pick the equation that fits. Each wrong equation breaks at least one clue.</p>
    <div class="eqline" id="mt-head"></div><svg id="mt-svg" viewBox="0 0 520 300"></svg>
    <div id="mt-opts" class="opts"></div><div id="mt-fb" class="fb"></div></div>`;
  const svg = host.querySelector('#mt-svg'), opts = host.querySelector('#mt-opts'), fb = host.querySelector('#mt-fb'), head = host.querySelector('#mt-head');
  const sgn = (n) => (n < 0 ? `+ ${-n}` : `- ${n}`);
  const asl = (r) => (r < 0 ? `+ ${-r}` : `- ${r}`);   // (x - r) as "x - r" or "x + |r|"

  function build() {
    const s = Math.random() < 0.5 ? 1 : -1;
    if (Math.random() < 0.5) {
      let h, k; do { h = R(-6, 6); k = R(-6, 6); } while (h === k || h === 0 || k === 0 || h + k === 0);
      const f = (x) => s * (x - h) * (x - k), neg = s < 0 ? '-' : '', op = s < 0 ? '-' : '';
      const eq = (S, a, b) => `y = ${S < 0 ? '-' : ''}(x ${asl(a)})(x ${asl(b)})`;
      const answer = eq(s, h, k);
      const wrong = [eq(-s, h, k), eq(s, -h, -k), eq(s, h, -k), eq(s, -h, k)].filter((e) => e !== answer);
      const pts = [{ x: h, y: 0, t: `${h}` }, { x: k, y: 0, t: `${k}` }, { x: 0, y: f(0), t: `${f(0)}`, dy: true }];
      const why = `It ${s > 0 ? 'opens up (positive)' : 'opens down (negative)'} and crosses the x-axis at ${h} and ${k}, so the factors are (x ${asl(h)}) and (x ${asl(k)}). Check: when x = 0, y = ${f(0)}, which matches the y-intercept.`;
      return { f, pts, answer, wrong: wrong.slice(0, 3), why, tp: null };
    }
    const p = nz(-5, 5), q = nz(-7, 7), f = (x) => s * (x - p) * (x - p) + q;
    const eq = (S, a, b) => `y = ${S < 0 ? '-' : ''}(x ${asl(a)})^2 ${b === 0 ? '' : b < 0 ? '- ' + -b : '+ ' + b}`;
    const answer = eq(s, p, q);
    const wrong = [eq(-s, p, q), eq(s, -p, q), eq(s, p, -q), eq(-s, -p, -q)].filter((e) => e !== answer);
    const pts = [{ x: p, y: q, t: `(${p}, ${q})`, tp: true }, { x: 0, y: f(0), t: `${f(0)}`, dy: true }];
    const why = `It ${s > 0 ? 'opens up' : 'opens down'} and its turning point is (${p}, ${q}), so it is ${s < 0 ? '-' : ''}(x ${asl(p)})² ${q < 0 ? '- ' + -q : '+ ' + q}. Check: when x = 0, y = ${f(0)}, which matches the y-intercept.`;
    return { f, pts, answer, wrong: wrong.slice(0, 3), why };
  }

  function draw() {
    const { f, pts } = cur, W = 520, H = 300, mx = 30, my = 16, xmin = -10, xmax = 10;
    const ys = pts.map((p) => p.y).concat([0]), lo = Math.min(...ys), hi = Math.max(...ys), pad = Math.max(3, (hi - lo) * 0.3);
    const ymin = lo - pad, ymax = hi + pad;
    const X = (x) => mx + ((x - xmin) / (xmax - xmin)) * (W - 2 * mx), Y = (y) => H - my - ((y - ymin) / (ymax - ymin)) * (H - 2 * my);
    let g = `<defs><clipPath id="mt-clip"><rect x="${mx}" y="${my}" width="${W - 2 * mx}" height="${H - 2 * my}"/></clipPath></defs>`;
    g += `<line x1="${mx}" y1="${Y(0)}" x2="${W - mx}" y2="${Y(0)}" class="ga"/><line x1="${X(0)}" y1="${my}" x2="${X(0)}" y2="${H - my}" class="ga"/>`;
    let d = ''; for (let x = xmin; x <= xmax + 1e-9; x += 0.1) d += (d ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(f(x)).toFixed(1);
    g += `<path d="${d}" class="gc" clip-path="url(#mt-clip)"/>`;
    pts.forEach((p) => {
      g += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="5" fill="${p.tp ? '#ff4fa3' : p.dy ? '#b6ff3b' : '#3be8ff'}"/>`;
      const tx = p.dy ? X(0) + 8 : X(p.x), ty = p.dy ? Y(p.y) - 8 : p.tp ? Y(p.y) + (f(p.x + 1) > p.y ? 20 : -12) : Y(0) + (cur.f(p.x + 0.5) > 0 ? -10 : 18);
      g += `<text x="${tx}" y="${ty}" text-anchor="${p.dy ? 'start' : 'middle'}" class="gt" style="font-size:13px;fill:#fff;font-weight:700">${p.t}</text>`;
    });
    svg.innerHTML = g;
  }

  function newRound() {
    cur = build(); tries = 0; solved = false; fb.innerHTML = '';
    head.textContent = `Round ${round + 1} of ${TOTAL}: which equation matches this sketch?`;
    draw();
    const all = wShuffle([cur.answer, ...cur.wrong]);
    opts.innerHTML = all.map((e) => `<button class="opt" data-e="${e}">\\(${e}\\)</button>`).join('');
    opts.querySelectorAll('button').forEach((b) => { b.onclick = () => pick(b); });
    wMath(host);
  }
  function pick(b) {
    if (solved) return;
    if (b.dataset.e === cur.answer) {
      solved = true; b.classList.add('right'); const clean = tries === 0; if (clean) score++;
      if (window.kqRecord) window.kqRecord('match', clean);
      fb.innerHTML = `<div class="reveal"><b>Yes!${clean ? ' <span class="xpgain">+10 XP</span>' : ''}</b> ${cur.why}</div><div class="actions"><button class="btn primary" id="mt-next">${round + 1 >= TOTAL ? 'Finish' : 'Next graph'}</button></div>`;
      fb.querySelector('#mt-next').onclick = () => {
        round++;
        if (round >= TOTAL) { if (window.kqClear) window.kqClear(host.dataset.id); opts.innerHTML = ''; svg.innerHTML = ''; head.textContent = ''; fb.innerHTML = `<p><b>${score} of ${TOTAL} matched first time.</b></p><div class="actions"><button class="btn" id="mt-again">Play again</button></div>`; fb.querySelector('#mt-again').onclick = () => { round = 0; score = 0; newRound(); }; }
        else newRound();
      };
    } else { tries++; b.classList.add('wrong'); b.disabled = true; fb.innerHTML = '<div class="hint">Not this one. Check each clue on the sketch against the equation: direction, x-intercepts or turning point, and the y-intercept.</div>'; }
    wMath(fb);
  }
  newRound();
};
