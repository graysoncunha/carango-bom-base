import React, { useEffect, useState, useMemo } from 'react'
import { Fab } from '@material-ui/core'
import { useHistory } from 'react-router'
import Alert from '@material-ui/lab/Alert'
import { DataGrid } from '@material-ui/data-grid'
import AddIcon from '@material-ui/icons/Add'
import VeiculoService from '../../services/VeiculoService'
import CustomPagination from '../../components/CustomPagination'
import TableActionButtons from '../../components/TableActionButtons'

import { formatCurrency } from '../../utils'
import useStyles from './styles'

function ListagemVeiculos() {
  const [veiculos, setVeiculos] = useState([])
  const [{ status, error }, setStatus] = useState({ status: 'idle', error: null })
  const classes = useStyles()
  const history = useHistory()

  const onClickDelete = (row) => {
    try {
      setStatus({ status: 'loading' })
      VeiculoService.excluir(row.id)
      setVeiculos(veiculos.filter((veiculo) => veiculo.id !== row.id))
      setStatus({ status: 'fulfilled' })
    } catch (e) {
      setStatus({ status: 'rejected', error: e.message })
    }
  }

  const colunas = useMemo(() => {
    return [
      { field: 'modelo', headerName: 'Modelo', flex: 3 },
      { field: 'ano', headerName: 'Ano', flex: 2 },
      { field: 'marca', headerName: 'Marca', flex: 2 },
      { field: 'valor', headerName: 'Valor (R$)', flex: 2 },
      {
        field: '',
        sortable: false,
        flex: 1,
        renderCell: (params) => <TableActionButtons row={params.row} onClickDelete={onClickDelete} />,
      },
    ]
  }, [])

  useEffect(() => {
    carregarDadosVeiculo()
  }, [])

  const carregarDadosVeiculo = async () => {
    try {
      setStatus({ status: 'loading' })
      const listaVeiculos = await VeiculoService.listar()
      const listaVeiculosFormatada = formatarVeiculos(listaVeiculos)
      setVeiculos(listaVeiculosFormatada)
      setStatus({ status: 'fulfilled' })
    } catch (e) {
      setStatus({ status: 'rejected', error: e.message })
    }
  }

  const formatarVeiculos = (listaVeiculos) => {
    return listaVeiculos.map((veiculo) => ({
      id: veiculo.id,
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      marca: veiculo.marca.nome,
      valor: formatCurrency(veiculo.valor),
    }))
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {status === 'rejected' ? (
        <Alert severity="error" className={classes.alert}>
          {error}
        </Alert>
      ) : null}
      <DataGrid
        className={classes.root}
        rows={veiculos}
        columns={colunas}
        rowsPerPageOptions={[5]}
        pageSize={5}
        disableSelectionOnClick
        autoHeight
        components={{
          Pagination: CustomPagination,
        }}
      />

      <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/cadastro-veiculo')}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default ListagemVeiculos
