const questions = [
    {
        question: 'What is the first component to install in a PC case?',
        answers: [
            { text: 'A: The power supply', correct: false },
            { text: 'B: The motherboard', correct: true },
            { text: 'C: The graphics card', correct: false }
        ]
    },
    {
        question: 'Which component stores all your data?',
        answers: [
            { text: 'A: The RAM', correct: false },
            { text: 'B: The processor', correct: false },
            { text: 'C: The hard drive/SSD', correct: true }
        ]
    },
    {
        question: 'What is the function of a heat sink?',
        answers: [
            { text: 'A: To cool the processor', correct: true },
            { text: 'B: To store data', correct: false },
            { text: 'C: To supply power to components', correct: false }
        ]
    },
    {
        question: 'Which component is responsible for video output?',
        answers: [
            { text: 'A: The graphics card', correct: true },
            { text: 'B: The motherboard', correct: false },
            { text: 'C: The power supply', correct: false }
        ]
    },
    {
        question: 'Which component determines the overall speed of the system?',
        answers: [
            { text: 'A: The processor', correct: true },
            { text: 'B: The case', correct: false },
            { text: 'C: The power supply', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let moveAttempts = 0;

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const scoreDisplay = document.getElementById('score');
const messages = [
    "Are you sure?",
    "Are you 100% sure?",
    "If you select this one you can't change it.",
    "Think twice!",
    "Is this your final answer?",
    "Take a deep breath!",
    "Double check your answer!",
    "This is tricky!",
    "Last chance to change!",
    "Go ahead, if you're confident!"
];

document.addEventListener('DOMContentLoaded', startQuiz);

function startQuiz() {
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer, button) {
    if (currentQuestionIndex === questions.length - 2 && answer.correct && moveAttempts < 10) {
        moveButton(button);
        showMessage();
    } else {
        if (answer.correct) {
            score += 10;
        } else {
            score -= 5;
        }
        scoreDisplay.innerText = score;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showScore();
        }
    }
}

function moveButton(button) {
    const minDistance = 100; // Minimum distance from other buttons
    let newX, newY, validPosition;
    const maxAttempts = 50; // Maximum number of attempts to find a valid position
    let attempts = 0;

    do {
        validPosition = true;
        newX = Math.random() * 80 + 10; // Random position between 10% and 90% horizontally
        newY = Math.random() * 80 + 10; // Random position between 10% and 90% vertically

        // Check if the new position is too close to any existing button
        document.querySelectorAll('.btn').forEach(existingButton => {
            const rect = existingButton.getBoundingClientRect();
            const buttonX = rect.left + rect.width / 2;
            const buttonY = rect.top + rect.height / 2;

            const distance = Math.sqrt(Math.pow(buttonX - newX, 2) + Math.pow(buttonY - newY, 2));
            if (distance < minDistance) {
                validPosition = false;
            }
        });

        attempts++;
    } while (!validPosition && attempts < maxAttempts);

    if (validPosition) {
        button.style.position = 'absolute';
        button.style.left = `${newX}%`;
        button.style.top = `${newY}%`;
        moveAttempts++;
    } else {
        // If a valid position is not found, do not move the button to avoid infinite loop
        console.warn("Could not find a valid position for the button after multiple attempts.");
    }
}

function showMessage() {
    const message = document.createElement('div');
    message.classList.add('message');
    message.innerText = messages[moveAttempts - 1];
    document.body.appendChild(message);
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
        document.body.removeChild(message);
    }, 2000);
}

function showScore() {
    questionContainer.innerText = 'Quiz completed!';
    answerButtons.innerHTML = '';
    const finalScore = document.createElement('p');
    finalScore.innerText = `Your final score is ${score}`;
    questionContainer.appendChild(finalScore);
    if (moveAttempts >= 10) {
        const motivationalMessage = document.createElement('p');
        motivationalMessage.innerText = "Never give up! If you are trying to make your dreams come true, it doesn't matter how many times you try. If you don't give up, trust me, you are going to achieve it!";
        questionContainer.appendChild(motivationalMessage);
    }
}
