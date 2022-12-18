import { AbstractDimension } from "./AbstractDimension";

export class LineZDimension extends AbstractDimension {
  constructor(zAxis?: number) {
    super();
    this.zAxis = zAxis || 30;

    if (this.zAxis <= 0) {
      throw new Error("Dimension is too small");
    }
  }

  public static override toString(): string {
    return "[LineZDimension]";
  }
}
