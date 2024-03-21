UpdateManager.subscribe(update);
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
context.imageSmoothingEnabled = false;
let zoom = 45
var spriteJugadores = {}
var spriteTiles = {}
var spriteProps = {}
const debugGraficos = new configuracionGraficos()
/*var jugadorImagen = new Image()
jugadorImagen.src = "Images/Sprout Lands/Characters/Basic Charakter Actions.png"
var jugadorSpriteFrame = new SpriteFrame(0, 0, 48, 48)
var jugadorSprite = new SpriteInfo(jugadorImagen, 1, 1, jugadorSpriteFrame)*/
//inicializarGraficos();
config.suscribe(inicializarGraficos)
function inicializarGraficos() {
    //cargarGraficosPersonajes("Data/graficos/jugador_gfx.json", jugador)
    personajes.forEach(personaje=>{
        cargarGraficosPersonajes(config.personajesGraficos[personaje.id] , personaje)
    })
    props.forEach(prop=>{
        cargarGraficosProp(config.propsGraficos[prop.id] , prop)
    })
    //cargarGraficosPersonajes("Data/graficos/gallina_gfx.json", jugador)
}
function update(deltaTime) {

    if (!config.Ready()) {
        return;
    }

    //console.log("Tile graficos")
    //console.log(config.tilesGraficos)

    //context.fillStyle = "#184666"
    context.fillStyle = "#9BD4C3"//Color del agua
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    for (let i = 0; i < configuracion.largoMundo; i++) {
        for (let j = 0; j < configuracion.largoMundo; j++) {
            if (!(mundo[i][j].instance in spriteTiles)) {
                /*console.log("tile: ");
                console.log(mundo[i][j]);
                console.log("graf: ");
                console.log(config.tilesGraficos[mundo[i][j].id]);
                cargarGraficosTile(config.tilesGraficos[mundo[i][j].id], mundo[i][j]);*/
                var imagen = new Image()
                imagen.src = config.tilesGraficos[mundo[i][j].id].source
                var spriteFrame = new SpriteFrame(config.tilesGraficos[mundo[i][j].id].spriteFrame.sx, config.tilesGraficos[mundo[i][j].id].spriteFrame.sy, config.tilesGraficos[mundo[i][j].id].spriteFrame.sLargo, config.tilesGraficos[mundo[i][j].id].spriteFrame.sAlto)
                var direcciones = config.tilesGraficos[mundo[i][j].id].direcciones;
                var sprite = new TileSpriteInfo(imagen, 1, 1, spriteFrame, direcciones)
                spriteTiles[mundo[i][j].instance] = sprite
            }
            else {
                //dibujarSprite(spriteTiles[mundo[i][j].instance], i, j) 
                dibujarTile(deltaTime, mundo, mundo[i][j].instance, spriteTiles[mundo[i][j].instance], i, j)
            }
            //dibujarSprite(config.tilesGraficos[mundo[i][j].id], i, j)
        }
    }
    //dibujarSprite(jugadorSprite, jugador.x, jugador.y)
    //Dibujar personajes
    for (const [key, value] of Object.entries(spriteJugadores)) {
        //console.log("Dibujando sprite: " + personajes[key]);
        dibujarSprite(deltaTime, personajes[key], value, personajes[key].x, personajes[key].y)
    }
    //Dibujar props
    for (const [key, value] of Object.entries(spriteProps)) {
        //console.log("Dibujando prop sprite: " + props[key]);
        dibujarProp(deltaTime, props[key], value, props[key].x, props[key].y)
    }

    debugGraficos.debugGraficos();
    //requestAnimationFrame(update)
}

function obtenerTile(x, y) {
    return mundo[x][y];
}

function dibujarSprite(deltaTime, personaje, sprite, x, y) {
    sprite.dibujar(deltaTime, personaje, x, y)
}
function dibujarProp(deltaTime, prop, sprite, x, y) {
    sprite.dibujar(deltaTime, prop, x, y)
}
function dibujarTile(deltaTime, mundo, instance, sprite, x, y) {
    if (sprite) {
        sprite.refrescar(deltaTime, mundo, x, y)
        sprite.dibujar(deltaTime, instance, x, y)
    }
    else {
        context.fillStyle = "black"
        context.fillRect(x * zoom, y * zoom, zoom, zoom);
    }
}
function cargarGraficosPersonajes(data, personaje) {
        var imagen = new Image()
        imagen.src = data.source
        var direcciones = data.direcciones
        var sprite = new SpriteInfo(imagen, 1, 1, new SpriteFrame(), direcciones,data.tamano)
        sprite.x = personaje.x
        sprite.y = personaje.y
        spriteJugadores[personaje.instance] = sprite
}
function cargarGraficosProp(data, prop) {
    var imagen = new Image()
    imagen.src = data.source
    var direcciones = data.direcciones
    var sprite = new SpriteProp(imagen, data.largo, data.alto, data.spriteFrame)
    spriteProps[prop.instance] = sprite
}
function cargarGraficosTile(data, tile) {
    console.log("Fetching: " + data.source);
    fetch(data.source)
        .then((response) => response.json())
        .then((json) => {
            console.log("json res: ");
            console.log(json);
            var imagen = new Image()
            imagen.src = json["source"]
            var spriteFrame = new SpriteFrame(json["spriteFrame"].sx, json["spriteFrame"].sy, json["spriteFrame"].sLargo, json["spriteFrame"].sAlto)
            var sprite = new SpriteInfo(imagen, 1, 1, spriteFrame)
            spriteTiles[tile.id] = sprite
        })
}
const mapaBinarios = [];
mapaBinarios[0] = "00000000"
mapaBinarios[1] = "00000001"
mapaBinarios[2] = "00000010"
mapaBinarios[3] = "00000011"
mapaBinarios[4] = "00000100"
mapaBinarios[5] = "00000101"
mapaBinarios[6] = "00000110"
mapaBinarios[7] = "00000111"
mapaBinarios[8] = "00001000"
mapaBinarios[9] = "00001001"
mapaBinarios[10] = "00001010"
mapaBinarios[11] = "00001011"
mapaBinarios[12] = "00001100"
mapaBinarios[13] = "00001101"
mapaBinarios[14] = "00001110"
mapaBinarios[15] = "00001111"
mapaBinarios[16] = "00010000"
mapaBinarios[17] = "00010001"
mapaBinarios[18] = "00010010"
mapaBinarios[19] = "00010011"
mapaBinarios[20] = "00010100"
mapaBinarios[21] = "00010101"
mapaBinarios[22] = "00010110"
mapaBinarios[23] = "00010111"
mapaBinarios[24] = "00011000"
mapaBinarios[25] = "00011001"
mapaBinarios[26] = "00011010"
mapaBinarios[27] = "00011011"
mapaBinarios[28] = "00011100"
mapaBinarios[29] = "00011101"
mapaBinarios[30] = "00011110"
mapaBinarios[31] = "00011111"
mapaBinarios[32] = "00100000"
mapaBinarios[33] = "00100001"
mapaBinarios[34] = "00100010"
mapaBinarios[35] = "00100011"
mapaBinarios[36] = "00100100"
mapaBinarios[37] = "00100101"
mapaBinarios[38] = "00100110"
mapaBinarios[39] = "00100111"
mapaBinarios[40] = "00101000"
mapaBinarios[41] = "00101001"
mapaBinarios[42] = "00101010"
mapaBinarios[43] = "00101011"
mapaBinarios[44] = "00101100"
mapaBinarios[45] = "00101101"
mapaBinarios[46] = "00101110"
mapaBinarios[47] = "00101111"
mapaBinarios[48] = "00110000"
mapaBinarios[49] = "00110001"
mapaBinarios[50] = "00110010"
mapaBinarios[51] = "00110011"
mapaBinarios[52] = "00110100"
mapaBinarios[53] = "00110101"
mapaBinarios[54] = "00110110"
mapaBinarios[55] = "00110111"
mapaBinarios[56] = "00111000"
mapaBinarios[57] = "00111001"
mapaBinarios[58] = "00111010"
mapaBinarios[59] = "00111011"
mapaBinarios[60] = "00111100"
mapaBinarios[61] = "00111101"
mapaBinarios[62] = "00111110"
mapaBinarios[63] = "00111111"
mapaBinarios[64] = "01000000"
mapaBinarios[65] = "01000001"
mapaBinarios[66] = "01000010"
mapaBinarios[67] = "01000011"
mapaBinarios[68] = "01000100"
mapaBinarios[69] = "01000101"
mapaBinarios[70] = "01000110"
mapaBinarios[71] = "01000111"
mapaBinarios[72] = "01001000"
mapaBinarios[73] = "01001001"
mapaBinarios[74] = "01001010"
mapaBinarios[75] = "01001011"
mapaBinarios[76] = "01001100"
mapaBinarios[77] = "01001101"
mapaBinarios[78] = "01001110"
mapaBinarios[79] = "01001111"
mapaBinarios[80] = "01010000"
mapaBinarios[81] = "01010001"
mapaBinarios[82] = "01010010"
mapaBinarios[83] = "01010011"
mapaBinarios[84] = "01010100"
mapaBinarios[85] = "01010101"
mapaBinarios[86] = "01010110"
mapaBinarios[87] = "01010111"
mapaBinarios[88] = "01011000"
mapaBinarios[89] = "01011001"
mapaBinarios[90] = "01011010"
mapaBinarios[91] = "01011011"
mapaBinarios[92] = "01011100"
mapaBinarios[93] = "01011101"
mapaBinarios[94] = "01011110"
mapaBinarios[95] = "01011111"
mapaBinarios[96] = "01100000"
mapaBinarios[97] = "01100001"
mapaBinarios[98] = "01100010"
mapaBinarios[99] = "01100011"
mapaBinarios[100] = "01100100"
mapaBinarios[101] = "01100101"
mapaBinarios[102] = "01100110"
mapaBinarios[103] = "01100111"
mapaBinarios[104] = "01101000"
mapaBinarios[105] = "01101001"
mapaBinarios[106] = "01101010"
mapaBinarios[107] = "01101011"
mapaBinarios[108] = "01101100"
mapaBinarios[109] = "01101101"
mapaBinarios[110] = "01101110"
mapaBinarios[111] = "01101111"
mapaBinarios[112] = "01110000"
mapaBinarios[113] = "01110001"
mapaBinarios[114] = "01110010"
mapaBinarios[115] = "01110011"
mapaBinarios[116] = "01110100"
mapaBinarios[117] = "01110101"
mapaBinarios[118] = "01110110"
mapaBinarios[119] = "01110111"
mapaBinarios[120] = "01111000"
mapaBinarios[121] = "01111001"
mapaBinarios[122] = "01111010"
mapaBinarios[123] = "01111011"
mapaBinarios[124] = "01111100"
mapaBinarios[125] = "01111101"
mapaBinarios[126] = "01111110"
mapaBinarios[127] = "01111111"
mapaBinarios[128] = "10000000"
mapaBinarios[129] = "10000001"
mapaBinarios[130] = "10000010"
mapaBinarios[131] = "10000011"
mapaBinarios[132] = "10000100"
mapaBinarios[133] = "10000101"
mapaBinarios[134] = "10000110"
mapaBinarios[135] = "10000111"
mapaBinarios[136] = "10001000"
mapaBinarios[137] = "10001001"
mapaBinarios[138] = "10001010"
mapaBinarios[139] = "10001011"
mapaBinarios[140] = "10001100"
mapaBinarios[141] = "10001101"
mapaBinarios[142] = "10001110"
mapaBinarios[143] = "10001111"
mapaBinarios[144] = "10010000"
mapaBinarios[145] = "10010001"
mapaBinarios[146] = "10010010"
mapaBinarios[147] = "10010011"
mapaBinarios[148] = "10010100"
mapaBinarios[149] = "10010101"
mapaBinarios[150] = "10010110"
mapaBinarios[151] = "10010111"
mapaBinarios[152] = "10011000"
mapaBinarios[153] = "10011001"
mapaBinarios[154] = "10011010"
mapaBinarios[155] = "10011011"
mapaBinarios[156] = "10011100"
mapaBinarios[157] = "10011101"
mapaBinarios[158] = "10011110"
mapaBinarios[159] = "10011111"
mapaBinarios[160] = "10100000"
mapaBinarios[161] = "10100001"
mapaBinarios[162] = "10100010"
mapaBinarios[163] = "10100011"
mapaBinarios[164] = "10100100"
mapaBinarios[165] = "10100101"
mapaBinarios[166] = "10100110"
mapaBinarios[167] = "10100111"
mapaBinarios[168] = "10101000"
mapaBinarios[169] = "10101001"
mapaBinarios[170] = "10101010"
mapaBinarios[171] = "10101011"
mapaBinarios[172] = "10101100"
mapaBinarios[173] = "10101101"
mapaBinarios[174] = "10101110"
mapaBinarios[175] = "10101111"
mapaBinarios[176] = "10110000"
mapaBinarios[177] = "10110001"
mapaBinarios[178] = "10110010"
mapaBinarios[179] = "10110011"
mapaBinarios[180] = "10110100"
mapaBinarios[181] = "10110101"
mapaBinarios[182] = "10110110"
mapaBinarios[183] = "10110111"
mapaBinarios[184] = "10111000"
mapaBinarios[185] = "10111001"
mapaBinarios[186] = "10111010"
mapaBinarios[187] = "10111011"
mapaBinarios[188] = "10111100"
mapaBinarios[189] = "10111101"
mapaBinarios[190] = "10111110"
mapaBinarios[191] = "10111111"
mapaBinarios[192] = "11000000"
mapaBinarios[193] = "11000001"
mapaBinarios[194] = "11000010"
mapaBinarios[195] = "11000011"
mapaBinarios[196] = "11000100"
mapaBinarios[197] = "11000101"
mapaBinarios[198] = "11000110"
mapaBinarios[199] = "11000111"
mapaBinarios[200] = "11001000"
mapaBinarios[201] = "11001001"
mapaBinarios[202] = "11001010"
mapaBinarios[203] = "11001011"
mapaBinarios[204] = "11001100"
mapaBinarios[205] = "11001101"
mapaBinarios[206] = "11001110"
mapaBinarios[207] = "11001111"
mapaBinarios[208] = "11010000"
mapaBinarios[209] = "11010001"
mapaBinarios[210] = "11010010"
mapaBinarios[211] = "11010011"
mapaBinarios[212] = "11010100"
mapaBinarios[213] = "11010101"
mapaBinarios[214] = "11010110"
mapaBinarios[215] = "11010111"
mapaBinarios[216] = "11011000"
mapaBinarios[217] = "11011001"
mapaBinarios[218] = "11011010"
mapaBinarios[219] = "11011011"
mapaBinarios[220] = "11011100"
mapaBinarios[221] = "11011101"
mapaBinarios[222] = "11011110"
mapaBinarios[223] = "11011111"
mapaBinarios[224] = "11100000"
mapaBinarios[225] = "11100001"
mapaBinarios[226] = "11100010"
mapaBinarios[227] = "11100011"
mapaBinarios[228] = "11100100"
mapaBinarios[229] = "11100101"
mapaBinarios[230] = "11100110"
mapaBinarios[231] = "11100111"
mapaBinarios[232] = "11101000"
mapaBinarios[233] = "11101001"
mapaBinarios[234] = "11101010"
mapaBinarios[235] = "11101011"
mapaBinarios[236] = "11101100"
mapaBinarios[237] = "11101101"
mapaBinarios[238] = "11101110"
mapaBinarios[239] = "11101111"
mapaBinarios[240] = "11110000"
mapaBinarios[241] = "11110001"
mapaBinarios[242] = "11110010"
mapaBinarios[243] = "11110011"
mapaBinarios[244] = "11110100"
mapaBinarios[245] = "11110101"
mapaBinarios[246] = "11110110"
mapaBinarios[247] = "11110111"
mapaBinarios[248] = "11111000"
mapaBinarios[249] = "11111001"
mapaBinarios[250] = "11111010"
mapaBinarios[251] = "11111011"
mapaBinarios[252] = "11111100"
mapaBinarios[253] = "11111101"
mapaBinarios[254] = "11111110"
mapaBinarios[255] = "11111111"
function binarioAString(binario) {
    return mapaBinarios[binario];
}