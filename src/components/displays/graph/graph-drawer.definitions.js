import PaintingInstrustment from '@/functions/painting-intrustment'
export default () => ({
  props: {
    drawingFaces: { type: Array, default: null },
    drawingOptions: {
      type: Object,
      required: true,
      validation: (v) => {
        Object.keys(v).map((key) =>
          ['drawPoints', 'drawStyle', 'lineColor', 'fill'].includes(key)
        )
      },
    },
    displayData: {
      type: Object,
      required: true,
      validation: (v) => {
        Object.keys(v).map((key) =>
          ['gridSize', 'axisLength', 'gridWidth', 'dimensions'].includes(key)
        )
      },
    },
    currentPoint: { type: Array, default: null },
    currentFace: { type: Object, default: null },
  },
  computed: {
    paintingElements: (paintingFaces, props) => {
      return paintingFaces.map(({ points, direction }) => ({
        points: points.map((point) => point.position),
        direction,
      }))
    },
    drawingElements: (faces) => {
      return faces.map((element) => {
        return element.map((point) => point.position)
      })
    },
    drawingArrowElements: (faces) => {
      return faces
        .map((element) => {
          return element.map((point) => point.arrow)
        })
        .flat()
        .flat()
    },
    dashedGuideline(currentPoint, displayData) {
      const guideline = PaintingInstrustment.createDisplayGuideline(
        currentPoint,
        displayData
      )
      return guideline
    },
    directionVector(currentFace, displayData) {
      if (!currentFace || !currentFace.length || currentFace.length < 3)
        return []
      const direction = PaintingInstrustment.createDisplayDirectionVector(
        currentFace,
        displayData
      )
      return direction
    },
  },
})
