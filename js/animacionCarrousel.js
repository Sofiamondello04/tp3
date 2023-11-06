const carrusel = document.querySelector(".animacion");

let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;

//  ScrollWidth: ancho total del contenido del elemento, incluyendo el contenido que está fuera de la vista, y que puede ser desplazado horizontalmente.
//  ClientWidth: representa el ancho visible del elemento en la ventana gráfica del navegador.
let intervalo = null;

let step = 0.1;

const start = () => {

    intervalo= setInterval (function () {
        carrusel.scrollLeft = carrusel.scrollLeft + step;
        if (carrusel.scrollLeft >= maxScrollLeft) {
            step = -1;
        } else if (carrusel.scrollLeft <= 0) {
            step = 1;
        }


    }, 10);
};




const stop = () => {
    clearInterval(intervalo);
};

carrusel.addEventListener('mouseover', () => {
    stop();
});

carrusel.addEventListener('mouseout', () => {
    start();
})




