import { computed } from 'vue'
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
    drawingPoints: (props) =>
      computed(() => getters.drawingPoints(props.drawingFaces)),
    paintingElements: (props) =>
      computed(() => getters.paintingElements(props.drawingFaces)),
    drawingElements: (props) =>
      computed(() => {
        const drawingPoints = props.drawingFaces.map(({ points }) => points)
        const drawingFaces = getters.drawingFaces(drawingPoints)
        const drawingArrow = getters.drawingArrowElements(drawingPoints)
        return [
          ...drawingFaces,
          ...(props.drawingOptions.arrow ? drawingArrow : []),
        ]
      }),
    dashedGuideline: (props) =>
      computed(() =>
        getters.dashedGuideline(props.currentPoint, props.displayData)
      ),
    directionVector: (props) =>
      computed(() =>
        getters.directionVector(props.currentFace, props.displayData)
      ),
    faceOverlay: (props) =>
      computed(() => getters.faceOverlay(props.currentFace, props.displayData)),
  },
})

const getters = {
  drawingPoints: (drawingFaces) => {
    const points = drawingFaces.map(({ points }) => points)
    return points
  },
  paintingElements: (paintingFaces) => {
    return paintingFaces.map(({ points, direction }) => ({
      points: points.map((point) => point.position),
      direction,
    }))
  },
  drawingFaces: (faces) => {
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
    if (!currentFace || !currentFace.length || currentFace.length < 3) return []
    const direction = PaintingInstrustment.createDisplayDirectionVector(
      currentFace,
      displayData
    )
    return direction
  },
  faceOverlay(currentFace, displayData) {
    return PaintingInstrustment.prepareFaces([currentFace], displayData)
  },
}
