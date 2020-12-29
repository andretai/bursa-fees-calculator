import React from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Close, GitHub, Instagram } from '@material-ui/icons';

const Menu = (props) => {
  const { toggle } = props;
  const sendTo = url => {
    window.open(url, '_blank');
  }
  const count = document.cookie.split(';').length;
  return (
    <List style={{ padding: '0 15px' }}>
      <ListItem button onClick={toggle}>
        <ListItemIcon><Close color="secondary"/></ListItemIcon>
        <ListItemText primary="exit" secondary="or click outside"/>
      </ListItem>
      <ListItem button onClick={() => sendTo("https://www.instagram.com/andretaiwx/")}>
        <ListItemIcon><Instagram color="primary"/></ListItemIcon>
        <ListItemText primary="social" secondary="let's connect"/>
      </ListItem>
      <ListItem button onClick={() => sendTo("https://github.com/andretai/bursa-fees-calculator")}>
        <ListItemIcon><GitHub/></ListItemIcon>
        <ListItemText primary="source code" secondary="github"/>
      </ListItem>
      <Divider/>
      <Typography variant="subtitle2" style={{ textAlign: 'center', marginTop: '30px' }}>HI, VISITOR {count}!</Typography>
    </List>
  )
}

export default Menu
