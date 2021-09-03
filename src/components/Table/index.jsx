import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Fab } from '@material-ui/core'
import { useHistory } from 'react-router'
import Alert from '@material-ui/lab/Alert'
import { DataGrid } from '@material-ui/data-grid'
import AddIcon from '@material-ui/icons/Add'
import CustomPagination from '../../components/CustomPagination'
import TableActionButtons from '../../components/TableActionButtons'

import useStyles from './useStyles'

function Table({ service, colunas, formatar, caminhoCadastro, caminhoAlteracao }) {
  const [itens, setItens] = useState([])
  const [{ status, error }, setStatus] = useState({ status: 'idle', error: null })
  const classes = useStyles()
  const history = useHistory()

  const onClickDelete = async (row) => {
    try {
      setStatus({ status: 'loading' })
      await service.excluir(row.id)
      setItens((prevState) =>
        prevState.filter((item) => {
          return item.id !== row.id
        })
      )
      setStatus({ status: 'fulfilled' })
    } catch (e) {
      setStatus({ status: 'rejected', error: e.message })
    }
  }

  const onClickEdit = (row) => {
    history.push(`${caminhoAlteracao}/${row.id}`)
  }

  const colunasMemo = useMemo(() => {
    return [
      ...colunas,
      {
        field: '',
        sortable: false,
        renderCell: (params) => (
          <TableActionButtons row={params.row} onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
        ),
      },
    ]
  }, [colunas])

  useEffect(() => {
    const carregarDados = async () => {
      let listaItens
      try {
        setStatus({ status: 'loading' })
        listaItens = await service.listar()
        const listaItensFormatada = formatar(listaItens)
        setItens(listaItensFormatada)
        setStatus({ status: 'fulfilled' })
      } catch (e) {
        setStatus({ status: 'rejected', error: e.message })
      }
    }
    carregarDados()
  }, [])

  return (
    <div className={classes.pageContainer}>
      {status === 'rejected' ? (
        <Alert severity="error" className={classes.alert}>
          {error}
        </Alert>
      ) : null}
      <DataGrid
        className={classes.root}
        rows={itens}
        columns={colunasMemo}
        rowsPerPageOptions={[5]}
        pageSize={5}
        disableSelectionOnClick
        autoHeight
        columnBuffer={5}
        components={{
          Pagination: CustomPagination,
        }}
      />

      <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push(caminhoCadastro)}>
        <AddIcon />
      </Fab>
    </div>
  )
}

Table.propTypes = {
  service: PropTypes.object.isRequired,
  colunas: PropTypes.array.isRequired,
  formatar: PropTypes.func.isRequired,
  caminhoCadastro: PropTypes.string.isRequired,
  caminhoAlteracao: PropTypes.string.isRequired,
}
export default Table
