import {
  Column,
  Drafting,
  Pending,
  Previewing,
  Published,
  Root,
  Status,
  Title,
} from './styled-visibility-panel'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import _ from 'lodash'
import { ChevronDown } from 'mdi-material-ui'

const STATUS_COMPONENTS = {
  drafting: Drafting,
  pending: Pending,
  previewing: Previewing,
  published: Published,
}

class VisibilityPanel extends PureComponent {
  static defaultProps = {
    status: 'drafting',
  }

  render() {
    const {
      children,
      status,
      ...props
    } = this.props

    const StatusComponent = STATUS_COMPONENTS[status]

    return (
      <Root { ...props }>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={ <ChevronDown /> }>
            <Column>
              <Title variant='subtitle1'>
                Visibility
              </Title>
            </Column>
            <Status variant='subtitle2'>
              Status:
              &nbsp;
              <StatusComponent>
                { _.capitalize(status) }
              </StatusComponent>
            </Status>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            { children }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Root>
    )
  }
}

export default VisibilityPanel
