/* eslint-disable no-bitwise */

export abstract class ColorGeom {
  public static get32(color: number): number {
    return color < 0xff000000 ? color + 0xff000000 : color;
  }

  public static applyBrightness(
    color: number,
    brightness: number,
    highlight?: boolean
  ): number {
    let r;
    let g;
    let b;
    let y;

    const a = (color >>> 24) & 0x000000ff;
    r = (color >>> 16) & 0x000000ff;
    g = (color >>> 8) & 0x000000ff;
    b = color & 0x000000ff;

    y = ((r * 313524) >> 20) + ((g * 615514) >> 20) + ((b * 119538) >> 20);
    const u =
      -((155189 * r) >> 20) - ((303038 * g) >> 20) + ((458227 * b) >> 20);
    const v =
      ((644874 * r) >> 20) - ((540016 * g) >> 20) - ((104857 * b) >> 20);

    if (!highlight) {
      y += brightness;
    } else {
      y = 60 + y ** 1.2;
    }

    r = y + ((1195376 * v) >> 20);
    g = y - ((408944 * u) >> 20) - ((608174 * v) >> 20);
    b = y + ((2128609 * u) >> 20);

    r = Math.max(0, Math.min(r, 255));
    g = Math.max(0, Math.min(g, 255));
    b = Math.max(0, Math.min(b, 255));

    return (a << 24) | (r << 16) | (g << 8) | b;
  }
}

ColorGeom.toString = () => "[ColorGeom]";
