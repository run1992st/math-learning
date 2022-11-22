import { BOX } from './chapter3.data.js'
import { create3DForm } from '@/functions/shape/form.utilities.js'

export default () => ({
  arithmetic: [
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
  ],
})
