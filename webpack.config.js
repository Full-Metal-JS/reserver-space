const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/index.js')
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }]
  },

  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    inline: true,
    progress: true
  }
}