/* eslint-disable camelcase, indent, sort-keys */

const { client, server } = require('./base')
const CopyPlugin = require('copy-webpack-plugin')
const HashOutputPlugin = require('webpack-plugin-hash-output')
const imageminGIFLossy = require('imagemin-giflossy')
const { default: ImageminPlugin } = require('imagemin-webpack-plugin')
const merge = require('merge-deep')
const { readFileSync } = require('fs')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const webpack = require('webpack')

const banner = readFileSync('config/banner.txt', { encoding: 'utf8' })

client
  .mode('development')

client.output
  .chunkFilename('structur/js/[chunkhash].js')
  .filename('structur/js/[chunkhash].js')
  .publicPath('/')
  .hashFunction('sha256')

client.module
  .rule('babel')
    .use('babel')
      .tap(options => merge(options, {
        plugins: [
          'graphql-tag',
          ['styled-components', {
            displayName: true,
            ssr: true,
          }],
        ],
      }))

client.module
  .rule('fonts')
    .use('file')
      .tap(options => merge(options, { name: 'structur/fonts/[hash].[ext]' }))

client.module
  .rule('images')
    .use('file')
      .tap(options => merge(options, { name: 'structur/img/[hash].[ext]' }))

client
  .plugin('hash-output')
  .use(HashOutputPlugin)

client
  .plugin('define')
    .tap(args => [
      merge(args[0], {
        __CABLE_URI__: JSON.stringify('wss://cable.structur.demo.ignota.kitchen/'),
        __DEV__: JSON.stringify(false),
        __STRUCTUR_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
        __TRYSTERO_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
        __WHOMST_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
      }),
    ])

client
  .plugin('banner')
  .use(webpack.BannerPlugin, [
    { banner, entryOnly: true, raw: true },
  ])

client
  .plugin('copy')
  .use(CopyPlugin, [
    [
      { force: true, from: 'images/favicon.ico', to: 'favicon.ico' },
    ],
  ])

client
  .plugin('stats')
  .use(StatsWriterPlugin, [
    { fields: null, filename: '../stats.json' },
  ])

server
  .mode('development')

server.output
  .publicPath('/')

server.module
  .rule('babel')
    .use('babel')
      .tap(options => merge(options, {
        plugins: [
          'graphql-tag',
          ['styled-components', {
            displayName: true,
            ssr: true,
          }],
        ],
      }))

server.module
  .rule('images')
    .use('file')
      .tap(options => merge(options, { name: 'structur/img/[hash].[ext]' }))

server
  .plugin('define')
    .tap(args => [
      merge(args[0], {
        __CABLE_URI__: JSON.stringify('ws://structur-cable/'),
        __DEV__: JSON.stringify(false),
        __STRUCTUR_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
        __TRYSTERO_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
        __WHOMST_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
      }),
    ])

module.exports = [client.toConfig(), server.toConfig()]
