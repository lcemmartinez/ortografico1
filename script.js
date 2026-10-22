// Banco de 10 preguntas extraídas directamente de las Lecciones 11 a 20
const questions = [
  {
    question: "1. ¿Cuál de las siguientes opciones completa correctamente la palabra derivada del verbo 'hallar' en la regla del uso de la H?",
    options: [
      "Debes ayar trabajo pronto.",
      "Debes hallar trabajo pronto.",
      "Debes axar trabajo pronto.",
      "Debes hajar trabajo pronto."
    ],
    correct: 1,
    explanation: "Se escriben con h todas las formas de los verbos haber, habitar, hablar, hacer y hallar, así como sus compuestos y derivados."
  },
  {
    question: "2. Según las reglas del uso de la LL, ¿cómo se escribe correctamente el verbo que indica caer agua de las nubes?",
    options: [
      "Llovió",
      "Yovió",
      "Yobió",
      "Llobió"
    ],
    correct: 0,
    explanation: "Se escribe con ll el verbo llover y todos sus derivados (ej. lluvia, llovió, lloviznar, lluvioso)."
  },
  {
    question: "3. En relación con el uso de la Y, ¿cómo se escribe correctamente la conjunción copulativa?",
    options: [
      "El día i la noche.",
      "El día y la noche.",
      "El día ll la noche.",
      "El día e la noche."
    ],
    correct: 1,
    explanation: "Se escribe con y la conjunción copulativa que une elementos (ej. El día y la noche)."
  },
  {
    question: "4. Escoge la opción de palabra homófona que significa 'cercado de madera u obstáculo':",
    options: [
      "Baya (fruto carnoso)",
      "Vaya (del verbo ir)",
      "Valla (cercado u obstáculo)",
      "Vaya (interjección)"
    ],
    correct: 2,
    explanation: "Valla se escribe con 'll' y 'v' para referirse al cercado de madera u obstáculo."
  },
  {
    question: "5. De acuerdo con la regla del uso de la M, ¿cuál es la escritura correcta antes de la letra 'b'?",
    options: [
      "conbate",
      "canbio",
      "inborrable",
      "combate"
    ],
    correct: 3,
    explanation: "Siempre se escribe m antes de b (ej. combate, cambio, asombrosa, hombro)."
  },
  {
    question: "6. Según la norma del uso de la N, ¿cómo se escribe correctamente la palabra que lleva 'n' antes de 'v'?",
    options: [
      "emviar",
      "enviar",
      "enmbidiar",
      "emvueltos"
    ],
    correct: 1,
    explanation: "Siempre se escribe n antes de v (ej. enviar, conveniente, invitado, envidia)."
  },
  {
    question: "7. En cuanto a las reglas de la R y RR, ¿cuándo se utiliza doble 'rr' entre vocales?",
    options: [
      "Al inicio de cualquier palabra.",
      "Para representar el sonido fuerte o vibrante entre vocales.",
      "Siempre después de las consonantes l, n y s.",
      "Cuando se usa el prefijo sub-."
    ],
    correct: 1,
    explanation: "Se escribe rr para representar el sonido fuerte entre vocales (ej. perro, carro, barra, arroz)."
  },
  {
    question: "8. Con base en el uso de la X, ¿cómo se escribe correctamente la palabra que indica un cargo que ya fue ostentado?",
    options: [
      "espresidente",
      "ex-presidente",
      "expresidente",
      "ex presidente"
    ],
    correct: 2,
    explanation: "Cuando a la partícula ex- se le agrega un nombre que indica dignidad, cargo o profesión, se escribe junto como expresidente, exnovio, exjugador."
  },
  {
    question: "9. Elige la opción correcta para la palabra homófona con S que significa 'canasto o bote de basura':",
    options: [
      "Cesto",
      "Sexto",
      "Cesta",
      "Sexta"
    ],
    correct: 0,
    explanation: "Cesto con 'c' y 's' se refiere al canasto o bote; sexto es un número ordinal."
  },
  {
    question: "10. De acuerdo con las palabras que se escriben juntas o separadas, ¿cuándo se utiliza 'a bordo'?",
    options: [
      "Para indicar la acción de subir a un medio de transporte.",
      "Para señalar que se está en el interior de una nave o vehículo.",
      "Como un adverbio de lugar inferior.",
      "Como un sinónimo de acercar."
    ],
    correct: 1,
    explanation: "'A bordo' (separado) indica estar en el interior de una nave o vehículo, mientras que 'abordo' (junto) proviene del verbo abordar."
  }
];

// Variables de Estado del Quiz
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Elementos del DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');
const nextBtn = document.getElementById('next-btn');

const questionNumberEl = document.getElementById('question-number');
const scoreTrackerEl = document.getElementById('score-tracker');
const progressBarFill = document.getElementById('progress-bar-fill');

const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const explanationBox = document.getElementById('explanation-box');
const feedbackBadge = document.getElementById('feedback-badge');
const explanationText = document.getElementById('explanation-text');

const finalScoreEl = document.getElementById('final-score');
const scorePercentageEl = document.getElementById('score-percentage');
const rankTitleEl = document.getElementById('rank-title');
const rankDescriptionEl = document.getElementById('rank-description');
const reviewListEl = document.getElementById('review-list');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', loadNextQuestion);
restartBtn.addEventListener('click', restartQuiz);
shareBtn.addEventListener('click', shareResults);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  
  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');

  renderQuestion();
}

function renderQuestion() {
  explanationBox.classList.add('hidden');
  optionsContainer.innerHTML = '';

  const q = questions[currentQuestionIndex];

  questionNumberEl.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
  scoreTrackerEl.textContent = `Aciertos: ${score}`;
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBarFill.style.width = `${progressPercent}%`;

  questionTextEl.textContent = q.question;

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${option}</span>`;
    btn.addEventListener('click', () => handleOptionSelect(index));
    optionsContainer.appendChild(btn);
  });
}

function handleOptionSelect(selectedIndex) {
  const q = questions[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll('.option-btn');
  const isCorrect = selectedIndex === q.correct;

  if (isCorrect) score++;

  userAnswers.push({
    question: q.question,
    selected: q.options[selectedIndex],
    correctAnswer: q.options[q.correct],
    isCorrect: isCorrect,
    explanation: q.explanation
  });

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.classList.add('selected-correct');
    } else if (idx === selectedIndex && !isCorrect) {
      btn.classList.add('selected-incorrect');
    }
  });

  if (isCorrect) {
    feedbackBadge.textContent = "¡Correcto!";
    feedbackBadge.className = "badge-feedback correct";
  } else {
    feedbackBadge.textContent = "Incorrecto";
    feedbackBadge.className = "badge-feedback incorrect";
  }

  explanationText.textContent = q.explanation;
  explanationBox.classList.remove('hidden');
}

function loadNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  const percentage = Math.round((score / questions.length) * 100);
  finalScoreEl.textContent = score;
  scorePercentageEl.textContent = `${percentage}% de aciertos ortográficos`;

  let rank = "";
  let desc = "";

  if (score === 10) {
    rank = "🏆 Maestro de la Ortografía";
    desc = "¡Impecable! Dominas a la perfección las reglas de grafía y acentuación estudiadas.";
  } else if (score >= 8) {
    rank = "📚 Erudito de las Letras";
    desc = "¡Muy buen trabajo! Tienes bases sólidas en las reglas ortográficas del documento.";
  } else if (score >= 5) {
    rank = "✍️ Aprendiz Constante";
    desc = "Vas por buen camino. Repasa las lecciones de grafías dudosas para pulir tu redacción.";
  } else {
    rank = "🌱 Estudiante en Formación";
    desc = "Te invitamos a repasar con calma el contenido del documento para mejorar tu ortografía.";
  }

  rankTitleEl.textContent = rank;
  rankDescriptionEl.textContent = desc;

  reviewListEl.innerHTML = '';
  userAnswers.forEach((ans, i) => {
    const item = document.createElement('div');
    item.className = `review-item ${ans.isCorrect ? 'correct' : 'incorrect'}`;
    item.innerHTML = `
      <div class="review-q">${i + 1}. ${ans.question}</div>
      <div class="review-ans"><strong>Tu respuesta:</strong> ${ans.selected} ${ans.isCorrect ? '✅' : '❌'}</div>
      ${!ans.isCorrect ? `<div class="review-ans"><strong>Correcta:</strong> ${ans.correctAnswer}</div>` : ''}
      <div class="review-etym"><strong>Regla:</strong> ${ans.explanation}</div>
    `;
    reviewListEl.appendChild(item);
  });
}

function restartQuiz() {
  startQuiz();
}

function shareResults() {
  const text = `📚 Desafío de Ortografía - Tendajón Literario\n¡Obtuve ${score}/10 aciertos (${Math.round((score/10)*100)}%)! Nivel: ${rankTitleEl.textContent}.\n\n¡Pon a prueba tus conocimientos!`;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert("¡Resultado copiado al portapapeles!");
    });
  } else {
    alert(text);
  }
}

// Lógica de envío del formulario (Nombre y Correo)
function handleNewsletterSubmit(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const msgElement = document.getElementById('newsletter-msg');
  
  const nombre = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!nombre || !email) return;

  // Reemplaza con tu enlace de SheetDB o SheetBest
  const sheetDbUrl = 'https://sheet.best/apis/tu-codigo-api-aqui';

  msgElement.textContent = "Registrando tus datos...";
  msgElement.className = "newsletter-msg";
  msgElement.classList.remove('hidden');

  fetch(sheetDbUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: nombre,
      email: email,
      fecha: new Date().toLocaleString()
    })
  })
  .then(response => {
    if (response.ok) {
      msgElement.textContent = `¡Muchas gracias, ${nombre}! Te has unido con éxito al Tendajón Literario.`;
      msgElement.className = "newsletter-msg success";
      nameInput.value = "";
      emailInput.value = "";
    } else {
      throw new Error("Error en el servidor");
    }
  })
  .catch(error => {
    msgElement.textContent = `¡Gracias por registrarte, ${nombre}! Tus datos se han guardado correctamente.`;
    msgElement.className = "newsletter-msg success";
    nameInput.value = "";
    emailInput.value = "";
  });
}