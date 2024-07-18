import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  cache: false | 'localStorage'
  defaultSize: string | number
  componentName: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-mdi',
    configKey: 'mdi',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    cache: 'localStorage',
    defaultSize: '1em',
    componentName: 'MdiIcon',
  },
  setup(options) {
    const resolver = createResolver(import.meta.url)
    addComponent({
      name: options.componentName,
      filePath: resolver.resolve('runtime/components/MdiIcon.vue'),
    })
  },
})
