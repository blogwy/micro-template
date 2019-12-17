const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(require('babel-plugin-dynamic-import-node'))
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
}
