import { SlopeDimension, SideXDimension } from "../dimensions";
import { SlopeColor, SideColor } from "../colors";
import { Matrix } from "../geom";
import { BitmapData } from "../display/BitmapData";
import { AbstractPrimitive } from "./AbstractPrimitive";
import { SideX } from "./SideX";

import { PixelObject } from "../display/PixelObject";

export class SlopeNorth extends AbstractPrimitive {
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
    this.h = (this.dimension!.yAxis! * 3) / 2 + this.dimension!.xAxis! / 2;

    // 22.6 degrees implementation
    this.w -= 2;
    this.h -= 3;

    // The matrix offset between the bitmap and the 3d pixel coordinate zero point
    this.matrix = new Matrix();
    this.matrix.tx = -(this.dimension!.yAxis! - 2);
    this.matrix.ty = -(this.dimension!.yAxis! - 2);
  }

  private initBitmapData(): void {
    this.bitmapData = new BitmapData(
      this.w!,
      this.h!,
      this.useDefaultCanvas || undefined
    );
  }

  private renderBitmapDataForCanvas(): void {
    this.canvas = this.bitmapData!.canvas;
  }

  private build(): void {
    const colorBorderLeft = this.border
      ? this.color!.border!
      : this.color!.left!;
    const colorBorderRight = this.border
      ? this.color!.border!
      : this.color!.right!;
    const colorBorderHighlight = this.border
      ? this.color!.borderHighlight
      : this.color!.left;

    const sideX = new SideX(
      new SideXDimension(
        this.dimension!.xAxis!,
        this.h! - this.dimension!.xAxis! / 2
      ),
      new SideColor(colorBorderLeft, this.color!.left!)
    );

    const poX = new PixelObject(sideX);

    const ctx = this.bitmapData!.context!;
    ctx.drawImage(
      poX.canvas!,
      poX.x!,
      poX.y! + this.h! - this.dimension!.xAxis! / 2
    );

    const bmd = new BitmapData(this.w!, this.h!);

    // Close the path for floodFill
    for (
      let i = this.h! - (this.dimension!.yAxis! * 3) / 2 + 2;
      i < this.h!;
      i += 1
    ) {
      bmd.setPixel(this.dimension!.xAxis! - 1, i, colorBorderRight);
    }

    // Y axis
    for (let j = 1; j < this.dimension!.yAxis!; j += 1) {
      bmd.setPixel(
        this.dimension!.xAxis! + j - 2,
        this.h! - Math.floor(j / 2) - 1,
        colorBorderRight
      );

      bmd.setPixel(
        this.dimension!.xAxis! + j - 2,
        this.dimension!.xAxis! / 2 - 2 + j,
        colorBorderRight
      );
    }

    // floodFill
    bmd.floodFill(this.dimension!.xAxis! + 1, this.h! - 3, this.color!.right!);

    // Highlight
    for (let n = this.dimension!.xAxis! / 2; n < this.h! - 1; n += 1) {
      bmd.setPixel(this.dimension!.xAxis! - 1, n, this.color!.right!);
      bmd.setPixel(this.dimension!.xAxis! - 2, n, colorBorderHighlight!);
    }

    bmd.context!.putImageData(bmd.imageData!, 0, 0);
    ctx.drawImage(bmd.canvas!, 0, 0);
  }

  public static override toString(): string {
    return "[SlopeNorth]";
  }
}
