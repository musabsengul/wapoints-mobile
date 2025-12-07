const withModularHeaders = require('./plugins/with-modular-headers.js');
const appJson = require('./app.json');

module.exports = {
  ...appJson.expo,
  plugins: [
    ...appJson.expo.plugins,
    withModularHeaders,
  ],
};
