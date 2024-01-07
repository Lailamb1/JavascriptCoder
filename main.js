let puntosUsuario = 0;
let puntosPC = 0;

let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let elegiTuArma = document.querySelector("#elegi-tu-arma");

let armas = ["piedra🪨", "papel📋", "tijera✂️"];
let mensajes = ["¡Ganaste un punto! 🔥", "¡La computadora ganó un punto! 😭", "¡Empate! 😱", "🔥 ¡Ganaste el juego! 🔥", "😭 ¡La computadora ganó el juego! 😭"];

let botonesArmas = document.querySelectorAll(".arma");
botonesArmas.forEach((boton, index) => {
    boton.id = armas[index];
    boton.addEventListener("click", iniciarTurno);
});

function iniciarTurno(e) {
    let eleccionPC = Math.floor(Math.random() * 3);
    let eleccionUsuario = e.currentTarget.id;

    if (eleccionPC === 0) {
        eleccionPC = armas[0];
    } else if (eleccionPC === 1) {
        eleccionPC = armas[1];
    } else if (eleccionPC === 2) {
        eleccionPC = armas[2];
    }

    if (
        (eleccionUsuario === armas[0] && eleccionPC === armas[2]) ||
        (eleccionUsuario === armas[2] && eleccionPC === armas[1]) ||
        (eleccionUsuario === armas[1] && eleccionPC === armas[0])
    ) {
        ganaUsuario();
    } else if (
        (eleccionPC === armas[0] && eleccionUsuario === armas[2]) ||
        (eleccionPC === armas[2] && eleccionUsuario === armas[1]) ||
        (eleccionPC === armas[1] && eleccionUsuario === armas[0])
    ) {
        ganaPC();
    } else {
        empate();
    }
    
}

function ganaUsuario() {
    puntosUsuario++;
    contenedorPuntosUsuario.innerText = puntosUsuario;
    alert(mensajes[0]);
}

function ganaPC() {
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC;
    alert(mensajes[1]);
}

function empate() {
    alert(mensajes[2]);
}

function reiniciarJuego() {
    reiniciar.classList.add("disabled");
    elegiTuArma.classList.remove("disabled");
    mensaje.classList.add("disabled");

    puntosUsuario = 0;
    puntosPC = 0;

    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorPuntosPC.innerText = puntosPC;
}

reiniciar.addEventListener("click", reiniciarJuego);