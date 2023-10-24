import { Coordinates } from "./detect";

/**  Max degrees the camera can turn */
const MAX_DEGREES = 80;
/** Max degrees the camera should turn in a frame */
const MAX_MOVE_SPEED = 10;

/** Time to do any move */
const MOVE_TIME = 0.5;

export interface Degrees {
  x: number;
  y: number;
}

/** Moves more slowly the closer the face is to the center. */
export function coordinatesToDegrees({ x, y }: Coordinates): Degrees {
  return { x: x * MAX_MOVE_SPEED, y: y * MAX_MOVE_SPEED };
}

export function clamp(value: number): number {
  return Math.min(Math.max(value, -MAX_DEGREES), MAX_DEGREES);
}
