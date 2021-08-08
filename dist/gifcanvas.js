"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GifCanvas = void 0;
const GIFEncoder = require('gif-encoder-2');
class GifCanvas {
    constructor(canvas, delay = 500, fps = 60, repeat = 0) {
        this.canvas = canvas;
        this.encoder = new GIFEncoder(this.canvas.width, this.canvas.height);
        this.encoder.setDelay(delay);
        this.encoder.setFrameRate(fps);
        this.encoder.setRepeat(repeat);
        this.encoder.start();
    }
    addFrame(fn) {
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        fn(ctx);
        this.encoder.addFrame(ctx);
        return this;
    }
    end() {
        this.encoder.finish();
        return this.encoder.out.getData();
    }
}
exports.GifCanvas = GifCanvas;
