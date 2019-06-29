export const imports = {
  'src/components/Tweet/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-tweet-index" */ 'src/components/Tweet/index.mdx'
    ),
}
