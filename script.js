// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const playerNameInput = document.getElementById('player-name');
const startQuizButton = document.getElementById('start-quiz');
const playerNameDisplay = document.getElementById('player-name-display');
const scoreDisplay = document.getElementById('score-display');
const currentQuestionDisplay = document.getElementById('current-question');
const questionText = document.getElementById('question-text');
const optionsContainer = document.querySelector('.options-container');
const progressBar = document.querySelector('.progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');
const finalScore = document.getElementById('final-score');
const performanceMessage = document.getElementById('performance-message');
const playAgainButton = document.getElementById('play-again');

// Quiz state
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let playerName = '';

// Initialize quiz
function initializeQuiz() {
    currentQuestions = getRandomQuestions(10);
    currentQuestionIndex = 0;
    score = 0;
    updateProgress(0);
    displayQuestion();
}

// Update progress bar
function updateProgress(questionIndex) {
    const progress = (questionIndex / currentQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBarContainer.setAttribute('aria-valuenow', progress);
    
    // Add completion class for different color when complete
    if (progress === 100) {
        progressBar.classList.add('complete');
    } else {
        progressBar.classList.remove('complete');
    }
}

// Start quiz
startQuizButton.addEventListener('click', () => {
    playerName = playerNameInput.value.trim();
    if (playerName === '') {
        alert('Please enter your name to start the quiz!');
        playerNameInput.focus();
        return;
    }
    
    playerNameDisplay.textContent = `Player: ${playerName}`;
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    initializeQuiz();
});

// Handle keyboard navigation
playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startQuizButton.click();
    }
});

// Display current question
function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    currentQuestionDisplay.textContent = currentQuestionIndex + 1;
    updateProgress(currentQuestionIndex);
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create new option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.setAttribute('aria-label', `Option ${index + 1}: ${option}`);
        button.addEventListener('click', () => handleAnswer(index));
        optionsContainer.appendChild(button);
    });

    // Announce new question for screen readers
    const announcement = `Question ${currentQuestionIndex + 1} of 10: ${question.question}`;
    announceToScreenReader(announcement);
}

// Handle answer selection
function handleAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
        option.setAttribute('aria-disabled', 'true');
    });
    
    // Show correct/wrong answers
    const isCorrect = selectedIndex === question.correct;
    if (isCorrect) {
        options[selectedIndex].classList.add('correct');
        score += 10;
        announceToScreenReader('Correct answer! Plus 10 points.');
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
        score = Math.max(0, score - 2);
        announceToScreenReader('Incorrect answer. Minus 2 points.');
    }
    
    scoreDisplay.textContent = `Score: ${score}`;
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        updateProgress(currentQuestionIndex);
        if (currentQuestionIndex < currentQuestions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

// Show final results
function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    const finalScoreText = `Final Score: ${score}`;
    finalScore.textContent = finalScoreText;
    
    // Calculate performance message
    const maxScore = currentQuestions.length * 10;
    const percentage = (score / maxScore) * 100;
    
    let message = '';
    if (percentage >= 90) {
        message = "Outstanding! You're a tech genius! 🏆";
    } else if (percentage >= 70) {
        message = "Great job! You really know your tech! 🌟";
    } else if (percentage >= 50) {
        message = "Good effort! Keep learning! 📚";
    } else {
        message = "Keep practicing! Technology is always evolving! 💪";
    }
    
    performanceMessage.textContent = message;
    announceToScreenReader(`Quiz complete! ${finalScoreText}. ${message}`);
    playAgainButton.focus();
}

// Play again
playAgainButton.addEventListener('click', () => {
    resultScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    playerNameInput.value = '';
    scoreDisplay.textContent = 'Score: 0';
    playerNameInput.focus();
});

// Helper function for screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'visually-hidden');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}
