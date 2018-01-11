import React from 'react'
import loadingGif from '../../images/gifs/loading.gif'

declare type SpinnerProps = {
  size?: 'small' | 'medium' | 'large',
  style?: Object
}

const sizes = {
  small: 50,
  medium: 100,
  large: 200
}

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

export const Spinner = (props: SpinnerProps) => (
  <img
    src={loadingGif}
    alt="spinner"
    width={props.size ? sizes[props.size] : sizes.small}
    style={{ ...props.style, ...styles }}
  />
)

export default Spinner
