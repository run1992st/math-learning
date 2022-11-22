<script setup>
  import GraphGridAxisMark from '@/components/displays/graph/GraphGridAxisMark.vue'
  defineProps({
    xAxisMarker: { type: Array, default: () => [] },
    yAxisMarker: { type: Array, default: () => [] },
    displayOptions: { type: Object, default: () => ({ legend: true }) },
  })
</script>

<template>
  <div class="graph-grid-axis">
    <div class="x-axis line">
      <div class="marker-wrapper">
        <GraphGridAxisMark
          v-for="markPoint in xAxisMarker"
          :key="`x-mark-${markPoint}`"
          :label="markPoint"
          text-direction="bottom"
          :legend="displayOptions.legend"
        />
      </div>
    </div>
    <div class="y-axis line">
      <div class="marker-wrapper">
        <GraphGridAxisMark
          v-for="markPoint in yAxisMarker"
          :key="`y-mark-${markPoint}`"
          :label="markPoint"
          text-direction="right"
          :legend="displayOptions.legend"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .graph-grid-axis {
    .line {
      position: absolute;
      background: #ffffff22;
      &.x-axis {
        top: 50%;
        height: 1px;
        width: 100%;
        .marker-wrapper {
          display: flex;
          justify-content: space-between;
        }
      }
      &.y-axis {
        left: 50%;
        width: 1px;
        height: 100%;
        .marker-wrapper {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
</style>
