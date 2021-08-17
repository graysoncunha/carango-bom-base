import React from 'react';

import ListagemVeiculos from './ListagemVeiculos'

import { render } from '@testing-library/react'

describe('Componente Listagem de Veículos', () => {
  it('deve carregar a página de listagem de veiculos', () => {
    const { container } = render(<ListagemVeiculos />)

    expect(container.firstChild).toMatchSnapshot();
  })
})
