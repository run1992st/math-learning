import VectorUtilities from "@/functions/vector-utilities"

export {
  transfromTo3D,
  transfromByGridSize,
  convertToTopLeftAnchored,
  scalingFactor,
  colorRandomizer,
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

function transfromByGridSize([gridXScale, gridYScale]) {
  return (coordinateNumbers) => {
    const [x, y] = coordinateNumbers
    return [x / gridXScale, y / gridYScale]
  }
}

function convertToTopLeftAnchored(axisLength) {
  return (coordinateNumbers) => {
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
