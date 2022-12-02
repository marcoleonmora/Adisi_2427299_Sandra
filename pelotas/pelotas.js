/**
 * Controlador de la animación de imagenes
 * en el canvas
 * MLM
 */


//++++ VARIABLES GLOBALES ++++++++++++++++++
var canvas = null;
var ctx = null;
var ancho = 1000;
var alto = 550;
var g = 0;   //gravedad
var maxVel = 10;
const COLOR_NAMES = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
  ];

var numObjetos = 30;        //Cantidad dfe objetos
var listaObjetos = [];



/**
 * Cargue y configuración inicial
 */
window.addEventListener('load', function() {
    canvas = this.document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = ancho;
    canvas.height = alto;

    for (let i = 0; i < numObjetos; i++) {
        listaObjetos.push(new Triangulo());  
    }

    run();
});

function run() {
    borrar();

    for (let i = 0; i < numObjetos; i++) {
        listaObjetos[i].dibujar();
        listaObjetos[i].actualizar();  
    }

    requestAnimationFrame(run);
}

function borrar() {
    ctx.beginPath();
    //Fondo
    ctx.fillStyle = "Azure";        //Color de relleno
    ctx.fillRect(0, 0, ancho, alto);
    ctx.strokeStyle = "yellow";     //Grosor de la linea
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, ancho, alto);
    ctx.stroke();
}




/**************  CLASE ************************************************ */

class Objeto {
    constructor() {
        this.r = aleatorio(5, 20);
        this.pos = {'x': aleatorio(this.r, ancho -this.r),
        'y': aleatorio(this.r, alto -this.r)  }
        this.vel = {'x': aleatorio(-maxVel, maxVel),
        'y': aleatorio(-maxVel, maxVel)  } 
        this.color = asignarColor();
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI);
        ctx.fillStyle= this.color;
        ctx.strokeStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    actualizar() {
        //Aceleración de la gravedad
        this.vel.y += g;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.rebotar();
    }
    rebotar() {
        if ((this.pos.x >= ancho - this.r) || (this.pos.x <= this.r)){
            this.vel.x *= -1;
        }
        if ((this.pos.y >= alto - this.r) || (this.pos.y <= this.r)){
            this.vel.y *= -1;
        }
        
    }
}

class Triangulo extends Objeto{

    dibujar() {
        let p1 = {'x': this.pos.x, 'y': this.pos.y - this.r};
        let p2 = {'x': this.pos.x + this.r , 'y': this.pos.y};
        let p3 = {'x': this.pos.x - this.r , 'y': this.pos.y};

        ctx.beginPath();
        ctx.fillStyle= this.color;
        ctx.strokeStyle = this.color;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

}
//

//************** FUNCIONES AUXILIARES *****************/

//Genera un numero entero al azar entre min y max
function aleatorio(min, max){
	return Math.round(min + Math.random()*(max-min));
}

function asignarColor(){
    indice = aleatorio(0, COLOR_NAMES.length);
    return COLOR_NAMES[indice];
}

/*
	//Dibuja el objeto en el canvas 
mostrar(){
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.stroke();
}

/* DEFINICION DE LA CLASE *****************************************
class Burbuja {
    constructor() {
        this.r = aleatorio(8, 15);
        this.x = aleatorio(0 + this.r, canvasW-this.r);
        this.y = aleatorio(canvasH - 30, canvasH - 20);
    }
*/

