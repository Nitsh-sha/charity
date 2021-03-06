import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [promoName, setPromoName] = useState('')
  const [image, setImage] = useState('')
  const [promoImage, setPromoImage] = useState('')
  const [charity, setCharity] = useState('')
  const [category, setCategory] = useState('')
  const [donationGoal, setDonationGoal] = useState(0)
  const [description, setDescription] = useState('')
  const [promoDescription, setPromoDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPromoName(product.promoName)
        setImage(product.image)
        setPromoImage(product.promoImage)
        setCharity(product.charity)
        setCategory(product.category)
        setDonationGoal(product.donationGoal)
        setDescription(product.description)
        setPromoDescription(product.promoDescription)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const uploadFilePromoHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setPromoImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        promoName,
        image,
        promoImage,
        charity,
        category,
        description,
        promoDescription,
        donationGoal,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='promoName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter prize name'
                value={promoName}
                onChange={(e) => setPromoName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='promoImage'>
              <Form.Label>Prize Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setPromoImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFilePromoHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='charity'>
              <Form.Label>Charity</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={charity}
                onChange={(e) => setCharity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='donationGoal'>
              <Form.Label>Donation Goal</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter donation goal'
                value={donationGoal}
                onChange={(e) => setDonationGoal(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='promoDescription'>
              <Form.Label>Prize Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter prize description'
                value={promoDescription}
                onChange={(e) => setPromoDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
