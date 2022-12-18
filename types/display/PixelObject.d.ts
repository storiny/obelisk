import { Point3D } from "../geom";
import type { AbstractPrimitive } from "../primitives";
export declare class PixelObject {
    x: number | null;
    y: number | null;
    canvas: HTMLCanvasElement | null;
    constructor(primitive?: AbstractPrimitive, point3D?: Point3D);
    static toString(): string;
}
//# sourceMappingURL=PixelObject.d.ts.map