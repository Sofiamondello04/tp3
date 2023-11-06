document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");
    let progress = 0;

    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        progressText.innerText = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                // Redirigir a la página de inicio después de 1 segundo (5000 ms en total)
                window.location.href = "home.html";
            }, 1000);
        }
    }, 50);
});
