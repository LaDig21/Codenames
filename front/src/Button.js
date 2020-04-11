import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = ({ text, onClick }) => 
<div className="button" onClick = {()=>onClick()}>
    {text}
</div>

Button.propTypes = {
    text: PropTypes.string.isRequired,
  }

export default Button
