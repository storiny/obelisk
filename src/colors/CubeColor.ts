import { AbstractColor } from "./AbstractColor";
import { ColorGeom } from "../utils/ColorGeom";

export class CubeColor extends AbstractColor {
  public brightnessGain = -20;

  constructor(
    border?: number,
    borderHighlight?: number,
    left?: number,
    right?: number,
    horizontal?: number
  ) {
    super();
    this.border = ColorGeom.get32(border === undefined ? 0x878787 : border);
    this.borderHighlight = ColorGeom.get32(
      borderHighlight === undefined ? 0xffffff : borderHighlight
    );
    this.left = ColorGeom.get32(left === undefined ? 0xc9cfd0 : left);
    this.right = ColorGeom.get32(right === undefined ? 0xe3e3e3 : right);
    this.horizontal = ColorGeom.get32(
      horizontal === undefined ? 0xeeeff0 : horizontal
    );
  }

  public getByHorizontalColor(horizontal: number): CubeColor {
    return new CubeColor(
      ColorGeom.applyBrightness(horizontal, this.brightnessGain * 4),
      // Apply highlight
      ColorGeom.applyBrightness(horizontal, 0, true),
      ColorGeom.applyBrightness(horizontal, this.brightnessGain * 2),
      ColorGeom.applyBrightness(horizontal, this.brightnessGain),
      horizontal
    );
  }

  public static override toString(): string {
    return "[CubeColor]";
  }
}
