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
  const b = -(r1 + r2), c = r1 * r2, hp = factorPair(b, c).hit;
  return mk({
    topic: 'factor', kind: 'set', tol: 1e-6,
    prompt: `Solve ${M(poly(1, b, c) + '=0')} by factorising.`,
    fields: [M('x =')], answer: [r1, r2],
    hint: `Find two numbers that multiply to ${c} and add to ${b}.`,
    solution: `${M(poly(1, b, c) + '=0')}<br>${factorHow(b, c)}A product is zero only when one of the brackets is zero:<br>${M(`x ${plus(hp[0])} = 0 \\text{ or } x ${plus(hp[1])} = 0`)}<br>${M('x=' + orList([r1, r2]))}`,
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
      solution: `${M(`${a} = (${lin(n)})(${lin(m)})`)}<br>${M(poly(1, B, C) + ' = 0')}<br>${factorHow(B, C)}` +
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
    solution: `${M(`x^2 ${plus(a)} = ${par(b)}x`)}<br>${M(poly(1, -b, a) + '=0')}<br>${factorHow(-b, a)}${M('x=' + orList([r1, r2]))}`,
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
    solution: `${M(`${poly(1, u, v)} = ${poly(0, w, z)}`)}<br>${M(poly(1, u - w, v - z) + ' = 0')}<br>${factorHow(u - w, v - z)}` +
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
    solution: `${M(`x(x+${d}) = ${A}`)}<br>${M(`x^2 + ${d}x - ${A} = 0`)}<br>${factorHow(d, -A)}` +
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
      `${M(`x^2 + ${d}x - ${fmt(K)} = 0`)}<br>${factorHow(d, -K)}` +
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
      solution: `Expand and collect: ${M(inL(poly(1, B, C)) + '=0')}<br>${formulaHow(1, B, C).replace(/\bx\b/g, L)}${M(L + '=' + orList(ans))} (2 d.p.)`,
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
      solution: `Cannot be: ${bad.map((z) => M('x=' + fmt(z))).join(', ')}.<br>After clearing the fractions: ${M(poly(A, B, C) + '=0')}<br>${formulaHow(A, B, C)}${M('x=' + orList(ans))} (2 d.p.) Neither is an excluded value.`,
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
    solution: `${M(`x^2 + (x+${d})^2 = (x+${e})^2`)}<br>${M(`x^2 ${plus(b)}x ${plus(c)} = 0`)}<br>${factorHow(b, c)}${M('x=' + p)} (reject the negative root). Sides ${p}, ${q}, ${r} cm, so the perimeter is ${p + q + r} cm.`,
  });
}

function gConsec() {
  const v = R(1, 2), x0 = R(5, 22), step = v === 1 ? 1 : 2, P = x0 * (x0 + step);
  return mk({
    topic: 'consec', tol: 1e-6,
    prompt: `The product of two consecutive ${v === 1 ? 'positive integers' : 'positive odd numbers'} is ${P}. Let the smaller number be ${M('x')}. This gives ${M('x^2+bx+c=0')}. Find ${M('b')} and ${M('c')}, then find the smaller number.`,
    fields: [M('b ='), M('c ='), 'smaller number ='], answer: [step, -P, x0],
    hint: `The numbers are ${M('x')} and ${M(`x+${step}`)}. Their product is ${P}. Expand, move to one side, solve, and reject the negative root.`,
    solution: `${M(`x(x+${step}) = ${P}`)}<br>${M(`x^2 + ${step}x - ${P} = 0`)}<br>${factorHow(step, -P)}The numbers are positive, so ${M('x=' + x0)}.`,
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
    solution: `${M(`\\dfrac{1}{x}+\\dfrac{1}{x+${d}}=\\dfrac{1}{${t}}`)}<br>${M(`${t}(x+${d}) + ${t}x = x(x+${d})`)}<br>${M(`x^2 ${plus(d - 2 * t)}x ${plus(-t * d)} = 0`)}<br>${factorHow(d - 2 * t, -t * d)}${M('x=' + x)} (reject the negative root).`,
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
    solution: `${M(`(${L}+2x)(${W}+2x) = ${A}`)}<br>${M(`4x^2 + ${2 * (L + W)}x + ${L * W - A} = 0`)}<br>${formulaHow(4, 2 * (L + W), L * W - A)}${M(`x = ${x0}`)} (the other root is negative, so rejected).`,
  });
}


/* The two numbers that multiply to C and add to B, or null. */
function factorPair(B, C) {
  const n = Math.abs(C), sets = [], seen = new Set();
  if (C === 0) return null;
  for (let i = 1; i * i <= n; i++) if (n % i === 0) {
    const j = n / i;
    (C > 0 ? [[i, j], [-i, -j]] : [[i, -j], [-i, j]]).forEach((p) => { const k = [...p].sort((x, y) => x - y).join(','); if (!seen.has(k)) { seen.add(k); sets.push(p); } });
  }
  const hit = sets.find((p) => p[0] + p[1] === B && p[0] * p[1] === C);
  return hit ? { hit, sets } : null;
}

/* Show HOW the brackets are found: two numbers that multiply to c and add to b. */
function factorHow(B, C, asEquation = true) {
  if (C === 0) {
    return `<b>How to find the brackets:</b> there is no constant term, so take out the common factor <i>x</i>.<br>${M(`${poly(1, B, 0)} = x(${lin(B)})`)}<br>${asEquation ? `So the equation becomes ${M(`x(${lin(B)}) = 0`)}.<br>` : ''}`;
  }
  const f = factorPair(B, C); if (!f) return '';
  const { hit, sets } = f;
  const pairs = sets.length <= 8
    ? `Try the pairs that multiply to ${C}: ` + sets.map((p) => { const t = `${p[0]} × ${par(p[1])} has sum ${p[0] + p[1]}`; return p === hit ? `<b>${t} ✔</b>` : t; }).join('; ') + '.<br>'
    : '';
  return `<b>How to find the brackets:</b> look for two numbers that <b>multiply to ${C}</b> and <b>add to ${B}</b>.<br>${pairs}` +
    `So the numbers are ${hit[0]} and ${hit[1]}: ${hit[0]} × ${par(hit[1])} = ${C} and ${hit[0]} + ${par(hit[1])} = ${B}.<br>` +
    `${M(`${poly(1, B, C)} = (${lin(hit[0])})(${lin(hit[1])})`)}<br>${asEquation ? `So the equation becomes ${M(`(${lin(hit[0])})(${lin(hit[1])}) = 0`)}.<br>` : ''}`;
}

/* Show the quadratic formula being used, step by step. */
function formulaHow(A, B, C) {
  const D = B * B - 4 * A * C, ans = quad(A, B, C);
  if (!ans) return '';
  return `Use the formula with ${M(`a=${A},\\; b=${B},\\; c=${C}`)}:<br>` +
    `${M(`x=\\dfrac{-${par(B)}\\pm\\sqrt{${par(B)}^2-4(${A})(${par(C)})}}{2(${A})}=\\dfrac{${fmt(-B)}\\pm\\sqrt{${fmt(D)}}}{${2 * A}}`)}<br>`;
}


/* ======================================================================
   Gaps A to D from the mock paper and the book's review exercise
   ====================================================================== */

/* ---- A tiny algebra reader (no eval), used to check typed factorised answers ---- */
const polyTrim = (p) => { p = p.slice(); while (p.length > 1 && Math.abs(p[p.length - 1]) < 1e-9) p.pop(); return p; };
const polyAdd = (a, b) => polyTrim(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => (a[i] || 0) + (b[i] || 0)));
const polyMul = (a, b) => { const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; })); return polyTrim(r); };
const polyScale = (a, k) => polyTrim(a.map((x) => x * k));
const polyPow = (a, n) => { let r = [1]; for (let i = 0; i < n; i++) r = polyMul(r, a); return r; };
const polyEq = (a, b) => { a = polyTrim(a); b = polyTrim(b); return a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) < 1e-6); };
const polyDeg = (a) => polyTrim(a).length - 1;

function parseAlg(src) {
  const s = String(src).replace(/\s+/g, '').replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/²/g, '^2').replace(/X/g, 'x');
  if (!s || !/^[0-9x+\-*/^().]+$/.test(s)) return null;
  let i = 0; const fail = () => { throw new Error('parse'); };
  const startsPrimary = () => /[0-9x(.]/.test(s[i] || '');
  function primary() {
    if (s[i] === '(') { i++; const e = expr(); if (s[i] !== ')') fail(); i++; return { t: 'group', e }; }
    if (s[i] === 'x') { i++; return { t: 'x' }; }
    const m = s.slice(i).match(/^\d*\.?\d+/); if (!m) fail(); i += m[0].length; return { t: 'num', v: parseFloat(m[0]) };
  }
  function power() {
    const base = primary(); let n = 1;
    if (s[i] === '^') { i++; const m = s.slice(i).match(/^\d+/); if (!m) fail(); i += m[0].length; n = parseInt(m[0], 10); if (n > 6) fail(); }
    return { base, n, div: false };
  }
  function term(sign) {
    const factors = [power()];
    for (;;) {
      if (s[i] === '*') { i++; if (s[i] === '-') { sign = -sign; i++; } factors.push(power()); }
      else if (s[i] === '/') { i++; const f = power(); f.div = true; factors.push(f); }
      else if (startsPrimary()) factors.push(power());
      else break;
    }
    return { sign, factors };
  }
  function expr() {
    const terms = []; let sign = 1;
    if (s[i] === '-') { sign = -1; i++; } else if (s[i] === '+') i++;
    terms.push(term(sign));
    while (s[i] === '+' || s[i] === '-') { const sg = s[i] === '-' ? -1 : 1; i++; terms.push(term(sg)); }
    return { terms };
  }
  try { const e = expr(); if (i !== s.length) return null; return e; } catch (e) { return null; }
}
function polyOfNode(b) { return b.t === 'num' ? [b.v] : b.t === 'x' ? [0, 1] : polyOfExpr(b.e); }
function polyOfExpr(e) {
  return e.terms.reduce((acc, t) => {
    let p = [t.sign];
    t.factors.forEach((f) => {
      const base = polyOfNode(f.base), pw = polyPow(base, f.n);
      if (f.div) { if (polyDeg(pw) !== 0 || Math.abs(pw[0]) < 1e-12) throw new Error('div'); p = polyScale(p, 1 / pw[0]); } else p = polyMul(p, pw);
    });
    return polyAdd(acc, p);
  }, [0]);
}
/* "Fully factorised": one product, no + or - between factors, and every bracket is linear. */
function isFullyFactored(e) {
  if (e.terms.length !== 1) return false;
  return e.terms[0].factors.every((f) => f.base.t !== 'group' || polyDeg(polyOfExpr(f.base.e)) <= 1);
}

/* ---- D: factorise an expression (monic with -x^2, a not 1, difference of squares, common factor) ---- */
function crossHow(a, b, c) {
  const divs = (n) => { const o = []; for (let i = 1; i <= n; i++) if (n % i === 0) o.push(i); return o; };
  const cs = []; divs(Math.abs(c)).forEach((d) => { const e = Math.abs(c) / d; [[d, c > 0 ? e : -e], [-d, c > 0 ? -e : e]].forEach((p) => cs.push(p)); });
  const tries = []; let hit = null;
  divs(a).forEach((m) => { const p = a / m; if (p > m) return; cs.forEach(([n, q]) => { [[n, q], [q, n]].forEach(([n1, q1]) => { const mid = m * q1 + p * n1; tries.push({ m, p, n: n1, q: q1, mid }); if (!hit && mid === b) hit = tries[tries.length - 1]; }); }); });
  if (!hit) return '';
  const br = (t) => `(${t.m === 1 ? '' : t.m}x ${plus(t.n) || '+ 0'})(${t.p === 1 ? '' : t.p}x ${plus(t.q) || '+ 0'})`;
  const seen = new Set(), uniq = [];
  for (const t of tries) { const k = [`${t.m},${t.n}`, `${t.p},${t.q}`].sort().join('|'); if (seen.has(k)) continue; seen.add(k); uniq.push(t); if (t === hit) break; }
  const hi = uniq.indexOf(hit), pick_ = hi <= 6 ? uniq : [...uniq.slice(0, 4), null, hit];
  const list = pick_.map((t) => (t === null ? '… (keep trying pairs until the middle term matches)' : `${br(t)} gives middle term ${t.m}×${par(t.q)} + ${t.p}×${par(t.n)} = ${t.mid}${t === hit ? ' ✔' : ''}`));
  return `<b>How to find the brackets (multiplication frame):</b> the brackets are ${M('(mx + n)(px + q)')}, where ${M('m \\times p = ' + a)} and ${M('n \\times q = ' + c)}. The middle term comes from ${M('m q + p n')}, and we need it to be ${b}.<br>` +
    `Try factor pairs:<br>${list.join('<br>')}<br>So ${M(`${poly(a, b, c)} = ${br(hit).replace(/\(/g, '(').replace(/\)\(/g, ')(')}`)}.<br>`;
}

function gFactExp() {
  const g_ = (x, y) => (y ? g_(y, x % y) : Math.abs(x));
  const v = pick([1, 2, 2, 3, 4]); let target, display, answer, how, hint = 'Type the brackets like (x+1)(2x-3). Use ^ for powers. Factorise completely.';
  if (v === 1) {
    let r1, r2; do { r1 = nz(-7, 7); r2 = nz(-7, 7); } while (r1 === r2);
    const b = r1 + r2, c = -r1 * r2;                       // -(x - r1)(x - r2) = -x^2 + (r1+r2)x - r1 r2
    target = [c, b, -1]; display = poly(-1, b, c); answer = `-${fac(r1)}${fac(r2)}`;
    how = `Take out ${M('-1')} first so the ${M('x^2')} has a plus sign: ${M(`${display} = -(${poly(1, -b, -c)})`)}<br>${factorHow(-b, -c, false)}So ${M(`${display} = -${fac(r1)}${fac(r2)}`)}.`;
    hint = 'Take out -1 first, then find two numbers that multiply to the constant and add to the middle number. Type it like -(x+1)(x-6).';
  } else if (v === 2) {
    let m, p, n, q;
    do { m = pick([1, 2, 3, 4, 5]); p = pick([1, 2, 3, 4, 5]); n = nz(-7, 7); q = nz(-7, 7); }
    while ((m === 1 && p === 1) || m * q === p * n || (m < p) || (m * q + p * n === 0) || (Math.abs(n) === Math.abs(q) && m === p) || g_(m, n) !== 1 || g_(p, q) !== 1);
    const a = m * p, b = m * q + p * n, c = n * q;
    target = [c, b, a]; display = poly(a, b, c); answer = `(${m === 1 ? '' : m}x${n < 0 ? n : '+' + n})(${p === 1 ? '' : p}x${q < 0 ? q : '+' + q})`;
    how = crossHow(a, b, c);
  } else if (v === 3) {
    let k, j; do { k = pick([2, 3, 4, 5, 6]); j = R(2, 9); } while (g_(k, j) !== 1);
    target = [-j * j, 0, k * k]; display = `${k * k}x^2 - ${j * j}`; answer = `(${k}x-${j})(${k}x+${j})`;
    how = `This is a difference of two squares: ${M(`${k * k}x^2 = (${k}x)^2`)} and ${M(`${j * j} = ${j}^2`)}.<br>The pattern is ${M('A^2 - B^2 = (A - B)(A + B)')}, so ${M(`${display} = (${k}x - ${j})(${k}x + ${j})`)}.`;
    hint = 'Is each term a perfect square? Then use A² − B² = (A − B)(A + B).';
  } else {
    const k = pick([2, 3, 4, 5]); let r1, r2; do { r1 = nz(-6, 6); r2 = nz(-6, 6); } while (r1 === r2);
    const inner = [r1 * r2, -(r1 + r2), 1];
    target = polyScale(inner, k); display = poly(k, -k * (r1 + r2), k * r1 * r2); answer = `${k}${fac(r1)}${fac(r2)}`.replace(/ /g, '');
    how = `Look for a common factor first. Every term divides by ${k}: ${M(`${display} = ${k}(${poly(1, -(r1 + r2), r1 * r2)})`)}<br>${factorHow(-(r1 + r2), r1 * r2, false)}So ${M(`${display} = ${k}${fac(r1)}${fac(r2)}`)}.`;
    hint = 'Take out any common factor first, then factorise what is left in the bracket.';
  }
  const q = mk({
    topic: 'factexp', kind: 'factor', tol: 0, target, placeholder: 'e.g. (x+1)(2x-3)',
    prompt: `Factorise completely ${M(display)}.`,
    fields: ['answer ='], answer: [], answerText: answer.replace(/\*/g, ''),
    hint, solution: how,
  });
  return q;
}

/* ---- A: fractional equations whose denominators factorise (book Review 1 Q6 g, h; mock paper Q1) ---- */
function gFrac3() {
  for (;;) {
    const t = R(1, 3); let A, B, C, tex, f, bad, how, hint;
    if (t === 1) {                                         // difference of squares denominator
      const a = R(1, 5), p = nz(-4, 4), w = nz(-8, 8), r = pick([1, 2, 3, -1, -2]);
      A = r; B = -p; C = -r * a * a - p * a - w; bad = [a, -a];
      tex = `\\dfrac{${p}}{${lin(-a)}} ${pm(w)} \\dfrac{${Math.abs(w)}}{x^2-${a * a}} = ${r}`; f = (x) => p / (x - a) + w / (x * x - a * a) - r;
      how = `Factorise the denominator: ${M(`x^2-${a * a} = (${lin(-a)})(${lin(a)})`)}. The common denominator is ${M(`(${lin(-a)})(${lin(a)})`)}.`;
      hint = `Factorise ${M(`x^2-${a * a}`)} first. Then multiply every term by the common denominator.`;
    } else if (t === 2) {                                  // sign flip: a^2 - x^2 = (a - x)(a + x)
      const a = R(1, 4), p = nz(-5, 5), u = nz(-6, 6), v = nz(-9, 9), r = pick([1, 2, 3, -1, -2]); if (r === u) continue;
      A = r - u; B = -p; C = p * a - v - r * a * a; bad = [a, -a];
      tex = `\\dfrac{${p}}{${lin(a)}} - \\dfrac{${poly(u, 0, v)}}{${a * a} - x^2} = ${r}`; f = (x) => p / (x + a) - (u * x * x + v) / (a * a - x * x) - r;
      how = `Factorise the second denominator: ${M(`${a * a} - x^2 = (${a} - x)(${a} + x)`)}. Note that ${M(`${a} - x`)} is the <b>opposite</b> of ${M(`x - ${a}`)}, so use ${M(`(${a} - x)(${a} + x)`)} as the common denominator.`;
      hint = `Factorise ${M(`${a * a} - x^2`)} as ${M(`(${a} - x)(${a} + x)`)}. Multiply every term by that, and take care with the minus sign in front of the fraction.`;
    } else {                                               // quadratic denominator that factorises
      const m = pick([1, 1, 2, 3]), a = nz(-4, 4), b = nz(-4, 4), p = nz(-4, 4), u = nz(-4, 4), v = nz(-8, 8), r = pick([1, 2, 3]);
      if (m * b === a) continue;
      A = r * m; B = r * (m * b + a) - p - u; C = r * a * b - p * b - v; bad = [-a / m, -b];
      tex = `\\dfrac{${p}}{${poly(0, m, a)}} + \\dfrac{${poly(0, u, v)}}{${poly(m, m * b + a, a * b)}} = ${r}`; f = (x) => p / (m * x + a) + (u * x + v) / (m * x * x + (m * b + a) * x + a * b) - r;
      how = `Factorise the quadratic denominator: ${M(`${poly(m, m * b + a, a * b)} = (${poly(0, m, a)})(${lin(b)})`)}. It contains the other denominator, so the common denominator is ${M(`(${poly(0, m, a)})(${lin(b)})`)}.`;
      hint = `Factorise the quadratic denominator first (use the multiplication frame). Then multiply every term by the common denominator.`;
    }
    const ans = quad(A, B, C); if (!ans || ans.some((x) => bad.some((z) => Math.abs(x - z) < 1e-7)) || Math.abs(A) > 14) continue;
    const q = mk({
      topic: 'frac3', kind: 'set',
      prompt: `Solve ${M(tex)}. Give answers to 2 decimal places.`,
      fields: [M('x =')], answer: ans, hint,
      solution: `${how}<br>x cannot be ${bad.map((z) => M(fmt(z))).join(' or ')}.<br>After clearing the fractions: ${M(poly(A, B, C) + '=0')}<br>${formulaHow(A, B, C)}${M('x=' + orList(ans))} (2 d.p.). Neither answer is an excluded value, so both are valid.`,
    });
    return withRes(q, f);
  }
}

/* ---- B: build a quadratic from information ---- */
function gFromRoots() {
  const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
  const one = () => { const d = pick([1, 1, 2, 3, 4, 5, 6, 7]), n = nz(-8, 8); const g = gcd(n, d); return [n / g, d / g]; };
  let r1, r2; do { r1 = one(); r2 = one(); } while (r1[0] / r1[1] === r2[0] / r2[1] || (r1[1] === 1 && r2[1] === 1 && Math.random() < 0.6));
  const [p1, q1] = r1, [p2, q2] = r2;                       // (q1 x - p1)(q2 x - p2)
  let a = q1 * q2, b = -(q1 * p2 + q2 * p1), c = p1 * p2; const g = gcd(gcd(a, b), c); a /= g; b /= g; c /= g;
  const show = ([n, d]) => (d === 1 ? `${n}` : `${n < 0 ? '-' : ''}\\dfrac{${Math.abs(n)}}{${d}}`);
  const brk = ([n, d]) => (d === 1 ? `(${lin(-n)})` : `(${poly(0, d, -n)})`);
  return mk({
    topic: 'fromroots', tol: 1e-6,
    prompt: `A quadratic equation has solutions ${M(`x = ${show(r1)}`)} and ${M(`x = ${show(r2)}`)}. Write it in the form ${M('ax^2+bx+c=0')}, where ${M('a')}, ${M('b')} and ${M('c')} are whole numbers and ${M('a')} is as small as possible and positive. Find ${M('a')}, ${M('b')} and ${M('c')}.`,
    fields: [M('a ='), M('b ='), M('c =')], answer: [a, b, c],
    hint: `If ${M('x=2')} then ${M('x-2=0')}. If ${M('x=\\tfrac{6}{7}')} then ${M('7x-6=0')}, so there is a factor ${M('(7x-6)')}. Multiply the two brackets, then check that ${M('a')}, ${M('b')}, ${M('c')} have no common factor.`,
    solution: `Each solution gives a bracket that equals zero: ${M(brk(r1) + ' = 0')} and ${M(brk(r2) + ' = 0')}.<br>The equation is ${M(brk(r1) + brk(r2) + ' = 0')}.<br>Expand: ${M(poly(a, b, c) + ' = 0')}.`,
  });
}

function gPQ() {
  if (Math.random() < 0.6) {
    let m, n; do { m = nz(-6, 6); n = nz(-6, 6); } while (m === n);
    const pv = -(m + n), qv = m * n, mid = (m + n) / 2, minv = qv - mid * mid;
    return mk({
      topic: 'pq', tol: 0.011,
      prompt: `The curve ${M('y = x^2 + px + q')} cuts the x-axis at ${M('x=' + m)} and ${M('x=' + n)}. Find ${M('p')} and ${M('q')}, and the minimum value of ${M('y')}.`,
      fields: [M('p ='), M('q ='), 'minimum value of y ='], answer: [pv, qv, minv],
      hint: `The curve is ${M(`y = (x ${plus(-m)})(x ${plus(-n)})`)}. Expand it to find p and q. The minimum is at the x-value halfway between the two intercepts.`,
      solution: `${M(`y = (x ${plus(-m)})(x ${plus(-n)}) = ${poly(1, pv, qv)}`)}<br>So ${M('p=' + pv)} and ${M('q=' + qv)}.<br>Turning point at ${M(`x = \\dfrac{${m}+${par(n)}}{2} = ${fmt(mid)}`)}, where ${M('y = ' + fmt(minv))}.`,
    });
  }
  const h = nz(-5, 5), k = nz(-9, 9);
  return mk({
    topic: 'pq', tol: 1e-6,
    prompt: `The curve ${M('y = x^2 + px + q')} has its minimum point at ${M(`(${h}, ${k})`)}. Find ${M('p')} and ${M('q')}.`,
    fields: [M('p ='), M('q =')], answer: [-2 * h, h * h + k],
    hint: `A curve with minimum point ${M('(h, k)')} can be written ${M('y = (x-h)^2 + k')}. Expand it and compare with ${M('x^2+px+q')}.`,
    solution: `${M(`y = (x ${plus(-h)})^2 ${plus(k)} = ${poly(1, -2 * h, h * h + k)}`)}<br>So ${M('p=' + -2 * h)} and ${M('q=' + (h * h + k))}.`,
  });
}

/* ---- C: horizontal lines and a parabola (mock paper: sketching Q1, Q2, Q3) ---- */
function gHLine() {
  const v = R(1, 3), s = pick([1, -1]); let expr, py;
  if (v === 1) { const p = nz(-5, 5), q = nz(-8, 8); expr = `${s < 0 ? '-' : ''}(${lin(-p)})^2 ${plus(q)}`; py = q; }
  else if (v === 2) { let h, k; do { h = nz(-6, 6); k = nz(-6, 6); } while (h === k); expr = `${s < 0 ? '-' : ''}${fac(h)}${fac(k)}`; const mid = (h + k) / 2; py = s * (mid - h) * (mid - k); }
  else { const b = pick([-6, -4, -2, 2, 4, 6, 3, 5, -3, -5]), c = R(-6, 8); expr = poly(s, b, c); py = s === 1 ? c - (b * b) / 4 : c + (b * b) / 4; }
  let k; const pick3 = Math.random();
  if (pick3 < 0.2) k = py; else { const d = pick([1, 2, 3, 4, 5, 0.5, 1.5]); k = py + (Math.random() < 0.5 ? d : -d); }
  const above = k > py + 1e-9, onIt = Math.abs(k - py) < 1e-9;
  const count = onIt ? 1 : (s === 1 ? (above ? 2 : 0) : (above ? 0 : 2));
  return mk({
    topic: 'hline', tol: 0.011,
    prompt: `The curve ${M('y = ' + expr)} ${s > 0 ? 'has a lowest point' : 'has a highest point'}. (a) How many points do the curve and the line ${M('y = ' + fmt(k))} have in common (0, 1 or 2)? (b) Write down the equation of the horizontal line ${M('y = k')} that touches the curve at exactly one point. Give ${M('k')}.`,
    fields: ['(a) number of common points =', M('(b)\\ k =')], answer: [count, py],
    hint: `A horizontal line meets the curve once only at the turning point. Find the ${s > 0 ? 'minimum' : 'maximum'} value of y. The line ${M('y=' + fmt(k))} is ${onIt ? 'exactly level with it' : above ? 'above it' : 'below it'}, and the curve opens ${s > 0 ? 'upwards' : 'downwards'}.`,
    solution: `The ${s > 0 ? 'lowest' : 'highest'} point of the curve has ${M('y=' + fmt(py))}.<br>Because the curve opens ${s > 0 ? 'upwards' : 'downwards'}, every value of y on the curve is ${s > 0 ? 'at least' : 'at most'} ${fmt(py)}.<br>` +
      `The line ${M('y=' + fmt(k))} ${onIt ? 'touches the curve once, at the turning point' : (count === 2 ? `is ${s > 0 ? 'above' : 'below'} the turning point, so it cuts the curve twice` : `is ${s > 0 ? 'below' : 'above'} the turning point, so it never meets the curve`)}: ${count} common point${count === 1 ? '' : 's'}.<br>(b) ${M('k=' + fmt(py))}.`,
  });
}


/* ======================================================================
   Gaps E to H: "hence", substitution, more story types, challenge questions, reading graphs
   ====================================================================== */
const r2 = (n) => Math.round(n * 100) / 100;
const cf = (n) => (n === 1 ? '' : n === -1 ? '-' : String(n));
const hm = (h) => { const t = Math.round(h * 60), H = Math.floor(t / 60), m = t % 60; return `${H ? `${H} hour${H === 1 ? '' : 's'}` : ''}${H && m ? ' ' : ''}${m ? `${m} minutes` : ''}`; };
const tryFind = (make, ok, fallback) => { for (let i = 0; i < 4000; i++) { const p = make(); if (ok(p)) return p; } return fallback; };

/* ---- E: "hence" questions (mock paper: express then solve; Review 1 Q4: substitution) ---- */
function gHence() {
  let b, c, D; do { b = nz(-9, 9); c = R(-12, 8); D = b * b - 4 * c; } while (D <= 0 || isSquare(D));
  const a = b / 2, k = c - a * a, r = quad(1, b, c);
  return mk({
    topic: 'hence', tol: [0.006, 0.006, 0.011, 0.011],
    prompt: `(a) Express ${M(poly(1, b, c))} in the form ${M('(x+a)^2+k')}. (b) <b>Hence</b> solve ${M(poly(1, b, c) + ' = 0')}, giving your answers correct to 2 decimal places.`,
    fields: [M('a ='), M('k ='), 'larger solution, x =', 'smaller solution, x ='], answer: [a, k, r[0], r[1]],
    hint: `"Hence" means <b>use your answer to part (a)</b>. Once ${M(poly(1, b, c))} is written as ${M('(x+a)^2+k')}, set it equal to 0, move ${M('k')} across and take square roots. a and k can be fractions (like 3/2) or decimals.`,
    solution: `(a) ${M(`${poly(1, b, 0)} = (x ${plus(a)})^2 - ${par(a)}^2`)}, so ${M(`${poly(1, b, c)} = (x ${plus(a)})^2 ${plus(k)}`)}. Here ${M('a=' + fmt(a))} and ${M('k=' + fmt(k))}.<br>` +
      `(b) ${M(`(x ${plus(a)})^2 ${plus(k)} = 0`)}<br>${M(`(x ${plus(a)})^2 = ${fmt(-k)}`)}<br>${M(`x ${plus(a)} = \\pm\\sqrt{${fmt(-k)}}`)}<br>${M('x=' + orList(r))} (2 d.p.)`,
  });
}

function gSubst() {
  let a, b, c, r; do { a = pick([1, 2, 3, -2, -3]); b = nz(-9, 9); c = nz(-9, 9); r = quad(a, b, c); } while (!r || isSquare(b * b - 4 * a * c));
  r = r.slice().sort((u, v) => v - u);
  const s = nz(-4, 4), t = (n) => `${n < 0 ? '- ' : '+ '}${Math.abs(n) === 1 ? '' : Math.abs(n)}`;
  const eq2 = `${cf(a)}(y ${plus(-s)})^2 ${t(b)}(y ${plus(-s)}) ${plus(c)} = 0`;
  const q = mk({
    topic: 'subst', tol: 0.011,
    prompt: `(i) Solve ${M(poly(a, b, c) + ' = 0')}, giving your answers correct to 2 decimal places. (ii) <b>Hence</b> find the values of ${M('y')} that satisfy ${M(eq2)}.`,
    fields: ['(i) larger solution, x =', '(i) smaller solution, x =', '(ii) larger y =', '(ii) smaller y ='], answer: [r[0], r[1], r[0] + s, r[1] + s],
    hint: `Look at ${M(`(y ${plus(-s)})`)} in part (ii). It plays the part of ${M('x')} in part (i). So ${M(`y ${plus(-s)} = x`)}. Use your two answers from (i) and solve for y.`,
    solution: `(i) ${M('x=' + orList(r))} (2 d.p.)<br>(ii) The equation is the same as (i) with ${M(`x`)} replaced by ${M(`(y ${plus(-s)})`)}. So ${M(`y ${plus(-s)} = ${fmt(r[0])}`)} or ${M(`y ${plus(-s)} = ${fmt(r[1])}`)}.<br>${M(`y = ${fmt(r[0] + s)}`)} or ${M(`y = ${fmt(r[1] + s)}`)}.`,
  });
  return withRes(q, (y) => a * (y - s) ** 2 + b * (y - s) + c);
}

/* ---- H: read values from a graph (book Exercise 1E Q11, Review 1 Q13) ---- */
function plotSvg(f, xmin, xmax, ymin, ymax, xs, ys) {
  const W = 480, H = 300, mx = 38, my = 18, X = (x) => mx + ((x - xmin) / (xmax - xmin)) * (W - 2 * mx), Y = (y) => H - my - ((y - ymin) / (ymax - ymin)) * (H - 2 * my);
  let g = '';
  for (let x = Math.ceil(xmin); x <= xmax; x++) g += `<line x1="${X(x)}" y1="${my}" x2="${X(x)}" y2="${H - my}" class="gl"/>` + (x % xs === 0 ? `<text x="${X(x)}" y="${H - 3}" class="gt" text-anchor="middle">${x}</text>` : '');
  for (let y = Math.ceil(ymin); y <= ymax; y++) g += `<line x1="${mx}" y1="${Y(y)}" x2="${W - mx}" y2="${Y(y)}" class="gl"/>` + (y % ys === 0 ? `<text x="${mx - 5}" y="${Y(y) + 4}" class="gt" text-anchor="end">${y}</text>` : '');
  g += `<line x1="${mx}" y1="${Y(0)}" x2="${W - mx}" y2="${Y(0)}" class="ga"/><line x1="${X(0)}" y1="${my}" x2="${X(0)}" y2="${H - my}" class="ga"/>`;
  let d = ''; for (let x = xmin; x <= xmax + 1e-9; x += 0.05) { const y = f(x); if (y >= ymin - 1) d += (d ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(y).toFixed(1); }
  g += `<path d="${d}" class="gc"/>`;
  return `<svg class="rgsvg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Graph">${g}</svg>`;
}

function gReadGraph() {
  const bb = pick([4, 6, 8, 10]), c = R(2, 9), ymax = c + (bb * bb) / 4, f = (x) => c + bb * x - x * x;
  const land = (bb + Math.sqrt(bb * bb + 4 * c)) / 2;
  const Y0 = R(Math.ceil(c) + 1, Math.floor(ymax) - 1), xY0 = (bb + Math.sqrt(bb * bb - 4 * (Y0 - c))) / 2;
  const svg = plotSvg(f, 0, Math.ceil(land) + 1, 0, Math.ceil(ymax) + 1, 1, Math.ceil(ymax + 1) > 14 ? 4 : 2);
  return mk({
    topic: 'readgraph', tol: [0.6, 0.5, 0.5],
    prompt: `A ball is thrown from a platform. Its height ${M('y')} metres above the ground, at a horizontal distance ${M('x')} metres from the platform, is ${M(`y = ${c} ${plus(bb)}x - x^2`)}. The graph is drawn below.<br>${svg}<br>Use the graph to find: (a) the greatest height, (b) the horizontal distance at which the ball is ${Y0} m high on its way down, (c) the horizontal distance at which the ball hits the ground. Read to the nearest 0.5 (answers within 0.5 are accepted).`,
    fields: ['(a) greatest height (m) =', `(b) x when y = ${Y0} (the later one) =`, '(c) x when it lands ='], answer: [ymax, xY0, land],
    hint: `The highest point is the top of the curve. For (b), go across at height ${Y0} until you hit the curve on the right-hand side, then read down. For (c) read where the curve meets the x-axis on the right.`,
    solution: `(a) The turning point is at ${M(`x=${bb / 2}`)}, so the greatest height is ${M(`y = ${c} + ${bb / 2}\\times${bb} - ${(bb / 2) ** 2} = ${fmt(ymax)}`)} m.<br>(b) Solve ${M(`${Y0} = ${c} ${plus(bb)}x - x^2`)}: ${M(`x \\approx ${fmt(xY0)}`)} (later of the two).<br>(c) Solve ${M(`0 = ${c} ${plus(bb)}x - x^2`)}: ${M(`x \\approx ${fmt(land)}`)} m (reject the negative solution).`,
  });
}

/* ---- F: more story types (book Exercise 1E and Review 1) ---- */
function formulaHow2(A, B, C) { return formulaHow(r2(A), r2(B), r2(C)); }

function gPrice() {
  const P = tryFind(() => ({ x0: pick([1.5, 2, 2.5, 3, 3.5, 4, 5]), d: pick([0.2, 0.4, 0.5]), q: pick([10, 15, 20, 25, 30, 40, 45, 50]) }),
    (p) => { const S = (p.q * p.x0 * (p.x0 - p.d)) / p.d; return Math.abs(S - Math.round(S)) < 1e-9 && S >= 100 && S <= 2000 && p.x0 > p.d; }, { x0: 2.5, d: 0.5, q: 20 });
  const { x0, d, q } = P, S = Math.round((q * x0 * (x0 - d)) / d);
  const a = q, b = r2(-q * d), c = r2(-S * d);
  const out = mk({
    topic: 'price', tol: 0.011,
    prompt: `In January a food company spent $${S} on rice from Brand A, which costs $${M('x')} per kilogram. In February it spent $${S} on rice from Brand B, which costs $${fmt(d)} less per kilogram than Brand A. It bought ${q} kg more rice in February than in January. Form an equation in ${M('x')}, solve it, and find the price per kilogram of Brand B.`,
    fields: [M('x \\text{ (Brand A, \\$ per kg)} ='), 'Brand B ($ per kg) ='], answer: [x0, x0 - d],
    hint: `Kilograms bought = money spent ÷ price per kg. January: ${M(`\\dfrac{${S}}{x}`)}. February: ${M(`\\dfrac{${S}}{x-${fmt(d)}}`)}. February is ${q} kg more than January. Multiply through by the common denominator.`,
    solution: `${M(`\\dfrac{${S}}{x-${fmt(d)}} - \\dfrac{${S}}{x} = ${q}`)}<br>${M(`${S}x - ${S}(x-${fmt(d)}) = ${q}x(x-${fmt(d)})`)}<br>${M(`${q}x^2 - ${fmt(q * d)}x - ${fmt(S * d)} = 0`)}<br>${formulaHow2(a, b, c)}${M('x = ' + fmt(x0))} (reject the negative root, since a price cannot be negative).<br>Brand B costs ${M(`\\$${fmt(x0 - d)}`)} per kg.`,
  });
  return withRes(out, (x) => S / (x - d) - S / x - q);
}

function gExch() {
  const [x0, x1] = pick([[2, 2.5], [2, 4], [4, 5], [2.5, 5], [1.25, 2.5], [0.8, 1]]), d = r2(x1 - x0);
  const m = R(2, 9) * 100, n = R(2, 9) * 100, A = r2(x0 * m), B = r2(x1 * n), T = m + n;
  const a = T, b = r2(T * d - A - B), c = r2(-A * d);
  const out = mk({
    topic: 'exch', tol: 0.011,
    prompt: `Two weeks before her trip, Mei exchanged S$${fmt(A)} into US dollars at a rate of US$1 = S$${M('x')}. One week before her trip she exchanged another S$${fmt(B)} at a different shop, at a rate of US$1 = S$${M(`(x + ${fmt(d)})`)}. Altogether she received US$${T}. Form an equation in ${M('x')}, solve it, and find the exchange rate at the second shop.`,
    fields: [M('x =') + ' (S$ for US$1, first shop)', 'second shop, S$ for US$1 ='], answer: [x0, x1],
    hint: `US dollars received = S dollars exchanged ÷ rate. First shop: ${M(`\\dfrac{${fmt(A)}}{x}`)}. Second shop: ${M(`\\dfrac{${fmt(B)}}{x+${fmt(d)}}`)}. Together they make US$${T}.`,
    solution: `${M(`\\dfrac{${fmt(A)}}{x} + \\dfrac{${fmt(B)}}{x+${fmt(d)}} = ${T}`)}<br>${M(`${fmt(A)}(x+${fmt(d)}) + ${fmt(B)}x = ${T}x(x+${fmt(d)})`)}<br>${M(`${T}x^2 ${plus(b)}x ${plus(c)} = 0`)}<br>${formulaHow2(a, b, c)}${M('x = ' + fmt(x0))} (reject the negative root). The second shop's rate is ${M(`x + ${fmt(d)} = ${fmt(x1)}`)}.`,
  });
  return withRes(out, (x) => A / x + B / (x + d) - T);
}

function gRate() {
  const P = tryFind(() => ({ V: pick([1200, 1500, 1800, 2000, 2400, 3000]), x0: pick([20, 25, 30, 40, 50, 60, 75, 100]), d: pick([10, 20, 25, 50]) }),
    (p) => { const s = (60 * p.V * p.d) / (p.x0 * (p.x0 + p.d)); return Math.abs(s - Math.round(s)) < 1e-9 && s >= 6 && s <= 300; }, { V: 1500, x0: 100, d: 50 });
  const { V, x0, d } = P, s = Math.round((60 * V * d) / (x0 * (x0 + d))), a = s, b = s * d, c = -60 * V * d;
  const out = mk({
    topic: 'rate', tol: 0.011,
    prompt: `A tank holds ${V} litres when full. Pump A fills it at ${M('x')} litres per minute. Pump B fills it at ${M(`(x+${d})`)} litres per minute. Pump A takes ${s} seconds longer than Pump B to fill the tank completely. Form an equation in ${M('x')}, solve it, and find the time Pump B takes to fill the tank, in seconds.`,
    fields: [M('x =') + ' (litres per minute)', 'Pump B takes (seconds) ='], answer: [x0, (60 * V) / (x0 + d)],
    hint: `Time in minutes = litres ÷ rate. Pump A: ${M(`\\dfrac{${V}}{x}`)}. Pump B: ${M(`\\dfrac{${V}}{x+${d}}`)}. The difference is ${s} seconds, which is ${M(`\\dfrac{${s}}{60}`)} minutes. Convert units before you form the equation.`,
    solution: `${M(`\\dfrac{${V}}{x} - \\dfrac{${V}}{x+${d}} = \\dfrac{${s}}{60}`)}<br>${M(`60\\times${V}(x+${d}) - 60\\times${V}x = ${s}x(x+${d})`)}<br>${M(`${s}x^2 + ${s * d}x - ${60 * V * d} = 0`)}<br>${formulaHow2(a, b, c)}${M('x = ' + x0)} (reject the negative root).<br>Pump B: ${M(`\\dfrac{${V}}{${x0 + d}}`)} minutes = ${fmt((60 * V) / (x0 + d))} seconds.`,
  });
  return withRes(out, (x) => V / x - V / (x + d) - s / 60);
}

function gStream() {
  const P = tryFind(() => ({ x0: R(8, 30), c: R(2, 6), D: pick([6, 8, 10, 12, 15, 18, 24]) }),
    (p) => { const H = (2 * p.D * p.x0) / (p.x0 * p.x0 - p.c * p.c); return p.x0 > p.c + 1 && Math.abs(H * 4 - Math.round(H * 4)) < 1e-9 && H >= 1 && H <= 6; }, { x0: 10, c: 2, D: 12 });
  const { x0, c, D } = P, H = r2((2 * D * x0) / (x0 * x0 - c * c)), a = H, b = -2 * D, cc = r2(-H * c * c);
  const out = mk({
    topic: 'stream', tol: 0.011,
    prompt: `A boat travels ${D} km upstream and then ${D} km back downstream in ${hm(H)}. The speed of the current is ${c} km/h. Let the speed of the boat in still water be ${M('x')} km/h. Form an equation in ${M('x')}, solve it, and find the time taken for the upstream journey, in minutes.`,
    fields: [M('x =') + ' (km/h)', 'upstream time (minutes) ='], answer: [x0, (60 * D) / (x0 - c)],
    hint: `Upstream the boat goes at ${M(`(x-${c})`)} km/h and downstream at ${M(`(x+${c})`)} km/h. Time = distance ÷ speed. The two times add up to ${fmt(H)} hours.`,
    solution: `${M(`\\dfrac{${D}}{x-${c}} + \\dfrac{${D}}{x+${c}} = ${fmt(H)}`)}<br>${M(`${D}(x+${c}) + ${D}(x-${c}) = ${fmt(H)}(x-${c})(x+${c})`)}<br>${M(`${fmt(H)}x^2 - ${2 * D}x - ${fmt(H * c * c)} = 0`)}<br>${formulaHow2(a, b, cc)}${M('x = ' + x0)} (reject the negative root).<br>Upstream time: ${M(`\\dfrac{${D}}{${x0 - c}}`)} hours = ${fmt((60 * D) / (x0 - c))} minutes.`,
  });
  return withRes(out, (x) => D / (x - c) + D / (x + c) - H);
}

function gJourney() {
  const P = tryFind(() => ({ x0: pick([3, 4, 5, 6, 8]), d: pick([1, 2]), Dr: pick([6, 8, 10, 12, 15]), a0: pick([2, 3, 4]) }),
    (p) => { const m = (60 * p.Dr * p.d) / (p.x0 * (p.x0 + p.d)); return Math.abs(m - Math.round(m)) < 1e-9 && m >= 5 && m <= 60; }, { x0: 4, d: 1, Dr: 8, a0: 2 });
  const { x0, d, Dr, a0 } = P, m = Math.round((60 * Dr * d) / (x0 * (x0 + d))), Dt = Dr + a0;
  const out = mk({
    topic: 'journey', tol: 0.011,
    prompt: `Mei and Raj start a ${Dt} km hike together, both walking at ${M('x')} km/h. After ${a0} km, Mei speeds up to ${M(`(x+${d})`)} km/h for the rest. Raj keeps walking at ${M('x')} km/h throughout. Mei finishes ${m} minutes before Raj. Form an equation in ${M('x')}, solve it, and find how long Mei takes for the whole hike, in hours to 2 decimal places.`,
    fields: [M('x =') + ' (km/h)', 'Mei\'s total time (hours) ='], answer: [x0, a0 / x0 + Dr / (x0 + d)],
    hint: `Raj's time is ${M(`\\dfrac{${Dt}}{x}`)}. Mei's time is ${M(`\\dfrac{${a0}}{x}`)} for the first part plus ${M(`\\dfrac{${Dr}}{x+${d}}`)} for the rest. Raj takes ${m} minutes (that is ${M(`\\dfrac{${m}}{60}`)} hour) longer.`,
    solution: `${M(`\\dfrac{${Dt}}{x} - \\left(\\dfrac{${a0}}{x} + \\dfrac{${Dr}}{x+${d}}\\right) = \\dfrac{${m}}{60}`)}<br>The first parts cancel: ${M(`\\dfrac{${Dr}}{x} - \\dfrac{${Dr}}{x+${d}} = \\dfrac{${m}}{60}`)}<br>${M(`${m}x^2 + ${m * d}x - ${60 * Dr * d} = 0`)}<br>${formulaHow2(m, m * d, -60 * Dr * d)}${M('x = ' + x0)} (reject the negative root).<br>Mei: ${M(`\\dfrac{${a0}}{${x0}} + \\dfrac{${Dr}}{${x0 + d}} = ${fmt(a0 / x0 + Dr / (x0 + d))}`)} hours.`,
  });
  return withRes(out, (x) => Dt / x - (a0 / x + Dr / (x + d)) - m / 60);
}

function gBorder() {
  let L, W, x0; do { L = R(14, 40); W = R(10, 30); x0 = R(1, 5); } while (L <= W || 2 * x0 >= W - 2);
  const A = (L - 2 * x0) * (W - 2 * x0), a = 4, b = -2 * (L + W), c = L * W - A;
  const out = mk({
    topic: 'border', tol: 1e-6,
    prompt: `A rectangular room is ${L} m by ${W} m. A uniform border ${M('x')} m wide is left bare all around the edge, and the rest of the floor is covered with tiles. The tiled area is ${A} m². Form an equation in ${M('x')} and solve it to find the width of the border.`,
    fields: [M('x \\text{ (m)} =')], answer: [x0],
    hint: `The tiled rectangle is ${M(`(${L} - 2x)`)} m by ${M(`(${W} - 2x)`)} m. Its area is ${A}. Expand, collect, solve, then decide which solution is sensible: a border cannot be wider than half the room.`,
    solution: `${M(`(${L}-2x)(${W}-2x) = ${A}`)}<br>${M(`4x^2 - ${2 * (L + W)}x + ${c} = 0`)}<br>${formulaHow2(a, b, c)}${M('x = ' + x0)} or ${M('x = ' + fmt((L + W) / 2 - x0))}.<br>The second solution is bigger than half the width of the room (${W / 2} m), so the floor would have no room left. Reject it. The border is ${x0} m wide.`,
  });
  return withRes(out, (x) => (L - 2 * x) * (W - 2 * x) - A);
}

function gPerim() {
  const P = tryFind(() => { const per = pick([72, 80, 90, 96, 100, 104, 112, 120]), h = per / 2, A = R(Math.floor(h * h / 4) - 60, Math.floor(h * h / 4) - 2); return { per, h, A }; },
    (p) => { const D = p.h * p.h - 4 * p.A; return D > 4 && !isSquare(D) && p.A > 100; }, { per: 112, h: 56, A: 597 });
  const { per, h, A } = P, roots = quad(1, -h, A), D = h * h - 4 * A;
  const out = mk({
    topic: 'perim', tol: [1e-6, 1e-6, 0.011, 0.011],
    prompt: `The perimeter of a rectangular poster is ${per} cm and its area is ${A} cm². Let its breadth be ${M('x')} cm. Form the equation ${M('x^2 + bx + c = 0')} and find ${M('b')} and ${M('c')}. Then solve it, giving both answers to 2 decimal places. These are the breadth and the length.`,
    fields: [M('b ='), M('c ='), 'smaller side (cm) =', 'larger side (cm) ='], answer: [-h, A, roots[1], roots[0]],
    hint: `Length + breadth = half the perimeter = ${h}. So the length is ${M(`(${h} - x)`)}. Area = breadth × length = ${A}. Expand and move everything to one side.`,
    solution: `${M(`x(${h}-x) = ${A}`)}<br>${M(`x^2 - ${h}x + ${A} = 0`)}, so ${M(`b = -${h}`)} and ${M(`c = ${A}`)}.<br>${formulaHow2(1, -h, A)}${M('x = ' + orList(roots))} (2 d.p.). The two solutions are the two side lengths: ${fmt(roots[1])} cm and ${fmt(roots[0])} cm.`,
  });
  return withRes(out, (x) => x * (h - x) - A);
}

function gCakes() {
  const P = tryFind(() => ({ M0: pick([3, 4, 5, 6, 8]), x0: pick([50, 100, 125, 150, 200, 250]), d: pick([10, 20, 25, 50]) }),
    (p) => { const k = (1000 * p.M0 * p.d) / (p.x0 * (p.x0 + p.d)); return Math.abs(k - Math.round(k)) < 1e-9 && k >= 2 && k <= 40; }, { M0: 6, x0: 100, d: 20 });
  const { M0, x0, d } = P, k = Math.round((1000 * M0 * d) / (x0 * (x0 + d))), G = 1000 * M0;
  const out = mk({
    topic: 'cakes', tol: 1e-6,
    prompt: `Jon uses ${M('x')} grams of sugar to bake one cake. Ria changes the recipe and uses ${d} g more sugar per cake. Jon bakes ${k} more cakes than Ria when each uses exactly ${M0} kg of sugar in total. Form an equation in ${M('x')}, solve it, and find the number of cakes Jon bakes. (1 kg = 1000 g)`,
    fields: [M('x =') + ' (grams)', 'cakes baked by Jon ='], answer: [x0, G / x0],
    hint: `Change ${M0} kg into grams first. Jon bakes ${M(`\\dfrac{${G}}{x}`)} cakes. Ria bakes ${M(`\\dfrac{${G}}{x+${d}}`)}. Jon's number minus Ria's number is ${k}.`,
    solution: `${M0} kg = ${G} g.<br>${M(`\\dfrac{${G}}{x} - \\dfrac{${G}}{x+${d}} = ${k}`)}<br>${M(`${G}(x+${d}) - ${G}x = ${k}x(x+${d})`)}<br>${M(`${k}x^2 + ${k * d}x - ${G * d} = 0`)}<br>${formulaHow2(k, k * d, -G * d)}${M('x = ' + x0)} (reject the negative root).<br>Jon bakes ${M(`\\dfrac{${G}}{${x0}} = ${G / x0}`)} cakes.`,
  });
  return withRes(out, (x) => G / x - G / (x + d) - k);
}

/* ---- G: Challenge Yourself (stretch): simultaneous equations, one x-intercept, sum and product of roots ---- */
function gSimult() {
  const v = R(1, 3); let q;
  if (v === 1) {
    let a, b; do { a = nz(-7, 7); b = nz(-7, 7); } while (a >= b);
    q = mk({ topic: 'simult', tol: 1e-6, prompt: `<span class="tag">Stretch</span> Solve the simultaneous equations ${M(`x + y = ${a + b}`)} and ${M(`xy = ${a * b}`)}. Give the solution with the smaller x first.`,
      fields: [M('x_1 ='), M('y_1 ='), M('x_2 ='), M('y_2 =')], answer: [a, b, b, a],
      hint: `From the first equation, ${M(`y = ${a + b} - x`)}. Put that into the second equation and solve the quadratic in x.`,
      solution: `${M(`y = ${a + b} - x`)}<br>${M(`x(${a + b} - x) = ${a * b}`)}<br>${M(`x^2 - ${a + b}x + ${a * b} = 0`)}<br>${factorHow(-(a + b), a * b)}${M(`x = ${a}`)} gives ${M(`y = ${b}`)}; ${M(`x = ${b}`)} gives ${M(`y = ${a}`)}.` });
    return withRes(q, () => 0);
  }
  if (v === 2) {
    let r1, r2; do { r1 = nz(-5, 5); r2 = nz(-5, 5); } while (r1 >= r2);
    const m = nz(-3, 3), n = nz(-6, 6), b = m - (r1 + r2), c = n + r1 * r2;
    q = mk({ topic: 'simult', tol: 1e-6, prompt: `<span class="tag">Stretch</span> The line ${M('y = ' + poly(0, m, n))} meets the curve ${M('y = ' + poly(1, b, c))} at two points. Find their coordinates. Give the point with the smaller x first.`,
      fields: [M('x_1 ='), M('y_1 ='), M('x_2 ='), M('y_2 =')], answer: [r1, m * r1 + n, r2, m * r2 + n],
      hint: `Where they meet, the two y-values are equal. Set ${M(poly(0, m, n))} equal to ${M(poly(1, b, c))}, collect to ${M('ax^2+bx+c=0')} and solve for x. Then put each x into the line to get y.`,
      solution: `${M(`${poly(1, b, c)} = ${poly(0, m, n)}`)}<br>${M(`${poly(1, b - m, c - n)} = 0`)}<br>${factorHow(b - m, c - n)}x = ${r1} or ${r2}. Then ${M(`y = ${poly(0, m, n).replace(/x/g, `(${r1})`)} = ${m * r1 + n}`)} and ${M(`y = ${poly(0, m, n).replace(/x/g, `(${r2})`)} = ${m * r2 + n}`)}.` });
    return q;
  }
  for (;;) {
    const s = R(2, 6), p = pick([-4, -3, -2, 2, 3, 4]), qq = pick([-2, -1, 1, 2, 3]), A = 1 - p + qq, B = s * (p - 2 * qq), C = qq * s * s;
    if (A === 0) continue;
    const ans = quad(A, B, C); if (!ans || ans.some((v) => !Number.isFinite(v)) || ans.some((v) => Math.abs(v) > 40)) continue; const xs = ans.slice().sort((x, y) => x - y);
    q = mk({ topic: 'simult', tol: 0.011, prompt: `<span class="tag">Stretch</span> Solve ${M(`x + y = ${s}`)} and ${M(`x^2 ${p < 0 ? '-' : '+'} ${Math.abs(p)}xy ${qq < 0 ? '-' : '+'} ${Math.abs(qq) === 1 ? '' : Math.abs(qq)}y^2 = 0`)}. Give answers to 2 decimal places, smaller x first.`,
      fields: [M('x_1 ='), M('y_1 ='), M('x_2 ='), M('y_2 =')], answer: [xs[0], s - xs[0], xs[1], s - xs[1]],
      hint: `From the first equation, ${M(`y = ${s} - x`)}. Replace every y in the second equation by ${M(`(${s} - x)`)}, expand and collect.`,
      solution: `${M(`y = ${s} - x`)}<br>After substituting and collecting: ${M(poly(A, B, C) + '=0')}<br>${formulaHow2(A, B, C)}${M('x=' + orList(xs))}. Then ${M('y = ' + s + ' - x')} for each.` });
    return withRes(q, () => 0);
  }
}

function gOneInt() {
  const a = pick([1, 2, 3, 4, 5]), t = nz(-4, 4), b = 2 * a * t, c = a * t * t;
  return mk({
    topic: 'oneint', tol: 1e-6,
    prompt: `<span class="tag">Stretch</span> The graph of ${M(`y = ${poly(a, b, 0)} + c`)} cuts the x-axis at exactly one point ${M('P')}. Find ${M('c')} and the x-coordinate of ${M('P')}.`,
    fields: [M('c ='), M('x\\text{-coordinate of } P =')], answer: [c, -t],
    hint: `One point on the x-axis means the equation ${M(`${poly(a, b, 0)} + c = 0`)} has exactly one solution, so ${M('b^2-4ac=0')}. Solve for c, then solve the equation.`,
    solution: `${M(`${b}^2 - 4(${a})c = 0`)}<br>${M(`c = ${c}`)}<br>${M(`${poly(a, b, c)} = 0`)} gives ${M(`${a === 1 ? '' : a}(x ${plus(t)})^2 = 0`)}, so ${M('x = ' + -t)}.`,
  });
}

function gSumProd() {
  if (Math.random() < 0.55) {
    const a = pick([1, 2, 3, 4, 5]), b = nz(-9, 9), c = nz(-9, 9);
    return mk({
      topic: 'sumprod', tol: 0.006,
      prompt: `<span class="tag">Stretch</span> The equation ${M(poly(a, b, c) + ' = 0')} has solutions ${M('x=h')} and ${M('x=k')}. Without solving it, find ${M('h+k')} and ${M('hk')}. Give fractions like 7/2 or decimals to 2 d.p.`,
      fields: [M('h + k ='), M('hk =')], answer: [-b / a, c / a],
      hint: `If ${M('h')} and ${M('k')} are the solutions, then ${M('a(x-h)(x-k) = ax^2 - a(h+k)x + ahk')}. Compare it with ${M(poly(a, b, c))}.`,
      solution: `${M('a(x-h)(x-k) = ax^2 - a(h+k)x + a\\,hk')}. Comparing: ${M(`-a(h+k) = ${b}`)} and ${M(`a\\,hk = ${c}`)}.<br>${M(`h+k = \\dfrac{-${par(b)}}{${a}} = ${fmt(-b / a)}`)} and ${M(`hk = \\dfrac{${c}}{${a}} = ${fmt(c / a)}`)}.`,
    });
  }
  const r = nz(-6, 6), s = nz(-6, 6), b = r + s, c = r * s;
  return mk({
    topic: 'sumprod', tol: 1e-6,
    prompt: `<span class="tag">Stretch</span> One solution of ${M(`${poly(1, -b, 0)} + c = 0`)} is ${M('x=' + r)}. Find ${M('c')} and the other solution.`,
    fields: [M('c ='), 'other solution, x ='], answer: [c, s],
    hint: `Put ${M('x=' + r)} into the equation to find c. Then solve the equation, or use that the two solutions add up to ${b}.`,
    solution: `${M(`(${r})^2 ${plus(-b)}(${r}) + c = 0`)}, so ${M('c=' + c)}.<br>${M(`${poly(1, -b, c)} = 0`)}<br>${factorHow(-b, c)}The other solution is ${M('x = ' + s)}.`,
  });
}

/* ---------- registry ---------- */
const TOPICS = {
  factor:  { name: 'Solve by factorising',                gen: gFactor,    day: 1 },
  sqrt:    { name: 'Solve (x + r)² = s',                  gen: gSqrt,      day: 1 },
  ctsx:    { name: 'Complete the square (rewrite)',       gen: gCtsExpr,   day: 1 },
  factexp: { name: 'Factorise an expression',             gen: gFactExp,   day: 1 },
  ctsd:    { name: 'Complete the square: fractions and decimals', gen: gCtsDec, day: 1 },
  ctss:    { name: 'Solve by completing the square',      gen: gCtsSolve,  day: 2 },
  hence:   { name: 'Express, then hence solve',             gen: gHence,     day: 2 },
  ctsa:    { name: 'Stretch: complete the square, a not 1', gen: gCtsA,      day: 2, stretch: true },
  ctssa:   { name: 'Stretch: solve by completing the square, a not 1', gen: gCtsSolveA, day: 2, stretch: true },
  formula: { name: 'Quadratic formula',                   gen: gFormula,   day: 2 },
  rearr:   { name: 'Tidy up first, then solve',           gen: gRearr,     day: 2 },
  subst:   { name: 'Hence: substitution',                  gen: gSubst,     day: 2 },
  disc:    { name: 'Discriminant and number of roots',    gen: gDisc,      day: 2 },
  kval:    { name: 'Stretch: find an unknown using the discriminant', gen: gKval,   day: 2, stretch: true },
  fromroots: { name: 'Form an equation from its solutions', gen: gFromRoots, day: 2 },
  frac:    { name: 'Fractional equations',                gen: gFrac,      day: 3 },
  frac2:   { name: 'Harder fractional equations',         gen: gFrac2,     day: 3 },
  frac3:   { name: 'Fractions with factorisable denominators', gen: gFrac3, day: 3 },
  extra:   { name: 'Rejecting invalid roots',             gen: gExtra,     day: 3 },
  table:   { name: 'Table of values for a graph',         gen: gTable,     day: 4 },
  gfact:   { name: 'Graphs: factorised form',             gen: gGraphFact, day: 4 },
  gcs:     { name: 'Graphs: completed-square form',       gen: gGraphCS,   day: 4 },
  ctsn:    { name: 'Complete the square with −x²',        gen: gCtsNeg,    day: 4 },
  ggen:    { name: 'Graphs from the general form',        gen: gGGen,      day: 4 },
  gline:   { name: 'Which line solves another equation',  gen: gGLine,     day: 4 },
  hline:   { name: 'Horizontal lines and a curve',        gen: gHLine,     day: 4 },
  pq:      { name: 'Find p and q from a graph',           gen: gPQ,        day: 4 },
  readgraph: { name: 'Read values from a graph',            gen: gReadGraph, day: 4 },
  simult:  { name: 'Stretch: a line and a curve, simultaneous', gen: gSimult, day: 4, stretch: true },
  oneint:  { name: 'Stretch: exactly one x-intercept',     gen: gOneInt,    day: 4, stretch: true },
  gcsa:    { name: 'Stretch: graphs when a is not 1',    gen: gGCsA,      day: 4, stretch: true },
  rect:    { name: 'Word problems: area',                 gen: gRect,      day: 5 },
  speed:   { name: 'Word problems: speed and time',       gen: gSpeed,     day: 5 },
  proj:    { name: 'Word problems: maximum height',       gen: gProj,      day: 5 },
  pyth:    { name: 'Word problems: Pythagoras',           gen: gPyth,      day: 5 },
  consec:  { name: 'Word problems: consecutive numbers',  gen: gConsec,    day: 5 },
  work:    { name: 'Word problems: working together',     gen: gWork,      day: 5 },
  profit:  { name: 'Word problems: profit model',         gen: gProfit,    day: 5 },
  path:    { name: 'Word problems: path around a garden', gen: gPath,      day: 5 },
  price:   { name: 'Word problems: price per kilogram',   gen: gPrice,     day: 6 },
  exch:    { name: 'Word problems: exchange rates',       gen: gExch,      day: 6 },
  rate:    { name: 'Word problems: litres per minute',    gen: gRate,      day: 6 },
  stream:  { name: 'Word problems: upstream and downstream', gen: gStream, day: 6 },
  journey: { name: 'Word problems: a journey in two parts', gen: gJourney, day: 6 },
  border:  { name: 'Word problems: border inside a room', gen: gBorder,    day: 6 },
  perim:   { name: 'Word problems: perimeter and area',   gen: gPerim,     day: 6 },
  cakes:   { name: 'Word problems: grams per cake',       gen: gCakes,     day: 6 },
  sumprod: { name: 'Stretch: sum and product of solutions', gen: gSumProd, day: 2, stretch: true },
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
  if (q.kind === 'factor') {
    const bad = { bad: true, msg: 'I could not read that. Type it like (x+1)(2x-3), using x, brackets, and ^ for powers.' };
    const ast = parseAlg(vals[0]); if (!ast) return bad;
    let poly_; try { poly_ = polyOfExpr(ast); } catch (e) { return bad; }
    if (!polyEq(poly_, q.target)) return { ok: false, note: 'When I expand your answer it does not match the original expression. Expand your brackets to check.' };
    if (!isFullyFactored(ast)) return { ok: false, note: 'It has the right value, but it is not fully factorised yet. The answer should be a product of brackets.' };
    return { ok: true };
  }
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

if (typeof module !== 'undefined') module.exports = { TOPICS, generate, checkAnswer, parseNum, fmt, poly, parseAlg, polyOfExpr, polyEq, isFullyFactored };
