export class AbstractDimension {
  /**
   * The x Axis dimensions in 22.6 degrees coordinate
   */
  public xAxis: number | null;

  /**
   * The y Axis dimensions in 22.6 degrees coordinate
   */
  public yAxis: number | null;

  /**
   * The z Axis dimensions in 22.6 degrees coordinate
   */
  public zAxis: number | null;

  /**
   * Pyramid tall mode
   */
  public tall: boolean;

  constructor({
    xAxis = null,
    yAxis = null,
    zAxis = null,
    tall = false,
  }: {
    xAxis?: number | null;
    yAxis?: number | null;
    zAxis?: number | null;
    tall?: boolean;
  } = {}) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.zAxis = zAxis;
    this.tall = tall;
  }

  public static toString(): string {
    return "[AbstractDimension]";
  }
}
