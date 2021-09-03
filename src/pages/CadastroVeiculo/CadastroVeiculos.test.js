import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ListagemVeiculos from '../ListagemVeiculos/ListagemVeiculos'
import VeiculoService from '../../services/VeiculoService'
import CadastroVeiculo from './CadastroVeiculo'
import { Router } from 'react-router-dom'
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
describe('Componente de cadastro de veículos', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    VeiculoService.listar.mockResolvedValue(veiculoMock)
  })
  it('deve carregar a página de cadastro de veículo', () => {
    const { container } = render(<CadastroVeiculo />, { wrapper: MemoryRouter })

    expect(container.firstChild).toMatchSnapshot()
  })

  it('deve carregar a página de alteração de veículo', async () => {
    render(
      <Router history={history}>
        <ListagemVeiculos />
      </Router>
    )

    const botaoEditarVeiculo = await screen.findByTestId(`editButton${veiculoMock[0].id}`)
    fireEvent.click(botaoEditarVeiculo)
    expect(history.location.pathname).toBe(`/alteracao-veiculo/${veiculoMock[0].id}`)
  })

  it('quando o formulário é enviado, os campso devem ser validados', () => {
    render(<CadastroVeiculo />, { wrapper: MemoryRouter })

    fireEvent.click(screen.getByText('Cadastrar'))

    waitFor(() => expect(screen.getByText('Marca é obrigatória.')).toBeInTheDocument())
    waitFor(() => expect(screen.getByText('Modelo deve ter ao menos 2 caracteres.')).toBeInTheDocument())
    waitFor(() => expect(screen.getByText('Ano deve ter ao menos 4 caracteres.')).toBeInTheDocument())
    waitFor(() => expect(screen.getByText('Valor é obrigatório.')).toBeInTheDocument())
  })

  // it('o formulário deve ser enviado quando os campos forem válidos', () => {
  //   render(<CadastroVeiculo />, { wrapper: MemoryRouter })

  //   console.log(screen.getByRole('input'))

  //   fireEvent.click(screen.getByText('Cadastrar'))

  //   waitFor(() => expect(screen.getByText('Marca é obrigatória.')).toBeInTheDocument())
  //   waitFor(() => expect(screen.getByText('Modelo deve ter ao menos 2 caracteres.')).toBeInTheDocument())
  //   waitFor(() => expect(screen.getByText('Ano deve ter ao menos 4 caracteres.')).toBeInTheDocument())
  //   waitFor(() => expect(screen.getByText('Valor é obrigatório.')).toBeInTheDocument())
  // })
})
