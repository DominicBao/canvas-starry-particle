const {merge} = require('webpack-merge')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.config')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    // 用了热更新到处不能使用chunk hash要使用hash
    // 因为开发阶段
    filename: 'js/[name].[hash:8].bundle.js',
  },
  // webpack-dev-server
  devServer: {
    // contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    port: 9000,
    compress: false,
    // 热更新
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false,
    }),
    // 热更新插件
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          'style-loader', 
          'css-loader',
          // 'postcss-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    // webpack5的时候热更新失败，加上这个就好了，迷茫
    runtimeChunk: 'single',
  },
})
