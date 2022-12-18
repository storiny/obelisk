/*!
 * Obelisk (TS) v1.0.0
 * Copyright (c) Max Huang, Storiny
 * Fork (https://github.com/storiny/obelisk) of https://github.com/nosir/obelisk.js
 * Released under the MIT License.
 */

var AbstractColor = /** @class */ (function () {
    function AbstractColor(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.inner, inner = _c === void 0 ? null : _c, _d = _b.left, left = _d === void 0 ? null : _d, _e = _b.right, right = _e === void 0 ? null : _e, _f = _b.border, border = _f === void 0 ? null : _f, _g = _b.borderHighlight, borderHighlight = _g === void 0 ? null : _g, _h = _b.horizontal, horizontal = _h === void 0 ? null : _h, _j = _b.leftSlope, leftSlope = _j === void 0 ? null : _j, _k = _b.rightSlope, rightSlope = _k === void 0 ? null : _k;
        this.inner = inner;
        this.left = left;
        this.right = right;
        this.border = border;
        this.borderHighlight = borderHighlight;
        this.horizontal = horizontal;
        this.leftSlope = leftSlope;
        this.rightSlope = rightSlope;
    }
    AbstractColor.toString = function () {
        return "[AbstractColor]";
    };
    return AbstractColor;
}());

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/* eslint-disable no-bitwise */
var ColorGeom = /** @class */ (function () {
    function ColorGeom() {
    }
    ColorGeom.get32 = function (color) {
        return color < 0xff000000 ? color + 0xff000000 : color;
    };
    ColorGeom.applyBrightness = function (color, brightness, highlight) {
        var r;
        var g;
        var b;
        var y;
        var a = (color >>> 24) & 0x000000ff;
        r = (color >>> 16) & 0x000000ff;
        g = (color >>> 8) & 0x000000ff;
        b = color & 0x000000ff;
        y = ((r * 313524) >> 20) + ((g * 615514) >> 20) + ((b * 119538) >> 20);
        var u = -((155189 * r) >> 20) - ((303038 * g) >> 20) + ((458227 * b) >> 20);
        var v = ((644874 * r) >> 20) - ((540016 * g) >> 20) - ((104857 * b) >> 20);
        if (!highlight) {
            y += brightness;
        }
        else {
            y = 60 + Math.pow(y, 1.2);
        }
        r = y + ((1195376 * v) >> 20);
        g = y - ((408944 * u) >> 20) - ((608174 * v) >> 20);
        b = y + ((2128609 * u) >> 20);
        r = Math.max(0, Math.min(r, 255));
        g = Math.max(0, Math.min(g, 255));
        b = Math.max(0, Math.min(b, 255));
        return (a << 24) | (r << 16) | (g << 8) | b;
    };
    return ColorGeom;
}());
ColorGeom.toString = function () { return "[ColorGeom]"; };

var CubeColor = /** @class */ (function (_super) {
    __extends(CubeColor, _super);
    function CubeColor(border, borderHighlight, left, right, horizontal) {
        var _this = _super.call(this) || this;
        _this.brightnessGain = -20;
        _this.border = ColorGeom.get32(border === undefined ? 0x878787 : border);
        _this.borderHighlight = ColorGeom.get32(borderHighlight === undefined ? 0xffffff : borderHighlight);
        _this.left = ColorGeom.get32(left === undefined ? 0xc9cfd0 : left);
        _this.right = ColorGeom.get32(right === undefined ? 0xe3e3e3 : right);
        _this.horizontal = ColorGeom.get32(horizontal === undefined ? 0xeeeff0 : horizontal);
        return _this;
    }
    CubeColor.prototype.getByHorizontalColor = function (horizontal) {
        return new CubeColor(ColorGeom.applyBrightness(horizontal, this.brightnessGain * 4), 
        // Apply highlight
        ColorGeom.applyBrightness(horizontal, 0, true), ColorGeom.applyBrightness(horizontal, this.brightnessGain * 2), ColorGeom.applyBrightness(horizontal, this.brightnessGain), horizontal);
    };
    CubeColor.toString = function () {
        return "[CubeColor]";
    };
    return CubeColor;
}(AbstractColor));

var LineColor = /** @class */ (function (_super) {
    __extends(LineColor, _super);
    function LineColor(border, inner) {
        var _this = _super.call(this, { border: border || null, inner: inner || null }) || this;
        _this.border = ColorGeom.get32(border === undefined ? 0x878787 : border);
        return _this;
    }
    LineColor.toString = function () {
        return "[LineColor]";
    };
    return LineColor;
}(AbstractColor));

var PyramidColor = /** @class */ (function (_super) {
    __extends(PyramidColor, _super);
    function PyramidColor(border, borderHighlight, left, right) {
        var _this = _super.call(this) || this;
        _this.brightnessGain = -20;
        _this.border = ColorGeom.get32(border === undefined ? 0x949698 : border);
        _this.borderHighlight = ColorGeom.get32(borderHighlight === undefined ? 0xffffff : borderHighlight);
        _this.left = ColorGeom.get32(left === undefined ? 0xe6e8e9 : left);
        _this.right = ColorGeom.get32(right === undefined ? 0xeeeff0 : right);
        return _this;
    }
    PyramidColor.prototype.getByRightColor = function (right) {
        return new PyramidColor(ColorGeom.applyBrightness(right, this.brightnessGain * 4), 
        // Apply highlight
        ColorGeom.applyBrightness(right, 0, true), ColorGeom.applyBrightness(right, this.brightnessGain), right);
    };
    PyramidColor.toString = function () {
        return "[PyramidColor]";
    };
    return PyramidColor;
}(AbstractColor));

var SideColor = /** @class */ (function (_super) {
    __extends(SideColor, _super);
    function SideColor(border, inner) {
        var _this = _super.call(this) || this;
        _this.brightnessGain = -20;
        _this.border = ColorGeom.get32(border === undefined ? 0x878787 : border);
        _this.inner = ColorGeom.get32(inner === undefined ? 0xeeeeee : inner);
        return _this;
    }
    SideColor.prototype.getByInnerColor = function (inner) {
        return new SideColor(ColorGeom.applyBrightness(inner, this.brightnessGain * 4), inner);
    };
    SideColor.toString = function () {
        return "[SideColor]";
    };
    return SideColor;
}(AbstractColor));

var SlopeColor = /** @class */ (function (_super) {
    __extends(SlopeColor, _super);
    function SlopeColor(border, borderHighlight, left, right, leftSlope, rightSlope) {
        var _this = _super.call(this) || this;
        _this.brightnessGain = -20;
        _this.border = ColorGeom.get32(border === undefined ? 0x949698 : border);
        _this.borderHighlight = ColorGeom.get32(borderHighlight === undefined ? 0xffffff : borderHighlight);
        _this.left = ColorGeom.get32(left === undefined ? 0xc9cfd0 : left);
        _this.right = ColorGeom.get32(right === undefined ? 0xe6e8e9 : right);
        _this.leftSlope = ColorGeom.get32(leftSlope === undefined ? 0xdbdbdb : leftSlope);
        _this.rightSlope = ColorGeom.get32(rightSlope === undefined ? 0xdbdbdb : rightSlope);
        return _this;
    }
    /*
     * Horizontal side doesn't actually exist in the Slope primitive.
     * You can assign the same horizontal color as cube
     * so that you will be able to arrange the slope with cube
     */
    SlopeColor.prototype.getByHorizontalColor = function (horizontal) {
        return new SlopeColor(ColorGeom.applyBrightness(horizontal, this.brightnessGain * 4), 
        // Apply highlight
        ColorGeom.applyBrightness(horizontal, 0, true), ColorGeom.applyBrightness(horizontal, this.brightnessGain * 2), ColorGeom.applyBrightness(horizontal, this.brightnessGain), ColorGeom.applyBrightness(horizontal, this.brightnessGain * 1.5), ColorGeom.applyBrightness(horizontal, this.brightnessGain * 0.5));
    };
    SlopeColor.toString = function () {
        return "[SlopeColor]";
    };
    return SlopeColor;
}(AbstractColor));

var AbstractDimension = /** @class */ (function () {
    function AbstractDimension(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.xAxis, xAxis = _c === void 0 ? null : _c, _d = _b.yAxis, yAxis = _d === void 0 ? null : _d, _e = _b.zAxis, zAxis = _e === void 0 ? null : _e, _f = _b.tall, tall = _f === void 0 ? false : _f;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.zAxis = zAxis;
        this.tall = tall;
    }
    AbstractDimension.toString = function () {
        return "[AbstractDimension]";
    };
    return AbstractDimension;
}());

var BrickDimension = /** @class */ (function (_super) {
    __extends(BrickDimension, _super);
    function BrickDimension(xAxis, yAxis) {
        var _this = _super.call(this) || this;
        _this.xAxis = xAxis || 30;
        _this.yAxis = yAxis || 30;
        if (_this.xAxis % 2 === 1 || _this.yAxis % 2 === 1) {
            throw new Error("xAxis / yAxis must be an even number");
        }
        // If xAxis or yAxis = 4 then floodFill can not be applied
        if (_this.xAxis <= 4 || _this.yAxis <= 4) {
            throw new Error("Dimensions are too small");
        }
        return _this;
    }
    BrickDimension.toString = function () {
        return "[BrickDimension]";
    };
    return BrickDimension;
}(AbstractDimension));

var CubeDimension = /** @class */ (function (_super) {
    __extends(CubeDimension, _super);
    function CubeDimension(xAxis, yAxis, zAxis) {
        var _this = _super.call(this) || this;
        _this.xAxis = xAxis || 30;
        _this.yAxis = yAxis || 30;
        _this.zAxis = zAxis || 30;
        if (_this.xAxis % 2 === 1 || _this.yAxis % 2 === 1) {
            throw new Error("xAxis / yAxis must be an even number");
        }
        // If axis = 4 then floodFill can not be applied
        if (_this.xAxis <= 4 || _this.yAxis <= 4 || _this.zAxis <= 2) {
            throw new Error("Dimensions are too small");
        }
        return _this;
    }
    CubeDimension.toString = function () {
        return "[CubeDimension]";
    };
    return CubeDimension;
}(AbstractDimension));

var LineXDimension = /** @class */ (function (_super) {
    __extends(LineXDimension, _super);
    function LineXDimension(xAxis) {
        var _this = _super.call(this) || this;
        _this.xAxis = xAxis || 30;
        if (_this.xAxis % 2 === 1) {
            throw new Error("xAxis must be an even number");
        }
        if (_this.xAxis < 2) {
            throw new Error("Dimension is too small");
        }
        return _this;
    }
    LineXDimension.toString = function () {
        return "[LineXDimension]";
    };
    return LineXDimension;
}(AbstractDimension));

var LineYDimension = /** @class */ (function (_super) {
    __extends(LineYDimension, _super);
    function LineYDimension(yAxis) {
        var _this = _super.call(this) || this;
        _this.yAxis = yAxis || 30;
        if (_this.yAxis % 2 === 1) {
            throw new Error("yAxis must be an even number");
        }
        if (_this.yAxis < 2) {
            throw new Error("Dimension is too small");
        }
        return _this;
    }
    LineYDimension.toString = function () {
        return "[LineYDimension]";
    };
    return LineYDimension;
}(AbstractDimension));

var LineZDimension = /** @class */ (function (_super) {
    __extends(LineZDimension, _super);
    function LineZDimension(zAxis) {
        var _this = _super.call(this) || this;
        _this.zAxis = zAxis || 30;
        if (_this.zAxis <= 0) {
            throw new Error("Dimension is too small");
        }
        return _this;
    }
    LineZDimension.toString = function () {
        return "[LineZDimension]";
    };
    return LineZDimension;
}(AbstractDimension));

var PyramidDimension = /** @class */ (function (_super) {
    __extends(PyramidDimension, _super);
    function PyramidDimension(axis, tall) {
        var _this = _super.call(this) || this;
        _this.xAxis = axis || 30;
        _this.yAxis = axis || 30;
        _this.tall = tall || false;
        if (_this.xAxis % 2 === 1) {
            throw new Error("Axis must be an even number");
        }
        if (_this.xAxis <= 4) {
            throw new Error("Dimension is too small");
        }
        return _this;
    }
    PyramidDimension.toString = function () {
        return "[PyramidDimension]";
    };
    return PyramidDimension;
}(AbstractDimension));

var SideXDimension = /** @class */ (function (_super) {
    __extends(SideXDimension, _super);
    function SideXDimension(xAxis, zAxis) {
        var _this = _super.call(this) || this;
        _this.xAxis = xAxis || 30;
        _this.zAxis = zAxis || 30;
        if (_this.xAxis % 2 === 1) {
            throw new Error("xAxis must be an even number");
        }
        // If xAxis or zAxis = 4 floodFill cannot be applied
        if (_this.xAxis <= 4 || _this.zAxis <= 2) {
            throw new Error("Dimensions are too small");
        }
        return _this;
    }
    SideXDimension.toString = function () {
        return "[SideXDimension]";
    };
    return SideXDimension;
}(AbstractDimension));

var SideYDimension = /** @class */ (function (_super) {
    __extends(SideYDimension, _super);
    function SideYDimension(yAxis, zAxis) {
        var _this = _super.call(this) || this;
        _this.yAxis = yAxis || 30;
        _this.zAxis = zAxis || 30;
        if (_this.yAxis % 2 === 1) {
            throw new Error("yAxis must be an even number");
        }
        // If yAxis or zAxis = 4 floodFill cannot be applied
        if (_this.yAxis <= 4 || _this.zAxis <= 2) {
            throw new Error("Dimensions are too small");
        }
        return _this;
    }
    SideYDimension.toString = function () {
        return "[SideYDimension]";
    };
    return SideYDimension;
}(AbstractDimension));

var SlopeDimension = /** @class */ (function (_super) {
    __extends(SlopeDimension, _super);
    function SlopeDimension(xAxis, yAxis) {
        var _this = _super.call(this) || this;
        _this.xAxis = xAxis || 30;
        _this.yAxis = yAxis || 30;
        if (_this.xAxis % 2 === 1 || _this.yAxis % 2 === 1) {
            throw new Error("xAxis and yAxis must be even numbers");
        }
        if (_this.xAxis <= 4 || _this.yAxis <= 4) {
            throw new Error("Dimensions are too small");
        }
        return _this;
    }
    SlopeDimension.toString = function () {
        return "[SlopeDimension]";
    };
    return SlopeDimension;
}(AbstractDimension));

var AbstractPrimitive = /** @class */ (function () {
    function AbstractPrimitive(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.canvas, canvas = _c === void 0 ? null : _c, _d = _b.w, w = _d === void 0 ? null : _d, _e = _b.h, h = _e === void 0 ? null : _e, _f = _b.dimension, dimension = _f === void 0 ? null : _f, _g = _b.color, color = _g === void 0 ? null : _g, _h = _b.border, border = _h === void 0 ? null : _h, _j = _b.bitmapData, bitmapData = _j === void 0 ? null : _j, _k = _b.useDefaultCanvas, useDefaultCanvas = _k === void 0 ? null : _k, _l = _b.matrix, matrix = _l === void 0 ? null : _l;
        this.canvas = canvas;
        this.w = w;
        this.h = h;
        this.dimension = dimension;
        this.color = color;
        this.border = border;
        this.bitmapData = bitmapData;
        this.useDefaultCanvas = useDefaultCanvas;
        this.matrix = matrix;
    }
    AbstractPrimitive.toString = function () {
        return "[AbstractPrimitive]";
    };
    return AbstractPrimitive;
}());

var Matrix = /** @class */ (function () {
    function Matrix(a, b, c, d, tx, ty) {
        this.a = a === undefined ? 1 : a;
        this.b = b || 0;
        this.c = c || 0;
        this.d = d === undefined ? 1 : d;
        this.tx = tx || 0;
        this.ty = ty || 0;
    }
    Matrix.toString = function () {
        return "[Matrix]";
    };
    return Matrix;
}());

var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x === undefined ? 0 : x;
        this.y = y === undefined ? 0 : y;
    }
    Point.prototype.toString = function () {
        return "[Point x: ".concat(this.x, ", y: ").concat(this.y, "]");
    };
    return Point;
}());

var Point3D = /** @class */ (function () {
    function Point3D(x, y, z) {
        this.x = x === undefined ? 0 : x;
        this.y = y === undefined ? 0 : y;
        this.z = z === undefined ? 0 : z;
    }
    Point3D.prototype.toGlobalCoordinates = function (offset) {
        var p2D = new Point(this.x - this.y, Math.floor(this.x / 2 + this.y / 2) - this.z);
        if (offset !== undefined) {
            p2D.x += offset.x;
            p2D.y += offset.y;
        }
        return p2D;
    };
    Point3D.prototype.toString = function () {
        return "[Point3D x : ".concat(this.x, ", y : ").concat(this.y, ", z: ").concat(this.z, "]");
    };
    return Point3D;
}());

var CanvasManager = /** @class */ (function () {
    function CanvasManager() {
    }
    CanvasManager.getDefaultCanvas = function () {
        this.defaultCanvas = this.defaultCanvas || document.createElement("canvas");
        return this.defaultCanvas;
    };
    CanvasManager.getNewCanvas = function () {
        return document.createElement("canvas");
    };
    CanvasManager.toString = function () {
        return "[CanvasManager]";
    };
    return CanvasManager;
}());

/* eslint-disable no-bitwise */
var BitmapData = /** @class */ (function () {
    function BitmapData(w, h, useDefaultCanvas) {
        if (w === undefined || h === undefined) {
            throw new Error("BitmapData width or height is missing");
        }
        if (useDefaultCanvas) {
            this.canvas = CanvasManager.getDefaultCanvas();
        }
        else {
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
                this.context.mozImageSmoothingEnabled = false;
                this.context.msImageSmoothingEnabled = false;
                this.context.imageSmoothingEnabled = false;
                this.imageData = this.context.createImageData(w, h);
            }
        }
    }
    BitmapData.prototype.setPixel = function (posX, posY, color) {
        if (this.imageData) {
            var index = (posY * this.imageData.width + posX) * 4;
            this.setPixelByIndex(index, color);
        }
    };
    BitmapData.prototype.setPixelByIndex = function (index, color) {
        if (this.imageData) {
            var pixels = this.imageData.data;
            pixels[index] = (color >>> 16) & 0xff;
            pixels[index + 1] = (color >>> 8) & 0xff;
            pixels[index + 2] = (color >>> 0) & 0xff;
            pixels[index + 3] = (color >>> 24) & 0xff;
        }
    };
    BitmapData.prototype.checkPixelAvailable = function (x, y) {
        if (this.imageData) {
            var index = (y * this.imageData.width + x) * 4;
            return this.imageData.data[index + 3] === 0;
        }
        return false;
    };
    BitmapData.prototype.floodFill = function (posX, posY, color) {
        if (((color >>> 24) & 0xff) === 0x00 || !this.imageData) {
            // Transparent flood fill
            return;
        }
        var x = posX;
        var y = posY;
        var stack = [];
        var nowCol = [];
        var prevCol = [];
        var col;
        var row;
        var matchFlag;
        var newStart;
        var w = this.imageData.width;
        var h = this.imageData.height;
        var i;
        var j;
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
                }
                else {
                    // First one is invalid pixel and not at col top
                    if (row === y && this.checkPixelAvailable(col + 1, row - 1)) {
                        // Next one is valid
                        if (this.checkPixelAvailable(col, row - 1)) {
                            newStart = row - 1;
                        }
                        else if (this.checkPixelAvailable(col + 1, row - 2)) {
                            newStart = row - 2;
                        }
                        else {
                            // Fail, assign max value to avoid loop below
                            newStart = -1;
                        }
                        for (row = newStart; row >= 0; row -= 1) {
                            if (this.checkPixelAvailable(col, row)) {
                                // Available pixel
                                stack.push((row * w + col) * 4);
                                nowCol.push(row);
                            }
                            else {
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
                }
                else {
                    // First one is invalid pixel and not at col bottom
                    if (row === y && this.checkPixelAvailable(col + 1, row + 1)) {
                        // Next one is valid
                        if (this.checkPixelAvailable(col, row + 1)) {
                            newStart = row + 1;
                        }
                        else if (this.checkPixelAvailable(col + 1, row + 2)) {
                            newStart = row + 2;
                        }
                        else {
                            // Fail, assign max value to avoid loop below
                            newStart = h;
                        }
                        for (row = newStart; row < h; row += 1) {
                            if (this.checkPixelAvailable(col, row)) {
                                // AAvailable pixel
                                stack.push((row * w + col) * 4);
                                nowCol.push(row);
                            }
                            else {
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
                        y = prevCol[i];
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
            }
            else {
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
                }
                else {
                    // First one is invalid pixel and not at col top
                    if (row === y && this.checkPixelAvailable(col - 1, row - 1)) {
                        // Next one is valid
                        if (this.checkPixelAvailable(col, row - 1)) {
                            newStart = row - 1;
                        }
                        else if (this.checkPixelAvailable(col - 1, row - 2)) {
                            newStart = row - 2;
                        }
                        else {
                            // Fail, assign max value to avoid loop below
                            newStart = -1;
                        }
                        for (row = newStart; row >= 0; row -= 1) {
                            if (this.checkPixelAvailable(col, row)) {
                                // Available pixel
                                stack.push((row * w + col) * 4);
                                nowCol.push(row);
                            }
                            else {
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
                }
                else {
                    // First one is invalid pixel && not at col bottom
                    if (row === y && this.checkPixelAvailable(col - 1, row + 1)) {
                        // Next one is valid
                        if (this.checkPixelAvailable(col, row + 1)) {
                            newStart = row + 1;
                        }
                        else if (this.checkPixelAvailable(col - 1, row + 2)) {
                            newStart = row + 2;
                        }
                        else {
                            // Fail, assign max value to avoid loop below
                            newStart = h;
                        }
                        for (row = newStart; row < h; row += 1) {
                            if (this.checkPixelAvailable(col, row)) {
                                // Available pixel
                                stack.push((row * w + col) * 4);
                                nowCol.push(row);
                            }
                            else {
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
                        y = prevCol[i];
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
            }
            else {
                // Bound reach
                break;
            }
        }
        // Fill image data
        for (i = 0; i < stack.length; i += 1) {
            this.setPixelByIndex(stack[i], color);
        }
    };
    BitmapData.toString = function () {
        return "[BitmapData]";
    };
    return BitmapData;
}());

var Brick = /** @class */ (function (_super) {
    __extends(Brick, _super);
    function Brick(dimension, color, border, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.border = border || border === undefined;
        _this.dimension = dimension === undefined ? new BrickDimension() : dimension;
        _this.color = color === undefined ? new SideColor() : color;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    Brick.prototype.initRectangle = function () {
        this.w = this.dimension.xAxis + this.dimension.yAxis;
        this.h = (this.dimension.xAxis + this.dimension.yAxis) / 2;
        // 22.6 degrees implementation
        this.w -= 2;
        this.h -= 1;
        // The matrix offset between the bitmap and the 3d pixel coordinate ZERO point
        this.matrix = new Matrix();
        this.matrix.tx = -this.dimension.yAxis + 2;
        this.matrix.ty = 0;
    };
    Brick.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    Brick.prototype.renderBitmapDataForCanvas = function () {
        this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
        this.canvas = this.bitmapData.canvas;
    };
    Brick.prototype.build = function () {
        var xOffsetInner = this.dimension.yAxis - 2;
        var yOffsetInner = 0;
        var xOffsetOut = this.dimension.xAxis - 1;
        var yOffsetOut = (this.h || 0) - 1;
        var borderColor = this.border ? this.color.border : this.color.inner;
        // X axis
        for (var i = 0; i < this.dimension.xAxis; i += 1) {
            this.bitmapData.setPixel(xOffsetInner + i, yOffsetInner + Math.floor(i / 2), borderColor);
            this.bitmapData.setPixel(xOffsetOut - i, yOffsetOut - Math.floor(i / 2), borderColor);
        }
        // Y axis
        for (var j = 0; j < this.dimension.yAxis; j += 1) {
            this.bitmapData.setPixel(xOffsetInner + 1 - j, yOffsetInner + Math.floor(j / 2), borderColor);
            this.bitmapData.setPixel(xOffsetOut - 1 + j, yOffsetOut - Math.floor(j / 2), borderColor);
        }
        // Fill a pixel graphic enclosed
        this.bitmapData.floodFill(Math.floor(this.w / 2), Math.floor(this.h / 2), this.color.inner);
    };
    Brick.toString = function () {
        return "[Brick]";
    };
    return Brick;
}(AbstractPrimitive));

var PixelObject = /** @class */ (function () {
    function PixelObject(primitive, point3D) {
        if (!primitive) {
            throw new Error("Primitive is not defined");
        }
        var p3D = point3D || new Point3D();
        this.canvas = primitive.canvas;
        this.x = primitive.matrix.tx + p3D.x - p3D.y;
        this.y =
            primitive.matrix.ty + Math.floor(p3D.x / 2 + p3D.y / 2) - p3D.z;
    }
    PixelObject.toString = function () {
        return "[PixelObject]";
    };
    return PixelObject;
}());

var SideX = /** @class */ (function (_super) {
    __extends(SideX, _super);
    function SideX(dimension, color, border, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.border = border || border === undefined;
        _this.dimension = dimension === undefined ? new SideXDimension() : dimension;
        _this.color = color === undefined ? new SideColor() : color;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    SideX.prototype.initRectangle = function () {
        this.w = this.dimension.xAxis;
        this.h = this.dimension.zAxis + this.dimension.xAxis / 2;
        // The matrix offset between the bitmap and the 3d pixel coordinate zero point
        this.matrix = new Matrix();
        this.matrix.tx = 0;
        this.matrix.ty = -this.dimension.zAxis;
    };
    SideX.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    SideX.prototype.renderBitmapDataForCanvas = function () {
        this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
        this.canvas = this.bitmapData.canvas;
    };
    SideX.prototype.build = function () {
        var xOffsetInner = 0;
        var yOffsetInner = this.dimension.zAxis;
        var xOffsetOut = this.dimension.xAxis - 1;
        var yOffsetOut = this.h - this.dimension.zAxis - 1;
        var borderColor = this.border ? this.color.border : this.color.inner;
        // X axis
        for (var i = 0; i < this.dimension.xAxis; i += 1) {
            this.bitmapData.setPixel(xOffsetInner + i, yOffsetInner + Math.floor(i / 2), borderColor);
            this.bitmapData.setPixel(xOffsetOut - i, yOffsetOut - Math.floor(i / 2), borderColor);
        }
        // Z axis
        for (var j = 0; j < this.dimension.zAxis; j += 1) {
            this.bitmapData.setPixel(xOffsetInner, yOffsetInner - j, borderColor);
            this.bitmapData.setPixel(xOffsetOut, yOffsetOut + j, borderColor);
        }
        // fill an pixel graphic enclosed
        this.bitmapData.floodFill(Math.floor(this.w / 2), Math.floor(this.h / 2), this.color.inner);
    };
    SideX.toString = function () {
        return "[SideX]";
    };
    return SideX;
}(AbstractPrimitive));

var SideY = /** @class */ (function (_super) {
    __extends(SideY, _super);
    function SideY(dimension, color, border, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.border = border || border === undefined;
        _this.dimension = dimension === undefined ? new SideYDimension() : dimension;
        _this.color = color === undefined ? new SideColor() : color;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    SideY.prototype.initRectangle = function () {
        this.w = this.dimension.yAxis;
        this.h = this.dimension.zAxis + this.dimension.yAxis / 2;
        // The matrix offset between the bitmap and the 3d pixel coordinate zero point
        this.matrix = new Matrix();
        this.matrix.tx = -this.dimension.yAxis + 2;
        this.matrix.ty = -this.dimension.zAxis;
    };
    SideY.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    SideY.prototype.renderBitmapDataForCanvas = function () {
        this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
        this.canvas = this.bitmapData.canvas;
    };
    SideY.prototype.build = function () {
        var xOffsetInner = 0;
        var yOffsetInner = this.h - this.dimension.zAxis - 1;
        var xOffsetOut = this.dimension.yAxis - 1;
        var yOffsetOut = this.dimension.zAxis;
        var borderColor = this.border ? this.color.border : this.color.inner;
        // Y axis
        for (var i = 0; i < this.dimension.yAxis; i += 1) {
            this.bitmapData.setPixel(xOffsetInner + i, yOffsetInner - Math.floor(i / 2), borderColor);
            this.bitmapData.setPixel(xOffsetOut - i, yOffsetOut + Math.floor(i / 2), borderColor);
        }
        // Z axis
        for (var j = 0; j < this.dimension.zAxis; j += 1) {
            this.bitmapData.setPixel(xOffsetInner, yOffsetInner + j, borderColor);
            this.bitmapData.setPixel(xOffsetOut, yOffsetOut - j, borderColor);
        }
        // Fill a pixel graphic enclosed
        this.bitmapData.floodFill(Math.floor(this.w / 2), Math.floor(this.h / 2), this.color.inner);
    };
    SideY.toString = function () {
        return "[SideY]";
    };
    return SideY;
}(AbstractPrimitive));

var Cube = /** @class */ (function (_super) {
    __extends(Cube, _super);
    function Cube(dimension, color, border, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.border = border || border === undefined;
        _this.dimension = dimension === undefined ? new CubeDimension() : dimension;
        _this.color = color === undefined ? new CubeColor() : color;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    Cube.prototype.initRectangle = function () {
        this.w = this.dimension.xAxis + this.dimension.yAxis;
        this.h =
            this.dimension.zAxis +
                (this.dimension.xAxis + this.dimension.yAxis) / 2;
        // 22.6 degrees implementation
        this.w -= 2;
        this.h -= 1;
        // The matrix offset between the bitmap and the 3d pixel coordinate zero point
        this.matrix = new Matrix();
        this.matrix.tx = -this.dimension.yAxis + 2;
        this.matrix.ty = -this.dimension.zAxis;
    };
    Cube.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    Cube.prototype.renderBitmapDataForCanvas = function () {
        this.canvas = this.bitmapData.canvas;
    };
    Cube.prototype.build = function () {
        var offsetX;
        var offsetY;
        // Horizontal layer
        var brick = new Brick(new BrickDimension(this.dimension.xAxis, this.dimension.yAxis), new SideColor(this.color.border, this.color.horizontal), this.border);
        // Left side
        var sideX = new SideX(new SideXDimension(this.dimension.xAxis, this.dimension.zAxis), new SideColor(this.color.border, this.color.left), this.border);
        // Right side
        var sideY = new SideY(new SideYDimension(this.dimension.yAxis, this.dimension.zAxis), new SideColor(this.color.border, this.color.right), this.border);
        var poBrick = new PixelObject(brick);
        var poX = new PixelObject(sideX);
        var poY = new PixelObject(sideY);
        var ctx = this.bitmapData.context;
        ctx.drawImage(poBrick.canvas, poBrick.x + this.dimension.yAxis - 2, poBrick.y);
        ctx.drawImage(poX.canvas, poX.x, poX.y + this.dimension.zAxis + this.dimension.yAxis / 2 - 1);
        ctx.drawImage(poY.canvas, poY.x + this.w - 2, poX.y + this.dimension.zAxis + this.dimension.xAxis / 2 - 1);
        // Highlight & highlight fix
        var bmd = new BitmapData(this.w, this.h);
        if (this.border) {
            offsetX = this.dimension.xAxis - 2;
            offsetY = (this.dimension.xAxis + this.dimension.yAxis) / 2 - 2;
            // The 2px in bounding without highlight
            for (var i = 0; i < this.dimension.xAxis - 2; i += 1) {
                bmd.setPixel(offsetX + 1 - i, offsetY - Math.floor(i / 2), this.color.borderHighlight);
            }
            // the 2px in bounding without highlight
            for (var j = 0; j < this.dimension.yAxis - 2; j += 1) {
                bmd.setPixel(offsetX + j, offsetY - Math.floor(j / 2), this.color.borderHighlight);
            }
            for (var k = 0; k < this.dimension.zAxis; k += 1) {
                bmd.setPixel(offsetX, offsetY + k, this.color.borderHighlight);
            }
        }
        else {
            for (var i = 0; i < this.dimension.zAxis; i += 1) {
                bmd.setPixel(this.dimension.xAxis - 2, (this.dimension.xAxis + this.dimension.yAxis) / 2 - 1 + i, this.color.left);
            }
        }
        bmd.context.putImageData(bmd.imageData, 0, 0);
        ctx.drawImage(bmd.canvas, 0, 0);
    };
    Cube.toString = function () {
        return "[Cube]";
    };
    return Cube;
}(AbstractPrimitive));

var LineX = /** @class */ (function (_super) {
    __extends(LineX, _super);
    function LineX(dimension, color, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.dimension = dimension === undefined ? new LineXDimension() : dimension;
        _this.color = color === undefined ? new LineColor() : color;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    LineX.prototype.initRectangle = function () {
        this.w = this.dimension.xAxis;
        this.h = this.dimension.xAxis / 2;
        // The matrix offset between the bitmap and the 3d pixel coordinate zero point
        this.matrix = new Matrix();
        this.matrix.tx = 0;
        this.matrix.ty = 0;
    };
    LineX.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    LineX.prototype.renderBitmapDataForCanvas = function () {
        this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
        this.canvas = this.bitmapData.canvas;
    };
    LineX.prototype.build = function () {
        var xOffsetBorder = 0;
        var yOffsetBorder = 0;
        var borderColor = this.color.border;
        // X axis
        for (var i = 0; i < this.dimension.xAxis; i += 1) {
            this.bitmapData.setPixel(xOffsetBorder + i, yOffsetBorder + Math.floor(i / 2), borderColor);
        }
    };
    LineX.toString = function () {
        return "[LineX]";
    };
    return LineX;
}(AbstractPrimitive));

var LineY = /** @class */ (function (_super) {
    __extends(LineY, _super);
    function LineY(dimension, color, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.dimension = dimension === undefined ? new LineYDimension() : dimension;
        _this.color = color === undefined ? new LineColor() : color;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    LineY.prototype.initRectangle = function () {
        this.w = this.dimension.yAxis;
        this.h = this.dimension.yAxis / 2;
        // The matrix offset between the bitmap and the 3d pixel coordinate zero point
        this.matrix = new Matrix();
        this.matrix.tx = -this.dimension.yAxis + 2;
        this.matrix.ty = 0;
    };
    LineY.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    LineY.prototype.renderBitmapDataForCanvas = function () {
        this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
        this.canvas = this.bitmapData.canvas;
    };
    LineY.prototype.build = function () {
        var xOffsetBorder = this.dimension.yAxis - 1;
        var yOffsetBorder = 0;
        var borderColor = this.color.border;
        // Y axis
        for (var i = 0; i < this.dimension.yAxis; i += 1) {
            this.bitmapData.setPixel(xOffsetBorder - i, yOffsetBorder + Math.floor(i / 2), borderColor);
        }
    };
    LineY.toString = function () {
        return "[LineY]";
    };
    return LineY;
}(AbstractPrimitive));

var LineZ = /** @class */ (function (_super) {
    __extends(LineZ, _super);
    function LineZ(dimension, color, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.dimension = dimension === undefined ? new LineZDimension() : dimension;
        _this.color = color === undefined ? new LineColor() : color;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    LineZ.prototype.initRectangle = function () {
        this.w = 1;
        this.h = this.dimension.zAxis;
        // The matrix offset between the bitmap and the 3d pixel coordinate zero point
        this.matrix = new Matrix();
        this.matrix.tx = 0;
        this.matrix.ty = -this.dimension.zAxis + 1;
    };
    LineZ.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    LineZ.prototype.renderBitmapDataForCanvas = function () {
        this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
        this.canvas = this.bitmapData.canvas;
    };
    LineZ.prototype.build = function () {
        var xOffsetBorder = 0;
        var yOffsetBorder = 0;
        var borderColor = this.color.border;
        // Y axis
        for (var i = 0; i < this.dimension.zAxis; i += 1) {
            this.bitmapData.setPixel(xOffsetBorder, yOffsetBorder + i, borderColor);
        }
    };
    LineZ.toString = function () {
        return "[LineZ]";
    };
    return LineZ;
}(AbstractPrimitive));

var Pyramid = /** @class */ (function (_super) {
    __extends(Pyramid, _super);
    function Pyramid(dimension, color, border, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.border = border || border === undefined;
        _this.dimension =
            dimension === undefined ? new PyramidDimension() : dimension;
        _this.color = color === undefined ? new PyramidColor() : color;
        _this.hSize = _this.dimension.tall
            ? _this.dimension.xAxis * 2
            : _this.dimension.xAxis;
        _this.hOffset = _this.dimension.tall ? -3 : -2;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    Pyramid.prototype.initRectangle = function () {
        this.w = this.dimension.xAxis + this.dimension.yAxis;
        this.h = this.hSize + this.dimension.xAxis / 2;
        // 22.6 degrees implementation
        this.w -= 2;
        this.h += this.hOffset;
        // The matrix offset between the bitmap and the 3d pixel coordinate zero point
        this.matrix = new Matrix();
        this.matrix.tx = -this.dimension.xAxis + 2;
        this.matrix.ty =
            -this.hSize / 2 +
                2 -
                (this.dimension.tall ? this.dimension.xAxis / 2 : 1);
    };
    Pyramid.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    Pyramid.prototype.renderBitmapDataForCanvas = function () {
        this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
        this.canvas = this.bitmapData.canvas;
    };
    Pyramid.prototype.build = function () {
        var colorBorderLeft = this.border
            ? this.color.border
            : this.color.left;
        var colorBorderRight = this.border
            ? this.color.border
            : this.color.right;
        var colorBorderHighlight = this.border
            ? this.color.borderHighlight
            : colorBorderLeft;
        // Z axis highlight
        for (var k = 0; k < this.hSize + this.dimension.xAxis / 2 - 4; k += 1) {
            this.bitmapData.setPixel(this.dimension.xAxis - 2, k + 3 + this.hOffset, colorBorderHighlight);
        }
        // X axis
        for (var i = 0; i < this.dimension.xAxis; i += 1) {
            this.bitmapData.setPixel(i, this.hSize + Math.floor(i / 2) + this.hOffset, colorBorderLeft);
        }
        // Y axis
        for (var j = 0; j < this.dimension.xAxis; j += 1) {
            this.bitmapData.setPixel(j + this.dimension.xAxis - 2, this.hSize +
                this.dimension.xAxis / 2 -
                Math.floor(j / 2) -
                1 +
                this.hOffset, colorBorderRight);
        }
        if (!this.dimension.tall) {
            // Left edge
            for (var l = 0; l < this.hSize; l += 1) {
                this.bitmapData.setPixel(l, this.hSize - l + this.hOffset, colorBorderLeft);
            }
            // Right edge
            for (var m = 0; m < this.hSize; m += 1) {
                this.bitmapData.setPixel(m + this.hSize - 2, m + 1 + this.hOffset, colorBorderRight);
            }
        }
        else {
            // Left edge
            for (var l = 0; l < this.hSize - 2; l += 1) {
                this.bitmapData.setPixel(Math.floor(l / 2), this.hSize - l + this.hOffset, colorBorderLeft);
            }
            // Right edge
            for (var m = 2; m < this.hSize; m += 1) {
                this.bitmapData.setPixel(Math.floor(m / 2) + this.dimension.xAxis - 2, m + 1 + this.hOffset, colorBorderRight);
            }
        }
        if (!this.border) {
            this.bitmapData.setPixel(this.dimension.xAxis - 2, this.hSize + this.dimension.xAxis / 2 - 1 + this.hOffset, colorBorderLeft);
        }
        // floodFill
        this.bitmapData.floodFill(this.dimension.xAxis - 1, this.hSize +
            Math.floor((this.dimension.xAxis - 1) / 2) +
            this.hOffset -
            1, this.color.right);
        this.bitmapData.floodFill(this.dimension.xAxis - 3, this.hSize +
            Math.floor((this.dimension.xAxis - 1) / 2) +
            this.hOffset -
            2, this.color.left);
    };
    Pyramid.toString = function () {
        return "[Pyramid]";
    };
    return Pyramid;
}(AbstractPrimitive));

var SlopeEast = /** @class */ (function (_super) {
    __extends(SlopeEast, _super);
    function SlopeEast(dimension, color, border, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.border = border || border === undefined;
        _this.dimension = dimension === undefined ? new SlopeDimension() : dimension;
        _this.color = color === undefined ? new SlopeColor() : color;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    SlopeEast.prototype.initRectangle = function () {
        this.w = this.dimension.xAxis + this.dimension.yAxis;
        this.h = this.dimension.xAxis * 2 + this.dimension.yAxis / 2;
        // 22.6 degrees implementation
        this.w -= 2;
        this.h -= 3;
        // The matrix offset between the bitmap and the 3d pixel coordinate zero point
        this.matrix = new Matrix();
        this.matrix.tx = -(this.dimension.yAxis - 2);
        this.matrix.ty = -((this.dimension.xAxis * 3) / 2 - 2);
    };
    SlopeEast.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    SlopeEast.prototype.renderBitmapDataForCanvas = function () {
        this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
        this.canvas = this.bitmapData.canvas;
    };
    SlopeEast.prototype.build = function () {
        var colorBorderLeft = this.border
            ? this.color.border
            : this.color.left;
        var colorBorderRight = this.border
            ? this.color.border
            : this.color.rightSlope;
        // Y axis
        for (var j = 0; j < this.dimension.yAxis; j += 1) {
            this.bitmapData.setPixel(j, this.dimension.yAxis / 2 - Math.floor(j / 2) - 1, colorBorderRight);
            this.bitmapData.setPixel(j + this.dimension.xAxis - 2, this.h - Math.floor(j / 2) - 1, colorBorderRight);
        }
        // X axis
        for (var i = 0; i < this.dimension.xAxis; i += 1) {
            this.bitmapData.setPixel(i, this.h - this.dimension.xAxis / 2 + Math.floor(i / 2), colorBorderLeft);
        }
        // X axis
        for (var k = this.dimension.yAxis / 2 - 1; k < this.h - this.dimension.xAxis / 2; k += 1) {
            this.bitmapData.setPixel(0, k, colorBorderLeft);
        }
        // Slot
        for (var m = 0; m < this.dimension.xAxis * 2 - 2; m += 1) {
            this.bitmapData.setPixel(this.dimension.yAxis - 1 + Math.floor(m / 2), m, colorBorderRight);
            this.bitmapData.setPixel(1 + Math.floor(m / 2), this.dimension.yAxis / 2 + m - 1, colorBorderRight);
        }
        // floodFill
        this.bitmapData.floodFill(this.dimension.yAxis - 2, 1, this.color.rightSlope);
        this.bitmapData.floodFill(this.dimension.xAxis - 3, this.h - 3, this.color.left);
        // Hack single pixel
        this.bitmapData.setPixel(this.dimension.xAxis - 2, this.h - 2, this.color.left);
        // Highlight
        if (this.border) {
            for (var n = 1; n < this.dimension.xAxis * 2 - 3; n += 1) {
                this.bitmapData.setPixel(1 + Math.floor(n / 2), this.dimension.yAxis / 2 + n - 1, this.color.borderHighlight);
            }
        }
    };
    SlopeEast.toString = function () {
        return "[SlopeEast]";
    };
    return SlopeEast;
}(AbstractPrimitive));

var SlopeNorth = /** @class */ (function (_super) {
    __extends(SlopeNorth, _super);
    function SlopeNorth(dimension, color, border, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.border = border || border === undefined;
        _this.dimension = dimension === undefined ? new SlopeDimension() : dimension;
        _this.color = color === undefined ? new SlopeColor() : color;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    SlopeNorth.prototype.initRectangle = function () {
        this.w = this.dimension.xAxis + this.dimension.yAxis;
        this.h = (this.dimension.yAxis * 3) / 2 + this.dimension.xAxis / 2;
        // 22.6 degrees implementation
        this.w -= 2;
        this.h -= 3;
        // The matrix offset between the bitmap and the 3d pixel coordinate zero point
        this.matrix = new Matrix();
        this.matrix.tx = -(this.dimension.yAxis - 2);
        this.matrix.ty = -(this.dimension.yAxis - 2);
    };
    SlopeNorth.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    SlopeNorth.prototype.renderBitmapDataForCanvas = function () {
        this.canvas = this.bitmapData.canvas;
    };
    SlopeNorth.prototype.build = function () {
        var colorBorderLeft = this.border
            ? this.color.border
            : this.color.left;
        var colorBorderRight = this.border
            ? this.color.border
            : this.color.right;
        var colorBorderHighlight = this.border
            ? this.color.borderHighlight
            : this.color.left;
        var sideX = new SideX(new SideXDimension(this.dimension.xAxis, this.h - this.dimension.xAxis / 2), new SideColor(colorBorderLeft, this.color.left));
        var poX = new PixelObject(sideX);
        var ctx = this.bitmapData.context;
        ctx.drawImage(poX.canvas, poX.x, poX.y + this.h - this.dimension.xAxis / 2);
        var bmd = new BitmapData(this.w, this.h);
        // Close the path for floodFill
        for (var i = this.h - (this.dimension.yAxis * 3) / 2 + 2; i < this.h; i += 1) {
            bmd.setPixel(this.dimension.xAxis - 1, i, colorBorderRight);
        }
        // Y axis
        for (var j = 1; j < this.dimension.yAxis; j += 1) {
            bmd.setPixel(this.dimension.xAxis + j - 2, this.h - Math.floor(j / 2) - 1, colorBorderRight);
            bmd.setPixel(this.dimension.xAxis + j - 2, this.dimension.xAxis / 2 - 2 + j, colorBorderRight);
        }
        // floodFill
        bmd.floodFill(this.dimension.xAxis + 1, this.h - 3, this.color.right);
        // Highlight
        for (var n = this.dimension.xAxis / 2; n < this.h - 1; n += 1) {
            bmd.setPixel(this.dimension.xAxis - 1, n, this.color.right);
            bmd.setPixel(this.dimension.xAxis - 2, n, colorBorderHighlight);
        }
        bmd.context.putImageData(bmd.imageData, 0, 0);
        ctx.drawImage(bmd.canvas, 0, 0);
    };
    SlopeNorth.toString = function () {
        return "[SlopeNorth]";
    };
    return SlopeNorth;
}(AbstractPrimitive));

var SlopeSouth = /** @class */ (function (_super) {
    __extends(SlopeSouth, _super);
    function SlopeSouth(dimension, color, border, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.border = border || border === undefined;
        _this.dimension = dimension === undefined ? new SlopeDimension() : dimension;
        _this.color = color === undefined ? new SlopeColor() : color;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    SlopeSouth.prototype.initRectangle = function () {
        this.w = this.dimension.xAxis + this.dimension.yAxis;
        this.h = this.dimension.xAxis / 2 + this.dimension.yAxis * 2;
        // 22.6 degrees implementation
        this.w -= 2;
        this.h -= 3;
        // The matrix offset between the bitmap and the 3d pixel coordinate zero point
        this.matrix = new Matrix();
        this.matrix.tx = -(this.dimension.yAxis - 2);
        this.matrix.ty = -((this.dimension.yAxis * 3) / 2 - 2);
    };
    SlopeSouth.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    SlopeSouth.prototype.renderBitmapDataForCanvas = function () {
        this.bitmapData.context.putImageData(this.bitmapData.imageData, 0, 0);
        this.canvas = this.bitmapData.canvas;
    };
    SlopeSouth.prototype.build = function () {
        var colorBorderLeft = this.border
            ? this.color.border
            : this.color.leftSlope;
        var colorBorderRight = this.border
            ? this.color.border
            : this.color.right;
        // X axis
        for (var j = 0; j < this.dimension.xAxis; j += 1) {
            this.bitmapData.setPixel(j, this.dimension.yAxis * 2 + Math.floor(j / 2) - 3, colorBorderLeft);
            this.bitmapData.setPixel(j + this.dimension.yAxis - 2, Math.floor(j / 2), colorBorderLeft);
        }
        // Y axis
        for (var i = 0; i < this.dimension.yAxis; i += 1) {
            this.bitmapData.setPixel(this.dimension.xAxis - 2 + i, this.h - Math.floor(i / 2) - 1, colorBorderRight);
        }
        // X axis
        for (var k = this.dimension.xAxis / 2 - 1; k < this.h - this.dimension.yAxis / 2; k += 1) {
            this.bitmapData.setPixel(this.w - 1, k, colorBorderRight);
        }
        // Slot
        for (var m = 0; m < this.dimension.yAxis * 2 - 2; m += 1) {
            this.bitmapData.setPixel(Math.floor(m / 2), this.dimension.yAxis * 2 - m - 3, colorBorderLeft);
            this.bitmapData.setPixel(this.dimension.xAxis - 2 + Math.floor(m / 2), this.h - m - 1, colorBorderLeft);
        }
        // floodFill
        this.bitmapData.floodFill(this.dimension.yAxis - 1, 1, this.color.leftSlope);
        this.bitmapData.floodFill(this.dimension.xAxis, this.h - 3, this.color.right);
        // Hack single pixel
        this.bitmapData.setPixel(this.dimension.xAxis - 1, this.h - 2, this.color.right);
        // Highlight
        if (this.border) {
            for (var n = 1; n < this.dimension.yAxis * 2 - 3; n += 1) {
                this.bitmapData.setPixel(this.dimension.xAxis - 2 + Math.floor(n / 2), this.h - n - 1, this.color.borderHighlight);
            }
        }
    };
    SlopeSouth.toString = function () {
        return "[SlopeSouth]";
    };
    return SlopeSouth;
}(AbstractPrimitive));

var SlopeWest = /** @class */ (function (_super) {
    __extends(SlopeWest, _super);
    function SlopeWest(dimension, color, border, useDefaultCanvas) {
        var _this = _super.call(this) || this;
        _this.useDefaultCanvas = useDefaultCanvas || false;
        _this.border = border || border === undefined;
        _this.dimension = dimension === undefined ? new SlopeDimension() : dimension;
        _this.color = color === undefined ? new SlopeColor() : color;
        _this.initRectangle();
        _this.initBitmapData();
        _this.build();
        _this.renderBitmapDataForCanvas();
        return _this;
    }
    SlopeWest.prototype.initRectangle = function () {
        this.w = this.dimension.xAxis + this.dimension.yAxis;
        this.h = (this.dimension.xAxis * 3) / 2 + this.dimension.yAxis / 2;
        // 22.6 degrees implementation
        this.w -= 2;
        this.h -= 3;
        // The matrix offset between the bitmap and the 3d pixel coordinate zero point
        this.matrix = new Matrix();
        this.matrix.tx = -(this.dimension.yAxis - 2);
        this.matrix.ty = -(this.dimension.xAxis - 2);
    };
    SlopeWest.prototype.initBitmapData = function () {
        this.bitmapData = new BitmapData(this.w, this.h, this.useDefaultCanvas || undefined);
    };
    SlopeWest.prototype.renderBitmapDataForCanvas = function () {
        this.canvas = this.bitmapData.canvas;
    };
    SlopeWest.prototype.build = function () {
        var colorBorderLeft = this.border
            ? this.color.border
            : this.color.left;
        var colorBorderRight = this.border
            ? this.color.border
            : this.color.right;
        var colorBorderHighlight = this.border
            ? this.color.borderHighlight
            : this.color.left;
        var sideY = new SideY(new SideYDimension(this.dimension.yAxis, this.h - this.dimension.yAxis / 2), new SideColor(colorBorderRight, this.color.right));
        var poY = new PixelObject(sideY);
        var ctx = this.bitmapData.context;
        ctx.drawImage(poY.canvas, poY.x + this.w - 2, poY.y + this.h - this.dimension.yAxis / 2);
        var bmd = new BitmapData(this.w, this.h);
        // Close the path for floodFill
        for (var i = this.h - (this.dimension.xAxis * 3) / 2 + 2; i < this.h; i += 1) {
            bmd.setPixel(this.dimension.xAxis - 2, i, colorBorderLeft);
        }
        // X axis
        for (var j = 0; j < this.dimension.xAxis - 1; j += 1) {
            bmd.setPixel(j, this.dimension.xAxis +
                this.dimension.yAxis / 2 -
                3 +
                Math.floor(j / 2), colorBorderLeft);
            bmd.setPixel(j, this.dimension.xAxis + this.dimension.yAxis / 2 - 3 - j, colorBorderLeft);
        }
        // floodFill
        bmd.floodFill(this.dimension.xAxis - 3, this.h - 3, this.color.left);
        // Highlight
        for (var n = this.dimension.yAxis / 2; n < this.h - 1; n += 1) {
            bmd.setPixel(this.dimension.xAxis - 2, n, colorBorderHighlight);
        }
        bmd.context.putImageData(bmd.imageData, 0, 0);
        ctx.drawImage(bmd.canvas, 0, 0);
    };
    SlopeWest.toString = function () {
        return "[SlopeWest]";
    };
    return SlopeWest;
}(AbstractPrimitive));

var PixelView = /** @class */ (function () {
    function PixelView(canvas, point) {
        if (!canvas) {
            throw new Error("Canvas is not defined");
        }
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        if (this.context) {
            this.context.mozImageSmoothingEnabled = false;
            this.context.msImageSmoothingEnabled = false;
            this.context.imageSmoothingEnabled = false;
        }
        this.point = point || new Point(0, 0);
    }
    PixelView.prototype.renderObject = function (primitive, point3D) {
        var po = new PixelObject(primitive, point3D);
        if (this.context && this.point && po.canvas) {
            this.context.drawImage(po.canvas, this.point.x + (po.x || 0), this.point.y + (po.y || 0));
        }
    };
    PixelView.prototype.clear = function () {
        if (this.canvas && this.context) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };
    PixelView.toString = function () {
        return "[PixelView]";
    };
    return PixelView;
}());

var CanvasTool = /** @class */ (function () {
    function CanvasTool() {
    }
    CanvasTool.getPixel = function (imageData, x, y) {
        var data = imageData.data;
        var index = (y * imageData.width + x) * 4;
        var r = data[index];
        var g = data[index + 1];
        var b = data[index + 2];
        // eslint-disable-next-line no-bitwise
        return (r << 16) | (g << 8) | b;
    };
    CanvasTool.toString = function () {
        return "[CanvasTool]";
    };
    return CanvasTool;
}());

var GRASS_GREEN = 0xccff00;
var YELLOW = 0xffff00;
var WINE_RED = 0xff0099;
var PINK = 0xff7cbf;
var PURPLE = 0xcc00ff;
var BLUE = 0x00ccff;
var GRAY = 0xeeeeee;
var BLACK = 0x666666;
var FINE_COLORS = [
    GRASS_GREEN,
    YELLOW,
    WINE_RED,
    PINK,
    PURPLE,
    BLUE,
    GRAY,
    BLACK,
];
var ColorPattern = /** @class */ (function () {
    function ColorPattern() {
    }
    ColorPattern.getRandomComfortableColor = function () {
        return FINE_COLORS[Math.floor(Math.random() * FINE_COLORS.length)];
    };
    ColorPattern.toString = function () {
        return "[ColorPattern]";
    };
    return ColorPattern;
}());

export { AbstractColor, AbstractDimension, AbstractPrimitive, BitmapData, Brick, BrickDimension, CanvasManager, CanvasTool, ColorGeom, ColorPattern, Cube, CubeColor, CubeDimension, LineColor, LineX, LineXDimension, LineY, LineYDimension, LineZ, LineZDimension, Matrix, PixelObject, PixelView, Point, Point3D, Pyramid, PyramidColor, PyramidDimension, SideColor, SideX, SideXDimension, SideY, SideYDimension, SlopeColor, SlopeDimension, SlopeEast, SlopeNorth, SlopeSouth, SlopeWest };
//# sourceMappingURL=index.mjs.map
