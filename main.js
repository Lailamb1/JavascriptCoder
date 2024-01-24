fetch('preguntas.json')
.then(response => response.json())
.then(data => {

    questions = data;
    loadQuestion();
})
.catch(error => console.error('Error al cargar las preguntas', error));

let currentQuestion = 0;
let score = 0;
let gameHistory = [];

const questionElem = document.getElementById('question');
const optionsElem = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultElem = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');
const historialDiv = document.getElementById('historial');
const historialList = document.getElementById('historial-list');
const verHistorialBtn = document.getElementById('ver-historial-btn');

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
        saveGameHistory(); 
        updateHistorial(); 
    }
}

function showFinalScore() {
    questionElem.textContent = '¡Fin del juego!';
    optionsElem.innerHTML = '';
    resultElem.textContent = `Puntuación final: ${score} de ${questions.length}`;
    resultElem.classList.add('final-score');
    nextButton.classList.add('hidden');
    showRestartButton();
}

function showRestartButton() {
    restartButton.classList.remove('hidden');
    verHistorialBtn.classList.remove('hidden');
    restartButton.addEventListener("click", restartGame);
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    resultElem.textContent = '';
    restartButton.classList.add('hidden');
    historialDiv.classList.add('hidden');
}

function saveGameHistory() {
    const gameResult = {
        score: score,
        totalQuestions: questions.length,
        date: new Date().toLocaleString()
    };
    gameHistory.push(gameResult);
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

function updateHistorial() {
    historialList.innerHTML = '';

    gameHistory.forEach(result => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Puntuación:</strong> ${result.score}/${result.totalQuestions},<strong>Fecha:</strong> ${result.date}`;
        historialList.appendChild(listItem);
    });
}

verHistorialBtn.addEventListener('click', () => {
    historialDiv.classList.toggle('hidden');
});

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartGame);

if (localStorage.getItem('gameHistory')) {
    gameHistory = JSON.parse(localStorage.getItem('gameHistory'));
}

loadQuestion();
