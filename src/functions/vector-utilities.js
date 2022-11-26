import {
  findCoordination,
  findAngle,
  findLength,
} from "@/functions/calculations/geometry.js"
import {
  add,
  distance,
  perimeter,
  toCartesian,
  scalar,
  dot,
  subtract,
} from "@/functions/calculations/vector.firstorder.js"
import {
  translate2d,
  rotate2d,
  rotate3d,
  createPolygon,
  createSkewer,
} from "@/functions/calculations/vector.manipulation.js"
import { findLength3d, cross } from "@/functions/calculations/3d"
import { standardLogger } from "@/functions/commons-utilities"
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
}

const defaultExport = {
  distance,
  perimeter,
  scalar,
  add,
  findComponents,
  findAngle3d,
  toCartesian,
  translate2d,
  rotate2d,
  rotate3d,
  createPolygon,
  createSkewer,
}

function findComponents(angle, length) {
  return findCoordination(angle, length)
}
function isOrigin(coordinate) {
  return coordinate.every((v) => v === 0)
}
function toUnit(vector) {
  return scalar(vector, 1 / findLength3d(...vector))
}

function findAngle3d(coordinate) {
  const xyPlaneAngle = findAngle(coordinate[0], coordinate[1])
  const xyPlaneLength = findLength(coordinate[0], coordinate[1])
  const zPlaneAngle = findAngle(xyPlaneLength, coordinate[2])
  const zPlaneLength = findLength(xyPlaneLength, coordinate[2])
  findAngleLogger(
    coordinate,
    xyPlaneAngle,
    xyPlaneLength,
    zPlaneAngle,
    zPlaneLength
  )
  return [xyPlaneAngle, zPlaneAngle]
}

function findAngleLogger(
  coordinate,
  xyPlaneAngle,
  xyPlaneLength,
  zPlaneAngle,
  zPlaneLength
) {
  // standardLogger({
  //   name: "FindAngle",
  //   type: "function",
  //   params: {
  //     coordinate,
  //     xyPlaneAngle,
  //     xyPlaneLength,
  //     zPlaneAngle,
  //     zPlaneLength,
  //   },
  //   output: { angle: [xyPlaneAngle, zPlaneAngle] },
  // })
}
