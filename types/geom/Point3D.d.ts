import { Point } from "./Point";
export declare class Point3D {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    toGlobalCoordinates(offset?: {
        x: number;
        y: number;
    }): Point;
    toString(): string;
}
//# sourceMappingURL=Point3D.d.ts.map