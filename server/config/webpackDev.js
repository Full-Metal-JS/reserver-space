const webpackDevMiddleware = (webpackConfig, compiler) => 
  require('webpack-dev-middleware')(compiler, {
    quiet: true,
    noInfo: false,
    stats: {
      colors: true,
      reasons: true
    },
    publicPath: '/'
  });
  
const webpackHotMiddleware = compiler => 
  require('webpack-hot-middleware')(compiler);
  
module.exports = {
  webpackDevMiddleware,
  webpackHotMiddleware
}