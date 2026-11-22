// Background Music
const backgroundMusic = document.getElementById("backgroundMusic");

const clickSound = new Audio("music/menu-select-fx.mp3");
clickSound.volume = 0.5;

// Card appearance sound
const cardAppearSound = new Audio("music/card-appear.mp3");
cardAppearSound.volume = 1;

// Play card appearance sound
function playCardAppearSound() {

    const sound = cardAppearSound.cloneNode();

    sound.volume = 0.35;
    sound.play();

}

// Second Background Music (Gameplay)
const gameMusic = new Audio("music/background-sec-song.mp3");

gameMusic.loop = true;
gameMusic.volume = 0.5;

clickSound.volume = 0.5;

function playClickSound() {

    clickSound.pause();
    clickSound.currentTime = 0;

    clickSound.play().catch(error => {
        console.log("Click sound error:", error);
    });

}

// Master Volume
let masterVolume = 0.5;

// Apply volume to both songs
backgroundMusic.volume = masterVolume;
gameMusic.volume = masterVolume;

// Error Sound
const errorSound = new Audio("music/error-card.mp3");
errorSound.volume = 0.3;

// Meow Sounds
const meowSounds = [
    new Audio("music/meow-effect (1).mp3"),
    new Audio("music/meow-effect (2).mp3")
];

// Meow volume
meowSounds.forEach(sound => {
    sound.volume = 0.5;
});

// Start button
const startButton = document.querySelector(".start-button");

// Restart and Next Level Buttons
const restartButton = document.getElementById("restartButton");
const nextLevelButton = document.getElementById("nextLevelButton");

// Restart Button
restartButton.addEventListener("click", () => {

    playClickSound();

    // Reset score and moves
    score = 0;
    moves = 0;
    matchedPairs = 0;

    scoreDisplay.textContent = score;
    movesDisplay.textContent = moves;
    totalScoreDisplay.textContent = 0;

    // Reset lives
    lives = 9;
    updateLivesDisplay();

    // Shuffle cards
    cardValues.sort(() => Math.random() - 0.5);

    // Flip all cards down first
    cards.forEach(card => {
    card.classList.remove("matched");
    card.classList.add("flipped");
    });

    // Wait for the flip animation
    setTimeout(() => {

    // Shuffle cards
    cardValues.sort(() => Math.random() - 0.5);

    // Update card values
    cards.forEach((card, index) => {

        updateCardPicture(card, cardValues[index]);

        card.classList.remove("flipped");

    });

    resetCards();

    }, 600);

    // Reset selected cards
    resetCards();

    // Show cards again
    gameContainer.classList.add("show-cards");

});

// Next Level Button Sound
nextLevelButton.addEventListener("click", () => {

    playClickSound();

    if (!levelCompleted) return;

    if (currentLevel === maxLevel) {
        alert("CONGRATULATIONS! YOU COMPLETED ALL 5 LEVELS!");
        nextLevelButton.disabled = true;
        nextLevelButton.textContent = "COMPLETED";
        return;
    }

    // Go to next level
    currentLevel++;
    levelDisplay.textContent = "LEVEL " + currentLevel;

    // Reset level status
    levelCompleted = false;
    nextLevelButton.disabled = true;

    // Reset score, moves, and lives
    score = 0;
    scoreDisplay.textContent = 0;
    totalScoreDisplay.textContent = 0;

    moves = 0;
    movesDisplay.textContent = moves;

    matchedPairs = 0;
    lives = 9;
    updateLivesDisplay();

    // Shuffle cards
    cardValues.sort(() => Math.random() - 0.5);

    // Reset every card
    cards.forEach((card, index) => {
        card.classList.remove("flipped", "matched");

        updateCardPicture(card, cardValues[index]);
    });

    resetCards();

});

// Screen transition
const screenTransition = document.getElementById("screenTransition");

// Game container
const gameContainer = document.querySelector(".game-container");

// Start the game
startButton.addEventListener("click", () => {

    playClickSound();

    startButton.disabled = true;

     // Stop menu music
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    // Play second background music
    gameMusic.currentTime = 0;
    gameMusic.play().catch(error => {
        console.log("Game music error:", error);
    });

    // Fade the entire screen to black
    screenTransition.classList.add("active");

    // Wait until the black screen transition finishes
    screenTransition.addEventListener("transitionend", function fadeFinished(event) {

        if (event.propertyName !== "opacity") return;

        screenTransition.removeEventListener("transitionend", fadeFinished);

        // Switch to the game screen
        document.body.classList.add("game-started");

        // Fade away the black screen
        screenTransition.classList.remove("active");

        // Wait until the screen is completely visible
        screenTransition.addEventListener("transitionend", function screenVisible(event) {

            if (event.propertyName !== "opacity") return;

            screenTransition.removeEventListener("transitionend", screenVisible);

            // Wait another 2 seconds before showing the cards
            setTimeout(() => {

                gameContainer.classList.add("show-cards");

                // Match sound timing with CSS animation delays
                const cardSoundDelays = [
                    0.00,
                    0.18,
                    0.06,
                    0.24,
                    0.12,
                    0.30,
                    0.03,
                    0.21,
                    0.09,
                    0.05,
                    0.27,
                    0.09
            ];

            // Play sound when each card appears
                cardSoundDelays.forEach((delay) => {

                    setTimeout(() => {
                    playCardAppearSound();
            }, delay * 1000);

});

            }, 250);

        });

    });

});

// Play music when the page opens
backgroundMusic.volume = 0.5;

backgroundMusic.play().catch(() => {
    // Browser may require the player to interact first
    document.addEventListener("click", function startMusic() {
        backgroundMusic.play();
    }, { once: true });
});

// Settings elements
const settingsToggle = document.getElementById("settingsToggle");
const settingsMenu = document.getElementById("settingsMenu");
const settingsClose = document.getElementById("settingsClose");

const volumeSlider = document.querySelector(".volume-slider");
const volumeValue = document.querySelector(".volume-value");

const volumeMinus = document.querySelector(".volume-minus");
const volumePlus = document.querySelector(".volume-plus");

// Open settings
settingsToggle.addEventListener("click", () => {
    playClickSound();
    settingsMenu.classList.toggle("active");
});

// Close settings
settingsClose.addEventListener("click", () => {
    playClickSound();
    settingsMenu.classList.remove("active");
});

// Update volume
function updateVolume() {
    backgroundMusic.volume = volumeSlider.value / 100;
    volumeValue.textContent = volumeSlider.value + "%";
}

volumeSlider.addEventListener("input", function() {

    masterVolume = volumeSlider.value / 100;

    backgroundMusic.volume = masterVolume;
    gameMusic.volume = masterVolume;

});

// Decrease volume
volumeMinus.addEventListener("click", () => {
    playClickSound();
    volumeSlider.value = Math.max(0, Number(volumeSlider.value) - 10);
    updateVolume();
});

// Increase volume
volumePlus.addEventListener("click", () => {
    playClickSound();
    volumeSlider.value = Math.min(100, Number(volumeSlider.value) + 10);
    updateVolume();
});

// Click particle effects
document.addEventListener("click", function (event) {

    const colors = [
        "#f9c462",
        "#ff8fab",
        "#cc94ed",
        "#609dff",
        "#6af879"
    ];

    for (let i = 0; i < 24; i++) {

        const particle = document.createElement("span");
        particle.classList.add("click-particle");

        particle.style.left = event.clientX + "px";
        particle.style.top = event.clientY + "px";

        particle.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        const angle = (Math.PI * 2 * i) / 12;
        const distance = 60;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.setProperty("--x", x + "px");
        particle.style.setProperty("--y", y + "px");

        document.body.appendChild(particle);

        setTimeout(function () {
            particle.remove();
        }, 600);
    }

});

// How to Play Screen
const howToPlayButton = document.getElementById("howToPlayButton");
const howToPlayScreen = document.getElementById("howToPlayScreen");
const backButton = document.getElementById("backButton");

// Open How to Play
howToPlayButton.addEventListener("click", function() {
    playClickSound();

    document.body.classList.add("how-to-play-open");

    howToPlayScreen.classList.add("active");

});

// Back to Main Menu
backButton.addEventListener("click", function() {
    playClickSound();

    document.body.classList.remove("how-to-play-open");

    howToPlayScreen.classList.remove("active");

});


// Game Back Button
const gameBackButton = document.getElementById("gameBackButton");

gameBackButton.addEventListener("click", function() {

    playClickSound();

    // Fade the screen to black
    screenTransition.classList.add("active");

    screenTransition.addEventListener("transitionend", function backFinished(event) {

        if (event.propertyName !== "opacity") return;

        screenTransition.removeEventListener("transitionend", backFinished);

        // Return to the main menu
        document.body.classList.remove("game-started");

        // Hide the game cards
        gameContainer.classList.remove("show-cards");

        // Reset the START button
        startButton.disabled = false;

        // Stop gameplay music
        gameMusic.pause();
        gameMusic.currentTime = 0;

        // Play main menu music
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(error => {
            console.log("Menu music error:", error);
        });

        // Fade away the black screen
        screenTransition.classList.remove("active");

    });

});


// CARD FLIP FUNCTIONALITY
const cards = document.querySelectorAll(".card");

// CARD PICTURES
const cardImages = {
    cat1: "images/crystalball-card.png",
    cat2: "images/magicpot-card.png",
    cat3: "images/potion-card.webp",
    cat4: "images/spellbook-card.png",
    cat5: "images/staff-card.png",
    cat6: "images/wizardcat-card.png"
};

// Duplicate each picture to create matching pairs
const symbols = Object.keys(cardImages);
let cardValues = [...symbols, ...symbols];

// Shuffle cards
cardValues.sort(() => Math.random() - 0.5);

// Display the card picture
function updateCardPicture(card, value) {
    card.dataset.value = value;

    const front = card.querySelector(".card-front");

    front.style.display = "flex";
    front.style.justifyContent = "center";
    front.style.alignItems = "center";
    front.style.overflow = "hidden";

    front.innerHTML = `
        <img src="${cardImages[value]}" alt="${value}">
    `;

    const image = front.querySelector("img");

    // Default image size
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.objectFit = "fill";
    image.style.display = "block";

    // Keep the image inside the rounded card edges
    const cardFront = card.querySelector(".card-front");

    cardFront.style.overflow = "hidden";
    cardFront.style.borderRadius = "10px";  

    image.style.borderRadius = "10px";

    // Individual card picture sizes
    if (value === "crystalball") {
        image.style.width = "80%";
        image.style.height = "80%";
        image.style.objectFit = "contain";
    }

    else if (value === "magicpot") {
        image.style.width = "100%";
        image.style.height = "100%";
    }

    else if (value === "potion") {
        image.style.width = "95%";
        image.style.height = "95%";
    }

    else if (value === "spellbook") {
        image.style.width = "100%";
        image.style.height = "100%";
    }

    else if (value === "staff") {
        image.style.width = "100%";
        image.style.height = "100%";
    }

    else if (value === "wizardcat") {
        image.style.width = "100%";
        image.style.height = "100%";
    }
}

let currentLevel = 1;
const maxLevel = 5;

const levelDisplay = document.getElementById("levelDisplay");

let levelCompleted = false;

nextLevelButton.disabled = true;

// Shuffle cards
cardValues.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let lives = 9;


// PIXEL HEARTS
const livesDisplay = document.createElement("div");
livesDisplay.classList.add("lives-display");

document.querySelector(".scoreboard-art").appendChild(livesDisplay);

// Display remaining hearts
function updateLivesDisplay() {
    livesDisplay.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        const heart = document.createElement("span");

        heart.classList.add("pixel-heart");

        if (i >= lives) {
            heart.classList.add("lost");
        }

        heart.textContent = "♥";
        livesDisplay.appendChild(heart);
    }
}

updateLivesDisplay();

// SCOREBOARD
let score = 0;
const scoreDisplay = document.getElementById("score");
const totalScoreDisplay = document.getElementById("totalScore");

let moves = 0;
const movesDisplay = document.getElementById("moves");

function updateScore(points) {
    score += points;
    scoreDisplay.textContent = score;
}


// Prepare cards
cards.forEach((card, index) => {

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back"></div>
        </div>
    `;

    updateCardPicture(card, cardValues[index]);

    card.addEventListener("click", () => {

        // Prevent invalid clicks
        if (
            lockBoard ||
            card.classList.contains("matched")
        ) {
            return;
        }

        playClickSound();

        // Click the same card again to flip it down
        if (card === firstCard) {

            card.classList.remove("flipped");

            moves++;
            movesDisplay.textContent = moves;

            firstCard = null;

            return;
        }

        // Flip card face-up
        card.classList.add("flipped");

        // Select first card
        if (!firstCard) {

            firstCard = card;
            return;

        }

        // Select second card
        secondCard = card;

        moves++;
        movesDisplay.textContent = moves;

        lockBoard = true;

        // Check if cards match
        if (firstCard.dataset.value === secondCard.dataset.value) {

            // Play a random meow sound
            const randomMeow = meowSounds[
                Math.floor(Math.random() * meowSounds.length)
            ];

            randomMeow.currentTime = 0;
            randomMeow.play().catch(error => {
                console.log("Meow sound error:", error);
            });

            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            matchedPairs++;

            updateScore(10);

            // Reset selected cards
            resetCards();

    if (matchedPairs === 6) {

    lockBoard = true;

    setTimeout(() => {

        if (moves <= 10) {
            updateScore(10);
        } else {
            updateScore(-10);
        }

        totalScoreDisplay.textContent = score;

        levelCompleted = true;
        nextLevelButton.disabled = false;

    }, 500);

        }

        } else {

            lives--;
            updateLivesDisplay();

            // Wrong pair
            updateScore(-2);

            // Play error sound
            errorSound.currentTime = 0;
            errorSound.play().catch(error => {
                console.log("Error sound error:", error);
            });

            const card1 = firstCard;
            const card2 = secondCard;

            setTimeout(() => {

                // Flip both cards face-down
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");


                if (lives <= 0) {
                 alert("GAME OVER! You ran out of lives.");
                
                 lives = 9;
                updateLivesDisplay();

                resetCards();
                return;
            }

                resetCards();

            }, 1000);

        }

    });

});


// Reset selected cards
function resetCards() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;

}



