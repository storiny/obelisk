import { AbstractDimension } from "./AbstractDimension";

export class PyramidDimension extends AbstractDimension {
  constructor(axis?: number, tall?: boolean) {
    super();
    this.xAxis = axis || 30;
    this.yAxis = axis || 30;
    this.tall = tall || false;

    if (this.xAxis % 2 === 1) {
      throw new Error("Axis must be an even number");
    }

    if (this.xAxis <= 4) {
      throw new Error("Dimension is too small");
    }
  }

  public static override toString(): string {
    return "[PyramidDimension]";
  }
}
