import tools from '@/functions/painting-intrustment.js'
import { createRotator3D, findLength3d } from '@/functions/calculations/3d.js'

export default {
  lists: [
    {
      title: 'Create Arrow',
      subtitle: 'Arrow Creation',
    },
  ],
  debugFunctions() {
    return [
      () => {
        const arrow = tools.createArrow([0, 0, 0], 5)
        return {
          dimensions: 3,
          drawPoints: [...arrow],
          drawStyle: 'axis',
          shading: ['#ff0044'],
        }
      },
    ]
  },
}
