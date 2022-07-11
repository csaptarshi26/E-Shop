import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Sibebar from './Sidebar'

import DashboardIcon from '@mui/icons-material/Dashboard'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import ContactsIcon from '@mui/icons-material/Contacts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const routeList = [
  {
    text: 'My Orders',
    link: '/myorders',
    icon: <ShoppingCartIcon />
  },
  { text: null, link: null, icon: null },
  {
    text: 'Profile',
    link: '/Profile',
    icon: <AccountCircleIcon />,
  },
  {
    text: 'Address',
    link: '/address',
    icon: <ContactsIcon />
  },

]
const ProfileRoute = () => {
  const { userInfo } = useSelector(state => state.userLogin)
  return userInfo ?
    <Sibebar userInfo={userInfo}>
      <Outlet />
    </Sibebar >
    :
    <Navigate to="/login" />
}

export default ProfileRoute