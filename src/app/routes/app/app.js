import {
  Account,
  FileDocumentBox,
  Home,
  TagMultiple,
} from 'mdi-material-ui'
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core'
import {
  Logo,
  Site,
  Spacer,
} from './styled-app'
import React, { PureComponent } from 'react'
import {
  Route,
  Switch,
} from 'react-router'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { customUniversalRenderer } from 'app/lib'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'
import imageFaviconICO from 'images/favicon.ico'
import imageFaviconPNG from 'images/favicon-180x180.png'
import { push } from 'connected-react-router'
import Reset from 'app/styles/reset'
import universal from 'react-universal-component'

const Authors = universal(import('app/routes/authors'), { render: customUniversalRenderer })
const Login = universal(import('app/routes/login'), { render: customUniversalRenderer })
const Posts = universal(import('app/routes/posts'), { render: customUniversalRenderer })
const Tags = universal(import('app/routes/tags'), { render: customUniversalRenderer })

@hot(module)
@connect(
  state => {
    const { parent, value } = state.editor

    return {
      parent,
      value,
    }
  },
  {
    onFinishSubtreeEdit: actions.editor.finishSubtreeEdit,
    onPush: push,
  },
)
class App extends PureComponent {
  state = {
    drawer: false,
  }

  handleClose() {
    this.setState({ drawer: false })
  }

  handleDone() {
    const { onFinishSubtreeEdit, parent, value } = this.props
    onFinishSubtreeEdit({ child: value, parent })
  }

  handleNavigation(to) {
    this.setState({ drawer: false })
    this.props.onPush(to)
  }

  toggleDrawer() {
    this.setState({ drawer: !this.state.drawer })
  }

  render() {
    const { parent } = this.props
    const { drawer } = this.state

    const assetURL = `https://ass.ignota.${ process.env.NODE_ENV === 'production' ? 'cloud' : 'fyi' }`
    const apiURL = `https://api.ignota.${ process.env.NODE_ENV === 'production' ? 'cloud' : 'fyi' }`
    const uploadURL = `https://up.ignota.${ process.env.NODE_ENV === 'production' ? 'cloud' : 'fyi' }`

    return (
          <>
            <Reset />
            <Helmet defaultTitle='Structur | The Ignota Media Corporation' titleTemplate='%s | Structur'>
              <meta charSet='utf-8' />
              <meta content='width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no' name='viewport' />
              <meta content='IE=edge,chrome=1' httpEquiv='X-UA-Compatible' />
              <meta content='noindex' name='robots' />
              <link href={ assetURL } rel='dns-prefetch' />
              <link href={ assetURL } rel='preconnect' />
              <link href={ apiURL } rel='dns-prefetch' />
              <link href={ apiURL } rel='preconnect' />
              <link href={ uploadURL } rel='dns-prefetch' />
              <link href={ uploadURL } rel='preconnect' />
              <link
                rel='shortcut icon'
                type='image/x-icon'
                // A bug in Slack's unfurls will only recognize favicon links whose
                // attributes are sorted `rel`, `type`, `href`!
                // eslint-disable-next-line react/jsx-sort-props
                href={ imageFaviconICO } />
              <link href={ imageFaviconPNG } rel='apple-touch-icon' />
            </Helmet>
            <AppBar position='absolute'>
              <Toolbar>
                <IconButton color='inherit' onClick={ this.toggleDrawer }>
                  <Logo />
                </IconButton>
                <Spacer />
                { !!parent.node &&
                      <Button color='inherit' onClick={ this.handleDone }>
                          Done
                      </Button>
                }
              </Toolbar>
            </AppBar>
            <Site>
              <Drawer open={ drawer } onClose={ this.handleClose }>
                <List component='nav' style={{ width: 250 }}>
                  <ListItem button onClick={ () => this.handleNavigation('/') }>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText>
                      Home
                    </ListItemText>
                  </ListItem>
                  <ListItem button onClick={ () => this.handleNavigation('/posts') }>
                    <ListItemIcon>
                      <FileDocumentBox />
                    </ListItemIcon>
                    <ListItemText>
                      Posts
                    </ListItemText>
                  </ListItem>
                  <ListItem button onClick={ () => this.handleNavigation('/authors') }>
                    <ListItemIcon>
                      <Account />
                    </ListItemIcon>
                    <ListItemText>
                      Authors
                    </ListItemText>
                  </ListItem>
                  <ListItem button onClick={ () => this.handleNavigation('/tags') }>
                    <ListItemIcon>
                      <TagMultiple />
                    </ListItemIcon>
                    <ListItemText>
                      Tags
                    </ListItemText>
                  </ListItem>
                </List>
              </Drawer>
              <Switch>
                <Route component={ Login } path='/login' />
                <Route component={ Posts } path='/posts' />
                <Route component={ Authors } path='/authors' />
                <Route component={ Tags } path='/tags' />
              </Switch>
            </Site>
          </>
    )
  }
}

export default App
