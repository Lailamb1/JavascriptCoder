let puntosUsuario = 0;
let puntosPC = 0;

let instrucciones = document.querySelector("#instrucciones");
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let mensaje = document.querySelector("#mensaje");
let contenedorGanaPunto = document.querySelector("#gana-punto");
let elegiTuArma = document.querySelector("#elegi-tu-arma");

let armas = ["piedra🪨", "papel📋", "tijera✂️"];
let mensajes = ["¡Ganaste un punto! 🔥", "¡La computadora ganó un punto! 😭", "¡Empate! 😱", "🔥 ¡Ganaste el juego! 🔥", "😭 ¡La computadora ganó el juego! 😭"];

let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
let contenedorEleccionPC = document.querySelector("#eleccion-computadora");

let botonesArmas = document.querySelectorAll(".arma");
botonesArmas.forEach(boton => {
    boton.addEventListener("click", iniciarTurno);
});

function iniciarTurno(e) {
    
    let eleccionPC = Math.floor(Math.random() * 3);
    let eleccionUsuario = e.currentTarget.id;

    if (eleccionPC === 0) {
        eleccionPC = "piedra🪨";
    } else if (eleccionPC === 1) {
        eleccionPC = "papel📋"
    } else if (eleccionPC === 2) {
        eleccionPC = "tijera✂️"
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

    mensaje.classList.remove("disabled");
    contenedorEleccionUsuario.innerText = eleccionUsuario;
    contenedorEleccionPC.innerText = eleccionPC;

    if (puntosUsuario === 5 || puntosPC === 5) {

        if (puntosUsuario === 5) {
            instrucciones.innerText = mensajes[3]
        }

        if (puntosPC === 5) {
            instrucciones.innerText = mensajes[4]
        }

        elegiTuArma.classList.add("disabled");
        reiniciar.classList.remove("disabled");
        reiniciar.addEventListener("click", reiniciarJuego);
    }


}

function ganaUsuario() {
    puntosUsuario++;
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorGanaPunto.innerText = mensajes[0]
}

function ganaPC() {
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC;
    contenedorGanaPunto.innerText = mensajes[1]
}

function empate() {
    contenedorGanaPunto.innerText = mensajes[2]
}

function reiniciarJuego() {
    reiniciar.classList.add("disabled");
    elegiTuArma.classList.remove("disabled");
    mensaje.classList.add("disabled");

    puntosUsuario = 0;
    puntosPC = 0;
    
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorPuntosPC.innerText = puntosPC;

    instrucciones.innerText = "El primero en llegar a 5 puntos gana."
}