import { Point } from "../geom";
import { PixelObject } from "./PixelObject";

export class PixelView {
  public canvas: HTMLCanvasElement | null;

  public context: CanvasRenderingContext2D | null;

  public point: Point | null;

  constructor(canvas?: HTMLCanvasElement, point?: Point) {
    if (!canvas) {
      throw new Error("Canvas is not defined");
    }

    this.canvas = canvas;

    this.context = this.canvas.getContext("2d");
    if (this.context) {
      (this.context as any).mozImageSmoothingEnabled = false;
      (this.context as any).msImageSmoothingEnabled = false;
      this.context.imageSmoothingEnabled = false;
    }

    this.point = point || new Point(0, 0);
  }

  public renderObject(
    primitive: ConstructorParameters<typeof PixelObject>[0],
    point3D: ConstructorParameters<typeof PixelObject>[1]
  ): void {
    const po = new PixelObject(primitive, point3D);

    if (this.context && this.point && po.canvas) {
      this.context.drawImage(
        po.canvas,
        this.point.x + (po.x || 0),
        this.point.y + (po.y || 0)
      );
    }
  }

  public clear(): void {
    if (this.canvas && this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  public static toString(): string {
    return "[PixelView]";
  }
}
