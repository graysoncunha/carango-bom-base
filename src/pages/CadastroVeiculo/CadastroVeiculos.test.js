import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CadastroVeiculo from './CadastroVeiculo'
import VeiculoService from '../../services/VeiculoService'
// import { Router } from 'react-router-dom'
// import { createMemoryHistory } from 'history'

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
// const history = createMemoryHistory()
describe('Componente de cadastro de veículos', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    VeiculoService.listar.mockResolvedValue(veiculoMock)
  })
  it('deve carregar a página de cadastro de veículo', () => {
    const { container } = render(<CadastroVeiculo />, { wrapper: MemoryRouter })

    expect(container.firstChild).toMatchSnapshot()
  })

  // it('deve carregar a página de alteração de veículo', async () => {
  //   render(
  //     <Router history={history}>
  //       <CadastroVeiculo />
  //     </Router>
  //   )

  //   const botaoDeletarVeiculo = await screen.findByTestId(`deleteButton${veiculoMock[0].id}`)
  //   fireEvent.click(botaoDeletarVeiculo)

  //   expect(screen.getByText('Alterar')).toBeInTheDocument()
  // })

  // TODO: Ver se a função submit foi chamada com o clique do botão
  //   it('quando o formulário é enviado, chama a função de cadastrar', () => {
  //     const funcaoRealizarTransacao = jest.fn()

  //     render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />)

  //     fireEvent.click(screen.getByText('Realizar operação'))

  //     expect(funcaoRealizarTransacao).toHaveBeenCalled()
  //   })
})
