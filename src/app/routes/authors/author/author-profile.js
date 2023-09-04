import {
  Button,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import _ from 'lodash/fp'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { ExpandMoreIcon } from 'mdi-react'
import R from 'ramda'

@connect(
  (state, props) => {
    const profile = R.propOr({}, props.uuid, state.profiles.byID)
    return {
      profile,
    }
  },
  {
    onDeleteProfile: actions.profiles.deleteAuthorProfile,
    onUpdateProfile: actions.profiles.updateProfile,
  },
)
class AuthorProfile extends PureComponent {
  static getDerivedStateFromProps(props, state) {
    const { profile } = props
    return {
      provider: state.provider ?? profile.provider ?? '',
      providerID: state.providerID ?? profile.providerID ?? '',
      url: state.url ?? profile.url ?? '',
    }
  }

  state = {
    provider: null,
    providerID: null,
    url: null,
  }

  handleDelete() {
    const { onDeleteProfile, profile } = this.props
    onDeleteProfile(profile.uuid)
  }

  handleFieldChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSave() {
    const {
      profile,
      onUpdateProfile,
    } = this.props
    const {
      provider,
      providerID,
      url,
    } = this.state

    const nextProfile = R.pipe(
      R.assoc('provider', provider),
      R.assoc('providerID', providerID),
      R.assoc('url', url),
    )(profile)

    onUpdateProfile(nextProfile)
  }

  render() {
    const {
      expanded,
      onChange,
      onDeleteProfile: _onDeleteProfile,
      onUpdateProfile: _onUpdateProfile,
      profile,
      uuid,
      ...props
    } = this.props
    const {
      provider,
      providerID,
      url,
    } = this.state

    return (
      <ExpansionPanel expanded={ expanded === uuid } onChange={ () => onChange(uuid) } { ...props }>
        <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }>
          <Typography style={{ flexBasis: '33.333%', flexShrink: 0 }} variant='h6'>
            { profile.provider ? _.capitalize(profile.provider) : 'New Profile' }
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>
              Provider
            </FormLabel>
            <RadioGroup
              name='provider'
              value={ provider }
              onChange={ this.handleFieldChange }>
              <FormControlLabel control={ <Radio /> } label='Email' value='email' />
              <FormControlLabel control={ <Radio /> } label='Facebook' value='facebook' />
              <FormControlLabel control={ <Radio /> } label='Portfolio' value='portfolio' />
              <FormControlLabel control={ <Radio /> } label='Twitter' value='twitter' />
            </RadioGroup>
          </FormControl>
          <div style={{ alignItems: 'stretch', display: 'flex', flexBasis: '75%', flexDirection: 'column', justifyContent: 'center', marginLeft: '1rem' }}>
            <TextField
              inputProps={{ name: 'providerID' }}
              label='Provider ID'
              value={ providerID }
              onChange={ this.handleFieldChange } />
            <TextField
              inputProps={{ name: 'url' }}
              label='URL'
              value={ url }
              onChange={ this.handleFieldChange } />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size='small' onClick={ this.handleDelete }>
                      Delete
          </Button>
          <Button color='primary' size='small' onClick={ this.handleSave }>
                      Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    )
  }
}

export default AuthorProfile
