import { AbstractDimension } from "./AbstractDimension";

export class BrickDimension extends AbstractDimension {
  constructor(xAxis?: number, yAxis?: number) {
    super();
    this.xAxis = xAxis || 30;
    this.yAxis = yAxis || 30;

    if (this.xAxis % 2 === 1 || this.yAxis % 2 === 1) {
      throw new Error("xAxis / yAxis must be an even number");
    }

    // If xAxis or yAxis = 4 then floodFill can not be applied
    if (this.xAxis <= 4 || this.yAxis <= 4) {
      throw new Error("Dimensions are too small");
    }
  }

  public static override toString(): string {
    return "[BrickDimension]";
  }
}
