// Load the sounds for correct and incorrect answers
const correctSound = new Audio('assets/correct.mp3');
const incorrectSound = new Audio('assets/incorrect.mp3');

// Quiz categories with fun and engaging questions
const categories = {
    1: [ // Fun Facts
        { text: "Which animal cannot jump?", options: ["Elephant", "Giraffe", "Kangaroo", "Frog"], correct: 0 },
        { text: "What is the only fruit that has seeds on the outside?", options: ["Strawberry", "Pineapple", "Banana", "Orange"], correct: 0 },
        { text: "What is the rarest M&M color?", options: ["Red", "Blue", "Brown", "Green"], correct: 2 },
        { text: "What’s the longest word in the dictionary?", options: ["Pneumonoultramicroscopicsilicovolcanoconiosis", "Supercalifragilisticexpialidocious", "Uncopyrightable", "Floccinaucinihilipilification"], correct: 0 }
    ],
    2: [ // Pop Culture & Brain Teasers
        { text: "What is the first color of the rainbow?", options: ["Red", "Orange", "Yellow", "Green"], correct: 0 },
        { text: "Who won the first season of 'American Idol'?", options: ["Kelly Clarkson", "Justin Guarini", "Fantasia Barrino", "Carrie Underwood"], correct: 0 },
        { text: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Brisbane", "Canberra"], correct: 3 },
        { text: "Which animal is known for its long neck?", options: ["Giraffe", "Zebra", "Elephant", "Tiger"], correct: 0 }
    ]
};

let selectedCategory = null;
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;  // 10 seconds for each question

// Function to start the quiz with a selected category
function selectCategory(categoryNum) {
    selectedCategory = categoryNum;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    displayQuestion();
}

// Function to display the current question
function displayQuestion() {
    clearInterval(timer); // Clear any existing timer
    const questionData = categories[selectedCategory][currentQuestionIndex];

    if (!questionData) {
        console.error("No question data found.");
        return;
    }

    document.getElementById("question").textContent = `Question ${currentQuestionIndex + 1}: ${questionData.text}`;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = ""; // Clear previous options
    questionData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });

    startTimer(); // Start the timer for the new question
}

// Function to start the countdown timer
function startTimer() {
    timeLeft = 10;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1);  // -1 indicates that the time is up and no answer was selected
        }
    }, 1000);
}

// Function to check the user's answer
function checkAnswer(selectedOption) {
    clearInterval(timer);  // Stop the timer when an answer is selected or time runs out
    const questionData = categories[selectedCategory][currentQuestionIndex];

    const optionsDiv = document.getElementById("options");
    const buttons = optionsDiv.getElementsByTagName("button");

    // Check if the answer is correct or incorrect
    if (selectedOption === questionData.correct) {
        buttons[selectedOption].classList.add("correct");
        correctSound.play();
        alert("🎉 Correct!");
        score++;
    } else if (selectedOption === -1) {
        // Time's up, shake screen
        document.getElementById("quiz-screen").classList.add("time-up");
        alert(`❌ Time's up! The correct answer is: ${questionData.options[questionData.correct]}`);
        buttons[questionData.correct].classList.add("correct");
    } else {
        buttons[selectedOption].classList.add("incorrect");
        incorrectSound.play();
        alert(`❌ Wrong! The correct answer is: ${questionData.options[questionData.correct]}`);
    }

    // Disable all buttons after selecting or timing out
    for (let button of buttons) {
        button.disabled = true;
    }

    // Move to the next question or end the game
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < categories[selectedCategory].length) {
            displayQuestion();
            document.getElementById("quiz-screen").classList.remove("time-up"); // Reset the animation
        } else {
            endGame();
        }
    }, 1000); // Wait 1 second before displaying next question
}

// Function to end the game
function endGame() {
    clearInterval(timer); // Clear the timer
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    document.getElementById("final-score").textContent = `${score} / ${categories[selectedCategory].length}`;

    
    addConfetti();
}

// Function to restart the game
function restartGame() {
    document.getElementById("end-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
}

  // Optional: Confetti effect
//function addConfetti() {
    //const confettiContainer = document.createElement("div");
    //confettiContainer.id = "confetti";
    //document.body.appendChild(confettiContainer);
    // Add confetti animation (you can use a library like canvas-confetti)
    // Example: https://www.kirilv.com/canvas-confetti/ #"i used deepseek to find out about sounds" 
    //setTimeout(() => {
        //confettiContainer.remove();
    //}, 5000); // Remove confetti after 5 second