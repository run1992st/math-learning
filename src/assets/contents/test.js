import { axisGuide, arrowHead } from '@/functions/painting/models.js'
import { scalar } from '@/functions/vector-utilities'
import { ARROW_HEAD_BASE } from '@/functions/constants.json'

export default {
  lists: [
    {
      title: 'Create Arrow',
      subtitle: 'Arrow Creation',
    },
    {
      title: 'Rotation Guide',
      subtitle: '',
    },
  ],
  debugFunctions() {
    return [
      () => {
        const head = arrowHead().map((face) =>
          face.map((point) => scalar(point, 20))
        )
        const base = ARROW_HEAD_BASE.map((coordinate) => scalar(coordinate, 10))
        return {
          dimensions: 3,
          drawPoints: [...head],
          drawStyle: 'closed',
          shading: ['red'],
        }
      },
      () => {
        const rotator = axisGuide()
        return {
          dimensions: 3,
          drawPoints: [...rotator],
          drawStyle: 'axis',
          arrow: true,
        }
      },
    ]
  },
}
