import React from 'react'
import PropTypes from 'prop-types'

const Percentage = ({ value, text, color }) => {
  return (
    <div className='percentage'>
      <span>
        {value <= 25 ? (
          <>
            <i style={{ color }} className='fas fa-grin-beam'></i>
            <i style={{ color }} className='far fa-grin-beam'></i>
            <i style={{ color }} className='far fa-grin-beam'></i>
            <i style={{ color }} className='far fa-grin-beam'></i>
          </>
        ) : value <= 50 ? (
          <>
            <i style={{ color }} className='fas fa-grin-beam'></i>
            <i style={{ color }} className='fas fa-grin-beam'></i>
            <i style={{ color }} className='far fa-grin-beam'></i>
            <i style={{ color }} className='far fa-grin-beam'></i>
          </>
        ) : value < 100 ? (
          <>
            <i style={{ color }} className='fas fa-grin-beam'></i>
            <i style={{ color }} className='fas fa-grin-beam'></i>
            <i style={{ color }} className='fas fa-grin-beam'></i>
            <i style={{ color }} className='far fa-grin-beam'></i>
          </>
        ) : (
          <>
            <i style={{ color }} className='fas fa-grin-beam'></i>
            <i style={{ color }} className='fas fa-grin-beam'></i>
            <i style={{ color }} className='fas fa-grin-beam'></i>
            <i style={{ color }} className='fas fa-grin-beam'></i>
          </>
        )}
      </span>
      <br />
      <span>{text && text}</span>
    </div>
  )
}

Percentage.defaultProps = {
  color: '#FE7F2D',
}

Percentage.prototype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default Percentage
