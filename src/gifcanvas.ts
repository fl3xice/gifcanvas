import { Canvas, NodeCanvasRenderingContext2D } from "canvas";
const GIFEncoder = require('gif-encoder-2')

export class GifCanvas {
    public canvas : Canvas;
    private encoder;
    private readonly context: NodeCanvasRenderingContext2D;

    public countFrames : number = 0;

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

        this.context = this.canvas.getContext('2d');

        this.encoder.start();
    }

    animation(framesCount: number, fn: (ctx: NodeCanvasRenderingContext2D, nowFrame: number) => void) : this {
        for (let frame = 0; frame < framesCount; frame++) {
            fn(this.context, frame);
            this.oneFrame(this.context)
        }

        return this;
    }

    addFrame(fn : (ctx : NodeCanvasRenderingContext2D) => void) : this {
        fn(this.context);
        this.oneFrame(this.context);
        return this;
    }

    private oneFrame(ctx: NodeCanvasRenderingContext2D) : void {
        this.encoder.addFrame(ctx);
        this.countFrames++;
    }

    end() : Buffer {
        this.encoder.finish();
        return this.encoder.out.getData();
    }
}