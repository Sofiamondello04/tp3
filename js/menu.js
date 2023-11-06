"use strict";
let btnHamb = document.getElementById("hamb");
let menuHamb = document.querySelector('.menu-hamb');
let btnSesion = document.getElementById("sesion");
let menuSesion = document.querySelector('.menu-usuario');
let btnCarrito = document.getElementById("carrito");
let menuCarrito = document.querySelector('.menu-carrito');

btnHamb.addEventListener('click', () => {
    if (menuHamb.style.display === 'block') {
        menuHamb.style.display = 'none';
    } else {
        menuHamb.style.display = 'block';
    }
});

btnSesion.addEventListener('click', () => {
    if (menuSesion.style.display === 'block') {
        menuSesion.style.display = 'none';
    } else {
        menuSesion.style.display = 'block';
    }
});

btnCarrito.addEventListener('click', () => {
    if (menuCarrito.style.display === 'block') {
        menuCarrito.style.display = 'none';
    } else {
        menuCarrito.style.display = 'block';
    }
});