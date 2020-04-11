import React from 'react'
import PropTypes from 'prop-types'

import './ScoreCount.scss'

const ScoreCount = ({ scoreBlue, scoreRed,scoreTotal, turn }) => 
<div className="score">
  <div className="scorerow">
    <span className='scorelabeltitle'>Cards to be found :</span>
    <span className={`scorelabelblue${turn}`}>{scoreBlue}</span>
    <span className={`scorelabelred${turn}`}>{scoreRed}</span>
  </div>
  <div className='scorerow'>
    <span className='scorelabeltitle'>Total Score : </span>
    <span className='scorelabelbluered'>{scoreTotal[0]}</span>
    <span className='scorelabelredblue'>{scoreTotal[1]}</span>
  </div>
  </div>

ScoreCount.propTypes = {
    scoreBlue: PropTypes.number.isRequired,
    scoreRed: PropTypes.number.isRequired,
    turn: PropTypes.string.isRequired,
  }

export default ScoreCount
