class configuracionGraficos {
    static DebugGraficos = false
    static debugColission = false
    static JugadoresVerticalOffset = -17
    static VelocidadInterpolacion = 0.012
    static interpolacionMovimiento = 4

    debugGraficos() {
        if (configuracionGraficos.DebugGraficos) {
            context.strokeStyle = "#00000010";
            context.lineWidth = 0.2;
            context.globalAlpha = 0.5;
            for (let i = 0; i <= configuracion.largoMundo; i++) {
                context.moveTo(i * zoom, 0);
                context.lineTo(i * zoom, configuracion.largoMundo * zoom);
                context.stroke();
            }
            for (let i = 0; i <= configuracion.largoMundo; i++) {
                context.moveTo(0, i * zoom);
                context.lineTo(configuracion.largoMundo * zoom, i * zoom);
                context.stroke();
            }
            context.globalAlpha = 1;
        }
    }
}
class SpriteProp {
    constructor(imagen, largo, alto, spriteFrame) {
        this.imagen = imagen
        this.largo = largo
        this.alto = alto
        this.spriteFrame = spriteFrame
    }
    dibujar(deltaTime, prop, x, y) {
        if (configuracionGraficos.debugColission) {
            context.strokeStyle = "Green"
            context.beginPath()
            context.rect(x * zoom, y * zoom, Math.round(prop.largo) * zoom, Math.round(prop.alto) * zoom)
            context.stroke()
        }
        let finalX = (1 - this.largo) * zoom * 0.5;
        let finalY = (1 - this.alto) * zoom * 0.5;
        context.drawImage(this.imagen, this.spriteFrame.sx, this.spriteFrame.sy, this.spriteFrame.sLargo, this.spriteFrame.sAlto, (x * zoom) + finalX, (y * zoom) + finalY + configuracionGraficos.JugadoresVerticalOffset, zoom * this.largo, zoom * this.alto)
    }
}
class SpriteInfo {
    constructor(imagen, largo, alto, spriteFrame, direcciones, tamano) {
        this.imagen = imagen
        this.largo = largo
        this.alto = alto
        this.spriteFrame = spriteFrame
        this.spriteFrameAnterior = spriteFrame
        this.direcciones = direcciones
        this.frameActual = 0
        this.x = 0;
        this.y = 0;
        this.ultimaDireccionHorizontal = "0010"
        this.moviendose = 0.0
        this.tamano = tamano
    }
    dibujar(deltaTime, personaje, x, y) {
        if (this.spriteFrame != this.spriteFrameAnterior) {
            this.frameActual = 0
        }
        if (configuracionGraficos.debugColission) {
            context.strokeStyle = "Green"
            context.beginPath()
            context.rect(x * zoom, y * zoom, zoom * personaje.largo, zoom * personaje.alto)
            context.stroke()
        }
        var destinox = x
        var destinoy = y
        this.moviendose = moveTowards(this.moviendose, personaje.subTile != 0 ? 1 : 0, deltaTime * configuracionGraficos.interpolacionMovimiento)
        var moviendose = this.moviendose > 0
        switch (personaje.direccion) {
            case 0b0001://Hacia arriba
                var estado = moviendose ? this.direcciones["0001"].walking : this.direcciones["0001"].idle
                if (estado.animacion.length == 0) {
                    estado = moviendose ? this.direcciones[this.ultimaDireccionHorizontal].walking : this.direcciones[this.ultimaDireccionHorizontal].idle
                }
                this.reprodurAnimacion(estado, deltaTime)
                if (personaje.subTile) {
                    destinoy -= 1
                }
                this.estadoAnterior = estado;
                break;
            case 0b0010://Hacia derecha
                this.ultimaDireccionHorizontal = "0010"
                var estado = moviendose ? this.direcciones["0010"].walking : this.direcciones["0010"].idle
                this.reprodurAnimacion(estado, deltaTime)
                if (personaje.subTile) {
                    destinox += 1
                }
                this.estadoAnterior = estado;
                break;
            case 0b0100://Hacia abajo
                var estado = moviendose ? (this.direcciones["0100"].walking) : (this.direcciones["0100"].idle)
                if (estado.animacion.length == 0) {
                    estado = moviendose ? this.direcciones[this.ultimaDireccionHorizontal].walking : this.direcciones[this.ultimaDireccionHorizontal].idle
                }
                this.reprodurAnimacion(estado, deltaTime)
                if (personaje.subTile) {
                    destinoy += 1
                }
                this.estadoAnterior = estado;
                break;
            case 0b1000://Hacia izquierda
                this.ultimaDireccionHorizontal = "1000"
                var estado = moviendose ? this.direcciones["1000"].walking : this.direcciones["1000"].idle
                this.reprodurAnimacion(estado, deltaTime)
                if (personaje.subTile) {
                    destinox -= 1
                }
                this.estadoAnterior = estado;
                break;
        }
        if (this.spriteFrame) {
            this.x = moveTowards(this.x, destinox, deltaTime * configuracionGraficos.VelocidadInterpolacion * personaje.velocidad)
            this.y = moveTowards(this.y, destinoy, deltaTime * configuracionGraficos.VelocidadInterpolacion * personaje.velocidad)
            /*let finalX = (1 / this.tamano) * zoom * 0.5;
            let finalY = (1 / this.tamano) / 2;*/
            let finalX = (1 - this.tamano) * zoom * 0.5;
            context.drawImage(this.imagen, this.spriteFrame.sx, this.spriteFrame.sy, this.spriteFrame.sLargo, this.spriteFrame.sAlto, (this.x * zoom) + finalX, (this.y * zoom) + finalX + configuracionGraficos.JugadoresVerticalOffset, zoom * this.tamano, zoom * this.tamano)
        }
        this.spriteFrameAnterior = this.spriteFrame
    }

    obtenerSpriteFrame(spriteFrame, direccion) {
        if (!direccion) {
            //return null;
            console.log("No anim");
            return spriteFrame;
        }
        //return new SpriteFrame(direccion.sx, direccion.sy, direccion.sAlto, direccion.sLargo)
        spriteFrame.sx = direccion.sx;
        spriteFrame.sy = direccion.sy;
        spriteFrame.sAlto = direccion.sAlto;
        spriteFrame.sLargo = direccion.sLargo;
        return spriteFrame;
    }
    reprodurAnimacion(estado, deltaTime) {
        if (estado.animacion) {
            this.frameActual += estado.velocidad * deltaTime
            this.obtenerSpriteFrame(this.spriteFrame, estado.animacion[Math.floor(this.frameActual) % estado.animacion.length])
        }
        else {
            this.spriteFrame = this.direcciones["0001"].spriteFrame
        }
    }
}

class SpriteFrame {
    constructor(sx, sy, sLargo, sAlto) {
        this.sx = sx
        this.sy = sy
        this.sLargo = sLargo
        this.sAlto = sAlto
    }
    dibujar(deltaTime, x, y) {
        context.drawImage(this.imagen,
            this.finalSpriteFrame.sx,
            this.finalSpriteFrame.sy,
            this.finalSpriteFrame.sLargo,
            this.finalSpriteFrame.sAlto, x * zoom, y * zoom, zoom, zoom)
    }
}
class TileSpriteInfo extends SpriteInfo {
    constructor(imagen, largo, alto, spriteFrame, direcciones) {
        super(imagen, largo, alto, spriteFrame);
        this.direcciones = direcciones;
        this.tieneDirecciones = direcciones != null;
    }
    refrescar(deltaTime, mundo, x, y) {
        
        var valor = 0b00000000
        //console.log("dibujando tile: x " + x + " y " + y)
        //console.log(mundo[x][y])
        var esteId = mundo[x][y].id
        var pasable = mundo[x][y].pasable
        if (y > 0 && mundo[x][y - 1].pasable == pasable) {//tile de arriba
            valor |= 0b00000001
            //console.log("tile de arriba es igual")
        }
        else {
            //console.log("tile de arriba es diferente")
        }
        if (x + 1 < mundo.length && mundo[x + 1][y].pasable == pasable) {//tile de la derecha
            valor |= 0b00000010
            //console.log("tile de la derecha es igual")
        }
        else {
            //console.log("tile de la derecha es diferente")
        }
        if (y + 1 < mundo[x].length && mundo[x][y + 1].pasable == pasable) {//tile de abajo
            valor |= 0b00000100
            //console.log("tile de abajo es igual")
        }
        else {
            //console.log("tile de abajo es diferente")
        }
        if (x > 0 && mundo[x - 1][y].pasable == pasable) {//tile de la izquierda
            valor |= 0b00001000
            //console.log("tile de la izquierda es igual")
        }
        else {
            //console.log("tile de la izquierda es diferente") 
        }
        if (y > 0 && x > 0 && mundo[x - 1][y - 1].pasable == pasable) {//tile de arriba izquierda
            valor |= 0b00010000
            //console.log("tile de arriba es igual")
        }
        else {
            //console.log("tile de arriba es diferente")
        }
        if (x + 1 < mundo.length && y > 0 && mundo[x + 1][y - 1].pasable == pasable) {//tile de arriba derecha
            valor |= 0b00100000
            //console.log("tile de arriba es igual")
        }
        else {
            //console.log("tile de arriba es diferente")
        }
        if (x + 1 < mundo.length && y + 1 < mundo.length && mundo[x + 1][y + 1].pasable == pasable) {//tile de abajo derecha
            valor |= 0b01000000
            //console.log("tile de arriba es igual")
        }
        else {
            //console.log("tile de arriba es diferente")
        }
        if (x > 0 && y + 1 < mundo.length && mundo[x - 1][y + 1].pasable == pasable) {//tile de abajo izquierda
            valor |= 0b10000000
            //console.log("tile de arriba es igual")
        }
        else {
            //console.log("tile de arriba es diferente")
        }

        this.debugValor = valor
        this.debugValorBit = binarioAString(valor)

        if (!this.tieneDirecciones) {
            //console.log("tile: x " + x + " y " + y + " no tiene direcciones")
            this.finalSpriteFrame = this.spriteFrame;
            return;
        }

        //console.log(this.direcciones);
        //console.log("bit final: " + this.debugValorBit);
        this.finalSpriteFrame = this.direcciones[binarioAString(valor)] ? this.direcciones[binarioAString(valor)].spriteFrame : new SpriteFrame()
        //console.log(binarioAString(valor));
    }
    dibujar(deltaTime, instance, x, y) {
        context.drawImage(this.imagen,
            this.finalSpriteFrame.sx,
            this.finalSpriteFrame.sy,
            this.finalSpriteFrame.sLargo,
            this.finalSpriteFrame.sAlto, x * zoom, y * zoom, zoom, zoom)

        if (configuracionGraficos.DebugGraficos) {

            let indicadorLargo = zoom * 0.1;
            var esteId = mundo[x][y].id
            context.textAlign = "center"
            context.fillStyle = "black"
            context.font = "10px serif"
            context.fillText(x + "x" + (y - 1), x * zoom + zoom / 2, y * zoom - zoom / 4)
            context.fillText(instance, x * zoom + zoom / 2, y * zoom - zoom / 2)

            context.fillStyle = "#111"
            context.fillText(this.debugValorBit, x * zoom + zoom / 2, y * zoom - zoom / 10)
            context.fillText("x:" + this.finalSpriteFrame.sx + ", y:" + this.finalSpriteFrame.sy, x * zoom + zoom / 2, (y * zoom) + zoom * 0.2)

            if (y > 0 && mundo[x][y - 1].id == esteId) {//tile de arriba
                context.fillStyle = "green"
            }
            else {
                context.fillStyle = "red"
            }
            context.fillRect(x * zoom + zoom / 2, y * zoom, indicadorLargo, indicadorLargo);
            if (x + 1 < mundo.length && mundo[x + 1][y].id == esteId) {//tile de la derecha
                context.fillStyle = "green"
            }
            else {
                context.fillStyle = "red"
            }
            context.fillRect((x * zoom) + zoom - indicadorLargo, y * zoom + zoom / 2, indicadorLargo, indicadorLargo);
            if (y + 1 < mundo[x].length && mundo[x][y + 1].id == esteId) {//tile de abajo
                context.fillStyle = "green"
            }
            else {
                context.fillStyle = "red"
            }
            context.fillRect((x * zoom) + zoom / 2, y * zoom + zoom - indicadorLargo, indicadorLargo, indicadorLargo);

            if (x > 0 && mundo[x - 1][y].id == esteId) {//tile de la izquierda
                context.fillStyle = "green"
            }
            else {
                context.fillStyle = "red"
            }
            context.fillRect(x * zoom, y * zoom + zoom / 2, indicadorLargo, indicadorLargo);

            if (y > 0 && x > 0 && mundo[x - 1][y - 1].id == esteId) {//tile de arriba izquierda
                context.fillStyle = "green"
            }
            else {
                context.fillStyle = "red"
            }
            context.fillRect(x * zoom, y * zoom, indicadorLargo, indicadorLargo);
            if (x + 1 < mundo.length && y > 0 && mundo[x + 1][y - 1].id == esteId) {//tile de arriba derecha
                context.fillStyle = "green"
            }
            else {
                context.fillStyle = "red"
            }
            context.fillRect(x * zoom + zoom - indicadorLargo, y * zoom, indicadorLargo, indicadorLargo);

            if (x + 1 < mundo.length && y + 1 < mundo.length && mundo[x + 1][y + 1].id == esteId) {//tile de abajo derecha
                context.fillStyle = "green"
            }
            else {
                context.fillStyle = "red"
            }
            context.fillRect(x * zoom + zoom - indicadorLargo, y * zoom + zoom - indicadorLargo, indicadorLargo, indicadorLargo);

            if (x > 0 && y + 1 < mundo.length && mundo[x - 1][y + 1].id == esteId) {//tile de abajo izquierda
                context.fillStyle = "green"
            }
            else {
                context.fillStyle = "red"
            }
            context.fillRect(x * zoom, y * zoom + zoom - indicadorLargo, indicadorLargo, indicadorLargo);
        }
    }
}