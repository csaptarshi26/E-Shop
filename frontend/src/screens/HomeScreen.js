import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../store/actions/productActions'
import { Loader } from '../components/Loader'
import Message from '../components/Message'
import { Product } from '../components/Product'
import { Link, useParams } from 'react-router-dom';
import { Paginate } from '../components/Paginate'
import { ProductCarousel } from '../components/ProductCarousel'
import Meta from '../components/Meta'
const HomeScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const { loading, products, error, page, pages } = useSelector(state => state.productList)

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber])
  return (
    <>
    <Meta />
    {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link> }
      <h1>Latest Products</h1>
      {loading ?
        <Loader />
        : error ? <Message variant='danger'> {error} </Message>
          : (
            <>
              <Row>
                {products.map(product => (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} />
                  </Col>
                ))}

              </Row>
              <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} ></Paginate>
            </>
          )}
    </>
  )
}

export default HomeScreen