import { Codec, StreamCamera } from "pi-camera-connect";
import { Canvas, Image, ImageData, loadImage, createCanvas } from "canvas";

export class Stream {
  private camera: StreamCamera;

  constructor() {
    this.camera = new StreamCamera({
      codec: Codec.MJPEG,
      width: 480,
      height: 270,
      fps: 10,
    });

  const canvas = createCanvas(480, 270);
  const ctx = canvas.getContext("2d");
  }

  async start(onFrame: (frame: Buffer) => void) {
    await this.camera.startCapture();
    this.camera.on("frame", async (buffer) => {
      const image = await this.camera.takeImage();
    });
  }

  async stop() {
    await this.camera.stopCapture();
  }
}
