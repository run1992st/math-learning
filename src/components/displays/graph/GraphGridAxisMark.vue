<template>
  <div
    class="graph-grid-axis-mark"
    :class="[`--${textDirection}`]"
  >
    <div class="point-legends">
      <div class="marker"></div>
      <div
        v-if="legend"
        class="label"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    label: {
      type: [Number, String, Array],
      default: 'x',
    },
    textDirection: {
      type: String,
      default: 'bottom',
    },
    legend: {
      type: Boolean,
      default: true,
    },
  })
</script>

<style lang="scss" scoped>
  .graph-grid-axis-mark {
    position: relative;

    .point-legends {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;

      gap: 0.2rem;
      .marker {
        width: 0.05rem;
        height: 0.05rem;
        background: #777777bb;
      }
      .label {
        color: #77777799;
        font-size: 14px;
      }
    }
    &.\--bottom {
      .point-legends {
        transform: translateX(-50%);
        flex-direction: column;
        .marker {
          height: 0.45rem;
        }
        .label {
          margin-left: 0.75rem;
        }
      }
    }
    &.\--right {
      .point-legends {
        transform: translateY(-50%);
        .marker {
          width: 0.45rem;
        }
        .label {
          margin-top: 0.65rem;
        }
      }
    }
  }
</style>
