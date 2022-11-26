import {
  degToRad,
  findAdjacent,
  findCoordination,
  radToDeg,
} from "@/functions/calculations/geometry.js"
import { scalar, dot } from "@/functions/calculations/vector.firstorder.js"
import { standardLogger } from "@/functions/commons-utilities.js"
export {
  createRotator3D,
  createRotator3D_XZ,
  getRotatorVector3d,
  createTranslator3d,
  findLength3d,
  angleBetween,
  cross,
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
  const yHat = findCoordination(angle, 1)
  const zHat = findCoordination(angle + 90, 1)
  return createRotator([1, 0, 0], [0, ...yHat], [0, ...zHat])
}

function rotator3dZ(angle) {
  const xHat = findCoordination(angle, 1)
  const yHat = findCoordination(90 + angle, 1)
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
  return vectors.reduce((resultVector, vector) =>
    resultVector.map((value, i) => value + vector[i])
  )
}

function cross(vectorU, vectorV) {
  const [ux, uy, uz] = vectorU
  const [vx, vy, vz] = vectorV
  return [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx]
}
function findCoordination3d(angle, angleZ, length, log) {
  const radian = degToRad(angle)
  const radianZ = degToRad(angleZ)

  const sinZ = Math.sin(radianZ)
  const z = length * sinZ
  const xyDiagnal = findAdjacent(angleZ, z) || length
  const result = [xyDiagnal * Math.cos(radian), xyDiagnal * Math.sin(radian), z]

  if (log) {
    coordinateLogger(
      { angle, angleZ, length },
      { radian, radianZ, sinZ, z, xyDiagnal, result },
      log
    )
  }
  return result
}
function angleBetween(vectorU, vectorV) {
  const [lengthU, lengthV] = [
    findLength3d(...vectorU),
    findLength3d(...vectorV),
  ]
  const dotProduct = dot(vectorU, vectorV)

  const cos = dotProduct / (lengthU * lengthV)
  standardLogger({
    name: "Angle Between",
    params: { lengthU, lengthV, dotProduct, cos },
  })
  return radToDeg(Math.acos(cos))
}
function findLength3d(adjecentLength, oppositeLength, height) {
  return Math.sqrt(adjecentLength ** 2 + oppositeLength ** 2 + height ** 2)
}
function coordinateLogger(
  { angle, angleZ, length },
  { radian, radianZ, sinZ, z, xyDiagnal, result },
  header
) {
  console.log("Function - FindCoordinate 3D", header)
  console.log(
    "Input \n\tAngle1: %i, AngleZ: %i, \n\tLength: %i",
    angle,
    angleZ,
    length
  )
  console.log(
    "\tradian: %f\n\tradianZ: %f\n\tsinZ: %f\n\tz: %f\n\txyDiagnalLength: %f\n\tresult: %f\n\t",
    radian,
    radianZ,
    sinZ,
    z,
    xyDiagnal,
    result
  )
}
