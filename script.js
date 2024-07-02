const questions = [
    {
        question: "What component is essential for processing data in a PC?",
        answers: [
            { text: "CPU", correct: true },
            { text: "GPU", correct: false },
            { text: "RAM", correct: false }
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
        question: "Which component is responsible for rendering graphics?",
        answers: [
            { text: "GPU", correct: true },
            { text: "CPU", correct: false },
            { text: "Motherboard", correct: false }
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
    if (answer.correct) {
        score += 10;
        button.classList.add("correct-answer");
    } else {
        score -= 5;
    }

    document.getElementById("score").textContent = score;

    setTimeout(() => {
        if (currentQuestionIndex === questions.length - 1 && answer.correct) {
            setupTrickButton();
        } else {
            nextQuestion();
        }
    }, 500);
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
    const correctButton = Array.from(answersElement.children).find(button => button.textContent.includes("CPU")); // Assuming CPU is the correct answer for the last question
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
            setTimeout(showFinalMessage, 2000);
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
    const warningMessage = document.createElement("div");
    warningMessage.textContent = message;
    warningMessage.classList.add("message");
    questionContainer.appendChild(warningMessage);
    setTimeout(() => questionContainer.removeChild(warningMessage), 1000);
}

function showMotivationalMessage() {
    const questionContainer = document.getElementById("question-container");
    const motivationalMessage = document.createElement("div");
    motivationalMessage.textContent = "Never give up! If you are trying to make your dreams come true, it doesn't matter how many times you try. If you don't give up, trust me, you are going to get it!";
    motivationalMessage.classList.add("message");
    questionContainer.appendChild(motivationalMessage);
}

function showFinalMessage() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "<p>Congratulations! You've completed the quiz.</p>";
}
