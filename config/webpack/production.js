/* eslint-disable camelcase, indent, sort-keys */

const { client, server } = require('./base')
const { contentType } = require('mime-types')
const CopyPlugin = require('copy-webpack-plugin')
const F = require('ramda/src/F')
const HashOutputPlugin = require('webpack-plugin-hash-output')
const imageminGIFLossy = require('imagemin-giflossy')
const { default: ImageminPlugin } = require('imagemin-webpack-plugin')
const merge = require('merge-deep')
const OptimizeJSPlugin = require('optimize-js-plugin')
const path = require('path')
const { readFileSync } = require('fs')
const S3Plugin = require('webpack-s3-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const banner = readFileSync('config/banner.txt', { encoding: 'utf8' })

client
  .mode('none')

client.output
  .crossOriginLoading('anonymous')
  .chunkFilename('structur/js/[chunkhash].js')
  .filename('structur/js/[chunkhash].js')
  .pathinfo(false)
  .publicPath('https://ass.ignota.cloud/')
  .hashFunction('sha256')

client.module
  .rule('babel')
    .use('babel')
      .tap(options => merge(options, {
        plugins: [
          'closure-elimination',
          'graphql-tag',
          'react-local',
          ['styled-components', {
            displayName: false,
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
  .plugin('hashed-modules')
  .use(webpack.HashedModuleIdsPlugin, [
    { hashDigest: 'base64', hashDigestLength: 8, hashFunction: 'sha256' },
  ])

client
  .plugin('hash-output')
  .use(HashOutputPlugin)

client
  .plugin('define')
    .tap(args => [
      merge(args[0], {
        __CABLE_URI__: JSON.stringify('wss://cable.ignota.cloud/'),
        __DEV__: JSON.stringify(false),
        __STRUCTUR_URI__: JSON.stringify('https://structur.ignota.cloud/'),
        __TRYSTERO_URI__: JSON.stringify('http://trystero.ignota.cloud'),
        __WHOMST_URI__: JSON.stringify('http://whomst.ignota.cloud'),
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ])

client
  .plugin('optimize-js')
  .use(OptimizeJSPlugin, [
    { sourceMap: false },
  ])

client
  .plugin('imagemin')
  .use(ImageminPlugin, [
    {
      plugins: [
        imageminGIFLossy({
          lossy: 80,
          optimizationLevel: 2,
        }),
      ],
      pngquant: {
        speed: 3,
      },
    },
  ])

client
  .plugin('banner')
  .use(webpack.BannerPlugin, [
    { banner, entryOnly: false, raw: true },
  ])

client
  .plugin('copy')
  .use(CopyPlugin, [
    [
      { force: true, from: 'images/favicon.ico', to: 'favicon.ico' },
    ],
  ])

client
  .plugin('s3')
  .use(S3Plugin, [
    {
      exclude: /\.json$/,
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_DEFAULT_REGION,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      s3UploadOptions: {
        ACL: 'private',
        Bucket: 'ignota-production-cdn',
        CacheControl: 'public, max-age=31536000',
        ContentType: filename => contentType(path.basename(filename)) || 'application/octet-stream',
      },
    },
  ])

client
  .plugin('stats')
  .use(StatsWriterPlugin, [
    { fields: null, filename: '../stats.json' },
  ])

client.optimization
  .minimizer('terser')
  .use(TerserPlugin, [
    {
      parallel: 4,
      terserOptions: {
        compress: {
          negate_iife: false,
        },
        mangle: true,
        output: {
          comments: /The Ignota Media Corporation/,
          ecma: 5,
        },
        safari10: true,
        toplevel: true,
      },
      warningsFilter: F,
    },
  ])

client.optimization
  .concatenateModules(true)
  .flagIncludedChunks(true)
  .mergeDuplicateChunks(true)
  .minimize(true)
  .occurrenceOrder(true)
  .providedExports(true)
  .removeEmptyChunks(true)
  .runtimeChunk(true)
  .sideEffects(true)
  .splitChunks({
    chunks: 'all',
    name: true,
  })
  .usedExports(true)

server
  .mode('none')

server.output
  .pathinfo(false)
  .publicPath('https://ass.ignota.cloud/')

server.module
  .rule('babel')
    .use('babel')
      .tap(options => merge(options, {
        plugins: [
          'graphql-tag',
          ['styled-components', {
            displayName: false,
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
        __CABLE_URI__: JSON.stringify('wss://cable.ignota.cloud/'),
        __DEV__: JSON.stringify(false),
        __STRUCTUR_URI__: JSON.stringify('http://structur-api.production/'),
        __TRYSTERO_URI__: JSON.stringify('http://trystero-api.production'),
        __WHOMST_URI__: JSON.stringify('http://whomst-api.production'),
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ])

server
  .plugin('hashed-modules')
  .use(webpack.HashedModuleIdsPlugin, [
    { hashDigest: 'base64', hashDigestLength: 8, hashFunction: 'sha256' },
  ])

server.optimization
  .minimizer('terser')
  .use(TerserPlugin, [
    {
      parallel: 4,
      terserOptions: {
        compress: {
          negate_iife: false,
        },
        mangle: true,
        output: {
          ecma: 6,
        },
        toplevel: true,
      },
      warningsFilter: F,
    },
  ])

server.optimization
  .concatenateModules(true)
  .flagIncludedChunks(true)
  .mergeDuplicateChunks(true)
  .minimize(true)
  .occurrenceOrder(true)
  .removeEmptyChunks(true)
  .sideEffects(true)
  .usedExports(true)

module.exports = [client.toConfig(), server.toConfig()]
