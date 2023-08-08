export default defineNuxtConfig({
  modules: ['../src/module'],
  mdi: {
    cache: false,
    componentName: 'MdiIcon',
    defaultSize: '1em'
  },
  devtools: { enabled: true }
})
