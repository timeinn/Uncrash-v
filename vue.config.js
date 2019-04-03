const path = require('path')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  // webpack configure
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // define global variables
      new webpack.DefinePlugin({
        UNCRASH_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(GitRevision.version()),
        BUILD_DATE: buildDate
      })
    ]
  },

  // webpack-chain
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))

    // ant-design-vue custom svg icon loader
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },

  // style modifyVars
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },

  // development configure
  devServer: {
    // development server port 8000
    host: 'dev.uncrash.net',
    port: 80
    // proxy: {
    //   '/api': {
    //     target: 'https://mock.ihx.me/mock/5c0391e7f7da7e07e04a512c/uncrash/api',
    //     ws: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },

  // check eslint rules in development mode: boolean | 'error' | undefined
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}
