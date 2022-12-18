/* eslint-disable no-bitwise */

import { CanvasManager } from "../utils/CanvasManager";

export class BitmapData {
  public imageData: ImageData | null;

  public canvas: HTMLCanvasElement | null;

  public context: CanvasRenderingContext2D | null;

  constructor(w?: number, h?: number, useDefaultCanvas?: boolean) {
    if (w === undefined || h === undefined) {
      throw new Error("BitmapData width or height is missing");
    }

    if (useDefaultCanvas) {
      this.canvas = CanvasManager.getDefaultCanvas();
    } else {
      this.canvas = CanvasManager.getNewCanvas();
    }

    this.imageData = null;
    this.context = null;

    if (this.canvas) {
      this.canvas.setAttribute("width", w.toString());
      this.canvas.setAttribute("height", h.toString());

      this.context = this.canvas.getContext("2d") || null;

      if (this.context) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        (this.context as any).mozImageSmoothingEnabled = false;
        (this.context as any).msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        this.imageData = this.context.createImageData(w, h);
      }
    }
  }

  public setPixel(posX: number, posY: number, color: number): void {
    if (this.imageData) {
      const index = (posY * this.imageData.width + posX) * 4;
      this.setPixelByIndex(index, color);
    }
  }

  public setPixelByIndex(index: number, color: number): void {
    if (this.imageData) {
      const pixels = this.imageData.data;

      pixels[index] = (color >>> 16) & 0xff;
      pixels[index + 1] = (color >>> 8) & 0xff;
      pixels[index + 2] = (color >>> 0) & 0xff;
      pixels[index + 3] = (color >>> 24) & 0xff;
    }
  }

  public checkPixelAvailable(x: number, y: number): boolean {
    if (this.imageData) {
      const index = (y * this.imageData.width + x) * 4;
      return this.imageData.data[index + 3] === 0;
    }

    return false;
  }

  public floodFill(posX: number, posY: number, color: number): void {
    if (((color >>> 24) & 0xff) === 0x00 || !this.imageData) {
      // Transparent flood fill
      return;
    }

    let x = posX;
    let y = posY;

    const stack: number[] = [];
    let nowCol: number[] = [];
    let prevCol: number[] = [];

    let col: number;
    let row: number;
    let matchFlag: boolean;
    let newStart: number;

    const w = this.imageData.width;
    const h = this.imageData.height;

    let i: number;
    let j: number;

    // Bound reach
    if (x < 0 || y < 0 || x >= w || y >= h) {
      return;
    }

    // First point check fail
    if (!this.checkPixelAvailable(x, y)) {
      throw new Error("Start point for flood fill is already filled");
    }

    // Left side flood fill
    for (col = x; col >= 0; col -= 1) {
      // Top side
      for (row = y; row >= 0; row -= 1) {
        if (this.checkPixelAvailable(col, row)) {
          // Available pixel
          stack.push((row * w + col) * 4);
          nowCol.push(row);
        } else {
          // First one is invalid pixel and not at col top
          if (row === y && this.checkPixelAvailable(col + 1, row - 1)) {
            // Next one is valid
            if (this.checkPixelAvailable(col, row - 1)) {
              newStart = row - 1;
            } else if (this.checkPixelAvailable(col + 1, row - 2)) {
              newStart = row - 2;
            } else {
              // Fail, assign max value to avoid loop below
              newStart = -1;
            }

            for (row = newStart; row >= 0; row -= 1) {
              if (this.checkPixelAvailable(col, row)) {
                // Available pixel
                stack.push((row * w + col) * 4);
                nowCol.push(row);
              } else {
                break;
              }
            }
          }

          break;
        }
      }

      // Bottom side
      for (row = y; row < h; row += 1) {
        if (this.checkPixelAvailable(col, row)) {
          // Available pixel
          stack.push((row * w + col) * 4);
          nowCol.push(row);
        } else {
          // First one is invalid pixel and not at col bottom
          if (row === y && this.checkPixelAvailable(col + 1, row + 1)) {
            // Next one is valid
            if (this.checkPixelAvailable(col, row + 1)) {
              newStart = row + 1;
            } else if (this.checkPixelAvailable(col + 1, row + 2)) {
              newStart = row + 2;
            } else {
              // Fail, assign max value to avoid loop below
              newStart = h;
            }

            for (row = newStart; row < h; row += 1) {
              if (this.checkPixelAvailable(col, row)) {
                // AAvailable pixel
                stack.push((row * w + col) * 4);
                nowCol.push(row);
              } else {
                break;
              }
            }
          }

          break;
        }
      }

      // Compare with previous column
      // for first column,
      // the given point should be inside the container
      if (col === x) {
        prevCol = nowCol.concat();
      }

      matchFlag = false;

      for (i = 0; i < prevCol.length; i += 1) {
        for (j = 0; j < prevCol.length; j += 1) {
          if (nowCol[j] === prevCol[i]) {
            matchFlag = true;
            y = prevCol[i]!;
            break;
          }
        }

        if (matchFlag) {
          break;
        }
      }

      if (matchFlag) {
        prevCol = nowCol.concat();
        nowCol = [];
      } else {
        // Bound reach
        break;
      }
    }

    // Reset start point
    x = posX;
    y = posY;
    prevCol = [];
    nowCol = [];

    // Right side flood fill
    for (col = x; col < w; col += 1) {
      // Top side
      for (row = y; row >= 0; row -= 1) {
        if (this.checkPixelAvailable(col, row)) {
          // Available pixel
          stack.push((row * w + col) * 4);
          nowCol.push(row);
        } else {
          // First one is invalid pixel and not at col top
          if (row === y && this.checkPixelAvailable(col - 1, row - 1)) {
            // Next one is valid
            if (this.checkPixelAvailable(col, row - 1)) {
              newStart = row - 1;
            } else if (this.checkPixelAvailable(col - 1, row - 2)) {
              newStart = row - 2;
            } else {
              // Fail, assign max value to avoid loop below
              newStart = -1;
            }

            for (row = newStart; row >= 0; row -= 1) {
              if (this.checkPixelAvailable(col, row)) {
                // Available pixel
                stack.push((row * w + col) * 4);
                nowCol.push(row);
              } else {
                break;
              }
            }
          }

          break;
        }
      }

      // Bottom side
      for (row = y; row < h; row += 1) {
        if (this.checkPixelAvailable(col, row)) {
          // Available pixel
          stack.push((row * w + col) * 4);
          nowCol.push(row);
        } else {
          // First one is invalid pixel && not at col bottom
          if (row === y && this.checkPixelAvailable(col - 1, row + 1)) {
            // Next one is valid
            if (this.checkPixelAvailable(col, row + 1)) {
              newStart = row + 1;
            } else if (this.checkPixelAvailable(col - 1, row + 2)) {
              newStart = row + 2;
            } else {
              // Fail, assign max value to avoid loop below
              newStart = h;
            }

            for (row = newStart; row < h; row += 1) {
              if (this.checkPixelAvailable(col, row)) {
                // Available pixel
                stack.push((row * w + col) * 4);
                nowCol.push(row);
              } else {
                break;
              }
            }
          }

          break;
        }
      }

      // Compare with previous column
      // for first column,
      // the given point should be inside the container
      if (col === x) {
        prevCol = nowCol.concat();
      }

      matchFlag = false;

      for (i = 0; i < prevCol.length; i += 1) {
        for (j = 0; j < prevCol.length; j += 1) {
          if (nowCol[j] === prevCol[i]) {
            matchFlag = true;
            y = prevCol[i]!;
            break;
          }
        }

        if (matchFlag) {
          break;
        }
      }

      if (matchFlag) {
        prevCol = nowCol.concat();
        nowCol = [];
      } else {
        // Bound reach
        break;
      }
    }

    // Fill image data
    for (i = 0; i < stack.length; i += 1) {
      this.setPixelByIndex(stack[i]!, color);
    }
  }

  public static toString(): string {
    return "[BitmapData]";
  }
}
