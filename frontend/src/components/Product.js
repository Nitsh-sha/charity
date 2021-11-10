import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Percentage from './Percentage'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.promoImage} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.promoName}</strong> <br />({product.name})
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>{product.numReviews} reviews</div>
        </Card.Text>

        <Card.Text as='h3'>Donate from $10 and Win!</Card.Text>
        <Card.Text className='my-3' as='div'>
          <Percentage
            value={(product.donationNeedRemain / product.donationGoal) * 100}
            text={`$${
              product.donationGoal - product.donationNeedRemain
            } to reach our goal`}
          />
        </Card.Text>
        <Card.Text as='div'>Donation goal ${product.donationGoal}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
