import { AbstractColor } from "./AbstractColor";
import { ColorGeom } from "../utils/ColorGeom";

export class PyramidColor extends AbstractColor {
  public brightnessGain = -20;

  constructor(
    border?: number,
    borderHighlight?: number,
    left?: number,
    right?: number
  ) {
    super();
    this.border = ColorGeom.get32(border === undefined ? 0x949698 : border);
    this.borderHighlight = ColorGeom.get32(
      borderHighlight === undefined ? 0xffffff : borderHighlight
    );
    this.left = ColorGeom.get32(left === undefined ? 0xe6e8e9 : left);
    this.right = ColorGeom.get32(right === undefined ? 0xeeeff0 : right);
  }

  public getByRightColor(right: number): PyramidColor {
    return new PyramidColor(
      ColorGeom.applyBrightness(right, this.brightnessGain * 4),
      // Apply highlight
      ColorGeom.applyBrightness(right, 0, true),
      ColorGeom.applyBrightness(right, this.brightnessGain),
      right
    );
  }

  public static override toString(): string {
    return "[PyramidColor]";
  }
}
