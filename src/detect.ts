// import nodejs bindings to native tensorflow
import "@tensorflow/tfjs-node";

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import { Canvas, Image, ImageData } from "canvas";
import * as faceapi from "@vladmandic/face-api";

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

export class Detector {
  async load() {
    await faceapi.nets.tinyFaceDetector.loadFromDisk("./models");
  }

  async detect(canvas: Canvas) {
    const detection = await faceapi.detectSingleFace(
      canvas,
      new faceapi.TinyFaceDetectorOptions()
    );

    console.log(detection);
  }
}
