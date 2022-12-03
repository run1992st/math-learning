import { scalar, cross, toUnit, subtract } from "@/functions/vector-utilities"

export { getShade, getDirectionVector }

function getShade(direction, color) {
  const isVisible = direction[2] >= 0
  return isVisible || !direction ? color : ""
}

function getDirectionVector(face) {
  const [leg1, leg2] = [subtract(face[0], face[1]), subtract(face[0], face[2])]
  const direction = cross(leg1, leg2)
  return scalar(toUnit(direction), 4)
}
