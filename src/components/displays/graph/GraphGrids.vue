<script setup>
  import GraphGrid from '@/components/displays/graph/GraphGrid.vue'

  const props = defineProps({
    gridsData: { type: Object, default: () => ({ tableWidth: 600 }) },
    dimensions: { type: Number, default: 2 },
  })
</script>

<template>
  <GraphGrid
    class="graph-plane plane-xy"
    :style="{
      transform:
        dimensions > 2
          ? `skew(${gridsData.skew[0]}deg, ${gridsData.skew[1]}deg)`
          : '',
    }"
    v-bind="gridsData"
  />
  <GraphGrid
    v-if="dimensions > 2"
    class="graph-plane plane-zy"
    :style="{
      transform: `skew(0deg, ${gridsData.skew[1]}deg)`,
    }"
    v-bind="gridsData"
  />
</template>

<style lang="scss" scoped>
  .graph-plane {
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
</style>
