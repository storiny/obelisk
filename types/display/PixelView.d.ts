import { Point } from "../geom";
import { PixelObject } from "./PixelObject";
export declare class PixelView {
    canvas: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null;
    point: Point | null;
    constructor(canvas?: HTMLCanvasElement, point?: Point);
    renderObject(primitive: ConstructorParameters<typeof PixelObject>[0], point3D: ConstructorParameters<typeof PixelObject>[1]): void;
    clear(): void;
    static toString(): string;
}
//# sourceMappingURL=PixelView.d.ts.map