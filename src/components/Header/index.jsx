import React from 'react'

import { AppBar, Button, Toolbar, Typography, makeStyles } from '@material-ui/core'

import { Link } from 'react-router-dom'

import headerLinks from './links.json'

function Header() {
  const useStyles = makeStyles(() => ({
    headerStyle: {
      backgroundColor: '#400CCC',
      paddingRight: '79px',
      paddingLeft: '118px',
    },
    logoStyle: {
      fontFamily: 'Work Sans, sans-serif',
      fontWeight: 600,
      color: '#FFFEFE',
      textAlign: 'left',
    },
    menuButtonStyle: {
      fontFamily: 'Open Sans, sans-serif',
      fontWeight: 700,
      size: '18px',
      marginLeft: '38px',
    },
  }))

  const { headerStyle, logoStyle, menuButtonStyle } = useStyles()

  return (
    <header>
      <AppBar className={headerStyle}>
        <Toolbar>
          <Typography variant="h6" component="h1" className={logoStyle}>
            Carango Bom
          </Typography>
          {headerLinks.map(({ label, href }) => (
            <Button
              key={label}
              data-testid="navbar"
              color="inherit"
              to={href}
              component={Link}
              className={menuButtonStyle}
            >
              {label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
