import { PyramidDimension } from "../dimensions";
import { PyramidColor } from "../colors";
import { AbstractPrimitive } from "./AbstractPrimitive";
export declare class Pyramid extends AbstractPrimitive {
    private readonly hSize;
    private readonly hOffset;
    constructor(dimension?: PyramidDimension, color?: PyramidColor, border?: boolean, useDefaultCanvas?: boolean);
    private initRectangle;
    private initBitmapData;
    private renderBitmapDataForCanvas;
    private build;
    static toString(): string;
}
//# sourceMappingURL=Pyramid.d.ts.map