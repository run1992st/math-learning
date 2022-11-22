import VectorUtilities from './vector-utilities'
import { DEFAULT_LINE_COLOR } from './constants.json'

export default {
  drawElements3D,
  createGuidelineCoordination,
  drawPointsSets,
  prepareDrawingPoints,
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
    [x, 0, z],
    [x, y, z],
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
  lineColor
) {
  const ctx = canvasPreparation(canvas, {
    canvasWidth: canvasSideLength,
    canvasHeight: canvasSideLength,
  })
  elements.forEach((displayPoints) => {
    const params = [ctx, displayPoints, canvasSideLength, drawStyle, lineColor]
    return drawElements3D(...params)
  })
}

function drawElements3D(ctx, points, canvasSideLength, drawStyle, lineColor) {
  const drawingPoints = points

  drawLine(ctx, drawingPoints, {
    canvasWidth: canvasSideLength,
    canvasHeight: canvasSideLength,
    drawStyle,
    lineColor,
  })
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
  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = '#cccccc'
  return ctx
}

function drawLineToCanvas(paintedPoints, ctx, { drawStyle, lineColor }) {
  const startPoint = paintedPoints[0]
  ctx.beginPath()
  ctx.moveTo(...startPoint)
  ctx.strokeStyle =
    lineColor === 'random'
      ? colorRandomizer()
      : lineColor
      ? lineColor
      : DEFAULT_LINE_COLOR
  if (drawStyle === 'dashed') {
    ctx.setLineDash([4, 4])
    ctx.strokeStyle = '#cccccc88'
  }

  paintedPoints.slice(1).forEach((point) => {
    ctx.lineTo(...point)
  })
  if (drawStyle === 'closed') ctx.closePath()
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
