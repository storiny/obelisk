import { BrickDimension } from "../dimensions";
import { SideColor } from "../colors";
import { AbstractPrimitive } from "./AbstractPrimitive";
export declare class Brick extends AbstractPrimitive {
    constructor(dimension?: BrickDimension, color?: SideColor, border?: boolean, useDefaultCanvas?: boolean);
    private initRectangle;
    private initBitmapData;
    private renderBitmapDataForCanvas;
    private build;
    static toString(): string;
}
//# sourceMappingURL=Brick.d.ts.map