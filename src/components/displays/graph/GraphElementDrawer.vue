<script setup>
  import { ref, onUpdated, computed } from 'vue'
  import GraphDrawerDefinition from './graph-drawer.definitions.js'
  import PaintingInstrustment from '@/functions/painting-intrustment'

  const drawingCanvas = ref()
  const guidelineCanvas = ref()
  const arrowCanvas = ref()

  const componentsOptions = GraphDrawerDefinition()
  const props = defineProps(GraphDrawerDefinition().props)

  const {
    paintingElements: paintingElementsGetter,
    drawingElements: drawingElementsGetter,
    drawingArrowElements: drawingArrowElementsGetter,
    dashedGuideline: dashedGuidelineGetter,
    directionVector: directionVectorGetter,
  } = componentsOptions.computed

  const drawingPoints = computed(() => {
    const points = props.drawingFaces.map(({ points }) => points)
    return points
  })
  const paintingElements = computed(() =>
    paintingElementsGetter(props.drawingFaces, props)
  )
  const drawingElements = computed(() => {
    return [
      ...drawingElementsGetter(drawingPoints.value),
      ...(props.drawingOptions.arrow
        ? drawingArrowElementsGetter(drawingPoints.value)
        : []),
    ]
  })

  const temporaryElements = computed(() => {
    const directionVector = directionVectorGetter(
      props.currentFace,
      props.displayData
    )
    const dashedGuideline = dashedGuidelineGetter(
      props.currentPoint,
      props.displayData
    )
    return { directionVector, dashedGuideline }
  })

  onUpdated(() => {
    clearCanvas(guidelineCanvas.value)
    clearCanvas(arrowCanvas.value)
    if (
      !props.drawingOptions.drawPoints ||
      !props.drawingOptions.drawPoints.length ||
      !props.drawingFaces ||
      !props.drawingFaces.length
    )
      return
    drawElementsToCanvas(drawingCanvas.value, drawingElements.value)
    if (props.currentPoint) {
      drawElementsToCanvas(
        guidelineCanvas.value,
        temporaryElements.value.dashedGuideline,
        'dashed'
      )
      drawElementsToCanvas(
        guidelineCanvas.value,
        temporaryElements.value.directionVector,
        'line'
      )
    }
    if (props.drawingOptions.fill) {
      drawElementsToCanvas(
        drawingCanvas.value,
        paintingElements.value, // TODO
        'closed',
        '#2288ee'
      )
    }
  })

  function drawElementsToCanvas(canvas, drawElements, drawStyle, fillColor) {
    PaintingInstrustment.paintShapesToCanvas(canvas, drawElements, {
      canvasSideLength: props.displayData.tableWidth,
      drawStyle: drawStyle || props.drawingOptions.drawStyle,
      lineColor: 'random',
      fillColor,
    })
  }

  function clearCanvas(canvas) {
    drawElementsToCanvas(canvas, [], props.drawStyle, props.dimensions)
  }
</script>

<template>
  <div class="graph-drawer">
    <canvas ref="drawingCanvas"></canvas>
    <canvas
      class="points-reference"
      ref="guidelineCanvas"
    ></canvas>
    <canvas
      class="points-reference"
      ref="arrowCanvas"
    ></canvas>
  </div>
</template>

<style lang="scss" scoped>
  .graph-drawer {
    pointer-events: none;
    z-index: 1;
    .point-display {
      position: absolute;
      user-select: none;
    }
    .points-reference {
      position: absolute;
      inset: 0 0 0 0;
    }
  }
</style>
