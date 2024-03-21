//Tiles
class Tile {
    constructor(id, instance, x, y, sprite, pasable) {
        this.x = x
        this.y = y
        this.sprite = sprite
        this.pasable = pasable
        this.id = id
        this.instance = instance;
    }
}

class Piso extends Tile {
    constructor(id, instance, sprite, x, y) {
        super(id, instance, x, y, sprite, true)
    }
}

class Pared extends Tile {
    constructor(id, instance, sprite, x, y) {
        super(id, instance, x, y, sprite, false)
    }
}

class Agua extends Tile {
    constructor(id, instance, sprite, x, y,) {
        super(id, instance, x, y, sprite, false)
    }
}

//Entity
class Entity {
    constructor(x, y, largo, alto, sprite, vida, id) {
        this.x = x
        this.y = y
        this.largo = largo
        this.alto = alto
        this.sprite = sprite
        this.vida = vida
        this.id = id
        this.instance = 0
    }
}

//Personajes
class Personaje extends Entity {
    constructor(x, y, largo, alto, sprite, vida, velocidad, id) {
        super(x, y, largo, alto, sprite, vida, id)
        this.velocidad = velocidad
        this.inputx = 0
        this.inputy = 0
        this.direcciones = 0b0100
        this.subTile = 0
        this.direccion = 0b0100
    }
}

class Gallina extends Personaje {

}

//Props
class Prop extends Entity {
    constructor(x, y, largo, alto, sprite, vida, id, pasable) {
        super(x, y, largo, alto, sprite, vida, id)
        this.pasable = pasable
    }
}

class Arbol extends Prop {

}

class Piedra extends Prop {

}
class Plant extends Prop {

}
class Sign extends Prop {

}

//Ai
class Ai {
    constructor(personaje) {
        this.personaje = personaje
    }
    loop() {

    }
}
class GallinaAi extends Ai {
    loop() {
        let direccion = 0b0000
        let 
        this.personaje.inputx = -1
    }
}