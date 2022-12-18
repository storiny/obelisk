export class Point {
  public x: number;

  public y: number;

  constructor(x?: number, y?: number) {
    this.x = x === undefined ? 0 : x;
    this.y = y === undefined ? 0 : y;
  }

  public toString(): string {
    return `[Point x: ${this.x}, y: ${this.y}]`;
  }
}
