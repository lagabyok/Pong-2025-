const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 3,
    dy: 3,
    radius: 8,
    color: "#FFFFFF",
  
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    },
  
    updatePosition: function (deltaTime) {
        this.x += this.dx;
        this.y += this.dy;
  
        // Rebote en los bordes superior e inferior
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.dy *= -1;
        }
  
        this.checkCollisionWithPaddle();
    },
  
    checkCollisionWithPaddle: function () {
        if (
            this.x - this.radius < paddle_player1.x + paddle_player1.width &&
            this.y > paddle_player1.y &&
            this.y < paddle_player1.y + paddle_player1.height
        ) {
            this.dx *= -1;
            playSound(paddleHitSound);  // Reproducir sonido al golpear la paleta
        }
  
        if (
            this.x + this.radius > paddle_player2.x &&
            this.y > paddle_player2.y &&
            this.y < paddle_player2.y + paddle_player2.height
        ) {
            this.dx *= -1;
            playSound(paddleHitSound);  // Reproducir sonido al golpear la paleta
        }
    },
  
    reset: function () {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.dx = 3 * (Math.random() > 0.5 ? 1 : -1);
        this.dy = 3 * (Math.random() > 0.5 ? 1 : -1);
    }
  };
  