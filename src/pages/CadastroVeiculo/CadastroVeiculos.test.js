import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom'
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

const renderWithRouter = (ui, { route = '/', path = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return {
    ...render(
      <BrowserRouter>
        <Route path={path} component={ui} />
      </BrowserRouter>
    ),
  }
}

describe('Componente de cadastro de veículos', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    VeiculoService.listar.mockResolvedValue(veiculoMock)
  })
  it('deve carregar a página de cadastro de veículo', () => {
    const { container } = render(<CadastroVeiculo />, { wrapper: MemoryRouter })

    expect(container.firstChild).toMatchSnapshot()
  })

  it('deve carregar a página de cadastro de veículo', async () => {
    render(
      <Router history={history}>
        <CadastroVeiculo />
      </Router>
    )

    const botaoCadastrar = await screen.findByText('Cadastrar')
    expect(botaoCadastrar).toBeInTheDocument()
  })

  it('deve carregar a página de alteração de veículo', async () => {
    VeiculoService.consultar.mockResolvedValue(veiculoMock[0])
    renderWithRouter(CadastroVeiculo, {
      route: `/alteracao-veiculo/${veiculoMock[0].id}`,
      path: '/alteracao-veiculo/:id',
    })
    const botaoAlterar = await screen.findByText('Alterar')
    expect(botaoAlterar).toBeInTheDocument()
  })

  it('deve clicar no cancelar da página de alteração de veículo', async () => {
    VeiculoService.consultar.mockResolvedValue(veiculoMock[0])
    renderWithRouter(CadastroVeiculo, {
      route: `/alteracao-veiculo/${veiculoMock[0].id}`,
      path: '/alteracao-veiculo/:id',
    })
    const botaoCancelar = await screen.findByText('Cancelar')
    expect(botaoCancelar).toBeInTheDocument()
    fireEvent.click(botaoCancelar)
    expect(history.location.pathname).toBe('/')
  })

  it('quando o formulário é enviado, os campso devem ser validados', () => {
    render(<CadastroVeiculo />, { wrapper: MemoryRouter })

    fireEvent.click(screen.getByText('Cadastrar'))

    waitFor(() => expect(screen.getByText('Marca é obrigatória.')).toBeInTheDocument())
    waitFor(() => expect(screen.getByText('Modelo deve ter ao menos 2 caracteres.')).toBeInTheDocument())
    waitFor(() => expect(screen.getByText('Ano deve ter ao menos 4 caracteres.')).toBeInTheDocument())
    waitFor(() => expect(screen.getByText('Valor é obrigatório.')).toBeInTheDocument())
  })

  it('deve alterar os campos do formulário', async () => {
    VeiculoService.consultar.mockResolvedValue(veiculoMock[0])
    renderWithRouter(CadastroVeiculo, { route: `/alteracao-marca/${veiculoMock[0].id}`, path: '/alteracao-marca/:id' })

    const inputModelo = await screen.findByDisplayValue(veiculoMock[0].modelo)
    const inputAno = await screen.findByDisplayValue(veiculoMock[0].ano)
    fireEvent.change(inputModelo, { target: { value: 'corolla' } })
    fireEvent.change(inputAno, { target: { value: '2001' } })
    expect(inputModelo.value).toBe('corolla')
    expect(inputAno.value).toBe('2001')
  })
})
