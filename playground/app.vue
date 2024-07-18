<template>
  <div class="container">
    <div class="card">
      <strong>Options:</strong>
      <pre><code>{{ options }}</code></pre>
    </div>
    <br>
    <div class="mat2">
      <div class="mat">
        <MdiIcon
          class="icon"
          :size="`${size}em`"
          :style="{ color }"
          icon="mdiNuxt"
        />
      </div>
    </div>
    <div class="card options">
      <div>
        <input
          v-model="color"
          type="color"
        >
        {{ color }}
      </div>
      <div>
        {{ size }}em
        <input
          v-model="size"
          type="range"
          min="1"
          max="30"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

const options = useRuntimeConfig().public.mdi

const color = ref<string>('#00DC82');
const size = ref<string>('24');

ref(null)
</script>

<style>
.container {
  max-width: calc(40em + 1px);
  margin: 80px auto;
  border: 1px solid #4B4D60;
  border-radius: 0.5em;
  background-color: #2c2e40;
}

.card {
  padding: 1em;
}

.mat {
  height: calc(30em + 1px);
  background-image: linear-gradient(to right, #4B4D60FF 1px, transparent 1px),
  linear-gradient(to bottom, #4B4D60FF 1px, transparent 1px);
  background-size: 1em 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
