import React from 'react'
import { Router } from 'react-router-dom'
import ListagemMarcas from './ListagemMarcas'
import MarcaService from '../../services/MarcaService'
import { render, screen, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'

const marcaMock = [
  {
    id: 1,
    nome: 'BMW',
  },
]

jest.mock('../../services/MarcaService')

const history = createMemoryHistory()
describe('Componente Listagem de Marcas', () => {
  describe('Com as requests sendo executadas corretamente', () => {
    beforeEach(async () => {
      jest.clearAllMocks()
      MarcaService.listar.mockResolvedValue(marcaMock)
    })
    it('Deve carregar o nome da marca na página', async () => {
      render(
        <Router history={history}>
          <ListagemMarcas />
        </Router>
      )
      const text = await screen.findByText(marcaMock[0].nome)
      expect(text).toBeInTheDocument()
    })
    it('Deve excluir a marca cadastrada', async () => {
      MarcaService.excluir.mockImplementation((x) => x === marcaMock[0].id && '200')
      render(
        <Router history={history}>
          <ListagemMarcas />
        </Router>
      )

      const botaoDeletarMarca = await screen.findByTestId(`deleteButton${marcaMock[0].id}`)
      fireEvent.click(botaoDeletarMarca)
      expect(await screen.findByText(marcaMock[0].nome)).not.toBeInTheDocument()
    })
    it('Deve ir para a página de cadastro de marca', async () => {
      render(
        <Router history={history}>
          <ListagemMarcas />
        </Router>
      )

      const botaoCadastro = await screen.findByLabelText('add')
      expect(botaoCadastro).toBeVisible()
      fireEvent.click(botaoCadastro)
      expect(history.location.pathname).toBe('/cadastro-marca')
    })
  })
  describe('Com as requests sendo rejeitadas', () => {
    it('Deve renderizar uma mensagem de erro ao tentar carregar a lista de marcas', async () => {
      MarcaService.listar.mockRejectedValue(new Error('Houve um erro ao carregar os itens'))
      render(
        <Router history={history}>
          <ListagemMarcas />
        </Router>
      )
      expect(await screen.findByText(/houve um erro ao carregar os itens/i)).toBeInTheDocument()
    })
    it('Deve renderizar uma mensagem de erro ao tentar excluir uma marca', async () => {
      MarcaService.listar.mockRejectedValue(new Error('Houve um erro ao excluir o item'))
      render(
        <Router history={history}>
          <ListagemMarcas />
        </Router>
      )
      expect(await screen.findByText(/houve um erro ao excluir o item/i)).toBeInTheDocument()
    })
  })
})
