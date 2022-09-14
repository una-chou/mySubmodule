// 参考https://cli.vuejs.org/zh/config/#vue-config-js
const webpack = require('webpack')
const merge = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

let configureWebpackPlugins = [new webpack.ProvidePlugin({Promise: 'bluebird'})]

module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end()
      }
    }
    // 移除插件 路由不加载的时候 不再加载对应模块
    config.plugins.delete('prefetch')

    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true,
              }),
            ],
          }),
          compilerOptions: {
            module: 'es2015',
          },
        })
        return options
      })
  },
  configureWebpack: {
    devtool: '', // 'source-map'
    plugins: [
      ...configureWebpackPlugins,
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    optimization: {
      // 优化配置
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            maxSize: 1200000,
            name: 'chunk-vendors',
          },
        },
      },
    },
  },
  productionSourceMap: true,
  lintOnSave: true,
}
