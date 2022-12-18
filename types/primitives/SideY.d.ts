import { SideYDimension } from "../dimensions";
import { SideColor } from "../colors";
import { AbstractPrimitive } from "./AbstractPrimitive";
export declare class SideY extends AbstractPrimitive {
    constructor(dimension?: SideYDimension, color?: SideColor, border?: boolean, useDefaultCanvas?: boolean);
    private initRectangle;
    private initBitmapData;
    private renderBitmapDataForCanvas;
    private build;
    static toString(): string;
}
//# sourceMappingURL=SideY.d.ts.map