const questions = [
  { q: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Mercury'], answer: 1 },
  { q: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 3 },
  { q: 'How many sides does a hexagon have?', options: ['Five', 'Six', 'Seven', 'Eight'], answer: 1 },
  { q: 'Which language runs in a web browser?', options: ['JavaScript', 'C++', 'SQL', 'Bash'], answer: 0 },
  { q: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'], answer: 2 }
];
let index = 0, score = 0, locked = false;
function render() {
  const item = questions[index]; locked = false; document.querySelector('#progress').textContent = `Question ${index + 1} of ${questions.length}`;
  document.querySelector('#question').textContent = item.q; document.querySelector('#feedback').textContent = ''; const answers = document.querySelector('#answers'); answers.replaceChildren();
  item.options.forEach((option, i) => { const button = document.createElement('button'); button.className = 'answer'; button.textContent = option; button.addEventListener('click', () => choose(i)); answers.append(button); });
  document.querySelector('#next').disabled = true;
}
function choose(choice) {
  if (locked) return; locked = true; const buttons = [...document.querySelectorAll('.answer')]; buttons.forEach(button => button.disabled = true);
  if (choice === questions[index].answer) { score++; buttons[choice].classList.add('correct'); document.querySelector('#feedback').textContent = 'Correct!'; }
  else { buttons[choice].classList.add('wrong'); buttons[questions[index].answer].classList.add('correct'); document.querySelector('#feedback').textContent = 'Not quite. The correct answer is highlighted.'; }
  document.querySelector('#next').disabled = false;
}
document.querySelector('#next').addEventListener('click', () => { index++; if (index < questions.length) render(); else { document.querySelector('#quiz').hidden = true; document.querySelector('#result').innerHTML = `<h2>Quiz complete!</h2><p>You scored <strong>${score} / ${questions.length}</strong>.</p><button id="restart">Try again</button>`; document.querySelector('#result').hidden = false; document.querySelector('#restart').addEventListener('click', () => { index = score = 0; document.querySelector('#quiz').hidden = false; document.querySelector('#result').hidden = true; render(); }); } });
render();
