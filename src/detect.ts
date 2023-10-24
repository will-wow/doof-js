// import nodejs bindings to native tensorflow
import "@tensorflow/tfjs-node";
import { Transform } from "stream";

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import { Canvas, Image, ImageData } from "canvas";
import * as faceapi from "@vladmandic/face-api";
import { Degrees } from "./move";

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

export interface Coordinates {
  x: number;
  y: number;
}

export async function createDetectionStream(height: number, width: number): Promise<Transform> {
  await faceapi.nets.tinyFaceDetector.loadFromDisk("./models");

	const midX = width / 2;
	const midY = height / 2;

  return new Transform({
    async transform(canvas: Canvas, _encoding, callback) {
      try {
        const detections = await faceapi.detectAllFaces(
          canvas,
          new faceapi.TinyFaceDetectorOptions()
        );
        if (!detections.length) {
          return null;
        }

        const detection = detections[0];

        const degrees: Coordinates = {
          x: (detection.box.x - midX) / midX,
          y: (detection.box.y - midY) / midY,
        };

        this.push(degrees);

        callback();
      } catch (err) {
        callback(err as Error);
      }
    },
  });
}
