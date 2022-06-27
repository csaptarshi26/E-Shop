import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import Message from '../../components/Message';
import { listMyOrders } from '../../store/actions/orderActions';
import { ProfileContainer } from './ProfileContainer';

export const MyOrdersScreen = () => {
  const dispatch = useDispatch();

  const { loading: loadingOrders, error: errorOrders, orders } = useSelector(state => state.orderListMy)

  useEffect(() => {
    dispatch(listMyOrders())
  }, [dispatch])

  return (
    <ProfileContainer>
      <h2>My Orders</h2>
      {loadingOrders ? <Loader /> : errorOrders ? <Message >{errorOrders} </Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id} </td>
                <td>{order.createdAt.substring(0, 10)} </td>
                <td>{order.totalPrice} </td>
                <td>
                  {order.isPaid ? order.paidAt.substring(0, 10) : (
                    <i className="fas fa-times" style={{ color: 'red' }} ></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                    <i className="fas fa-times" style={{ color: 'red' }} ></i>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </ProfileContainer>
  )
}
