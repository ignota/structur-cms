import {
  colors,
  createGenerateClassName,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import { Route, StaticRouter } from 'react-router'
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components'
import { App } from 'app/routes'
import { configureStore } from 'app/flux'
import { DragDropContextProvider } from 'react-dnd'
import etag from 'etag'
import fetch from 'node-fetch'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { Helmet } from 'react-helmet'
import HTML5Backend from 'react-dnd-html5-backend'
import JssProvider from 'react-jss/lib/JssProvider'
import Koa from 'koa'
import path from 'path'
import { Provider } from 'react-redux'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Router from 'koa-router'
import serve from 'koa-static'
import { setAutoFreeze } from 'immer'
import { SheetsRegistry } from 'react-jss/lib/jss'
import { theme } from 'app/styles'

global.fetch = fetch

setAutoFreeze(__DEV__)

const muiTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
    secondary: colors.amber,
    type: 'light',
  },
  typography: {
    fontFamily: [
      'SF Pro Text',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    useNextVariants: true,
  },
})

const getRootComponent = ({ context, ctx, generateClassName = createGenerateClassName(), sheet = new ServerStyleSheet(), sheetsRegistry = new SheetsRegistry(), store }) =>
  <Provider store={ store }>
    <StyleSheetManager sheet={ sheet.instance }>
      <ThemeProvider theme={ theme }>
        <JssProvider generateClassName={ generateClassName } registry={ sheetsRegistry }>
          <MuiThemeProvider sheetsManager={ new Map() } theme={ muiTheme }>
            <DragDropContextProvider backend={ HTML5Backend }>
              <StaticRouter context={ context } location={ ctx.path }>
                <Route>
                  { props => <App { ...props } /> }
                </Route>
              </StaticRouter>
            </DragDropContextProvider>
          </MuiThemeProvider>
        </JssProvider>
      </ThemeProvider>
    </StyleSheetManager>
  </Provider>

function getServerRenderer({ clientStats }) {
  return async ctx => {
    const context = {}
    const generateClassName = createGenerateClassName()
    const sheetsRegistry = new SheetsRegistry()
    const {
      rootTask,
      store,
      structurClient,
      trysteroClient,
      whomstClient,
    } = configureStore()

    renderToString(
      getRootComponent({
        context,
        ctx,
        store,
      }),
    )

    store.close()

    try {
      await rootTask.toPromise()
    } catch (err) {
      console.error(err)
      ctx.throw(500, err)
    }

    if (context.redirect) {
      return ctx.redirect(context.redirect)
    }

    const sheet = new ServerStyleSheet()

    const reactBody = renderToString(
      getRootComponent({
        context,
        ctx,
        generateClassName,
        sheet,
        sheetsRegistry,
        store,
      }),
    )

    const { scripts } = flushChunks(clientStats, {
      chunkNames: flushChunkNames(),
    })

    const helmet = Helmet.renderStatic()

    const reduxState = JSON.stringify(store.getState())
    const structurState = JSON.stringify(structurClient.extract())
    const trysteroState = JSON.stringify(trysteroClient.extract())
    const whomstState = JSON.stringify(whomstClient.extract())

    const body = `
      <!doctype html>
      <html ${ helmet.htmlAttributes }>
        <head>
          ${ helmet.meta }
          ${ helmet.link }
          ${ helmet.base }
          ${ helmet.title }
          ${ helmet.script }
          ${ helmet.style }
          ${ helmet.noscript }
          ${ sheet.getStyleTags() }
          <style id='jss-server-side'>
            ${ sheetsRegistry }
          </style>
        </head>
        <body>
          <main>${ reactBody }</main>
          <script>
            window.__STRUCTUR_STATE__ = ${ __DEV__ ? '{}' : structurState };
            window.__TRYSTERO_STATE__ = ${ __DEV__ ? '{}' : trysteroState };
            window.__WHOMST_STATE__ = ${ __DEV__ ? '{}' : whomstState };
            window.__REDUX_STATE__ = ${ __DEV__ ? '{}' : reduxState };
          </script>
          ${ scripts.map(b => `<script defer crossorigin='anonymous' src='${ path.join(clientStats.publicPath, b) }'></script>`).join('') }
        </body>
      </html>
    `

    ctx.set('ETag', etag(body))

    const links = scripts.map(b => `</${ b }>; rel=preload; as=script`).join(',')
    ctx.set('Link', links)

    ctx.status = context.statusCode || 200

    if (ctx.fresh) {
      ctx.status = 304
      return
    }

    ctx.set('Cache-Control', 'max-age=900')
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = body
  }
}

if (__DEV__) {
  module.exports = getServerRenderer
} else {
  const clientStats = require('./stats.json')

  const {
    PORT = 3000,
  } = process.env

  const app = new Koa()
  const router = new Router()

  router.all('/ping', async ctx => {
    ctx.status = 200
    ctx.body = 'pong'
  })

  router.get('/public/*', serve('.'))

  router.get('/*', getServerRenderer({ clientStats }))

  app.use(router.routes())

  app.listen(PORT)
}
