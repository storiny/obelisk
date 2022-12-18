import { PyramidDimension } from "../dimensions";
import { PyramidColor } from "../colors";
import { Matrix } from "../geom";
import { BitmapData } from "../display/BitmapData";
import { AbstractPrimitive } from "./AbstractPrimitive";

export class Pyramid extends AbstractPrimitive {
  private readonly hSize: number;

  private readonly hOffset: number;

  constructor(
    dimension?: PyramidDimension,
    color?: PyramidColor,
    border?: boolean,
    useDefaultCanvas?: boolean
  ) {
    super();

    this.useDefaultCanvas = useDefaultCanvas || false;
    this.border = border || border === undefined;
    this.dimension =
      dimension === undefined ? new PyramidDimension() : dimension;
    this.color = color === undefined ? new PyramidColor() : color;

    this.hSize = this.dimension.tall
      ? this.dimension!.xAxis! * 2
      : this.dimension!.xAxis!;
    this.hOffset = this.dimension.tall ? -3 : -2;

    this.initRectangle();
    this.initBitmapData();
    this.build();
    this.renderBitmapDataForCanvas();
  }

  private initRectangle(): void {
    this.w = this.dimension!.xAxis! + this.dimension!.yAxis!;
    this.h = this.hSize + this.dimension!.xAxis! / 2;

    // 22.6 degrees implementation
    this.w -= 2;
    this.h += this.hOffset;

    // The matrix offset between the bitmap and the 3d pixel coordinate zero point
    this.matrix = new Matrix();
    this.matrix.tx = -this.dimension!.xAxis! + 2;
    this.matrix.ty =
      -this.hSize / 2 +
      2 -
      (this.dimension!.tall ? this.dimension!.xAxis! / 2 : 1);
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
      : this.color!.left!;
    const colorBorderRight = this.border
      ? this.color!.border!
      : this.color!.right!;

    const colorBorderHighlight = this.border
      ? this.color!.borderHighlight!
      : colorBorderLeft;

    // Z axis highlight
    for (let k = 0; k < this.hSize + this.dimension!.xAxis! / 2 - 4; k += 1) {
      this.bitmapData!.setPixel(
        this.dimension!.xAxis! - 2,
        k + 3 + this.hOffset,
        colorBorderHighlight
      );
    }

    // X axis
    for (let i = 0; i < this.dimension!.xAxis!; i += 1) {
      this.bitmapData!.setPixel(
        i,
        this.hSize + Math.floor(i / 2) + this.hOffset,
        colorBorderLeft
      );
    }

    // Y axis
    for (let j = 0; j < this.dimension!.xAxis!; j += 1) {
      this.bitmapData!.setPixel(
        j + this.dimension!.xAxis! - 2,
        this.hSize +
          this.dimension!.xAxis! / 2 -
          Math.floor(j / 2) -
          1 +
          this.hOffset,
        colorBorderRight
      );
    }

    if (!this.dimension!.tall) {
      // Left edge
      for (let l = 0; l < this.hSize; l += 1) {
        this.bitmapData!.setPixel(
          l,
          this.hSize - l + this.hOffset,
          colorBorderLeft
        );
      }

      // Right edge
      for (let m = 0; m < this.hSize; m += 1) {
        this.bitmapData!.setPixel(
          m + this.hSize - 2,
          m + 1 + this.hOffset,
          colorBorderRight
        );
      }
    } else {
      // Left edge
      for (let l = 0; l < this.hSize - 2; l += 1) {
        this.bitmapData!.setPixel(
          Math.floor(l / 2),
          this.hSize - l + this.hOffset,
          colorBorderLeft
        );
      }

      // Right edge
      for (let m = 2; m < this.hSize; m += 1) {
        this.bitmapData!.setPixel(
          Math.floor(m / 2) + this.dimension!.xAxis! - 2,
          m + 1 + this.hOffset,
          colorBorderRight
        );
      }
    }

    if (!this.border) {
      this.bitmapData!.setPixel(
        this.dimension!.xAxis! - 2,
        this.hSize + this.dimension!.xAxis! / 2 - 1 + this.hOffset,
        colorBorderLeft
      );
    }

    // floodFill
    this.bitmapData!.floodFill(
      this.dimension!.xAxis! - 1,
      this.hSize +
        Math.floor((this.dimension!.xAxis! - 1) / 2) +
        this.hOffset -
        1,
      this.color!.right!
    );

    this.bitmapData!.floodFill(
      this.dimension!.xAxis! - 3,
      this.hSize +
        Math.floor((this.dimension!.xAxis! - 1) / 2) +
        this.hOffset -
        2,
      this.color!.left!
    );
  }

  public static override toString(): string {
    return "[Pyramid]";
  }
}
