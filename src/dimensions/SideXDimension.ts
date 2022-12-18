import { AbstractDimension } from "./AbstractDimension";

export class SideXDimension extends AbstractDimension {
  constructor(xAxis?: number, zAxis?: number) {
    super();
    this.xAxis = xAxis || 30;
    this.zAxis = zAxis || 30;

    if (this.xAxis % 2 === 1) {
      throw new Error("xAxis must be an even number");
    }

    // If xAxis or zAxis = 4 floodFill cannot be applied
    if (this.xAxis <= 4 || this.zAxis <= 2) {
      throw new Error("Dimensions are too small");
    }
  }

  public static override toString(): string {
    return "[SideXDimension]";
  }
}
