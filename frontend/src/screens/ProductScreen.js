import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import { Loader } from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const { loading, product, error } = useSelector(state => state.productDetails)

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch, params])

  const addTocartHandler = (event) => {
    event.preventDefault();
    navigate(`/cart/${params.id}?qty=${qty}`)
  }
  return (
    <>
      <Link className='btn btn- my-3' to='/'>Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant='danger' > {error} </Message> : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem> <h3>{product.name}</h3></ListGroupItem>

              <ListGroupItem>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroupItem>

              <ListGroupItem>Price : ₹{product.price}</ListGroupItem>
              <ListGroupItem>Description : ₹{product.description}</ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>

                <ListGroupItem>
                  <Row>
                    <Col>Price : </Col>
                    <Col><strong>₹{product.price}</strong></Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Status </Col>
                    <Col> {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)} >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1} > {x + 1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <Button
                    className='btn-block'
                    onClick={addTocartHandler}
                    type='button'
                    disabled={product.countInStock === 0}>
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}

    </>
  )
}

export default ProductScreen