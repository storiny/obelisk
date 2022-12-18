export declare class Matrix {
    /**
     * Position (0, 0) in a 3x3 matrix.
     * */
    a: number;
    /**
     * Position (0, 1) in a 3x3 matrix.
     * */
    b: number;
    /**
     * Position (1, 0) in a 3x3 matrix.
     * */
    c: number;
    /**
     * Position (1, 1) in a 3x3 matrix.
     * */
    d: number;
    /**
     * Position (2, 0) in a 3x3 matrix.
     * */
    tx: number;
    /**
     * Position (2, 1) in a 3x3 matrix.
     * */
    ty: number;
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    static toString(): string;
}
//# sourceMappingURL=Matrix.d.ts.map