const SingleSpaAssetWebpackPlugin = require('single-spa-asset-webpack-plugin')

const microConfig = require('./micro-config.js')

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    port: 8009
  },
  chainWebpack: (config) => {
    // 外部扩展
    config.externals({
      vue: 'vue',
      'vue-router': 'vueRouter',
      vuex: 'vuex',
      moment: 'moment'
    })

    //  single spa config
    config
      .plugin('SingleSpaAssetWebpackPlugin')
      .use(SingleSpaAssetWebpackPlugin)
      .tap((args) => {
        return [
          {
            output: 'config.json',
            config: microConfig,
            beforeWrite: (config, assetObj) => {
              if (assetObj.assets.js[0].name === 'app') {
                config.main = assetObj.assets.js[0].files[0]
              }
              return config
            }
          }
        ]
      })
  }
}
