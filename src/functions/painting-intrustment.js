import { isOrigin } from "@/functions/vector-utilities"
import { createTranslator3d } from "@/functions/calculations/3d.js"
import { getShade, getDirectionVector } from "@/functions/painting/shader.js"
import { createArrow, createGuideline } from "@/functions/painting/presets.js"
import {
  transfromTo3D,
  transfromByGridSize,
  convertToTopLeftAnchored,
  scalingFactor,
  colorRandomizer,
} from "@/functions/painting/transformer.js"
import { DEFAULT_LINE_COLOR, AXIS_COLOR } from "./constants.json"

export default {
  paintShapesToCanvas,
  prepareDrawingPoints,
  createDisplayArrow,
  createDisplayGuideline,
  createDisplayDirectionVector,
}

function prepareFaces(faces, displayData) {
  return faces.map((face) => prepareDrawingPoints(face, displayData))
}

function prepareDrawingPoints(
  points,
  { gridWidth, gridSize, axisLength, skew, dimensions }
) {
  const drawingPoints = points
    .map(dimensions === 3 ? transfromTo3D([360 - skew[1], skew[0]]) : (v) => v)
    .map(transfromByGridSize(gridSize))
    .map(convertToTopLeftAnchored(axisLength))
    .map(scalingFactor(gridWidth))
  return drawingPoints
}

// TODO: Consolidate to Display Element builder
function createDisplayArrow(point, displayData) {
  if (isOrigin(point)) return []
  const arrowFaces = createArrow(point)
  return prepareFaces(arrowFaces, displayData)
}

function createDisplayGuideline(point, displayData) {
  const guidelinesFaces = createGuideline(point)
  return prepareFaces(guidelinesFaces, displayData)
}
function createDisplayDirectionVector(points, displayData) {
  // const translator = createTranslator3d(points[0])
  const directionLine = [[[0, 0, 0], getDirectionVector(points)]]
  return prepareFaces(directionLine, displayData)
}

function paintShapesToCanvas(canvas, elements, drawingOptions) {
  const ctx = canvasPreparation(canvas, {
    canvasWidth: drawingOptions.canvasSideLength,
    canvasHeight: drawingOptions.canvasSideLength,
  })
  elements.forEach((displayPoints) => {
    return paintShape(ctx, displayPoints, drawingOptions)
  })
}

function paintShape(ctx, face, { drawStyle, lineColor, fillColor }) {
  const direction = face.direction || []
  const points = face.points || face
  drawLineToCanvas(ctx, points, {
    drawStyle,
    lineColor,
  })
  if (fillColor) {
    const shade = getShade(direction, fillColor)
    ctx.fillStyle = shade
    ctx.fill()
  }
}

function drawLineToCanvas(ctx, paintedPoints, { drawStyle, lineColor }) {
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

function canvasPreparation(canvas, { canvasWidth, canvasHeight }) {
  canvas.height = canvasHeight
  canvas.width = canvasWidth
  const ctx = canvas.getContext("2d")
  ctx.strokeStyle = "#cccccc"
  return ctx
}
