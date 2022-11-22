import VectorUtilities from '@/functions/vector-utilities.js'
import { getInteratable } from '@/functions/commons-utilities.js'
import { radToDeg } from '@/functions/calculations/geometry.js'
import { DINO_VECTORS } from './chapter2.data.js'

export default () => ({
  basic: [
    () => {
      return {
        points: [
          [0, 0],
          [2, -2],
        ],
        drawPoints: [
          [
            [0, 0],
            [2, -2],
          ],
        ],
        drawStyle: 'line',
      }
    },
    () => {
      return {
        points: DINO_VECTORS,
        drawPoints: [DINO_VECTORS],
        drawStyle: 'closed',
      }
    },
    () => {
      const result = []
      for (let startIndex = -10; startIndex < 11; startIndex++) {
        result.push([startIndex, startIndex ** 2])
      }
      return {
        points: result,
        drawPoints: [result],
        axisLength: 12,
        gridSize: [1, 10],
        drawStyle: 'line',
      }
    },
    () => {
      return {
        points: VectorUtilities.translate2d([1, 1], DINO_VECTORS),
        drawPoints: [VectorUtilities.translate2d([1, 1], DINO_VECTORS)],
        drawStyle: 'closed',
      }
    },
    () => {
      const ONE_HUNDRED_DINOS = getInteratable(100).map((dinoIndex) =>
        VectorUtilities.translate2d(
          [(dinoIndex % 10) * 15 - 66, Math.floor(dinoIndex / 10) * 15 - 66],
          DINO_VECTORS
        )
      )
      return {
        drawPoints: ONE_HUNDRED_DINOS,
        gridSize: [10, 10],
        drawStyle: 'closed',
        showLegend: false,
      }
    },
    () => {
      const MOCKED_POINTS = [
        [1, 1],
        [8, 8],
      ]
      const perimeter = VectorUtilities.perimeter(DINO_VECTORS)
      return {
        points: MOCKED_POINTS,
        drawPoints: [
          [
            [0, 0],
            [0, perimeter],
          ],
        ],
        gridSize: [1, 10],
        drawStyle: 'line',
        showLegend: false,
      }
    },
  ],
  trigonmetry: [
    () => {
      const points = [VectorUtilities.findComponents(125, 8.5)]
      return {
        points,
        drawPoints: [[[0, 0], ...points]],
        gridSize: [1, 1],
        drawStyle: 'line',
      }
    },
    () => {
      const ONE_THOUSAND_POINTS = getInteratable(1000)
        .map((index) => [
          Math.cos((5 * index * Math.PI) / 500),
          (2 * Math.PI * index) / 1000,
        ])
        .map(VectorUtilities.toCartesian)
      return {
        points: [],
        drawPoints: [ONE_THOUSAND_POINTS],
        gridSize: [1, 1],
        drawStyle: 'line',
      }
    },
    () => {
      const ORIGINAL_DINO = DINO_VECTORS
      const ROTATED_DINO = VectorUtilities.rotate2d(90, ORIGINAL_DINO)
      return {
        points: DINO_VECTORS,
        drawPoints: [DINO_VECTORS, ROTATED_DINO],
        drawStyle: 'closed',
      }
    },
    () => {
      const POLYGON_SIDE = 7
      const polygon = VectorUtilities.createPolygon(4, POLYGON_SIDE)
      return {
        points: polygon,
        drawPoints: [polygon],
        drawStyle: 'closed',
      }
    },
    () => {
      const ORIGINAL_DINO = DINO_VECTORS
      const TRANSLATED_DINO = VectorUtilities.translate2d([8, 8], DINO_VECTORS)
      const ROTATED_DINO = VectorUtilities.rotate2d(
        radToDeg((Math.PI * 5) / 3),
        TRANSLATED_DINO
      )
      return {
        points: [...ORIGINAL_DINO, ...TRANSLATED_DINO, ...ROTATED_DINO],
        drawPoints: [ORIGINAL_DINO, TRANSLATED_DINO, ROTATED_DINO],
        drawStyle: 'closed',
        gridSize: [2, 2],
      }
    },
  ],
})
