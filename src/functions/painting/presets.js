import { scalar, findAngle3d } from "@/functions/vector-utilities"
import {
  createRotator3D_XZ,
  createTranslator3d,
} from "@/functions/calculations/3d.js"
import { arrowHead, guidelineBoxes, axisGuide } from "./models.js"
export { createArrow, createAxisGuide, createGuideline }

function createArrow([x, y, z], scale = 1) {
  const arrowHeadFaces = arrowHead()
  const [zPiercedRotation, xPiercedRotation] = findAngle3d([x, y, z])
  const arrowAndVectorAligner = createRotator3D_XZ(
    xPiercedRotation,
    zPiercedRotation - 90
  )
  const arrowRepositioner = createTranslator3d(scalar([x, y, z], 0.9))
  return arrowHeadFaces.map((faces) =>
    faces
      .map(arrowAndVectorAligner)
      .map(arrowRepositioner)
      .map((point) => scalar(point, scale))
  )
}

function createGuideline([x, y, z]) {
  const guidelinesFaces = guidelineBoxes([x, y, z])
  return guidelinesFaces
}

function createAxisGuide() {
  const axisGuideFaces = axisGuide([x, y, z])
  return axisGuideFaces
}
