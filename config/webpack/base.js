/* eslint-disable indent, sort-keys */

const Config = require('webpack-chain')
const path = require('path')
const webpack = require('webpack')

const client = new Config()
const server = new Config()

const BABEL_CLIENT_OPTIONS = {
  babelrc: false,
  presets: [
    ['@babel/env', {
      exclude: [
        'transform-async-to-generator',
        'transform-regenerator',
      ],
      targets: {
        browsers: ['last 2 versions'],
      },
      modules: false,
      loose: true,
      useBuiltIns: 'usage',
    }],
    '@babel/react',
  ],
  plugins: [
    'autobind-class-methods',
    ['@babel/proposal-decorators', {
      legacy: true,
    }],
    ['@babel/proposal-class-properties', {
      loose: true,
    }],
    '@babel/proposal-do-expressions',
    '@babel/proposal-export-default-from',
    '@babel/proposal-export-namespace-from',
    '@babel/proposal-function-bind',
    '@babel/proposal-function-sent',
    '@babel/proposal-json-strings',
    '@babel/proposal-logical-assignment-operators',
    ['@babel/proposal-nullish-coalescing-operator', {
      loose: true,
    }],
    '@babel/proposal-numeric-separator',
    '@babel/proposal-optional-catch-binding',
    ['@babel/proposal-optional-chaining', {
      loose: true,
    }],
    ['@babel/proposal-pipeline-operator', {
      proposal: 'minimal',
    }],
    '@babel/proposal-throw-expressions',
    '@babel/syntax-dynamic-import',
    '@babel/syntax-import-meta',
    ['@babel/transform-regenerator', {
      async: false,
      asyncGenerators: true,
      generators: true,
    }],
    ['module:fast-async', {
      compiler: {
        lazyThenables: true,
        parser: {
          sourceType: 'module',
        },
        promises: true,
        wrapAwait: true,
      },
      useRuntimeModule: true,
    }],
    'lodash',
    ['ramda', {
      useES: true,
    }],
    'universal-import',
  ],
}

const BABEL_SERVER_OPTIONS = {
  babelrc: false,
  presets: [
    ['@babel/env', {
      exclude: [
        'transform-async-to-generator',
        'transform-regenerator',
      ],
      targets: {
        node: 'current',
      },
      modules: 'commonjs',
      loose: true,
      useBuiltIns: 'usage',
    }],
    '@babel/react',
  ],
  plugins: [
    'autobind-class-methods',
    ['@babel/proposal-decorators', {
      legacy: true,
    }],
    ['@babel/proposal-class-properties', {
      loose: true,
    }],
    '@babel/proposal-do-expressions',
    '@babel/proposal-export-default-from',
    '@babel/proposal-export-namespace-from',
    '@babel/proposal-function-bind',
    '@babel/proposal-function-sent',
    '@babel/proposal-json-strings',
    '@babel/proposal-logical-assignment-operators',
    ['@babel/proposal-nullish-coalescing-operator', {
      loose: true,
    }],
    '@babel/proposal-numeric-separator',
    '@babel/proposal-optional-catch-binding',
    ['@babel/proposal-optional-chaining', {
      loose: true,
    }],
    ['@babel/proposal-pipeline-operator', {
      proposal: 'minimal',
    }],
    '@babel/proposal-throw-expressions',
    '@babel/syntax-dynamic-import',
    '@babel/syntax-import-meta',
    'lodash',
    'ramda',
    'universal-import',
  ],
}

const REACT_SVG_OPTIONS = {
  svgo: {
    plugins: [
      { cleanupAttrs: true },
      { cleanupListOfValues: true },
      { cleanupNumericValues: true },
      { collapseGroups: true },
      { convertPathData: true },
      { convertShapeToPath: true },
      { convertTransform: true },
      { mergePaths: true },
      {
        removeAttrs: {
          attrs: [
            'class.*',
            'fill.*',
            'stroke.*',
            'style.*',
          ],
        },
      },
      { removeComments: true },
      { removeDesc: true },
      { removeDoctype: true },
      { removeEditorsNSData: true },
      { removeEmptyAttrs: true },
      { removeEmptyContainers: true },
      { removeEmptyText: true },
      { removeHiddenElems: true },
      { removeMetadata: true },
      { removeNonInheritableGroupAttrs: true },
      { removeRasterImages: true },
      { removeStyleElement: true },
      { removeScriptElement: true },
      { removeTitle: true },
      { removeUnknownsAndDefaults: true },
      { removeUnusedNS: true },
      { removeUselessDefs: true },
      { removeUselessStrokeAndFill: true },
      { removeXMLNS: true },
      { removeXMLProcInst: true },
    ],
  },
  jsx: true,
}

client
  .set('name', 'client')
  .context(path.resolve('src'))
  .mode('development')
  .target('web')

client
  .entry('main')
    .add('./boot-client')

client.output
  .chunkFilename('structur/js/[name].js')
  .filename('structur/js/[name].js')
  .path(path.resolve('dist', 'public'))

client.module
  .rule('babel')
    .test(/\.js$/)
    .exclude
      .add(/node_modules/)
      .add(/vendor/)
      .end()
    .use('babel')
      .loader('babel')
      .options(BABEL_CLIENT_OPTIONS)

client.module
  .rule('fonts')
    .test(/\.(woff2?)$/)
    .include
      .add(/vendor\/fonts/)
      .end()
    .use('file')
      .loader('file')
      .options({ name: 'structur/fonts/[name].[ext]' })

client.module
  .rule('style-raw')
    .test(/\.css$/)
    .use('style')
      .loader('style')
      .options({ insertAt: 'top' })
      .end()
    .use('css')
      .loader('css')

client.module
  .rule('images')
    .test(/\.(jpe?g|png|webp|ico)$/)
    .use('file')
      .loader('url')
      .options({ limit: 2048, name: 'structur/img/[name].[ext]' })

client.module
  .rule('svg')
    .test(/\.svg$/)
    .use('babel')
      .loader('babel')
      .options(BABEL_CLIENT_OPTIONS)
      .end()
    .use('react-svg')
      .loader('react-svg')
      .options(REACT_SVG_OPTIONS)

client.module
  .rule('dropcap-shim')
    .test(require.resolve('dropcap.js'))
    .use('exports-imports')
      .loader('imports?window=>{}')
      .loader('exports?window')

client.resolve
  .enforceExtension(false)
  .modules
    .add('src')
    .add('node_modules')
    .end()
  .alias
    .set('actioncable', 'vendor/actioncable')
    .end()

client.resolveLoader
  .moduleExtensions
    .add('-loader')

client
  .plugin('define')
  .use(webpack.DefinePlugin, [
    {
      __CABLE_URI__: JSON.stringify('wss://structur-api.dyck.mobi/cable'),
      __DEV__: JSON.stringify(true),
      __SERVER_SIDE__: JSON.stringify(false),
      __STRUCTUR_URI__: JSON.stringify('https://structur-api.dyck.mobi'),
      __TRYSTERO_URI__: JSON.stringify('https://structur-api.dyck.mobi'),
      __WHOMST_URI__: JSON.stringify('https://structur-api.dyck.mobi'),
    },
  ])

client
  .plugin('ignore-moment')
  .use(webpack.IgnorePlugin, [
    /^\.\/locale$/, /moment$/,
  ])

server
  .set('name', 'server')
  .context(path.resolve('src'))
  .mode('development')
  .target('node')

server
  .entry('main')
    .add('./boot-server')

server.output
  .filename('app.js')
  .libraryTarget('commonjs-module')
  .path(path.resolve('dist'))
  .pathinfo(false)

server.module
  .rule('babel')
    .test(/\.js$/)
    .exclude
      .add(/node_modules/)
      .add(/vendor/)
      .end()
    .use('babel')
      .loader('babel')
      .options(BABEL_SERVER_OPTIONS)

server.module
  .rule('images')
    .test(/\.(jpe?g|png|webp|ico)$/)
    .use('file')
      .loader('url')
      .options({ emitFile: false, limit: 2048, name: 'structur/img/[name].[ext]' })

server.module
  .rule('svg')
    .test(/\.svg$/)
    .use('babel')
      .loader('babel')
      .options(BABEL_SERVER_OPTIONS)
      .end()
    .use('react-svg')
      .loader('react-svg')
      .options(REACT_SVG_OPTIONS)

server.module
  .rule('dropcap-shim')
    .test(require.resolve('dropcap.js'))
    .use('exports-imports')
      .loader('imports?window=>{}')
      .loader('exports?window')

server.resolve
  .enforceExtension(false)
  .modules
    .add('src')
    .add('node_modules')
    .end()
  .alias
    .set('actioncable', 'vendor/actioncable')
    .end()

server.resolveLoader
  .moduleExtensions
    .add('-loader')

server
  .plugin('define')
  .use(webpack.DefinePlugin, [
    {
      __CABLE_URI__: JSON.stringify('wss://structur-api.dyck.mobi/cable'),
      __DEV__: JSON.stringify(true),
      __SERVER_SIDE__: JSON.stringify(true),
      __STRUCTUR_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
      __TRYSTERO_URI__: JSON.stringify('https://structur-api.dyck.mobi'),
      __WHOMST_URI__: JSON.stringify('https://structur-api.dyck.mobi'),
    },
  ])

server
  .plugin('ignore-moment')
  .use(webpack.IgnorePlugin, [
    /^\.\/locale$/, /moment$/,
  ])

server
  .externals(
    [
      (_context, request, callback) => {
        if (/stats\.json$/.test(request)) {
          return callback(null, `commonjs ${ request }`)
        }
        callback()
      },
    ],
  )

exports.client = client
exports.server = server
