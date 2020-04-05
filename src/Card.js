import React from 'react'
import PropTypes from 'prop-types'

import './Card.scss'

const Card = ({ card, feedback, index,team, onClick }) => (
    <div className={`card ${feedback}`} onClick={()=>onClick(index,team)}>
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
      'redTeam',
      'blueTeam',
      'blackTeam',
      'whiteTeam'
    ]).isRequired,
    index: PropTypes.number.isRequired,
    team: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

export default Card
