<template>
  <svg
    :width="size"
    :height="size"
    :viewbox="viewBox"
    :style="styles"
  >
    <path :d="path"></path>
  </svg>
</template>

<script setup lang="ts">
import { importIcon } from '../library/loader'
import { Ref, ComputedRef, computed, ref, watch } from 'vue'
import { MdiIconProps } from './MdiIcon'

const props = withDefaults(defineProps<MdiIconProps>(), {
  size: '24',
  viewBox: '0 0 24 24',
  flipX: false,
  flipY: false,
})

const path: Ref<string> = ref('')

// Dynamically set css variables for flipping the icon.
const styles: ComputedRef<any> = computed(() => ({
  '--flip-x': props.flipX ? '-1' : '1',
  '--flip-y': props.flipY ? '-1' : '1',
}))

// Update the path with the corresponding SVG data from @mdi/js.
async function updateIcon() {
  path.value = await importIcon(props.icon)
}

// Update the icon when the icon prop changes.
watch(async () => props.icon, await updateIcon)

// Update the icon when the component is initially mounted.
await updateIcon()
</script>

<style scoped>
svg {
  transform: scaleX(var(--flip-x, 1)) scaleY(var(--flip-y, 1));
}

path {
  fill: currentColor;
}
</style>
