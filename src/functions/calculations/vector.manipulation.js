import {
  toCartesian_fromAngle,
  findLength3d,
} from "@/functions/calculations/geometry.js"
import { scalar } from "@/functions/calculations/vector.firstorder.js"

import {
  createTranslator3d,
  createRotator3D,
  getRotatorVector3d,
} from "@/functions/calculations/3d.js"

export {
  createSkewer,
  createRotator,
  translate2d,
  translate3d,
  rotate2d,
  rotate3d,
  getRotatorVector,
  getRotatorVector3d,
  toUnit,
}

function translate2d(translateVector, originalVectors) {
  const vectorTranslator = createTranslator(translateVector)
  const translatedVectors = originalVectors.map(vectorTranslator)
  return translatedVectors
}
function translate3d(translateVector, originalVectors) {
  const vectorTranslator = createTranslator3d(translateVector)
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
  const xRotatorVector = toCartesian_fromAngle(angle, 1)
  const yRotatorVector = toCartesian_fromAngle(90 + angle, 1)

  return { xRotatorVector, yRotatorVector }
}

function createSkewer(angleX, angleY) {
  const skewXVector = toCartesian_fromAngle(angleX, 1)
  const skewYVector = toCartesian_fromAngle(90 + angleY, 1)

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

// TEMP
function toUnit(vector) {
  return scalar(vector, 1 / findLength3d(...vector))
}
