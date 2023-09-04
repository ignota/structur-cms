import {
  colors,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import { hydrate, render } from 'react-dom'
import { configureStore } from 'app/flux'
import { ConnectedRouter } from 'connected-react-router'
import { DragDropContextProvider } from 'react-dnd'
import { history } from 'app/lib'
import HTML5Backend from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import React from 'react'
import { Route } from 'react-router'
import { theme } from 'app/styles'
import { ThemeProvider } from 'styled-components'

const renderer = __DEV__
  ? render
  : hydrate

const main = document.querySelector('main') || do {
  const el = document.createElement('main')
  const body = document.querySelector('body')
  body.appendChild(el)
}

const { store } = configureStore()

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

const renderComponent = Component =>
  renderer(
    <Provider store={ store }>
      <MuiThemeProvider theme={ muiTheme }>
        <ThemeProvider theme={ theme }>
          <DragDropContextProvider backend={ HTML5Backend }>
            <ConnectedRouter history={ history }>
              <Route>
                { props => <Component { ...props } /> }
              </Route>
            </ConnectedRouter>
          </DragDropContextProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </Provider>,
    main,
  )

;(() => {
  const { App } = require('app/routes')
  renderComponent(App)
})()

if (module.hot) {
  module.hot.accept(['app/editor', 'app/flux', 'app/lib', 'app/routes', 'app/styles'], () => {
    const { App } = require('app/routes')
    renderComponent(App)
  })
}
