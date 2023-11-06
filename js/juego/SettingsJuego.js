    "use strict";
    
 

    let modes = {
    "friendly": {
        "line": 4,
        "columns": 7,
        "rows": 6,
        "pieces": 21,
        "pieceSize": 25  // Tamaño de las fichas
    },
    "brave": {
        "line": 5,
        "columns": 8,
        "rows": 7,
        "pieces": 32,
        "pieceSize": 23  // Tamaño de las fichas
    },
    "clever": {
        "line": 6,
        "columns": 9,
        "rows": 8,
        "pieces": 45,
        "pieceSize": 21  // Tamaño de las fichas
    },
    "ambicious": {
        "line": 7,
        "columns": 10,
        "rows": 9,
        "pieces": 60,
        "pieceSize": 19  // Tamaño de las fichas
    }
    }

    const SETTINGS_BOX = document.querySelector("#game-settings");


    let current_mode = "friendly";  //Por defecto
    let player1;
    let player2;

 
    //Permite seleccionar la ficha con la que jugará cada participante



    

    // Seleccion del tipo de juego 

    let radioInputs = document.querySelectorAll("input");
    radioInputs.forEach((input) => {
        input.addEventListener("click", () => {
            current_mode = input.value;
            console.log(current_mode);
            
        });
    });

    //Seleccion fichas jugador 1

   
// Selección de fichas del jugador 1
let btnsContainerPlayer1 = document.querySelector("#player-1-piece-btns");
for (const btn of btnsContainerPlayer1.children) {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        selectPiece(btn, btnsContainerPlayer1, 1);
    });
}

// Selección de fichas del jugador 2
let btnsContainerPlayer2 = document.querySelector("#player-2-piece-btns");
for (const btn of btnsContainerPlayer2.children) {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        selectPiece(btn, btnsContainerPlayer2, 2);
    });
}


   /* function selectPiece(selectedBtn, btnsContainer, player) {
        //Por cada botón, quita la selección...
        for (const btn of btnsContainer.children) {
            btn.classList.remove("piece-settings-btn-active");
        }
        //Selecciona el correcto...
        selectedBtn.classList.add("piece-settings-btn-active");
        //Guarda los valores...

        if(player == 1) {
           player1 = selectedBtn.value;
        }
        else {
            player2 = selectedBtn.value;
        }
    }*/

    function selectPiece(selectedBtn, btnsContainer, player) {
        for (const btn of btnsContainer.children) {
            btn.classList.remove("piece-settings-btn-active");
        }
        selectedBtn.classList.add("piece-settings-btn-active");
    
        let backgroundImage = window.getComputedStyle(selectedBtn).getPropertyValue("background-image");
        let selectedImageSrc = backgroundImage.replace('url("', '').replace('")', '');
    
        if (player === 1) {
            player1 = selectedImageSrc; // Almacena la ruta para el jugador 1
            console.log(player1);
        } else {
            player2 = selectedImageSrc; // Almacena la ruta para el jugador 2
            console.log(player2);
        }
    }



  /*  function selectPiece(selectedBtn, btnsContainer, player) {
        for (const btn of btnsContainer.children) {
            btn.classList.remove("piece-settings-btn-active");
        }
        selectedBtn.classList.add("piece-settings-btn-active");
    
        let selectedImageSrc = selectedBtn.value; // Obtiene la ruta de la imagen del valor del botón
    
        if (player === 1) {
            player1 = selectedImageSrc; // Almacena la ruta para el jugador 1
            console.log(player1);
        } else {
            player2 = selectedImageSrc; // Almacena la ruta para el jugador 2
            console.log(player2);

        } 
    }*/
    





    function checkSettings() {
        if (!current_mode || !player1 || !player2) {
            showErrorMsg("Selecciona el tipo de juego y las fichas para ambos jugadores.");
            return false;
        }
        return true;
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

    const canvas = document.querySelector("#board"); 
    const context = canvas.getContext("2d");

    document.querySelector('#btn-juego').addEventListener('click', function () {
        if (checkSettings()) {


        // Oculta el contenido actual
        document.querySelector('#img-juego').style.display = 'none';
        document.querySelector('#game-settings').style.display = 'none';

        // Muestra el canvas-container
        document.querySelector('.ocultarCanvas').style.display = 'block';
        

        // Establece los eventos para los botones
       /* setFormBtnsEvents();*/
        }
    });

    
