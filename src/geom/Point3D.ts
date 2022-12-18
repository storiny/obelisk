import { Point } from "./Point";

export class Point3D {
  public x: number;

  public y: number;

  public z: number;

  constructor(x?: number, y?: number, z?: number) {
    this.x = x === undefined ? 0 : x;
    this.y = y === undefined ? 0 : y;
    this.z = z === undefined ? 0 : z;
  }

  public toGlobalCoordinates(offset?: { x: number; y: number }): Point {
    const p2D = new Point(
      this.x - this.y,
      Math.floor(this.x / 2 + this.y / 2) - this.z
    );

    if (offset !== undefined) {
      p2D.x += offset.x;
      p2D.y += offset.y;
    }

    return p2D;
  }

  public toString(): string {
    return `[Point3D x : ${this.x}, y : ${this.y}, z: ${this.z}]`;
  }
}
