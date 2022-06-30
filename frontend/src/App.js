
import { Container } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import CartScreen from './screens/cart/CartScreen';
import HomeScreen from "./screens/HomeScreen";
import { OrderListScreen } from './screens/OrderListScreen';
import { OrderScreen } from './screens/cart/OrderScreen';
import { PaymentScreen } from './screens/cart/PaymentScreen';
import { PlaceOrderScreen } from './screens/cart/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import { ProductListScreen } from './screens/ProductListScreen';
import ProductScreen from "./screens/ProductScreen";
import { MyOrdersScreen } from './screens/profile/MyOrdersScreen';
import ProfileRoute from './screens/profile/ProfileRoute';
import { MyProfileScreen } from './screens/profile/MyProfileScreen';
import { ShippingScreen } from './screens/cart/ShippingScreen';
import UserEditScreen from './screens/UserEditScreen';
import { UserListScreen } from './screens/UserListScreen';
import { MyAddressScreen } from "./screens/profile/MyAddressScreen";


function App() {
  return (
    <Router>
      <Header />
      <main >
        <Container maxWidth={false} sx={{ paddingTop: 1 }} style={{ background: '#f1f3f6' }}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />

            <Route path='/profile' element={<ProfileRoute />} >
              <Route path="/profile" element={<MyProfileScreen />} />
            </Route>
            <Route path='/myorders' element={<ProfileRoute />} >
              <Route path='/myorders' element={<MyOrdersScreen />} />
            </Route>
            <Route path='/address' element={<ProfileRoute />} >
              <Route path='/address' element={<MyAddressScreen />} />
            </Route>


            <Route path='/product/:id' element={<ProductScreen />} />

            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />

            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

            <Route path='/admin/productlist' element={<ProductListScreen />} />
            <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />

            <Route path='/admin/orderlist' element={<OrderListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
