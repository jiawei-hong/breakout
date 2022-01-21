interface Drawable {
    radius?: number;
    position: Position;

    draw(): void;
}


export default Drawable;