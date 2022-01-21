import Canvas from "./canvas";
import Drawable from './interface';

class Block implements Drawable {
    static width: number = 75;
    static height: number = 20;
    static padding: number = 20;
    static offsetTop: number = 80;
    static offsetLeft: number = 40;
    position: Position;

    constructor(props: Position) {
        this.position = props;
    }

    draw() {
        Canvas.ctx.beginPath();
        Canvas.ctx.fillRect(
            this.position.x,
            this.position.y,
            Block.width,
            Block.height
        );
        Canvas.ctx.fill();
        Canvas.ctx.closePath();
    }
}

export default Block;