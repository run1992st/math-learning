<script setup>
  import { ref, onUpdated, computed } from 'vue'
  import GraphDrawerDefinition from './graph-drawer.definitions.js'
  import PaintingInstrustment from '@/functions/painting-intrustment'

  const drawingCanvas = ref()
  const guidelineCanvas = ref()
  const arrowCanvas = ref()
  const directionCanvas = ref()
  const overlayCanvas = ref()

  const componentsOptions = GraphDrawerDefinition()
  const props = defineProps(GraphDrawerDefinition().props)

  const paintingElements = componentsOptions.computed.paintingElements(props)
  const drawingElements = componentsOptions.computed.drawingElements(props)
  const directionVector = componentsOptions.computed.directionVector(props)
  const dashedGuideline = componentsOptions.computed.dashedGuideline(props)
  const faceOverlay = componentsOptions.computed.faceOverlay(props)

  onUpdated(() => {
    clearCanvas(guidelineCanvas.value)
    clearCanvas(arrowCanvas.value)
    if (!props.drawingFaces || !props.drawingFaces.length) return
    drawElementsToCanvas(
      drawingCanvas.value,
      props.drawingOptions.fill
        ? paintingElements.value
        : drawingElements.value,
      props.drawingOptions.drawStyle,
      props.drawingOptions.fill ? '#2288ee' : ''
    )
    if (props.currentPoint) {
      drawElementsToCanvas(
        guidelineCanvas.value,
        dashedGuideline.value,
        'dashed'
      )
      drawElementsToCanvas(directionCanvas.value, directionVector.value, 'line')
      drawElementsToCanvas(
        overlayCanvas.value,
        faceOverlay.value,
        'line',
        '#22aaee'
      )
    }
  })

  function drawElementsToCanvas(canvas, drawElements, drawStyle, fillColor) {
    PaintingInstrustment.paintShapesToCanvas(canvas, drawElements, {
      canvasSideLength: props.displayData.tableWidth,
      drawStyle: drawStyle || props.drawingOptions.drawStyle,
      lineColor: fillColor ? '' : 'random',
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
    <canvas
      class="points-reference --direction"
      ref="directionCanvas"
    ></canvas>
    <canvas
      class="points-reference"
      ref="overlayCanvas"
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
      &.\--direction {
        z-index: 5;
      }
    }
  }
</style>
