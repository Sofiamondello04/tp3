

class Board{

    //Se crea el tablero
    constructor(context, filas, columnas, radio) {
        this.context = context;
        this.radio = radio;
        this.filas = filas;
        this.columnas = columnas;
        this.slot = [];
        this.slotX = [];
        this.slotY = [];
        this.topY = 93;
        this.initialSlotWinner = {'x':-1, 'y':-1};
        this.finalSlotWinner = {'x':-1, 'y':-1};
        this.winnerPosition = '';
        this.initSlot(filas, columnas, radio);
    }

   
    
    //inicializa las ranuras de entrada par alas fichas.
   /* initSlot(filas,columnas) {
        let diferenciaX = 95;
        let diferenciaY = 65;
        let fxInit = 320;
        let fy = 130;
        for (let y = 0; y < filas; y++) {
            let fx = fxInit;
            this.slot[fy+'-row'] = [];
            for (let x = 0; x < columnas; x++) {
                let token = new Token (fx, fy, 'slot', 0);
                token.setContext(this.context);  
                this.slot[fy+'-row'][fx+'-col'] = token;
                this.slotX.push(fx);
                fx += diferenciaX;
            } 
            this.slotY.push(fy);
            fy += diferenciaY;           
        }
    }*/
    initSlot(filas, columnas, radio) {
        let diferenciaX = 55; //95
        let diferenciaY = 55; //65
        let fxInit = 320; //320
        let fy = 130;
        for (let y = 0; y < filas; y++) {
            let fx = fxInit;
            this.slot[y] = []; // Cambiado de fy + '-row' a y
            for (let x = 0; x < columnas; x++) {
                let token = new Token(fx, fy, 'slot', 0, radio);
                token.setContext(this.context);
                this.slot[y][x] = token;
                console.log(`Initialized row ${y} column ${x}:`, this.slot[y][x]); // Cambiado de fy + '-row' a y
                this.slotX.push(fx);
                fx += diferenciaX;
            }
            console.log(`Initialized row ${y}:`, this.slot[y]);
            this.slotY.push(fy);
            fy += diferenciaY;
        }
    }

 
    
    //crea el tablero base onde se colocan las fichas y el tablero del juego.
    /*drawBoard() {
        console.log("Drawing board...");
        this.context.fillStyle = '#C2B6F6';//color del fondo.
        this.context.fillRect(0,0,1100,550);//Dibuja un rectángulo que representa el fondo del tablero en las coordenadas (0, 0) con un ancho de 1100 y una altura de 550.

        this.context.fillStyle=  "#5335CC" ; //color del tablero.

    
        this.context.fillRect(260,95,600,460);
        for (let row = 0; row < this.slotX.length; row++) {
            for (let col = 0; col < this.slotY.length; col++) {
                let token = this.slot[this.slotY[col]+'-row'][this.slotX[row]+'-col'];
                token.draw();
            }   
        }
        console.log("Board drawn.");
    }*/

    drawBoard(filas, columnas) {
      
        console.log("Drawing board with rows:", filas, "columns:", columnas);
    
        this.context.fillStyle = '#C2B6F6';//color del fondo.
        this.context.fillRect(0,0,1100,550);//Dibuja un rectángulo que representa el fondo del tablero en las coordenadas (0, 0) con un ancho de 1100 y una altura de 550.

        this.context.fillStyle=  "#5335CC" ; //color del tablero.
       // this.context.fillRect(260,95,600,460);

       for (let f= 0; f <filas; f++) {
        if (this.slot[f]) {  // Verifica si la fila está definida
            for (let c=0; c <columnas; c++) {
                if (this.slot[f][c]) {
                    let token = this.slot[f][c];
                    token.draw();
                } 
                else {
                    console.log(`Position ${f}-${c} is undefined.`);
                }
            } 
        }
        else {
                console.log(`Row ${f} is undefined.`);
        }
                
                
        }

    
        console.log("Board drawn.");
    }

  
    

    couldInsertToken(x, y, currentToken) {
        if (y < this.topY && x > 250 && x < 850)
            return this.searchSlot(x, currentToken);
        return false;
    } 
    //busca una ranura habilitada para insertar la ficha.
    searchSlot(x, currentToken) {
        for(let i = 0; i < 7; i++) {
            if (this.slotX[i] > x - 25 && this.slotX[i] < x + 25){
                return this.insertToken(this.slotX[i], currentToken);
            }                    
        };
        return false;
    }
    //inserta la ficha en una posicion.
    insertToken(x, currentToken) {
        let posTmpY = -1;
        let couldInsert = false;        

        for (let y = 0; y < this.slotY.length; y++) {
            let tmpy = this.slotY[y];
            if (this.slot[tmpy+'-row'][x+'-col'].getPlayer() === 0){
                posTmpY = tmpy;
                couldInsert = true;
            }
        }
        if (posTmpY !== -1) {
            currentToken.setX(x);
            currentToken.setY(posTmpY);
            currentToken.setStatus('inactive');
            this.slot[posTmpY+'-row'][x+'-col'] = currentToken;
        }        
        return couldInsert;  
    }
    //chequea verticalmente si hay algun ganador.
    checkVertical() {
        let count = 0;
        let player = -1;
        let isWinner = false;
        
        for (let col = 0; col < 6; col++) {
            count = 0;
            for (let row = 0; row < 7; row++) {
                let token = this.slot[this.slotY[row]+'-row'][this.slotX[col]+'-col'];
                let valor = token.getPlayer();
                if (valor === 0) {
                    count = 0;
                    player = -1;
                }
                else if (valor !== player){
                    player = valor;
                    count = 1;
                    this.initialSlotWinner.x = col;
                    this.initialSlotWinner.y = row;
                }
                else
                    count++;
                //si hay un ganador retorna el resultado.
                if (count === 4){                    
                    isWinner = true; 
                    this.winnerPosition = 'vertical';
                    this.finalSlotWinner.x = col;
                    this.finalSlotWinner.y = row;                  
                    return isWinner;
                }                
            }
        }
        this.finalSlotWinner.x = -1;
        this.finalSlotWinner.y = -1;
        return isWinner;
    }
    //chequea horizontalmente si hay algun ganador.
    checkHorizontal() {
        let count = 0;
        let player = -1;
        let isWinner = false;
        
        for (let row = 0; row < 7; row++) {
            count = 0;
            for (let col = 0; col < 6; col++) {
                let token = this.slot[this.slotY[row]+'-row'][this.slotX[col]+'-col'];
                let valor = token.getPlayer();
                if (valor === 0) {
                    count = 0;
                    player = -1;
                }
                else if (valor !== player){
                    player = valor;
                    count = 1;
                    this.initialSlotWinner.x = col;
                    this.initialSlotWinner.y = row;
                }
                else
                    count++;
                //si hay un ganador retorna el resultado.
                if (count === 4){
                    isWinner = true;
                    this.winnerPosition = 'horizontal';
                    this.finalSlotWinner.x = col;
                    this.finalSlotWinner.y = row;
                    return isWinner;
                }
            }
        }
        this.finalSlotWinner.x = -1;
        this.finalSlotWinner.y = -1;
        return isWinner;
    }
    //chequea diagonalmente si hay algun ganador.
    checkDiagonal(){
        let isWinner = false;
        if (this.checkRightDiagonal() || this.checkLeftDiagonal())
            isWinner = true;
        return isWinner;
    }
    //chequea la diagonal derecha.
    checkRightDiagonal() {
        let isWinner = false;
        for (let row = 3; row < 7; row++) {
            for (let col = 0; col < 3; col++) {
                let valorTmpY = row;
                let valorTmpX = col;
                let valor = this.slot[this.slotY[valorTmpY]+'-row'][this.slotX[valorTmpX]+'-col'].getPlayer();
                let fourInLine = false;
                if (valor !== 0) {
                    for (let i = 0; i < 3; i++) {
                        valorTmpY--;
                        valorTmpX++;
                        let valorTmp = this.slot[this.slotY[valorTmpY]+'-row'][this.slotX[valorTmpX]+'-col'].getPlayer();
                        if (valor !== valorTmp)
                            break;
                        if (i === 2)
                            fourInLine = true;
                    }
                }
                //si hay un ganador retorna el resultado.
                if (fourInLine){
                    isWinner = true;
                    this.winnerPosition = 'rightDiagonal';
                    this.initialSlotWinner.x = col;
                    this.initialSlotWinner.y = row;
                    this.finalSlotWinner.x = valorTmpX;
                    this.finalSlotWinner.y = valorTmpY;
                    return isWinner;
                }
            }
        }
        this.finalSlotWinner.x = -1;
        this.finalSlotWinner.y = -1;
        return isWinner;
    }
    //chequea la diagonal izquierda.
    checkLeftDiagonal() {
        let isWinner = false;
        for (let row = 6; row > 2; row--) {
            for (let col = 5; col > 2; col--) {
                let valorTmpY = row;
                let valorTmpX = col;
                let valor = this.slot[this.slotY[valorTmpY]+'-row'][this.slotX[valorTmpX]+'-col'].getPlayer();
                let fourInLine = false;
                if (valor !== 0) {
                    for (let i = 0; i < 3; i++) {
                        valorTmpY--;
                        valorTmpX--;
                        let valorTmp = this.slot[this.slotY[valorTmpY]+'-row'][this.slotX[valorTmpX]+'-col'].getPlayer();
                        if (valor !== valorTmp)
                            break;
                        if (i === 2)
                            fourInLine = true;
                    }
                }
                //si hay un ganador retorna el resultado.
                if (fourInLine){
                    isWinner = true;
                    this.winnerPosition = 'leftDiagonal';
                    this.initialSlotWinner.x = col;
                    this.initialSlotWinner.y = row;
                    this.finalSlotWinner.x = valorTmpX;
                    this.finalSlotWinner.y = valorTmpY;                    
                    return isWinner;
                }
            }
        }
        this.finalSlotWinner.x = -1;
        this.finalSlotWinner.y = -1;
        return isWinner;
    }
}