let gameRunning = false; 
let twoPlayers = false;
let paused = false;
let score1 = 0;
let score2 = 0;
let lastTimestamp = 0;

document.getElementById("start-btn").addEventListener("click", function () {
    twoPlayers = false; // Un solo jugador
    startGame();
});

document.getElementById("start-2p-btn").addEventListener("click", function () {
    twoPlayers = true; // Dos jugadores
    startGame();
});

document.getElementById("pause-btn").addEventListener("click", function () {
    togglePause(); // Pausar o reanudar el juego
});

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        ball.reset();
        gameLoop();
    }
}

function gameLoop(timestamp) {
    if (!gameRunning) return; // Si el juego no está corriendo, termina el bucle.
    if (paused) {
        lastTimestamp = timestamp; // Mantener el tiempo del último frame para evitar "saltear" frames.
        return; // Detener la ejecución cuando está pausado
    }

    // Calcular el delta de tiempo entre frames para hacer un movimiento fluido
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.updatePosition(deltaTime);
    ball.draw();
    paddle_player1.draw();
    paddle_player2.draw();

    if (!twoPlayers) {
        paddle_player2.moveAI(deltaTime); // Movimiento de la IA para el segundo jugador
    }

    if (ball.x < 0) {
        score2++;
        updateScore();
        ball.reset();
        playSound(goalSound);  // Sonido cuando un jugador anota
    } else if (ball.x > canvas.width) {
        score1++;
        updateScore();
        ball.reset();
        playSound(goalSound);  // Sonido cuando un jugador anota
    }

    requestAnimationFrame(gameLoop); // Continúa el bucle de juego
}

function updateScore() {
    document.getElementById("score1").textContent = score1;
    document.getElementById("score2").textContent = score2;
}

// Función que alterna entre pausar y reanudar el juego
function togglePause() {
    paused = !paused;
    if (paused) {
        document.getElementById("pause-btn").textContent = "Reanudar"; // Cambia el texto a "Reanudar"
    } else {
        document.getElementById("pause-btn").textContent = "Pausar"; // Cambia el texto a "Pausar"
        gameLoop(lastTimestamp); // Reanudar el bucle de juego
    }
}

// Movimiento de la pala izquierda con el mouse (cuando es 1 jugador)
canvas.addEventListener("mousemove", function (e) {
    if (!twoPlayers) {
        let mouseY = e.clientY - canvas.offsetTop; // Posición del mouse en el lienzo
        // Limitar el movimiento de la pala al área del canvas
        if (mouseY > 0 && mouseY < canvas.height - paddle_player1.height) {
            paddle_player1.y = mouseY;
        }
    }
});

// Movimiento de la pala izquierda con las teclas de flecha (cuando es 2 jugadores)
window.addEventListener("keydown", function (e) {
    if (twoPlayers) {
        if (e.key === "ArrowUp") {
            paddle_player1.moveUp();
        }
        if (e.key === "ArrowDown") {
            paddle_player1.moveDown();
        }
    }
});

// Movimiento de la pala derecha con el mouse (cuando es 2 jugadores)
canvas.addEventListener("mousemove", function (e) {
    if (twoPlayers) {
        let mouseY = e.clientY - canvas.offsetTop; // Posición del mouse en el lienzo
        // Limitar el movimiento de la pala al área del canvas
        if (mouseY > 0 && mouseY < canvas.height - paddle_player2.height) {
            paddle_player2.y = mouseY;
        }
    }
});

// Reproduce un sonido
function playSound(sound) {
    if (sound) {
        sound.play().catch(error => console.log("Error al reproducir sonido:", error)); // Maneja posibles errores
    }
}  