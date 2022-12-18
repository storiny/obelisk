export abstract class CanvasTool {
  public static getPixel(imageData: ImageData, x: number, y: number): number {
    const { data } = imageData;
    const index = (y * imageData.width + x) * 4;
    const r = data[index]!;
    const g = data[index + 1]!;
    const b = data[index + 2]!;

    // eslint-disable-next-line no-bitwise
    return (r << 16) | (g << 8) | b;
  }

  public static toString() {
    return "[CanvasTool]";
  }
}
