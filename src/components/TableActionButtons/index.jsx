import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'
import EditRoundedIcon from '@material-ui/icons/EditRounded'

const useStyles = makeStyles((theme) => ({
  iconButton: {
    color: 'rgb(0 0 0 / 25%)',
    padding: 5,
  },
}))
function TableActionButtons({ row, onClickDelete, onClickEdit }) {
  const classes = useStyles()

  return (
    <div>
      <IconButton
        aria-label="delete"
        className={classes.iconButton}
        onClick={() => onClickDelete(row)}
        data-testid={`deleteButton${row.id}`}
      >
        <DeleteOutlineRoundedIcon />
      </IconButton>
      <IconButton aria-label="edit" className={classes.iconButton} onClick={() => onClickEdit(row)}>
        <EditRoundedIcon />
      </IconButton>
    </div>
  )
}

export default TableActionButtons
