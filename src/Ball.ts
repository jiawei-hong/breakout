import Drawable from "./interface";
import Canvas from "./canvas";

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

export default Ball;