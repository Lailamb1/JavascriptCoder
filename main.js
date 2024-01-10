const questions = [
    {
        question: "¿Cuál es la capital de Francia?",
        options: ["Madrid", "París", "Londres", "Roma"],
        answer: "París"
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        options: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
        answer: "Amazonas"
    },
    {
        question: "¿En qué año llegó el hombre a la Luna?",
        options: ["1969", "1972", "1965", "1970"],
        answer: "1969"
    }
    // Agrega más preguntas siguiendo el mismo formato
];

let currentQuestion = 0;
let score = 0;

const questionElem = document.getElementById('question');
const optionsElem = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultElem = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

function loadQuestion() {
    const q = questions[currentQuestion];
    questionElem.textContent = q.question;
    optionsElem.innerHTML = '';

    q.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.onclick = function() {
            checkAnswer(option);
        };
        optionsElem.appendChild(optionButton);
    });
}

function checkAnswer(option) {
    const q = questions[currentQuestion];
    if (option === q.answer) {
        score++;
        resultElem.textContent = '¡Respuesta correcta!🎉🥳';
        resultElem.classList.add('correct-answer');
    } else {
        resultElem.textContent = `Respuesta incorrecta. La respuesta correcta era: ${q.answer}`;
    }
    nextButton.classList.remove('hidden');
    document.querySelectorAll('#options button').forEach(btn => {
        btn.disabled = true;
    });
}

function nextQuestion() {
    currentQuestion++;
    resultElem.textContent = '';
    if (currentQuestion < questions.length) {
        loadQuestion();
        nextButton.classList.add('hidden');
        document.querySelectorAll('#options button').forEach(btn => {
            btn.disabled = false;
        });
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    questionElem.textContent = '¡Fin del juego!';
    optionsElem.innerHTML = '';
    resultElem.textContent = `Puntuación final: ${score} de ${questions.length}`;
    nextButton.classList.add('hidden');
    showRestartButton();
}

function showRestartButton() {
    restartButton.classList.remove('hidden');
    restartButton.addEventListener("click", restartGame);
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    resultElem.textContent = '';
    restartButton.classList.add('hidden');
}

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartGame);

loadQuestion();