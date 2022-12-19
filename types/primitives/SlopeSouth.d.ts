import { SlopeDimension } from "../dimensions";
import { SlopeColor } from "../colors";
import { AbstractPrimitive } from "./AbstractPrimitive";
export declare class SlopeSouth extends AbstractPrimitive {
    constructor(dimension?: SlopeDimension, color?: SlopeColor, border?: boolean, useDefaultCanvas?: boolean);
    private initRectangle;
    private initBitmapData;
    private renderBitmapDataForCanvas;
    private build;
    static toString(): string;
}
//# sourceMappingURL=SlopeSouth.d.ts.map