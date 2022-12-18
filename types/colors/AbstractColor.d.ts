export declare class AbstractColor {
    /**
     * The inner colors for elements of certain primitive
     */
    inner: number | null;
    /**
     * The border colors for elements of certain primitive
     */
    border: number | null;
    /**
     * The borderHighlight colors for elements of certain primitive
     */
    borderHighlight: number | null;
    /**
     * The left side colors for elements of certain primitive
     */
    left: number | null;
    /**
     * The right side colors for elements of certain primitive
     */
    right: number | null;
    /**
     * The horizontal colors for elements of certain primitive
     */
    horizontal: number | null;
    /**
     * The left slot side colors for elements of certain primitive
     */
    leftSlope: number | null;
    /**
     * The right slot side colors for elements of certain primitive
     */
    rightSlope: number | null;
    constructor({ inner, left, right, border, borderHighlight, horizontal, leftSlope, rightSlope, }?: {
        inner?: number | null;
        left?: number | null;
        right?: number | null;
        border?: number | null;
        borderHighlight?: number | null;
        horizontal?: number | null;
        leftSlope?: number | null;
        rightSlope?: number | null;
    });
    static toString(): string;
}
//# sourceMappingURL=AbstractColor.d.ts.map