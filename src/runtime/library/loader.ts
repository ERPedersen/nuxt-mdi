import { cache } from './cache'
import { MdiIconString, MdiSvgString } from '../components/MdiIcon'

export async function importIcon(value: MdiIconString): Promise<MdiSvgString> {
  if (!value) {
    return ''
  }

  if (cache.has(value)) {
    return cache.get(value) as MdiIconString
  }

  const { [value]: icon } = await import('@mdi/js')
  cache.set(value, icon)

  return icon
}
