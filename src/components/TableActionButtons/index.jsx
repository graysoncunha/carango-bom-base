import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip, IconButton, makeStyles } from '@material-ui/core'
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
      <Tooltip title="Excluir">
        <IconButton
          aria-label="delete"
          className={classes.iconButton}
          onClick={() => onClickDelete(row)}
          data-testid={`deleteButton${row.id}`}
        >
          <DeleteOutlineRoundedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton
          aria-label="edit"
          data-testid={`editButton${row.id}`}
          className={classes.iconButton}
          onClick={() => onClickEdit(row)}
        >
          <EditRoundedIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

TableActionButtons.propTypes = {
  row: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func,
  onClickEdit: PropTypes.func,
}

export default TableActionButtons
