import { Canvas, NodeCanvasRenderingContext2D } from "canvas";
const GIFEncoder = require('gif-encoder-2')

export class GifCanvas {
    public canvas : Canvas;
    private encoder;

    constructor(canvas : Canvas, delay : number = 500, fps : number = 60, repeat : number = 0) {
        this.canvas = canvas;
        this.encoder = new GIFEncoder(this.canvas.width, this.canvas.height);
        this.encoder.setDelay(delay);
        this.encoder.setFrameRate(fps);
        this.encoder.setRepeat(repeat)
        this.encoder.start();
    }

    addFrame(fn : (ctx : NodeCanvasRenderingContext2D) => void) : this {
        const ctx = this.canvas.getContext('2d');
        // ctx.fillStyle = '#ffffff'
        // ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        fn(ctx);
        this.encoder.addFrame(ctx);
        return this;
    }

    end() : Buffer {
        this.encoder.finish();
        return this.encoder.out.getData();
    }
}