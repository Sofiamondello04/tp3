"use strict";
class Token{
    //constructor de la ficha.
    constructor(x, y, param, player, radio){
        this.x = x;
        this.y = y;
        this.radio = radio;  // Ajusta el tamaño de las fichas
        this.player = player;
        this.status = '';
        this.highlighted = false;
        this.image = new Image();
        this.getTokekImage(param);
}
    
  getTokekImage(param, jugador) {
        if(jugador === 'f1')
            this.image.src = './images/fichas/Pato1.png'; //ficha jugador 1.
        else if (param === 'f2')
            this.image.src = 'images/fichas/Milei1.png'; //ficha jugador 2.
         /*else if (param === 'empty')
            this.image.src = './images/ficha-vacia.png'; //espacio donde va la ficha a insertar en el tablero.*/
    }
   
  
    //retorna el jugador actual.
    getPlayer(){
        if (this.player === 0)
            return this.player;
        else 
            return this.player.getPlayerNumber();
    }
    //retorna el nombre del jugador actual.
    getName() {
        return this.player.getName();
    }
    //retorna el estado del jugador actual.
    getStatus() {
        return this.status;
    }

    setContext(context){
        this.context = context;
    }
    setHighlighted(value) {
        this.highlighted = value;
    }
    //setea la posicion en x.
    setX(x) {
        this.x = x;
    }
    //setea la posicion en y.
    setY(y) {
        this.y = y;
    }

    //setea el status
    setStatus(status) {
        this.status = status;
    }
    //Devuelve si se hizo click dentro de la ficha
    isClicked(x, y) {
        var xLayer = x - this.x;
        var yLayer = y - this.y;
        return Math.sqrt(xLayer*xLayer + yLayer*yLayer) < this.radio;
    }

    draw(){
        //Dibuja la ficha
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radio, 0, Math.PI*2);
        this.context.shadowBlur = 5;
        this.context.shadowColor = "blue";
        this.context.fillStyle = 'rgba(194, 182, 246, 0.5)' ;
        this.context.fill();
        if (this.highlighted === true) {
            this.context.strokeStyle = this.highlightedStyle;
            this.context.lineWidth = 5;
            this.context.stroke();
        }
        //Dibuja la ficha en la posicion indicada
        this.context.drawImage(this.image, this.x - this.radio - 6, this.y - this.radio - 6);
        this.context.closePath();
        this.image.onload = () => {
        };
    }
}
	

