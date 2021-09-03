import React from 'react'
import { Router } from 'react-router-dom'
import ListagemVeiculos from './ListagemVeiculos'
import VeiculoService from '../../services/VeiculoService'
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

jest.mock('../../services/VeiculoService')

const history = createMemoryHistory()
describe('Componente Listagem de Veículos', () => {
  describe('Com as requests sendo executadas corretamente', () => {
    beforeEach(async () => {
      jest.clearAllMocks()
      VeiculoService.listar.mockResolvedValue(veiculoMock)
    })
    it('Deve carregar o nome do veículo na página', async () => {
      render(
        <Router history={history}>
          <ListagemVeiculos />
        </Router>
      )
      const text = await screen.findByText(veiculoMock[0].modelo)
      expect(text).toBeInTheDocument()
    })
    it('Deve carregar o nome da marca', async () => {
      render(
        <Router history={history}>
          <ListagemVeiculos />
        </Router>
      )
      const text = await screen.findByText(veiculoMock[0].marca.nome)
      expect(text).toBeInTheDocument()
    })
    it('Deve excluir veículo cadastrado', async () => {
      VeiculoService.excluir.mockImplementation((x) => x === veiculoMock[0].id && '200')
      render(
        <Router history={history}>
          <ListagemVeiculos />
        </Router>
      )

      const botaoDeletarVeiculo = await screen.findByTestId(`deleteButton${veiculoMock[0].id}`)
      fireEvent.click(botaoDeletarVeiculo)
      expect(await screen.findByText(veiculoMock[0].modelo)).not.toBeInTheDocument()
    })
    it('Deve ir para a página de cadastro de veículo', async () => {
      render(
        <Router history={history}>
          <ListagemVeiculos />
        </Router>
      )

      const botaoCadastro = await screen.findByLabelText('add')
      expect(botaoCadastro).toBeVisible()
      fireEvent.click(botaoCadastro)
      expect(history.location.pathname).toBe('/cadastro-veiculo')
    })
  })
  describe('Com as requests sendo rejeitadas', () => {
    it('Deve renderizar uma mensagem de erro ao tentar carregar a lista de veículos', async () => {
      VeiculoService.listar.mockRejectedValue(new Error('Houve um erro ao carregar os itens'))
      render(
        <Router history={history}>
          <ListagemVeiculos />
        </Router>
      )
      expect(await screen.findByText(/houve um erro ao carregar os itens/i)).toBeInTheDocument()
    })
    it('Deve renderizar uma mensagem de erro ao tentar excluir um veículo', async () => {
      VeiculoService.listar.mockRejectedValue(new Error('Houve um erro ao excluir o item'))
      render(
        <Router history={history}>
          <ListagemVeiculos />
        </Router>
      )
      expect(await screen.findByText(/houve um erro ao excluir o item/i)).toBeInTheDocument()
    })
  })
})
