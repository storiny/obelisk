export declare class BitmapData {
    imageData: ImageData | null;
    canvas: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null;
    constructor(w?: number, h?: number, useDefaultCanvas?: boolean);
    setPixel(posX: number, posY: number, color: number): void;
    setPixelByIndex(index: number, color: number): void;
    checkPixelAvailable(x: number, y: number): boolean;
    floodFill(posX: number, posY: number, color: number): void;
    static toString(): string;
}
//# sourceMappingURL=BitmapData.d.ts.map