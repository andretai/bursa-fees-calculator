import React from 'react';
import { AppBar, Drawer, IconButton, ListItem, ListItemText, Toolbar } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import SideBar from './Menu';

const Header = () => {
  const [drawer, setDrawer] = React.useState(false);
  const toggleDrawer = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(!drawer);
  }
  return (
    <AppBar position="static" style={{ marginBottom: '15px' }}>
      <Toolbar>
        <IconButton onClick={() => setDrawer(!drawer)} color="inherit"><Menu /></IconButton>
        <Drawer anchor="left" open={drawer} onClose={toggleDrawer}>
          <SideBar toggle={toggleDrawer}/>
        </Drawer>
        <div style={{ flexGrow: 1 }}/>
        <ListItem>
          <ListItemText primary="Bursa P/L Calculator"/>
        </ListItem>
      </Toolbar>
    </AppBar>
  )
}


export default Header;