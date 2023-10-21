import * as fs from "fs";
import { Codec, StreamCamera } from "pi-camera-connect";
import {
  Canvas,
  CanvasRenderingContext2D,
  loadImage,
  createCanvas,
} from "canvas";

export class Stream {
  private camera: StreamCamera;
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.camera = new StreamCamera({
      codec: Codec.MJPEG,
      width: 480,
      height: 270,
      fps: 10,
    });

    this.canvas = createCanvas(480, 270);
    this.ctx = this.canvas.getContext("2d");
  }

	async load() {
    await this.camera.startCapture();
	}

  async start(onFrame: (canvas: Canvas) => void) {
    this.camera.on("frame", async (buffer) => {
      const image = await this.camera.takeImage();

      fs.writeFileSync("still-image.jpg", image);
      console.log("captured image");

      const loadedImage = await loadImage(image);
      this.ctx.drawImage(loadedImage, 0, 0, 480, 270);
      onFrame(this.canvas);
    });
  }

  async stop() {
    await this.camera.stopCapture();
  }
}
