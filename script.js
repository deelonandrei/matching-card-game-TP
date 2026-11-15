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