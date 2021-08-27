import React from 'react'
import { Container, CssBaseline, makeStyles } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import { ptBR } from '@material-ui/core/locale'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import './App.css'

import Routes from './routes'

const muiTheme = createTheme(
  {
    palette: {
      primary: {
        main: blue[900],
      },
    },
  },
  ptBR
)

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  page: {
    height: '90vh',
  },
}))

function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container component="article" maxWidth="md">
            <Routes />
          </Container>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
