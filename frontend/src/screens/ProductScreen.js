import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Percentage from '../components/Percentage'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import EnterToWin from '../components/EnterToWin'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [countdown, setCountdown] = useState('')

  const dispatch = useDispatch()

  // Set the date we're counting down to
  var countDownDate = new Date('Dec 5, 2021 15:37:25').getTime()

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime()

    // Find the distance between now and the count down date
    var distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Display the result in the element with id="demo"
    setCountdown(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ')

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x)
      setCountdown('EXPIRED')
    }
  }, 1000)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}&entryId=dss`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
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
                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  Donation Goal: ${product.donationGoal}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col id='product-card' md={3}>
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
                    <Row>
                      <Col>Closes in:</Col>
                      <Col>{countdown}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Winner Annouced:</Col>
                    </Row>
                    <Row>
                      <Col></Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <a
                      href='#promo'
                      className='btn-block btn btn-primary'
                      type='button'
                    >
                      SPREAD THE JOY
                    </a>
                    {/* <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.donationNeedRemain === 0}
                    >
                      SPREAD THE JOY
                    </Button> */}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
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
                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  Donation Goal: ${product.donationGoal}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row
            className='py-4, pt-4'
            id='promo'
            style={{
              backgroundColor: 'rgba(97, 155, 138, 0.2)',
            }}
          >
            <Col
              md={{ span: 6, offset: 3 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <EnterToWin onClick={addToCartHandler} entries={20} price={10} />
              <EnterToWin
                onClick={addToCartHandler}
                entries={125}
                price={25}
                promo
              />
              <EnterToWin onClick={addToCartHandler} entries={500} price={50} />
              <EnterToWin
                onClick={addToCartHandler}
                entries={1200}
                price={100}
              />
              <EnterToWin
                onClick={addToCartHandler}
                entries={2000}
                price={150}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6} className='mt-4'>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                        className='mt-3'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
