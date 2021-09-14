import React from 'react'
import PropTypes from 'prop-types'

const Percentage = ({ value, text, color }) => {
  return (
    <div className='percentage'>
      <span>
        <i
          style={{ color }}
          className={
            value >= 20
              ? 'fas fa-battery-full'
              : value >= 10
              ? 'fas fa-battery-half'
              : 'fas fa-battery-empty'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 40
              ? 'fas fa-battery-full'
              : value >= 30
              ? 'fas fa-battery-half'
              : 'fas fa-battery-empty'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 60
              ? 'fas fa-battery-full'
              : value >= 50
              ? 'fas fa-battery-half'
              : 'fas fa-battery-empty'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 80
              ? 'fas fa-battery-full'
              : value >= 70
              ? 'fas fa-battery-half'
              : 'fas fa-battery-empty'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 100
              ? 'fas fa-battery-full'
              : value >= 90
              ? 'fas fa-battery-half'
              : 'fas fa-battery-empty'
          }
        ></i>
      </span>
      <br />
      <span>{text && text}</span>
    </div>
  )
}

Percentage.defaultProps = {
  color: '#e69ac8',
}

Percentage.prototype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default Percentage
