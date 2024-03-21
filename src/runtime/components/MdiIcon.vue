<template>
  <svg
    viewBox="0 0 24 24"
    :width="size.width"
    :height="size.height"
    :preserveAspectRatio="preserveAspectRatio"
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
  size?: string,
  flipX?: boolean,
  flipY?: boolean,
  icon: MdiIconString,
  preserveAspectRatio?: string,
}

const props = withDefaults(defineProps<MdiIconProps>(), {
  width: '24',
  height: 'auto',
  size: '',
  flipX: false,
  flipY: false,
  preserveAspectRatio: 'none'
})

const path: Ref<string> = ref('')

const flip: ComputedRef<any> = computed(() => ({
  x: props.flipX ? '-1' : '1',
  y: props.flipY ? '-1' : '1',
}))
const size: ComputedRef<any> = computed(() => {
  if (props.size !== "") {
    return {
      width: props.size,
      height: props.size
    }
  }
  return {
    width: props.width,
    height: props.height === "auto" ? props.width : props.height,
  }
}) 

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
  transform: scaleX(v-bind(flip.x)) scaleY(v-bind(flip.y));
}

path {
  fill: currentColor;
}
</style>
