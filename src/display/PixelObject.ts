import { Point3D } from "../geom";
import type { AbstractPrimitive } from "../primitives";

export class PixelObject {
  public x: number | null;

  public y: number | null;

  public canvas: HTMLCanvasElement | null;

  constructor(primitive?: AbstractPrimitive, point3D?: Point3D) {
    if (!primitive) {
      throw new Error("Primitive is not defined");
    }

    const p3D = point3D || new Point3D();

    this.canvas = primitive.canvas;
    this.x = (primitive as any).matrix!.tx + p3D.x - p3D.y;
    this.y =
      (primitive as any).matrix!.ty + Math.floor(p3D.x / 2 + p3D.y / 2) - p3D.z;
  }

  public static toString(): string {
    return "[PixelObject]";
  }
}
