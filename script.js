// Background Music
const backgroundMusic = document.getElementById("backgroundMusic");

const clickSound = new Audio("music/menu-select-fx.mp3");

// Second Background Music (Gameplay)
const gameMusic = new Audio("music/background-sec-song.mp3");

gameMusic.loop = true;
gameMusic.volume = 0.5;

clickSound.volume = 1;

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


// Start button
const startButton = document.querySelector(".start-button");

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

const symbols = ["🌙", "⭐", "🔮", "🧙", "🐈", "✨"];
let cardValues = [...symbols, ...symbols];

// Shuffle cards
cardValues.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// SCOREBOARD
let score = 0;
const scoreDisplay = document.getElementById("score");

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
            <div class="card-front">
                ${cardValues[index]}
            </div>
            <div class="card-back"></div>
        </div>
    `;

    card.dataset.value = cardValues[index];

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

            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            matchedPairs++;

            updateScore(10);

            // Reset selected cards
            resetCards();

            // Check if all pairs are matched
            if (matchedPairs === 6) {

                lockBoard = true;

                setTimeout(() => {

                    if (moves <= 10) {
                        updateScore(10);
                    } else {
                        updateScore(-10);
                    }

                    alert(
                        "YOU FOUND ALL THE PAIRS! ✨\n" +
                        "Total Moves: " + moves + "\n" +
                        "Final Score: " + score
                    );

                    // Reset game
                    matchedPairs = 0;

                    score = 0;
                    scoreDisplay.textContent = score;

                    moves = 0;
                    movesDisplay.textContent = moves;

                    // Shuffle cards again
                    cardValues.sort(() => Math.random() - 0.5);

                    // Reset every card
                    cards.forEach((card, index) => {

                        card.classList.remove("flipped", "matched");

                        card.dataset.value = cardValues[index];

                        card.querySelector(".card-front").textContent =
                            cardValues[index];

                    });

                    resetCards();

                }, 500);

            }

        } else {

            // Wrong pair
            updateScore(-2);

            const card1 = firstCard;
            const card2 = secondCard;

            setTimeout(() => {

                // Flip both cards face-down
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");

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



