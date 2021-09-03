import React from 'react'
import VeiculoService from '../../services/VeiculoService'
import Table from '../../components/Table'

import { formatCurrency } from '../../utils'

function ListagemVeiculos() {
  const colunas = [
    { field: 'modelo', headerName: 'Modelo', flex: 3 },
    { field: 'ano', headerName: 'Ano', flex: 2 },
    { field: 'marca', headerName: 'Marca', flex: 2 },
    { field: 'valor', headerName: 'Valor (R$)', flex: 2 },
  ]

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
    <Table service={VeiculoService} colunas={colunas} formatar={formatarVeiculos} caminhoCadastro="/cadastro-veiculo" />
  )
}

export default ListagemVeiculos
