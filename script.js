
const $ = (selector) => document.querySelector(selector);


// ELEMENTOS
const heartsContainer = $("#hearts-container");
const letterButton = $("#letterButton");
const letterContent = $("#letterContent");

const surpriseButton = $("#surpriseButton");
const revealButton = $("#revealButton");
const revealedMessage = $("#revealedMessage");

const dialog = $("#messageDialog");
const dialogTitle = $("#dialogTitle");
const dialogMessage = $("#dialogMessage");


// ABRIR LA CARTA
letterButton.addEventListener("click", () => {

    const isHidden = letterContent.classList.contains("hidden");

    letterContent.classList.toggle("hidden");

    letterButton.querySelector(".letter-description").textContent =
        isHidden
            ? "Tu cartita está abierta ♡"
            : "Pulsa aquí para abrirla ♡";

    if (isHidden) {
        createHearts(12);

        setTimeout(() => {
            letterContent.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }, 100);
    }

});


// BOTÓN PRINCIPAL
surpriseButton.addEventListener("click", () => {

    $("#carta").scrollIntoView({
        behavior: "smooth"
    });

    createHearts(20);

});


// TARJETAS INTERACTIVAS
document.querySelectorAll(".memory-card").forEach((card) => {

    card.addEventListener("click", () => {

        dialogTitle.textContent = card.dataset.title;
        dialogMessage.textContent = card.dataset.message;

        dialog.showModal();

        createHearts(8);

    });

});


// CERRAR VENTANA
$("#closeDialog").addEventListener("click", () => {
    dialog.close();
});

$("#okButton").addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener("click", (event) => {

    if (event.target === dialog) {
        dialog.close();
    }

});


// REVELAR SORPRESA
revealButton.addEventListener("click", () => {

    const isHidden = revealedMessage.classList.contains("hidden");

    revealedMessage.classList.toggle("hidden");

    revealButton.textContent = isHidden
        ? "Volver a esconder ♡"
        : "Sí, quiero saber 🎀";

    if (isHidden) {
        createHearts(25);
    }

});


// VOLVER AL INICIO
$("#backButton").addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* GENERADOR DE CORAZONES */

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

function createHearts(amount = 10) {
    if (reducedMotion.matches) return;

    const symbols = ["♥", "♡", "♡", "✧"];
    const colors = [
     "#e91e63",
    "#ff4081",
    "#d50070",
    "#b83280",
    "#a855f7",
    "#ff75aa"
    ];

    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("span");

        heart.classList.add("floating-heart");

        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        // Posición horizontal aleatoria
        heart.style.left = `${Math.random() * 100}%`;

        // Tamaño aleatorio
        heart.style.fontSize =
            `${12 + Math.random() * 22}px`;

        // Velocidad de subida
        heart.style.setProperty(
            "--duration",
            `${7 + Math.random() * 5}s`
        );

        // Movimiento lateral
        heart.style.setProperty(
            "--drift",
            `${-45 + Math.random() * 90}px`
        );

        // Intensidad visual
        heart.style.setProperty(
            "--heart-opacity",
            `${0.55 + Math.random() * 0.3}`
        );

        heart.style.setProperty(
            "--heart-color",
            colors[Math.floor(Math.random() * colors.length)]
        );

        // Retraso aleatorio para los grupos de corazones
        heart.style.animationDelay =
            `${Math.random() * 0.8}s`;

        heartsContainer.appendChild(heart);

        heart.addEventListener("animationend", () => {
            heart.remove();
        }, { once: true });
    }
}


/* FONDO ANIMADO PERMANENTEMENTE */

let heartInterval = null;

function startHeartAnimation() {
    if (reducedMotion.matches || heartInterval !== null) {
        return;
    }

    // Pequeño grupo inicial
    createHearts(7);

    // Después aparecen continuamente
    heartInterval = setInterval(() => {
        createHearts(1);
    }, 650);
}

function stopHeartAnimation() {
    if (heartInterval !== null) {
        clearInterval(heartInterval);
        heartInterval = null;
    }

    heartsContainer.replaceChildren();
}


// Iniciar cuando se cargue la página
window.addEventListener("load", () => {
    startHeartAnimation();
});

// Adaptarse a los cambios de accesibilidad
reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
        stopHeartAnimation();
    } else {
        startHeartAnimation();
    }
});

// Reducir trabajo cuando la pestaña no está visible
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopHeartAnimation();
    } else {
        startHeartAnimation();
    }
});



// PEQUEÑA ANIMACIÓN AL CARGAR
window.addEventListener("load", () => {

    setTimeout(() => {
        createHearts(7);
    }, 300);

});

const musicButton = document.getElementById("musicButton");
const backgroundMusic = document.getElementById("backgroundMusic");

musicButton.addEventListener("click", async () => {
    if (backgroundMusic.paused) {
        try {
            await backgroundMusic.play();
            musicButton.textContent = "♫ Pausar música";
        } catch (error) {
            console.error("No se pudo reproducir la música:", error);
        }
    } else {
        backgroundMusic.pause();
        musicButton.textContent = "♫ Nuestra música";
    }
});
