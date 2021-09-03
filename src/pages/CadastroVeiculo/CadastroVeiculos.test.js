import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CadastroVeiculo from './CadastroVeiculo'
import Routes from '../../routes'

describe('Componente de cadastro de veículos', () => {
  it('deve carregar a página de cadastro de veículo', () => {
    const { container } = render(<CadastroVeiculo />, { wrapper: MemoryRouter })

    expect(container.firstChild).toMatchSnapshot()
  })

  // it('deve carregar a página de alteração de veículo', () => {
  //   render(
  //     <Routes path="/alteracao-veiculo/:id">
  //       <CadastroVeiculo />
  //     </Routes>,
  //     { route: '/alteracao-veiculo/139' }
  //   )

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
