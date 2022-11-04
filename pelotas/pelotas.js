/**
 * Controlador de la animación de imagenes
 * en el canvas
 * MLM
 */


//++++ VARIABLES GLOBALES ++++++++++++++++++
var canvas = null;
var ctx = null;
var ancho = 1000;
var alto = 700;

/**
 * Cargue y configuración inicial
 */
window.addEventListener('load', function() {
    canvas = this.document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = ancho;
    canvas.height = alto;
    ctx.fillStyle = "lightskyblue";
    ctx.fillRect(0, 0, ancho, alto);
});