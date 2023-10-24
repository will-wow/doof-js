import * as fs from "fs";
import { Readable, Transform } from "stream";
import { Codec, StreamCamera } from "pi-camera-connect";
import { loadImage, createCanvas } from "canvas";

/**Set up a camera and return a readable stream of frames */
export async function createCameraStream(): Promise<Readable> {
  const camera = new StreamCamera({
    codec: Codec.MJPEG,
    width: 480,
    height: 270,
    fps: 10,
  });

  await camera.startCapture();
  return camera.createStream();
}

export function createCanvasTransformer(): Transform {
  const canvas = createCanvas(480, 270);
  const ctx = canvas.getContext("2d");

  return new Transform({
    writableObjectMode: true,
    async transform(image: Buffer, _encoding, callback) {
      try {
        const loadedImage = await loadImage(image);

        fs.writeFileSync("still-image.jpg", image);

        ctx.drawImage(loadedImage, 0, 0, 480, 270);

        this.push(canvas);

        callback();
      } catch (err) {
        callback(err as Error);
      }
    },
  });
}
