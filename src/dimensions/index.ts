import { AbstractDimension } from "./AbstractDimension";
import { BrickDimension } from "./BrickDimension";
import { CubeDimension } from "./CubeDimension";
import { LineXDimension } from "./LineXDimension";
import { LineYDimension } from "./LineYDimension";
import { LineZDimension } from "./LineZDimension";
import { PyramidDimension } from "./PyramidDimension";
import { SideXDimension } from "./SideXDimension";
import { SideYDimension } from "./SideYDimension";
import { SlopeDimension } from "./SlopeDimension";

export type Dimension =
  | BrickDimension
  | CubeDimension
  | LineXDimension
  | LineYDimension
  | LineZDimension
  | PyramidDimension
  | SideXDimension
  | SideYDimension
  | SlopeDimension;

export {
  AbstractDimension,
  BrickDimension,
  CubeDimension,
  LineXDimension,
  LineYDimension,
  LineZDimension,
  PyramidDimension,
  SideXDimension,
  SideYDimension,
  SlopeDimension,
};
