import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Seed = ({ seed }) => 
<div className="seed">
    seed : {seed}
</div>

Seed.propTypes = {
    seed: PropTypes.string.isRequired,
  }

export default Seed
