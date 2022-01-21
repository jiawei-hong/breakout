import Canvas from "./canvas";
import Ball from "./Ball";
import Paddle from "./Paddle";
import Block from "./block";
import './interface'
import './type'

class Breakout {
    interval: number | undefined;
    ball: Ball;
    paddle: Paddle;
    blocks: Array<Block>;

    constructor() {
        this.ball = new Ball();
        this.paddle = new Paddle();
        this.blocks = [];

        for (let i = 0; i <= 9; i++) {
            for (let j = 0; j < 4; j++) {
                let block = new Block({
                    x: i * (Block.width + Block.padding) + Block.offsetLeft,
                    y: j * (Block.width + Block.padding) + Block.offsetTop,
                    dx: 0,
                    dy: 0
                });

                this.blocks.push(block);
            }
        }
    }

    draw() {
        this.paddle.bindKeyboardEvent();
        this.interval = window.setInterval(() => {
            Canvas.clear();
            this.ball.draw();
            this.paddle.draw();
            this.blocks.forEach(block => block.draw());

            const ballDx: number = this.ball.position.x + this.ball.position.dx;
            const ballDy: number = this.ball.position.y + this.ball.position.dy;

            this.blocks.forEach((block, i) => {
                if (
                    this.ball.position.x > block.position.x - Block.width &&
                    this.ball.position.x < block.position.x + Block.width &&
                    this.ball.position.y > block.position.y &&
                    this.ball.position.y < block.position.y + Block.height
                ) {
                    this.blocks.splice(i, 1);
                    this.ball.position.dx = Math.abs(this.ball.position.dx);
                    this.ball.position.dy = Math.abs(this.ball.position.dy);
                }
            })

            if (ballDx > Canvas.width - this.ball.radius || ballDx < this.ball.radius) {
                this.ball.position.dx = -this.ball.position.dx;
            }

            if (ballDy < this.ball.radius) {
                this.ball.position.dy = -this.ball.position.dy;
            } else if (ballDy > Canvas.height - this.ball.radius) {
                if (
                    this.ball.position.x >= this.paddle.position.x - this.paddle.width / 2 &&
                    this.ball.position.x <= this.paddle.position.x + this.paddle.width / 2
                ) {
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