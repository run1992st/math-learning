<script setup>
  import { ref, onUpdated, computed } from 'vue'
  import GraphPointsDefinition from './graph-points.definitions.js'

  import PaintingInstrustment from '@/functions/painting-intrustment'
  import DisplayPoint from '@/components/displays/DisplayPoint.vue'

  const drawingCanvas = ref()
  const guidelineCanvas = ref()
  const arrowCanvas = ref()

  const componentsOptions = GraphPointsDefinition()
  const props = defineProps(GraphPointsDefinition().props)

  const {
    canvasSideLength: canvasSideLengthGetter,
    displayElements: displayElementsGetter,
    drawingElements: drawingElementsGetter,
    drawingArrowElements: drawingArrowElementsGetter,
  } = componentsOptions.computed

  const canvasSideLength = computed(() => canvasSideLengthGetter(props))
  const displayElements = computed(() => displayElementsGetter(props))
  const drawingElements = computed(() =>
    drawingElementsGetter(displayElements.value)
  )
  const drawingArrowElements = computed(() =>
    drawingArrowElementsGetter(displayElements.value)
  )

  onUpdated(() => {
    clearCanvas(guidelineCanvas.value)
    clearCanvas(arrowCanvas.value)

    if (props.arrow) {
      drawElementsToCanvas(arrowCanvas.value, drawingArrowElements.value)
    }
    return (
      props.drawPoints &&
      props.drawPoints.length &&
      drawElementsToCanvas(drawingCanvas.value, drawingElements.value)
    )
  })

  function drawElementsToCanvas(canvas, drawElements, drawStyle) {
    PaintingInstrustment.drawPointsSets(
      canvas,
      drawElements,
      canvasSideLength.value,
      drawStyle || props.drawStyle,
      'random'
    )
  }
  function clearCanvas(canvas) {
    drawElementsToCanvas(canvas, [], props.drawStyle, props.dimensions)
  }
  function displayAttrs(point) {
    return {
      top: point[1] + 'px',
      left: point[0] + 'px',
    }
  }
</script>

<template>
  <div class="graph-points">
    <DisplayPoint
      v-for="(
        { value, position, guideline, arrow }, index
      ) in displayElements.flat()"
      :key="`point.${value}.${index}`"
      class="point-display"
      :label="value"
      :style="displayAttrs(position)"
      @mouseenter="
        () => {
          drawElementsToCanvas($refs.guidelineCanvas, guideline, 'dashed')
        }
      "
    ></DisplayPoint>
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
  .graph-points {
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
