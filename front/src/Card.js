import React from 'react'
import PropTypes from 'prop-types'

import './Card.scss'

const Card = ({ card, feedback, index, onClick }) => (
    <div className={`card ${feedback}`} onClick={()=>onClick(index)}>
      <span className="symbol">
        {card}
      </span>
    </div>
  )
  Card.propTypes = {
    card: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
      'hidden',
      'visible',
      'red',
      'blue',
      'black',
      'white'
    ]).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }

export default Card
