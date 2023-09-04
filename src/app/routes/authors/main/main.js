import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  Typography,
} from '@material-ui/core'
import {
  Pencil,
  Plus,
} from 'mdi-material-ui'
import React, { PureComponent } from 'react'
import _ from 'lodash/fp'
import { AbsoluteButton } from './styled-main'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { requiresAuth } from 'app/lib'

@requiresAuth
@connect(
  state => ({
    authors: state.authors.byID,
  }),
  {
    onCreateAuthor: actions.authors.createAuthor,
    onRequestAuthors: actions.authors.requestAuthors,
  },
)
class AuthorsMain extends PureComponent {
  UNSAFE_componentWillMount() {
    this.props.onRequestAuthors()
  }

  handleCreateAuthor() {
    this.props.onCreateAuthor()
  }

  renderAuthorCard(author) {
    return (
      <Card key={ author.uuid } style={{ margin: '1rem auto', width: '69.444%' }}>
        <CardContent>
          <Typography component='h2' variant='h5'>
            { author.name }
          </Typography>
          <Typography component='p' variant='body1'>
            { author.bio }
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button component={ Link } size='small' to={ `/authors/${ author.uuid }` }>
            <Icon style={{ marginRight: '0.5rem' }}>
              <Pencil />
            </Icon>
            Edit
          </Button>
        </CardActions>
      </Card>
    )
  }

  render() {
    const {
      authors,
    } = this.props

    return (
          <>
            <Helmet>
              <title>Authors</title>
            </Helmet>
            <AbsoluteButton color='secondary' variant='fab' onClick={ this.handleCreateAuthor }>
              <Plus />
            </AbsoluteButton>
            { _.map(this.renderAuthorCard, authors) }
          </>
    )
  }
}

export default AuthorsMain
