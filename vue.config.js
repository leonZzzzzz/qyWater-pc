const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const compress = new CompressionWebpackPlugin({
  filename: info => {
    return `${info.path}.gz${info.query}`
  },
  algorithm: 'gzip',
  threshold: 10240,
  test: new RegExp('\\.(' + ['js'].join('|') + ')$'),
  minRatio: 0.8,
  deleteOriginalAssets: false
})

module.exports = {
  publicPath: './',
  productionSourceMap: false,

  devServer: {
    // host: '0.0.0.0',
    port: 8082,
    proxy: {
      '/qingdaofu': {
        // target: 'http://118.89.24.103/qingdaofu',
        target: 'https://sl.wego168.com/qingdaofu',
        changeOrigin: true,
      },
      '/qingdaofu_test': {
        target: 'https://sl.wego168.com/qingdaofu',
        // target: 'http://118.89.24.103/qingdaofu',
        changeOrigin: true,
        pathRewrite: {
          'test': 'qingdaofu'
        }
      }
    }
  },

  // configureWebpack: {
  //   plugins: [compress]
  // },

  css: {
    extract: process.env.NODE_ENV === 'production' ? true : false,
    loaderOptions: {
      sass: {
        prependData: `@import "@/theme/element.scss";`
      }
    }
  },
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.plugins.push(
  //       new TerserPlugin({
  //         terserOptions: {
  //           compress: {
  //             drop_console: true
  //           }
  //         }
  //       })
  //     )
  //   }
  // },
  chainWebpack: config => {
    config.entry('index').add('babel-polyfill')
    config.externals({
      UE: 'UE'
    })
    // config.optimization.minimize(true);
    // config.optimization.splitChunks({
    //   chunks: 'all'
    // });
    // 热更新
    config.resolve.symlinks(true)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('commonSchool', resolve('src/modules/school/components/common'))
  }
}
