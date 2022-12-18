import { AbstractColor } from "./AbstractColor";
import { ColorGeom } from "../utils/ColorGeom";

export class LineColor extends AbstractColor {
  constructor(border?: number, inner?: number) {
    super({ border: border || null, inner: inner || null });
    this.border = ColorGeom.get32(border === undefined ? 0x878787 : border);
  }

  public static override toString(): string {
    return "[LineColor]";
  }
}
