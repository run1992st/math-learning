<script setup>
  import { computed } from 'vue'

  import GraphGrids from '@/components/displays/graph/GraphGrids.vue'
  import GraphPoints3D from '@/components/displays/graph/GraphPoints3D.vue'
  import GraphElementDrawer from '@/components/displays/graph/GraphElementDrawer.vue'

  const props = defineProps({
    displayOptions: {
      type: Object,
      default: () => ({ gridSize: [1, 1], axisLength: 12, dimensions: 2 }),
    },
  })
  const TABLE_WIDTH = 600
  const [SKEW_X, SKEW_Y] = [-40, 20]
  const gridWidth = computed(
    () => TABLE_WIDTH / ((props.displayOptions.axisLength || 12) * 2)
  )

  function gridsAttrs(displayOptions) {
    return {
      gridSize: displayOptions.gridSize || [1, 1],
      axisLength: displayOptions.axisLength || 12,
      showLegend: displayOptions.legend,
      drawStyle: displayOptions.drawStyle,
      lineColor: displayOptions.lineColor,
      drawPoints: displayOptions.drawPoints,
      dimensions: displayOptions.dimensions,
      arrow: displayOptions.arrow,
    }
  }
  function drawingAttrs(displayOptions) {
    return {
      drawStyle: displayOptions.drawStyle,
      lineColor: displayOptions.lineColor,
      drawPoints: displayOptions.drawPoints,
    }
  }
</script>

<template>
  <div
    class="display-graph"
    :class="{ '--three-dimensions': displayOptions.dimensions > 2 }"
  >
    <GraphGrids
      class="graph-plane plane-xy"
      :style="{
        width: TABLE_WIDTH + 'px',
        height: TABLE_WIDTH + 'px',
        transform:
          displayOptions.dimensions > 2
            ? `skew(${SKEW_X}deg, ${SKEW_Y}deg)`
            : '',
      }"
      :table-width="TABLE_WIDTH"
      v-bind="{ ...gridsAttrs(displayOptions) }"
    />
    <GraphGrids
      v-if="displayOptions.dimensions > 2"
      class="graph-plane plane-zy"
      :table-width="TABLE_WIDTH"
      v-bind="{ ...gridsAttrs(displayOptions) }"
    />
    <GraphPoints3D
      class="graph-points"
      :style="{
        width: TABLE_WIDTH + 'px',
        height: TABLE_WIDTH + 'px',
      }"
      v-bind="{
        ...gridsAttrs(displayOptions),
        gridWidth,
      }"
      :display-transformations="[360 - SKEW_Y, SKEW_X]"
    />
    <GraphElementDrawer
      class="graph-points"
      :style="{
        width: TABLE_WIDTH + 'px',
        height: TABLE_WIDTH + 'px',
      }"
      v-bind="{
        dimensionData: {
          ...gridsAttrs(displayOptions),
          gridWidth,
        },
        drawingOptions: {
          ...drawingAttrs(displayOptions),
        },
      }"
      :display-transformations="[360 - SKEW_Y, SKEW_X]"
    />
  </div>
</template>

<style lang="scss" scoped>
  .display-graph {
    position: relative;
    padding: 2rem;
    .\--three-dimensions {
      margin: 6rem 8rem;
    }
    .graph-plane {
      position: absolute;
    }
    .graph-points {
      z-index: 2;
      position: absolute;
    }
    .plane-xy {
      z-index: 1;
      border: #cdaacc50 1px solid;
    }

    .plane-zy {
      transform: skew(0deg, 20deg);
      border: #cdaa8850 1px solid;
    }
  }
</style>
