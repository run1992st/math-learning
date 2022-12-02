import { axisGuide, arrowHead } from '@/functions/painting/models.js'
import { scalar } from '@/functions/vector-utilities'
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
        const arrow = arrowHead().map((face) =>
          face.map((point) => scalar(point, 20))
        )
        return {
          dimensions: 3,
          drawPoints: [...arrow],
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
