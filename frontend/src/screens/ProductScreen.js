import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import { Loader } from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(state => state.productDetails)

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch, params])
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

              <ListGroupItem>Price : ${product.price}</ListGroupItem>
              <ListGroupItem>Description : ${product.description}</ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>

                <ListGroupItem>
                  <Row>
                    <Col>Price : </Col>
                    <Col><strong>${product.price}</strong></Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Status </Col>
                    <Col> {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} </Col>
                  </Row>
                </ListGroupItem>

                <ListGroup.Item>
                  <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}

    </>
  )
}

export default ProductScreen