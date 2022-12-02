<script setup>
  import { onMounted, ref } from 'vue'
  import chapters from '@/assets/contents/chapters-exercises.js'
  import DisplayGraph3D from '@/components/displays/DisplayGraph3D.vue'

  const mock = chapters[chapters.length - 1].exerciseFunctions[0]()
  const displayValues = ref({})
  onMounted(() => {
    displayValues.value = mock
  })
</script>

<template>
  <div class="page-container">
    <div class="page-content">
      <DisplayGraph3D
        :draw-points="displayValues.drawPoints"
        :display-options="displayValues"
        :dimensions="displayValues.dimensions || 2"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-container {
    display: flex;
    flex-direction: column;

    .page-content {
      padding: 2rem;
    }
  }
  .page-container {
    @media (min-width: 900px) {
      flex-direction: row;
    }
  }
</style>
