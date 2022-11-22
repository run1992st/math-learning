export { toCartesian, perimeter, distance }

function toCartesian([length, angle]) {
  return [length * Math.cos(angle), length * Math.sin(angle)]
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
  return [vectorU[0] - vectorV[0], vectorU[1] - vectorV[1]]
}
