import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Percentage from '../components/Percentage'
import products from '../products'

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id === match.params.id)

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={4}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={5}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Percentage
                value={product.percentageDonation}
                text={`$${product.donationNeedRemain} to reach our goal`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Donote: ${product.donate}</ListGroup.Item>
            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
            <ListGroup.Item>
              Donation Goal: ${product.donationGoal}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Donate:</Col>
                  <Col>
                    <strong>${product.donate}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.donationNeedRemain > 0
                      ? `$${product.donationNeedRemain} to reach our goal`
                      : 'We have reached our goal!'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disable={product.donationNeedRemain === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
