window.addEventListener("keydown", function (event) {
    if (event.code == "ArrowRight" || event.code=="KeyD") {
        jugador.inputx = 1
    } else if (event.code == "ArrowLeft" || event.code=="KeyA") {
        jugador.inputx = -1
    } else if (event.code == "ArrowDown" || event.code=="KeyS") {
        jugador.inputy = 1
    } else if (event.code == "ArrowUp" || event.code=="KeyW") {
        jugador.inputy = -1
    }
    
})

window.addEventListener("keyup", function (event) {
    if ((event.code == "ArrowRight" || event.code=="KeyD") && jugador.inputx > 0) {
        jugador.inputx = 0
    } else if ((event.code == "ArrowLeft" || event.code=="KeyA") && jugador.inputx < 0) {
        jugador.inputx = 0
    } else if ((event.code == "ArrowDown" || event.code=="KeyS") && jugador.inputy > 0) {
        jugador.inputy = 0
    } else if ((event.code == "ArrowUp" || event.code=="KeyW") && jugador.inputy < 0) {
        jugador.inputy = 0
    }
    
    
    
})