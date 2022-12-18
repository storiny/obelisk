import type { Dimension } from "../dimensions";
import type { Color } from "../colors";
import type { BitmapData } from "../display/BitmapData";
import type { Matrix } from "../geom";

export class AbstractPrimitive {
  /**
   * The canvas for drawImage
   */
  public canvas: HTMLCanvasElement | null;

  /**
   * The width of the bitmap in 2d flash coordinate
   */
  protected w: number | null;

  /**
   * The height of the bitmap in 2d flash coordinate
   */
  protected h: number | null;

  /**
   * The dimension of primitive in 3d pixel coordinate
   */
  protected dimension: Dimension | null;

  /**
   * The color obj of the primitive
   */
  protected color: Color | null;

  /**
   * The border option of the primitive
   */
  protected border: boolean | null;

  /**
   * The source bitmapData containing pixel graphic
   */
  protected bitmapData: BitmapData | null;

  /**
   * The preserve canvas option
   */
  protected useDefaultCanvas: boolean | null;

  /**
   * The matrix offset between the bitmap and the 3d pixel coordinate zero point
   */
  protected matrix: Matrix | null;

  constructor({
    canvas = null,
    w = null,
    h = null,
    dimension = null,
    color = null,
    border = null,
    bitmapData = null,
    useDefaultCanvas = null,
    matrix = null,
  }: {
    canvas?: HTMLCanvasElement | null;
    w?: number | null;
    h?: number | null;
    dimension?: Dimension | null;
    color?: Color | null;
    border?: boolean | null;
    bitmapData?: BitmapData | null;
    useDefaultCanvas?: boolean | null;
    matrix?: Matrix | null;
  } = {}) {
    this.canvas = canvas;
    this.w = w;
    this.h = h;
    this.dimension = dimension;
    this.color = color;
    this.border = border;
    this.bitmapData = bitmapData;
    this.useDefaultCanvas = useDefaultCanvas;
    this.matrix = matrix;
  }

  public static toString(): string {
    return "[AbstractPrimitive]";
  }
}
