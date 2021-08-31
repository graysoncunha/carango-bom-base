import React from 'react'
import Pagination from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'
import { useGridSlotComponentProps } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: 'rgba(109,70,228, 0.08)',
    },
  },
}))

function CustomPagination() {
  const classes = useStyles()
  const { state, apiRef } = useGridSlotComponentProps()

  return (
    <Pagination
      className={classes.root}
      variant="outlined"
      shape="rounded"
      page={state.pagination.page + 1}
      count={state.pagination.pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  )
}

export default CustomPagination
