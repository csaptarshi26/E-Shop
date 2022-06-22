import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listProductDetails, updateProduct } from '../store/actions/productActions';
import { FormContainer } from '../components/FormContainer';
import { Loader } from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../store/constants/productConstants';
import axios from 'axios';

const ProductEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const productId = params.id;

  const { loading, error, product } = useSelector(state => state.productDetails)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = useSelector(state => state.productUpdate)

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        console.log(product)
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [product, dispatch, productId, navigate, successUpdate])
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock
    }))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false)
    }
  }
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoComplete='off'
                type='name'
                placeholder='Enter name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}>

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                autoComplete='off'
                placeholder='Enter Price'
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}>

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                autoComplete='off'
                placeholder='Enter Image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}>

              </Form.Control>
              <Form.Control type='file'
                label='Chose File'
                onChange={uploadFileHandler}>

              </Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                autoComplete='off'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}>

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='number'
                autoComplete='off'
                placeholder='Enter Count In Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}>

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                autoComplete='off'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}>

              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                autoComplete='off'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}>

              </Form.Control>
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