import { AbstractColor } from "./AbstractColor";
import { ColorGeom } from "../utils/ColorGeom";

export class SideColor extends AbstractColor {
  public brightnessGain = -20;

  constructor(border?: number, inner?: number) {
    super();
    this.border = ColorGeom.get32(border === undefined ? 0x878787 : border);
    this.inner = ColorGeom.get32(inner === undefined ? 0xeeeeee : inner);
  }

  public getByInnerColor(inner: number): SideColor {
    return new SideColor(
      ColorGeom.applyBrightness(inner, this.brightnessGain * 4),
      inner
    );
  }

  public static override toString(): string {
    return "[SideColor]";
  }
}
