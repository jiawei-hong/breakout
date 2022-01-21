import Drawable from "./interface";
import Canvas from "./canvas";

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

export default Paddle;