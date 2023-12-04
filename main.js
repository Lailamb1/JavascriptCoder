function jugarPiedraPapelTijera() {
    const opciones = ["piedra", "papel", "tijera"];
    const eleccionComputadora = opciones[Math.floor(Math.random() * opciones.length)];
    let eleccionUsuario = prompt("Elige: piedra, papel o tijera?").toLowerCase();

    while (!opciones.includes(eleccionUsuario)) {
        eleccionUsuario = prompt("Esa no es una opción válida. Elige: piedra, papel o tijera?").toLowerCase();
    }

    alert(`La computadora eligió: ${eleccionComputadora}`);

    if (eleccionUsuario === eleccionComputadora) {
        alert("¡Empate!");
    } else if (
        (eleccionUsuario === "piedra" && eleccionComputadora === "tijera") ||
        (eleccionUsuario === "papel" && eleccionComputadora === "piedra") ||
        (eleccionUsuario === "tijera" && eleccionComputadora === "papel")
    ) {
        alert("¡Ganaste!");
    } else {
        alert("¡Perdiste!");
    }
}
jugarPiedraPapelTijera();