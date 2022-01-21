import Canvas from "./canvas";
import Drawable from './interface';

class Block implements Drawable {
    width: number;
    height: number;
    position: Position;

    constructor(props: Position) {
        this.width = 30;
        this.height = 10;
        this.position = props;
    }

    draw() {
        Canvas.ctx.beginPath();
        Canvas.ctx.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        Canvas.ctx.fill();
        Canvas.ctx.closePath();
    }
}

export default Block;