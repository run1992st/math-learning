import {
  scalar,
  isOrigin,
  cross,
  toUnit,
  subtract,
} from "@/functions/vector-utilities"
import {
  createRotator3D_XZ,
  createTranslator3d,
} from "@/functions/calculations/3d.js"

export { getShade, getDirectionVector }

function getShade(face, color) {
  return color
}

function getDirectionVector(face) {
  const [leg1, leg2] = [subtract(face[0], face[1]), subtract(face[0], face[2])]
  const direction = cross(leg1, leg2)
  return scalar(toUnit(direction), 4)
}
