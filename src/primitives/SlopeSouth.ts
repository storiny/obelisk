import { SlopeDimension } from "../dimensions";
import { SlopeColor } from "../colors";
import { Matrix } from "../geom";
import { BitmapData } from "../display/BitmapData";
import { AbstractPrimitive } from "./AbstractPrimitive";

export class SlopeSouth extends AbstractPrimitive {
  constructor(
    dimension?: SlopeDimension,
    color?: SlopeColor,
    border?: boolean,
    useDefaultCanvas?: boolean
  ) {
    super();

    this.useDefaultCanvas = useDefaultCanvas || false;
    this.border = border || border === undefined;
    this.dimension = dimension === undefined ? new SlopeDimension() : dimension;
    this.color = color === undefined ? new SlopeColor() : color;

    this.initRectangle();
    this.initBitmapData();
    this.build();
    this.renderBitmapDataForCanvas();
  }

  private initRectangle(): void {
    this.w = this.dimension!.xAxis! + this.dimension!.yAxis!;
    this.h = this.dimension!.xAxis! / 2 + this.dimension!.yAxis! * 2;

    // 22.6 degrees implementation
    this.w -= 2;
    this.h -= 3;

    // The matrix offset between the bitmap and the 3d pixel coordinate zero point
    this.matrix = new Matrix();
    this.matrix.tx = -(this.dimension!.yAxis! - 2);
    this.matrix.ty = -((this.dimension!.yAxis! * 3) / 2 - 2);
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
    const colorBorderLeft = this.border
      ? this.color!.border!
      : this.color!.leftSlope!;
    const colorBorderRight = this.border
      ? this.color!.border!
      : this.color!.right!;

    // X axis
    for (let j = 0; j < this.dimension!.xAxis!; j += 1) {
      this.bitmapData!.setPixel(
        j,
        this.dimension!.yAxis! * 2 + Math.floor(j / 2) - 3,
        colorBorderLeft
      );

      this.bitmapData!.setPixel(
        j + this.dimension!.yAxis! - 2,
        Math.floor(j / 2),
        colorBorderLeft
      );
    }

    // Y axis
    for (let i = 0; i < this.dimension!.yAxis!; i += 1) {
      this.bitmapData!.setPixel(
        this.dimension!.xAxis! - 2 + i,
        this.h! - Math.floor(i / 2) - 1,
        colorBorderRight
      );
    }

    // X axis
    for (
      let k = this.dimension!.xAxis! / 2 - 1;
      k < this.h! - this.dimension!.yAxis! / 2;
      k += 1
    ) {
      this.bitmapData!.setPixel(this.w! - 1, k, colorBorderRight);
    }

    // Slot
    for (let m = 0; m < this.dimension!.yAxis! * 2 - 2; m += 1) {
      this.bitmapData!.setPixel(
        Math.floor(m / 2),
        this.dimension!.yAxis! * 2 - m - 3,
        colorBorderLeft
      );

      this.bitmapData!.setPixel(
        this.dimension!.xAxis! - 2 + Math.floor(m / 2),
        this.h! - m - 1,
        colorBorderLeft
      );
    }

    // floodFill
    this.bitmapData!.floodFill(
      this.dimension!.yAxis! - 1,
      1,
      this.color!.leftSlope!
    );

    this.bitmapData!.floodFill(
      this.dimension!.xAxis!,
      this.h! - 3,
      this.color!.right!
    );

    // Hack single pixel
    this.bitmapData!.setPixel(
      this.dimension!.xAxis! - 1,
      this.h! - 2,
      this.color!.right!
    );

    // Highlight
    if (this.border) {
      for (let n = 1; n < this.dimension!.yAxis! * 2 - 3; n += 1) {
        this.bitmapData!.setPixel(
          this.dimension!.xAxis! - 2 + Math.floor(n / 2),
          this.h! - n - 1,
          this.color!.borderHighlight!
        );
      }
    }
  }

  public static override toString(): string {
    return "[SlopeSouth]";
  }
}
