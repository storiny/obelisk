import { LineXDimension } from "../dimensions";
import { LineColor } from "../colors";
import { AbstractPrimitive } from "./AbstractPrimitive";
export declare class LineX extends AbstractPrimitive {
    constructor(dimension?: LineXDimension, color?: LineColor, useDefaultCanvas?: boolean);
    private initRectangle;
    private initBitmapData;
    private renderBitmapDataForCanvas;
    private build;
    static toString(): string;
}
//# sourceMappingURL=LineX.d.ts.map