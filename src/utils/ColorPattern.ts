export abstract class ColorPattern {
  public GRASS_GREEN: number;

  public YELLOW: number;

  public WINE_RED: number;

  public PINK: number;

  public PURPLE: number;

  public BLUE: number;

  public GRAY: number;

  public BLACK: number;

  public FINE_COLORS: number[];

  protected constructor() {
    this.GRASS_GREEN = 0xccff00;
    this.YELLOW = 0xffff00;
    this.WINE_RED = 0xff0099;
    this.PINK = 0xff7cbf;
    this.PURPLE = 0xcc00ff;
    this.BLUE = 0x00ccff;
    this.GRAY = 0xeeeeee;
    this.BLACK = 0x666666;

    this.FINE_COLORS = [
      this.GRASS_GREEN,
      this.YELLOW,
      this.WINE_RED,
      this.PINK,
      this.PURPLE,
      this.BLUE,
      this.GRAY,
      this.BLACK,
    ];
  }

  public getRandomComfortableColor(): number {
    return this.FINE_COLORS[
      Math.floor(Math.random() * this.FINE_COLORS.length)
    ]!;
  }

  public static toString(): string {
    return "[ColorPattern]";
  }
}
