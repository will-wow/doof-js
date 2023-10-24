import { FaceDetection } from "@vladmandic/face-api";
import { Duplex, Transform } from "stream";
import { Coordinates } from "./detect";
import PanTiltHAT from "pan-tilt-hat-2";

const FRAME_LENGTH = 1000 / 10;

export class Brain extends Duplex {
  public writableObjectMode = true;
  public readableObjectMode = true;

  private currentDetection: Coordinates | null;
  private panTilt = new PanTiltHAT();

  constructor() {
    super();

    // Reset position
    this.panTilt.pan(0);
    this.panTilt.tilt(1);

    setInterval(() => {
      this.onFrame();
    }, FRAME_LENGTH);
  }

  onFrame() {

	}

  _write(
    chunk: Coordinates | null,
    encoding: BufferEncoding,
    callback: (error?: Error | null | undefined) => void
  ): void {
    this.currentDetection = chunk;
  }
}

export function createBrainStream(): Duplex {
  return new Duplex({
    objectMode: true,
    async transform(
      detection: FaceDetection | undefined,
      _encoding,
      callback
    ): Promise<void> {
      try {
        const { x, y, width, height } = detection.box;
        const center = {
          x: x + width / 2,
          y: y + height / 2,
        };
        const direction = {
          x: center.x / 480,
          y: center.y / 270,
        };
        callback(undefined, direction);
      } catch (err) {
        callback(err as Error);
      }
    },
  });
}
