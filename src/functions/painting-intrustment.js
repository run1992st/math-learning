import VectorUtilities, { scalar, isOrigin } from "./vector-utilities"
import {
  createRotator3D_XZ,
  createTranslator3d,
} from "@/functions/calculations/3d.js"
import { getShade, getDirectionVector } from "@/functions/painting/shader.js"
import {
  DEFAULT_LINE_COLOR,
  ARROW_HEAD_TIP,
  ARROW_HEAD_BASE,
  AXIS_COLOR,
} from "./constants.json"

export default {
  drawElements3D,
  createGuidelineCoordination,
  drawPointsSets,
  prepareDrawingPoints,
  createDisplayArrow,
  createRotationGuide,
  createArrow,
  paintFaces3D,
  getDirectionVector,
}

function prepareDrawingPoints(
  points,
  gridWidth,
  gridSize,
  gridLength,
  displayTransformations,
  dimensions
) {
  const drawingPoints = points
    .map(dimensions === 3 ? transfromTo3D(displayTransformations) : (v) => v)
    .map(transfromByGridSize(gridSize))
    .map(convertToTopLeftAnchored(gridLength))
    .map(scalingFactor(gridWidth))
  return drawingPoints
}

function createDisplayArrow(
  point,
  gridWidth,
  gridSize,
  gridLength,
  displayTransformations,
  dimensions
) {
  if (isOrigin(point)) return []
  const arrowFaces = createArrow(point)
  const displayArrow = arrowFaces.map((face) =>
    prepareDrawingPoints(
      face,
      gridWidth,
      gridSize,
      gridLength,
      displayTransformations,
      dimensions
    )
  )
  return displayArrow
}

function createArrow([x, y, z], scale = 1) {
  const arrowHeadFaces = createArrowHead()
  const [zPiercedRotation, xPiercedRotation] = VectorUtilities.findAngle3d([
    x,
    y,
    z,
  ])
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

function createArrowHead() {
  const base = ARROW_HEAD_BASE
  const tip = ARROW_HEAD_TIP
  const arrowSide_1 = [base[0], base[1], tip]
  const arrowSide_2 = [base[1], base[2], tip]
  const arrowSide_3 = [base[2], base[3], tip]
  const arrowSide_4 = [base[3], base[0], tip]

  const elements = [base, arrowSide_1, arrowSide_2, arrowSide_3, arrowSide_4]
  return elements
}

function createRotationGuide() {
  const base = [0, 0, 0]
  const xGuide = [base, [3, 0, 0]]
  const yGuide = [base, [0, 3, 0]]
  const zGuide = [base, [0, 0, 3]]

  const elements = [xGuide, yGuide, zGuide]
  return elements
}

function createGuidelineCoordination(
  [x, y, z],
  gridWidth,
  gridSize,
  gridLength,
  displayTransformations,
  dimensions
) {
  const xyGuide = [
    [x, 0, 0],
    [x, y, 0],
    [x, y, z],
    [x, y, 0],
    [0, y, 0],
  ]
  const xyzGuide = [
    [0, 0, z],
    [0, y, z],
    [x, y, z],
    [0, y, z],
    [0, y, 0],
  ]
  const displayXYGuideline = prepareDrawingPoints(
    xyGuide,
    gridWidth,
    gridSize,
    gridLength,
    displayTransformations,
    dimensions
  )
  const displayXYZGuideline = prepareDrawingPoints(
    xyzGuide,
    gridWidth,
    gridSize,
    gridLength,
    displayTransformations,
    dimensions
  )
  const axisGuidePoints = [displayXYGuideline, displayXYZGuideline]
  return axisGuidePoints
}

function drawPointsSets(
  canvas,
  elements,
  canvasSideLength,
  drawStyle,
  lineColor,
  fillColor
) {
  const ctx = canvasPreparation(canvas, {
    canvasWidth: canvasSideLength,
    canvasHeight: canvasSideLength,
  })
  elements.forEach((displayPoints, index) => {
    const params = [
      ctx,
      displayPoints,
      canvasSideLength,
      drawStyle,
      drawStyle === "axis" ? AXIS_COLOR[index] : lineColor,
      fillColor,
    ]
    return drawElements3D(...params)
  })
}

function paintFaces3D(
  canvas,
  faces,
  canvasSideLength,
  drawStyle,
  lineColor,
  fillColor
) {
  const ctx = canvasPreparation(canvas, {
    canvasWidth: canvasSideLength,
    canvasHeight: canvasSideLength,
  })
  faces.forEach((displayPoints, index) => {
    const params = [
      ctx,
      displayPoints,
      canvasSideLength,
      drawStyle,
      drawStyle === "axis" ? AXIS_COLOR[index] : lineColor,
      fillColor,
    ]
    return paintShape(...params)
  })
}

function paintShape(
  ctx,
  face,
  canvasSideLength,
  drawStyle,
  lineColor,
  fillColor
) {
  const direction = face.direction
  drawLine(ctx, direction, {
    canvasWidth: canvasSideLength,
    canvasHeight: canvasSideLength,
    drawStyle,
    lineColor,
  })
  if (fillColor) {
    ctx.fillStyle = getShade(direction, fillColor)
    ctx.fill()
  }
}

function drawElements3D(
  ctx,
  points,
  canvasSideLength,
  drawStyle,
  lineColor,
  fillColor
) {
  const drawingPoints = points
  drawLine(ctx, drawingPoints, {
    canvasWidth: canvasSideLength,
    canvasHeight: canvasSideLength,
    drawStyle,
    lineColor,
  })
  if (fillColor) {
    ctx.fillStyle = getShade(drawingPoints, fillColor)
    ctx.fill()
  }
}

function drawLine(ctx, paintedPoints, { drawStyle, lineColor }) {
  drawLineToCanvas(paintedPoints, ctx, { drawStyle, lineColor })
}

function transfromTo3D([skewX, skewY, skewZ]) {
  const vectorSkewer = VectorUtilities.createSkewer(skewX, skewY)
  return (coordinateNumbers) => {
    const [x, y, z] = coordinateNumbers
    const [skewedX, skewedY] = vectorSkewer([x, y])
    const result = [skewedX, skewedY + z, z]
    return result
  }
}

function canvasPreparation(canvas, { canvasWidth, canvasHeight }) {
  canvas.height = canvasHeight
  canvas.width = canvasWidth
  const ctx = canvas.getContext("2d")
  ctx.strokeStyle = "#cccccc"
  return ctx
}

function drawLineToCanvas(paintedPoints, ctx, { drawStyle, lineColor }) {
  const startPoint = paintedPoints[0]
  ctx.beginPath()
  ctx.moveTo(...startPoint)
  ctx.strokeStyle =
    lineColor === "random"
      ? colorRandomizer()
      : lineColor
      ? lineColor
      : DEFAULT_LINE_COLOR
  if (drawStyle === "dashed") {
    ctx.setLineDash([4, 4])
    ctx.strokeStyle = "#cccccc88"
  }

  paintedPoints.slice(1).forEach((point) => {
    ctx.lineTo(...point)
  })
  if (drawStyle === "closed") ctx.closePath()
  ctx.stroke()
}

function transfromByGridSize([gridXScale, gridYScale]) {
  return (coordinateNumbers) => {
    const [x, y] = coordinateNumbers
    return [x / gridXScale, y / gridYScale]
  }
}

function convertToTopLeftAnchored(fractionLength) {
  return (coordinateNumbers) => {
    const axisLength = fractionLength / 2
    const [xCentered, yCentered] = coordinateNumbers
    return [xCentered + axisLength, axisLength - yCentered]
  }
}

function scalingFactor(factor) {
  return (coordinateNumbers) => {
    const [x, y] = coordinateNumbers
    return [x * factor, y * factor]
  }
}

function colorRandomizer() {
  const rChannel = Math.ceil(Math.random() * 255)
  const gChannel = Math.ceil(Math.random() * 255)
  const bChannel = Math.ceil(Math.random() * 255)
  return `#${rChannel.toString(16)}${gChannel.toString(16)}${bChannel.toString(
    16
  )}`
}

function arrowLogger(zPiercedRotation, xPiercedRotation) {
  console.log("Create Arrow")
  console.log("directionAngle: zPiercedRotation  ->", zPiercedRotation)
  console.log("directionAngle: xPiercedRotation  ->", xPiercedRotation)
}
