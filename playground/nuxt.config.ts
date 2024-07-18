export default defineNuxtConfig({
  modules: ['../src/module'],
  css: ['@/main.css'],
  mdi: {
    componentName: 'MdiIcon',
  },
  devtools: { enabled: true }
})
