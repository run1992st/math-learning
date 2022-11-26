import { getInteratable } from "@/functions/commons-utilities.js"
import {
  findCoordination,
  radToDeg,
} from "@/functions/calculations/geometry.js"

import {
  createRotator3D,
  getRotatorVector3d,
} from "@/functions/calculations/3d.js"

export {
  createPolygon,
  createSkewer,
  createRotator,
  translate2d,
  rotate2d,
  rotate3d,
  getRotatorVector,
  getRotatorVector3d,
}

function createPolygon(length, sides) {
  const perSectionRadian = (2 * Math.PI) / sides
  const sidesInterable = getInteratable(sides)
  return sidesInterable.map((side) => {
    const coordination = findCoordination(
      radToDeg(perSectionRadian) * (side + 1),
      length
    )
    return coordination
  })
}

function translate2d(translateVector, originalVectors) {
  const vectorTranslator = createTranslator(translateVector)
  const translatedVectors = originalVectors.map(vectorTranslator)
  return translatedVectors
}
function rotate2d(angle, originalVectors) {
  const vectorRotator = createRotator(angle)
  const rotatedVectors = originalVectors.map(vectorRotator)
  return rotatedVectors
}

function rotate3d(angleXY, angleZ, originalVectors) {
  const vectorRotator = createRotator3D(angleXY, angleZ)
  const rotatedVectors = originalVectors.map(vectorRotator)
  return rotatedVectors
}

function createRotator(angle) {
  const { xRotatorVector, yRotatorVector } = getRotatorVector(angle)
  return (inputVector) => {
    const x = [
      inputVector[0] * xRotatorVector[0],
      inputVector[0] * xRotatorVector[1],
    ]
    const y = [
      inputVector[1] * yRotatorVector[0],
      inputVector[1] * yRotatorVector[1],
    ]
    return [x[0] + y[0], x[1] + y[1]]
  }
}

function getRotatorVector(angle) {
  const xRotatorVector = findCoordination(angle, 1)
  const yRotatorVector = findCoordination(90 + angle, 1)

  return { xRotatorVector, yRotatorVector }
}

function createSkewer(angleX, angleY) {
  const skewXVector = findCoordination(angleX, 1)
  const skewYVector = findCoordination(90 + angleY, 1)

  const xRotatorVector = [1, 1 * (skewXVector[1] / skewXVector[0])]
  const yRotatorVector = [1 * (skewYVector[0] / skewYVector[1]), 1]
  return (inputVector) => {
    const x = [
      inputVector[0] * xRotatorVector[0],
      inputVector[0] * xRotatorVector[1],
    ]
    const y = [
      inputVector[1] * yRotatorVector[0],
      inputVector[1] * yRotatorVector[1],
    ]
    return [x[0] + y[0], x[1] + y[1]]
  }
}
function createTranslator(modifierVector) {
  return (inputVector) =>
    inputVector.map((point, index) => point + modifierVector[index])
}
