import React from 'react';
import { AppBar, IconButton, ListItem, ListItemText, Toolbar } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit"><Menu /></IconButton>
        <div style={{ flexGrow: 1 }}/>
        <ListItem>
          <ListItemText primary="Bursa Fees Calculator"/>
        </ListItem>
      </Toolbar>
    </AppBar>
  )
}


export default Header;