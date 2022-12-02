<script setup>
  import { computed } from 'vue'
  import { getInteratable } from '@/functions/commons-utilities.js'
  import GraphGridMesh from '@/components/displays/graph/GraphGridMesh.vue'
  import GraphGridAxis from '@/components/displays/graph/GraphGridAxis.vue'

  const props = defineProps({
    tableWidth: { type: Number, default: 800 },
    axisLength: { type: Number, default: 10 },
    gridSize: { type: Array, default: () => [1, 1] },
    gridWidth: { type: Number, required: true },
    showLegend: { type: Boolean, default: true },
  })

  const [xMarkers, yMarkers] = [
    computed(() => createMarkerArray(props.axisLength * 2, props.gridSize[0])),
    computed(() => createMarkerArray(props.axisLength * 2, props.gridSize[1])),
  ]

  function createMarkerArray(partitionSize, scale) {
    const pointsSequences = getInteratable(partitionSize + 1)
    const scaledMarkerSequences = pointsSequences.map(
      (point) => (point - props.axisLength) * scale
    )
    return scaledMarkerSequences
  }
</script>

<template>
  <div
    class="graph-grid"
    :style="{ width: tableWidth + 'px', height: tableWidth + 'px' }"
  >
    <GraphGridMesh
      class="graph-grid-mesh"
      :grid-width="gridWidth"
    />
    <GraphGridAxis
      class="graph-grid-axis"
      :x-axis-marker="xMarkers"
      :y-axis-marker="yMarkers"
      :display-options="{ legend: showLegend }"
    />
  </div>
</template>

<style lang="scss" scoped>
  .graph-grid {
    background: #ffffff02;
    border: 1px solid #ffffff20;
    * {
      user-select: none;
    }
    .graph-grid-mesh,
    .graph-grid-axis {
      position: absolute;
      inset: 0 0 0 0;
    }
  }
</style>
