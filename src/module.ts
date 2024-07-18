import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'
import defu from 'defu'

export interface ModuleOptions {
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
    defaultSize: '1em',
    componentName: 'MdiIcon',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.mdi = defu(nuxt.options.runtimeConfig.public.mdi, {
      defaultSize: options.defaultSize
    })

    addComponent({
      name: options.componentName,
      filePath: resolver.resolve('runtime/components/MdiIcon.vue'),
    })
  },
})
