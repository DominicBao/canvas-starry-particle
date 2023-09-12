const path = require('path')
const WebpackBar = require('webpackbar')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // 入口
  entry: {
    index: './src/index.js',
    // 将react，react-dom单独抽出，减小包的体积
    framework: ['react', 'react-dom'],
  },
  // 出口
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[chunkhash:10].js',
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            // 大于这个就单独打包成图片文件，否则编译成base64
            limit: 8192,
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackBar({
      color: '#85d', // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false, // 默认false，启用探查器。
    }),
  ],
}
