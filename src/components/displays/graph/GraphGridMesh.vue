<script setup>
  const props = defineProps({
    gridWidth: { type: Number, default: 10 },
  })
  function gridSpace(gridWidth) {
    return `repeating-linear-gradient(
        transparent,
        transparent ${gridWidth - 1}px,
        #ffffff10 ${gridWidth - 1}px,
        #ffffff10 ${gridWidth}px
      )`
  }
</script>

<template>
  <div class="graph-grid-mesh">
    <div
      class="grid-mesh"
      :style="{ background: gridSpace(gridWidth) }"
    />
    <div
      class="grid-mesh horizontal"
      :style="{ background: gridSpace(gridWidth) }"
    />
  </div>
</template>

<style lang="scss" scoped>
  .graph-grid-mesh {
    .grid-mesh {
      position: absolute;
      width: 100%;
      height: 100%;
      &.horizontal {
        transform: rotate(90deg);
      }
    }
  }
</style>
