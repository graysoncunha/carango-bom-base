import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '../../App'

import headerLinks from './links.json'

describe('Componente Header', () => {
  it('ao clicar nos botões do header, deve alterar a rota para a rota esperada', () => {
    render(
      <Router>
        <App />
      </Router>
    )

    const botoesNavbar = screen.getAllByTestId('navbar')

    for (const botao of botoesNavbar) {
      fireEvent.click(botao)

      const rota = headerLinks.find(({ label }) => label === botao.textContent)

      expect(window.location.pathname).toBe(rota.href)
    }
  })
})
