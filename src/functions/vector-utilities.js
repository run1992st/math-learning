import { findCoordination } from "@/functions/calculations/geometry.js"
import {
  distance,
  perimeter,
  toCartesian,
} from "@/functions/calculations/vector.firstorder.js"
import {
  translate2d,
  rotate2d,
  createPolygon,
  createSkewer,
} from "@/functions/calculations/vector.manipulation.js"

export { defaultExport as default }

const defaultExport = {
  distance,
  perimeter,
  findComponents,
  toCartesian,
  translate2d,
  rotate2d,
  createPolygon,
  createSkewer,
}

function findComponents(angle, length) {
  return findCoordination(angle, length)
}
