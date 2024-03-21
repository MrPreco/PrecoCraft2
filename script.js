let ultimoTileId = -1;
let ultimoPersonajeId = -1;
let ultimoPropId = -1;
const tileInvalido = new Tile(-1, -1, -1, -1, null, false);
var mundo = []
var personajes = []
var bots = []
var props = []
var posicionPersonajes = []
var posicionProps = []
var jugador;
generarMundo()
config.suscribe(juegoCargado)

function juegoCargado() {
    //var jugador = new Personaje(5, 5, "purple", 10, 200, 0)
    jugador = spawnearPersonaje(infoPersonaje.conejo, 5, 5,false)
    //var gallina = new Gallina(0, 1, "purple", 10, 1, 0)
    spawnearPersonaje(infoPersonaje.gallina, 0, 1,true)
    spawnearPersonaje(infoPersonaje.gallina, 8, 2,true)
    spawnearPersonaje(infoPersonaje.conejo, 3, 1,true)
    spawnearPersonaje(infoPersonaje.conejo, 0, 1,true)
    spawnearPersonaje(infoPersonaje.gallina, 0, 0,true)
    spawnearPersonaje(infoPersonaje.conejo, 0, 0,true)
    spawnearProp(infoProps.Arbol, 7, 5)
    spawnearProp(infoProps.Arbol, 11, 2)
    spawnearProp(infoProps.Arbol, 12, 2)
    spawnearProp(infoProps.Arbol, 11, 3)
    spawnearProp(infoProps.Arbol, 12, 3)
    spawnearProp(infoProps.Piedra, 6, 6)
    spawnearProp(infoProps.ArbolGrande, 9, 7)
    spawnearProp(infoProps.bush, 4, 7)
    spawnearProp(infoProps.sign, 8, 3)
    spawnearProp(infoProps.sunFlower, 6, 7)
}


function generarMundo() {
    for (let i = 0; i < configuracion.largoMundo; i++) {
        mundo[i] = []
        posicionPersonajes[i] = []
        posicionProps[i] = []
        for (let j = 0; j < configuracion.largoMundo; j++) {
            posicionPersonajes[i][j] = null
            posicionProps[i][j] = null
            //console.log(config.tilesGraficos[infoTile.pasto])
            //crearTile(new Piso(infoTile.pasto.id, 0, config.tilesGraficos[infoTile.pasto],0,0,), i, j)
            crearTile(infoTile.agua.spawn(), i, j)
        }
    }
    //crearTile(new Piso(infoTile.pasto.id, 0, config.tilesGraficos[infoTile.pasto],0,0,), 0,0)
    crearTile(infoTile.pasto.spawn(), 0, 2)
    crearTile(infoTile.pasto.spawn(), 2, 1)
    crearTile(infoTile.pasto.spawn(), 3, 1)
    crearTile(infoTile.pasto.spawn(), 2, 2)
    crearTile(infoTile.pasto.spawn(), 3, 2)
    crearTile(infoTile.pasto.spawn(), 5, 5)
    crearTile(infoTile.pasto.spawn(), 6, 5)
    crearTile(infoTile.pasto.spawn(), 4, 5)
    crearTile(infoTile.pasto.spawn(), 4, 6)
    crearTile(infoTile.pasto.spawn(), 5, 6)
    crearTile(infoTile.pasto.spawn(), 6, 6)
    crearTile(infoTile.pasto.spawn(), 6, 7)
    crearTile(infoTile.pasto.spawn(), 5, 7)
    crearTile(infoTile.pasto.spawn(), 4, 7)
    crearTile(infoTile.pasto.spawn(), 7, 5)
    crearTile(infoTile.pasto.spawn(), 3, 5)
    crearTile(infoTile.pasto.spawn(), 5, 8)
    crearTile(infoTile.pasto.spawn(), 5, 4)
    crearTile(infoTile.pasto.spawn(), 5, 3)
    crearTile(infoTile.pasto.spawn(), 5, 2)
    crearTile(infoTile.pasto.spawn(), 4, 2)
    crearTile(infoTile.pasto.spawn(), 4, 1)
    crearTile(infoTile.pasto.spawn(), 7, 1)
    crearTile(infoTile.pasto.spawn(), 7, 2)
    crearTile(infoTile.pasto.spawn(), 8, 1)
    crearTile(infoTile.pasto.spawn(), 8, 2)
    crearTile(infoTile.pasto.spawn(), 7, 3)
    crearTile(infoTile.pasto.spawn(), 8, 3)
    crearTile(infoTile.pasto.spawn(), 9, 1)
    crearTile(infoTile.pasto.spawn(), 9, 2)
    crearTile(infoTile.pasto.spawn(), 9, 3)
    crearTile(infoTile.pasto.spawn(), 0, 4)
    crearTile(infoTile.pasto.spawn(), 0, 5)
    crearTile(infoTile.pasto.spawn(), 0, 6)
    crearTile(infoTile.pasto.spawn(), 0, 8)
    crearTile(infoTile.pasto.spawn(), 1, 8)
    crearTile(infoTile.pasto.spawn(), 2, 8)
    crearTile(infoTile.pasto.spawn(), 6, 2)
    crearTile(infoTile.pasto.spawn(), 0, 0)
    crearTile(infoTile.arena.spawn(), 9, 7)
    crearTile(infoTile.arena.spawn(), 9, 8)
    crearTile(infoTile.arena.spawn(), 7, 7)
    crearTile(infoTile.arena.spawn(), 8, 7)
    crearTile(infoTile.arena.spawn(), 7, 6)
    crearTile(infoTile.arena.spawn(), 8, 6)
    crearTile(infoTile.arena.spawn(), 9, 6)
    crearTile(infoTile.arena.spawn(), 8, 8)


    crearTile(infoTile.pasto.spawn(), 11, 3)
    crearTile(infoTile.pasto.spawn(), 11, 2)
    crearTile(infoTile.pasto.spawn(), 11, 1)
    crearTile(infoTile.pasto.spawn(), 10, 1)
    crearTile(infoTile.pasto.spawn(), 10, 2)
    crearTile(infoTile.pasto.spawn(), 10, 3)
    crearTile(infoTile.pasto.spawn(), 12, 1)
    crearTile(infoTile.pasto.spawn(), 12, 2)
    crearTile(infoTile.pasto.spawn(), 12, 3)
    crearTile(infoTile.pasto.spawn(), 9, 4)
    crearTile(infoTile.pasto.spawn(), 10, 4)
    crearTile(infoTile.pasto.spawn(), 11, 4)
    /*crearTile(new Pared(infoTile.pared.id), 0, 0)
    crearTile(new Pared(infoTile.pared.id), 0, 1)
    crearTile(new Pared(infoTile.pared.id), 0, 2)
    crearTile(new Pared(infoTile.pared.id), 0, 3)
    crearTile(new Pared(infoTile.pared.id), 0, 4)
    crearTile(new Pared(infoTile.pared.id), 0, 5)
    crearTile(new Pared(infoTile.pared.id), 0, 6)
    crearTile(new Pared(infoTile.pared.id), 0, 7)
    crearTile(new Pared(infoTile.pared.id), 0, 8)
    crearTile(new Pared(infoTile.pared.id), 0, 9)
    crearTile(new Pared(infoTile.pared.id), 1, 9)
    crearTile(new Pared(infoTile.pared.id), 2, 9)
    crearTile(new Pared(infoTile.pared.id), 3, 9)
    crearTile(new Pared(infoTile.pared.id), 4, 9)
    crearTile(new Pared(infoTile.pared.id), 5, 9)
    crearTile(new Pared(infoTile.pared.id), 6, 9)
    crearTile(new Pared(infoTile.pared.id), 7, 9)
    crearTile(new Pared(infoTile.pared.id), 8, 9)
    crearTile(new Pared(infoTile.pared.id), 9, 9)
    crearTile(new Pared(infoTile.pared.id), 9, 1)
    crearTile(new Pared(infoTile.pared.id), 9, 2)
    crearTile(new Pared(infoTile.pared.id), 9, 3)
    crearTile(new Pared(infoTile.pared.id), 9, 4)
    crearTile(new Pared(infoTile.pared.id), 9, 5)
    crearTile(new Pared(infoTile.pared.id), 9, 6)
    crearTile(new Pared(infoTile.pared.id), 9, 7)
    crearTile(new Pared(infoTile.pared.id), 9, 8)
    crearTile(new Pared(infoTile.pared.id), 9, 9)
    crearTile(new Pared(infoTile.pared.id), 1, 0)
    crearTile(new Pared(infoTile.pared.id), 2, 0)
    crearTile(new Pared(infoTile.pared.id), 3, 0)
    crearTile(new Pared(infoTile.pared.id), 4, 0)
    crearTile(new Pared(infoTile.pared.id), 5, 0)
    crearTile(new Pared(infoTile.pared.id), 6, 0)
    crearTile(new Pared(infoTile.pared.id), 7, 0)
    crearTile(new Pared(infoTile.pared.id), 8, 0)
    crearTile(new Pared(infoTile.pared.id), 9, 0)*/

    console.log(mundo)
}
function spawnearPersonaje(personaje, x, y, esBot) {
    ultimoPersonajeId++;
    var nuevo = personaje.spawn()
    nuevo.instance = ultimoPersonajeId
    nuevo.x = x
    nuevo.y = y
    nuevo.alto = config.personajes[personaje.id].alto
    nuevo.largo = config.personajes[personaje.id].largo
    personajes.push(nuevo)
    posicionPersonajes[x][y] = nuevo
    if (esBot) {
        var bot = personaje.spawnBot(nuevo)
        bots.push(bot)
    }
    return nuevo
}
function spawnearProp(prop, x, y) {
    ultimoPropId++;
    var nuevo = prop.spawn()
    nuevo.instance = ultimoPropId
    nuevo.x = x
    nuevo.y = y
    nuevo.alto = config.props[prop.id].alto
    nuevo.largo = config.props[prop.id].largo
    props.push(nuevo)
    posicionProps[x][y] = nuevo
    return nuevo
}
function crearTile(tile, x, y) {
    ultimoTileId++;
    mundo[x][y] = tile
    //tile.instance = (x * configuracion.largoMundo) + y;
    tile.instance = ultimoTileId;
    tile.x = x
    tile.y = y
}
function obtenerTileMundo(x, y) {
    if (x > 0 && y > 0 && x < mundo.length && y < mundo.length) {
        return mundo[x][y]
    } else {
        return tileInvalido
    }
}
function obtenerTilePersonaje(x, y) {
    if (x > 0 && y > 0 && x < posicionPersonajes.length && y < posicionPersonajes.length) {
        return posicionPersonajes[x][y]
    } else {
        return null
    }
}
function obtenerTileProp(x, y) {
    if (x > 0 && y > 0 && x < posicionProps.length && y < posicionProps.length) {
        return posicionProps[x][y]
    } else {
        return null
    }
}
function tileEsPasable(x, y) {
    if (!obtenerTileMundo(x, y).pasable) {
        return false
    }
    if (obtenerTilePersonaje(x, y)) {
        return false
    }
    if (obtenerTileProp(x, y) && !obtenerTileProp(x, y).pasable) {
        return false
    }
    return true
}
function loop() {
    bots.forEach(bot => {
        bot.loop()
    })
    personajes.forEach(p => {
        //Moverse
        if (p.subTile == 0) {
            if (p.inputx > 0) {
                if (tileEsPasable(p.x + 1, p.y)) {
                    p.subTile += p.velocidad
                }
                p.direccion = 0b0010
            }
            else if (p.inputx < 0) {
                if (tileEsPasable(p.x - 1, p.y)) {
                    p.subTile += p.velocidad
                }
                p.direccion = 0b1000
            }
            else if (p.inputy > 0) {
                if (tileEsPasable(p.x, p.y + 1)) {
                    p.subTile += p.velocidad
                }
                p.direccion = 0b0100
            }
            else if (p.inputy < 0) {
                if (tileEsPasable(p.x, p.y - 1)) {
                    p.subTile += p.velocidad
                }
                p.direccion = 0b0001
            }
        }
        //Subtiles
        if (p.subTile > 0) {
            p.subTile += p.velocidad
            if (p.subTile >= configuracion.largoSubtile) {
                p.subTile = 0
                posicionPersonajes[p.x][p.y] = null
                switch (p.direccion) {
                    case 0b0001:
                        p.y -= 1
                        break
                    case 0b0010:
                        p.x += 1
                        break
                    case 0b0100:
                        p.y += 1
                        break
                    case 0b1000:
                        p.x -= 1
                        break
                }
                posicionPersonajes[p.x][p.y] = p
            }
        }
    });
}
setInterval(loop, 100)