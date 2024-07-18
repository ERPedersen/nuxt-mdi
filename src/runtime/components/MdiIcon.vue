<template>
  <svg
    viewBox="0 0 24 24"
    :style="styles"
    :width="_size"
    :height="_size"
    :preserveAspectRatio="preserveAspectRatio"
  >
    <path :d="path" />
  </svg>
</template>

<script setup lang="ts">
import { importIcon } from '../library/loader'
import type { Ref, ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import type { MdiIconString } from './MdiIcon'
import { ModuleOptions } from '../../module'
import { useRuntimeConfig } from 'nuxt/app'

type PluginOptions = ModuleOptions

export interface MdiIconProps {
  size?: string,
  flipX?: boolean,
  flipY?: boolean,
  icon: MdiIconString,
  preserveAspectRatio?: string,
}

const options: PluginOptions = useRuntimeConfig().public.mdi as PluginOptions

const props = withDefaults(defineProps<MdiIconProps>(), {
  size: undefined,
  flipX: false,
  flipY: false,
  preserveAspectRatio: 'meet',
})

const _size = computed(() => {
  if (props.size) return props.size
  if (options.defaultSize) return options.defaultSize
  return '1em'
})

const path: Ref<string> = ref('')

// Dynamically set css variables for flipping the icon.
const styles: ComputedRef<Record<string, string>> = computed(() => ({
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
