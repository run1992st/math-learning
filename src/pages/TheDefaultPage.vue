<script setup>
  import { onMounted, ref } from 'vue'
  import chapters from '@/assets/contents/chapters-exercises.js'

  import NavigationHeader from '@/components/pages/default/NavigationHeader.vue'
  import NavigationItems from '@/components/pages/default/NavigationItems.vue'
  import DisplayGraph3D from '@/components/displays/DisplayGraph3D.vue'

  const displayValues = ref({})
  onMounted(() => {
    handleSelectedExercise(2, 4)
  })
  function handleSelectedExercise(chapterNumber, exerciseNumber) {
    if (typeof exerciseNumber !== 'number') {
      return
    }
    const result = chapters[chapterNumber].exerciseFunctions[exerciseNumber]()
    displayValues.value = result
  }
</script>

<template>
  <div class="page-container">
    <div class="page-navbar">
      <NavigationHeader />
      <div class="navigation-items">
        <NavigationItems
          :items="chapters"
          @select:item="handleSelectedExercise"
        />
      </div>
    </div>
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
    .page-navbar {
      margin: 5rem 4rem;
      width: 24rem;
    }
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
