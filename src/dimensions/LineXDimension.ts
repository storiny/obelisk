import { AbstractDimension } from "./AbstractDimension";

export class LineXDimension extends AbstractDimension {
  constructor(xAxis?: number) {
    super();
    this.xAxis = xAxis || 30;

    if (this.xAxis % 2 === 1) {
      throw new Error("xAxis must be an even number");
    }

    if (this.xAxis < 2) {
      throw new Error("Dimension is too small");
    }
  }

  public static override toString(): string {
    return "[LineXDimension]";
  }
}
