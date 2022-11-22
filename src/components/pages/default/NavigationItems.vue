<script setup>
  import { ref } from 'vue'
  import NavigationItem from '@/components/items/NavigationItem.vue'
  import DocumentationIcon from '@/components/icons/IconDocumentation.vue'
  const props = defineProps({
    noIcon: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [
        {
          title: 'Title',
          subtitle: 'Subtitle or descriptions',
        },
      ],
    },
    selectable: { type: Boolean, default: false },
  })
  defineEmits(['select:item'])
  const expand = ref(props.items.length - 1)
</script>

<template>
  <NavigationItem
    v-for="(item, mainIndex) in items"
    :key="item.id"
    @click.stop="$emit('select:item', mainIndex)"
    :selectable="selectable"
  >
    <template
      v-if="!noIcon"
      #icon
    >
      <DocumentationIcon />
    </template>
    <template #heading>{{ item.title }}</template>
    <template v-if="item.html">
      <div v-html="item.subtitle"></div>
    </template>
    <template v-else>
      {{ item.subtitle }}
    </template>

    <div
      v-if="item.subItems"
      class="item-sub-expander"
    >
      <div
        class="expand-label"
        @click="expand = expand === mainIndex ? -1 : mainIndex"
      >
        Expand ( {{ item.subItems.length }} items )
      </div>
      <div
        v-if="expand === mainIndex"
        class="sub-items"
      >
        <NavigationItems
          v-if="item.subItems"
          :items="item.subItems"
          no-icon
          selectable
          @select:item="(subIndex) => $emit('select:item', mainIndex, subIndex)"
        />
      </div>
    </div>
  </NavigationItem>
</template>

<style lang="scss" scoped>
  .item-sub-expander {
    .expand-label {
      margin-top: 0.25rem;
      font-weight: 500;
      font-size: 16px;
      transition: all 0.15s;
      &:hover {
        cursor: pointer;
        color: #cccccc;
      }
    }
  }
</style>
