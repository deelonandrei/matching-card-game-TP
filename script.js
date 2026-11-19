// Background Music
const backgroundMusic = document.getElementById("backgroundMusic");

const clickSound = new Audio("music/menu-select-fx.mp3");

clickSound.volume = 1;

function playClickSound() {

    clickSound.pause();
    clickSound.currentTime = 0;

    clickSound.play().catch(error => {
        console.log("Click sound error:", error);
    });

}

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

// Volume slider
volumeSlider.addEventListener("input", updateVolume);


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

        // Fade away the black screen
        screenTransition.classList.remove("active");

    });

});



