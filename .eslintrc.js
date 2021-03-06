/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  "extends": './node_modules/eslint-config-airbnb-base/index.js',
  "rules": {
    "allowForLoopAfterthoughts": true,
    "no-console": "off",
  },
  "plugins": ["jest"],
  "env": {
    "jest": true
  },
  "parser": "babel-eslint"
};