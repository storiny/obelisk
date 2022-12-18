export abstract class CanvasManager {
  public static defaultCanvas: HTMLCanvasElement | null;

  public static getDefaultCanvas(): HTMLCanvasElement | null {
    this.defaultCanvas = this.defaultCanvas || document.createElement("canvas");
    return this.defaultCanvas;
  }

  public static getNewCanvas(): HTMLCanvasElement {
    return document.createElement("canvas");
  }

  public static toString(): string {
    return "[CanvasManager]";
  }
}
