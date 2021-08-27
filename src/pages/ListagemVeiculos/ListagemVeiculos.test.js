import React from 'react'
import { Router, MemoryRouter } from 'react-router-dom'
import ListagemVeiculos from './index'
import VeiculoService from '../../services/VeiculoService'
import Routes from '../../routes'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
    // it('Deve carregar o nome do veículo na página', async () => {
    //   render(
    //     <Router history={history}>
    //       <ListagemVeiculos />
    //     </Router>
    //   )
    //   const text = await screen.findByText(veiculoMock[0].modelo)
    //   expect(text).toBeInTheDocument()
    // })
    // it('Deve carregar o nome da marca', async () => {
    //   render(
    //     <Router history={history}>
    //       <ListagemVeiculos />
    //     </Router>
    //   )
    //   const text = await screen.findByText(veiculoMock[0].marca.nome)
    //   expect(text).toBeInTheDocument()
    // })
    it('Deve excluir veículo cadastrado', async () => {
      VeiculoService.excluir.mockResolvedValue()
      render(
        <Routes>
          <ListagemVeiculos />
        </Routes>
      )

      waitFor(async () => {
        const botaoDeletarVeiculo = screen.getByDisplayValue('Excluir')
        console.log(botaoDeletarVeiculo)
        fireEvent.click(botaoDeletarVeiculo)
        console.log(await screen.findByText(veiculoMock[0].modelo))
        expect(screen.findByText(veiculoMock[0].modelo)).not.toBeInTheDocument()
      })
      // await waitForElementToBeRemoved(() => screen.getByText(veiculoMock[0].modelo))
    })
  })
  // describe('Com as requests sendo rejeitadas', () => {
  //   it('Deve renderizar uma mensagem de erro ao tentar carregar a lista de veículos', async () => {
  //     VeiculoService.listar.mockRejectedValue(new Error('Houve um erro ao carregar os itens'))
  //     render(
  //       <Router history={history}>
  //         <ListagemVeiculos />
  //       </Router>
  //     )
  //     expect(await screen.findByText(/houve um erro ao carregar os itens/i)).toBeInTheDocument()
  //   })
  // })
})
