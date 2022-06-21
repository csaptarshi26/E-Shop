import { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export const SearchBox = () => {

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <FormControl
        autoComplete='off'
        type="text"
        name="seacrh"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search product..."
        className="mr-sm-2"
      />
      <div className="search-icon">
        <i className="fas fa-search" onClick={submitHandler} />
      </div>
    </Form>
  )
}
