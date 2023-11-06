class Game{
    //define todos los elementos que tendra el juego dentro del Canvas.
    constructor(canvas, filas, columnas, radio){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.board = new Board(this.context, filas, columnas, radio);
        this.player1 = new Player (this.context, 'Jugador 1', 1);
        this.player2 = new Player (this.context, 'Jugador 2', 2);
        this.tokens = [];
        this.turn = 1;
        this.currentToken = null;
        this.initialPositionX;
        this.initialPositionY;
        this.clickedToken = false;
        this.finishedGame = false;
        this.totalTokens = 42;
        this.drawInitialTokens();
        this.prepareGame(filas, columnas);
    }
    
    //define las posiciones donde iran las fichas de cada jugador.
    drawInitialTokens(){
        let xInitialPositionP1 = 50;
        let xInitialPositionP2 = 920;
        this.drawPlayerToken(xInitialPositionP1, 'p1', this.player1);
        this.drawPlayerToken(xInitialPositionP2, 'p2', this.player2);
    }
    //dibujas las fichas del jugador.
    drawPlayerToken(xInitial, param, jugador) {
        let tmpY = 130;
        for (let row = 0; row < 7; row++) {
            let tmpX = xInitial;
            for(let col = 0; col < 3; col++) {
                let token = new Token (tmpX, tmpY, param, jugador);
                token.setContext(this.context);
                this.tokens.push(token);
                tmpX += 65;
            }
            tmpY += 65;
        } 
    }
    /*inicializa el juego.
    startGame(filas, columnas) {
        this.board.drawBoard(filas, columnas);  
             
      
    }*/




    //prepara el juego.
    prepareGame(filas, columnas){ 
        
        console.log("Preparing game with rows:", filas, "columns:", columnas);
            
       
        this.board.drawBoard(filas, columnas);
        console.log("Board drawn in startGame.");  
              
        this.setTokens();
        
        this.checkCurrentTurn();
       
    }
    //inserta las fichas.
    setTokens() {
        for (let i = 0; i < this.tokens.length; i++){
            this.tokens[i].draw();
        }
    }
    //chequea a quien le corresponde mover la ficha.
    checkCurrentTurn() {
        if (this.turn === 1){
            document.querySelector('#J1').classList.add('current-shift');
            document.querySelector('#J2').classList.remove('current-shift');
        }
        else if(this.turn === 2) {
            document.querySelector('#J2').classList.add('current-shift');
            document.querySelector('#J1').classList.remove('current-shift');
        }
        else{
            document.querySelector('#J1').classList.remove('current-shift');
            document.querySelector('#J2').classList.remove('current-shift');
        }
    }

    isClickedToken(x, y) {       
        for (let i=0; i<this.tokens.length; i++) {
                let fichaTmp = this.tokens[i];
            if (fichaTmp.isClicked(x, y) && fichaTmp.getPlayer() === this.turn && fichaTmp.getStatus() !== 'inactiva' && !this.finishedGame) {
                this.currentToken = fichaTmp;
                this.clickedToken = true;
                this.tokens.splice(i,1);     
                this.initialPositionX = this.currentToken.x;
                this.initialPositionY = this.currentToken.y;    
                return true;
            }                
        }
    }

    haveClickedToken() {
        return this.clickedToken;
    }
    //genera el desplazamiento de la ficha.
    moveToken(x, y) {
        this.currentToken.x = x;
        this.currentToken.y = y;
        this.tokens.push(this.currentToken);
        this.prepareGame();
    }
    //vuelve la ficha a su posicion original.
    resetclickedToken() {
        this.currentToken = null;
        this.clickedToken = false;
    }
    //inserta la ficha donde corresponda segun donde se la haya colocado.
    insertToken(x, y){

        if(this.board.couldInsertToken(x, y, this.currentToken)){
            this.totalTokens--;
            if (this.isWinner()) {
                let winnerMessage = document.getElementById('winner-info');
                if(this.turn === 1)
                    winnerMessage.innerHTML = 'Ganador: Jugador 1!';
                else
                    winnerMessage.innerHTML = 'Ganador: Jugador2!';
                winnerMessage.classList.remove('hide');
                this.finishedGame = true;
            }
            else if(this.totalTokens === 0){
                this.finishedGame = true;
                let alert = document.getElementById('draw-info');
                alert.classList.remove('hide');
            }
            else
                this.turn = (this.turn === 1) ? 2:1;
        }
        else{
            this.currentToken.x = this.initialPositionX;
            this.currentToken.y = this.initialPositionY;
            this.tokens.push(this.currentToken);
        }
        this.resetclickedToken();
        this.prepareGame();
    }
    //chequea si hay alguna jugada ganadora
    isWinner(){
        let isWinner = false;
        if(this.board.checkVertical() || this.board.checkHorizontal() ||
        this.board.checkHorizontal() || this.board.checkDiagonal()) 
            isWinner = true;
        return isWinner;
    }

    

}