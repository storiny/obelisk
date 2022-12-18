const GRASS_GREEN = 0xccff00;
const YELLOW = 0xffff00;
const WINE_RED = 0xff0099;
const PINK = 0xff7cbf;
const PURPLE = 0xcc00ff;
const BLUE = 0x00ccff;
const GRAY = 0xeeeeee;
const BLACK = 0x666666;

const FINE_COLORS = [
  GRASS_GREEN,
  YELLOW,
  WINE_RED,
  PINK,
  PURPLE,
  BLUE,
  GRAY,
  BLACK,
];

export abstract class ColorPattern {
  public static getRandomComfortableColor(): number {
    return FINE_COLORS[Math.floor(Math.random() * FINE_COLORS.length)]!;
  }

  public static toString(): string {
    return "[ColorPattern]";
  }
}
