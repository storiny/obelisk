export class AbstractColor {
  /**
   * The inner colors for elements of certain primitive
   */
  public inner: number | null;

  /**
   * The border colors for elements of certain primitive
   */
  public border: number | null;

  /**
   * The borderHighlight colors for elements of certain primitive
   */
  public borderHighlight: number | null;

  /**
   * The left side colors for elements of certain primitive
   */
  public left: number | null;

  /**
   * The right side colors for elements of certain primitive
   */
  public right: number | null;

  /**
   * The horizontal colors for elements of certain primitive
   */
  public horizontal: number | null;

  /**
   * The left slot side colors for elements of certain primitive
   */
  public leftSlope: number | null;

  /**
   * The right slot side colors for elements of certain primitive
   */
  public rightSlope: number | null;

  constructor({
    inner = null,
    left = null,
    right = null,
    border = null,
    borderHighlight = null,
    horizontal = null,
    leftSlope = null,
    rightSlope = null,
  }: {
    inner?: number | null;
    left?: number | null;
    right?: number | null;
    border?: number | null;
    borderHighlight?: number | null;
    horizontal?: number | null;
    leftSlope?: number | null;
    rightSlope?: number | null;
  } = {}) {
    this.inner = inner;
    this.left = left;
    this.right = right;
    this.border = border;
    this.borderHighlight = borderHighlight;
    this.horizontal = horizontal;
    this.leftSlope = leftSlope;
    this.rightSlope = rightSlope;
  }

  public static toString(): string {
    return "[AbstractColor]";
  }
}
