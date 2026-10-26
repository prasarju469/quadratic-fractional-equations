/* Lesson content. Each day is a list of blocks rendered in order by app.js. */

const SPINE = `Everything in this chapter grows from <b>one idea: completing the square</b>.
The quadratic formula is completing the square done once with letters. The turning point of a graph is what completing the square shows you.
Fractional equations and word problems both <i>end</i> in a quadratic.`;

/* The Rulebook: the fixed steps for each kind of problem. Maths runs on rules; join the rules to solve bigger problems. */
const RECIPES = [
  { id: 'factorise-solve', open: true, title: 'Solve by factorising: the P and S method',
    when: 'For equations like x² + bx + c = 0 when the answers are whole numbers.',
    steps: [
      `<b>Find P and S.</b> P is the constant term (the product). S is the number in front of x (the sum). Keep their signs.`,
      `<b>Find the two numbers</b> that multiply to P and add to S. Use the sign rules first, then list the factor pairs of P.`,
      `<b>Write the brackets:</b> \\((x + \\text{first number})(x + \\text{second number}) = 0\\).`,
      `<b>Zero Product Principle:</b> if two things multiply to give 0, one of them must be 0. So each bracket can equal 0.`,
      `<b>Solve each bracket.</b> The solution is the <b>opposite</b> of the number in the bracket.` ],
    example: `Solve \\(x^2+12x+32=0\\).<br>1. P = +32 and S = +12.<br>2. P and S are both positive, so both numbers are positive. Pairs of 32: 1×32, 2×16, 4×8. Only 4 + 8 = 12, so the numbers are 4 and 8.<br>3. \\((x+4)(x+8)=0\\)<br>4. \\(x+4=0\\) or \\(x+8=0\\)<br>5. \\(x=-4\\) or \\(x=-8\\)`,
    tip: `The brackets say +4 and +8, but the solutions are −4 and −8. A solution always has the <b>opposite</b> sign to the number in the bracket.`,
    topics: ['fstep', 'fpp', 'fpn', 'factor'] },

  { id: 'sign-rules', title: 'Sign rules for P and S', when: 'Use these before you search for the numbers. They tell you the signs for free.',
    html: `<table class="signs"><tr><th>P (product)</th><th>S (sum)</th><th>The two numbers</th><th>What to look for</th></tr>
      <tr><td>+</td><td>+</td><td>both <b>+</b></td><td>factors of P that <b>add</b> to S</td></tr>
      <tr><td>+</td><td>−</td><td>both <b>−</b></td><td>factors of P that add to the size of S, then make both negative</td></tr>
      <tr><td>−</td><td>+</td><td>one + and one −. The <b>bigger</b> number is +</td><td>factors of P that <b>differ</b> by S</td></tr>
      <tr><td>−</td><td>−</td><td>one + and one −. The <b>bigger</b> number is −</td><td>factors of P that <b>differ</b> by the size of S</td></tr>
      <tr><td>0</td><td>any</td><td>one number is 0</td><td>take out the common factor x</td></tr></table>`,
    example: `\\(x^2-3x-10\\): P = −10 (different signs) and S = −3 (so the bigger number is negative). Pairs of 10: 1×10 (differ by 9), 2×5 (differ by 3 ✔). The bigger one, 5, is negative, so the numbers are −5 and +2.`,
    topics: [] },

  { id: 'factorise-expr', title: 'Factorising an expression (no equals sign)', when: 'When the question says "factorise" and there is no "= 0".',
    steps: [
      `Look for a <b>common factor</b> of every term and take it out first: \\(3x^2-12x=3x(x-4)\\).`,
      `Two terms, both perfect squares, with a minus between? <b>Difference of two squares:</b> \\(A^2-B^2=(A-B)(A+B)\\).`,
      `Three terms and the x² has no number in front? Use <b>P and S</b>: steps 1 to 3 of the factorising recipe.`,
      `If the x² is negative, take out \\(-1\\) first, then carry on.`,
      `If the x² has a number in front, use the <b>ac-method</b> (next recipe).`,
      `Always <b>check by expanding</b> your brackets.` ],
    tip: `Factorising rewrites an expression. It does not "solve" anything, so there is no Zero Product step.`,
    topics: ['femon', 'fecom', 'fesq', 'feneg', 'factexp'] },

  { id: 'ac-method', title: 'The ac-method: when x² has a number in front', when: 'For expressions like 2x² + 5x − 7.',
    steps: [
      `<b>P = a × c</b> and <b>S = b</b>. Keep the signs.`,
      `Find two numbers that multiply to P and add to S, using the same sign rules.`,
      `<b>Split the middle term</b> using those two numbers.`,
      `<b>Group in pairs</b> and take out the common factor of each pair. The two brackets must match.`,
      `Take out the <b>common bracket</b>. You now have two brackets.` ],
    example: `\\(2x^2+5x-7\\): P = 2 × (−7) = −14 and S = 5. Pairs of 14 that differ by 5: 2 × 7, so the numbers are −2 and +7.<br>\\(2x^2-2x+7x-7 = 2x(x-1)+7(x-1) = (x-1)(2x+7)\\).`,
    topics: ['feac'] },

  { id: 'which-method', title: 'Which method? A rule that decides for you', when: 'When the question does not tell you how to solve it.',
    steps: [
      `If the question <b>names a method</b> (factorise, complete the square, formula, graph), use that one.`,
      `Rearrange so one side is 0: \\(ax^2+bx+c=0\\).`,
      `Work out \\(b^2-4ac\\).`,
      `If it is <b>negative</b>: there are no real solutions. Stop.`,
      `If it is a <b>perfect square</b> (0, 1, 4, 9, 16, 25, …): the equation factorises. Use P and S (or the ac-method).`,
      `If it is <b>not</b> a perfect square: the answers are not whole numbers. Use the <b>formula</b>, or complete the square.` ],
    tip: `"Give your answer correct to 2 decimal places" is a big hint that factorising will not work.`,
    topics: [] },

  { id: 'cts-rewrite', title: 'Completing the square: rewrite x² + bx + c', when: 'To write an expression as (x + p)² + q, or to find a turning point.',
    steps: [
      `Look at the number in front of x. Call it b.`,
      `<b>Halve it:</b> \\(\\dfrac b2\\).`,
      `Write the bracket: \\(\\left(x+\\dfrac b2\\right)^2\\).`,
      `<b>Subtract</b> the square of that half: \\(-\\left(\\dfrac b2\\right)^2\\). Squaring the bracket added it, so take it away again.`,
      `Add the original constant c at the end.` ],
    example: `\\(x^2+6x+2\\): half of 6 is 3, so \\((x+3)^2-9+2=(x+3)^2-7\\).`,
    tip: `For \\(-x^2+bx+c\\), take out \\(-1\\) from the first two terms first. The number you subtract inside the bracket becomes a number you <b>add</b> outside.`,
    topics: ['ctsx', 'ctsd', 'ctsn'] },

  { id: 'cts-solve', title: 'Solving by completing the square', when: 'When the question says "by completing the square".',
    steps: [
      `Make the x² have no number in front (divide every term by it).`,
      `Move the constant to the right-hand side.`,
      `Add \\(\\left(\\dfrac b2\\right)^2\\) to <b>both</b> sides.`,
      `Write the left side as \\(\\left(x+\\dfrac b2\\right)^2\\) and tidy the right side.`,
      `Take the square root of both sides. Do not forget <b>±</b>.`,
      `Solve for x. Round only at the very end.` ],
    topics: ['ctss', 'sqrt', 'ctssa'] },

  { id: 'hence', title: 'Questions with "hence"', when: 'Two-part questions: express, then hence solve; or solve, then hence find another letter.',
    steps: [
      `<b>"Hence"</b> means <b>use your answer to the part before.</b> Do not start again.`,
      `Look at the second part. Spot what plays the part of x (for example \\((y-1)\\) plays the part of x).`,
      `Write what that means: \\(y-1=\\) each answer you found.`,
      `Solve for the new letter. Give the accuracy asked.` ],
    topics: ['hence', 'subst'] },

  { id: 'formula', title: 'The quadratic formula', when: 'For any equation of the form ax² + bx + c = 0.',
    steps: [
      `Rearrange to \\(ax^2+bx+c=0\\).`,
      `Write a, b, c <b>with their signs</b>.`,
      `Work out \\(b^2-4ac\\) <b>first</b>, with brackets round negative numbers. Check its sign.`,
      `Substitute: \\(x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}\\).`,
      `Work out the + answer and the − answer separately.`,
      `Round as the question asks (usually 2 d.p. or 3 s.f.). Check by putting one answer back in.` ],
    tip: `If b is negative, then \\(-b\\) is positive. Put the whole top in brackets before you divide by \\(2a\\).`,
    topics: ['formula', 'rearr'] },

  { id: 'discriminant', title: 'How many solutions? (b² − 4ac)', when: 'To say how many real solutions an equation has, or to find an unknown constant.',
    steps: [
      `Work out \\(b^2-4ac\\) with the signs of a, b, c.`,
      `<b>Positive</b>: two different real solutions (the curve cuts the x-axis twice).`,
      `<b>Zero</b>: one solution (the curve just touches the x-axis).`,
      `<b>Negative</b>: no real solutions (the curve never reaches the x-axis).`,
      `Unknown constant k? Put k in \\(b^2-4ac\\), then use the same three cases.` ],
    topics: ['disc', 'kval'] },

  { id: 'fractions', title: 'Fractional equations', when: 'Equations with x in a denominator.',
    steps: [
      `<b>Factorise every denominator.</b>`,
      `Write down the values x <b>cannot</b> be (the ones that make a denominator 0).`,
      `Find the common denominator.`,
      `Multiply <b>every term, on both sides</b>, by it. Cancel.`,
      `Expand and collect to \\(ax^2+bx+c=0\\).`,
      `Solve the quadratic (P and S, or the formula).`,
      `<b>Reject</b> any answer on your cannot-be list. Give what is left.` ],
    tip: `\\(1-x\\) is the <b>opposite</b> of \\(x-1\\). A sign flip here is the most common lost mark.`,
    topics: ['frac', 'frac2', 'frac3', 'extra'] },

  { id: 'sketch', title: 'Sketching a quadratic: SIT', when: 'To sketch y = ax² + bx + c from its equation.',
    steps: [
      `<b>S</b>hape: a positive \\(x^2\\) opens up (U-shape). A negative one opens down.`,
      `<b>I</b>ntercepts: y-axis, put x = 0. x-axis, put y = 0 and solve (factorise).`,
      `<b>T</b>urning point: x is halfway between the x-intercepts, or read it from \\((x-p)^2+q\\), which gives \\((p,\\,q)\\). Then put x back to find y.`,
      `Draw axes with a scale, mark only the critical points, join them with a smooth symmetric curve, and label the equation.` ],
    topics: ['gfact', 'gcs', 'ggen', 'gcsa'] },

  { id: 'graph-line', title: 'Using a graph to solve another equation', when: 'When the curve is drawn and a different equation is to be solved.',
    steps: [
      `Write the new equation so the curve's expression is on the left: \\(\\text{(curve)} = \\text{something}\\).`,
      `Whatever is left over on the right is the <b>straight line</b> to draw.`,
      `The x-values where the line meets the curve are the solutions.` ],
    topics: ['gline'] },

  { id: 'horizontal-line', title: 'Horizontal lines and a curve', when: 'How many times does y = k meet the curve?',
    steps: [
      `Find the <b>turning point</b>. Its y-value is the greatest or least y the curve ever reaches.`,
      `Compare k with that y-value.`,
      `U-shaped: k above it gives 2 points, equal gives 1, below gives 0. Upside-down: the opposite.`,
      `To touch the curve once, k must equal the turning point's y-value.`,
      `Explain in words with numbers: "The maximum value of y is 4, which is less than 5."` ],
    topics: ['hline'] },

  { id: 'build', title: 'Building an equation or a curve from information', when: 'When you are given solutions, intercepts or a turning point.',
    steps: [
      `A solution \\(x=r\\) gives the bracket \\((x-r)\\). A fraction \\(x=\\dfrac pq\\) gives \\((qx-p)\\).`,
      `Multiply the brackets and collect the terms.`,
      `Whole-number coefficients with no common factor, and \\(a\\) positive, unless told otherwise.`,
      `Curve cutting the x-axis at m and n: \\(y=(x-m)(x-n)\\), then expand. Minimum point (h, k): \\(y=(x-h)^2+k\\), then expand.` ],
    topics: ['fromroots', 'pq'] },

  { id: 'read-graph', title: 'Tables, plotting and reading a graph', when: 'When you plot a curve or read values from one.',
    steps: [
      `Table: put each x in <b>brackets</b> when you substitute, especially negatives.`,
      `Plot with small crosses, then draw one smooth curve (no ruler).`,
      `Greatest or least value: the top or bottom of the curve.`,
      `x at a given height: go across to the curve, then straight down.`,
      `Where it lands: where the curve meets the x-axis (y = 0).` ],
    topics: ['table', 'readgraph'] },

  { id: 'word-problem', title: 'Word problems: the same steps every time', when: 'Any story that ends in an equation.',
    steps: [
      `Read it twice. Say what is being asked, with its <b>units</b>.`,
      `Let the unknown be x, and write down what x stands for.`,
      `Write every other quantity in terms of x. Draw a picture or a table.`,
      `Choose the relationship: area = length × width, time = distance ÷ speed, Pythagoras, amount ÷ rate.`,
      `Build the equation. Fractions? Multiply by the common denominator.`,
      `Tidy to \\(ax^2+bx+c=0\\) and solve (P and S, or the formula).`,
      `<b>Reject</b> the answer that makes no sense (a negative length, speed or price).`,
      `Answer the question that was asked, with units, rounded as asked. Check it in the story.` ],
    tip: `Change all units first: kg to g, seconds to minutes, minutes to hours.`,
    topics: ['rect', 'speed', 'proj', 'pyth', 'consec', 'path', 'work', 'profit', 'price', 'exch', 'rate', 'stream', 'journey', 'border', 'perim', 'cakes'] },

  { id: 'exam', title: 'Exam strategy: time and marks', when: 'For the mock paper and the real thing.',
    steps: [
      `One mark is worth about 1.5 minutes. A 40-mark paper has about 60 minutes.`,
      `First pass: do every question you can start. If you are stuck for 2 minutes, skip it.`,
      `Show the key steps: P and S, the equation, the substitution. Method marks are real marks.`,
      `Check by <b>putting your answer back</b> into the equation.`,
      `Last 5 minutes: units, rounding, and rejecting the answer that makes no sense.` ],
    topics: [] },
];

/* The timed mock paper: 40 marks, laid out like a school paper. Each item picks one topic at random from its pool. */
const MOCK_PAPER = {
  title: 'Sec 3 E-Maths mock paper: Quadratic and Fractional Equations', minutes: 60,
  intro: 'A calculator is allowed. Give non-exact answers to the accuracy asked in each question.',
  sections: [
    { name: 'Fractional equations', items: [{ pool: ['frac3', 'frac2'], marks: 4 }] },
    { name: 'Completing the square', items: [{ pool: ['hence'], marks: 4 }] },
    { name: 'Factorising and equations', items: [{ pool: ['factexp'], marks: 3 }, { pool: ['fromroots', 'rearr'], marks: 3 }] },
    { name: 'Graphs', items: [{ pool: ['gcs', 'gfact'], marks: 3 }, { pool: ['hline'], marks: 3 }, { pool: ['pq'], marks: 3 }, { pool: ['ggen', 'readgraph'], marks: 3 }] },
    { name: 'Word problems', items: [{ pool: ['speed', 'rect', 'path', 'border', 'proj', 'pyth', 'consec'], marks: 6 }, { pool: ['price', 'exch', 'rate', 'stream', 'journey', 'cakes', 'perim', 'work', 'profit'], marks: 8 }] },
  ],
};

const DAYS = [
  /* ------------------------------------------------------------------ DAY 1 */
  {
    n: 1, title: 'Factorising: your foundation', minutes: 100,
    tagline: 'Five steps, the same every time. No guessing.',
    blocks: [
      { t: 'goal', items: [
        'Solve by factorising with the <b>same five steps</b> every time: P and S, the two numbers, the brackets, the Zero Product Principle, then solve.',
        'Use the signs of P and S to work out the signs of the two numbers <b>before</b> you search.',
        'Say why a solution is the <b>opposite</b> of the number in its bracket.',
        'Factorise expressions: common factor, difference of two squares, a negative x², and a number in front of x².' ] },

      { t: 'html', html: `<span class=\"tag\">🔐 The hook</span><h3>Factorising is cracking a two-number lock</h3><p>Every factorising question hides two secret numbers. The lock gives you two clues, and the clues are <b>already written in the equation</b>: what the two numbers multiply to (<b>P</b>) and what they add to (<b>S</b>). There is no guessing, only rules.</p><p>Learn five steps and one sign rule, and you can open every lock in this level.</p>` },

      { t: 'recipe', id: 'factorise-solve' },

      { t: 'recipe', id: 'sign-rules' },

      { t: 'predict', id: 'f0-p1',
        q: 'In \\(x^2+12x+32=0\\), what are P and S?',
        options: [
          { text: 'P = +32 and S = +12', ok: true, why: 'P is the constant term (the product). S is the number in front of x (the sum).' },
          { text: 'P = +12 and S = +32', ok: false, why: 'These are swapped. P is the constant term, S is the number in front of x.' },
          { text: 'P = −32 and S = −12', ok: false, why: 'Keep the signs exactly as written. Both are positive here.' } ],
        explain: 'Always start by writing P and S with their signs. Everything else follows.' },

      { t: 'predict', id: 'f0-p2',
        q: 'P = +32 and S = +12. What do the sign rules tell you about the two numbers?',
        options: [
          { text: 'Both are positive', ok: true, why: 'P is positive, so the numbers have the same sign. S is positive, so that sign is +.' },
          { text: 'One is positive and one is negative', ok: false, why: 'That only happens when P is negative.' },
          { text: 'Both are negative', ok: false, why: 'Two negative numbers would add to a negative S, but S is +12.' } ],
        explain: 'The signs tell you half the answer before you list a single factor pair.' },

      { t: 'predict', id: 'f0-p3',
        q: 'You have \\((x+4)(x+8)=0\\). What are the solutions?',
        options: [
          { text: '\\(x=-4\\) or \\(x=-8\\)', ok: true, why: '\\(x+4=0\\) gives \\(x=-4\\). The solution is the <b>opposite</b> of the number in the bracket.' },
          { text: '\\(x=4\\) or \\(x=8\\)', ok: false, why: 'This is the most common slip. \\(x+4=0\\) means \\(x=-4\\), not 4.' },
          { text: '\\(x=32\\)', ok: false, why: '32 is P, the product of the two numbers. It is not a solution.' } ],
        explain: 'Bracket says +4, solution says −4. Opposite signs, every time.' },

      { t: 'practice', id: 'f0-guided', title: 'Guided practice: the five steps', topics: ['fstep'], need: 3,
        intro: 'Fill in every step. Open the recipe above if you need it. Keep the minus signs.' },

      { t: 'practice', id: 'f0-pp', title: 'Practice: P and S both positive', topics: ['fpp'], need: 3,
        intro: 'Both numbers are positive. The brackets show plus signs, the solutions are negative.' },

      { t: 'html', html: `<h3>Now the minus signs</h3><p>When P is positive but S is negative, both numbers are negative. Example: \\(x^2-9x+20=0\\). P = +20 and S = −9. Pairs of 20: 1×20, 2×10, 4×5 (4 + 5 = 9). Both numbers are negative: −4 and −5. So \\((x-4)(x-5)=0\\) and \\(x=4\\) or \\(x=5\\).</p>` },

      { t: 'practice', id: 'f0-pn', title: 'Practice: P positive, S negative', topics: ['fpn'], need: 3,
        intro: 'Both numbers are negative. The brackets show minus signs, the solutions are positive.' },

      { t: 'html', html: `<h3>When P is negative</h3><p>Now the two numbers have <b>different</b> signs, so you look for pairs that <b>differ</b> by S, and the bigger number takes the sign of S. Example: \\(x^2+x-6=0\\). P = −6 and S = +1. Pairs of 6: 1×6 (differ by 5), 2×3 (differ by 1 ✔). The bigger one, 3, takes the sign of S (+), so the numbers are −2 and +3. \\((x-2)(x+3)=0\\), so \\(x=2\\) or \\(x=-3\\).</p>` },

      { t: 'practice', id: 'f0-mix', title: 'Practice: any signs', topics: ['factor'], need: 4,
        intro: 'Same five steps. Write P and S first, then decide the signs, then search.' },

      { t: 'errors', id: 'f0-err', title: 'Spot the mistake', items: [
        { title: 'A student solves \\(x^2+7x+12=0\\).', lines: ['P=12,\\; S=7', '\\text{numbers: } 3 \\text{ and } 4', '(x+3)(x+4)=0', 'x=3 \\text{ or } x=4'], wrong: 3,
          why: 'The brackets are \\((x+3)\\) and \\((x+4)\\), so the solutions are the <b>opposite</b>: \\(x=-3\\) or \\(x=-4\\).' },
        { title: 'A student solves \\(x^2+2x-15=0\\).', lines: ['P=-15,\\; S=2', '\\text{numbers: } 3 \\text{ and } -5', '(x+3)(x-5)=0', 'x=-3 \\text{ or } x=5'], wrong: 1,
          why: 'S is +2, so the <b>bigger</b> number must be positive: the numbers are +5 and −3 (they add to +2). The numbers 3 and −5 add to −2.' },
        { title: 'A student solves \\(x^2-5x+6=0\\).', lines: ['P=6,\\; S=-5', '\\text{numbers: } 2 \\text{ and } 3', '(x+2)(x+3)=0', 'x=-2 \\text{ or } x=-3'], wrong: 1,
          why: 'P is positive and S is negative, so both numbers are <b>negative</b>: −2 and −3 (they add to −5). The numbers 2 and 3 add to +5.' },
      ] },

      { t: 'html', html: `<h3>No equals sign? Then it is an expression</h3><p>If the question says <b>factorise</b> and there is no \"= 0\", you do steps 1 to 3 only: find P and S, find the two numbers, write the brackets. There is nothing to solve, so there is no Zero Product step. Check by expanding.</p>` },

      { t: 'practice', id: 'f0-femon', title: 'Practice: factorise x² + bx + c', topics: ['femon'], need: 3,
        intro: 'Type the brackets like (x+1)(x-6). Steps 1 to 3 of the recipe.' },

      { t: 'recipe', id: 'factorise-expr' },

      { t: 'practice', id: 'f0-fecom', title: 'Practice: common factor first', topics: ['fecom'], need: 3,
        intro: 'Take out the number every term shares, then use P and S on what is left.' },

      { t: 'html', html: `<h3>Difference of two squares</h3><p>Two terms, both perfect squares, with a minus between them: \\(A^2-B^2=(A-B)(A+B)\\). For example \\(4x^2-49=(2x-7)(2x+7)\\), because \\(4x^2=(2x)^2\\) and \\(49=7^2\\). There is no middle term, so S = 0: the two numbers are the same size with opposite signs.</p>` },

      { t: 'practice', id: 'f0-fesq', title: 'Practice: difference of two squares', topics: ['fesq'], need: 3,
        intro: 'Find A and B first: what is squared to give each term?' },

      { t: 'html', html: `<h3>When the x² is negative</h3><p>Take out \\(-1\\) first. That flips every sign inside: \\(-x^2+5x+6=-(x^2-5x-6)\\). Now the x² is positive, so use P and S inside the bracket: \\(-(x+1)(x-6)\\).</p>` },

      { t: 'predict', id: 'f0-p4',
        q: 'You are asked to <b>factorise</b> \\(-x^2+5x+6\\). What is a sensible first step?',
        options: [
          { text: 'Take out −1, so the x² inside the bracket is positive', ok: true, why: '\\(-x^2+5x+6=-(x^2-5x-6)\\). Now find P and S for the bracket: P = −6 and S = −5.' },
          { text: 'Divide everything by x', ok: false, why: 'Dividing changes the expression into something different. Factorising only rewrites it.' },
          { text: 'Add 6 to both sides', ok: false, why: 'There are no "sides" here. This is an expression, not an equation, so you rewrite it and keep it equal.' } ],
        explain: 'An expression is rewritten. An equation is solved. Factorising is rewriting.' },

      { t: 'practice', id: 'f0-feneg', title: 'Practice: negative x²', topics: ['feneg'], need: 3,
        intro: 'Take out −1 first, then P and S inside the bracket.' },

      { t: 'recipe', id: 'ac-method' },

      { t: 'predict', id: 'f0-p5',
        q: 'To factorise \\(2x^2+5x-7\\) with the ac-method, what is P?',
        options: [
          { text: '\\(P=a\\times c=2\\times(-7)=-14\\)', ok: true, why: 'With a number in front of x², P is a × c. S is still the middle number, 5.' },
          { text: 'P = −7', ok: false, why: 'That is just c. When a is not 1, P = a × c.' },
          { text: 'P = 5', ok: false, why: '5 is S, the middle number. P is the product a × c.' } ],
        explain: 'The same lock, one extra step: multiply a and c to get P.' },

      { t: 'practice', id: 'f0-feac', title: 'Practice: a number in front of x²', topics: ['feac'], need: 3,
        intro: 'P = a × c, S = b. Split the middle, group, take out the common bracket.' },

      { t: 'practice', id: 'f0-boss', title: 'Level 1 boss: mixed factorising', topics: ['factexp'], need: 4,
        intro: 'Any of the five types. First decide which type, then follow its recipe.' },

      { t: 'done' },
    ],
  },

  /* ------------------------------------------------------------------ DAY 2 */
  {
    n: 2, title: 'Completing the square', minutes: 90,
    tagline: 'Why a missing corner makes everything work',
    blocks: [
      { t: 'goal', items: [
        'Say why \\(x^2+6x\\) is not a perfect square, and exactly what is missing.',
        'Rewrite any \\(x^2+bx+c\\) as \\((x+r)^2+u\\), and explain each step with a picture.',
        'Solve equations of the form \\((x+r)^2=s\\) without losing a solution.' ] },

      { t: 'html', html: `<span class="tag">🏺 The hook</span><h3>A puzzle from 4,000 years ago</h3>
        <p>Babylonian scribes carved puzzles into clay tablets. One says: <i>"I took away the side of my square from its area and got 870."</i> In our notation, that is \\(x^2-x=870\\).</p>
        <p>They had no algebra, no formulas, not even the letter x. They solved it by <b>cutting and rearranging squares</b>, the exact trick you learn today. At the end of this mission you will crack their puzzle.</p>` },

      { t: 'drill', id: 'd1-cold', title: 'Cold start: Level 1 without notes', maxDay: 1, n: 4, minutes: 5,
        intro: 'Four factorising questions, no hints, 5 minutes. Use P and S.' },

      { t: 'predict', id: 'd1-p1',
        q: 'Try to factorise \\(x^2+4x-3\\) into two brackets with whole numbers. What happens?',
        options: [
          { text: '\\((x+3)(x-1)\\) works', ok: false, why: 'Expand it: \\((x+3)(x-1)=x^2+2x-3\\). The middle term is 2x, not 4x.' },
          { text: '\\((x-3)(x+1)\\) works', ok: false, why: 'Expand it: \\((x-3)(x+1)=x^2-2x-3\\). The middle sign is wrong.' },
          { text: 'No pair of whole numbers works', ok: true, why: 'We need two numbers that multiply to \\(-3\\) and add to \\(4\\). The only pairs that multiply to \\(-3\\) are \\((3,-1)\\) and \\((-3,1)\\), which add to 2 and \\(-2\\).' } ],
        explain: 'So factorising is stuck here. We need a method that works on every quadratic. Today you build it.' },

      { t: 'html', html: `
        <h3>The easy case: something squared equals a number</h3>
        <p>If \\((x+3)^2=14\\), then the thing inside the bracket is a number whose square is 14. There are <b>two</b> such numbers: \\(\\sqrt{14}\\) and \\(-\\sqrt{14}\\).</p>
        \\[(x+3)^2=14 \\;\\Rightarrow\\; x+3=\\pm\\sqrt{14} \\;\\Rightarrow\\; x=-3\\pm\\sqrt{14}\\]
        <p>The big idea for the whole chapter: <b>if we can turn any quadratic into this shape, we can solve it.</b></p>` },

      { t: 'practice', id: 'd1-sqrt', title: 'Practice: square-root both sides', topics: ['sqrt'], need: 4,
        intro: 'Get 4 right in a row. Watch for the second answer!' },

      { t: 'predict', id: 'd1-p2',
        q: '\\((x+3)^2=x^2+6x+9\\). To turn \\(x^2+6x\\) into a perfect square, what number must we add?',
        options: [
          { text: '6', ok: false, why: '6 is the number in front of x. It is not the missing piece.' },
          { text: '9', ok: true, why: 'Half of 6 is 3, and \\(3^2=9\\).' },
          { text: '36', ok: false, why: '36 is \\(6^2\\). The missing piece is built from <i>half</i> of 6.' } ],
        explain: 'Next, see <i>why</i> it is half, with a picture.' },

      { t: 'widget', name: 'square' },

      { t: 'think', id: 'd1-think1',
        prompt: 'In your own words: why is the missing corner \\((b/2)^2\\) and <b>not</b> \\(b^2\\)? Use the picture.',
        model: 'The bx part is split into <b>two equal strips</b>, one on each side. Each strip is b/2 wide. The missing corner is a square with side b/2, so its area is (b/2)². If we used all of b we would be ignoring that the strip got split in two.' },

      { t: 'html', html: `
        <h3>Add it, then take it away again</h3>
        <p>We cannot just add 25 to \\(x^2+10x\\), because that changes its value. To keep the expression <b>equal</b> we add 25 and immediately subtract 25:</p>
        \\[x^2+10x = \\underbrace{x^2+10x+25}_{(x+5)^2}-25 = (x+5)^2-25\\]
        <p>For \\(x^2+bx+c\\), do this to the \\(x^2+bx\\) part and leave \\(c\\) alone:</p>
        \\[x^2+2x+3=(x+1)^2-1+3=(x+1)^2+2\\]` },

      { t: 'practice', id: 'd1-cts', title: 'Practice: rewrite as (x + r)² + u', topics: ['ctsx'], need: 5,
        intro: 'Get 5 in a row. Some have odd numbers and give fractions.' },

      { t: 'html', html: `<h3>When b is a fraction or a decimal</h3><p>The rule does not change: <b>half of b, then square it</b>. Only the arithmetic gets harder.</p><p>\\(x^2+1.6x\\): half of 1.6 is 0.8 and \\(0.8^2=0.64\\), so \\(x^2+1.6x=(x+0.8)^2-0.64\\).</p><p>\\(x^2-\\dfrac34x\\): half of \\(\\dfrac34\\) is \\(\\dfrac38\\) and \\(\\left(\\dfrac38\\right)^2=\\dfrac{9}{64}\\), so \\(x^2-\\dfrac34x=\\left(x-\\dfrac38\\right)^2-\\dfrac{9}{64}\\).</p><p>The constant term is <b>not</b> part of the square. Leave it alone: \\(x^2+6x+2=(x+3)^2-9+2=(x+3)^2-7\\).</p>` },

      { t: 'predict', id: 'd1-p3',
        q: 'In \\(x^2+6x+2\\), what do we do with the \\(+2\\) when we complete the square?',
        options: [
          { text: 'Leave it alone and complete the square on \\(x^2+6x\\) only', ok: true, why: '\\(x^2+6x+2=(x+3)^2-9+2=(x+3)^2-7\\). The 2 simply joins the correction at the end.' },
          { text: 'Add 9 to it and make it 11', ok: false, why: 'That changes the value of the expression, because nothing was taken away.' },
          { text: 'Square it as well', ok: false, why: 'The constant is not part of the square we are building.' } ],
        explain: 'Only the x² and x terms form the square. The constant is carried along.' },
      { t: 'practice', id: 'd1-ctsd', title: 'Practice: fractions and decimals', topics: ['ctsd'], need: 4,
        intro: 'Give r and u as fractions (like 3/8) or decimals to 2 d.p.' },

      { t: 'errors', id: 'd1-err', title: 'Spot the mistake', items: [
        { title: 'A classmate writes:', lines: ['x^2+8x', '= x^2+8x+16', '= (x+4)^2'], wrong: 1,
          why: 'Line 2 adds 16 for free. The two sides are no longer equal. Correct: \\(x^2+8x=(x^2+8x+16)-16=(x+4)^2-16\\).' },
        { title: 'A classmate writes:', lines: ['x^2-6x+1', '=(x^2-6x+9)-9+1', '=(x-3)^2-9+1', '=(x-3)^2+1'], wrong: 3,
          why: 'Line 4 forgot to combine \\(-9+1\\). It is \\(-8\\), so the answer is \\((x-3)^2-8\\).' },
        { title: 'A classmate writes:', lines: ['(x-5)^2=9', 'x-5=3', 'x=8'], wrong: 1,
          why: 'Line 2 loses the negative square root. It should be \\(x-5=\\pm 3\\), giving \\(x=8\\) or \\(x=2\\).' },
      ] },

      { t: 'fixed', id: 'd1-boss', tag: '🏺 Boss from 4,000 years ago', title: 'Crack the Babylonian tablet',
        intro: 'Solve \\(x^2-x=870\\) by completing the square. Half of −1 is −½. No hints are given about the answer.',
        q: { prompt: 'Solve \\(x^2-x=870\\) (it has two solutions).', fields: ['\\(x =\\)'], answer: [30, -29],
             hint: 'Add \\((-\\tfrac12)^2=\\tfrac14\\) to both sides: \\((x-\\tfrac12)^2=870.25\\). Then take square roots.',
             solution: '\\((x-\\tfrac12)^2=870.25\\)<br>\\(x-\\tfrac12=\\pm29.5\\)<br>\\(x=30\\) or \\(x=-29\\). Check: \\(30^2-30=870\\). The scribe wanted the positive one: a side of 30.' } },

      { t: 'teachback', title: 'Teach-back (2 minutes)',
        prompt: 'The student teaches <b>you</b>, no notes, no screen: "Why does \\(x^2+bx\\) need \\((b/2)^2\\) to become a square?" He should draw the picture on paper.',
        checks: ['He drew the big square and the two strips', 'He said the corner is b/2 by b/2', 'He explained why we subtract it again', 'He did it without looking at the screen'] },

      { t: 'done' },
    ],
  },

  /* ------------------------------------------------------------------ DAY 2 */
  {
    n: 3, title: 'Solve any quadratic, then build the formula', minutes: 100,
    tagline: 'The formula is not magic. You will build it.',
    blocks: [
      { t: 'goal', items: [
        'Solve any quadratic by completing the square.',
        'Derive the quadratic formula from scratch and say what every step does.',
        'Use the discriminant \\(b^2-4ac\\) to say how many real solutions an equation has, and why.',
        'Cope with a number in front of \\(x^2\\), equations that need tidying first, and unknown constants.' ] },

      { t: 'html', html: `<span class="tag">🏺 The hook</span><h3>3,000 years to find one formula</h3><p>Babylonian scribes solved quadratics with squares about 4,000 years ago. But one formula that works on <i>every</i> quadratic took roughly 3,000 more years to appear. In 2019, a maths professor, Po-Shen Loh, found a clever new way to see the same idea. So even this old topic is still being explored.</p><p>Today you will not <b>memorise</b> that formula. You will <b>build</b> it, then rebuild it on paper from nothing.</p>` },

      { t: 'drill', id: 'd2-cold', title: 'Cold start: Levels 1 and 2', maxDay: 2, n: 4, minutes: 5,
        intro: '4 questions, no hints, 5 minutes. This is how every day begins.' },

      { t: 'html', html: `
        <h3>Solve \\(x^2+4x-3=0\\)</h3>
        \\[x^2+4x=3\\] \\[x^2+4x+2^2=3+2^2\\] \\[(x+2)^2=7\\] \\[x+2=\\pm\\sqrt7\\quad\\Rightarrow\\quad x=-2\\pm\\sqrt7\\approx 0.65\\text{ or }-4.65\\]
        <p>Nothing here needed a clever factorisation. It always works.</p>` },

      { t: 'practice', id: 'd2-cts', title: 'Practice: solve by completing the square', topics: ['ctss'], need: 4,
        intro: 'Answers to 2 decimal places. A calculator is fine.' },

      { t: 'predict', id: 'd2-p2',
        q: 'Solving \\(x^2+4x=3\\): why do we add \\(2^2\\) to <b>both</b> sides?',
        options: [
          { text: 'To make the right-hand side bigger', ok: false, why: 'We are not trying to make anything bigger. We are trying to build a perfect square on the left.' },
          { text: 'Whatever we do to one side we must do to the other, so the equation stays balanced', ok: true, why: 'Adding 4 to the left makes it \\((x+2)^2\\). Adding 4 to the right keeps both sides equal, so the solutions do not change.' },
          { text: 'Because 2 is the answer', ok: false, why: '2 is half of the 4. It is not the answer.' } ],
        explain: 'Equations are a balance. Every move must be done to both sides.' },
      { t: 'html', html: `<h3>\"Hence\": use what you just found</h3><p>Exam questions often come in two parts. First <b>express</b> the quadratic in the form \\((x+a)^2+k\\). Then \"<b>hence</b> solve\" it. Hence means <b>use your answer to the first part</b>, do not start again.</p><p>Example: \\(x^2-3x-2=\\left(x-\\tfrac32\\right)^2-\\tfrac{17}{4}\\). So \\(x^2-3x-2=0\\) means \\(\\left(x-\\tfrac32\\right)^2=\\tfrac{17}{4}\\), and \\(x=\\tfrac32\\pm\\tfrac{\\sqrt{17}}{2}\\).</p>` },

      { t: 'practice', id: 'd2-hence', title: 'Practice: express, then hence solve', topics: ['hence'], need: 3,
        intro: 'Part (a) gives a and k. Part (b) uses them. Fractions like 3/2 and decimals are both fine.' },

      { t: 'html', html: `<h3>What if there is a number in front of x²?</h3><p>Example: \\(2x^2+8x-6=0\\). Divide <b>every</b> term by 2 first to get \\(x^2+4x-3=0\\), and carry on as before. Dividing both sides by the same number keeps the solutions the same.</p><p>To <b>rewrite</b> an expression such as \\(2x^2+8x-6\\), take the 2 out of the first two terms only, complete the square inside, then multiply the correction by 2:</p>\\[2x^2+8x-6=2(x^2+4x)-6=2\\left[(x+2)^2-4\\right]-6=2(x+2)^2-14\\]` },

      { t: 'predict', id: 'd2-p4',
        q: 'To solve \\(3x^2-12x+5=0\\) by completing the square, what should you do first?',
        options: [
          { text: 'Divide every term by 3', ok: true, why: 'Then the \\(x^2\\) has no number in front and you can add \\((\\text{half})^2\\) as usual.' },
          { text: 'Add 36 to both sides', ok: false, why: '36 is \\((-12/2)^2\\), but that rule only works once the \\(x^2\\) has coefficient 1.' },
          { text: 'Move the 5 across and leave the 3', ok: false, why: 'You can move the 5, but you still cannot complete the square while the x² has a 3 in front.' } ],
        explain: 'Always make the coefficient of \\(x^2\\) equal to 1 first.' },
      { t: 'practice', id: 'd2-ctsa', title: 'Stretch: rewrite when a is not 1', topics: ['ctsa'], need: 3,
        intro: 'Beyond what the exam asks, so treat this as a challenge. Write it as a(x + r)² + u.' },

      { t: 'practice', id: 'd2-ctssa', title: 'Stretch: solve when a is not 1', topics: ['ctssa'], need: 3,
        intro: 'Beyond what the exam asks. Divide by a first. Answers to 2 decimal places.' },

      { t: 'html', html: `<h3>Now do it with letters</h3>
        <p>Completing the square on \\(x^2+4x-3=0\\) took 6 steps. If we do the <b>same 6 steps</b> on \\(ax^2+bx+c=0\\), we get a formula that solves <i>every</i> quadratic. Click through slowly.</p>` },

      { t: 'widget', name: 'derive' },
      { t: 'widget', name: 'jigsaw', id: 'd2-jigsaw' },

      { t: 'think', id: 'd2-think1',
        prompt: 'Where does the ± come from? What goes wrong if we leave it out?',
        model: 'If A² = B, then both A = √B and A = −√B work, because a negative number squared is also positive. Leaving out the ± throws away one of the solutions.' },

      { t: 'html', html: `<div class="callout key"><b>The quadratic formula</b><br>If \\(ax^2+bx+c=0\\), then
        \\[x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}\\]
        <small>Be careful with signs when you copy a, b and c. If \\(b\\) is negative, \\(-b\\) is positive.</small></div>` },

      { t: 'practice', id: 'd2-formula', title: 'Practice: the quadratic formula', topics: ['formula'], need: 4,
        intro: 'Some equations need rearranging into \\(ax^2+bx+c=0\\) first.' },

      { t: 'html', html: `<h3>Tidy up first</h3><p>Equations in a test rarely arrive as \\(ax^2+bx+c=0\\). Expand the brackets, bring everything to one side, then choose a method.</p><p>Example: \\((x+4)(x-3)=15\\) becomes \\(x^2+x-12=15\\), so \\(x^2+x-27=0\\). Then use the formula.</p>` },

      { t: 'practice', id: 'd2-rearr', title: 'Practice: tidy up, then solve', topics: ['rearr'], need: 4,
        intro: 'Answers to 2 decimal places if they are not exact.' },

      { t: 'predict', id: 'd2-p5',
        q: 'Solve \\(y^2-ay-6=0\\) for \\(y\\), where \\(a\\) is a constant. Which answer is right?',
        options: [
          { text: '\\(y=\\dfrac{a\\pm\\sqrt{a^2+24}}{2}\\)', ok: true, why: 'Here \\(a_{coef}=1,\\ b=-a,\\ c=-6\\). So \\(-b=a\\) and \\(b^2-4ac=a^2+24\\).' },
          { text: '\\(y=\\dfrac{-a\\pm\\sqrt{a^2+24}}{2}\\)', ok: false, why: 'Look at the sign: \\(b=-a\\), so \\(-b=+a\\).' },
          { text: '\\(y=\\dfrac{a\\pm\\sqrt{a^2-24}}{2}\\)', ok: false, why: '\\(b^2-4ac=a^2-4(1)(-6)=a^2+24\\). A minus times a minus is a plus.' },
          { text: '\\(y=a\\pm\\sqrt{a^2+24}\\)', ok: false, why: 'You forgot to divide by 2a, the whole top is divided by 2.' } ],
        explain: 'The formula works even when b and c contain letters. Treat them like numbers and keep the signs careful.' },
      { t: 'html', html: `<h3>Calculator tips for the formula</h3><ul><li>Put brackets round every negative number you substitute: \\((-4)^2=16\\), but \\(-4^2=-16\\) on most calculators.</li><li>Work out \\(b^2-4ac\\) <b>first</b> and write it down. Check its sign before you take the square root.</li><li>Use the calculator for the top and the bottom <b>separately</b>, or put the whole top in brackets before dividing by \\(2a\\).</li><li>Change the ± by hand: do it once with +, once with −.</li></ul>` },

      { t: 'practice', id: 'd2-subst', title: 'Practice: hence, by substitution', topics: ['subst'], need: 3,
        intro: 'The second equation is the first one in disguise. What plays the part of x?' },

      { t: 'recipe', id: 'which-method' },

      { t: 'predict', id: 'd2-p1',
        q: 'In the quadratic formula, what happens if \\(b^2-4ac\\) is negative?',
        options: [
          { text: 'Two solutions', ok: false, why: 'The ± usually gives two, but only if the square root exists.' },
          { text: 'One solution', ok: false, why: 'One solution happens when the square-root part is exactly 0.' },
          { text: 'No real solutions', ok: true, why: 'We cannot take the square root of a negative number (in real numbers).' } ],
        explain: 'If it is 0, the ± does nothing: one solution. If positive: two. The number \\(b^2-4ac\\) is called the <b>discriminant</b>.' },

      { t: 'predict', id: 'd2-p3',
        q: 'Which equation has <b>exactly one</b> real solution?',
        options: [
          { text: '\\(x^2-6x+9=0\\)', ok: true, why: '\\(b^2-4ac=36-36=0\\). The ± part is zero, so there is a single repeated solution, \\(x=3\\).' },
          { text: '\\(x^2-6x+10=0\\)', ok: false, why: '\\(b^2-4ac=36-40=-4\\), which is negative: no real solutions.' },
          { text: '\\(x^2-6x+8=0\\)', ok: false, why: '\\(b^2-4ac=36-32=4\\), which is positive: two solutions (x = 2 and x = 4).' } ],
        explain: 'The sign of \\(b^2-4ac\\) decides: positive means two, zero means one, negative means none.' },
      { t: 'practice', id: 'd2-disc', title: 'Practice: how many solutions?', topics: ['disc'], need: 4,
        intro: 'Work out the discriminant, then decide.' },

      { t: 'html', html: `<h3>Working backwards: from solutions to an equation</h3><p>A solution \\(x=2\\) means the bracket \\((x-2)\\) is zero. A fraction such as \\(x=\\dfrac67\\) means \\(7x-6=0\\), so the bracket is \\((7x-6)\\). Multiply the brackets and check that \\(a\\), \\(b\\) and \\(c\\) have no common factor.</p><p>Example: \\(x=2\\) and \\(x=\\dfrac67\\) give \\((x-2)(7x-6)=7x^2-20x+12=0\\).</p>` },

      { t: 'practice', id: 'd2-fromroots', title: 'Practice: form the equation', topics: ['fromroots'], need: 3,
        intro: 'Whole numbers a, b, c, with a positive and as small as possible.' },

      { t: 'html', html: `<h3>Finding an unknown constant</h3><p>The number of real solutions tells you the sign of \\(b^2-4ac\\): <b>zero</b> for one (equal) solution, <b>positive</b> for two, <b>negative</b> for none. Put the letter into \\(b^2-4ac\\) and solve.</p><p>Example: \\(x^2+kx+9=0\\) has equal roots, so \\(k^2-36=0\\), giving \\(k=6\\) or \\(k=-6\\).</p>` },

      { t: 'practice', id: 'd2-kval', title: 'Stretch: find the unknown', topics: ['kval'], need: 3,
        intro: 'Use b² − 4ac and the number of solutions.' },

      { t: 'practice', id: 'd2-sumprod', title: 'Stretch: sum and product of solutions', topics: ['sumprod'], need: 2,
        intro: 'A challenge question from the end of the chapter. Work without solving the equation if you can.' },

      { t: 'paper', title: 'The big test: derive it on blank paper',
        tasks: ['Start from \\(ax^2+bx+c=0\\) and derive the quadratic formula. No notes, no screen.', 'Next to every line, write what you did (for example "divided by a").'],
        checks: ['Divides by a', 'Moves c/a to the right', 'Adds (b/2a)² to both sides', 'Writes the left side as a perfect square', 'Takes ± the square root', 'Isolates x'],
        tip: 'Do not help. If he is stuck for more than 2 minutes, only ask: "What did we do in the \\(x^2+4x-3=0\\) example at this step?"' },

      { t: 'done' },
    ],
  },

  /* ------------------------------------------------------------------ DAY 3 */
  {
    n: 4, title: 'Fractional equations', minutes: 90,
    tagline: 'Clear the fractions, solve, then check every answer',
    blocks: [
      { t: 'goal', items: [
        'Turn an equation with x in the denominator into a quadratic.',
        'Explain why every answer must be checked in the <b>original</b> equation.',
        'Reject solutions that make a denominator zero.' ] },

      { t: 'html', html: `<span class="tag">🧪 The hook</span><h3>A "proof" that 1 = 2 (find the lie)</h3><p>Let \\(a=b\\). Then:</p><ol class=\"steps\"><li>\\(a^2=ab\\) (multiply both sides by a)</li><li>\\(a^2-b^2=ab-b^2\\) (subtract \\(b^2\\))</li><li>\\((a+b)(a-b)=b(a-b)\\) (factorise)</li><li>\\(a+b=b\\) (divide both sides by \\(a-b\\))</li><li>\\(2b=b\\) (since \\(a=b\\))</li><li>\\(2=1\\) (divide by b)</li></ol><p>Every step looks fine, but one is a cheat.</p>` },

      { t: 'predict', id: 'd3-p0',
        q: 'Which step is illegal?',
        options: [
          { text: 'Step 1: multiply both sides by a', ok: false, why: 'Multiplying both sides by a number is always allowed.' },
          { text: 'Step 3: factorise', ok: false, why: 'Both sides really do factorise like that. Expand them to check.' },
          { text: 'Step 4: divide both sides by \\(a-b\\)', ok: true, why: 'Since \\(a=b\\), \\(a-b=0\\). You cannot divide by zero.' },
          { text: 'Step 6: divide by b', ok: false, why: 'This is fine as long as b is not 0.' } ],
        explain: 'The same trap sits inside fractional equations. If a denominator can be 0, some "solutions" are lies. That is why you will always check.' },
      { t: 'drill', id: 'd3-cold', title: 'Cold start: Levels 1 to 3', maxDay: 3, n: 5, minutes: 7,
        intro: '5 questions, no hints, 7 minutes.' },

      { t: 'html', html: `<h3>The plan</h3>
        <p>We don't know how to solve an equation with x in a denominator directly. So we change it into an equation we <i>do</i> know how to solve, by multiplying <b>every term on both sides</b> by the common denominator.</p>
        <p class="callout">Example: \\(\\dfrac{3}{x+1}=2x-1\\)</p>
        \\[3=(2x-1)(x+1)\\] \\[3=2x^2+x-1\\] \\[2x^2+x-4=0\\] \\[x=\\frac{-1\\pm\\sqrt{33}}{4}\\approx 1.19\\text{ or }-1.69\\]
        <p>Check: x cannot be \\(-1\\) (the denominator would be 0). Neither answer is \\(-1\\), so both are fine.</p>` },

      { t: 'predict', id: 'd3-p2',
        q: 'To solve \\(\\dfrac{3}{x+1}=2x-1\\), what do we multiply <b>both sides</b> by?',
        options: [
          { text: '3', ok: false, why: 'That would not remove the fraction. The denominator is the problem.' },
          { text: '\\(x+1\\)', ok: true, why: 'It cancels the denominator on the left, leaving \\(3=(2x-1)(x+1)\\), a quadratic.' },
          { text: '\\(2x-1\\)', ok: false, why: 'That does not clear the denominator.' } ],
        explain: 'Remember x cannot be \\(-1\\). We multiply by something that could be zero, so we must check at the end.' },
      { t: 'practice', id: 'd3-frac', title: 'Practice: fractional equations', topics: ['frac'], need: 4,
        intro: 'Get 4 in a row. The answers here are whole numbers, so you can check by substituting.' },

      { t: 'html', html: `<h3>Harder shapes</h3><p>The idea never changes: <b>multiply every term by the common denominator</b>, solve the quadratic, then reject any answer that makes a denominator zero. Watch for:</p><ul><li>a squared denominator, such as \\(\\dfrac{1}{x-2}+\\dfrac{3}{(x-2)^2}\\), where the common denominator is \\((x-2)^2\\)</li><li>a number in front of x in a denominator, such as \\(\\dfrac{5}{2x+1}\\), where x cannot be \\(-\\tfrac12\\)</li><li>a fraction on each side, where you can cross-multiply</li></ul>` },

      { t: 'predict', id: 'd3-p3',
        q: 'What is the common denominator of \\(\\dfrac{1}{x-2}+\\dfrac{3}{(x-2)^2}\\)?',
        options: [
          { text: '\\((x-2)^2\\)', ok: true, why: 'It is divisible by both \\(x-2\\) and \\((x-2)^2\\), and nothing smaller is.' },
          { text: '\\((x-2)^3\\)', ok: false, why: 'That works but is bigger than needed, so the algebra gets messy.' },
          { text: '\\((x-2)+(x-2)^2\\)', ok: false, why: 'Denominators are multiplied or compared as factors, never added.' } ],
        explain: 'Use the smallest expression that every denominator divides into.' },
      { t: 'practice', id: 'd3-frac2', title: 'Practice: harder fractional equations', topics: ['frac2'], need: 4,
        intro: 'Answers to 2 decimal places. Check that neither answer makes a denominator zero.' },

      { t: 'html', html: `<h3>Factorise the denominators first</h3><p>Before multiplying, factorise every denominator. It shows you the smallest common denominator and the values x cannot be.</p><ul><li>\\(x^2-4=(x-2)(x+2)\\)</li><li>\\(1-x^2=(1-x)(1+x)\\). Careful: \\(1-x\\) is the <b>opposite</b> of \\(x-1\\), so \\(\\dfrac{1}{1-x}=-\\dfrac{1}{x-1}\\).</li><li>\\(2x^2-5x-3=(2x+1)(x-3)\\), found with the multiplication frame.</li></ul>` },

      { t: 'predict', id: 'd3-p5',
        q: 'Which of these is equal to \\(\\dfrac{1}{1-x}\\)?',
        options: [
          { text: '\\(-\\dfrac{1}{x-1}\\)', ok: true, why: '\\(1-x=-(x-1)\\), so the fraction is the same number with a minus sign in front.' },
          { text: '\\(\\dfrac{1}{x-1}\\)', ok: false, why: '\\(x-1\\) and \\(1-x\\) are opposites, so these two fractions have opposite signs. They are not equal.' },
          { text: '\\(-\\dfrac{1}{1+x}\\)', ok: false, why: '\\(1+x\\) is a different bracket. Check with x = 3: the left side is \\(-\\tfrac12\\), this one is \\(-\\tfrac14\\).' } ],
        explain: 'Sign flips between brackets like (1 − x) and (x − 1) are a very common source of lost marks.' },
      { t: 'practice', id: 'd3-frac3', title: 'Practice: denominators that factorise', topics: ['frac3'], need: 4,
        intro: 'Factorise each denominator first. Answers to 2 decimal places.' },

      { t: 'predict', id: 'd3-p1',
        q: 'In \\(\\dfrac{7}{x-3}\\), which value can x never be?',
        options: [
          { text: '7', ok: false, why: 'A number on top is fine.' },
          { text: '0', ok: false, why: 'x = 0 gives \\(\\frac{7}{-3}\\), which is fine.' },
          { text: '3', ok: true, why: 'Then the bottom is \\(3-3=0\\), and you cannot divide by 0.' },
          { text: '−3', ok: false, why: 'x = −3 gives \\(\\frac{7}{-6}\\), which is fine.' } ],
        explain: 'So 3 can never be a solution of an equation with \\(x-3\\) in a denominator. That is why we check answers at the end.' },

      { t: 'errors', id: 'd3-err', title: 'Spot the mistake', items: [
        { title: 'Solve \\(\\dfrac{5}{x-2}-\\dfrac{2}{x}=\\dfrac{10}{x(x-2)}\\)', lines: [
          '\\dfrac{5}{x-2}-\\dfrac{2}{x}=\\dfrac{10}{x(x-2)}',
          '5x-2(x-2)=10 \\quad(\\text{multiply by }x(x-2))',
          '3x+4=10',
          'x=2',
          '\\text{So the solution is } x=2'], wrong: 4,
          why: 'The working is fine. The last line is wrong: \\(x=2\\) makes \\(x-2=0\\), so it would put zero in a denominator. It is <b>rejected</b>. This equation has <b>no solution</b>.' },
      ] },

      { t: 'widget', name: 'court', id: 'd3-court' },

      { t: 'think', id: 'd3-think1',
        prompt: 'Why must we check each answer in the <b>original</b> equation, not in the later steps?',
        model: 'When we multiply both sides by an expression that could be zero (like x − 2), the new equation can have an extra solution that the original never had. The later steps are all true for that extra solution, but the original equation is not even defined there. Only the original equation tells the truth.' },

      { t: 'practice', id: 'd3-extra', title: 'Practice: only the valid solutions', topics: ['extra'], need: 3,
        intro: 'Each one has an invalid root hiding. Type only the answer(s) that survive the check.' },

      { t: 'done' },
    ],
  },

  /* ------------------------------------------------------------------ DAY 4 */
  {
    n: 5, title: 'Graphs of quadratics', minutes: 125,
    tagline: 'Where the curve meets the axis, and where it turns',
    blocks: [
      { t: 'goal', items: [
        'Explain why the solutions of \\(ax^2+bx+c=0\\) are the x-intercepts of \\(y=ax^2+bx+c\\).',
        'Read the turning point and line of symmetry from the factorised form and from the completed-square form.',
        'Sketch a quadratic using only its critical points.',
        'Plot a table of values, match sketches to equations, and pick the line that solves a different equation.' ] },

      { t: 'html', html: `<span class="tag">🌉 The hook</span><h3>The curve hiding everywhere</h3><p>A basketball shot, a bridge cable, a satellite dish, a fountain of water: all of them are <b>parabolas</b>, the graph of a quadratic. The turning point is the top of the arch, or the lowest point of the dish.</p><p>Today you will learn to find that point, and where the curve crosses the ground, <b>without plotting a single point</b>.</p>` },

      { t: 'drill', id: 'd4-cold', title: 'Cold start: Levels 1 to 4', maxDay: 4, n: 5, minutes: 8,
        intro: '5 questions, no hints, 8 minutes.' },

      { t: 'html', html: `<h3>Equation versus graph</h3>
        <p>Solving \\(2x^2-5x-6=0\\) means: <i>for which x does the height \\(y=2x^2-5x-6\\) equal 0?</i> The height is zero exactly where the curve crosses the x-axis. So <b>solutions are x-intercepts</b>.</p>
        <p>One equation can have two solutions (curve crosses twice), one (curve just touches), or none (curve misses the axis). This matches the discriminant from Level 3.</p>` },

      { t: 'widget', name: 'graph' },
      { t: 'widget', name: 'rootHunt', id: 'd4-roothunt' },

      { t: 'html', html: `<div class=\"callout key\"><b>SIT: a checklist for every sketch.</b><br><b>S</b>hape: does it open up (positive) or down (negative)?<br><b>I</b>ntercepts: where does it cross the y-axis (put x = 0) and the x-axis (put y = 0)?<br><b>T</b>urning point: the lowest or highest point, on the line of symmetry.</div>` },

      { t: 'predict', id: 'd4-p1',
        q: 'A U-shaped curve crosses the x-axis at x = 2 and x = 8. At which x is its lowest point? (Try the explorer above first.)',
        options: [
          { text: 'x = 2', ok: false, why: 'That is where it crosses the axis, still on the way down.' },
          { text: 'x = 5', ok: true, why: 'Exactly halfway between 2 and 8.' },
          { text: 'x = 10', ok: false, why: '10 is the sum 2 + 8. We want the middle, not the total.' },
          { text: 'x = 16', ok: false, why: '16 is \\(2\\times 8\\). Not related to the middle.' } ],
        explain: 'The curve is a mirror image, so the middle of two mirror-image points sits on the mirror line: \\(x=\\dfrac{h+k}{2}\\).' },

      { t: 'predict', id: 'd4-p2',
        q: 'Why is \\((p,q)\\) the lowest point of \\(y=(x-p)^2+q\\)?',
        options: [
          { text: 'Because q is always the smallest number', ok: false, why: 'q can be any number. Think about the bracket instead.' },
          { text: 'Because a square is never negative, so it is smallest (zero) when x = p', ok: true, why: 'At x = p the bracket is 0, so \\(y=0+q=q\\).' },
          { text: 'Because p is always 0', ok: false, why: 'p can be any number too.' } ],
        explain: 'Everywhere else the square adds something positive, so y is higher. That is why completing the square shows the turning point at a glance.' },

      { t: 'think', id: 'd4-think1',
        prompt: 'When does a U-shaped parabola cut the x-axis twice, once, or never? Answer using q in \\(y=(x-p)^2+q\\).',
        model: 'The lowest point is at height q. If q &lt; 0 the lowest point is below the axis, so the curve crosses twice. If q = 0 it just touches once. If q &gt; 0 the lowest point is above the axis, so it never reaches it. For an upside-down parabola, it flips.' },

      { t: 'predict', id: 'd4-p3',
        q: 'A U-shaped curve has its turning point at \\((3,-4)\\). How many times does it cross the x-axis?',
        options: [
          { text: '0 times', ok: false, why: 'The lowest point is <i>below</i> the axis, so the curve has to climb up to it on both sides.' },
          { text: '1 time', ok: false, why: 'It would only touch the axis once if the turning point were exactly on it.' },
          { text: '2 times', ok: true, why: 'The lowest point is below the axis and the curve opens upwards, so it must cross once on the way down and once on the way up.' } ],
        explain: 'This is what the discriminant told you on Level 3, now seen as a picture.' },
      { t: 'html', html: `<h3>Plotting means a table first</h3><p>To <b>draw</b> a graph accurately, make a table of x and y for equally spaced x-values, plot the points, and join them with a smooth curve. To <b>solve</b> \\(ax^2+bx+c=0\\), read off where the curve crosses the x-axis, to the nearest 0.1.</p>` },

      { t: 'practice', id: 'd4-table', title: 'Practice: table of values', topics: ['table'], need: 3,
        intro: 'Substitute carefully. Put negative x-values in brackets.' },

      { t: 'paper', title: 'Plot on graph paper',
        tasks: ['Plot y = 2x² − 5x − 6 for −2 ≤ x ≤ 4. Use 2 cm to 1 unit on the x-axis and 1 cm to 2 units on the y-axis.', 'Read the x-intercepts to 1 decimal place, then check them with the formula.', 'Plot y = x² − 4x + 4 for −1 ≤ x ≤ 5. How many times does it touch the x-axis, and what does that tell you about the solutions?'],
        checks: ['Axes labelled with an even scale', 'Points marked with small crosses', 'A smooth curve, not straight pieces', 'Readings to the nearest 0.1, checked with the formula'],
        tip: 'Expected answers: about x = −0.9 and x = 3.4 for the first curve; the second touches the axis once at x = 2, so there is one repeated solution.' },

      { t: 'practice', id: 'd4-fact', title: 'Practice: factorised form', topics: ['gfact'], need: 4,
        intro: 'Find the x-intercepts, then the turning point. Fractions like 2.5 are fine.' },

      { t: 'practice', id: 'd4-cs', title: 'Practice: completed-square form', topics: ['gcs'], need: 4,
        intro: 'Turning point and number of x-intercepts.' },

      { t: 'practice', id: 'd4-neg', title: 'Practice: completing the square with −x²', topics: ['ctsn'], need: 3,
        intro: 'The minus sign is the trap. Take it out of the first two terms first.' },

      { t: 'html', html: `<h3>Horizontal lines and a curve</h3><p>A horizontal line \\(y=k\\) meets a curve only at heights the curve actually reaches. An upside-down parabola with maximum value 4 never goes above \\(y=4\\), so the line \\(y=5\\) never meets it. The line \\(y=4\\) touches it once, at the turning point. Any line below 4 cuts it twice. A U-shaped curve works the same way, upside down.</p>` },

      { t: 'predict', id: 'd4-p5',
        q: 'The curve \\(y=-(x-1)^2+4\\) has a maximum value of 4. Which reason explains why it does not meet the line \\(y=5\\)?',
        options: [
          { text: 'The curve never goes higher than y = 4, so it never reaches y = 5', ok: true, why: 'Say it like this in an exam: "The maximum value of y is 4, which is less than 5."' },
          { text: 'The line y = 5 is vertical', ok: false, why: 'y = 5 is horizontal. A vertical line would be x = 5.' },
          { text: 'The curve has no turning point', ok: false, why: 'It has one: (1, 4). That point is the key to the explanation.' } ],
        explain: 'The turning point tells you the largest or smallest y the curve can ever reach.' },
      { t: 'predict', id: 'd4-p6',
        q: 'Which horizontal line meets \\(y=-x^2+5x+6\\) at exactly one point?',
        options: [
          { text: '\\(y=12.25\\)', ok: true, why: 'The maximum value is \\(6+\\dfrac{5^2}{4}=12.25\\). Only the line through the turning point touches the curve once.' },
          { text: '\\(y=6\\)', ok: false, why: '6 is the y-intercept. The line \\(y=6\\) cuts the curve twice, at \\(x=0\\) and \\(x=5\\).' },
          { text: '\\(y=2.5\\)', ok: false, why: '2.5 is the x-coordinate of the turning point, not its height.' } ],
        explain: 'To find the one-touch line, find the turning point and use its y-value.' },
      { t: 'practice', id: 'd4-hline', title: 'Practice: horizontal lines', topics: ['hline'], need: 3,
        intro: 'Find the highest or lowest value first.' },

      { t: 'html', html: `<h3>Finding p and q from a graph</h3><p>If \\(y=x^2+px+q\\) cuts the x-axis at \\(x=-3\\) and \\(x=4\\), then \\(y=(x+3)(x-4)=x^2-x-12\\), so \\(p=-1\\) and \\(q=-12\\). If you are told its minimum point is \\((h,k)\\), write \\(y=(x-h)^2+k\\) and expand.</p>` },

      { t: 'practice', id: 'd4-pq', title: 'Practice: find p and q', topics: ['pq'], need: 3,
        intro: 'Expand the brackets carefully, then compare.' },

      { t: 'widget', name: 'match', id: 'd4-match' },

      { t: 'practice', id: 'd4-ggen', title: 'Practice: graphs from the general form', topics: ['ggen'], need: 3,
        intro: 'Complete the square, then read off the turning point.' },

      { t: 'html', html: `<h3>One graph, many equations</h3><p>Suppose you have drawn \\(y=2x^2+4x+1\\). To solve a different equation such as \\(2x^2+x+6=0\\), make the left side look like your curve: \\(2x^2+4x+1=3x-5\\). So draw the line \\(y=3x-5\\). Where the line meets the curve, the x-values are the solutions.</p>` },

      { t: 'predict', id: 'd4-p4',
        q: 'The graph of \\(y=x^2-3x\\) has been drawn. Which line must you draw to solve \\(x^2-4x-2=0\\)?',
        options: [
          { text: '\\(y=x+2\\)', ok: true, why: '\\(x^2-3x=x+2\\) rearranges to \\(x^2-4x-2=0\\). Subtract the right side from the left to check.' },
          { text: '\\(y=-x-2\\)', ok: false, why: '\\(x^2-3x=-x-2\\) gives \\(x^2-2x+2=0\\), which is a different equation.' },
          { text: '\\(y=x-2\\)', ok: false, why: '\\(x^2-3x=x-2\\) gives \\(x^2-4x+2=0\\), where the sign of the 2 is wrong.' } ],
        explain: 'Write the target equation as (the curve) = (a straight line). Whatever is left over is the line.' },
      { t: 'practice', id: 'd4-gline', title: 'Practice: choose the line', topics: ['gline'], need: 3,
        intro: 'Find m and n for the line y = mx + n.' },

      { t: 'practice', id: 'd4-gcsa', title: 'Stretch: when a is not 1', topics: ['gcsa'], need: 3,
        intro: 'The same ideas, with a number in front of the bracket. Extra challenge, not in the book.' },

      { t: 'practice', id: 'd4-readgraph', title: 'Practice: read values from a graph', topics: ['readgraph'], need: 3,
        intro: 'Read across and down to the nearest 0.5. Answers within 0.5 are accepted.' },

      { t: 'predict', id: 'd4-p7',
        q: 'A stone is thrown from a tower. Its height is \\(y=45+12x-x^2\\), where \\(x\\) is the horizontal distance from the foot of the tower in metres. Solving \\(45+12x-x^2=0\\) gives \\(x=15\\) or \\(x=-3\\). What does the positive solution mean?',
        options: [
          { text: 'The stone hits the ground 15 m from the foot of the tower', ok: true, why: 'When y = 0 the stone is at ground level. Only the positive distance makes sense, so x = −3 is rejected.' },
          { text: 'The stone reaches a greatest height of 15 m', ok: false, why: 'The greatest height is the turning point, not a solution of y = 0.' },
          { text: 'The stone is in the air for 15 seconds', ok: false, why: 'x is a horizontal distance in metres, not a time.' } ],
        explain: 'In context questions, say what the number means with units: "The stone lands 15 m from the foot of the tower."' },
      { t: 'practice', id: 'd4-simult', title: 'Stretch: a line and a curve, simultaneous', topics: ['simult'], need: 2,
        intro: 'A challenge from the end of the chapter. Substitute one equation into the other.' },

      { t: 'practice', id: 'd4-oneint', title: 'Stretch: exactly one x-intercept', topics: ['oneint'], need: 2,
        intro: 'One x-intercept means b² − 4ac = 0.' },

      { t: 'paper', title: 'Sketch on plain paper',
        tasks: ['Sketch \\(y=x^2-6x+5\\). Hint: it factorises.', 'Sketch \\(y=-x^2-6x-11\\). Hint: complete the square, and the curve does not reach the x-axis.', 'Sketch \\(y=(x-1)^2-4\\) and label the turning point, both intercepts and the line of symmetry.'],
        checks: ['Axes drawn with a sensible scale', 'Only critical points labelled (y-intercept, x-intercepts, turning point)', 'Curve is smooth and symmetric', 'Equation written next to the curve'],
        tip: 'If a curve does not touch the x-axis, find the y-intercept and the turning point, then use symmetry (reflect the y-intercept across the line of symmetry).' },

      { t: 'think', id: 'd4-think2',
        prompt: 'How do you decide whether to use the factorised form or the completed-square form to sketch a graph?',
        model: 'If the quadratic factorises, the factorised form gives the x-intercepts immediately, and the turning point is halfway between them. If it does not factorise (or never meets the x-axis), complete the square, because it works for every quadratic and gives the turning point directly.' },

      { t: 'done' },
    ],
  },

  /* ------------------------------------------------------------------ DAY 5 */
  {
    n: 6, title: 'Word problems', minutes: 110,
    tagline: 'Turn a story into an equation, then be sensible about the answer',
    blocks: [
      { t: 'goal', items: [
        'Define the unknown, write an expression for everything else, and build one quadratic equation.',
        'Reject a root that makes no sense in the story, and say why.',
        'Answer the question that was actually asked, with units.' ] },

      { t: 'html', html: `<span class="tag">🏀 The hook</span><h3>Every thrown ball is a quadratic</h3><p>Throw a ball, kick a football, shoot a basketball: the height over time follows a quadratic, always an upside-down U. The highest point is the turning point.</p><p>Engineers use this to aim fountains, and games programmers use it for jumps and cannons. Today you will build equations from stories, and then fire a few cannons yourself.</p>` },

      { t: 'drill', id: 'd5-cold', title: 'Cold start: Levels 1 to 5', maxDay: 5, n: 6, minutes: 10,
        intro: '6 questions, no hints, 10 minutes.' },

      { t: 'html', html: `<h3>Four steps for every word problem</h3>
        <ol class="steps">
          <li><b>Understand.</b> What is given? What is asked? Draw a picture or table.</li>
          <li><b>Plan.</b> Let x be the unknown. Write every other quantity in terms of x. Which relationship ties them together? (area = length × width, time = distance ÷ speed, Pythagoras.)</li>
          <li><b>Do.</b> Form the equation, move everything to one side, solve it.</li>
          <li><b>Look back.</b> Is each root sensible (length &gt; 0, speed &gt; 0)? Does the answer make sense? Did I answer the question, with units?</li>
        </ol>` },

      { t: 'predict', id: 'd5-p1',
        q: 'Solving a rectangle problem gives \\(x=-11\\) or \\(x=8\\) for the width. What is the width?',
        options: [
          { text: '−11', ok: false, why: 'A width is a length. It cannot be negative.' },
          { text: '8', ok: true, why: 'We reject −11 because it does not make sense for a width.' },
          { text: '−11 and 8', ok: false, why: 'There is only one rectangle, so only one width.' } ],
        explain: 'Always write the rejection in your working: "Since x &gt; 0, reject x = −11."' },

      { t: 'predict', id: 'd5-p2',
        q: "A rectangle's length is 3 cm more than its width x, and its area is 40 cm². Which equation is right?",
        options: [
          { text: '\\(x(x+3)=40\\)', ok: true, why: 'Area = width × length = \\(x\\times(x+3)\\).' },
          { text: '\\(x+(x+3)=40\\)', ok: false, why: 'That adds the sides. Area multiplies them.' },
          { text: '\\(x^2+3=40\\)', ok: false, why: 'The length is x + 3, not x. Then the area is not \\(x^2\\).' } ],
        explain: 'The skill is turning words into an equation. The solving is the easy part.' },
      { t: 'predict', id: 'd5-p3',
        q: "A bus has speed x km/h. A car is 20 km/h faster. For a trip of D km, what is the car's time in hours?",
        options: [
          { text: '\\(\\dfrac{D}{x+20}\\)', ok: true, why: "Time = distance ÷ speed, and the car's speed is \\(x+20\\)." },
          { text: '\\(\\dfrac{D}{x}+20\\)', ok: false, why: "That adds 20 hours to the bus's time. The 20 belongs to the speed." },
          { text: '\\(D(x+20)\\)', ok: false, why: 'That multiplies. Time is distance <i>divided</i> by speed.' },
          { text: '\\(\\dfrac{x+20}{D}\\)', ok: false, why: 'The fraction is upside down.' } ],
        explain: 'This is the expression that ends up in the denominator of your equation.' },
      { t: 'practice', id: 'd5-rect', title: 'Practice: area problems', topics: ['rect'], need: 3,
        intro: 'Form the equation yourself, then solve.' },

      { t: 'practice', id: 'd5-speed', title: 'Practice: speed, distance and time', topics: ['speed'], need: 3,
        intro: 'Time = distance ÷ speed. Convert minutes to hours.' },

      { t: 'widget', name: 'launch', id: 'd5-launch' },

      { t: 'practice', id: 'd5-proj', title: 'Practice: maximum height', topics: ['proj'], need: 3,
        intro: 'Complete the square, then read the maximum point.' },

      { t: 'html', html: `<h3>More story types</h3><ul><li><b>Right-angled triangle:</b> sides in terms of x, then Pythagoras.</li><li><b>Numbers:</b> consecutive integers are \\(x,\\ x+1\\); consecutive odd numbers are \\(x,\\ x+2\\).</li><li><b>Working together:</b> in one minute the fractions done by each add up: \\(\\dfrac1x+\\dfrac1{x+d}=\\dfrac1t\\).</li><li><b>A path around a garden:</b> the outer rectangle is \\(L+2x\\) by \\(W+2x\\).</li><li><b>Profit or height models:</b> complete the square and read the turning point.</li></ul>` },

      { t: 'practice', id: 'd5-pyth', title: 'Practice: Pythagoras', topics: ['pyth'], need: 3,
        intro: 'Form the equation, solve, reject the negative root.' },

      { t: 'practice', id: 'd5-consec', title: 'Practice: consecutive numbers', topics: ['consec'], need: 3,
        intro: 'x and x + 1, or x and x + 2.' },

      { t: 'practice', id: 'd5-path', title: 'Practice: a path around a garden', topics: ['path'], need: 3,
        intro: 'Draw the picture first.' },

      { t: 'practice', id: 'd5-work', title: 'Practice: working together', topics: ['work'], need: 2,
        intro: 'This one gives a fractional equation. Take it slowly.' },

      { t: 'practice', id: 'd5-profit', title: 'Practice: profit model', topics: ['profit'], need: 3,
        intro: 'Read the greatest profit from the completed-square form.' },

      { t: 'errors', id: 'd5-err', title: 'Spot the mistake', items: [
        { title: 'The length of a rectangle is 3 cm more than its width. The area is 40 cm². Find the width.', lines: [
          'x(x+3)=40',
          'x^2+3x-40=0',
          '(x+8)(x-5)=0',
          'x=-8 \\text{ or } x=5',
          '\\text{The width is 5 cm or } -8 \\text{ cm.}'], wrong: 4,
          why: 'A width cannot be negative. The last line must reject \\(x=-8\\) and say: "Since the width is positive, the width is 5 cm."' },
      ] },

      { t: 'paper', title: 'Make your own problem',
        tasks: ['Write a word problem whose equation is \\(x^2+5x-24=0\\). It must have a sensible story, and exactly one root must be rejected.', 'Swap papers with your teacher: you solve theirs, they solve yours.'],
        checks: ['The story really leads to that equation', 'One root is clearly impossible in the story', 'He can state the final answer with units'],
        tip: 'Factorise: \\((x+8)(x-3)\\). So x = 3 or −8. Perfect for something like "a number is 5 more than ..." or a rectangle.' },

      { t: 'done' },
    ],
  },

  /* ------------------------------------------------------------------ DAY 6 */
  {
    n: 7, title: 'Money, rates and journeys', minutes: 130,
    tagline: 'The same equation wearing different clothes',
    blocks: [
      { t: 'goal', items: [
        'Spot the pattern behind price, rate, speed and journey stories: <b>amount ÷ rate = quantity or time</b>.',
        'Form the equation yourself, reject any answer that makes no sense, and answer in the right units.',
        'Change units before you form the equation (kg to g, seconds to minutes, minutes to hours).' ] },

      { t: 'html', html: `<span class="tag">🧾 The hook</span><h3>One story, eight disguises</h3><p>Rice and dollars. Pumps and litres. Boats and rivers. Cakes and sugar. They look different, but almost every one hides the same sentence: <b>"the same amount is shared out two ways, and the two answers differ by a fixed amount."</b></p><p>That gives a fraction equation, and a fraction equation gives a quadratic. Once you see the pattern, the stories stop being scary.</p>` },

      { t: 'drill', id: 'd6-cold', title: 'Cold start: Levels 1 to 6', maxDay: 6, n: 6, minutes: 10,
        intro: '6 questions, no hints, 10 minutes.' },

      { t: 'html', html: `<h3>The one pattern</h3><table class="prog"><tr><th>Story</th><th>Amount</th><th>Rate</th><th>Result</th></tr>
        <tr><td>Rice</td><td>$360</td><td>$x per kg</td><td>\\(\\dfrac{360}{x}\\) kg</td></tr>
        <tr><td>Pump</td><td>1500 litres</td><td>x litres per minute</td><td>\\(\\dfrac{1500}{x}\\) minutes</td></tr>
        <tr><td>Journey</td><td>12 km</td><td>x km/h</td><td>\\(\\dfrac{12}{x}\\) hours</td></tr>
        <tr><td>Cake</td><td>6000 g sugar</td><td>x g per cake</td><td>\\(\\dfrac{6000}{x}\\) cakes</td></tr></table>
        <p>Write the result for both versions, subtract (or add), set it equal to what the story gives, and multiply by the common denominator.</p>` },

      { t: 'predict', id: 'd6-p1',
        q: 'Rice costs \\(\\$x\\) per kilogram. How many kilograms does \\(\\$360\\) buy?',
        options: [
          { text: '\\(\\dfrac{360}{x}\\)', ok: true, why: 'Quantity = amount ÷ price per unit.' },
          { text: '\\(360x\\)', ok: false, why: 'That multiplies. A bigger price per kg should buy <i>fewer</i> kg, so we must divide.' },
          { text: '\\(\\dfrac{x}{360}\\)', ok: false, why: 'This is upside down. Check: if x = 1 dollar per kg, $360 buys 360 kg, not 1/360 kg.' } ],
        explain: 'Always test your expression with an easy number, like x = 1.' },
      { t: 'predict', id: 'd6-p2',
        q: 'A pump fills 1500 litres at \\(x\\) litres per minute, and a second pump is 150 <b>seconds</b> slower. In an equation for the times in <b>minutes</b>, what goes on the right-hand side?',
        options: [
          { text: '\\(\\dfrac{150}{60}\\)', ok: true, why: '150 seconds ÷ 60 = 2.5 minutes. Match the units on both sides.' },
          { text: '150', ok: false, why: 'That would be 150 minutes. The left-hand side is in minutes, so the 150 seconds must be converted first.' },
          { text: '\\(150\\times 60\\)', ok: false, why: 'That converts the wrong way: it turns minutes into seconds.' } ],
        explain: 'Before you write the equation, put every time in the same unit.' },
      { t: 'predict', id: 'd6-p3',
        q: 'A boat goes \\(x\\) km/h in still water. The river current is 5 km/h. How fast does it go <b>upstream</b>?',
        options: [
          { text: '\\((x-5)\\) km/h', ok: true, why: 'Going against the current slows you down by 5.' },
          { text: '\\((x+5)\\) km/h', ok: false, why: 'That is the speed <i>downstream</i>, with the current helping.' },
          { text: '\\((5-x)\\) km/h', ok: false, why: 'This would be negative for any real boat. The boat is faster than the current.' } ],
        explain: 'Upstream: subtract the current. Downstream: add it.' },

      { t: 'practice', id: 'd6-price', title: 'Practice: price per kilogram', topics: ['price'], need: 2,
        intro: 'Money spent ÷ price per kg = kilograms bought.' },

      { t: 'practice', id: 'd6-exch', title: 'Practice: exchange rates', topics: ['exch'], need: 2,
        intro: 'Foreign money received = money exchanged ÷ rate.' },

      { t: 'practice', id: 'd6-rate', title: 'Practice: litres per minute', topics: ['rate'], need: 2,
        intro: 'Change seconds to minutes first.' },

      { t: 'practice', id: 'd6-cakes', title: 'Practice: grams per cake', topics: ['cakes'], need: 2,
        intro: 'Change kilograms to grams first.' },

      { t: 'practice', id: 'd6-stream', title: 'Practice: upstream and downstream', topics: ['stream'], need: 2,
        intro: 'Upstream is x minus the current. Downstream is x plus the current.' },

      { t: 'practice', id: 'd6-journey', title: 'Practice: a journey in two parts', topics: ['journey'], need: 2,
        intro: 'Part of the time is the same for both. Look for what cancels.' },

      { t: 'practice', id: 'd6-border', title: 'Practice: a border inside a room', topics: ['border'], need: 3,
        intro: 'Draw the room. The tiled rectangle loses x on every side.' },

      { t: 'practice', id: 'd6-perim', title: 'Practice: perimeter and area', topics: ['perim'], need: 3,
        intro: 'Half the perimeter is length + breadth.' },


      { t: 'errors', id: 'd6-err', title: 'Spot the mistake', items: [
        { title: 'A pump fills a 1500-litre tank at \\(x\\) litres per minute. A second pump, 20 litres per minute faster, fills it 150 seconds sooner.', lines: [
          '\\dfrac{1500}{x}-\\dfrac{1500}{x+20}=150',
          '1500(x+20)-1500x=150x(x+20)',
          '30000=150x^2+3000x',
          'x^2+20x-200=0'], wrong: 0,
          why: 'The right-hand side should be in <b>minutes</b>, because the left-hand side is in minutes. 150 seconds is \\(\\dfrac{150}{60}=2.5\\) minutes. Then \\(2.5x(x+20)=30000\\), which simplifies to \\(x^2+20x-12000=0\\).' },
      ] },

      { t: 'done' },
    ],
  },

  /* ------------------------------------------------------------------ DAY 7 */
  {
    n: 8, title: 'Mixed test and mock paper', minutes: 110,
    tagline: 'Everything, shuffled, then a full timed paper',
    blocks: [
      { t: 'goal', items: [
        'No hints. No topic labels. Questions in random order, like the real thing.',
        'Score 12 out of 15 or higher in 30 minutes.',
        'Then score 28 out of 40 or higher on the full mock paper in 60 minutes.' ] },
      { t: 'html', html: `<span class="tag">🔥 Boss fight</span><h3>The guardian of the castle</h3><p>Fifteen questions stand between you and the castle. They come from every level, in random order, and the guardian gives <b>no hints</b>. Everything you built this week is your weapon.</p>` },

      { t: 'html', html: `<div class="callout">Rules: no notes, no phone, a calculator is allowed (like in school). Write your working on paper, then type the answer. If the score is below 12, tomorrow's session fixes the weak spots.</div>` },
      { t: 'drill', id: 'd7-test', title: 'Mixed test', maxDay: 7, n: 15, minutes: 30, test: true, pass: 12,
        intro: '15 questions, 30 minutes. One try each. Pass mark: 12.' },

      { t: 'mock', id: 'd7-mock', pass: 28, ...MOCK_PAPER },

      { t: 'done' },
    ],
  },

  /* ------------------------------------------------------------------ DAY 7 */
  {
    n: 9, title: 'Repair, then teach it back', minutes: 50,
    tagline: 'Fix the weak spots, then teach the whole chapter',
    blocks: [
      { t: 'goal', items: [
        'Fix the topics that cost marks yesterday.',
        'Explain the whole chapter as one story.',
        'Pass the wake-up test.' ] },

      { t: 'html', html: `<span class="tag">🏰 Final level</span><h3>Repair your armour</h3><p>The boss found the cracks in your armour. Now you repair them, then prove you can teach the whole chapter in one story, and take on the Wake-up test.</p>` },

      { t: 'drill', id: 'd8-weak', title: 'Your weakest topics', topics: 'weak', n: 8, minutes: 12, pass: 6,
        intro: 'These are picked from your own record in this app, lowest accuracy first.' },

      { t: 'teachback', title: 'Teach the whole chapter (5 minutes)',
        prompt: 'The student explains the chapter to you with no notes: "Everything in this chapter comes from completing the square." He should cover each link in the chain.',
        checks: ['Completing the square: add (b/2)², subtract it again', 'The formula is completing the square done once with letters', 'Fractional equations: multiply out, solve, then reject invalid roots', 'Roots are x-intercepts; completed-square form gives the turning point', 'Word problems: build the equation, solve it, reject what makes no sense'] },

      { t: 'html', html: `<div class="callout key"><b>Finish with the wake-up test.</b> Use the <a href="#/wake">Wake-up mode</a> page. Ten random questions, ten minutes, no help. Ten random questions, ten minutes, no help. Be ready for anything, any time.</div>` },

      { t: 'done' },
    ],
  },
];

/* Teacher-only map from the book (think! Mathematics, Chapter 1) to where each part is taught here. */
const COVERAGE = [
  { sec: 'Method', book: 'Maths runs on fixed rules, joined together to solve bigger problems', here: 'A Rulebook page (📘 Rules in the top bar) with a numbered recipe for every kind of problem, plus a recipe toggle on every practice set. The factorising recipe is the P and S method.' },
  { sec: '1.1 A', book: 'Recap: solve by factorising (WE 1, Practice Now 1, Ex 1A Q1)', here: 'Level 1 (the whole foundation level): the five-step P and S method with sign rules, a guided step-by-step trainer, then a ladder of expression types (common factor, difference of squares, negative x², number in front of x² by the ac-method)' },
  { sec: '1.1 B', book: 'Solve (x + r)² = s with ± (WE 2, PN 2, Ex 1A Q2)', here: 'Level 2 (square-root practice, error hunt)' },
  { sec: '1.1 C-D', book: 'Perfect squares and the area picture; the (b/2)² investigation (WE 3, PN 3, Ex 1A Q3)', here: 'Level 2 (missing-corner slider, predict, think, ctsx, ctsd for fractions and decimals)' },
  { sec: '1.1 D', book: 'x² + bx + c, and -x² + bx + c (WE 4, PN 4, Ex 1A Q4)', here: 'Level 2 (+c), Level 5 (-x² practice)' },
  { sec: '1.1 E', book: 'Solve by completing the square, two methods (WE 5, PN 5, Ex 1A Q5-6)', here: 'Level 3 (ctss), plus a not 1 (ctsa, ctssa)' },
  { sec: '1.1', book: 'Ex 1A Q7-8: equations to tidy first, and a letter constant (y² - ay - 6 = 0)', here: 'Level 3 (rearr practice, letter-constant predict)' },
  { sec: '1.1', book: 'Reflection: 2x² + 8x - 6 = 0 when a is not 1', here: 'Level 3 (a not 1: predict, ctsa, ctssa)' },
  { sec: '1.2', book: 'Derive the quadratic formula; use it (WE 6, PN 6, Ex 1B Q1-2, Q4)', here: 'Level 3 (step-by-step derivation, jigsaw, closed-book derivation, formula practice)' },
  { sec: '1.2', book: 'Class Discussion: zero, one or two real solutions', here: 'Level 3 (disc, kval, predicts)' },
  { sec: '1.3', book: 'Fractional equations reducible to quadratics (WE 7-8, PN 7-8, Ex 1B Q3, Q5-8)', here: 'Level 4 (frac, frac2: squared denominators, numbers in front of x, cross-multiplying)' },
  { sec: '1.3', book: 'Thinking Time: Shufen\'s invalid solution x = 3', here: 'Level 4 (bug hunt, 1 = 2 hook, Rejection Court, extra)' },
  { sec: '1.4', book: 'Solve graphically; one, two or no x-intercepts (WE 9-10, PN 9-10, Ex 1C)', here: 'Level 5 (table practice, graph paper task, Root Hunter, explorer, predicts)' },
  { sec: '1.5', book: 'Sketch y = ±(x - h)(x - k) (WE 11, PN 11, Ex 1D Q1, Q3-6)', here: 'Level 5 (explorer, gfact, paper sketches)' },
  { sec: '1.5', book: 'Sketch y = ±(x - p)² + q (WE 12-13, PN 12-13, Ex 1D Q2, Q7-10)', here: 'Level 5 (gcs, ctsn, ggen, paper sketches)' },
  { sec: '1.5', book: 'Class Discussion: matching 12 graphs to equations', here: 'Level 5 (Match the Graph game)' },
  { sec: '1.6', book: 'Word problems: Pythagoras and perimeter (WE 14, PN 14)', here: 'Level 6 (pyth, area, path)' },
  { sec: '1.6', book: 'Word problems: speed, distance, time with a fraction (WE 15, PN 15)', here: 'Level 6 (speed, work)' },
  { sec: '1.6', book: 'Modelling by a quadratic function (WE 16, PN 16)', here: 'Level 6 (proj, profit, Launch Lab)' },
  { sec: 'Beyond', book: 'Typical Sec 3 and O-Level extras not in the book', here: 'kval (find k), gline (which line solves another equation), gcsa (a not 1), consec, work, profit, path, harder frac2' },
  { sec: 'Ex 1E', book: 'Q1-Q11: poster, printers, rice price, projectile, pyramid face, hike, coach, pumps, exchange rate, wind, plotting', here: 'Levels 6 and 7 (rect, speed, proj, pyth, path, work, price, exch, rate, journey, stream, cakes, border, perim) plus plotting in Level 5. The pyramid-face geometry question is not generated.' },
  { sec: 'Summary', book: 'Chapter Summary: completing the square, the four methods, LCM method for fractions, graph facts', here: 'Covered across Levels 2 to 5' },
  { sec: 'Review 1', book: 'Q1-Q3 solve; Q4 substitution; Q5 form an equation from solutions; Q6 fractional equations including factorisable denominators; Q7-Q8 sketch', here: 'Levels 2 to 5 (ctsx, ctsd, rearr, subst, fromroots, frac, frac2, frac3, sketching topics)' },
  { sec: 'Review 1', book: 'Q9-Q15 exchange rate, speed, cakes, floor border, stone, two pipes, boat', here: 'Level 7 (exch, journey, cakes, border, stream, work) and Level 5 (readgraph, stone-in-context predict)' },
  { sec: 'Challenge', book: 'Simultaneous equations with a quadratic; one x-intercept; sum and product of roots', here: 'Stretch practice: simult and oneint (Level 5), sumprod (Level 3)' },
  { sec: 'Mock paper', book: 'School mock paper (Sec 3 WA1): fraction with 1 - x² denominator, express then hence, sketch with horizontal lines, find p and q, two word problems', here: 'factexp, frac3, fromroots, pq, hline, hence, plus a 40-mark timed mock paper (Level 8 and the Mock paper button)' },
  { sec: 'Syllabus', book: 'MOE G3 Mathematics: completing the square is limited to x² + px + q; the word discriminant is not used', here: 'Topics beyond that (a not 1, find k, sum and product, simultaneous, one-intercept) are labelled Stretch and kept out of the tests, mock paper and Wake-up mode' },
];
