import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import Message from '../components/Message'
import Img from '../components/Img'
import Meta from '../components/Meta'
import { createProductReview, listProductDetails } from '../store/actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../store/constants/productConstants'
import ImageGallery from 'react-image-gallery';
import Rating from '../components/Rating'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { InputField } from '../components/form/InputField'
import { setSignUpModalStatus } from '../store/actions/appActions'


const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [images, setImages] = useState([]);

  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewTab, setReviewTab] = React.useState('userReviews');

  const changeReviewTabHandler = (event, newValue) => {
    setReviewTab(newValue);
  };



  const { loading, product, error } = useSelector(state => state.productDetails)
  const { userInfo } = useSelector(state => state.userLogin);
  const {
    error: errorProductReview,
    success: successProductReview
  } = useSelector(state => state.productReviewCreate)

  useEffect(() => {
    if (product) {
      let obj = [{
        original: product.image,
        thumbnail: product.image
      }]
      setImages(obj);
    }
  }, [product])

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted');
      setRating(0);
      setComment('');

      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(params.id))

  }, [dispatch, params, errorProductReview, successProductReview])

  const addTocartHandler = (event) => {
    event.preventDefault();
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(params.id, {
      rating,
      comment
    }))
  }

  const Reviews = () => {
    return (
      <div>
        <Typography variant='h5' sx={{ m: 2 }}>Reviews</Typography>
        <Divider variant="fullWidth" />

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={reviewTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={changeReviewTabHandler} aria-label="lab API tabs example">
                <Tab label="User Reviews" value="userReviews" />
                <Tab label="Write a Review" value="writeAReview" />
              </TabList>
            </Box>
            <TabPanel value="userReviews">
              {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

              {product.reviews.map(review => (
                <Card key={review._id}>
                  <CardContent>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </TabPanel>
            <TabPanel value="writeAReview">


              <h2>Write a Customer Review</h2>
              {errorProductReview && <Message variant='info'>{errorProductReview}</Message>}
              {userInfo ? (
                <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>

                  {/* <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group> */}

                  <InputField type={"text"} value={comment} onChange={setComment} label={"Comment"} multiline rows={3} autoFocus />



                  <Button type='submit' variant="outlined">
                    Submit
                  </Button>
                </Box>
              ) : (
                <Message variant='info'>
                  Please <u onClick={() => dispatch(setSignUpModalStatus(true))}> sign in  </u> to write a review
                </Message>
              )}


            </TabPanel>

          </TabContext>
        </Box>



      </div>
    )
  }


  return (
    <>
      {loading ? <Loader /> : error ? <Message > {error} </Message> : (
        <>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <ImageGallery items={images} showPlayButton={false} />
            </Grid>
            <Grid item md={6} >
              <Card style={{ height: '100%' }}>
                <CardContent>
                  <Typography variant='h5'>  {product.name}</Typography>

                  <Divider variant="fullWidth" />
                  <Grid container sx={{ m: 2 }} spacing={2}>
                    <Grid item md={12}>
                      <Typography variant='span' sx={{ fontSize: 24, color: '#00b852' }} style={{ marginRight: '10px' }}>
                        <strong>₹{product.price}</strong>
                      </Typography>
                      <Typography variant='span' sx={{ fontSize: 14 }} > <s>₹{product.price}</s></Typography><br />
                      <Typography variant='span' sx={{ fontSize: 10 }} color="text.secondary" > * Including all tax </Typography>
                    </Grid>

                    <Grid item md={12}>
                      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </Grid>

                    <Grid item md={6}>
                      <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button variant='contained' onClick={() => setQty(qty + 1)} disabled={qty === product.countInStock || qty === 10}>+</Button>
                        <Button disabled>{qty}</Button>
                        <Button variant='contained' onClick={() => setQty(qty - 1)} disabled={qty === 1} >-</Button>
                      </ButtonGroup>
                    </Grid>

                    <Grid item md={6}>
                      <Button
                        className='btn-block'
                        onClick={addTocartHandler}
                        type='button'
                        variant="outlined"

                        disabled={product.countInStock === 0}>
                        Add To Cart
                      </Button>
                    </Grid>

                  </Grid>

                  <Typography sx={{ m: 2 }} variant='body2' color="text.secondary">{product.description}</Typography>

                  <Reviews />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Meta title={product.name} />

        </>
      )
      }

    </>
  )
}

export default ProductScreen