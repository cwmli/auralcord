require('babel-register')({
  presets: ['env'],
});
require.extensions['.css'] = () => {
  return;
};
require.extensions['.png'] = () => {
  return;
};

module.exports = require('./client/server')
