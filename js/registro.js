//btnRegistrar.addEventListener("click", function() {
  // Aplicar la animación al botón
//  this.style.animation = "animacionBoton  animation-duration: 3s";
 // Cambiar el texto del botón
 //btnRegistrar.innerHTML = "Redirigiendo.....";
 //btnRegistrar.textContent = "Redirigiendo...";
 //console.log(this.click.target.value);



  // Después de que termine la animación, redirigir al enlace
 // setTimeout(function() {
//    window.location.href = './loading.html';
//}, 2000);

//});

// Función para crear y mostrar confetis

// Obtener referencias a elementos HTML
let mostrarConfetiBtn = document.getElementById("btn-reg");
let contenedorConfeti = document.getElementById("contenedorConfeti");


function mostrarConfetis() {
  for (let i = 0; i < 20; i++) { // creo 20 confetis
      let confeti = document.createElement("div");
      confeti.classList.add("confeti");
      contenedorConfeti.appendChild(confeti);

      // Establece posiciones aleatorias para los confetis
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * window.innerHeight;
      confeti.style.left = randomX + "px";
      confeti.style.top = randomY + "px";
  }

  contenedorConfeti.style.display = "flex"; // Mostrar el contenedor
}

// Agregar un manejador de eventos al botón "Mostrar Confeti"
mostrarConfetiBtn.addEventListener("click", function() {
  mostrarConfetis();

  // Después de 3 segundos, redirigir a la página de "Loguing"
  setTimeout(function() {
      window.location.href = "index.html"; // se redirige a loguin
  }, 3000); // Duración de la animación de confeti (en milisegundos)
});