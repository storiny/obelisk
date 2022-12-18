import { AbstractColor } from "./AbstractColor";
import { ColorGeom } from "../utils/ColorGeom";

export class SlopeColor extends AbstractColor {
  public brightnessGain = -20;

  constructor(
    border?: number,
    borderHighlight?: number,
    left?: number,
    right?: number,
    leftSlope?: number,
    rightSlope?: number
  ) {
    super();
    this.border = ColorGeom.get32(border === undefined ? 0x949698 : border);
    this.borderHighlight = ColorGeom.get32(
      borderHighlight === undefined ? 0xffffff : borderHighlight
    );
    this.left = ColorGeom.get32(left === undefined ? 0xc9cfd0 : left);
    this.right = ColorGeom.get32(right === undefined ? 0xe6e8e9 : right);
    this.leftSlope = ColorGeom.get32(
      leftSlope === undefined ? 0xdbdbdb : leftSlope
    );
    this.rightSlope = ColorGeom.get32(
      rightSlope === undefined ? 0xdbdbdb : rightSlope
    );
  }

  /*
   * Horizontal side doesn't actually exist in the Slope primitive.
   * You can assign the same horizontal color as cube
   * so that you will be able to arrange the slope with cube
   */
  public getByHorizontalColor(horizontal: number): SlopeColor {
    return new SlopeColor(
      ColorGeom.applyBrightness(horizontal, this.brightnessGain * 4),
      // Apply highlight
      ColorGeom.applyBrightness(horizontal, 0, true),
      ColorGeom.applyBrightness(horizontal, this.brightnessGain * 2),
      ColorGeom.applyBrightness(horizontal, this.brightnessGain),
      ColorGeom.applyBrightness(horizontal, this.brightnessGain * 1.5),
      ColorGeom.applyBrightness(horizontal, this.brightnessGain * 0.5)
    );
  }

  public static override toString(): string {
    return "[SlopeColor]";
  }
}
