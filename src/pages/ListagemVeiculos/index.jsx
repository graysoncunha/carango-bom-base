import { Button, Fab, makeStyles } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { DataGrid } from '@material-ui/data-grid'
import AddIcon from '@material-ui/icons/Add'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import VeiculoService from '../../services/VeiculoService'

import { formatCurrency } from '../../utils'

const colunas = [
  { field: 'modelo', headerName: 'Modelo', width: 300 },
  { field: 'ano', headerName: 'Ano', width: 200 },
  { field: 'marca', headerName: 'Marca', width: 200 },
  { field: 'valor', headerName: 'Valor (R$)', width: 200 },
]

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: '100px',
    right: '100px',
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
}))

function ListagemVeiculos() {
  const [veiculos, setVeiculos] = useState([])
  const [{ status, error }, setStatus] = useState({ status: 'idle', error: null })
  const [veiculoSelecionado, setVeiculoSelecionado] = useState()
  const classes = useStyles()
  const history = useHistory()

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
    <div style={{ height: '50%', width: '100%' }}>
      {status === 'rejected' ? (
        <Alert severity="error" className={classes.alert}>
          {error}
        </Alert>
      ) : null}
      <DataGrid
        rows={veiculos}
        columns={colunas}
        onRowSelected={(gridSelection) => setVeiculoSelecionado(gridSelection.data)}
        rowsPerPageOptions={[20]}
        pageSize={20}
      />

      <div className={classes.actionsToolbar}>
        <Button className={classes.actions} variant="contained" color="secondary" disabled={!veiculoSelecionado}>
          Excluir
        </Button>
        <Button className={classes.actions} variant="contained" color="primary" disabled={!veiculoSelecionado}>
          Alterar
        </Button>
      </div>

      <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/cadastro-veiculo')}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default ListagemVeiculos
