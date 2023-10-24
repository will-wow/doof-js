import PanTiltHAT from "pan-tilt-hat-2";

import { createCameraStream, createCanvasTransformer } from "./camera";
import { createDetectionStream } from "./detect";
import { Stream } from "stream";

async function main() {
  const [cameraStream, transformCanvasToDetection] = await Promise.all([
    createCameraStream(),
    createDetectionStream(),
  ]);
  const transformToCanvas = createCanvasTransformer();

  const faceStream = cameraStream
    .pipe(transformToCanvas)
    .pipe(transformCanvasToDetection);

  await awaitCloseStream(faceStream);

  process.exit();
}

main();

function awaitCloseStream(stream: Stream): Promise<void> {
  return new Promise<void>((resolve) => {
    stream.on("close", function () {
      resolve();
    });
  });
}
