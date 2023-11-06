"use strict";

//unifico en esta clase el FourInLine y Settings Juego
/*-----------------------------------Variable---------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function(event) {

    //selecciona los elementos del DOM
    let canvas = document.querySelector('#board');
    let startGame = document.querySelector('#btn-juego');
    let restartGame = document.querySelector ("#start-game");
    let winnerInfo = document.querySelector('#winner-info');
    let drawInfo = document.querySelector('#draw-info');
    let game;
    let temporizador;


    let fichaJ1;
    let fichaJ2;
    let player1;
    let player2;
    let imagenFicha1;
    let imagenFicha2;
    let modoJuego = "4 en línea";
    let cantFichasParaGanar;
    let FICHAS_INICIALES;
    let FILAS;
    let COLUMNAS;
    let RADIO;
    let jugadorFicha1;
    let jugadorFicha2;
  

/*--------------------------------------Setting-------------------------------------------------------------------------*/
    // Seleccion del tipo de juego 
    const boardSettings = document.querySelector('.board-settings');
    const radioInputs = boardSettings.getElementsByTagName('input');

    // Itera sobre los elementos
    for (const input of radioInputs) {
        // Verifica que el input sea de tipo radio y tenga el atributo name igual a "board-lines"
        if (input.type === 'radio' && input.name === 'board-lines') {
            input.addEventListener('click', () => {
                modoJuego = input.value;
                console.log(modoJuego);
            });
        }
}
    

    // Selección de fichas del jugador 1
    let fichas1 = document.querySelectorAll('input[name="f1"]');
    fichas1.forEach(ficha => {
        ficha.addEventListener('change', (e) =>{
            fichaJ1 = e.target.value;
            jugadorFicha1 = e.target.name;
            console.log(fichaJ1);



           // let jugador1 = Token.getTokekImage(fichaJ1, jugadorFicha1);
            
        });
    });
    // Selección de fichas del jugador 2
    let fichas2 = document.querySelectorAll('input[name="f2"]');
    fichas2.forEach(ficha => {
        ficha.addEventListener('change', (e) =>{
            fichaJ2 = e.target.value;
            jugadorFicha2 = e.target.name;
            console.log(fichaJ2);
            //let jugador2 = Token.getTokekImage(fichaJ2, jugadorFicha2);
        });
    });



    




   

    //Cuando se hace click en Jugar, verifica si se eligio modo y fichas
    startGame.addEventListener('click',  ()=> {
        

           // e.preventDefault();
            
            if(checkSettings()) {

                
                playGame(FILAS, COLUMNAS, RADIO);
                
            }
                
        });
  

    function checkSettings() {

        if(fichaJ1 && fichaJ2) {

            console.log("fichas elegidas")
           


            
            //Se asignan las imagenes de las fichas de cada equipo.
            imagenFicha1 = new Image();
            imagenFicha1.src = fichaJ1;
            imagenFicha2 = new Image();
            imagenFicha2.src = fichaJ2;
            //fondoCanvas = new Image();
            // fondoCanvas.src = 'img/fondoJuego.png';
            // fondoCanvas.onload = clearCanvas();



            //Se define el tamaño del tablero.
            console.log("Modo de juego:", modoJuego);
            switch (modoJuego) {
                case '4 en línea':
                    FILAS = 6;
                    COLUMNAS = 7;
                    cantFichasParaGanar = 4;
                    RADIO = 25;
                    break;
                case '5 en línea':
                    FILAS = 7;
                    COLUMNAS = 8;
                    cantFichasParaGanar = 5;
                    RADIO = 23;
                    break;
                case '6 en línea':
                    FILAS = 8;
                    COLUMNAS = 9;
                    cantFichasParaGanar = 6;
                    RADIO = 21;
                    break;
                case '7 en línea':
                    FILAS = 9;
                    COLUMNAS = 10;
                    cantFichasParaGanar = 7;
                    RADIO = 19;
                    break;
                default:
                    FILAS = 6;
                    COLUMNAS = 7;
                    cantFichasParaGanar = 4;
                    
            }
            console.log("FILAS:", FILAS, "COLUMNAS:", COLUMNAS);
        return true;
        }
        else {
            showErrorMsg("Selecciona el tipo de juego y las fichas para ambos jugadores.");
            return false;
        }
        
    }

    function showErrorMsg(msg) {
        let section = document.querySelector(".msg");
        let el = document.createElement("h3");
        el.innerHTML = msg;
        section.appendChild(el);
    
        setTimeout(() => {
            el.innerText = "";
            section.removeChild(el);
        }, 2000);
    }






/*-----------------------------------------------------Four In Line------------------------------------------------------------------*/
 

    //inicia un nuevo juego
    const playGame = ()  => {
         // Oculta el contenido actual
         document.querySelector('#img-juego').style.display = 'none';
         document.querySelector('#game-settings').style.display = 'none';

         // Muestra el canvas-container
         document.querySelector('.ocultarCanvas').style.display = 'block';
        game = new Game(canvas, FILAS, COLUMNAS, RADIO);

      

        game.prepareGame(FILAS, COLUMNAS);

        iniciarTemporizador();
                //inicializamos las variables del juego      
                FICHAS_INICIALES = Math.round(FILAS * COLUMNAS / 2);  
                
                
                console.log("boton clickeado");

       /* winnerInfo.classList.add('hide');
        drawInfo.classList.add('hide');*/
    }

    //verifica si se hizo click en una ficha
    const onMouseDown = e => {
        let x = e.layerX - e.currentTarget.offsetLeft;
        let y = e.layerY - e.currentTarget.offsetTop;            
        game.isClickedToken(x, y);
    }

    //mueve la ficha en el canvas
    const onMouseMove = e => {
        let x = e.layerX - e.currentTarget.offsetLeft;
        let y = e.layerY - e.currentTarget.offsetTop;   
        if (game.haveClickedToken())
            game.moveToken(x, y);
    }

    //inserta la ficha en la posicion que fue soltada
    const onMouseUp = e => {
        let x = e.layerX - e.currentTarget.offsetLeft;
        let y = e.layerY - e.currentTarget.offsetTop;
        if (game.haveClickedToken()){
            game.insertToken(x,y);    
        }
    }
    
    // Función para iniciar el temporizador
    const iniciarTemporizador = () => {
    let tiempoRestante = 60;
    const timerDisplay = document.getElementById('countdown');
    temporizador = setInterval(() => {
        let minutos = Math.floor(tiempoRestante / 60);
        let segundos = tiempoRestante % 60;
        segundos = segundos < 10 ? '0' + segundos : segundos;
        timerDisplay.textContent = "Tiempo restante: " +`${minutos}:${segundos}`;
        tiempoRestante--;
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            //si se acaba el tiempo, se muestra un mensaje
            timerDisplay.textContent = "Se te acabó el tiempo";
            playGame();
           
        }
        
    }, 1000); // Actualizar el temporizador cada segundo (1000 ms)
}

const detenerTemporizador = () => {
   clearInterval(temporizador);
}

// Función para reiniciar el temporizador
const reiniciarTemporizador = () => {
    clearInterval(temporizador);
  //  detenerTemporizador(); // Detiene el temporizador actual si está en funcionamiento
    iniciarTemporizador(); // Inicia un nuevo temporizador
}


//agrega los respectivos eventos.
    startGame.addEventListener('click', playGame, false);
    startGame.addEventListener('click', iniciarTemporizador, false);
    restartGame.addEventListener ('click', playGame, false);
    restartGame.addEventListener('click', reiniciarTemporizador, false);
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mouseup', onMouseUp, false);

});






