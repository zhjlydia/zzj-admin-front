/** @format */

const path = require('path')
const resolve = dir => path.resolve(__dirname, '..', dir)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
module.exports = {
  output: {
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ],
        include: resolve('src')
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ],
        include: resolve('src')
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.vue'],
    // 设置别名
    alias: {
      vue$: 'vue/dist/vue.js',
      '@': resolve('src') // 这样配置后 @ 可以指向 src 目录
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({filename: 'index.html', template: resolve('public/index.html')}),
    new FriendlyErrorsWebpackPlugin()
  ]
}
