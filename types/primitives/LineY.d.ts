import { LineYDimension } from "../dimensions";
import { LineColor } from "../colors";
import { AbstractPrimitive } from "./AbstractPrimitive";
export declare class LineY extends AbstractPrimitive {
    constructor(dimension?: LineYDimension, color?: LineColor, useDefaultCanvas?: boolean);
    private initRectangle;
    private initBitmapData;
    private renderBitmapDataForCanvas;
    private build;
    static toString(): string;
}
//# sourceMappingURL=LineY.d.ts.map