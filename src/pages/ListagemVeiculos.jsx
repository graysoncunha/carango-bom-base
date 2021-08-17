import { Button, Fab, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MarcaService from '../services/MarcaService';

const colunas = [
  { field: 'modelo', headerName: 'Marca', width: 200 },
  { field: 'ano', headerName: 'Ano', width: 200 },
  { field: 'valor', headerName: 'Valor', width: 200 }
];

const useStyles = makeStyles(() => ({
  fab: {
    position: 'absolute',
    bottom: '100px',
    right: '100px',
  },
  actionsToolbar: {
    float: 'right'
  },
  actions: {
    top: '10px',
    marginLeft: '10px',
  }
}));

function ListagemVeiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState();
  const classes = useStyles();
  const history = useHistory();


  useEffect(() => carregarVeiculos(), []);

  function carregarVeiculos() {
    MarcaService.listar()
      .then(dados => setVeiculos(dados));
  }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={veiculos} columns={colunas}
        onRowSelected={gridSelection => setVeiculoSelecionado(gridSelection.data)}
      />

      <div className={classes.actionsToolbar}>
        <Button
          className={classes.actions}
          variant="contained"
          color="secondary"
          disabled={!veiculoSelecionado}
          onClick={() => excluir()}>
          Excluir
        </Button>
        <Button
          className={classes.actions}
          variant="contained"
          color="primary"
          disabled={!veiculoSelecionado}
          onClick={() => alterar()}>
          Alterar
        </Button>
      </div>

      <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/cadastro-veiculo')}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export default ListagemVeiculos;
