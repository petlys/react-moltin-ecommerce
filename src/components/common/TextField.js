import React from 'react'
import styled from 'styled-components'
import { colors, spacing, radiuses } from '../../styles'

const Container = styled.div`
  position: relative;
  margin-bottom: ${spacing.lg};
  width: 100%;
`

export const Input = styled.input`
  position: relative;
  background-color: ${props => (!props.valid && props.touched ? colors.LIGHT_RED : colors.TERTIARY_TEXT)};
  color: ${props => (!props.valid && props.touched ? colors.DARK_RED : colors.BLACK)};
  padding: ${spacing.sm};
  border-radius: ${radiuses.RADIUS_SMALL};
  border: none;
  transition: 200ms;
  width: 100%;
  opacity: 0.4;

  ::placeholder {
    color: ${props => (!props.valid && props.touched ? colors.DARK_RED : colors.BLACK)};
  }

  :focus {
    outline: 0;
    opacity: 0.6;
  }
`

const ErrorMessage = styled.p`
  margin: 0;
  color: ${colors.RED};
  text-align: left;
  font-size: 12px;
  position: absolute;
  left: 0;
  bottom: -15;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`

type Props = {
  onChange: Function,
  value?: string,
  valid: boolean,
  pattern?: string | RegExp,
  errorMsg?: string,
  children?: React$Element<any>,
  required?: boolean,
  style?: Object
}

type State = {
  touched: boolean
}

export class TextField extends React.Component<Props, State> {
  static defaultProps = {
    valid: true,
    onChange: () => {}
  }

  state = {
    touched: false
  }

  _onChange = evt => {
    const { onChange, pattern, required } = this.props
    if (pattern) {
      const rx = new RegExp(pattern)
      rx.exec(evt.target.value) ? onChange(evt.target.value, true) : onChange(evt.target.value, false)
      return
    }
    if (required && evt.target.value === '') {
      onChange(evt.target.value, false)
      return
    } else onChange(evt.target.value, true)
  }

  _onBlur = evt => {
    this.setState({ touched: true })
    this._onChange(evt)
  }

  render() {
    const { children, valid, style, errorMsg } = this.props
    const defaultMsg = this.props.required ? 'Dette feltet er obligatorisk' : 'Ugyldig verdi'

    return (
      <Container style={{ ...style }}>
        <Input
          {...this.props}
          onChange={this._onChange}
          onBlur={this._onBlur}
          valid={valid}
          touched={this.state.touched}
        />

        {children}

        {!this.props.valid && this.state.touched ? <ErrorMessage>{errorMsg || defaultMsg}</ErrorMessage> : null}
      </Container>
    )
  }
}

export default TextField
