export {
  toCartesian_fromAngle,
  toCartesian_fromRadian,
  radToDeg,
  degToRad,
  findAngle,
  findAdjacent,
  findOpposite,
  findLength,
  findLength3d,
}

function toCartesian_fromAngle(angle, length) {
  const radian = degToRad(angle)
  return toCartesian_fromRadian(radian, length)
}

function toCartesian_fromRadian(radian, length) {
  return [length * Math.cos(radian), length * Math.sin(radian)]
}

function findLength(adjecentLength, oppositeLength) {
  return Math.sqrt(adjecentLength ** 2 + oppositeLength ** 2)
}

function findAngle(adjecentLength, oppositeLength) {
  const radian = Math.atan2(oppositeLength, adjecentLength)
  const angle = radToDeg(radian)
  return angle
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

function findLength3d(adjecentLength, oppositeLength, height) {
  return Math.sqrt(adjecentLength ** 2 + oppositeLength ** 2 + height ** 2)
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180)
}

function radToDeg(rad) {
  return rad / (Math.PI / 180)
}
