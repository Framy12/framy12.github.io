const questions = [
    {
       question: "What is the first component you need to install when building a PC?",
        answers: [
            { text: "Motherboard", correct: true },
            { text: "Power Supply", correct: false },
            { text: "Processor", correct: false }
        ]
    },
    {
        question: "What component stores your data permanently?",
        answers: [
            { text: "SSD", correct: true },
            { text: "RAM", correct: false },
            { text: "Power Supply", correct: false }
        ]
    },
    {
         question: "What do you use to type on a computer?",
        answers: [
            { text: "Mouse", correct: false },
            { text: "Keyboard", correct: true },
            { text: "Printer", correct: false }
        ]
    },
    {
        question: "Which component supplies power to all other components?",
        answers: [
            { text: "Power Supply", correct: true },
            { text: "Motherboard", correct: false },
            { text: "CPU", correct: false }
        ]
    },
    {
        question: "What component is considered the 'brain' of the computer?",
        answers: [
            { text: "CPU", correct: true },
            { text: "RAM", correct: false },
            { text: "Hard Drive", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizEnded = false;

document.addEventListener("DOMContentLoaded", () => {
    showQuestion();
});

function showQuestion() {
    clearQuestion();
    const questionData = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    questionElement.textContent = questionData.question;

    const answersElement = document.getElementById("answers");
    questionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = `${String.fromCharCode(65 + index)}. ${answer.text}`;
        button.classList.add("button");
        button.onclick = () => selectAnswer(answer, button);
        answersElement.appendChild(button);
    });
}

function clearQuestion() {
    const questionElement = document.getElementById("question");
    questionElement.textContent = "";

    const answersElement = document.getElementById("answers");
    answersElement.innerHTML = "";
}

function selectAnswer(answer, button) {
    if (quizEnded) return;

    if (answer.correct) {
        score += 10;
        button.classList.add("correct-answer");
        document.getElementById("score").textContent = score;

        if (currentQuestionIndex === questions.length - 1) {
            setTimeout(setupTrickButton, 300);
        } else {
            setTimeout(nextQuestion, 300); // Reducido a 300ms para una transición más rápida
        }
    } else {
        score -= 5;
        document.getElementById("score").textContent = score;
        setTimeout(nextQuestion, 300);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalMessage();
    }
}

function setupTrickButton() {
    const answersElement = document.getElementById("answers");
    const correctButton = Array.from(answersElement.children).find(button => button.textContent.includes("CPU")); // Asumiendo que CPU es la respuesta correcta para la última pregunta
    correctButton.classList.add("moving-button");
    let clickCount = 0;

    correctButton.onclick = () => {
        if (clickCount < 10) {
            moveButton(correctButton);
            showWarningMessage(clickCount);
            clickCount++;
        } else {
            correctButton.classList.remove("moving-button");
            score += 10;
            document.getElementById("score").textContent = score;
            showMotivationalMessage();
            quizEnded = true; // Marcar el quiz como terminado
            clearQuestion(); // Limpiar las respuestas
            showFinalImage(); // Mostrar la imagen final basada en el puntaje
        }
    };
}

function moveButton(button) {
    const container = document.querySelector(".quiz-container");
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const maxLeft = containerRect.width - buttonRect.width;
    const maxTop = containerRect.height - buttonRect.height;

    let newLeft, newTop;
    do {
        newLeft = Math.random() * maxLeft;
        newTop = Math.random() * maxTop;
    } while (Math.abs(newLeft - buttonRect.left) < 50 && Math.abs(newTop - buttonRect.top) < 50);

    button.style.left = `${newLeft}px`;
    button.style.top = `${newTop}px`;
}

function showWarningMessage(clickCount) {
    const messages = [
        "Are you sure?",
        "Are you 100% sure?",
        "If you select this one you can't change it.",
        "Really?",
        "Think twice!",
        "This is your last chance!",
        "Don't give up!",
        "Keep going!",
        "Almost there!",
        "Final try!"
    ];
    const message = messages[clickCount];
    const questionContainer = document.getElementById("question-container");
    clearWarningMessages();
    const warningMessage = document.createElement("div");
    warningMessage.textContent = message;
    warningMessage.classList.add("message");
    questionContainer.appendChild(warningMessage);
}

function clearWarningMessages() {
    const questionContainer = document.getElementById("question-container");
    const existingMessages = questionContainer.getElementsByClassName("message");
    while (existingMessages[0]) {
        existingMessages[0].parentNode.removeChild(existingMessages[0]);
    }
}

function showMotivationalMessage() {
    const questionContainer = document.getElementById("question-container");
    clearWarningMessages();
    const motivationalMessage = document.createElement("div");
    motivationalMessage.textContent = "Never give up! If you are trying to make your dreams come true, it doesn't matter how many times you try. If you don't give up, trust me, you are going to get it!";
    motivationalMessage.classList.add("motivational-message");
    questionContainer.appendChild(motivationalMessage);
}

function showFinalImage() {
    const finalImageContainer = document.getElementById("final-image-container");
    const finalImage = document.createElement("img");

    if (score >= 60) {
        finalImage.src = "images/winner.png"; // Imagen para puntaje alto
    } else if (score >= 30) {
        finalImage.src = "images/goodjob.png"; // Imagen para puntaje medio
    } else {
        finalImage.src = "images/tryagain.png"; // Imagen para puntaje bajo
    }

    finalImageContainer.appendChild(finalImage);
}

function showFinalMessage() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `<h2>Your final score is ${score}!</h2>`;
    showFinalImage();
}
