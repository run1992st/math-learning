import {
  toCartesian_fromAngle,
  toCartesian_fromRadian,
} from "@/functions/calculations/geometry.js"
import {
  add,
  distance,
  perimeter,
  scalar,
  dot,
  subtract,
  cross,
  isOrigin,
} from "@/functions/calculations/vector.firstorder.js"
import {
  translate2d,
  rotate2d,
  rotate3d,
  createSkewer,
  translate3d,
  toUnit,
} from "@/functions/calculations/vector.manipulation.js"
import { findAngle3d } from "@/functions/calculations/3d.js"
export {
  defaultExport as default,
  add,
  scalar,
  dot,
  findAngle3d,
  isOrigin,
  toUnit,
  cross,
  subtract,
  rotate3d,
  translate3d,
  toCartesian_fromAngle,
  toCartesian_fromRadian,
}

const defaultExport = {
  distance,
  perimeter,
  scalar,
  add,
  findComponents: toCartesian_fromAngle,
  findAngle3d,
  translate2d,
  rotate2d,
  rotate3d,
  createSkewer,
}
