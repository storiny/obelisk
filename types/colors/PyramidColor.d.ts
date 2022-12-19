import { AbstractColor } from "./AbstractColor";
export declare class PyramidColor extends AbstractColor {
    brightnessGain: number;
    constructor(border?: number, borderHighlight?: number, left?: number, right?: number);
    getByRightColor(right: number): PyramidColor;
    static toString(): string;
}
//# sourceMappingURL=PyramidColor.d.ts.map