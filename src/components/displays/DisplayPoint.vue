<template>
  <div class="display-point">
    <div
      class="point-painted --intersect"
      :class="{
        '--highlight': highlight,
      }"
    >
      <span class="point-label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    fractionLength: Number,
    highlight: Boolean,
    label: { type: [String, Number, Array], default: '' },
  })
</script>

<style lang="scss" scoped>
  .display-point {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #ffffff03;
    .point-painted {
      position: relative;
      background: #cccccc14;
      border-radius: 100%;
      width: 6px;
      height: 6px;

      transition: all 0.15s;
      .point-label {
        display: none;
        white-space: nowrap;
        position: absolute;
        color: #ffffff22;
      }
    }
    .point-painted.\--intersect {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      background: #cccccc44;

      &:hover {
        cursor: pointer;
        background: #ccccee;
        width: 12px;
        height: 12px;
        .point-label {
          display: initial;
          white-space: nowrap;
          position: absolute;
          top: -48px;
          left: -4px;
          font-size: 18px;
          font-weight: 700;
          color: #ffffffcc;
        }
      }
      &.\--highlight {
        background: rgb(196, 106, 106);
      }
    }
  }
</style>
