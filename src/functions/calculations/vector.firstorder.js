export { toCartesian, perimeter, distance, scalar, add, dot, subtract }

function toCartesian([length, angle]) {
  return [length * Math.cos(angle), length * Math.sin(angle)]
}

function dot(vectorU, vectorV) {
  return vectorU.reduce(
    (product, coordinate, index) => product + coordinate * vectorV[index],
    0
  )
}
function perimeter(vectors) {
  return vectors.reduce(
    (sum, vector, index) =>
      sum + distance(vector, vectors[index + 1] || vectors[0]),
    0
  )
}
function distance(vectorU, vectorV) {
  const displacement = subtract(vectorU, vectorV)
  return Math.sqrt(displacement[0] ** 2 + displacement[1] ** 2)
}

function subtract(vectorU, vectorV) {
  return vectorU.map((coordinate, index) => coordinate - vectorV[index])
}

function add(vectorU, vectorV) {
  return vectorU.map((coordinate, index) => coordinate + vectorV[index])
}

function scalar(vector, scalar) {
  return vector.map((coordination) => coordination * scalar)
}
