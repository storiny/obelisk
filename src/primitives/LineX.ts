import { LineXDimension } from "../dimensions";
import { LineColor } from "../colors";
import { Matrix } from "../geom";
import { BitmapData } from "../display/BitmapData";
import { AbstractPrimitive } from "./AbstractPrimitive";

export class LineX extends AbstractPrimitive {
  constructor(
    dimension?: LineXDimension,
    color?: LineColor,
    useDefaultCanvas?: boolean
  ) {
    super();

    this.useDefaultCanvas = useDefaultCanvas || false;
    this.dimension = dimension === undefined ? new LineXDimension() : dimension;
    this.color = color === undefined ? new LineColor() : color;

    this.initRectangle();
    this.initBitmapData();
    this.build();
    this.renderBitmapDataForCanvas();
  }

  private initRectangle(): void {
    this.w = this.dimension!.xAxis!;
    this.h = this.dimension!.xAxis! / 2;

    // The matrix offset between the bitmap and the 3d pixel coordinate zero point
    this.matrix = new Matrix();
    this.matrix.tx = 0;
    this.matrix.ty = 0;
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

    // X axis
    for (let i = 0; i < this.dimension!.xAxis!; i += 1) {
      this.bitmapData!.setPixel(
        xOffsetBorder + i,
        yOffsetBorder + Math.floor(i / 2),
        borderColor
      );
    }
  }

  public static override toString(): string {
    return "[LineX]";
  }
}
