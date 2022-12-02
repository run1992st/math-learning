import { BOX } from './chapter3.data.js'
import { create3DForm } from '@/functions/shape/form.utilities.js'
import { findLength3d, angleBetween } from '@/functions/calculations/3d.js'
import { add, scalar, dot } from '@/functions/vector-utilities.js'
import { degToRad } from '@/functions/calculations/geometry.js'

export default () => [
  () => {
    return {
      dimensions: 3,
      points: [[-1, -2, 2]],
      drawPoints: [
        [
          [0, 0, 0],
          [-1, -2, 2],
        ],
      ],
      drawStyle: 'line',
    }
  },
  () => {
    const vertices = BOX
    const allDisectedFaces = create3DForm(vertices)
    return {
      dimensions: 3,
      drawPoints: allDisectedFaces,
      drawStyle: 'closed',
      lineColor: 'random',
    }
  },
  () => {
    const addedVector = add([4, 0, 3], [-1, 0, 1])
    return {
      dimensions: 3,
      drawPoints: [
        [
          [0, 0, 0],
          [4, 0, 3],
        ],
        [[4, 0, 3], addedVector],
        [
          [0, 0, 0],
          [-1, 0, 1],
        ],
        [[0, 0, 0], addedVector],
        [addedVector, [-1, 0, 1]],
      ],
      drawStyle: 'line',
    }
  },
  () => {
    const originalVector = [-1, -1, 2]
    const lengthOfVector = findLength3d(...originalVector)
    const scaledVector = scalar(originalVector, 1 / lengthOfVector)
    return {
      dimensions: 3,
      drawPoints: [
        [[0, 0, 0], originalVector],
        [[0, 0, 0], scaledVector],
      ],
      drawStyle: 'line',
    }
  },
  () => {
    const vectorU = [-1, -1, 1]
    const vectorV = [1, 2, 1]
    const product = dot(vectorU, vectorV)
    return {
      dimensions: 3,
      drawPoints: [
        [
          [0, 0, 0],
          [0, 0, product],
        ],
      ],
      drawStyle: 'line',
      arrow: true,
    }
  },
  () => {
    const vectorULength = 3.61
    const vectorVLength = 1.44
    const product = vectorULength * vectorVLength * Math.cos(degToRad(101.3))
    return {
      dimensions: 3,
      drawPoints: [
        [
          [0, 0, 0],
          [0, 0, product],
        ],
      ],
      drawStyle: 'line',
      arrow: true,
    }
  },
  () => {
    const vectorU = [1, 1, 1]
    const vectorV = [-1, -1, 1]
    const angle = angleBetween(vectorU, vectorV)
    return {
      dimensions: 3,
      drawPoints: [
        [
          [0, 0, 0],
          [0, 0, 0],
        ],
      ],
      drawStyle: 'line',
      arrow: true,
    }
  },
]
