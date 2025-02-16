const paddle_player1 = {
    x: 20,
    y: canvas.height / 2 - 40,
    width: 10,
    height: 80,
    color: "#fb2e01",
    speed: 12,  // Velocidad ajustada para el jugador 1
  
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
  
    moveUp: function () {
        if (this.y > 0) this.y -= this.speed;
    },
  
    moveDown: function () {
        if (this.y + this.height < canvas.height) this.y += this.speed;
    }
  };
  
  // Definición del jugador 2 (IA o control manual)
  const paddle_player2 = {
    x: canvas.width - 30,
    y: canvas.height / 2 - 40,
    width: 10,
    height: 80,
    color: "#6fcb9f",
    speed: 6,  // Velocidad del jugador 2 (puedes ajustarla si lo prefieres)
  
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
  
    moveUp: function () {
        if (this.y > 0) this.y -= this.speed;
    },
  
    moveDown: function () {
        if (this.y + this.height < canvas.height) this.y += this.speed;
    },
  
    moveAI: function () {
        if (ball.y < this.y + this.height / 2) {
            this.moveUp();
        } else {
            this.moveDown();
        }
    }
  };

  // Función de actualización del juego
  function update() {
      // Movimiento de Player 1 (jugador 1 usa el teclado)
      if (upKey) paddle_player1.moveUp();   // upKey es gestionado en tu manejador de teclas
      if (downKey) paddle_player1.moveDown(); // downKey es gestionado en tu manejador de teclas
  
      // Movimiento del jugador 2 (IA o control manual)
      paddle_player2.moveAI();  // Usa esta función si el jugador 2 es controlado por IA
  
      // Dibuja los paddles
      paddle_player1.draw();
      paddle_player2.draw();
  
      // Lógica adicional del juego, como el movimiento de la pelota...
  
      // Vuelve a llamar a la función de actualización para el siguiente frame
      requestAnimationFrame(update);
  }
  
  // Inicia el juego llamando a la función update
  update();