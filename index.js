require('babel-register')({
  presets: ['env'],
});
require.extensions['.png'] = () => {
  return;
};

module.exports = require('./client/server')
