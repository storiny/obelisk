import { AbstractColor } from "./AbstractColor";
export declare class SlopeColor extends AbstractColor {
    brightnessGain: number;
    constructor(border?: number, borderHighlight?: number, left?: number, right?: number, leftSlope?: number, rightSlope?: number);
    getByHorizontalColor(horizontal: number): SlopeColor;
    static toString(): string;
}
//# sourceMappingURL=SlopeColor.d.ts.map