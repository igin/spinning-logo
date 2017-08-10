const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../examples')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              require('babel-plugin-transform-object-rest-spread')
            ]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../examples')
  }
};