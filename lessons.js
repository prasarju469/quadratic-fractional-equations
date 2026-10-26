/* Lesson content. Each day is a list of blocks rendered in order by app.js. */

const SPINE = `Everything in this chapter grows from <b>one idea: completing the square</b>.
The quadratic formula is completing the square done once with letters. The turning point of a graph is what completing the square shows you.
Fractional equations and word problems both <i>end</i> in a quadratic.`;

const DAYS = [
  /* ------------------------------------------------------------------ DAY 1 */
  {
    n: 1, title: 'Completing the square', minutes: 75,
    tagline: 'Why a missing corner makes everything work',
    blocks: [
      { t: 'goal', items: [
        'Say why \\(x^2+6x\\) is not a perfect square, and exactly what is missing.',
        'Rewrite any \\(x^2+bx+c\\) as \\((x+r)^2+u\\), and explain each step with a picture.',
        'Solve equations of the form \\((x+r)^2=s\\) without losing a solution.' ] },

      { t: 'html', html: `<span class="tag">🏺 The hook</span><h3>A puzzle from 4,000 years ago</h3>
        <p>Babylonian scribes carved puzzles into clay tablets. One says: <i>"I took away the side of my square from its area and got 870."</i> In our notation, that is \\(x^2-x=870\\).</p>
        <p>They had no algebra, no formulas, not even the letter x. They solved it by <b>cutting and rearranging squares</b>, the exact trick you learn today. At the end of this mission you will crack their puzzle.</p>` },

      { t: 'practice', id: 'd1-warm', title: 'Warm-up: what he already knows', topics: ['factor'], need: 3,
        intro: 'Factorising and the Zero Product Principle. If any of these feel shaky, fix them before moving on.' },

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
        { title: 'A student writes:', lines: ['x^2+8x', '= x^2+8x+16', '= (x+4)^2'], wrong: 1,
          why: 'Line 2 adds 16 for free. The two sides are no longer equal. Correct: \\(x^2+8x=(x^2+8x+16)-16=(x+4)^2-16\\).' },
        { title: 'A student writes:', lines: ['x^2-6x+1', '=(x^2-6x+9)-9+1', '=(x-3)^2-9+1', '=(x-3)^2+1'], wrong: 3,
          why: 'Line 4 forgot to combine \\(-9+1\\). It is \\(-8\\), so the answer is \\((x-3)^2-8\\).' },
        { title: 'A student writes:', lines: ['(x-5)^2=9', 'x-5=3', 'x=8'], wrong: 1,
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
    n: 2, title: 'Solve any quadratic, then build the formula', minutes: 100,
    tagline: 'The formula is not magic. He will derive it.',
    blocks: [
      { t: 'goal', items: [
        'Solve any quadratic by completing the square.',
        'Derive the quadratic formula from scratch and say what every step does.',
        'Use the discriminant \\(b^2-4ac\\) to say how many real solutions an equation has, and why.',
        'Cope with a number in front of \\(x^2\\), equations that need tidying first, and unknown constants.' ] },

      { t: 'html', html: `<span class="tag">🏺 The hook</span><h3>3,000 years to find one formula</h3><p>Babylonian scribes solved quadratics with squares about 4,000 years ago. But one formula that works on <i>every</i> quadratic took roughly 3,000 more years to appear. In 2019, a maths professor, Po-Shen Loh, found a clever new way to see the same idea. So even this old topic is still being explored.</p><p>Today you will not <b>memorise</b> that formula. You will <b>build</b> it, then rebuild it on paper from nothing.</p>` },

      { t: 'drill', id: 'd2-cold', title: 'Cold start: Level 1 without notes', maxDay: 1, n: 4, minutes: 5,
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
      { t: 'html', html: `<h3>What if there is a number in front of x²?</h3><p>Example: \\(2x^2+8x-6=0\\). Divide <b>every</b> term by 2 first to get \\(x^2+4x-3=0\\), and carry on as before. Dividing both sides by the same number keeps the solutions the same.</p><p>To <b>rewrite</b> an expression such as \\(2x^2+8x-6\\), take the 2 out of the first two terms only, complete the square inside, then multiply the correction by 2:</p>\\[2x^2+8x-6=2(x^2+4x)-6=2\\left[(x+2)^2-4\\right]-6=2(x+2)^2-14\\]` },

      { t: 'predict', id: 'd2-p4',
        q: 'To solve \\(3x^2-12x+5=0\\) by completing the square, what should you do first?',
        options: [
          { text: 'Divide every term by 3', ok: true, why: 'Then the \\(x^2\\) has no number in front and you can add \\((\\text{half})^2\\) as usual.' },
          { text: 'Add 36 to both sides', ok: false, why: '36 is \\((-12/2)^2\\), but that rule only works once the \\(x^2\\) has coefficient 1.' },
          { text: 'Move the 5 across and leave the 3', ok: false, why: 'You can move the 5, but you still cannot complete the square while the x² has a 3 in front.' } ],
        explain: 'Always make the coefficient of \\(x^2\\) equal to 1 first.' },
      { t: 'practice', id: 'd2-ctsa', title: 'Practice: rewrite when a is not 1', topics: ['ctsa'], need: 3,
        intro: 'Write it as a(x + r)² + u. Take a out of the first two terms.' },

      { t: 'practice', id: 'd2-ctssa', title: 'Practice: solve when a is not 1', topics: ['ctssa'], need: 3,
        intro: 'Divide by a first. Answers to 2 decimal places.' },

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

      { t: 'html', html: `<h3>Finding an unknown constant</h3><p>The number of real solutions tells you the sign of \\(b^2-4ac\\): <b>zero</b> for one (equal) solution, <b>positive</b> for two, <b>negative</b> for none. Put the letter into \\(b^2-4ac\\) and solve.</p><p>Example: \\(x^2+kx+9=0\\) has equal roots, so \\(k^2-36=0\\), giving \\(k=6\\) or \\(k=-6\\).</p>` },

      { t: 'practice', id: 'd2-kval', title: 'Practice: find the unknown', topics: ['kval'], need: 3,
        intro: 'Use b² − 4ac and the number of solutions.' },

      { t: 'paper', title: 'The big test: derive it on blank paper',
        tasks: ['Start from \\(ax^2+bx+c=0\\) and derive the quadratic formula. No notes, no screen.', 'Next to every line he writes what he did (e.g. "divided by a").'],
        checks: ['Divides by a', 'Moves c/a to the right', 'Adds (b/2a)² to both sides', 'Writes the left side as a perfect square', 'Takes ± the square root', 'Isolates x'],
        tip: 'Do not help. If he is stuck for more than 2 minutes, only ask: "What did we do in the \\(x^2+4x-3=0\\) example at this step?"' },

      { t: 'done' },
    ],
  },

  /* ------------------------------------------------------------------ DAY 3 */
  {
    n: 3, title: 'Fractional equations', minutes: 75,
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
      { t: 'drill', id: 'd3-cold', title: 'Cold start: Levels 1 and 2', maxDay: 2, n: 5, minutes: 7,
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
    n: 4, title: 'Graphs of quadratics', minutes: 110,
    tagline: 'Where the curve meets the axis, and where it turns',
    blocks: [
      { t: 'goal', items: [
        'Explain why the solutions of \\(ax^2+bx+c=0\\) are the x-intercepts of \\(y=ax^2+bx+c\\).',
        'Read the turning point and line of symmetry from the factorised form and from the completed-square form.',
        'Sketch a quadratic using only its critical points.',
        'Plot a table of values, match sketches to equations, and pick the line that solves a different equation.' ] },

      { t: 'html', html: `<span class="tag">🌉 The hook</span><h3>The curve hiding everywhere</h3><p>A basketball shot, a bridge cable, a satellite dish, a fountain of water: all of them are <b>parabolas</b>, the graph of a quadratic. The turning point is the top of the arch, or the lowest point of the dish.</p><p>Today you will learn to find that point, and where the curve crosses the ground, <b>without plotting a single point</b>.</p>` },

      { t: 'drill', id: 'd4-cold', title: 'Cold start: Levels 1 to 3', maxDay: 3, n: 5, minutes: 8,
        intro: '5 questions, no hints, 8 minutes.' },

      { t: 'html', html: `<h3>Equation versus graph</h3>
        <p>Solving \\(2x^2-5x-6=0\\) means: <i>for which x does the height \\(y=2x^2-5x-6\\) equal 0?</i> The height is zero exactly where the curve crosses the x-axis. So <b>solutions are x-intercepts</b>.</p>
        <p>One equation can have two solutions (curve crosses twice), one (curve just touches), or none (curve misses the axis). This matches the discriminant from Level 2.</p>` },

      { t: 'widget', name: 'graph' },
      { t: 'widget', name: 'rootHunt', id: 'd4-roothunt' },

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
        explain: 'This is what the discriminant told you on Level 2, now seen as a picture.' },
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
    n: 5, title: 'Word problems', minutes: 110,
    tagline: 'Turn a story into an equation, then be sensible about the answer',
    blocks: [
      { t: 'goal', items: [
        'Define the unknown, write an expression for everything else, and build one quadratic equation.',
        'Reject a root that makes no sense in the story, and say why.',
        'Answer the question that was actually asked, with units.' ] },

      { t: 'html', html: `<span class="tag">🏀 The hook</span><h3>Every thrown ball is a quadratic</h3><p>Throw a ball, kick a football, shoot a basketball: the height over time follows a quadratic, always an upside-down U. The highest point is the turning point.</p><p>Engineers use this to aim fountains, and games programmers use it for jumps and cannons. Today you will build equations from stories, and then fire a few cannons yourself.</p>` },

      { t: 'drill', id: 'd5-cold', title: 'Cold start: Levels 1 to 4', maxDay: 4, n: 6, minutes: 10,
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
    n: 6, title: 'The mixed test', minutes: 40,
    tagline: 'Everything, shuffled, no help',
    blocks: [
      { t: 'goal', items: [
        'No hints. No topic labels. Questions in random order, like the real thing.',
        'Score 12 out of 15 or higher in 30 minutes.' ] },
      { t: 'html', html: `<span class="tag">🔥 Boss fight</span><h3>The guardian of the castle</h3><p>Fifteen questions stand between you and the castle. They come from every level, in random order, and the guardian gives <b>no hints</b>. Everything you built this week is your weapon.</p>` },

      { t: 'html', html: `<div class="callout">Rules: no notes, no phone, a calculator is allowed (like in school). Write your working on paper, then type the answer. If the score is below 12, tomorrow's session fixes the weak spots.</div>` },
      { t: 'drill', id: 'd6-test', title: 'Mixed test', maxDay: 5, n: 15, minutes: 30, test: true, pass: 12,
        intro: '15 questions, 30 minutes. One try each. Pass mark: 12.' },
      { t: 'done' },
    ],
  },

  /* ------------------------------------------------------------------ DAY 7 */
  {
    n: 7, title: 'Repair, then teach it back', minutes: 50,
    tagline: 'Fix the weak spots, then teach the whole chapter',
    blocks: [
      { t: 'goal', items: [
        'Fix the topics that cost marks yesterday.',
        'Explain the whole chapter as one story.',
        'Pass the wake-up test.' ] },

      { t: 'html', html: `<span class="tag">🏰 Final level</span><h3>Repair your armour</h3><p>The boss found the cracks in your armour. Now you repair them, then prove you can teach the whole chapter in one story, and take on the Wake-up test.</p>` },

      { t: 'drill', id: 'd7-weak', title: 'Your weakest topics', topics: 'weak', n: 8, minutes: 12, pass: 6,
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
  { sec: '1.1 A', book: 'Recap: solve by factorising (WE 1, Practice Now 1, Ex 1A Q1)', here: 'Level 1 warm-up (factorise)' },
  { sec: '1.1 B', book: 'Solve (x + r)² = s with ± (WE 2, PN 2, Ex 1A Q2)', here: 'Level 1 (square-root practice, error hunt)' },
  { sec: '1.1 C-D', book: 'Perfect squares and the area picture; the (b/2)² investigation (WE 3, PN 3, Ex 1A Q3)', here: 'Level 1 (missing-corner slider, predict, think, ctsx, ctsd for fractions and decimals)' },
  { sec: '1.1 D', book: 'x² + bx + c, and -x² + bx + c (WE 4, PN 4, Ex 1A Q4)', here: 'Level 1 (+c), Level 4 (-x² practice)' },
  { sec: '1.1 E', book: 'Solve by completing the square, two methods (WE 5, PN 5, Ex 1A Q5-6)', here: 'Level 2 (ctss), plus a not 1 (ctsa, ctssa)' },
  { sec: '1.1', book: 'Ex 1A Q7-8: equations to tidy first, and a letter constant (y² - ay - 6 = 0)', here: 'Level 2 (rearr practice, letter-constant predict)' },
  { sec: '1.1', book: 'Reflection: 2x² + 8x - 6 = 0 when a is not 1', here: 'Level 2 (a not 1: predict, ctsa, ctssa)' },
  { sec: '1.2', book: 'Derive the quadratic formula; use it (WE 6, PN 6, Ex 1B Q1-2, Q4)', here: 'Level 2 (step-by-step derivation, jigsaw, closed-book derivation, formula practice)' },
  { sec: '1.2', book: 'Class Discussion: zero, one or two real solutions', here: 'Level 2 (disc, kval, predicts)' },
  { sec: '1.3', book: 'Fractional equations reducible to quadratics (WE 7-8, PN 7-8, Ex 1B Q3, Q5-8)', here: 'Level 3 (frac, frac2: squared denominators, numbers in front of x, cross-multiplying)' },
  { sec: '1.3', book: 'Thinking Time: Shufen\'s invalid solution x = 3', here: 'Level 3 (bug hunt, 1 = 2 hook, Rejection Court, extra)' },
  { sec: '1.4', book: 'Solve graphically; one, two or no x-intercepts (WE 9-10, PN 9-10, Ex 1C)', here: 'Level 4 (table practice, graph paper task, Root Hunter, explorer, predicts)' },
  { sec: '1.5', book: 'Sketch y = ±(x - h)(x - k) (WE 11, PN 11, Ex 1D Q1, Q3-6)', here: 'Level 4 (explorer, gfact, paper sketches)' },
  { sec: '1.5', book: 'Sketch y = ±(x - p)² + q (WE 12-13, PN 12-13, Ex 1D Q2, Q7-10)', here: 'Level 4 (gcs, ctsn, ggen, paper sketches)' },
  { sec: '1.5', book: 'Class Discussion: matching 12 graphs to equations', here: 'Level 4 (Match the Graph game)' },
  { sec: '1.6', book: 'Word problems: Pythagoras and perimeter (WE 14, PN 14)', here: 'Level 5 (pyth, area, path)' },
  { sec: '1.6', book: 'Word problems: speed, distance, time with a fraction (WE 15, PN 15)', here: 'Level 5 (speed, work)' },
  { sec: '1.6', book: 'Modelling by a quadratic function (WE 16, PN 16)', here: 'Level 5 (proj, profit, Launch Lab)' },
  { sec: 'Beyond', book: 'Typical Sec 3 and O-Level extras not in the book', here: 'kval (find k), gline (which line solves another equation), gcsa (a not 1), consec, work, profit, path, harder frac2' },
  { sec: 'Note', book: 'Ex 1E, the Chapter Summary and Review Exercise 1 are not in the PDF you supplied (it ends at page 32).', here: 'Covered by the topic equivalents above. Share those pages if you want me to align the wording and question types exactly.' },
];
