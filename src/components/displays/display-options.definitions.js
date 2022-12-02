import PaintingInstrustment from '@/functions/painting-intrustment'

const TABLE_WIDTH = 600
const SKEW_XY = [-40, 20]

export default () => ({
  props: {
    drawPoints: {
      type: Array,
      default: () => [],
      validation: (v) => {},
    },
    displayOptions: {
      type: Object,
      default: () => ({}),
      validation: (v) => {
        Object.keys(v).map((key) =>
          ['gridSize', 'axisLength', 'gridWidth', 'dimensions'].includes(key)
        )
      },
    },
    dimensions: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    drawingFaces: (props, displayData) => {
      if (!props.drawPoints || !props.drawPoints.length) return []

      const drawPoints = props.drawPoints
      const faces = drawPoints.map((rawFace) => {
        const positions = PaintingInstrustment.prepareDrawingPoints(
          rawFace,
          displayData
        )
        return rawFace.map((point, index) => ({
          value: point,
          position: positions[index],
          guideline: PaintingInstrustment.createDisplayGuideline(
            point,
            displayData
          ),
          arrow: PaintingInstrustment.createDisplayArrow(point, displayData),
        }))
      })
      return faces.map((face) => ({
        points: face,
        direction:
          face.length > 2
            ? PaintingInstrustment.createDisplayDirectionVector(
                face.map((point) => point.value),
                displayData
              )
            : null,
      }))
    },
    gridsDisplayData(displayOptions, dimensions) {
      return {
        showLegend: displayOptions.legend,
        tableWidth: TABLE_WIDTH,
        gridSize: displayOptions.gridSize || [1, 1],
        gridWidth: TABLE_WIDTH / ((displayOptions.axisLength || 12) * 2),
        axisLength: displayOptions.axisLength || 12,
        skew: SKEW_XY,
        dimensions,
      }
    },
    drawingOptions(displayOptions) {
      return {
        drawStyle: displayOptions.drawStyle,
        lineColor: displayOptions.lineColor,
        drawPoints: displayOptions.drawPoints,
        arrow: displayOptions.arrow,
        fill:
          displayOptions.shading && displayOptions.shading.length
            ? displayOptions.shading
            : '',
      }
    },
  },
})
