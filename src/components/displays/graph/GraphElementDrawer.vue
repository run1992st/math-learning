<script setup>
  import { ref, onUpdated, computed } from 'vue'
  import GraphDrawerDefinition from './graph-drawer.definitions.js'
  import PaintingInstrustment from '@/functions/painting-intrustment'

  const drawingCanvas = ref()
  const componentsOptions = GraphDrawerDefinition()
  const props = defineProps(GraphDrawerDefinition().props)

  const {
    canvasSideLength: canvasSideLengthGetter,
    displayElements: displayElementsGetter,
    paintingElements: paintingElementsGetter,
  } = componentsOptions.computed

  const canvasSideLength = computed(() => canvasSideLengthGetter(props))
  const displayElements = computed(() => displayElementsGetter(props))
  const paintingElements = computed(() =>
    paintingElementsGetter(displayElements.value, props)
  )

  onUpdated(() => {
    return (
      props.drawingOptions.drawPoints &&
      props.drawingOptions.drawPoints.length &&
      paintElementsToCanvas(drawingCanvas.value, paintingElements.value)
    )
  })

  function paintElementsToCanvas(canvas, paintingElements, drawStyle) {
    PaintingInstrustment.paintFaces3D(
      canvas,
      paintingElements,
      canvasSideLength.value,
      drawStyle || props.drawingOptions.drawStyle,
      'random',
      '#2288ee'
    )
  }
</script>

<template>
  <div class="graph-drawer">
    <canvas ref="drawingCanvas"></canvas>
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
