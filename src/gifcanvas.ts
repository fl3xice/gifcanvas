import { Canvas, NodeCanvasRenderingContext2D } from "canvas";
const GIFEncoder = require('gif-encoder-2')

export class GifCanvas {
    public canvas : Canvas;
    private encoder;

    constructor(canvas : Canvas, options? : { delay: number, fps: number, repeat: number }) {
        this.canvas = canvas;
        this.encoder = new GIFEncoder(this.canvas.width, this.canvas.height);

        if (options) {
            this.encoder.setDelay(options.delay || 0);
            this.encoder.setFrameRate(options.fps || 60);
            this.encoder.setRepeat(options.repeat || 0);
        } else {
            this.encoder.setDelay(0);
            this.encoder.setFrameRate(60);
            this.encoder.setRepeat(0);
        }

        this.encoder.start();
    }

    addFrame(fn : (ctx : NodeCanvasRenderingContext2D) => void) : this {
        const ctx = this.canvas.getContext('2d');
        fn(ctx);
        this.encoder.addFrame(ctx);
        return this;
    }

    end() : Buffer {
        this.encoder.finish();
        return this.encoder.out.getData();
    }
}