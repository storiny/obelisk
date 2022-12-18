export class Matrix {
  /**
   * Position (0, 0) in a 3x3 matrix.
   * */
  public a: number;

  /**
   * Position (0, 1) in a 3x3 matrix.
   * */
  public b: number;

  /**
   * Position (1, 0) in a 3x3 matrix.
   * */
  public c: number;

  /**
   * Position (1, 1) in a 3x3 matrix.
   * */
  public d: number;

  /**
   * Position (2, 0) in a 3x3 matrix.
   * */
  public tx: number;

  /**
   * Position (2, 1) in a 3x3 matrix.
   * */
  public ty: number;

  constructor(
    a?: number,
    b?: number,
    c?: number,
    d?: number,
    tx?: number,
    ty?: number
  ) {
    this.a = a === undefined ? 1 : a;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d === undefined ? 1 : d;
    this.tx = tx || 0;
    this.ty = ty || 0;
  }

  public static toString(): string {
    return "[Matrix]";
  }
}
