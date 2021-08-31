import React from 'react'
import { Router } from 'react-router-dom'
import TableActionButtons from '../../components/TableActionButtons'
import { render, screen, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'

const veiculoMock = [
  {
    id: 1,
    modelo: 'Sandero',
    ano: 2022,
    marca: { id: 2, nome: 'Renault' },
    valor: '80000',
  },
]

const history = createMemoryHistory()
describe('Componente de botões de ação da tabela', () => {
  it('Deve renderizar os botões de excluir e editar', async () => {
    render(
      <Router history={history}>
        <TableActionButtons row={veiculoMock[0]} onClickDelete={() => {}} onClickEdit={() => {}} />
      </Router>
    )

    const botaoDeletarVeiculo = await screen.findByTestId(`deleteButton${veiculoMock[0].id}`)
    const botaoEditarVeiculo = await screen.findByTestId(`editButton${veiculoMock[0].id}`)
    fireEvent.click(botaoDeletarVeiculo)
    fireEvent.click(botaoEditarVeiculo)
    expect(botaoDeletarVeiculo).toBeVisible()
    expect(botaoEditarVeiculo).toBeVisible()
  })
})
