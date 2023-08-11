import * as Icons from '@mdi/js'

export type MdiSvgString = string

export type MdiIconString = keyof typeof Icons

export type MdiIconCache = Map<MdiIconString, MdiSvgString>
