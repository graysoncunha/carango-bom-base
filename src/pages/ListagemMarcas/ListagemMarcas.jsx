import React from 'react'
import MarcaService from '../../services/MarcaService'
import Table from '../../components/Table'

function ListagemMarcas() {
  const colunas = [{ field: 'nome', headerName: 'Marca', flex: 1 }]

  const formatarMarcas = (listaMarcas) => {
    return listaMarcas.map((marca) => ({
      id: marca.id,
      nome: marca.nome,
    }))
  }

  return <Table service={MarcaService} colunas={colunas} formatar={formatarMarcas} caminhoCadastro="/cadastro-marca" />
}

export default ListagemMarcas
