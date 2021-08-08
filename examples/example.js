const { GifCanvas } = require('../dist/gifcanvas');
const { createCanvas } = require("canvas");
const { writeFile } = require('fs')
const path = require("path");

const canvas = createCanvas(250, 250);
const gifcanvas = new GifCanvas(canvas, 0, 60, 0);

for (let i = 0; i < gifcanvas.canvas.width - 50; i+=3) {
    gifcanvas.addFrame(ctx => {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(i, 0, 50, 50);
    });
}

for (let i = 0; i < gifcanvas.canvas.height - 50; i+=3) {
    gifcanvas.addFrame(ctx => {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(200, i, 50, 50);
    });
}

for (let i = 200; i > 0; i-=3) {
    gifcanvas.addFrame(ctx => {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(i, 200, 50, 50);
    });
}

for (let i = 200; i > 0; i-=3) {
    gifcanvas.addFrame(ctx => {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, i, 50, 50);
    });
}

writeFile(path.join(__dirname, './example.gif'), gifcanvas.end(), (err) => {
    if (err) {
        console.error(err);
    }
});