import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    height: '400px',
    width: '100%',
    marginTop: '100px',
  },
  fab: {
    position: 'absolute',
    bottom: '100px',
    right: '100px',
    backgroundColor: '#6d47e4',
  },
  actionsToolbar: {
    float: 'right',
  },
  actions: {
    top: '10px',
    marginLeft: '10px',
  },
  alert: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  root: {
    border: 'none',
    color: 'rgba(0,0,0,.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#ece9e9',
      boxShadow: '0 8px 12px -8px #dedede',
      color: '#6d47e4',
      fontSize: '14px',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: '400',
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: 'none',
    },
    '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '& .MuiDataGrid-columnHeader--moving': {
      backgroundColor: 'transparent',
    },
    '& .MuiDataGrid-row, & .MuiDataGrid-columnsContainer': {
      borderRadius: '10px',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: 'rgb(0 0 0 / 3%)',
    },
  },
  iconButton: {
    color: 'rgb(0 0 0 / 25%)',
    padding: 5,
  },
}))

export default useStyles
