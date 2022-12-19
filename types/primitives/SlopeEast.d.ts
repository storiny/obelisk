import { SlopeColor } from "../colors";
import { SlopeDimension } from "../dimensions";
import { AbstractPrimitive } from "./AbstractPrimitive";
export declare class SlopeEast extends AbstractPrimitive {
    constructor(dimension?: SlopeDimension, color?: SlopeColor, border?: boolean, useDefaultCanvas?: boolean);
    private initRectangle;
    private initBitmapData;
    private renderBitmapDataForCanvas;
    private build;
    static toString(): string;
}
//# sourceMappingURL=SlopeEast.d.ts.map