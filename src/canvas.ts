class Canvas {
    public static cvs = <HTMLCanvasElement>document.querySelector('canvas');
    public static ctx = <CanvasRenderingContext2D>this.cvs.getContext('2d');
    public static width: number = this.cvs.width;
    public static height: number = this.cvs.height;

    public static clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

export default Canvas;