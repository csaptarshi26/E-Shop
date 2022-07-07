import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { routeList } from './ProfileRoute';

const drawerWidth = 300;

export default function Sibebar({ window, userInfo }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar > Hi , {userInfo.name.split(" ")[0]}</Toolbar>
      <Divider />
      {routeList.map(({ text, link, icon }) => (
        <div key={text}>
          {!text && !link && !icon ? <Divider /> : (
          <ListItem  to={link} component={link && Link} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
          )}
        </div>
      ))}
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} >
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}
          sx={{ mr: 0, display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>

        <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}

          ModalProps={{ keepMounted: true, }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer variant="permanent"
          PaperProps={{ style: { position: "inherit"} }}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, paddingLeft: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }} >

        <Outlet></Outlet>

      </Box>
    </Box>
  );
}
