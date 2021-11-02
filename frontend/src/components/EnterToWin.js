import React from 'react'
import { Button } from 'react-bootstrap'

const EnterToWin = ({ price, entries, promo, onClick }) => {
  return (
    <div
      style={{
        padding: '1rem',
        width: '164px',
        margin: '0 12px 32px',
        boxShadow: '2px 2px 4px rgb(26 26 26 / 10%)',
        backgroundColor: '#fff',
        position: 'relative',
      }}
    >
      {promo && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            top: '-1rem',
            width: '100%',
            left: '0',
          }}
        >
          <div
            style={{
              padding: '0.3rem 0.5rem',
              backgroundColor: '#ea2785',
              fontWeight: '600',
              fontSize: '0.8rem',
              width: '80%',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Most Popular
          </div>
        </div>
      )}

      <p
        style={{
          fontSize: '2rem',
          textAlign: 'center',
          fontWeight: '600',
          marginTop: '24px',
        }}
      >
        <span style={{ fontSize: '3rem' }}>{entries}</span>
        <br />
        <span>entries</span>
      </p>
      <Button
        className='btn-block'
        onClick={onClick}
        type='button'
        style={{
          backgroundColor: '#FE7F2D',
          borderColor: '#FE7F2D',
          fontWeight: '700',
        }}
      >
        DONATE ${price}
      </Button>
    </div>
  )
}

export default EnterToWin
