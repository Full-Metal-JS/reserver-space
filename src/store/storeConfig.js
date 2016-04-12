if (process.env.NODE_ENV === 'production') {
  module.exports = require('./storeConfig.prod')
} else {
  module.exports = require('./storeConfig.dev')
}
