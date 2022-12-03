import {
  degToRad,
  radToDeg,
  findAdjacent,
  findAngle,
  findLength,
  toCartesian_fromAngle,
} from "@/functions/calculations/geometry.js"
import { scalar, dot } from "@/functions/calculations/vector.firstorder.js"
export {
  createRotator3D,
  createRotator3D_XZ,
  getRotatorVector3d,
  createTranslator3d,
  findLength3d,
  angleBetween,
  findAngle3d,
}

function createRotator3D(angleAroundZ, angleAroundX) {
  const rotatorZ = rotator3dZ(angleAroundZ)
  const rotatorX = rotator3dX(angleAroundX)
  return (inputVector) => {
    const rotatedAlongZ = rotatorZ(inputVector)
    const rotatedAlongX = rotatorX(rotatedAlongZ)
    return rotatedAlongX
  }
}
function createRotator3D_XZ(angleAroundX, angleAroundZ) {
  const rotatorX = rotator3dX(angleAroundX)
  const rotatorZ = rotator3dZ(angleAroundZ)
  return (inputVector) => {
    const rotatedAlongX = rotatorX(inputVector)
    const rotatedAlongZ = rotatorZ(rotatedAlongX)
    return rotatedAlongZ
  }
}

function rotator3dX(angle) {
  const yHat = toCartesian_fromAngle(angle, 1)
  const zHat = toCartesian_fromAngle(angle + 90, 1)
  return createRotator([1, 0, 0], [0, ...yHat], [0, ...zHat])
}

function rotator3dZ(angle) {
  const xHat = toCartesian_fromAngle(angle, 1)
  const yHat = toCartesian_fromAngle(90 + angle, 1)
  return createRotator([...xHat, 0], [...yHat, 0], [0, 0, 1])
}
function getRotatorVector3d(angle, angleZ) {
  const xHat = findCoordination3d(angle, angleZ, 1)
  const yHat = findCoordination3d(90 + angle, angleZ, 1)
  const zHat = findCoordination3d(90 + angle, angleZ + 90, 1)
  return { xHat, yHat, zHat }
}
function createRotator(xHat, yHat, zHat) {
  return (inputVector) => {
    const [newX, newY, newZ] = transformedCoordinate(
      [xHat, yHat, zHat],
      inputVector
    )
    return addVectors([newX, newY, newZ])
  }
}
function createTranslator3d([x, y, z]) {
  return (inputVector) => {
    return addVectors([inputVector, [x, y, z]])
  }
}

function transformedCoordinate([xHat, yHat, zHat], inputVector) {
  const newX = scalar(xHat, inputVector[0])
  const newY = scalar(yHat, inputVector[1])
  const newZ = scalar(zHat, inputVector[2])
  return [newX, newY, newZ]
}
function addVectors(vectors) {
  return vectors.reduce(
    (resultVector, vector) => resultVector.map((value, i) => value + vector[i]),
    [0, 0, 0]
  )
}

function findCoordination3d(angle, angleZ, length) {
  const radian = degToRad(angle)
  const radianZ = degToRad(angleZ)

  const sinZ = Math.sin(radianZ)
  const z = length * sinZ
  const xyDiagnal = findAdjacent(angleZ, z) || length
  const result = [xyDiagnal * Math.cos(radian), xyDiagnal * Math.sin(radian), z]

  return result
}

function findAngle3d(coordinate) {
  const xyPlaneAngle = findAngle(coordinate[0], coordinate[1])
  const xyPlaneLength = findLength(coordinate[0], coordinate[1])
  const zPlaneAngle = findAngle(xyPlaneLength, coordinate[2])
  return [xyPlaneAngle, zPlaneAngle]
}

function angleBetween(vectorU, vectorV) {
  const [lengthU, lengthV] = [
    findLength3d(...vectorU),
    findLength3d(...vectorV),
  ]
  const dotProduct = dot(vectorU, vectorV)
  const cos = dotProduct / (lengthU * lengthV)
  return radToDeg(Math.acos(cos))
}

function findLength3d(adjecentLength, oppositeLength, height) {
  return Math.sqrt(adjecentLength ** 2 + oppositeLength ** 2 + height ** 2)
}
