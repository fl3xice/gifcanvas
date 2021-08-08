/// <reference types="node" />
import { Canvas, NodeCanvasRenderingContext2D } from "canvas";
export declare class GifCanvas {
    canvas: Canvas;
    private encoder;
    constructor(canvas: Canvas, delay?: number, fps?: number, repeat?: number);
    addFrame(fn: (ctx: NodeCanvasRenderingContext2D) => void): this;
    end(): Buffer;
}
