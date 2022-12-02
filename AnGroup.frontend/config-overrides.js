const { override, useBabelRc, addWebpackPlugin } = require('customize-cra')
const { ProvidePlugin } = require('webpack')

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  addWebpackPlugin(
    new ProvidePlugin({
      process: 'process/browser',
    }),
  ),
)
