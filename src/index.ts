import './interface'
import './type'

class Canvas {
    public static cvs = <HTMLCanvasElement>document.querySelector('canvas');
    public static ctx = <CanvasRenderingContext2D>this.cvs.getContext('2d');
    public static width: number = this.cvs.width;
    public static height: number = this.cvs.height;

    public static clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

class Ball implements Drawable {
    radius: number;
    position: Position;

    constructor() {
        this.radius = 10;
        this.position = {
            x: Canvas.width / 2,
            y: Canvas.height - 20,
            dx: 2,
            dy: -2
        }
    }

    draw() {
        Canvas.ctx.beginPath();
        Canvas.ctx.fillStyle = '#c4c0d3';
        Canvas.ctx.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            2 * Math.PI
        );
        Canvas.ctx.fill();
        Canvas.ctx.closePath();
    }
}

class Paddle implements Drawable {
    width: number;
    height: number;
    position: Position;
    leftPressed: boolean;
    rightPressed: boolean;

    constructor() {
        this.position = {
            x: Canvas.width / 2,
            y: Canvas.height - 10,
            dx: 5,
            dy: 0
        }
        this.width = 75;
        this.height = 10;
        this.leftPressed = false;
        this.rightPressed = false;
    }

    bindKeyboardEvent() {
        window.addEventListener('keydown', this.keydownHandler.bind(this));
        window.addEventListener('keyup', this.keyupHandler.bind(this));
    }

    keydownHandler(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') {
            this.leftPressed = true;
        } else if (e.key === 'ArrowRight') {
            this.rightPressed = true;
        }
    }

    keyupHandler(e: KeyboardEvent) {
        if (e.key === "ArrowRight") {
            this.rightPressed = false;
        } else if (e.key === "ArrowLeft") {
            this.leftPressed = false;
        }
    }

    draw() {
        Canvas.ctx.beginPath();
        Canvas.ctx.fillStyle = '#adcbd7';
        Canvas.ctx.fillRect(
            this.position.x - this.width / 2,
            this.position.y,
            this.width,
            this.height
        );
        Canvas.ctx.closePath();
    }
}

class Block implements Drawable {
    private width: number;
    private height: number;
    position: Position;

    constructor() {
        this.width = 30;
        this.height = 10;
        this.position = {
            x: 10,
            y: 20,
            dx: 0,
            dy: 0
        }
    }

    draw() {

    }
}

class Breakout {
    private interval: number | undefined;
    private ball: Ball;
    private paddle: Paddle;
    private blocks: Array<Block>;

    constructor() {
        this.ball = new Ball();
        this.paddle = new Paddle();
        this.blocks = [new Block()];
    }

    draw() {
        // TODO: already draw blocks
        console.log(this.blocks[0].position.x);
        this.paddle.bindKeyboardEvent();
        this.interval = window.setInterval(() => {
            Canvas.clear();
            this.ball.draw();
            this.paddle.draw();

            const ballDx: number = this.ball.position.x + this.ball.position.dx;
            const ballDy: number = this.ball.position.y + this.ball.position.dy;

            if (ballDx > Canvas.width - this.ball.radius || ballDx < this.ball.radius) {
                this.ball.position.dx = -this.ball.position.dx;
            }

            if (ballDy < this.ball.radius) {
                this.ball.position.dy = -this.ball.position.dy;
            } else if (ballDy > Canvas.height - this.ball.radius) {
                if (this.ball.position.x > this.paddle.position.x / 2) {
                    this.ball.position.dy = -this.ball.position.dy;
                } else {
                    clearInterval(this.interval);
                    alert("Game Over");
                    location.reload();
                }
            }

            if (this.paddle.leftPressed) {
                const paddleDx = this.paddle.position.x - this.paddle.position.dx;

                if (paddleDx < this.paddle.width / 2) {
                    this.paddle.position.x = this.paddle.width / 2;
                } else {
                    this.paddle.position.x = paddleDx;
                }
            }

            if (this.paddle.rightPressed) {
                const paddleDx = this.paddle.position.x + this.paddle.position.dx;

                if (paddleDx > Canvas.width - this.paddle.width / 2) {
                    this.paddle.position.x = Canvas.width - this.paddle.width / 2;
                } else {
                    this.paddle.position.x += this.paddle.position.dx;
                }
            }

            this.ball.position.x += this.ball.position.dx;
            this.ball.position.y += this.ball.position.dy;
        }, 5);
    }
}

let breakout = new Breakout();

breakout.draw();