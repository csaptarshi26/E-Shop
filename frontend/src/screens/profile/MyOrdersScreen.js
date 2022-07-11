import { Avatar, Card, CardContent, CardHeader, Divider, Grid, ListItem, Button, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Image, Table } from 'react-bootstrap';
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
        orders && orders.map((order) => (
          <Card key={order._id} sx={{ marginTop: 1, marginBottom: 1, marginRight: 1, marginLeft: 1 }}>
            <div style={{ background: order.isPaid ? '#f2f2f2' : '#ff7c7c', padding: 16 }}>
              <Grid container style={{ fontSize: 14 }}>
                <Grid item sm={6} xs={6} md={3}>Order Placed : {order.createdAt.substring(0, 10)}  </Grid>
                <Grid item sm={6} xs={6} md={2}>Total : {order.totalPrice} </Grid>
                <Grid item sm={6} xs={6} md={3}>Delivery To :  {order.shippingAddress && order.shippingAddress.name}</Grid>
                {!order.isPaid && <Grid item md={2} />}
                <Grid item sm={6} xs={6} md={order.isPaid ? 4 : 2}>
                  {order.isPaid ? `Order # ${order._id}` : (
                    <Button fullWidth variant="contained" color='secondary'  >
                      Pay
                    </Button>
                  )}
                </Grid>
              </Grid>

            </div>
            <CardContent style={{ paddingTop: 3 }}>
              <Grid container>
                <Grid item md={9}>
                  {order.orderItems.map((orderItem, index) => (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={orderItem.name} src={orderItem.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={orderItem.name}
                          secondary={
                            <>
                              <Typography sx={{ display: 'inline' }} component="span" > Price : {' ' + orderItem.price} </Typography>
                              <Typography sx={{ display: 'block' }} component="span" > Qty : {' ' + orderItem.qty} </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {(index + 1) < order.orderItems.length && <Divider variant="inset" />}
                    </>
                  ))}


                </Grid>
                <Grid item md={1}></Grid>
                <Grid item md={2}>
                  {order.isPaid && (
                    <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 1 }}>
                      Track
                    </Button>
                  )}


                  <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 1 }}  >
                    Details
                  </Button>

                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </ProfileContainer>
  )
}
