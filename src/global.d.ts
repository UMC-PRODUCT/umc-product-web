declare module 'rollup-plugin-visualizer' {
  import type { Plugin } from 'rollup'

  export interface VisualizerOptions {
    filename?: string
    title?: string
    sourcemap?: boolean
    gzipSize?: boolean
    brotliSize?: boolean
    emitFile?: boolean
    template?: 'treemap' | 'sunburst' | 'network'
    open?: boolean
    projectRoot?: string
    projectName?: string
    entry?: string
    filter?: (module: string) => boolean
    [key: string]: unknown
  }

  export function visualizer(options?: VisualizerOptions): Plugin
  export default visualizer
}
