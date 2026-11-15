document.addEventListener("click", function (event) {

    const colors = [
        "#ffd990",
        "#ff8fab",
        "#cdb4db",
        "#a0c4ff",
        "#b9fbc0"
    ];

    for (let i = 0; i < 12; i++) {

        const particle = document.createElement("span");

        particle.classList.add("click-particle");

        particle.style.left = event.clientX + "px";
        particle.style.top = event.clientY + "px";

        particle.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        const angle = (Math.PI * 2 * i) / 12;
        const distance = 30;

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