export declare class AbstractDimension {
    /**
     * The x Axis dimensions in 22.6 degrees coordinate
     */
    xAxis: number | null;
    /**
     * The y Axis dimensions in 22.6 degrees coordinate
     */
    yAxis: number | null;
    /**
     * The z Axis dimensions in 22.6 degrees coordinate
     */
    zAxis: number | null;
    /**
     * Pyramid tall mode
     */
    tall: boolean;
    constructor({ xAxis, yAxis, zAxis, tall, }?: {
        xAxis?: number | null;
        yAxis?: number | null;
        zAxis?: number | null;
        tall?: boolean;
    });
    static toString(): string;
}
//# sourceMappingURL=AbstractDimension.d.ts.map