import { AbstractColor } from "./AbstractColor";
export declare class CubeColor extends AbstractColor {
    brightnessGain: number;
    constructor(border?: number, borderHighlight?: number, left?: number, right?: number, horizontal?: number);
    getByHorizontalColor(horizontal: number): CubeColor;
    static toString(): string;
}
//# sourceMappingURL=CubeColor.d.ts.map