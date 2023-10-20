import * as fs from "fs";
import PanTiltHAT from "pan-tilt-hat-2";
import { Codec, StreamCamera } from "pi-camera-connect";
// import nodejs bindings to native tensorflow
import "@tensorflow/tfjs-node";

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import { Canvas, Image, ImageData, loadImage, createCanvas } from "canvas";

import * as faceapi from "face-api.js";

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function main() {
  const panTilt = new PanTiltHAT();

  // Reset position
  panTilt.pan(0);
  panTilt.tilt(0);

  const streamCamera = new StreamCamera({
    codec: Codec.MJPEG,
    width: 480,
    height: 270,
    fps: 10,
  });

  const canvas = createCanvas(480, 270);
  const ctx = canvas.getContext("2d");

  await faceapi.nets.tinyFaceDetector.loadFromDisk("./models");

  await streamCamera.startCapture();

  const image = await streamCamera.takeImage();
  await streamCamera.stopCapture();

  fs.writeFileSync("still-image.jpg", image);

  console.log("captured image");

  const loadedImage = await loadImage(image);
  ctx.drawImage(loadedImage, 0, 0, 480, 270);

  const detection = await faceapi.detectSingleFace(
    canvas,
    new faceapi.TinyFaceDetectorOptions()
  );

  console.log(detection);

  process.exit();
}

main();
