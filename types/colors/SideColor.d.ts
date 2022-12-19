import { AbstractColor } from "./AbstractColor";
export declare class SideColor extends AbstractColor {
    brightnessGain: number;
    constructor(border?: number, inner?: number);
    getByInnerColor(inner: number): SideColor;
    static toString(): string;
}
//# sourceMappingURL=SideColor.d.ts.map