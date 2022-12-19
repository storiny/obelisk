import { CubeDimension } from "../dimensions";
import { CubeColor } from "../colors";
import { AbstractPrimitive } from "./AbstractPrimitive";
export declare class Cube extends AbstractPrimitive {
    constructor(dimension?: CubeDimension, color?: CubeColor, border?: boolean, useDefaultCanvas?: boolean);
    private initRectangle;
    private initBitmapData;
    private renderBitmapDataForCanvas;
    private build;
    static toString(): string;
}
//# sourceMappingURL=Cube.d.ts.map