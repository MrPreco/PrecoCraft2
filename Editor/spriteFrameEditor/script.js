const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
context.imageSmoothingEnabled = false;
const sliderZoom = document.getElementById("zoom")
const labelFullImage = document.getElementById("labelFullIMage")
var zoom = 100
var transparencia = 0.5

const resultado = document.getElementById("resultado")
const canvasImagen = document.getElementById("fullImage")
const canvasMascara = document.getElementById("fullMascara")
const sx = document.getElementById("sx")
const sy = document.getElementById("sy")
const sLargo = document.getElementById("sLargo")
const sAlto = document.getElementById("sAlto")
var preview = new Image()
var mascara = new Image()

function cargarImagen() {
    var reader = new FileReader()
    reader.readAsDataURL(document.getElementById("image").files[0])
    reader.onload = function (event) {
        preview.src = event.target.result
        canvasImagen.src = preview.src
        refrescar()
    }
}

function cargarMascara() {
    var reader = new FileReader()
    reader.readAsDataURL(document.getElementById("mascara").files[0])
    reader.onload = function (event) {
        mascara.src = event.target.result
        canvasMascara.src = mascara.src
        refrescar()
    }
}

function refrescar() {
    labelFullImage.innerHTML = preview.naturalWidth + " x " + preview.naturalHeight
    context.fillStyle = "#AAA";
    canvas.width = zoom
    canvas.height = zoom
    context.fillRect(0, 0, zoom, zoom)
    context.drawImage(preview, sx.value, sy.value, sLargo.value, sAlto.value, 0, 0, zoom, zoom)
    context.globalAlpha = transparencia
    context.drawImage(mascara, sx.value, sy.value, sLargo.value, sAlto.value, 0, 0, zoom, zoom)
    context.globalAlpha = 1
    var objetoResultado = new Object()
    objetoResultado.spriteFrame = new Object()
    objetoResultado.spriteFrame.sx = sx.value
    objetoResultado.spriteFrame.sy = sy.value
    objetoResultado.spriteFrame.sAlto = sAlto.value
    objetoResultado.spriteFrame.sLargo = sLargo.value
    resultado.value = JSON.stringify(objetoResultado, null, 4).slice(1, -1);
}
function cambiarZoom(nuevoZoom) {
    zoom = nuevoZoom
    refrescar()
}
function cambiarTransparencia(nuevaTransparencia) {
    transparencia = nuevaTransparencia
    refrescar()
}