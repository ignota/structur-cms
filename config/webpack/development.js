/* eslint-disable indent */

const { client } = require('./base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('merge-deep')

client
  .mode('development')
  .devtool('source-map')

client.output
  .pathinfo(false)
  .publicPath('/')

client.module
  .rule('babel')
    .use('babel')
      .tap(options => merge(options, {
        plugins: [
          ['styled-components', {
            displayName: true,
            ssr: true,
          }],
        ],
      }))

client.resolve.alias
  .set('react-dom', '@hot-loader/react-dom')
  .end()

client
  .plugin('html')
  .use(HtmlWebpackPlugin, [
    { hash: true },
  ])

module.exports = client.toConfig()
