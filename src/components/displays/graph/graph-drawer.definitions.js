import PaintingInstrustment from '@/functions/painting-intrustment'
export default () => ({
  props: {
    dimensionData: {
      type: Object,
      required: true,
      validation: (v) => {
        Object.keys(v).map((key) =>
          [
            'gridSize',
            'axisLength',
            'gridWidth',
            'displayTransformations',
            'dimensions',
          ].includes(key)
        )
      },
    },
    drawingOptions: {
      type: Object,
      required: true,
      validation: (v) => {
        Object.keys(v).map((key) =>
          ['drawPoints', 'drawStyle', 'lineColor'].includes(key)
        )
      },
    },
    displayTransformations: {
      type: Array,
      default: [340, -40, 0],
    },
  },
  computed: {
    displayElements: (props) => {
      if (
        !props.drawingOptions.drawPoints ||
        !props.drawingOptions.drawPoints.length
      )
        return []
      const drawPoints = props.drawingOptions.drawPoints
      const PROPERTIES_DTO = [
        props.dimensionData.gridWidth,
        props.dimensionData.gridSize,
        props.dimensionData.axisLength * 2,
        props.displayTransformations,
        props.dimensionData.dimensions,
      ]
      const elements = drawPoints.map((drawPoints) => {
        const positions = PaintingInstrustment.prepareDrawingPoints(
          drawPoints,
          ...PROPERTIES_DTO
        )
        return drawPoints.map((point, index) => ({
          value: point,
          position: positions[index],
        }))
      })
      return elements
    },
    paintingElements: (paintingElements, props) => {
      const PROPERTIES_DTO = [
        props.dimensionData.gridWidth,
        props.dimensionData.gridSize,
        props.dimensionData.axisLength * 2,
        props.displayTransformations,
        props.dimensionData.dimensions,
      ]
      return paintingElements.map((paintingFace) => {
        return {
          points: paintingFace.map((point) => point.position),
          direction: PaintingInstrustment.prepareDrawingPoints(
            [
              [0, 0, 0],
              PaintingInstrustment.getDirectionVector(
                paintingFace.map((point) => point.value)
              ),
            ],
            ...PROPERTIES_DTO
          ),
        }
      })
    },
    canvasSideLength: (props) => {
      return props.dimensionData.axisLength * 2 * props.dimensionData.gridWidth
    },
  },
})
