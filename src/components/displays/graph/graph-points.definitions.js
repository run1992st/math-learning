import PaintingInstrustment from '@/functions/painting-intrustment'

export default () => ({
  props: {
    gridSize: { type: Array, default: [1, 1] },
    axisLength: { type: Number, default: 10 },
    gridWidth: { type: Number, default: 10 },
    drawPoints: { type: Array, default: null },
    drawStyle: {
      type: String,
      default: 'none',
      validation: (v) => ['none', 'line', 'closed'].includes(v),
    },
    lineColor: {
      type: String,
      default: '',
      validation: (v) => ['random'].includes(v),
    },
    displayTransformations: {
      type: Array,
      default: [340, -40, 0],
    },
    dimensions: {
      type: Number,
      default: 2,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    displayElements: (props) => {
      if (!props.drawPoints || !props.drawPoints.length) return []
      const drawPoints = props.drawPoints
      const PROPERTIES_DTO = [
        props.gridWidth,
        props.gridSize,
        props.axisLength * 2,
        props.displayTransformations,
        props.dimensions,
      ]
      const elements = drawPoints.map((drawPoints) => {
        const positions = PaintingInstrustment.prepareDrawingPoints(
          drawPoints,
          ...PROPERTIES_DTO
        )
        return drawPoints.map((point, index) => ({
          value: point,
          position: positions[index],
          guideline: PaintingInstrustment.createGuidelineCoordination(
            point,
            ...PROPERTIES_DTO
          ),
          arrow: PaintingInstrustment.createDisplayArrow(
            point,
            ...PROPERTIES_DTO
          ),
        }))
      })
      return elements
    },
    drawingElements: (displayElements) => {
      return displayElements.map((element) => {
        return element.map((point) => point.position)
      })
    },
    drawingArrowElements: (displayElements) => {
      return displayElements
        .map((element) => {
          return element.map((point) => point.arrow)
        })
        .flat()
        .flat()
    },
    canvasSideLength: (props) => {
      return props.axisLength * 2 * props.gridWidth
    },
  },
})
