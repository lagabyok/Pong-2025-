// Obtener los elementos de audio por su ID
const paddleHitSound = document.getElementById('paddleHitSound');
const goalSound = document.getElementById('goalSound');

// Función para reproducir sonidos sin interrupciones
function playSound(sound) {
    if (sound) {
        // Verificar si el sonido ya está reproduciéndose
        if (!sound.paused && sound.currentTime > 0) {
            sound.pause(); // Detener el sonido actual si está en reproducción
            sound.currentTime = 0; // Reiniciar el tiempo del sonido
        }
        sound.play().catch(error => console.log("Error al reproducir sonido:", error)); // Maneja posibles errores
    }
}

// Función para detectar colisión con la paleta
function checkPaddleCollision() {
    if (
        ball.x - ball.radius <= paddle1.x + paddle1.width &&
        ball.y >= paddle1.y &&
        ball.y <= paddle1.y + paddle1.height
    ) {
        playSound(paddleHitSound); // Reproduce el sonido al chocar con la paleta
        ball.speedX = -ball.speedX;
    }

    if (
        ball.x + ball.radius >= paddle2.x &&
        ball.y >= paddle2.y &&
        ball.y <= paddle2.y + paddle2.height
    ) {
        playSound(paddleHitSound); // Reproduce el sonido al chocar con la paleta
        ball.speedX = -ball.speedX;
    }
}

// Función para detectar cuando se anota un gol
function checkGoal() {
    if (ball.x - ball.radius <= 0) {
        // Gol del jugador 2
        player2Score++;
        playSound(goalSound); // Reproduce el sonido de gol
        resetBall();
    } else if (ball.x + ball.radius >= canvas.width) {
        // Gol del jugador 1
        player1Score++;
        playSound(goalSound); // Reproduce el sonido de gol
        resetBall();
    }
}

// Llama a la función dentro del bucle de juego
function gameLoop() {
    checkPaddleCollision();
    checkGoal();
    // Resto de la lógica del juego...
}

// Configuración de volumen
paddleHitSound.volume = 1.0;
goalSound.volume = 1.0;

// Preload de los sonidos (para asegurarnos de que estén listos antes de usarlos)
window.addEventListener('load', () => {
    paddleHitSound.load();
    goalSound.load();
});
