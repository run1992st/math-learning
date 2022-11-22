export {
  defaultExport as default,
  findCoordination,
  radToDeg,
  findAdjacent,
  findOpposite,
}
const defaultExport = { findCoordination, radToDeg, findAdjacent, findOpposite }

function findCoordination(angle, length) {
  const radian = degToRad(angle)
  return [length * Math.cos(radian), length * Math.sin(radian)]
}

function findAdjacent(angle, oppositeLength) {
  const radian = degToRad(angle)
  const cos = Math.cos(radian)
  return oppositeLength * cos
}

function findOpposite(angle, adjecentLength) {
  const radian = degToRad(angle)
  const sin = Math.sin(radian)
  return adjecentLength * sin
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180)
}

function radToDeg(rad) {
  return rad / (Math.PI / 180)
}
