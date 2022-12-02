import { angleBetween, cross } from '@/functions/calculations/3d.js'

export default () => [
  () => {
    const vectorU = [1, -2, 1]
    const vectorV = [6, 6, -6]
    const crossProduct = cross(vectorU, vectorV)
    return {
      dimensions: 3,
      drawPoints: [
        [[0, 0, 0], crossProduct],
        [[0, 0, 0], vectorU],
        [[0, 0, 0], vectorV],
      ],
      drawStyle: 'line',
      arrow: true,
    }
  },
  () => {
    const vectorU = [1, 0, 1]
    const vectorV = [-1, 0, 0]
    const crossProduct = cross(vectorU, vectorV)
    return {
      dimensions: 3,
      drawPoints: [
        [[0, 0, 0], crossProduct],
        [[0, 0, 0], vectorU],
        [[0, 0, 0], vectorV],
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
