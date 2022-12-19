import type { Dimension } from "../dimensions";
import type { Color } from "../colors";
import type { BitmapData } from "../display/BitmapData";
import type { Matrix } from "../geom";
export declare class AbstractPrimitive {
    /**
     * The canvas for drawImage
     */
    canvas: HTMLCanvasElement | null;
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
    constructor({ canvas, w, h, dimension, color, border, bitmapData, useDefaultCanvas, matrix, }?: {
        canvas?: HTMLCanvasElement | null;
        w?: number | null;
        h?: number | null;
        dimension?: Dimension | null;
        color?: Color | null;
        border?: boolean | null;
        bitmapData?: BitmapData | null;
        useDefaultCanvas?: boolean | null;
        matrix?: Matrix | null;
    });
    static toString(): string;
}
//# sourceMappingURL=AbstractPrimitive.d.ts.map