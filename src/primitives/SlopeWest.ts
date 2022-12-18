import { SlopeDimension, SideYDimension } from "../dimensions";
import { SlopeColor, SideColor } from "../colors";
import { Matrix } from "../geom";
import { BitmapData } from "../display/BitmapData";
import { AbstractPrimitive } from "./AbstractPrimitive";
import { SideY } from "./SideY";

import { PixelObject } from "../display/PixelObject";

export class SlopeWest extends AbstractPrimitive {
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
    this.h = (this.dimension!.xAxis! * 3) / 2 + this.dimension!.yAxis! / 2;

    // 22.6 degrees implementation
    this.w -= 2;
    this.h -= 3;

    // The matrix offset between the bitmap and the 3d pixel coordinate zero point
    this.matrix = new Matrix();
    this.matrix.tx = -(this.dimension!.yAxis! - 2);
    this.matrix.ty = -(this.dimension!.xAxis! - 2);
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
      ? this.color!.borderHighlight!
      : this.color!.left!;

    const sideY = new SideY(
      new SideYDimension(
        this.dimension!.yAxis!,
        this.h! - this.dimension!.yAxis! / 2
      ),
      new SideColor(colorBorderRight, this.color!.right!)
    );

    const poY = new PixelObject(sideY);

    const ctx = this.bitmapData!.context!;
    ctx.drawImage(
      poY.canvas!,
      poY.x! + this.w! - 2,
      poY.y! + this.h! - this.dimension!.yAxis! / 2
    );

    const bmd = new BitmapData(this.w!, this.h!);

    // Close the path for floodFill
    for (
      let i = this.h! - (this.dimension!.xAxis! * 3) / 2 + 2;
      i < this.h!;
      i += 1
    ) {
      bmd.setPixel(this.dimension!.xAxis! - 2, i, colorBorderLeft);
    }

    // X axis
    for (let j = 0; j < this.dimension!.xAxis! - 1; j += 1) {
      bmd.setPixel(
        j,
        this.dimension!.xAxis! +
          this.dimension!.yAxis! / 2 -
          3 +
          Math.floor(j / 2),
        colorBorderLeft
      );

      bmd.setPixel(
        j,
        this.dimension!.xAxis! + this.dimension!.yAxis! / 2 - 3 - j,
        colorBorderLeft
      );
    }

    // floodFill
    bmd.floodFill(this.dimension!.xAxis! - 3, this.h! - 3, this.color!.left!);

    // Highlight
    for (let n = this.dimension!.yAxis! / 2; n < this.h! - 1; n += 1) {
      bmd.setPixel(this.dimension!.xAxis! - 2, n, colorBorderHighlight);
    }

    bmd.context!.putImageData(bmd.imageData!, 0, 0);
    ctx.drawImage(bmd.canvas!, 0, 0);
  }

  public static override toString(): string {
    return "[SlopeWest]";
  }
}
