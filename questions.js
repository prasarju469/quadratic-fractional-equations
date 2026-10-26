/* Random question generators for the quadratics course.
   Every generator returns a fresh question, so a student cannot memorise answers; they have to know the method. */

const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[R(0, arr.length - 1)];
const nz = (a, b) => { let v = 0; while (v === 0) v = R(a, b); return v; };
const isSquare = (n) => n >= 0 && Number.isInteger(Math.sqrt(n));
const M = (tex) => `\\(${tex}\\)`;

const fmt = (n) => { let v = Math.round(n * 100) / 100; if (Object.is(v, -0)) v = 0; return String(v); };
const plus = (n) => (n === 0 ? "" : n < 0 ? `- ${fmt(-n)}` : `+ ${fmt(n)}`);
const par = (n) => (n < 0 ? `(${fmt(n)})` : fmt(n));
const lin = (r) => (r === 0 ? 'x' : r > 0 ? `x + ${fmt(r)}` : `x - ${fmt(-r)}`);
const fac = (root) => `(${lin(-root)})`;

function coefTerm(c, v, first) {
  if (c === 0) return '';
  const abs = Math.abs(c);
  const body = v === '' ? fmt(abs) : abs === 1 ? v : fmt(abs) + v;
  if (first) return (c < 0 ? '-' : '') + body;
  return (c < 0 ? ' - ' : ' + ') + body;
}
function poly(a, b, c) {
  let s = coefTerm(a, 'x^2', true);
  s += coefTerm(b, 'x', s === '');
  s += coefTerm(c, '', s === '');
  return s || '0';
}
const orList = (arr) => arr.map(fmt).join(' \\text{ or } ');

const mk = (o) => Object.assign({ kind: 'tuple', tol: 0.011, hint: '', solution: '' }, o);

/* ---------- Day 1 ---------- */
function gFactor() {
  let r1, r2;
  do { r1 = nz(-9, 9); r2 = nz(-9, 9); } while (r1 === r2 || r1 + r2 === 0);
  const b = -(r1 + r2), c = r1 * r2;
  return mk({
    topic: 'factor', kind: 'set', tol: 1e-6,
    prompt: `Solve ${M(poly(1, b, c) + '=0')} by factorising.`,
    fields: [M('x =')], answer: [r1, r2],
    hint: `Find two numbers that multiply to ${c} and add to ${b}.`,
    solution: `${M(poly(1, b, c) + '=0')}<br>${M(fac(r1) + fac(r2) + '=0')}<br>${M('x=' + orList([r1, r2]))}`,
  });
}

function gSqrt() {
  const r = nz(-7, 7);
  if (Math.random() < 0.5) {
    const k = R(2, 9);
    const ans = [-r + k, -r - k];
    return mk({
      topic: 'sqrt', kind: 'set', tol: 1e-6,
      prompt: `Solve ${M(`(${lin(r)})^2 = ${k * k}`)}.`,
      fields: [M('x =')], answer: ans,
      hint: 'Take the square root of both sides. Remember there are two square roots.',
      solution: `${M(`${lin(r)} = \\pm ${k}`)}<br>${M('x = ' + orList(ans))}`,
    });
  }
  const s = pick([2, 3, 5, 6, 7, 10, 11, 13, 14, 15]);
  const ans = [-r + Math.sqrt(s), -r - Math.sqrt(s)];
  return mk({
    topic: 'sqrt', kind: 'set',
    prompt: `Solve ${M(`(${lin(r)})^2 = ${s}`)}, giving answers to 2 decimal places.`,
    fields: [M('x =')], answer: ans,
    hint: 'Take the square root of both sides (both signs), then subtract or add to get x on its own.',
    solution: `${M(`${lin(r)} = \\pm\\sqrt{${s}}`)}<br>${M(`x = ${-r} \\pm\\sqrt{${s}}`)}<br>${M('x = ' + orList(ans))}`,
  });
}

function gCtsExpr() {
  const odd = Math.random() < 0.25;
  const b = odd ? pick([-9, -7, -5, -3, 3, 5, 7, 9]) : pick([-12, -10, -8, -6, -4, -2, 2, 4, 6, 8, 10, 12]);
  const c = R(-9, 9);
  const r = b / 2, u = c - r * r;
  return mk({
    topic: 'ctsx', tol: 0.006,
    prompt: `Write ${M(poly(1, b, c))} in the form ${M('(x+r)^2+u')}. Find ${M('r')} and ${M('u')}.` +
      (odd ? ' <span class="muted">(Fractions like 7/2 or decimals are fine.)</span>' : ''),
    fields: [M('r ='), M('u =')], answer: [r, u],
    hint: `r is half of the number in front of x. Then add ${M('r^2')} and take it away again.`,
    solution: `${M(`${poly(1, b, 0)} = (x ${plus(r)})^2 - ${par(r)}^2`)}<br>` +
      `${M(`${poly(1, b, c)} = (x ${plus(r)})^2 ${plus(c - r * r)}`)}<br>So ${M('r=' + fmt(r))} and ${M('u=' + fmt(u))}.`,
  });
}

/* ---------- Day 2 ---------- */
function gCtsSolve() {
  let b, c, D;
  do { b = nz(-10, 10); c = R(-9, 9); D = b * b - 4 * c; } while (D <= 0 || isSquare(D));
  const ans = [(-b + Math.sqrt(D)) / 2, (-b - Math.sqrt(D)) / 2];
  return mk({
    topic: 'ctss', kind: 'set',
    prompt: `Solve ${M(poly(1, b, c) + '=0')} by completing the square. Give answers to 2 decimal places.`,
    fields: [M('x =')], answer: ans,
    hint: `Move the constant to the right. Add ${M(`(${fmt(b / 2)})^2`)} to both sides. Then take square roots.`,
    solution: `${M(`x^2 ${plus(b)}x = ${fmt(-c)}`)}<br>` +
      `Add ${M(`(${fmt(b / 2)})^2 = ${fmt(b * b / 4)}`)} to both sides:<br>${M(`(x ${plus(b / 2)})^2 = ${fmt(D / 4)}`)}<br>` +
      `${M(`x ${plus(b / 2)} = \\pm\\sqrt{${fmt(D / 4)}}`)}<br>${M('x = ' + orList(ans))}`,
  });
}

function gFormula() {
  let a, b, c, D;
  do { a = pick([2, 3, 4, 5, -2, -3]); b = nz(-9, 9); c = nz(-9, 9); D = b * b - 4 * a * c; } while (D <= 0);
  const ans = [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)];
  const rearr = Math.random() < 0.35;
  const eq = rearr ? `${poly(a, b, 0)} = ${fmt(-c)}` : `${poly(a, b, c)} = 0`;
  return mk({
    topic: 'formula', kind: 'set',
    prompt: `Solve ${M(eq)}. Give answers to 2 decimal places.`,
    fields: [M('x =')], answer: ans,
    hint: rearr ? `First get everything on one side so it looks like ${M('ax^2+bx+c=0')}. Then find a, b, c (with signs!).`
      : `Write down a, b, c carefully with their signs: a = ${a}, b = ${b}, c = ${c}.`,
    solution: `${M(`a=${a},\\; b=${b},\\; c=${c}`)}<br>` +
      `${M(`x=\\dfrac{-${par(b)}\\pm\\sqrt{${par(b)}^2-4(${a})(${par(c)})}}{2(${a})}`)}<br>` +
      `${M(`=\\dfrac{${fmt(-b)}\\pm\\sqrt{${D}}}{${2 * a}}`)}<br>${M('x = ' + orList(ans))}`,
  });
}

function gDisc() {
  const kind = R(0, 2);
  let a, b, c;
  if (kind === 2) {
    do { a = nz(-4, 4); b = nz(-8, 8); c = R(-6, 6); } while (b * b - 4 * a * c <= 0);
  } else if (kind === 1) {
    a = pick([1, 2, 3, -1, -2]); const k = nz(-4, 4); b = 2 * a * k; c = a * k * k;
  } else {
    do { a = nz(-4, 4); b = R(-5, 5); c = Math.sign(a) * R(1, 9); } while (b * b - 4 * a * c >= 0);
  }
  const D = b * b - 4 * a * c;
  const n = D > 0 ? 2 : D === 0 ? 1 : 0;
  return mk({
    topic: 'disc', tol: 1e-6,
    prompt: `For ${M(poly(a, b, c) + '=0')}, work out ${M('b^2-4ac')} and say how many real solutions there are (0, 1 or 2).`,
    fields: [M('b^2-4ac ='), 'number of real solutions ='], answer: [D, n],
    hint: `Careful with signs: a = ${a}, b = ${b}, c = ${c}. If ${M('b^2-4ac')} is negative you cannot take its square root.`,
    solution: `${M(`b^2-4ac = ${par(b)}^2 - 4(${a})(${par(c)}) = ${D}`)}<br>` +
      (D > 0 ? 'Positive: two different real solutions.' : D === 0 ? 'Zero: one repeated solution (the graph just touches the x-axis).' : 'Negative: no real solutions (the graph never reaches the x-axis).'),
  });
}

/* ---------- Day 3 ---------- */
function gFrac() {
  if (Math.random() < 0.6) {
    let m, n, r1, r2, a;
    do {
      m = nz(-5, 5); n = nz(-5, 5); r1 = nz(-7, 7); r2 = -(m + n) - r1;
      a = (r1 + n) * (r1 + m);
    } while (r1 === r2 || r1 === -m || r2 === -m || a === 0 || Math.abs(a) > 36);
    const B = m + n, C = m * n - a;
    return mk({
      topic: 'frac', kind: 'set', tol: 1e-6,
      prompt: `Solve ${M(`\\dfrac{${a}}{${lin(m)}} = ${lin(n)}`)}.`,
      fields: [M('x =')], answer: [r1, r2],
      hint: `Multiply both sides by ${M(`(${lin(m)})`)} to remove the fraction. You should get a quadratic.`,
      solution: `${M(`${a} = (${lin(n)})(${lin(m)})`)}<br>${M(poly(1, B, C) + ' = 0')}<br>${M(fac(r1) + fac(r2) + '=0')}<br>` +
        `${M('x=' + orList([r1, r2]))} (neither makes the denominator zero)`,
    });
  }
  let r1, r2;
  do { r1 = nz(-8, 8); r2 = nz(-8, 8); } while (r1 === r2 || r1 + r2 === 0);
  const a = r1 * r2, b = r1 + r2;
  const lhs = a > 0 ? `x + \\dfrac{${a}}{x}` : `x - \\dfrac{${-a}}{x}`;
  return mk({
    topic: 'frac', kind: 'set', tol: 1e-6,
    prompt: `Solve ${M(`${lhs} = ${b}`)}.`,
    fields: [M('x =')], answer: [r1, r2],
    hint: `Multiply every term by x. Then move everything to one side.`,
    solution: `${M(`x^2 ${plus(a)} = ${par(b)}x`)}<br>${M(poly(1, -b, a) + '=0')}<br>${M(fac(r1) + fac(r2) + '=0')}<br>${M('x=' + orList([r1, r2]))}`,
  });
}

function gExtra() {
  let a, r, w, z;
  do { a = nz(-6, 6); r = nz(-6, 6); } while (a === r);
  w = nz(-3, 3); z = R(-6, 6);
  const u = w - a - r, v = z + a * r;
  return mk({
    topic: 'extra', kind: 'set', tol: 1e-6,
    prompt: `Solve ${M(`\\dfrac{${poly(1, u, v)}}{${lin(-a)}} = \\dfrac{${poly(0, w, z)}}{${lin(-a)}}`)}. ` +
      `<span class="muted">Type only the <b>valid</b> solution(s).</span>`,
    fields: [M('x =')], answer: [r],
    hint: `Multiply both sides by ${M(`(${lin(-a)})`)}, solve the quadratic, then test each answer in the ORIGINAL equation. What is x not allowed to be?`,
    solution: `${M(`${poly(1, u, v)} = ${poly(0, w, z)}`)}<br>${M(poly(1, u - w, v - z) + ' = 0')}<br>${M(fac(a) + fac(r) + '=0')}<br>` +
      `${M('x=' + orList([a, r]))}. But ${M('x=' + a)} makes the denominator ${M(lin(-a))} equal to 0, so it is rejected.<br>Only ${M('x=' + r)} is valid.`,
  });
}

/* ---------- Day 4 ---------- */
function gGraphFact() {
  let h, k;
  do {
    h = nz(-8, 8); k = nz(-8, 8);
    if (Math.random() < 0.7 && (h - k) % 2 !== 0) k += 1;
  } while (h === k || k === 0);
  const s = Math.random() < 0.5 ? 1 : -1;
  const mid = (h + k) / 2, ty = s * (mid - h) * (mid - k);
  return mk({
    topic: 'gfact', tol: 0.011,
    prompt: `The graph of ${M(`y = ${s < 0 ? '-' : ''}${fac(h)}${fac(k)}`)} is a ${s > 0 ? 'U-shape (minimum point)' : 'upside-down U (maximum point)'}. Find its x-intercepts and its turning point.`,
    fields: [M('\\text{smaller } x\\text{-intercept} ='), M('\\text{larger } x\\text{-intercept} ='), M('\\text{turning point } x ='), M('\\text{turning point } y =')],
    answer: [Math.min(h, k), Math.max(h, k), mid, ty],
    hint: 'The x-intercepts are where each bracket is zero. The turning point is exactly halfway between them. Put that x back into the equation to get y.',
    solution: `x-intercepts: ${M(`x=${h}`)} and ${M(`x=${k}`)}<br>Turning point x = ${M(`\\dfrac{${h}+${par(k)}}{2} = ${fmt(mid)}`)}<br>` +
      `y = ${M(`${s < 0 ? '-' : ''}(${fmt(mid)}${plus(-h)})(${fmt(mid)}${plus(-k)}) = ${fmt(ty)}`)}`,
  });
}

function gGraphCS() {
  const p = nz(-6, 6);
  const q = Math.random() < 0.25 ? 0 : nz(-9, 9);
  const s = Math.random() < 0.5 ? 1 : -1;
  const n = s > 0 ? (q < 0 ? 2 : q === 0 ? 1 : 0) : (q > 0 ? 2 : q === 0 ? 1 : 0);
  const eq = `y = ${s < 0 ? '-' : ''}(${lin(-p)})^2 ${q === 0 ? '' : plus(q)}`;
  return mk({
    topic: 'gcs', tol: 1e-6,
    prompt: `For the graph of ${M(eq)}, find the turning point and say how many times the graph cuts the x-axis (0, 1 or 2).`,
    fields: [M('\\text{turning point } x ='), M('\\text{turning point } y ='), 'number of x-intercepts ='],
    answer: [p, q, n],
    hint: `A square is never negative, so ${M(`(${lin(-p)})^2`)} is smallest (0) when ${M(lin(-p) + '=0')}. Is the turning point above or below the x-axis? Does the curve open up or down?`,
    solution: `${M(`(${lin(-p)})^2=0 \\Rightarrow x=${p}`)}, then ${M('y=' + q)}.<br>Turning point ${M(`(${p}, ${q})`)}.<br>` +
      `The curve opens ${s > 0 ? 'upwards' : 'downwards'} and the turning point is ${q === 0 ? 'on' : (q > 0 ? 'above' : 'below')} the x-axis, so it cuts the x-axis ${n} time${n === 1 ? '' : 's'}.`,
  });
}

function gCtsNeg() {
  const b = pick([-10, -8, -6, -4, -2, 2, 4, 6, 8, 10]);
  const c = R(-9, 9);
  const p = b / 2, q = c + p * p;
  return mk({
    topic: 'ctsn', tol: 1e-6,
    prompt: `Write ${M('y = ' + poly(-1, b, c))} in the form ${M('y = -(x-p)^2 + q')}. Find ${M('p')} and ${M('q')}. What are the coordinates of the turning point?`,
    fields: [M('p ='), M('q =')], answer: [p, q],
    hint: `Take out the minus sign from the first two terms: ${M(`-(x^2 ${plus(-b)}x)`)}. Complete the square inside the bracket, and watch what the minus sign does to the number you added.`,
    solution: `${M(`y = -(x^2 ${plus(-b)}x) ${plus(c)}`)}<br>${M(`= -\\left[(x ${plus(-p)})^2 - ${fmt(p * p)}\\right] ${plus(c)}`)}<br>` +
      `${M(`= -(x ${plus(-p)})^2 ${plus(q)}`)}<br>So ${M('p=' + fmt(p))}, ${M('q=' + fmt(q))}. Maximum point ${M(`(${fmt(p)}, ${fmt(q)})`)}.`,
  });
}

/* ---------- Day 5 ---------- */
function gRect() {
  const x0 = R(3, 14), d = R(2, 9), A = x0 * (x0 + d);
  return mk({
    topic: 'rect', tol: 1e-6,
    prompt: `The length of a rectangle is ${d} cm more than its width. Its area is ${A} cm². Let the width be ${M('x')} cm. ` +
      `This gives an equation ${M('x^2 + bx + c = 0')}. Find ${M('b')} and ${M('c')}, then solve it to find the width.`,
    fields: [M('b ='), M('c ='), 'width (cm) ='], answer: [d, -A, x0],
    hint: `Length = ${M(`x+${d}`)}. Area = width × length. Set it equal to ${A} and move everything to one side. One of the roots will be negative - can a width be negative?`,
    solution: `${M(`x(x+${d}) = ${A}`)}<br>${M(`x^2 + ${d}x - ${A} = 0`)}<br>${M(`(x + ${x0 + d})(x - ${x0}) = 0`)}<br>` +
      `${M(`x = ${x0}`)} or ${M(`x = -${x0 + d}`)}. A width cannot be negative, so the width is <b>${x0} cm</b>.`,
  });
}

function gSpeed() {
  let x, d, D, m;
  do {
    x = pick([20, 30, 40, 50, 60, 70, 80]); d = pick([10, 20, 30]);
    D = pick([60, 90, 120, 150, 180, 240, 300, 360]);
    m = (60 * D * d) / (x * (x + d));
  } while (!Number.isInteger(m) || m < 5 || m > 90);
  const K = 60 * D * d / m;
  return mk({
    topic: 'speed', tol: 1e-6,
    prompt: `A bus travels ${D} km at an average speed of ${M('x')} km/h. A car makes the same journey at an average speed that is ${d} km/h faster, and takes ${m} minutes less. Find the bus's speed, ${M('x')}.`,
    fields: [M('x \\text{ (km/h)} =')], answer: [x],
    hint: `Time = distance ÷ speed. Bus time − car time = ${m} minutes = ${M(`\\dfrac{${m}}{60}`)} hours. Then multiply through by the common denominator.`,
    solution: `${M(`\\dfrac{${D}}{x} - \\dfrac{${D}}{x+${d}} = \\dfrac{${m}}{60}`)}<br>` +
      `${M(`x^2 + ${d}x - ${fmt(K)} = 0`)}<br>${M(`(x + ${x + d})(x - ${x}) = 0`)}<br>` +
      `A speed cannot be negative, so ${M(`x = ${x}`)} km/h.`,
  });
}

function gProj() {
  const b = pick([2, 4, 6, 8, 10]), c = R(1, 5);
  return mk({
    topic: 'proj', tol: 1e-6,
    prompt: `A ball is thrown upwards. Its height is ${M(`h = ${poly(-1, b, c)}`)} metres, where ${M('t')} is the time in seconds. Find the time at which the ball is highest, and its maximum height.`,
    fields: [M('t \\text{ (s)} ='), M('\\text{max height (m)} =')], answer: [b / 2, c + (b / 2) * (b / 2)],
    hint: 'Complete the square to get h = −(t − p)² + q. The maximum point is (p, q).',
    solution: `${M(`h = -(t^2 ${plus(-b)}t) ${plus(c)}`)}<br>${M(`= -(t ${plus(-b / 2)})^2 ${plus(c + (b / 2) * (b / 2))}`)}<br>` +
      `Maximum at ${M(`t = ${b / 2}`)} s, height ${M(`${c + (b / 2) * (b / 2)}`)} m.`,
  });
}

/* ---------- extra coverage: the rest of the book and typical Sec 3 / O-Level questions ---------- */
const quad = (A, B, C) => { const D = B * B - 4 * A * C; if (D <= 1e-9) return null; const s = Math.sqrt(D); return [(-B + s) / (2 * A), (-B - s) / (2 * A)]; };
const withRes = (q, f) => { Object.defineProperty(q, '_res', { value: f, enumerable: false }); return q; };
const frTex = (n, d) => `\\dfrac{${Math.abs(n)}}{${d}}`;
const pm = (n) => (n < 0 ? '-' : '+');

/* Level 1: completing the square when b is a decimal or a fraction (book: Practice Now 3, Exercise 1A Q3-4) */
function gCtsDec() {
  const c = R(-6, 6); let b, expr, bTxt;
  if (Math.random() < 0.5) {
    const [n, d] = pick([[1, 2], [3, 4], [-3, 4], [2, 3], [-2, 3], [6, 5], [-6, 5], [4, 9], [-4, 9], [-1, 3], [5, 6], [-5, 6]]);
    b = n / d; bTxt = `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`;
    expr = `x^2 ${pm(n)} ${frTex(n, d)}x ${plus(c)}`;
  } else {
    b = pick([0.2, 0.4, 0.6, 0.8, 1.2, 1.4, 1.6, -0.2, -0.4, -0.6, -1.2, -1.4, -1.6]); bTxt = fmt(b);
    expr = poly(1, b, c);
  }
  const r = b / 2, u = c - r * r;
  return mk({
    topic: 'ctsd', tol: 0.006,
    prompt: `Write ${M(expr)} in the form ${M('(x+r)^2+u')}. Give ${M('r')} and ${M('u')} as fractions (like 3/8) or decimals to 2 d.p.`,
    fields: [M('r ='), M('u =')], answer: [r, u],
    hint: `r is half of ${M(bTxt)}. Then ${M('u')} is the constant term minus ${M('r^2')}.`,
    solution: `${M(`r = \\dfrac{${bTxt}}{2} = ${fmt(r)}`)} (2 d.p.)<br>${M(`u = ${c} - (${fmt(r)})^2 = ${fmt(u)}`)} (2 d.p.)`,
  });
}

/* Level 2: a is not 1 (book reflection: 2x^2 + 8x - 6 = 0) */
function gCtsA() {
  const a = pick([2, 3, 4, -2, -3]), r = nz(-4, 4), c = R(-9, 9), b = 2 * a * r, u = c - a * r * r;
  return mk({
    topic: 'ctsa', tol: 1e-6,
    prompt: `Write ${M(poly(a, b, c))} in the form ${M(`${a === -1 ? '-' : a}(x+r)^2+u`)}. Find ${M('r')} and ${M('u')}.`,
    fields: [M('r ='), M('u =')], answer: [r, u],
    hint: `Take the ${a} out of the first two terms: ${M(`${a}(x^2 ${plus(b / a)}x)`)}. Complete the square inside the bracket. The number you add inside is multiplied by ${a} outside.`,
    solution: `${M(`${a}\\left(x^2 ${plus(b / a)}x\\right) ${plus(c)}`)}<br>${M(`= ${a}\\left[(x ${plus(r)})^2 - ${r * r}\\right] ${plus(c)}`)}<br>${M(`= ${a}(x ${plus(r)})^2 ${plus(u)}`)}`,
  });
}

function gCtsSolveA() {
  let a, b, c, ans;
  do { a = pick([2, 3, 4, 5, -2, -3]); b = nz(-9, 9); c = nz(-9, 9); ans = quad(a, b, c); } while (!ans || isSquare(b * b - 4 * a * c));
  const q = mk({
    topic: 'ctssa', kind: 'set',
    prompt: `Solve ${M(poly(a, b, c) + '=0')} by completing the square, giving answers to 2 decimal places.`,
    fields: [M('x =')], answer: ans,
    hint: `Divide every term by ${a} first, so the ${M('x^2')} has no number in front. Then complete the square as usual.`,
    solution: `Divide by ${a}: ${M(`x^2 + \\dfrac{${b}}{${a}}x + \\dfrac{${c}}{${a}} = 0`)}<br>Complete the square on the left, move the constant across, and take square roots.<br>${M('x = ' + orList(ans))} (2 d.p.)`,
  });
  return withRes(q, (x) => a * x * x + b * x + c);
}

/* Levels 1-2: equations that need tidying first (book: Exercise 1A Q7, 1B Q2 and Q4) */
function gRearr() {
  const L = pick(['x', 'y', 'm', 't']), inL = (s) => s.replace(/x/g, L);
  for (;;) {
    const t = R(1, 4); let B, C, tex, f;
    if (t === 1) { const p = nz(-6, 6), q = nz(-6, 6), k = R(1, 20); tex = `(${lin(p)})(${lin(q)}) = ${k}`; B = p + q; C = p * q - k; f = (x) => (x + p) * (x + q) - k; }
    else if (t === 2) { const p = nz(-6, 6), q = nz(-6, 6), r = R(-9, 9); tex = `(${lin(-p)})^2 = ${poly(0, q, r)}`; B = -2 * p - q; C = p * p - r; f = (x) => (x - p) * (x - p) - (q * x + r); }
    else if (t === 3) { const b = nz(-6, 6), c = pick([2, 3, 4, 5, -2, -3]), d = nz(-5, 5); tex = `x(${lin(b)}) = ${c}(${lin(d)})`; B = b - c; C = -c * d; f = (x) => x * (x + b) - c * (x + d); }
    else { const b = nz(-6, 6), d = nz(-5, 5), c = R(-9, 9); tex = `x(${lin(b)}) = ${poly(0, d, c)}`; B = b - d; C = -c; f = (x) => x * (x + b) - (d * x + c); }
    const ans = quad(1, B, C); if (!ans) continue;
    const q = mk({
      topic: 'rearr', kind: 'set',
      prompt: `Solve ${M(inL(tex))}. Give answers to 2 decimal places if they are not exact.`,
      fields: [M(L + ' =')], answer: ans,
      hint: 'Expand the brackets, then move everything to one side so it looks like ax² + bx + c = 0. Then choose your method.',
      solution: `Expand and collect: ${M(inL(poly(1, B, C)) + '=0')}<br>Then use factorising, completing the square or the formula.<br>${M(L + '=' + orList(ans))}`,
    });
    return withRes(q, f);
  }
}

/* Level 2: finding an unknown constant using the discriminant (O-Level style) */
function gKval() {
  const v = R(1, 3);
  if (v === 1) {
    const n = R(2, 6);
    return mk({
      topic: 'kval', kind: 'set', tol: 1e-6,
      prompt: `The equation ${M(`x^2 + kx + ${n * n} = 0`)} has exactly one real solution. Find the two possible values of ${M('k')}.`,
      fields: [M('k =')], answer: [2 * n, -2 * n],
      hint: `One solution means ${M('b^2-4ac=0')}. Here a = 1, b = k, c = ${n * n}. Solve for k (there are two answers).`,
      solution: `${M(`k^2 - 4(1)(${n * n}) = 0`)}<br>${M(`k^2 = ${4 * n * n}`)}<br>${M(`k = ${2 * n}`)} or ${M(`k = ${-2 * n}`)}`,
    });
  }
  if (v === 2) {
    const s = R(2, 6), divs = [1, 2, 4, 5, 8, 9, 10, 12, 16, 18, 20, 25, 36].filter((d) => (s * s) % d === 0);
    const k = pick(divs), c = (s * s) / k;
    return mk({
      topic: 'kval', kind: 'set', tol: 1e-6,
      prompt: `The equation ${M(`kx^2 + ${2 * s}x + ${c} = 0`)} has two equal solutions. Find the value of ${M('k')}.`,
      fields: [M('k =')], answer: [k],
      hint: `Equal solutions mean ${M('b^2-4ac=0')}. Here a = k, b = ${2 * s}, c = ${c}.`,
      solution: `${M(`${2 * s}^2 - 4(k)(${c}) = 0`)}<br>${M(`${4 * s * s} = ${4 * c}k`)}<br>${M(`k = ${k}`)}`,
    });
  }
  const b = nz(-8, 8), k = Math.floor((b * b) / 4) + 1;
  return mk({
    topic: 'kval', tol: 1e-6,
    prompt: `The equation ${M(`${poly(1, b, 0)} + k = 0`)} has no real solutions, where ${M('k')} is a whole number. Find the smallest possible value of ${M('k')}.`,
    fields: [M('k =')], answer: [k],
    hint: `No real solutions means ${M('b^2-4ac<0')}. Write it as an inequality in k, then find the smallest whole number that works.`,
    solution: `${M(`${par(b)}^2 - 4(1)(k) < 0`)}<br>${M(`${b * b} < 4k \\Rightarrow k > ${fmt((b * b) / 4)}`)}<br>The smallest whole number is ${M('k=' + k)}.`,
  });
}

/* Level 3: harder fractional equations (book: Practice Now 7-8, Exercise 1B Q5-8) */
function gFrac2() {
  for (;;) {
    const t = R(1, 4); let A, B, C, tex, f, bad, hint;
    if (t === 1) {
      const a = nz(-5, 5), b = nz(-5, 5), p = nz(-5, 5), q = nz(-5, 5), r = pick([1, 2, 3]); if (a === b) continue;
      A = r; B = r * (a + b) - p - q; C = r * a * b - p * b - q * a; bad = [-a, -b];
      tex = `\\dfrac{${p}}{${lin(a)}} ${pm(q)} \\dfrac{${Math.abs(q)}}{${lin(b)}} = ${r}`; f = (x) => p / (x + a) + q / (x + b) - r;
      hint = `Multiply every term by ${M(`(${lin(a)})(${lin(b)})`)}.`;
    } else if (t === 2) {
      const a = nz(-5, 5), b = nz(-5, 5), c = nz(-6, 6);
      A = 1; B = a - c; C = -c * b; bad = [0, -b];
      tex = `\\dfrac{${lin(a)}}{${lin(b)}} = \\dfrac{${c}}{x}`; f = (x) => (x + a) / (x + b) - c / x;
      hint = `Multiply both sides by ${M(`x(${lin(b)})`)}, or cross-multiply.`;
    } else if (t === 3) {
      const a = nz(-4, 4), p = R(1, 5), q = R(1, 5), r = pick([1, 2, 3]);
      A = r; B = -2 * r * a - p; C = r * a * a + p * a + q; bad = [a];
      tex = `\\dfrac{${p}}{${lin(-a)}} - \\dfrac{${q}}{(${lin(-a)})^2} = ${r}`; f = (x) => p / (x - a) - q / ((x - a) * (x - a)) - r;
      hint = `The common denominator is ${M(`(${lin(-a)})^2`)}. Multiply every term by it.`;
    } else {
      const a = R(1, 12), b = pick([1, 2, 3, -1, -2]), c = nz(-6, 6), d = pick([1, 2, 3, -1, -2, -3]), e = nz(-5, 5);
      A = d * b; B = d * c + e * b; C = e * c - a; bad = [-c / b];
      tex = `\\dfrac{${a}}{${poly(0, b, c)}} = ${poly(0, d, e)}`; f = (x) => a / (b * x + c) - (d * x + e);
      hint = `Multiply both sides by ${M(`(${poly(0, b, c)})`)} to clear the fraction.`;
    }
    const ans = quad(A, B, C); if (!ans || ans.some((x) => bad.some((z) => Math.abs(x - z) < 1e-7)) || Math.abs(A) > 12) continue;
    const q = mk({
      topic: 'frac2', kind: 'set',
      prompt: `Solve ${M(tex)}. Give answers to 2 decimal places.`,
      fields: [M('x =')], answer: ans, hint,
      solution: `Cannot be: ${bad.map((z) => M('x=' + fmt(z))).join(', ')}.<br>After clearing the fractions: ${M(poly(A, B, C) + '=0')}<br>${M('x=' + orList(ans))} (2 d.p.) Neither is an excluded value.`,
    });
    return withRes(q, f);
  }
}

/* Level 4: plotting, reading graphs and sketching (book 1.4, 1.5; O-Level style) */
function gTable() {
  const a = pick([1, 2, 3, -1, -2]), b = R(-6, 6), c = R(-9, 9), x0 = pick([-3, -2, -1]);
  const xs = Array.from({ length: 7 }, (_, i) => x0 + i), ys = xs.map((x) => a * x * x + b * x + c);
  return mk({
    topic: 'table', tol: 1e-6,
    prompt: `Complete the table of values for ${M('y = ' + poly(a, b, c))}. (Then you could plot the points and draw the curve.)`,
    fields: xs.map((x) => M(`x=${x}:\\ y =`)), answer: ys,
    hint: `Put each x in brackets when you substitute, especially negative ones. For example ${M(`x=${xs[0]}`)} gives ${M(`${poly(a, b, c).replace(/x\^2/g, `(${xs[0]})^2`).replace(/(\d*)x(?!\^)/g, (m, n) => `${n ? n + '\\times' : ''}(${xs[0]})`)}`)}.`,
    solution: xs.map((x, i) => `${M(`x=${x}: y=${ys[i]}`)}`).join('<br>'),
  });
}

function gGLine() {
  const a = pick([1, 2, 3, -1, -2]), b = R(-5, 5), c = R(-6, 6), b2 = R(-5, 5), c2 = R(-6, 6);
  if (b === b2 && c === c2) return gGLine();
  const m = b - b2, n = c - c2;
  return mk({
    topic: 'gline', tol: 1e-6,
    prompt: `The graph of ${M('y = ' + poly(a, b, c))} has been drawn. To solve ${M(poly(a, b2, c2) + ' = 0')}, which straight line ${M('y = mx + n')} should be drawn on the same axes? Find ${M('m')} and ${M('n')}.`,
    fields: [M('m ='), M('n =')], answer: [m, n],
    hint: `Rearrange ${M(poly(a, b2, c2) + ' = 0')} so that the left side looks like the curve's equation ${M(poly(a, b, c))} and the right side is whatever is left over.`,
    solution: `${M(poly(a, b, c) + ' = ' + poly(0, m, n))} is the same as ${M(poly(a, b2, c2) + ' = 0')}.<br>So draw ${M('y = ' + poly(0, m, n))}. The x-values where the curve and line meet are the solutions.`,
  });
}

function gGGen() {
  const s = pick([1, -1]), b = pick([-8, -6, -4, -2, 2, 4, 6, 8]), c = R(-9, 9);
  const px = s === 1 ? -b / 2 : b / 2, py = s === 1 ? c - (b * b) / 4 : c + (b * b) / 4;
  const D = s === 1 ? b * b - 4 * c : b * b + 4 * c, n = D > 0 ? 2 : D === 0 ? 1 : 0;
  return mk({
    topic: 'ggen', tol: 0.011,
    prompt: `For the graph of ${M('y = ' + poly(s, b, c))}, find the y-intercept, the turning point and the number of x-intercepts.`,
    fields: [M('y\\text{-intercept} ='), M('\\text{turning point } x ='), M('\\text{turning point } y ='), 'number of x-intercepts ='],
    answer: [c, px, py, n],
    hint: `The y-intercept is the value when x = 0. For the turning point, complete the square. Then ask: does the curve open up or down, and is the turning point above or below the x-axis?`,
    solution: s === 1
      ? `${M(`y = (x ${plus(b / 2)})^2 ${plus(c - (b * b) / 4)}`)}<br>Minimum point ${M(`(${fmt(px)}, ${fmt(py)})`)}`
      : `${M(`y = -(x ${plus(-b / 2)})^2 ${plus(c + (b * b) / 4)}`)}<br>Maximum point ${M(`(${fmt(px)}, ${fmt(py)})`)}`,
  });
}

function gGCsA() {
  const a = pick([2, 3, -2, -3]), p = nz(-5, 5), q = Math.random() < 0.2 ? 0 : nz(-8, 8);
  const n = a > 0 ? (q < 0 ? 2 : q === 0 ? 1 : 0) : (q > 0 ? 2 : q === 0 ? 1 : 0);
  return mk({
    topic: 'gcsa', tol: 1e-6,
    prompt: `<span class="tag">Stretch</span> For the graph of ${M(`y = ${a}(${lin(-p)})^2 ${plus(q)}`)}, find the turning point, the y-intercept and the number of x-intercepts.`,
    fields: [M('\\text{turning point } x ='), M('\\text{turning point } y ='), M('y\\text{-intercept} ='), 'number of x-intercepts ='],
    answer: [p, q, a * p * p + q, n],
    hint: `The bracket squared is zero when ${M(lin(-p) + '=0')}. For the y-intercept put x = 0 into the whole equation. The sign of ${M('a')} tells you if it opens up or down.`,
    solution: `Turning point ${M(`(${p}, ${q})`)}. When x = 0: ${M(`y = ${a}(${-p})^2 ${plus(q)} = ${a * p * p + q}`)}.<br>The curve opens ${a > 0 ? 'upwards' : 'downwards'}, so it cuts the x-axis ${n} time${n === 1 ? '' : 's'}.`,
  });
}

/* Level 5: more word-problem types (book Worked Examples 14-16 and Exercise 1E; O-Level style) */
function gPyth() {
  const [p, q, r] = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25], [20, 21, 29]]);
  const d = q - p, e = r - p, b = -2 * (e - d), c = d * d - e * e;
  return mk({
    topic: 'pyth', tol: 1e-6,
    prompt: `A right-angled triangle has sides ${M('x')} cm, ${M(`(x+${d})`)} cm and ${M(`(x+${e})`)} cm, where the longest side is ${M(`(x+${e})`)} cm. Using Pythagoras' Theorem, you get ${M('x^2+bx+c=0')}. Find ${M('b')} and ${M('c')}, solve for ${M('x')}, then find the perimeter in cm.`,
    fields: [M('b ='), M('c ='), M('x ='), 'perimeter (cm) ='], answer: [b, c, p, p + q + r],
    hint: `${M(`x^2 + (x+${d})^2 = (x+${e})^2`)}. Expand every bracket carefully and collect the terms. Reject any negative value of x.`,
    solution: `${M(`x^2 + (x+${d})^2 = (x+${e})^2`)}<br>${M(`x^2 ${plus(b)}x ${plus(c)} = 0`)}<br>${M(`${fac(p)}${fac(2 * (e - d) - p)} = 0`)}<br>${M('x=' + p)} (reject the negative root). Sides ${p}, ${q}, ${r} cm, so the perimeter is ${p + q + r} cm.`,
  });
}

function gConsec() {
  const v = R(1, 2), x0 = R(5, 22), step = v === 1 ? 1 : 2, P = x0 * (x0 + step);
  return mk({
    topic: 'consec', tol: 1e-6,
    prompt: `The product of two consecutive ${v === 1 ? 'positive integers' : 'positive odd numbers'} is ${P}. Let the smaller number be ${M('x')}. This gives ${M('x^2+bx+c=0')}. Find ${M('b')} and ${M('c')}, then find the smaller number.`,
    fields: [M('b ='), M('c ='), 'smaller number ='], answer: [step, -P, x0],
    hint: `The numbers are ${M('x')} and ${M(`x+${step}`)}. Their product is ${P}. Expand, move to one side, solve, and reject the negative root.`,
    solution: `${M(`x(x+${step}) = ${P}`)}<br>${M(`x^2 + ${step}x - ${P} = 0`)}<br>${M(`(x + ${x0 + step})(x - ${x0}) = 0`)}<br>The numbers are positive, so ${M('x=' + x0)}.`,
  });
}

function gWork() {
  let x, d, t;
  do { x = pick([6, 8, 10, 12, 15, 20, 24, 30]); d = pick([2, 3, 4, 5, 6, 8, 10, 12]); t = (x * (x + d)) / (2 * x + d); } while (!Number.isInteger(t) || t < 2);
  return mk({
    topic: 'work', tol: 1e-6,
    prompt: `Pipe A can fill a tank in ${M('x')} minutes. Pipe B takes ${d} minutes longer than Pipe A. Together they fill the tank in ${t} minutes. Form an equation ${M('x^2+bx+c=0')}, then find ${M('b')}, ${M('c')} and ${M('x')}.`,
    fields: [M('b ='), M('c ='), M('x =')], answer: [d - 2 * t, -t * d, x],
    hint: `In one minute, Pipe A fills ${M('\\dfrac{1}{x}')} of the tank and Pipe B fills ${M(`\\dfrac{1}{x+${d}}`)}. Together in one minute: ${M(`\\dfrac{1}{${t}}`)}.`,
    solution: `${M(`\\dfrac{1}{x}+\\dfrac{1}{x+${d}}=\\dfrac{1}{${t}}`)}<br>${M(`${t}(x+${d}) + ${t}x = x(x+${d})`)}<br>${M(`x^2 ${plus(d - 2 * t)}x ${plus(-t * d)} = 0`)}<br>${M('x=' + x)} (reject the negative root).`,
  });
}

function gProfit() {
  const a = pick([0.1, 0.2, 0.5, 1]), k = pick([2, 3, 4, 5]), p = R(2, 6), q = Math.round(a * k * k * 100) / 100;
  return mk({
    topic: 'profit', tol: 0.011,
    prompt: `The profit, ${M('P')} million dollars, of a company ${M('x')} years after it started is ${M(`P = ${fmt(q)} - ${a === 1 ? '' : fmt(a)}(x-${p})^2`)}. Find the year when the profit is greatest, the greatest profit, and the later time ${M('x')} when the profit falls to zero.`,
    fields: [M('x \\text{ at greatest profit} ='), M('\\text{greatest } P ='), M('x \\text{ when } P=0 \\text{ (later one)} =')],
    answer: [p, q, p + k],
    hint: `The square ${M(`(x-${p})^2`)} is never negative, so P is largest when it is zero. For P = 0, rearrange to ${M(`(x-${p})^2 = \\dots`)} and take square roots.`,
    solution: `The greatest P is ${M(fmt(q))} when ${M(`x=${p}`)}.<br>${M(`${fmt(a)}(x-${p})^2 = ${fmt(q)}`)} gives ${M(`(x-${p})^2=${k * k}`)}, so ${M(`x=${p}\\pm${k}`)}. The later time is ${M('x=' + (p + k))}.`,
  });
}

function gPath() {
  const L = R(4, 12), W = R(3, 10), x0 = R(1, 4), A = (L + 2 * x0) * (W + 2 * x0);
  return mk({
    topic: 'path', tol: 1e-6,
    prompt: `A rectangular garden is ${L} m by ${W} m. A path of the same width ${M('x')} m goes all the way around it. The area of the garden and path together is ${A} m². Find ${M('x')}.`,
    fields: [M('x \\text{ (m)} =')], answer: [x0],
    hint: `The outside rectangle is ${M(`(${L}+2x)`)} by ${M(`(${W}+2x)`)}. Set its area equal to ${A}. Expand, collect and solve. Reject the negative root.`,
    solution: `${M(`(${L}+2x)(${W}+2x) = ${A}`)}<br>${M(`4x^2 + ${2 * (L + W)}x + ${L * W - A} = 0`)}<br>${M(`x = ${x0}`)} (the other root is negative, so rejected).`,
  });
}

/* ---------- registry ---------- */
const TOPICS = {
  factor:  { name: 'Solve by factorising',                gen: gFactor,    day: 1 },
  sqrt:    { name: 'Solve (x + r)² = s',                  gen: gSqrt,      day: 1 },
  ctsx:    { name: 'Complete the square (rewrite)',       gen: gCtsExpr,   day: 1 },
  ctsd:    { name: 'Complete the square: fractions and decimals', gen: gCtsDec, day: 1 },
  ctss:    { name: 'Solve by completing the square',      gen: gCtsSolve,  day: 2 },
  ctsa:    { name: 'Complete the square when a is not 1', gen: gCtsA,      day: 2 },
  ctssa:   { name: 'Solve by completing the square, a not 1', gen: gCtsSolveA, day: 2 },
  formula: { name: 'Quadratic formula',                   gen: gFormula,   day: 2 },
  rearr:   { name: 'Tidy up first, then solve',           gen: gRearr,     day: 2 },
  disc:    { name: 'Discriminant and number of roots',    gen: gDisc,      day: 2 },
  kval:    { name: 'Find an unknown using the discriminant', gen: gKval,   day: 2 },
  frac:    { name: 'Fractional equations',                gen: gFrac,      day: 3 },
  frac2:   { name: 'Harder fractional equations',         gen: gFrac2,     day: 3 },
  extra:   { name: 'Rejecting invalid roots',             gen: gExtra,     day: 3 },
  table:   { name: 'Table of values for a graph',         gen: gTable,     day: 4 },
  gfact:   { name: 'Graphs: factorised form',             gen: gGraphFact, day: 4 },
  gcs:     { name: 'Graphs: completed-square form',       gen: gGraphCS,   day: 4 },
  ctsn:    { name: 'Complete the square with −x²',        gen: gCtsNeg,    day: 4 },
  ggen:    { name: 'Graphs from the general form',        gen: gGGen,      day: 4 },
  gline:   { name: 'Which line solves another equation',  gen: gGLine,     day: 4 },
  gcsa:    { name: 'Graphs when a is not 1 (stretch)',    gen: gGCsA,      day: 4 },
  rect:    { name: 'Word problems: area',                 gen: gRect,      day: 5 },
  speed:   { name: 'Word problems: speed and time',       gen: gSpeed,     day: 5 },
  proj:    { name: 'Word problems: maximum height',       gen: gProj,      day: 5 },
  pyth:    { name: 'Word problems: Pythagoras',           gen: gPyth,      day: 5 },
  consec:  { name: 'Word problems: consecutive numbers',  gen: gConsec,    day: 5 },
  work:    { name: 'Word problems: working together',     gen: gWork,      day: 5 },
  profit:  { name: 'Word problems: profit model',         gen: gProfit,    day: 5 },
  path:    { name: 'Word problems: path around a garden', gen: gPath,      day: 5 },
};
const generate = (topic) => TOPICS[topic].gen();

/* ---------- answer checking ---------- */
function parseNum(s) {
  s = String(s).trim().replace(/[−–]/g, '-').replace(/\s+/g, '');
  if (!s) return NaN;
  let m = s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/);
  if (m) return parseFloat(m[1]) / parseFloat(m[2]);
  if (/^-?\d*\.?\d+$/.test(s)) return parseFloat(s);
  return NaN;
}

function checkAnswer(q, vals) {
  if (q.kind === 'set') {
    const nums = vals[0].split(/,|;|\bor\b|\band\b/i).map((s) => s.trim()).filter(Boolean).map(parseNum);
    if (!nums.length || nums.some(Number.isNaN)) return { bad: true };
    if (nums.length !== q.answer.length) return { ok: false, note: 'Check how many answers you should give, and test each one.' };
    const a = [...q.answer].sort((x, y) => x - y), n = [...nums].sort((x, y) => x - y);
    return { ok: a.every((v, i) => Math.abs(v - n[i]) <= q.tol) };
  }
  const nums = vals.map(parseNum);
  if (nums.some(Number.isNaN)) return { bad: true };
  const wrong = nums.map((n, i) => Math.abs(n - q.answer[i]) > (Array.isArray(q.tol) ? q.tol[i] : q.tol));
  return { ok: !wrong.some(Boolean), wrong };
}

if (typeof module !== 'undefined') module.exports = { TOPICS, generate, checkAnswer, parseNum, fmt, poly };
