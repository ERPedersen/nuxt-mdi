<template>
  <svg
    viewbox="0 0 24 24"
    :style="styles"
  >
    <path :d="path" />
  </svg>
</template>

<script setup lang="ts">
import { importIcon } from '../library/loader'
import { Ref, ComputedRef, computed, ref, watch } from 'vue'
import { MdiIconString } from './MdiIcon'

export interface MdiIconProps {
  width?: string,
  height?: string,
  flipX?: boolean,
  flipY?: boolean,
  icon: MdiIconString,
}

const props = withDefaults(defineProps<MdiIconProps>(), {
  width: '1em',
  height: '1em',
  flipX: false,
  flipY: false,
})

const path: Ref<string> = ref('')

// Dynamically set css variables for flipping the icon.
const styles: ComputedRef<any> = computed(() => ({
  '--flip-x': props.flipX ? '-1' : '1',
  '--flip-y': props.flipY ? '-1' : '1',
  'width': '1em',
  'height': 'auto',
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
