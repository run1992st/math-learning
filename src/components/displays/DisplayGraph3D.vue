<script setup>
  import { computed, ref } from 'vue'
  import DisplayOptionsDefinitions from '@/components/displays/display-options.definitions.js'
  import GraphGrids from '@/components/displays/graph/GraphGrids.vue'
  import GraphPoints3D from '@/components/displays/graph/GraphPoints3D.vue'
  import GraphElementDrawer from '@/components/displays/graph/GraphElementDrawer.vue'

  const componentsOptions = DisplayOptionsDefinitions()
  const props = defineProps(DisplayOptionsDefinitions().props)
  const currentPoint = ref(null)
  const currentFace = ref(null)
  const {
    gridsDisplayData: gridsDisplayDataGetter,
    drawingOptions: drawingOptionsGetter,
    drawingFaces: drawingFacesGetter,
  } = componentsOptions.computed

  const gridsDisplayData = computed(() =>
    gridsDisplayDataGetter(props.displayOptions, props.dimensions)
  )
  const drawingFaces = computed(() =>
    drawingFacesGetter(props.displayOptions, gridsDisplayData.value)
  )
  const drawingOptions = computed(() =>
    drawingOptionsGetter(props.displayOptions)
  )
  const tableWidth = computed(() => gridsDisplayData.value.tableWidth)
</script>

<template>
  <div
    class="display-graph"
    :class="{ '--three-dimensions': dimensions > 2 }"
  >
    <GraphGrids
      :grids-data="gridsDisplayData"
      :dimensions="dimensions"
    />
    <GraphPoints3D
      class="graph-points"
      :style="{
        width: tableWidth + 'px',
        height: tableWidth + 'px',
      }"
      :drawing-faces="drawingFaces.map((face) => face.points)"
      @hover:point="
        ({ point, face }) => {
          currentPoint = point
          currentFace = face
        }
      "
    />
    <GraphElementDrawer
      class="graph-points"
      :style="{
        width: tableWidth + 'px',
        height: tableWidth + 'px',
      }"
      :drawing-faces="drawingFaces"
      :drawing-options="drawingOptions"
      :display-data="gridsDisplayData"
      :current-point="currentPoint"
      :current-face="currentFace"
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
    .graph-points {
      z-index: 2;
      position: absolute;
    }
  }
</style>
