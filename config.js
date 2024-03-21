class configuracion {
    static largoMundo = 15
    static largoSubtile = 1000
    constructor() {
        this.cargando = 1;
        this.tiles = [];
        this.personajes = [];
        this.props = [];
        this.tilesGraficos = [];
        this.personajesGraficos = [];
        this.propsGraficos = [];
        this.suscriptions = [];
    }
    cargarTile(id, data, graficos) {
        this.cargando += 2;
        fetch(data)
            .then((response) => response.json())
            .then((json) => {
                this.tiles[id] = json
                this.cargando--;
                if (this.Ready()) {
                    this.suscriptions.forEach(s => s());
                }
            })

        fetch(graficos)
            .then((response) => response.json())
            .then((json) => {
                this.tilesGraficos[id] = json
                this.cargando--;
                if (this.Ready()) {
                    this.suscriptions.forEach(s => s());
                }
            })
    }
    cargarPersonaje(id, data, graficos) {
        this.cargando += 2;
        fetch(data)
            .then((response) => response.json())
            .then((json) => {
                this.personajes[id] = json
                this.cargando--;
                if (this.Ready()) {
                    this.suscriptions.forEach(s => s());
                }
            })

        fetch(graficos)
            .then((response) => response.json())
            .then((json) => {
                this.personajesGraficos[id] = json
                this.cargando--;
                if (this.Ready()) {
                    this.suscriptions.forEach(s => s());
                }
            })
    }
    cargarProp(id, data, graficos) {
        this.cargando += 2;
        fetch(data)
            .then((response) => response.json())
            .then((json) => {
                this.props[id] = json
                this.cargando--;
                if (this.Ready()) {
                    this.suscriptions.forEach(s => s());
                }
            })

        fetch(graficos)
            .then((response) => response.json())
            .then((json) => {
                this.propsGraficos[id] = json
                this.cargando--;
                if (this.Ready()) {
                    this.suscriptions.forEach(s => s());
                }
            })
    }
    Ready() {
        return this.cargando === 0;
    }
    suscribe(funcion) {
        this.suscriptions.push(funcion)
        return () => {
            this.suscriptions = this.suscriptions.filter(c => c !== funcion);
        }
    }
}
//Crear Personajes
function crearCaracter() { return new Personaje(0, 0, 0, 0, "", 10, 200, infoPersonaje.conejo.id) }
function crearGallina() { return new Gallina(0, 0, 0, 0, "", 10, 200, infoPersonaje.gallina.id) }
//Crear Tiles
function crearPasto() { return new Piso(infoTile.pasto.id, 0, config.tilesGraficos[infoTile.pasto], 0, 0) }
function crearAgua() { return new Agua(infoTile.agua.id, 0, config.tilesGraficos[infoTile.agua], 0, 0,) }
function crearArena() { return new Piso(infoTile.arena.id, 0, config.tilesGraficos[infoTile.arena], 0, 0,) }
//Crear Props
function crearArbol() { return new Arbol(0, 0, 0, 0, "", 10, infoProps.Arbol.id, config.props[infoProps.Arbol.id].pasable) }
function crearPiedra() { return new Piedra(0, 0, 0, 0, "", 10, infoProps.Piedra.id, config.props[infoProps.Piedra.id].pasable) }
function crearArbolGrande() { return new Arbol(0, 0, 0, 0, "", 10, infoProps.ArbolGrande.id, config.props[infoProps.ArbolGrande.id].pasable) }
function crearArbusto() { return new Plant(0, 0, 0, 0, "", 10, infoProps.bush.id, config.props[infoProps.bush.id].pasable) }
function crearSign() { return new Sign(0, 0, 0, 0, "", 10, infoProps.sign.id, config.props[infoProps.sign.id].pasable) }
function crearFlower() { return new Plant(0, 0, 0, 0, "", 10, infoProps.sunFlower.id, config.props[infoProps.sunFlower.id].pasable) }
//Crear bots
function crearBotGallina(personaje) {
    return new GallinaAi(personaje)
}

const infoTile = Object.freeze({
    pasto: { id: 0, data: "Data/Tiles/pasto.json", graficos: "Data/graficos/Tiles/pasto_gfx.json", spawn: crearPasto },
    pared: { id: 1, data: "Data/Tiles/pared.json", graficos: "Data/graficos/Tiles/pared_gfx.json" },
    agua: { id: 2, data: "Data/Tiles/agua.json", graficos: "Data/graficos/Tiles/agua_gfx.json", spawn: crearAgua },
    arena: { id: 3, data: "Data/Tiles/arena.json", graficos: "Data/graficos/Tiles/arena_gfx.json", spawn: crearArena }
})
const infoPersonaje = Object.freeze({
    conejo: { id: 0, data: "Data/Personajes/jugador.json", graficos: "Data/graficos/jugador_gfx.json", spawn: crearCaracter, spawnBot: crearBotGallina },
    gallina: { id: 1, data: "Data/Personajes/gallina.json", graficos: "Data/graficos/gallina_gfx.json", spawn: crearGallina, spawnBot: crearBotGallina }
})
const infoProps = Object.freeze({
    Arbol: { id: 0, data: "Data/Props/arbol.json", graficos: "Data/graficos/Props/arbol_gfx.json", spawn: crearArbol },
    Piedra: { id: 1, data: "Data/Props/piedra.json", graficos: "Data/graficos/Props/piedra_gfx.json", spawn: crearPiedra },
    ArbolGrande: { id: 2, data: "Data/Props/arbolGrande.json", graficos: "Data/graficos/Props/arbolGrande_gfx.json", spawn: crearArbolGrande },
    bush: { id: 3, data: "Data/Props/bush.json", graficos: "Data/graficos/Props/bush_gfx.json", spawn: crearArbusto },
    sign: { id: 4, data: "Data/Props/sign1.json", graficos: "Data/graficos/Props/sign1_gfx.json", spawn: crearSign },
    sunFlower: { id: 5, data: "Data/Props/sunFlower.json", graficos: "Data/graficos/Props/sunFlower_gfx.json", spawn: crearFlower }
})
const config = new configuracion()

for (let [key, value] of Object.entries(infoTile)) {
    config.cargarTile(value.id, value.data, value.graficos)
}
for (let [key, value] of Object.entries(infoPersonaje)) {
    config.cargarPersonaje(value.id, value.data, value.graficos)
}
for (let [key, value] of Object.entries(infoProps)) {
    config.cargarProp(value.id, value.data, value.graficos)
}

config.cargando--;