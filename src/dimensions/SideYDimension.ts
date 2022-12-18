import { AbstractDimension } from "./AbstractDimension";

export class SideYDimension extends AbstractDimension {
  constructor(yAxis?: number, zAxis?: number) {
    super();
    this.yAxis = yAxis || 30;
    this.zAxis = zAxis || 30;

    if (this.yAxis % 2 === 1) {
      throw new Error("yAxis must be an even number");
    }

    // If yAxis or zAxis = 4 floodFill cannot be applied
    if (this.yAxis <= 4 || this.zAxis <= 2) {
      throw new Error("Dimensions are too small");
    }
  }

  public static override toString(): string {
    return "[SideYDimension]";
  }
}
