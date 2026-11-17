// Background Music
const backgroundMusic = document.getElementById("backgroundMusic");

// Start button
const startButton = document.querySelector(".start-button");

// Start the game
startButton.addEventListener("click", () => {
    document.body.classList.add("game-started");
});

// Show cards when START is clicked
startButton.addEventListener("click", () => {
    gameContainer.style.display = "block";
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
    settingsMenu.classList.toggle("active");
});

// Close settings
settingsClose.addEventListener("click", () => {
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
    volumeSlider.value = Math.max(0, Number(volumeSlider.value) - 10);
    updateVolume();
});

// Increase volume
volumePlus.addEventListener("click", () => {
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
