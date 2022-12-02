<script setup>
  import DisplayPoint from '@/components/displays/DisplayPoint.vue'

  defineProps({ drawingFaces: { type: Array, default: null } })

  function displayAttrs(point) {
    return {
      top: point[1] + 'px',
      left: point[0] + 'px',
    }
  }
</script>

<template>
  <div class="graph-points">
    <template v-for="(face, elementIndex) in drawingFaces">
      <DisplayPoint
        v-for="({ value, position }, pointIndex) in face"
        :key="`element.${elementIndex}.point.${value}.${pointIndex}`"
        class="point-display"
        :label="value"
        :style="displayAttrs(position)"
        @mouseenter="
          () => {
            $emit('hover:point', {
              point: value,
              face: face.map(({ value }) => value),
            })
          }
        "
      ></DisplayPoint>
    </template>
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
