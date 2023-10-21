import PanTiltHAT from "pan-tilt-hat-2";

import { Stream } from "./stream";
import { Detector } from "./detect";

async function main() {
  const panTilt = new PanTiltHAT();

  // Reset position
  panTilt.pan(0);
  panTilt.tilt(1);

  const stream = new Stream();
  const detector = new Detector();

  await Promise.all([stream.load(), detector.load()]);

  stream.start(async (canvas) => {
    detector.detect(canvas);
  });

  process.exit();
}

main();
