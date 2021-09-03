import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom'
import MarcaService from '../../services/MarcaService'
import CadastroMarca from './CadastroMarca'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const marcaMock = [
  {
    id: 1,
    nome: 'BMW',
  },
]

jest.mock('../../services/MarcaService')

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

describe('Componente de cadastro de marcas', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    MarcaService.listar.mockResolvedValue(marcaMock)
  })
  it('deve carregar a página de cadastro de marca', () => {
    const { container } = render(<CadastroMarca />, { wrapper: MemoryRouter })

    expect(container.firstChild).toMatchSnapshot()
  })

  it('deve carregar a página de cadastro de marca', async () => {
    render(
      <Router history={history}>
        <CadastroMarca />
      </Router>
    )

    const botaoCadastrar = await screen.findByText('Cadastrar')
    expect(botaoCadastrar).toBeInTheDocument()
  })

  it('deve carregar a página de alteração de marca', async () => {
    MarcaService.consultar.mockResolvedValue(marcaMock[0])
    renderWithRouter(CadastroMarca, { route: `/alteracao-marca/${marcaMock[0].id}`, path: '/alteracao-marca/:id' })
    const botaoAlterar = await screen.findByText('Alterar')
    expect(botaoAlterar).toBeInTheDocument()
  })

  it('deve clicar no cancelar da página de alteração de marca', async () => {
    MarcaService.consultar.mockResolvedValue(marcaMock[0])
    renderWithRouter(CadastroMarca, { route: `/alteracao-marca/${marcaMock[0].id}`, path: '/alteracao-marca/:id' })
    const botaoCancelar = await screen.findByText('Cancelar')
    expect(botaoCancelar).toBeInTheDocument()
    fireEvent.click(botaoCancelar)
    expect(history.location.pathname).toBe('/')
  })

  it('quando o formulário é enviado, os campos devem ser validados', () => {
    render(<CadastroMarca />, { wrapper: MemoryRouter })

    fireEvent.click(screen.getByText('Cadastrar'))

    waitFor(() => expect(screen.getByText('Marca deve ter ao menos 3 letras.')).toBeInTheDocument())
  })

  it('deve alterar os campos do formulário', async () => {
    MarcaService.consultar.mockResolvedValue(marcaMock[0])
    renderWithRouter(CadastroMarca, { route: `/alteracao-marca/${marcaMock[0].id}`, path: '/alteracao-marca/:id' })

    const inputNome = await screen.findByDisplayValue(marcaMock[0].nome)
    fireEvent.change(inputNome, { target: { value: 'marca teste' } })
    expect(inputNome.value).toBe('marca teste')
  })
})
