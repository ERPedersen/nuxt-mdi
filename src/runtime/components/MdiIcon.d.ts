import * as Icons from '@mdi/js'

export type MdiSvgString = string

export type MdiIconString = keyof typeof Icons

export type MdiIconCache = Map<MdiIconString, MdiSvgString>

export interface MdiIconProps {
  size?: string | number,
  viewBox?: string,
  flipX?: boolean,
  flipY?: boolean,
  icon: MdiIconString,
}
