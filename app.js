/* App shell: routing, progress, question cards and lesson blocks. */
(function () {
  const root = document.getElementById('app');
  const timers = [];
  const clearTimers = () => { while (timers.length) clearInterval(timers.pop()); };

  /* ---------- storage ---------- */
  const Store = {
    d: { v: 2, stats: {}, done: {}, cleared: {}, notes: {}, checks: {}, drills: [], avatar: '🦊', pos: 0 },
    key: 'kq_v1',
    /* v2: Level 2 (Calculator skills) was added, so old level numbers 2 and up moved up by one. Only the level-complete flags are keyed by level number; every task, drill, note and stat is keyed by its own id and is untouched. */
    migrate(d) {
      if (!d || d.v >= 2) return d;
      const old = d.done || {}, nd = {};
      Object.keys(old).forEach((k) => { const n = Number(k); nd[n >= 2 ? n + 1 : n] = old[k]; });
      d.done = nd; d.v = 2; return d;
    },
    load() { try { const s = localStorage.getItem(this.key); if (s) Object.assign(this.d, this.migrate(JSON.parse(s))); } catch (e) { /* private mode */ } },
    saveLocal() { try { localStorage.setItem(this.key, JSON.stringify(this.d)); } catch (e) { /* ignore */ } },
    save() { this.d.updated = Date.now(); this.saveLocal(); Cloud.push(this.d); },
    reset() {
      this.d = { v: 2, stats: {}, done: {}, cleared: {}, notes: {}, checks: {}, drills: [], avatar: this.d.avatar, pos: 0, updated: Date.now() };
      this.saveLocal(); return Cloud.push(this.d, true);
    },
    record(topic, ok, tracked=false) {if(!tracked)window.LearningTracker?.event('answer',{topic,correct:ok});
      const s = this.d.stats[topic] || (this.d.stats[topic] = { c: 0, t: 0 });
      s.t++; if (ok) s.c++; this.save(); hud();
    },
    clear(id) {
      if (!id || this.d.cleared[id]) return;
      this.d.cleared[id] = true; this.save(); hud(); bump(); toast('⭐ Task cleared!');
    },
  };
  let booted = false;

  /* ---------- teacher mode (hidden from the student view) ---------- */
  window.kqRecord = (t, ok) => Store.record(t, ok);
  window.kqClear = (id) => Store.clear(id);
  const bump = () => window.dispatchEvent(new Event('kq-progress'));
  const isTeacher = () => {
    try {
      if (Cloud.enabled) return Cloud.role === 'teacher' && localStorage.getItem('kq_view') !== 'student';
      return localStorage.getItem('kq_teacher') === '1';
    } catch (e) { return false; }
  };
  const setTeacher = (on) => {
    try {
      if (Cloud.enabled) { if (on) localStorage.removeItem('kq_view'); else localStorage.setItem('kq_view', 'student'); return; }
      if (on) localStorage.setItem('kq_teacher', '1'); else localStorage.removeItem('kq_teacher');
    } catch (e) { /* ignore */ }
  };

  /* ---------- XP, ranks and level progress ---------- */
  const RANKS = ['Rookie', 'Code Breaker', 'Calc Ninja', 'Equation Solver', 'Square Master', 'Formula Wizard', 'Root Hunter', 'Parabola Pro', 'Story Solver', 'Boss Slayer', 'Legend'];
  const AVATARS = ['🦊', '🐲', '🤖', '🐱', '🦉', '🐺', '🚀', '🦖'];
  const SHORT = ['Factors', 'Calculator', 'Squares', 'Formula', 'Fractions', 'Graphs', 'Stories', 'Rates', 'Mock exam', 'Repair', 'Castle'];
  const doneCount = () => DAYS.filter((d) => Store.d.done[d.n]).length;
  function xp() {
    const clean = Object.values(Store.d.stats).reduce((a, s) => a + s.c, 0);
    return clean * 10 + Object.keys(Store.d.cleared).length * 20 + doneCount() * 50;
  }
  function hud() {
    const box = document.getElementById('hud'); if (!box) return;
    const n = doneCount();
    box.innerHTML = `<span class="av">${Store.d.avatar || '🦊'}</span><span class="lv">★ ${n}/${DAYS.length}</span><span>${RANKS[n]}</span><span class="xpbar"><i style="width:${(n / DAYS.length) * 100}%"></i></span><span>🪙 ${xp()}</span>`;
  }
  function trackable(d) { return d.blocks.filter((b) => ['practice', 'predict', 'errors', 'fixed', 'think', 'drill', 'mock'].includes(b.t) || (b.t === 'widget' && b.id)); }
  function isCleared(b) {
    if (b.t === 'drill' || b.t === 'mock') return Store.d.drills.some((x) => x.id === b.id && (!b.pass || x.score >= b.pass));
    if (b.t === 'think') return (Store.d.notes[b.id] || '').trim().length >= 15;
    return !!Store.d.cleared[b.id];
  }
  function dayProgress(d) { const t = trackable(d), c = t.filter(isCleared).length; return { c, n: t.length, frac: t.length ? c / t.length : 1 }; }
  function toast(msg) {
    const t = el('div', 'toast', msg); document.body.appendChild(t);
    setTimeout(() => t.classList.add('out'), 1500); setTimeout(() => t.remove(), 2000);
  }

  /* ---------- helpers ---------- */
  function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function math(node) {
    if (window.renderMathInElement) {
      renderMathInElement(node || root, { delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }], throwOnError: false });
    }
  }
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const allTopics = (maxDay) => Object.keys(TOPICS).filter((t) => TOPICS[t].day <= maxDay && !TOPICS[t].stretch && !TOPICS[t].calc);
  function weakTopics() {
    const rows = Object.keys(TOPICS).filter((t) => (Store.d.stats[t] || {}).t >= 2)
      .map((t) => ({ t, acc: Store.d.stats[t].c / Store.d.stats[t].t })).sort((a, b) => a.acc - b.acc);
    const weak = rows.filter((r) => r.acc < 0.85).slice(0, 4).map((r) => r.t);
    return weak.length ? weak : allTopics(8);
  }
  const answerText = (q) => q.answerText || q.answer.map((v) => fmt(v)).join(q.kind === 'set' ? ' or ' : ',  ');

  /* ---------- a single question ---------- */
  function mountQuestion(host, q, opts) {
    host.innerHTML = '';
    const card = el('div', 'qcard');
    card.innerHTML = `<div class="prompt">${q.prompt}</div>
      <div class="fields${q.fields.length >= 5 ? ' grid' : ''}">${q.fields.map((f, i) => `<label class="field"><span>${f}</span><input type="text" class="${q.kind === 'factor' ? 'wide' : ''}" autocomplete="off" spellcheck="false" data-i="${i}" ${q.kind === 'set' ? 'placeholder="e.g. 2, -5"' : q.placeholder ? `placeholder="${q.placeholder}"` : ''}></label>`).join('')}</div>
      <div class="actions"><button class="btn primary chk">Check</button>${opts.hints ? '<button class="btn ghost hintbtn">Hint</button>' : ''}</div>
      <div class="fb"></div>`;
    host.appendChild(card);
    const inputs = [...card.querySelectorAll('input')], fb = card.querySelector('.fb'), chk = card.querySelector('.chk');
    let attempts = 0, usedHint = false, finished = false;

    function finish(ok, clean) {
      finished = true;
      inputs.forEach((i) => (i.disabled = true)); chk.disabled = true;
      const hb = card.querySelector('.hintbtn'); if (hb) hb.disabled = true;
      Store.record(q.topic, clean, true);
      opts.onDone && opts.onDone(ok, clean);
    }
    function sol(open) {
      return `<details class="sol" ${open ? 'open' : ''}><summary>Worked solution</summary>${q.solution}</details>`;
    }
    function check() {
      if (finished) return;
      const res = checkAnswer(q, inputs.map((i) => i.value));
      if (res.bad) { fb.innerHTML = `<span class="no">${res.msg || 'Type numbers only. Fractions like 3/2 and decimals are fine. Separate several answers with commas.'}</span>`; return; }
      if(attempts===0)window.LearningTracker?.event('answer',{topic:q.topic,correct:res.ok,assisted:usedHint});
      if (res.ok) {
        if(attempts>0)window.LearningTracker?.event('correction',{topic:q.topic});
        inputs.forEach((i) => i.classList.add('right'));
        const clean = attempts === 0 && !usedHint;
        fb.innerHTML = `<span class="ok">✔ Correct${clean ? ' <span class="xpgain">+10 XP</span>' : ' (with help, no XP)'}</span>${sol(false)}`;
        math(fb); finish(true, clean); return;
      }
      attempts++;
      if (res.wrong) inputs.forEach((i, k) => i.classList.toggle('wrong', !!res.wrong[k]));
      if (opts.drill) {
        fb.innerHTML = `<span class="no">✘ Not this time. The answer was: ${answerText(q)}</span>${sol(true)}`;
        math(fb); finish(false, false); return;
      }
      let h = `<span class="no">✘ Not quite.${res.note ? ' ' + res.note : ' Look at the red box(es) and check your working.'}</span>`;
      if (attempts >= 2) h += `<div class="actions"><button class="btn ghost showsol">Show me the worked solution</button></div>`;
      fb.innerHTML = h;
      const ss = fb.querySelector('.showsol');
      if (ss) ss.onclick = () => { fb.innerHTML = `<span class="no">Answer: ${answerText(q)}</span>${sol(true)}`; math(fb); finish(false, false); };
    }
    chk.onclick = check;
    inputs.forEach((i) => i.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); }));
    const hb = card.querySelector('.hintbtn');
    if (hb) hb.onclick = () => {
      if(!usedHint)window.LearningTracker?.event('hint',{topic:q.topic});usedHint = true;
      const h = fb.querySelector('.hint') || fb.appendChild(el('div', 'hint'));
      h.innerHTML = '💡 ' + q.hint; math(h);
    };
    math(card);
    if (inputs[0]) inputs[0].focus();
  }

  /* ---------- blocks ---------- */
  const blocks = {
    goal(b) {
      return el('section', 'block goal key', `<span class="tag">🎯 Mission</span><ul>${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`);
    },
    html(b) { return el('section', 'block', b.html); },

    ask(b) {
      const w = el('section', 'block', `<span class="tag">🗣️ Say it out loud</span><p class="asktext">${b.say}</p>
        <button class="btn">Show the model answer</button><div class="reveal" hidden>${b.reveal}</div>`);
      const btn = w.querySelector('button'), r = w.querySelector('.reveal');
      btn.onclick = () => { r.hidden = !r.hidden; btn.textContent = r.hidden ? 'Show the model answer' : 'Hide the model answer'; math(r); };
      return w;
    },

    predict(b) {
      const w = el('section', 'block', `<span class="tag">🔮 Predict it</span><p class="asktext">${b.q}</p><div class="opts"></div><div class="pfb"></div>`);
      const opts = w.querySelector('.opts'), fb = w.querySelector('.pfb'); let tries = 0, solved = false;
      b.options.forEach((o) => {
        const btn = el('button', 'opt', o.text); opts.appendChild(btn);
        btn.onclick = () => {
          if (solved) return;
          if(tries===0)window.LearningTracker?.event('answer',{topic:'predict',correct:o.ok});
          if (o.ok) {
            solved = true; btn.classList.add('right');
            const first = tries === 0;
            if(!first)window.LearningTracker?.event('correction',{topic:'predict'});Store.record('predict', first,true); Store.clear(b.id);
            fb.innerHTML = `<div class="reveal"><b>Yes!${first ? ' <span class="xpgain">+10 XP</span>' : ''}</b> ${o.why || ''}<br>${b.explain || ''}</div>`;
          } else {
            tries++; btn.classList.add('wrong'); btn.disabled = true;
            fb.innerHTML = `<div class="hint">Not that one. ${o.why || 'Think again.'}</div>`;
          }
          math(fb);
        };
      });
      math(w); return w;
    },

    fixed(b) {
      const w = el('section', 'block', `<span class="tag">${b.tag}</span><h3>${b.title}</h3><p class="muted">${b.intro || ''}</p><div class="qhost"></div>`);
      mountQuestion(w.querySelector('.qhost'), Object.assign({ kind: 'set', tol: 1e-6, hint: '', solution: '', topic: 'story' }, b.q), { hints: true, onDone: (ok) => { if (ok) Store.clear(b.id); } });
      return w;
    },

    think(b) {
      const w = el('section', 'block', `<span class="tag">✍️ Explain it</span><p>${b.prompt}</p>
        <textarea placeholder="Type your explanation here..."></textarea>
        <div class="actions"><button class="btn">Compare with the model answer</button></div><div class="reveal" hidden>${b.model}</div>`);
      const ta = w.querySelector('textarea'); ta.value = Store.d.notes[b.id] || '';
      ta.oninput = () => { Store.d.notes[b.id] = ta.value; Store.save(); bump(); };
      const r = w.querySelector('.reveal');
      w.querySelector('button').onclick = () => { r.hidden = !r.hidden; math(r); };
      return w;
    },

    widget(b) {
      const w = el('section', 'block'); if (b.id) w.dataset.id = b.id; widgets[b.name](w); math(w); return w;
    },

    practice(b) {
      const w = el('section', 'block');
      w.innerHTML = `<span class="tag">⚡ Level up</span><h3>${b.title}</h3><p class="muted">${b.intro || ''}</p>
        <div class="dots"></div><div class="qhost"></div>`;
      const rc = recipeFor(b.topics[0]);
      if (rc) w.querySelector('.dots').insertAdjacentHTML('beforebegin', `<details class="recipe"><summary>📘 Open the recipe: ${rc.title}</summary>${recipeHtml(rc)}</details>`);
      const dots = w.querySelector('.dots'), host = w.querySelector('.qhost');
      let streak = 0;
      function drawDots() {
        dots.innerHTML = Array.from({ length: b.need }, (_, i) => `<i class="${i < streak ? 'on' : ''}"></i>`).join('') +
          `<span class="muted">&nbsp;${streak}/${b.need} in a row</span>` + (Store.d.cleared[b.id] ? '<span class="cleared">✔ cleared</span>' : '');
      }
      function nextQ() {
        const q = generate(b.topics[Math.floor(Math.random() * b.topics.length)]);
        mountQuestion(host, q, {
          hints: true,
          onDone: (ok, clean) => {
            streak = clean ? streak + 1 : 0;
            if (streak >= b.need) Store.clear(b.id);
            drawDots();
            const cleared = streak >= b.need;
            const bar = el('div', 'actions', `<button class="btn primary">${cleared ? 'Cleared! Keep practising' : 'Next question'}</button>`);
            host.querySelector('.qcard').appendChild(bar);
            bar.querySelector('button').onclick = () => { if (cleared) streak = 0; drawDots(); nextQ(); };
          },
        });
      }
      drawDots(); nextQ();
      return w;
    },

    errors(b) {
      const w = el('section', 'block', `<span class="tag">🕵️ Bug hunt</span><h3>${b.title}</h3><p class="muted">Find the bug: click the line where the first mistake happens.</p>`);
      const found = new Set();
      b.items.forEach((it) => {
        const box = el('div', '', `<div class="etitle">${it.title}</div>`);
        const info = el('div', 'einfo');
        it.lines.forEach((ln, idx) => {
          const btn = el('button', 'eline', `\\(${ln}\\)`);
          btn.onclick = () => {
            if (idx === it.wrong) { btn.classList.add('ok'); found.add(it); if (found.size === b.items.length) Store.clear(b.id); info.innerHTML = `<div class="reveal"><b>Found it.</b> ${it.why}</div>`; }
            else { btn.classList.add('no'); info.innerHTML = '<div class="muted">That line is fine. Look again.</div>'; }
            math(info);
          };
          box.appendChild(btn);
        });
        box.appendChild(info); w.appendChild(box);
      });
      return w;
    },

    paper(b) { const t = isTeacher(); return checklistBlock('📝 Paper time', b.title, b.tasks, t ? b.checks : null, t ? b.tip : null, 'paper-' + b.title); },
    teachback(b) { return checklistBlock('🎤 Teach it back', b.title, null, b.checks, null, 'tb-' + b.title, b.prompt); },

    drill(b) { return drillBlock(b); },
    mock(b) { return mockBlock(b); },
    recipe(b) { const r = RECIPES.find((x) => x.id === b.id); return el('section', 'block recipecard', `<span class="tag">📘 The recipe</span>${recipeHtml(r)}`); },

    done(b, day) {
      const d = DAYS.find((x) => x.n === day), w = el('section', 'block finish');
      function paint() {
        if (Store.d.done[day]) {
          w.innerHTML = `<b style="color:var(--good)">🏁 Level ${day} complete!</b> <a class="btn" href="#/">Back to the map</a>${isTeacher() ? ' <button class="btn ghost undo">Undo (teacher)</button>' : ''}`;
          const u = w.querySelector('.undo'); if (u) u.onclick = () => { Store.d.done[day] = false; Store.save(); hud(); paint(); };
          return;
        }
        const p = dayProgress(d), ready = p.frac >= 1;
        w.innerHTML = `<span class="tag">🏁 Finish line</span><p>${ready ? 'Every task is cleared. Grab the flag!' : `Clear every task to reach the flag: <b>${p.c} of ${p.n}</b> done.`}</p>
          <button class="btn primary big" ${ready || isTeacher() ? '' : 'disabled'}>🏁 Finish Level ${day}</button>${!ready && isTeacher() ? ' <span class="muted">(teacher override)</span>' : ''}`;
        w.querySelector('button').onclick = () => { Store.d.done[day] = true; Store.save(); hud(); levelUp(day); };
      }
      const h = () => { if (!w.isConnected) { window.removeEventListener('kq-progress', h); return; } if (!Store.d.done[day]) paint(); };
      window.addEventListener('kq-progress', h); paint(); return w;
    },
  };

  function levelUp(day) {
    const n = doneCount(), ov = el('div', 'lvlup');
    const last = n >= DAYS.length;
    ov.innerHTML = `<div class="lvl-card"><div class="burst">⭐</div><h2>LEVEL UP!</h2>
      <p class="big">Level ${day} complete</p><p>New rank: <b class="rank">${RANKS[n]}</b></p><p class="coins">+50 🪙 bonus</p>
      <button class="btn primary big">${last ? 'Enter the castle 🏰' : 'Walk to the next level →'}</button></div>`;
    const colors = ['#b6ff3b', '#3be8ff', '#ff4fa3', '#ffd23b', '#a78bff'];
    for (let i = 0; i < 70; i++) {
      const c = el('i', 'confetti'); c.style.left = Math.random() * 100 + '%'; c.style.background = colors[i % colors.length];
      c.style.animationDelay = Math.random() * 1.2 + 's'; c.style.animationDuration = 2 + Math.random() * 2 + 's'; c.style.transform = `rotate(${Math.random() * 360}deg)`;
      ov.appendChild(c);
    }
    document.body.appendChild(ov);
    ov.querySelector('button').onclick = () => { ov.remove(); const atHome = location.hash === '#/' || location.hash === ''; location.hash = '#/'; if (atHome) route(); };
  }

  function levelBar(d) {
    const w = el('div', 'levelbar', `<div class="lb-top"><b>Level ${d.n}</b><span class="lbtxt"></span></div>
      <div class="track"><i class="fill"></i><span class="lb-hero"></span><span class="flag">🏁</span></div>`);
    function paint() {
      const p = dayProgress(d), pct = Math.round(p.frac * 100);
      w.querySelector('.lbtxt').textContent = Store.d.done[d.n] ? 'Level complete!' : `${p.c} of ${p.n} tasks cleared`;
      w.querySelector('.fill').style.width = pct + '%';
      const h = w.querySelector('.lb-hero'); h.style.left = `calc(${pct}% - 14px)`; h.textContent = Store.d.avatar || '🦊';
    }
    const h = () => { if (!w.isConnected) { window.removeEventListener('kq-progress', h); return; } paint(); };
    window.addEventListener('kq-progress', h); paint(); return w;
  }

  function mapPoints() { const N = DAYS.length; return Array.from({ length: N + 1 }, (_, i) => ({ x: 62 + i * (676 / N), y: 210 + Math.sin(i * 1.25) * 56 })); }

  function worldMap() {
    const N = DAYS.length, pts = mapPoints(), done = doneCount(), cur = Math.min(done, N);
    let road = '', gold = '', coins = '', nodes = '';
    for (let i = 0; i < N; i++) {
      const a = pts[i], b = pts[i + 1], seg = `M${a.x},${a.y} L${b.x},${b.y} `;
      road += seg; if (i < done) gold += seg;
      if (i >= done) [0.33, 0.66].forEach((t) => { coins += `<circle class="coin" cx="${a.x + (b.x - a.x) * t}" cy="${a.y + (b.y - a.y) * t - 4}" r="7"/>`; });
    }
    pts.forEach((p, i) => {
      if (i === N) {
        const open = done >= N - 1;
        nodes += `<a href="${open ? '#/wake' : '#'}" class="mnode ${open ? 'open' : 'lock'}"><text x="${p.x}" y="${p.y + 12}" text-anchor="middle" font-size="46">🏰</text><text x="${p.x}" y="${p.y + 40}" text-anchor="middle" class="mlabel">${open ? 'Wake-up test' : '🔒 Castle'}</text></a>`;
        return;
      }
      const state = i < done ? 'done' : i === done ? 'cur' : 'lock';
      nodes += `<a href="${state === 'lock' ? '#' : '#/day/' + (i + 1)}" class="mnode ${state}">
        ${state === 'cur' ? `<circle class="pulse" cx="${p.x}" cy="${p.y}" r="26"/>` : ''}<circle class="mc" cx="${p.x}" cy="${p.y}" r="22"/>
        <text x="${p.x}" y="${p.y + 7}" text-anchor="middle" class="mnum">${state === 'lock' ? '🔒' : i + 1}</text>
        ${state === 'done' ? `<text x="${p.x + 15}" y="${p.y - 15}" font-size="18">⭐</text>` : ''}
        <text x="${p.x}" y="${p.y + 44}" text-anchor="middle" class="mlabel">${SHORT[i]}</text></a>`;
    });
    return `<svg class="mapsvg" viewBox="0 0 800 380" role="img" aria-label="World map">
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b1b77"/><stop offset="1" stop-color="#5a3cc8"/></linearGradient>
      <pattern id="brick" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="#7a4a2b"/><path d="M0 0H40M0 10H40M20 0V10M0 10V20" stroke="#4d2c16" stroke-width="2" fill="none"/></pattern></defs>
      <rect width="800" height="380" fill="url(#sky)"/>
      <g class="cloud c1"><ellipse cx="120" cy="60" rx="46" ry="16" fill="#fff" opacity=".85"/><ellipse cx="150" cy="52" rx="30" ry="14" fill="#fff" opacity=".85"/></g>
      <g class="cloud c2"><ellipse cx="560" cy="44" rx="52" ry="16" fill="#fff" opacity=".8"/><ellipse cx="590" cy="36" rx="30" ry="13" fill="#fff" opacity=".8"/></g>
      <path d="M0 320 Q120 230 240 320 T480 320 T720 320 L800 320 V380 H0Z" fill="#2f9e5a" opacity=".55"/>
      <path d="M0 340 Q160 270 320 340 T640 340 T800 330 V380 H0Z" fill="#3cc46e" opacity=".55"/>
      <rect y="338" width="800" height="42" fill="url(#brick)"/><rect y="334" width="800" height="8" fill="#5ee38d"/>
      <path d="${road}" class="road"/><path d="${gold}" class="road gold"/>${coins}${nodes}
      <g id="hero"><text class="hero-emoji" text-anchor="middle" font-size="36" y="-30">${Store.d.avatar || '🦊'}</text></g></svg>`;
  }

  function walkHero(svg, from, to) {
    const hero = svg.querySelector('#hero'), pts = mapPoints();
    const place = (x, y) => hero.setAttribute('transform', `translate(${x},${y})`);
    if (from >= to) { place(pts[to].x, pts[to].y); return; }
    place(pts[from].x, pts[from].y);
    const per = 900, total = (to - from) * per, t0 = performance.now();
    (function step(now) {
      const t = Math.max(0, Math.min(now - t0, total)), seg = Math.min(Math.floor(t / per), to - from - 1), u = (t - seg * per) / per;
      const a = pts[from + seg], b = pts[from + seg + 1];
      place(a.x + (b.x - a.x) * u, a.y + (b.y - a.y) * u - Math.abs(Math.sin(u * Math.PI * 2)) * 16);
      if (t < total) requestAnimationFrame(step); else place(pts[to].x, pts[to].y);
    })(t0);
  }

  function checklistBlock(tag, title, tasks, checks, tip, key, prompt) {
    const w = el('section', 'block');
    let h = `<span class="tag">${tag}</span><h3>${title}</h3>`;
    if (prompt) h += `<p>${prompt}</p>`;
    if (tasks) h += `<ol>${tasks.map((t) => `<li>${t}</li>`).join('')}</ol>`;
    if (checks) h += `<p class="muted"><b>${tag === '📝 Paper time' ? 'Parent check:' : 'Tick what you saw:'}</b></p><ul class="chk">${checks.map((c, i) =>
      `<li><label><input type="checkbox" data-k="${key}-${i}" ${Store.d.checks[key + '-' + i] ? 'checked' : ''}><span>${c}</span></label></li>`).join('')}</ul>`;
    if (tip) h += `<div class="callout"><b>Tip for you:</b> ${tip}</div>`;
    w.innerHTML = h;
    w.querySelectorAll('input').forEach((i) => { i.onchange = () => { Store.d.checks[i.dataset.k] = i.checked; Store.save(); }; });
    return w;
  }

  /* ---------- drill / test ---------- */
  function drillBlock(b) {
    const w = el('section', 'block drill');
    function intro() {
      w.innerHTML = `<span class="tag">${b.test ? '🔥 Boss fight' : '🧊 Cold start'}</span><h3>${b.title}</h3><p class="muted">${b.intro || ''}</p>
        <button class="btn primary big">Start (${b.n} questions${b.minutes ? ', ' + b.minutes + ' min' : ''})</button>`;
      w.querySelector('button').onclick = start;
    }
    function start() {
      const pool = b.topics === 'weak' ? weakTopics() : b.topics || allTopics(b.maxDay);
      const qs = []; let bag = [];
      while (qs.length < b.n) { if (!bag.length) bag = shuffle(pool); qs.push(generate(bag.pop())); }
      const results = []; let i = 0, left = (b.minutes || 0) * 60, tick = null;
      function end(timeUp) {
        if (tick) { clearInterval(tick); }
        const score = results.filter((r) => r.ok).length;
        const missed = [...new Set(results.filter((r) => !r.ok).map((r) => TOPICS[r.topic].name))];
        Store.d.drills.push({ id: b.id, score, n: b.n, when: Date.now() }); Store.save(); bump();
        w.innerHTML = `<span class="tag">Result</span><h3>${b.title}</h3>${timeUp ? '<p class="muted">Time is up.</p>' : ''}
          <div class="score">${score} / ${b.n}</div>
          ${b.pass ? (score >= b.pass ? `<p class="ok" style="color:var(--good);font-weight:800">✔ Passed! (pass mark ${b.pass})</p>` : `<p class="no" style="color:var(--bad);font-weight:700">Pass mark is ${b.pass}. Fix the topics below and try again.</p>`) : ''}
          ${missed.length ? `<p>Topics to revisit:</p><ul class="breakdown">${missed.map((m) => `<li>${m}</li>`).join('')}</ul>` : '<p><b>Perfect. No topics to revisit.</b></p>'}
          <div class="actions"><button class="btn primary">Try again with new questions</button></div>`;
        w.querySelector('button').onclick = start;
      }
      function show() {
        if (i >= b.n) return end(false);
        w.innerHTML = `<div class="drillbar"><span class="tag">${b.title}: question ${i + 1} of ${b.n}</span>${b.minutes ? `<span class="timer" id="tm">${mmss(left)}</span>` : ''}</div><div class="qhost"></div>`;
        mountQuestion(w.querySelector('.qhost'), qs[i], {
          drill: true, hints: false,
          onDone: (ok) => {
            results.push({ topic: qs[i].topic, ok });
            const nb = el('div', 'actions', `<button class="btn primary">${i + 1 >= b.n ? 'See my score' : 'Next question'}</button>`);
            w.querySelector('.qcard').appendChild(nb);
            nb.querySelector('button').onclick = () => { i++; show(); };
            nb.querySelector('button').focus();
          },
        });
      }
      if (b.minutes) {
        tick = setInterval(() => {
          left--; const t = w.querySelector('#tm'); if (t) t.textContent = mmss(Math.max(left, 0));
          if (left <= 0) { clearInterval(tick); for (let k = results.length; k < b.n; k++) results.push({ topic: qs[k].topic, ok: false }); end(true); }
        }, 1000);
        timers.push(tick);
      }
      show();
    }
    intro();
    return w;
  }

  /* ---------- recipes: the fixed steps for each kind of problem ---------- */
  const recipeFor = (topic) => RECIPES.find((r) => (r.topics || []).includes(topic));
  function recipeHtml(r) {
    return `<h4>${r.title}</h4><p class="muted">${r.when || ''}</p>${r.html ? r.html : `<ol class="recipe-steps">${r.steps.map((x) => `<li>${x}</li>`).join('')}</ol>`}` +
      (r.example ? `<div class="callout">${r.example}</div>` : '') + (r.tip ? `<p class="muted"><b>Watch out:</b> ${r.tip}</p>` : '');
  }
  function rulesPage() {
    root.innerHTML = `<p><a href="#/">← Back to the map</a></p><h1>📘 The Rulebook</h1><p class="sub">Maths runs on rules. Learn the steps once, then every problem is just the same steps joined together.</p>` +
      RECIPES.map((r) => `<details class="block recipe" ${r.open ? 'open' : ''}><summary><b>${r.title}</b></summary>${recipeHtml(r)}</details>`).join('');
    math(root);
  }

  /* ---------- timed mock paper ---------- */
  function markItem(q, vals, marks) {
    if (q.kind === 'tuple') {
      const ok = q.answer.map((a, i) => { const n = parseNum(vals[i] || ''); const t = Array.isArray(q.tol) ? q.tol[i] : q.tol; return !Number.isNaN(n) && Math.abs(n - a) <= t; });
      const k = ok.filter(Boolean).length;
      return { earned: Math.round(((marks * k) / ok.length) * 2) / 2, full: k === ok.length };
    }
    const r = checkAnswer(q, vals);
    return r.ok ? { earned: marks, full: true } : { earned: 0, full: false };
  }

  function mockBlock(b) {
    const w = el('section', 'block mock');
    const secMarks = (sec) => sec.items.reduce((a, i) => a + i.marks, 0), total = b.sections.reduce((a, sec) => a + secMarks(sec), 0);
    function intro() {
      w.innerHTML = `<span class="tag">📄 Mock paper</span><h3>${b.title}</h3><p class="muted">${b.intro || ''}</p>
        <ul>${b.sections.map((sec) => `<li>${sec.name} <span class="muted">[${secMarks(sec)} marks]</span></li>`).join('')}</ul>
        <p><b>${total} marks · ${b.minutes} minutes</b>${b.pass ? ` · pass mark ${b.pass}` : ''}. Work on paper, then type your final answers. Nothing is marked until you hand in.</p>
        <button class="btn primary big">Start the paper</button>`;
      w.querySelector('button').onclick = start;
    }
    function start() {
      let no = 0, left = b.minutes * 60, tick = null, done = false, armed = false;
      const paper = b.sections.map((sec) => ({ name: sec.name, items: sec.items.map((it) => ({ q: generate(it.pool[Math.floor(Math.random() * it.pool.length)]), marks: it.marks })) }));
      w.innerHTML = `<div class="drillbar mockbar"><span class="tag">📄 ${b.title}</span><span class="timer" id="mtm">${mmss(left)}</span></div><div class="paper"></div>
        <div class="actions"><button class="btn primary big" id="handin">Hand in the paper</button></div>`;
      const host = w.querySelector('.paper');
      paper.forEach((sec) => {
        host.appendChild(el('h3', 'psec', `${sec.name} <span class="muted">[${secMarks({ items: sec.items })}]</span>`));
        sec.items.forEach((it) => {
          it.no = ++no;
          it.card = el('div', 'mockq', `<div class="qno">Question ${it.no} <span class="marks">[${it.marks} marks]</span></div><div class="prompt">${it.q.prompt}</div>
            <div class="fields${it.q.fields.length >= 5 ? ' grid' : ''}">${it.q.fields.map((f, i) => `<label class="field"><span>${f}</span><input type="text" class="${it.q.kind === 'factor' ? 'wide' : ''}" autocomplete="off" spellcheck="false" data-i="${i}" ${it.q.kind === 'set' ? 'placeholder="e.g. 2, -5"' : it.q.placeholder ? `placeholder="${it.q.placeholder}"` : ''}></label>`).join('')}</div>`);
          host.appendChild(it.card);
        });
      });
      math(host);
      function finish(timeUp) {
        if (done) return; done = true; clearInterval(tick);
        let earned = 0; const missed = new Set();
        const rows = paper.map((sec) => `<h3 class="psec">${sec.name}</h3>` + sec.items.map((it) => {
          const vals = [...it.card.querySelectorAll('input')].map((i) => i.value), m = markItem(it.q, vals, it.marks);
          earned += m.earned; Store.record(it.q.topic, m.full); if (!m.full) missed.add(TOPICS[it.q.topic].name);
          return `<div class="mockq ${m.full ? 'full' : m.earned > 0 ? 'part' : 'none'}"><div class="qno">Question ${it.no} <span class="marks">${m.earned} / ${it.marks}</span></div><div class="prompt">${it.q.prompt}</div>
            <p><b>Your answer:</b> ${vals.map((v) => v || '(blank)').join(' | ')}</p><p><b>Correct answer:</b> ${answerText(it.q)}</p>
            <details class="sol"><summary>Worked solution</summary>${it.q.solution}</details></div>`;
        }).join('')).join('');
        Store.d.drills.push({ id: b.id, score: earned, n: total, when: Date.now() }); Store.save(); bump();
        const passed = b.pass ? earned >= b.pass : null;
        w.innerHTML = `<span class="tag">Result</span><h3>${b.title}</h3>${timeUp ? '<p class="muted">Time is up.</p>' : ''}
          <div class="score">${earned} / ${total}</div>
          ${b.pass ? (passed ? `<p style="color:var(--good);font-weight:800">✔ Passed (pass mark ${b.pass})</p>` : `<p style="color:var(--bad);font-weight:700">Pass mark is ${b.pass}. Review the worked solutions below and try a new paper.</p>`) : ''}
          ${missed.size ? `<p>Topics to revisit:</p><ul class="breakdown">${[...missed].map((m) => `<li>${m}</li>`).join('')}</ul>` : '<p><b>Full marks. Nothing to revisit.</b></p>'}
          <div class="actions"><button class="btn primary" id="again">Try a new paper</button></div>${rows}`;
        w.querySelector('#again').onclick = start; math(w);
      }
      tick = setInterval(() => { left--; const t = w.querySelector('#mtm'); if (t) t.textContent = mmss(Math.max(left, 0)); if (left <= 0) finish(true); }, 1000);
      timers.push(tick);
      const hb = w.querySelector('#handin');
      hb.onclick = () => {
        if (!armed) { armed = true; hb.textContent = 'Click again to hand in (no changes after this)'; setTimeout(() => { armed = false; if (!done) hb.textContent = 'Hand in the paper'; }, 5000); return; }
        finish(false);
      };
    }
    intro(); return w;
  }

  /* ---------- pages ---------- */
  function cardHtml(d) {
    return `<a class="daycard ${Store.d.done[d.n] ? 'done' : ''}" href="#/day/${d.n}">
      ${Store.d.done[d.n] ? '<span class="check">✔</span>' : ''}<span class="num">${d.n}</span>
      <div class="n">Level ${d.n} · about ${d.minutes} min</div><div class="t">${d.title}</div><div class="muted">${d.tagline}</div></a>`;
  }

  function home() {
    if (isTeacher()) return teacherHome();
    const next = DAYS.find((d) => !Store.d.done[d.n]), cur = Math.min(doneCount(), DAYS.length);
    root.innerHTML = `
      <section class="hero"><h1>Quadratic and Fractional Equations</h1>
      <p class="sub">Walk your hero to the castle. You clear a level by finishing every task <i>and</i> getting the ideas right.</p></section>
      <div class="mapwrap">${worldMap()}</div>
      <div class="actions mapactions">${next
        ? `<a class="btn primary big" href="#/day/${next.n}">▶ Play Level ${next.n}: ${next.title}</a>`
        : `<a class="btn primary big" href="#/wake">🏰 Enter the castle</a>`}</div>
      <div class="hero-pick"><span class="muted">Your hero:</span> ${AVATARS.map((a) => `<button class="av-btn ${a === Store.d.avatar ? 'on' : ''}" data-a="${a}">${a}</button>`).join('')}</div>
      <div class="actions"><a class="btn big" href="#/wake">⏰ Wake-up mode</a>${doneCount() >= 8 ? '<a class="btn big" href="#/mock">📄 Mock paper</a>' : ''}<a class="btn big" href="#/progress">Stats</a></div>`;
    root.querySelectorAll('.av-btn').forEach((b) => { b.onclick = () => { Store.d.avatar = b.dataset.a; Store.save(); hud(); home(); }; });
    const from = Math.min(Store.d.pos || 0, cur);
    walkHero(root.querySelector('.mapsvg'), from, cur);
    Store.d.pos = cur; Store.save();
  }

  function teacherHome() {
    const doneCount = DAYS.filter((d) => Store.d.done[d.n]).length;
    root.innerHTML = `
      <section class="hero">
        <h1>Quadratic and Fractional Equations</h1>
        <p class="muted">🧑‍🏫 Teacher view. The student does not see this page, the teach-back checklists, or the paper-task checks.</p>
        ${Cloud.enabled && Cloud.role === 'teacher' ? '<div class="block key" id="snap"><span class="tag">👀 Student progress</span><p class="muted">Loading…</p></div>' : ''}
        <p class="sub">${DAYS.length} missions. Learn it, rebuild it from scratch, and own it. Earn XP for every answer you get right first time.</p>
        <div class="block key"><span class="tag">💡 The one big idea</span><p>${SPINE}</p></div>
        <details class="block"><summary><b>How to use this with a student</b></summary>
          <ul>
            <li>Sit beside him. He types and works on paper. You ask the questions.</li>
            <li><b>Make him commit before he sees.</b> The "Predict it" boxes ask him to choose an answer first. Ask him to say <i>why</i> out loud before he clicks.</li>
            <li>The "Teach it back" and paper-task checklists only show in teacher mode.</li>
            <li>If he is wrong, do not fix it. Ask: "Where did this step come from?" or "What would happen if we checked this?"</li>
            <li>Every day starts with a cold start from earlier days. This is what makes it stick.</li>
            <li>Working goes on paper. Keep the paper: it is useful revision.</li>
            <li>His answers and progress are saved in this browser on this computer.</li>
          </ul></details>
      </section>
      <h2>Your missions <span class="pill">${doneCount} of ${DAYS.length} complete</span></h2>
      <div class="days">${DAYS.map((d) => `
        <a class="daycard ${Store.d.done[d.n] ? 'done' : ''}" href="#/day/${d.n}">
          ${Store.d.done[d.n] ? '<span class="check">✔</span>' : ''}<span class="num">${d.n}</span>
          <div class="n">Level ${d.n} · about ${d.minutes} min</div>
          <div class="t">${d.title}</div><div class="muted">${d.tagline}</div></a>`).join('')}</div>
      <h2>Any time</h2>
      <div class="actions"><a class="btn primary big" href="#/wake" style="text-decoration:none">⏰ Wake-up mode</a>
      <a class="btn big" href="#/progress" style="text-decoration:none">Stats</a></div>`;
    if (Cloud.enabled && Cloud.role === 'teacher') {
      const box = document.getElementById('snap');
      Cloud.listStudents().then((list) => {
        box.innerHTML = '<span class="tag">👀 Student progress</span>' + (list.length ? list.map(snapshotHtml).join('') + '<div class="actions"><a class="btn primary" href="#/review">Full report →</a></div>' : '<p class="muted">No student has signed in and saved progress yet.</p>');
      }).catch((e) => { box.innerHTML = `<span class="tag">👀 Student progress</span><p class="no">Could not load (${(e && (e.code || e.message)) || 'unknown error'}). Hard-refresh the page and try again.</p>`; });
    }
  }

  function snapshotHtml(d) {
    Store.migrate(d);
    const done = DAYS.filter((x) => (d.done || {})[x.n]).length, cleared = Object.keys(d.cleared || {}).length;
    const weak = Object.keys(TOPICS).filter((t) => ((d.stats || {})[t] || {}).t >= 2).map((t) => ({ t, acc: d.stats[t].c / d.stats[t].t })).sort((a, b) => a.acc - b.acc).slice(0, 3);
    const answered = Object.values(d.stats || {}).reduce((a, x) => a + x.t, 0);
    return `<p><b>${d._name || d._email}</b> <span class="muted">${d._email}</span><br>Levels complete: <b>${done} of ${DAYS.length}</b> · Tasks cleared: <b>${cleared}</b> · Questions answered: <b>${answered}</b><br>
      <span class="muted">Last saved: ${d.updated ? new Date(d.updated).toLocaleString() : 'never'}</span><br>
      ${weak.length ? `Needs most work: ${weak.map((w) => `${TOPICS[w.t].name} (${Math.round(w.acc * 100)}%)`).join(', ')}` : 'Not enough answers yet to show weak spots.'}</p>`;
  }

  function day(n) {
    const d = DAYS.find((x) => x.n === n);
    if (!d) return home();
    if (!isTeacher() && n > 1 && !Store.d.done[n - 1]) {
      root.innerHTML = `<div class="block"><span class="tag">🔒 Locked</span><h3>Finish Level ${n - 1} first</h3><p>Clear every task in the level before it to unlock this one.</p><a class="btn primary" href="#/day/${n - 1}">Go to Level ${n - 1}</a></div>`;
      return;
    }
    root.innerHTML = `<p><a href="#/">← Back to the map</a></p><h1>Level ${d.n}: ${d.title}</h1><p class="muted">${d.tagline} · about ${d.minutes} minutes</p>`;
    root.appendChild(levelBar(d));
    d.blocks.forEach((b) => { if (!isTeacher() && b.t === 'teachback') return; root.appendChild(blocks[b.t](b, d.n)); });
    const nav = el('div', 'actions');
    if (n > 1) nav.innerHTML += `<a class="btn" style="text-decoration:none" href="#/day/${n - 1}">← Level ${n - 1}</a>`;
    if (n < DAYS.length) nav.innerHTML += `<a class="btn primary" style="text-decoration:none" href="#/day/${n + 1}">Level ${n + 1} →</a>`;
    root.appendChild(nav);
  }

  function wake() {
    root.innerHTML = `<div class="wake"><h1>⏰ Wake-up mode</h1>
      <p>Ten random questions from the whole chapter, ten minutes, no hints, no topic labels. Wake up, sit down, solve.</p></div>`;
    root.appendChild(drillBlock({ id: 'wake', title: 'Wake-up test', maxDay: 8, n: 10, minutes: 10, test: true, intro: 'Questions come from every topic, shuffled. One try each.' }));
  }

  function progress() {
    const rows = Object.keys(TOPICS).map((t) => {
      const s = Store.d.stats[t] || { c: 0, t: 0 }, acc = s.t ? Math.round((100 * s.c) / s.t) : null;
      return `<tr><td>${TOPICS[t].name}</td><td>Level ${TOPICS[t].day}</td><td>${s.c}/${s.t}</td>
        <td style="width:30%"><div class="bar ${acc !== null && acc < 70 ? 'low' : ''}"><i style="width:${acc || 0}%"></i></div></td><td>${acc === null ? '–' : acc + '%'}</td></tr>`;
    }).join('');
    const drills = Store.d.drills.slice(-8).reverse().map((d) => `<li>${new Date(d.when).toLocaleString()}: <b>${d.score}/${d.n}</b> (${d.id})</li>`).join('');
    root.innerHTML = `<h1>Stats</h1>
      <p class="muted">Counts only first-try answers without hints. That is the honest number.</p>
      <div class="block"><table class="prog"><tr><th>Topic</th><th></th><th>Clean</th><th></th><th></th></tr>${rows}</table></div>
      <h2>Recent tests and cold starts</h2>${drills ? `<ul>${drills}</ul>` : '<p class="muted">Nothing yet.</p>'}
      <h2>Weakest topics right now</h2><p>${weakTopics().map((t) => TOPICS[t].name).join(', ')}</p>
      <div class="actions"><button class="btn ghost" id="reset">Reset all progress</button></div>`;
    root.querySelector('#reset').onclick = () => {
      if (confirm('Delete ALL progress, notes and ticks' + (Cloud.enabled ? ' for this account' : ' on this computer') + '?')) { Store.reset().then(() => location.reload()); }
    };
  }

  /* ---------- teacher report on a student's saved progress ---------- */
  function studentReport(email, d) {
    if (!d) return `<div class="block"><h3>${email}</h3><p class="muted">Has not signed in or saved anything yet.</p></div>`;
    Store.migrate(d);
    const done = DAYS.filter((x) => (d.done || {})[x.n]).length;
    const rows = Object.keys(TOPICS).map((t) => {
      const st = (d.stats || {})[t] || { c: 0, t: 0 }, acc = st.t ? Math.round((100 * st.c) / st.t) : null;
      return `<tr><td>${TOPICS[t].name}</td><td>${st.c}/${st.t}</td><td style="width:35%"><div class="bar ${acc !== null && acc < 70 ? 'low' : ''}"><i style="width:${acc || 0}%"></i></div></td><td>${acc === null ? '–' : acc + '%'}</td></tr>`;
    }).join('');
    const notes = [];
    DAYS.forEach((x) => x.blocks.filter((b) => b.t === 'think' && ((d.notes || {})[b.id] || '').trim()).forEach((b) =>
      notes.push(`<div class="etitle">Level ${x.n}: ${b.prompt}</div><div class="reveal">${(d.notes[b.id]).replace(/</g, '&lt;')}</div><details class="sol"><summary>Model answer</summary>${b.model}</details>`)));
    const drills = (d.drills || []).slice(-8).reverse().map((x) => `<li>${new Date(x.when).toLocaleString()}: <b>${x.score}/${x.n}</b> (${x.id})</li>`).join('');
    return `<div class="block"><h3>${d._name || email} <span class="muted">${email}</span></h3>
      <p>Levels complete: <b>${done} of ${DAYS.length}</b> · Last saved: ${d.updated ? new Date(d.updated).toLocaleString() : 'never'}</p>
      <table class="prog"><tr><th>Topic (first try, no hints)</th><th>Clean</th><th></th><th></th></tr>${rows}</table>
      <h3>His own explanations</h3>${notes.join('') || '<p class="muted">None written yet.</p>'}
      <h3>Recent tests</h3>${drills ? `<ul>${drills}</ul>` : '<p class="muted">None yet.</p>'}</div>`;
  }

  async function review() {
    if (!(Cloud.enabled && Cloud.role === 'teacher')) return home();
    root.innerHTML = '<h1>Student progress</h1><p class="muted">Loading…</p>';
    let html = '<h1>Student progress</h1><p class="muted">Read straight from the saved account data.</p>';
    try {
      const list = await Cloud.listStudents();
      html += list.length ? list.map((d) => studentReport(d._email, d)).join('') : '<div class="block"><p class="muted">No student has signed in and saved progress yet.</p></div>';
    } catch (e) { html += `<div class="block"><p class="no">Could not load the student's progress (${(e && (e.code || e.message)) || 'unknown error'}). Hard-refresh the page (Cmd+Shift+R) and try again. If it keeps happening, check the Firestore rules in SETUP.md.</p></div>`; }
    root.innerHTML = html; math(root);
  }

  function mockPage() {
    if (!(isTeacher() || doneCount() >= 8)) return home();
    root.innerHTML = '<p><a href="#/">← Back to the map</a></p><h1>📄 Mock paper</h1><p class="muted">A fresh paper every time, with new questions in the same layout.</p>';
    root.appendChild(mockBlock(Object.assign({}, MOCK_PAPER, { id: 'mock-free' })));
  }

  function coverage() {
    if (!isTeacher()) return home();
    const rows = COVERAGE.map((r) => `<tr><td><b>${r.sec}</b></td><td>${r.book}</td><td>${r.here}</td></tr>`).join('');
    const per = DAYS.map((d) => {
      const t = d.blocks.filter((b) => b.t === 'practice').flatMap((b) => b.topics);
      return `<li><b>Level ${d.n}</b> (${d.minutes} min): ${[...new Set(t)].map((x) => TOPICS[x].name).join(', ') || 'tests and repair'}</li>`;
    }).join('');
    root.innerHTML = `<h1>Coverage map</h1><p class="muted">Teacher view. Where each part of the book, and the extra Sec 3 material, is taught.</p>
      <div class="block"><table class="prog"><tr><th>Book</th><th>What</th><th>Where here</th></tr>${rows}</table></div>
      <h2>Practice topics by level</h2><ul>${per}</ul>
      <p class="muted">${Object.keys(TOPICS).length} auto-checked topics (${Object.values(TOPICS).filter((t) => t.stretch).length} marked Stretch, which are kept out of the tests and Wake-up mode), each generating unlimited fresh questions.</p>`;
  }

  function setupNav() {
    const nav = document.querySelector('.top nav');
    if (!Cloud.enabled) return;
    if (Cloud.role === 'teacher') nav.insertAdjacentHTML('afterbegin', '<a href="#/coverage">📋 Coverage</a><a href="#/review">👀 Student</a>');
    nav.insertAdjacentHTML('beforeend', `<a href="#" id="signout" title="Signed in as ${Cloud.email}">Sign out</a>`);
    document.getElementById('signout').onclick = (e) => { e.preventDefault(); Cloud.signOut(); };
  }

  /* ---------- router ---------- */
  function route() {
    if (!booted) return;
    clearTimers();
    const h = location.hash.replace(/^#/, '') || '/';
    if (h === '/teacher' || h === '/student') { setTeacher(h === '/teacher'); location.hash = '#/'; return; }
    let tb = document.getElementById('tbadge');
    if (!tb) { tb = document.createElement('a'); tb.id = 'tbadge'; tb.href = '#/student'; tb.textContent = '🧑‍🏫 Teacher mode · switch to student view'; document.querySelector('.top nav').appendChild(tb); }
    tb.hidden = !isTeacher();
    if (h.startsWith('/day/')) day(+h.split('/')[2]);
    else if (h === '/wake') wake();
    else if (h === '/progress') progress();
    else if (h === '/review') review();
    else if (h === '/coverage') coverage();
    else if (h === '/mock') mockPage();
    else if (h === '/rules') rulesPage();
    else if (h === '/coverage') coverage();
    else home();
    window.scrollTo(0, 0); math(root); hud(); document.documentElement.style.setProperty('--hh', document.querySelector('.top').offsetHeight + 'px');
  }
  window.addEventListener('hashchange', route);
  Cloud.ready()
    .then(() => { if (Cloud.enabled) Store.key = 'kq_v1_' + Cloud.email; Store.load(); return Cloud.merge(Store); })
    .then(() => { booted = true; document.body.classList.remove('locked'); setupNav(); route(); });
})();
