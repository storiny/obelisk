import { LineZDimension } from "../dimensions";
import { LineColor } from "../colors";
import { Matrix } from "../geom";
import { BitmapData } from "../display/BitmapData";
import { AbstractPrimitive } from "./AbstractPrimitive";

export class LineZ extends AbstractPrimitive {
  constructor(
    dimension?: LineZDimension,
    color?: LineColor,
    useDefaultCanvas?: boolean
  ) {
    super();

    this.useDefaultCanvas = useDefaultCanvas || false;
    this.dimension = dimension === undefined ? new LineZDimension() : dimension;
    this.color = color === undefined ? new LineColor() : color;

    this.initRectangle();
    this.initBitmapData();
    this.build();
    this.renderBitmapDataForCanvas();
  }

  private initRectangle(): void {
    this.w = 1;
    this.h = this.dimension!.zAxis!;

    // The matrix offset between the bitmap and the 3d pixel coordinate zero point
    this.matrix = new Matrix();
    this.matrix.tx = 0;
    this.matrix.ty = -this.dimension!.zAxis! + 1;
  }

  private initBitmapData(): void {
    this.bitmapData = new BitmapData(
      this.w!,
      this.h!,
      this.useDefaultCanvas || undefined
    );
  }

  private renderBitmapDataForCanvas(): void {
    this.bitmapData!.context!.putImageData(this.bitmapData!.imageData!, 0, 0);
    this.canvas = this.bitmapData!.canvas;
  }

  private build(): void {
    const xOffsetBorder = 0;
    const yOffsetBorder = 0;
    const borderColor = this.color!.border!;

    // Y axis
    for (let i = 0; i < this.dimension!.zAxis!; i += 1) {
      this.bitmapData!.setPixel(xOffsetBorder, yOffsetBorder + i, borderColor);
    }
  }

  public static override toString(): string {
    return "[LineZ]";
  }
}
