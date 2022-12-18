import { AbstractDimension } from "./AbstractDimension";

export class LineYDimension extends AbstractDimension {
  constructor(yAxis?: number) {
    super();
    this.yAxis = yAxis || 30;

    if (this.yAxis % 2 === 1) {
      throw new Error("yAxis must be an even number");
    }

    if (this.yAxis < 2) {
      throw new Error("Dimension is too small");
    }
  }

  public static override toString(): string {
    return "[LineYDimension]";
  }
}
