class Gfx {
    constructor() {
        this.source = "path"
        this.direcciones = {}
        this.direcciones["0001"] = new Direccion()
        this.direcciones["0010"] = new Direccion()
        this.direcciones["0100"] = new Direccion()
        this.direcciones["1000"] = new Direccion()
    }
}

class Posicion {
    constructor() {
        this.x = 0
        this.y = 0
    }
}
class Direccion {
    constructor() {
        this.idle = new AnimacionData()
        this.walking = new AnimacionData()
    }
}
class AnimacionData {
    constructor() {
        this.velocidad = 0.1
        this.animacion = []
    }
}
class spriteFrame {
    constructor() {
        this.sx = 0
        this.sy = 0
        this.sAlto = 0
        this.sLargo = 0
    }
}

const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const resultado = document.getElementById("resultado")
const sliderZoom = document.getElementById("zoom")
const labelFullImage = document.getElementById("labelFullIMage")
const imagenCargada = document.getElementById("fullImage")
const sLargo = document.getElementById("sLargo")
const sAlto = document.getElementById("sAlto")
const containerArribaIdle = document.getElementById("ArribaIdle")
const containerArribaWalking = document.getElementById("ArribaWalking")
const containerDerechaIdle = document.getElementById("DerechaIdle")
const containerDerechaWalking = document.getElementById("DerechaWalking")
const containerAbajoIdle = document.getElementById("AbajoIdle")
const containerAbajoWalking = document.getElementById("AbajoWalking")
const containerIzquierdaIdle = document.getElementById("IzquierdaIdle")
const containerIzquierdaWalking = document.getElementById("IzquierdaWalking")
var zoom = 100
var alto = sAlto.value
var largo = sLargo.value
var transcurso = 0.0
const filas = 5
context.imageSmoothingEnabled = false;
var preview = new Image()
var objetoGrafico = new Gfx()
UpdateManager.subscribe(refrescarSpritesPreview)

function cargarImagen() {
    var reader = new FileReader()
    reader.readAsDataURL(document.getElementById("image").files[0])
    reader.onload = function (event) {
        preview.src = event.target.result
        canvas.src = preview.src
        imagenCargada.src = event.target.result
        labelFullImage.innerHTML = preview.naturalWidth + " x " + preview.naturalHeight
        refrescar()
    }
}

function refrescar() {
    objetoGrafico.direcciones["0001"].idle.animacion.forEach(element => {
        element.sAlto = alto
        element.sLargo = largo
    });
    objetoGrafico.direcciones["0001"].walking.animacion.forEach(element => {
        element.sAlto = alto
        element.sLargo = largo
    });

    labelFullImage.innerHTML = preview.naturalWidth + " x " + preview.naturalHeight
    context.fillStyle = "#AAA";
    canvas.width = zoom
    canvas.height = zoom
    context.fillRect(0, 0, zoom, zoom)
    //context.drawImage(preview, sx.value, sy.value, sLargo.value, sAlto.value, 0, 0, zoom, zoom)
    escupirResultado()
}
function cambiarZoom(nuevoZoom) {
    zoom = nuevoZoom
    refrescar()
}

function escupirResultado() {
    var objetoResultado = objetoGrafico
    /*objetoResultado.spriteFrame = new Object()
    objetoResultado.spriteFrame.sx = sx.value
    objetoResultado.spriteFrame.sy = sy.value
    objetoResultado.spriteFrame.sAlto = sAlto.value
    objetoResultado.spriteFrame.sLargo = sLargo.value*/
    resultado.value = JSON.stringify(objetoResultado, null, 4);
}
function refrescarSpritesPreview(delta) {
    context.fillStyle = "#333"
    context.fillRect(0, 0, canvas.width, canvas.height)
    transcurso += delta
    var tamanoFinal = zoom / filas
    /*if (objetoGrafico.direcciones["0001"].idle.animacion.length > 0) {
        var posicionX = 2
        var posicionY = 3
        var velocidad = objetoGrafico.direcciones["0001"].idle.velocidad
        let index = Math.floor(transcurso * velocidad) % objetoGrafico.direcciones["0001"].idle.animacion.length;
        var frame = objetoGrafico.direcciones["0001"].idle.animacion[index]
        context.drawImage(preview, frame.sx, frame.sy, frame.sAlto, frame.sLargo, tamanoFinal * posicionX, tamanoFinal * posicionY, tamanoFinal, tamanoFinal)
    }*/
    refrescarPreviewDireccion(transcurso, objetoGrafico.direcciones["0100"].idle, 2, 3, tamanoFinal)
    refrescarPreviewDireccion(transcurso, objetoGrafico.direcciones["0100"].walking, 2, 4, tamanoFinal)
    refrescarPreviewDireccion(transcurso, objetoGrafico.direcciones["0010"].idle, 3, 2, tamanoFinal)
    refrescarPreviewDireccion(transcurso, objetoGrafico.direcciones["0010"].walking, 4, 2, tamanoFinal)
    refrescarPreviewDireccion(transcurso, objetoGrafico.direcciones["0001"].idle, 2, 1, tamanoFinal)
    refrescarPreviewDireccion(transcurso, objetoGrafico.direcciones["0001"].walking, 2, 0, tamanoFinal)
    refrescarPreviewDireccion(transcurso, objetoGrafico.direcciones["1000"].idle, 1, 2, tamanoFinal)
    refrescarPreviewDireccion(transcurso, objetoGrafico.direcciones["1000"].walking, 0, 2, tamanoFinal)
}
function refrescarPreviewDireccion(transcurso, direccion, columna, fila, tamano) {
    if (direccion.animacion.length > 0) {
        var velocidad = direccion.velocidad
        let index = Math.floor(transcurso * velocidad) % direccion.animacion.length;
        var frame = direccion.animacion[index]
        context.drawImage(preview, frame.sx, frame.sy, frame.sAlto, frame.sLargo, tamano * columna, tamano * fila, tamano, tamano)
    }
}

function refrescarUI() {
    containerArribaIdle.innerHTML = ""
    containerArribaWalking.innerHTML = ""
    containerDerechaIdle.innerHTML = ""
    containerDerechaWalking.innerHTML = ""
    containerAbajoIdle.innerHTML = ""
    containerAbajoWalking.innerHTML = ""
    containerIzquierdaIdle.innerHTML = ""
    containerIzquierdaWalking.innerHTML = ""
    var frameTemplate = document.getElementById("pos")
    modificarAnimacion(objetoGrafico.direcciones["0001"].idle.animacion, frameTemplate, containerArribaIdle)
    modificarAnimacion(objetoGrafico.direcciones["0001"].walking.animacion, frameTemplate, containerArribaWalking)
    modificarAnimacion(objetoGrafico.direcciones["0010"].idle.animacion, frameTemplate, containerDerechaIdle)
    modificarAnimacion(objetoGrafico.direcciones["0010"].walking.animacion, frameTemplate, containerDerechaWalking)
    modificarAnimacion(objetoGrafico.direcciones["0100"].idle.animacion, frameTemplate, containerAbajoIdle)
    modificarAnimacion(objetoGrafico.direcciones["0100"].walking.animacion, frameTemplate, containerAbajoWalking)
    modificarAnimacion(objetoGrafico.direcciones["1000"].idle.animacion, frameTemplate, containerIzquierdaIdle)
    modificarAnimacion(objetoGrafico.direcciones["1000"].walking.animacion, frameTemplate, containerIzquierdaWalking)
}

function modificarAnimacion(animacion, template, container) {
    var index = 0
    animacion.forEach(element => {
        var frame = document.importNode(template.content.querySelector("li"), true)
        container.appendChild(frame)
        var sx = frame.querySelector("[name = sx]")
        var sy = frame.querySelector("[name = sy]")
        var canvas = frame.querySelector("[name = canvas]")
        sx.value = element.sx
        sy.value = element.sy
        let id = index;
        sx.addEventListener('input', (event) => modificarFrame(animacion, id, sx, sy, canvas))
        sy.addEventListener("input", (event) => modificarFrame(animacion, id, sx, sy, canvas))
        modificarFrame(animacion, id, sx, sy, canvas)
        index++
    });
}

function modificarFrame(animacion, index, sx, sy, canvas) {
    if (!animacion[index]) {
        animacion[index] = new spriteFrame()
    }
    animacion[index].sx = sx.value
    animacion[index].sy = sy.value
    var context = canvas.getContext("2d")
    context.imageSmoothingEnabled = false;
    context.fillStyle = "#222"
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(preview, sx.value, sy.value, alto, largo, 0, 0, canvas.width, canvas.height)
    escupirResultado()
}
function agregarIdle(direccion) {
    agregarAnimacionDireccion(objetoGrafico.direcciones[direccion].idle.animacion, 0, 0)
}
function agregarWalking(direccion) {
    agregarAnimacionDireccion(objetoGrafico.direcciones[direccion].walking.animacion, 0, 0)
}
function modificarVelocidadIdle(direccion, velocidad) {
    objetoGrafico.direcciones[direccion].idle.velocidad = velocidad
    escupirResultado()
}
function modificarVelocidadWalking(direccion, velocidad) {
    objetoGrafico.direcciones[direccion].walking.velocidad = velocidad
    escupirResultado()
}
function agregarAnimacionDireccion(animacion, x, y) {
    var frame = new spriteFrame()
    frame.sAlto = alto
    frame.sLargo = largo
    frame.sx = x
    frame.sy = y
    animacion.push(frame)
    escupirResultado()
    refrescarUI()
}
function modificarAlto(v) {
    alto = v
    refrescarDimensiones()
}
function modificarLargo(v) {
    largo = v
    refrescarDimensiones()
}
function refrescarDimensiones() {
    Object.entries(objetoGrafico.direcciones).forEach(direccion => {
        direccion[1].idle.animacion.forEach(animacion => {
            animacion.sAlto = alto
            animacion.sLargo = largo
        })
        direccion[1].walking.animacion.forEach(animacion => {
            animaci0on.sAlto = alto
            animacion.sLargo = largo
        })
    })
   refrescarUI()
}