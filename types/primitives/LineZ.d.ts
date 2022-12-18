import { LineZDimension } from "../dimensions";
import { LineColor } from "../colors";
import { AbstractPrimitive } from "./AbstractPrimitive";
export declare class LineZ extends AbstractPrimitive {
    constructor(dimension?: LineZDimension, color?: LineColor, useDefaultCanvas?: boolean);
    private initRectangle;
    private initBitmapData;
    private renderBitmapDataForCanvas;
    private build;
    static toString(): string;
}
//# sourceMappingURL=LineZ.d.ts.map