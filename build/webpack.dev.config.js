/** @format */

const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config.js')
const resolve = dir => path.resolve(__dirname, '..', dir)

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [resolve('src/main.ts')]
  },
  output: {
    filename: '[name].[hash].js',
    path: resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader', 'postcss-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api': ''}
      }
    },
    contentBase: resolve('public'), // 让WEB服务器运行静态资源（index.html）
    hot: true,
    historyApiFallback: true,
    compress: true,
    stats: 'errors-only' // 只在发生错误时输出
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
