import { SideXDimension } from "../dimensions";
import { SideColor } from "../colors";
import { AbstractPrimitive } from "./AbstractPrimitive";
export declare class SideX extends AbstractPrimitive {
    constructor(dimension?: SideXDimension, color?: SideColor, border?: boolean, useDefaultCanvas?: boolean);
    private initRectangle;
    private initBitmapData;
    private renderBitmapDataForCanvas;
    private build;
    static toString(): string;
}
//# sourceMappingURL=SideX.d.ts.map