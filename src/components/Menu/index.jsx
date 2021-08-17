import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';

import menuItems from './menu.json';

import { Link } from 'react-router-dom';

function MenuVertical() {

  return (
    <Menu
      id="simple-menu"
      keepMounted
      open={true}
    >
      {
        menuItems.map(menuItem => <MenuItem onClick={<Link to={`${menuItem.link}`} />}>{menuItem.nome}</MenuItem>)
      }
    </Menu>
  )
}

export default MenuVertical;
