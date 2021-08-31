import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import CustomPagination from '../../components/CustomPagination'
import { DataGrid } from '@material-ui/data-grid'
import { createMemoryHistory } from 'history'

const veiculosMock = [
  {
    id: 1,
    modelo: 'Sandero',
    ano: 2022,
    marca: { id: 2, nome: 'Renault' },
    valor: '80000',
  },
  {
    id: 2,
    modelo: 'Ferrari',
    ano: 2022,
    marca: { id: 2, nome: 'Renault' },
    valor: '80000',
  },
  {
    id: 3,
    modelo: 'Uninho',
    ano: 2022,
    marca: { id: 2, nome: 'Renault' },
    valor: '80000',
  },
  {
    id: 4,
    modelo: 'Um audi bem bonito',
    ano: 2022,
    marca: { id: 2, nome: 'Renault' },
    valor: '80000',
  },
]

const colunas = [
  { field: 'modelo', headerName: 'Modelo', flex: 3 },
  { field: 'ano', headerName: 'Ano', flex: 2 },
  { field: 'marca', headerName: 'Marca', flex: 2 },
  { field: 'valor', headerName: 'Valor (R$)', flex: 2 },
]

const history = createMemoryHistory()
describe('Componente de paginação customizada', () => {
  it('Deve passar entre páginas', async () => {
    render(
      <Router history={history}>
        <DataGrid
          rows={veiculosMock}
          columns={colunas}
          rowsPerPageOptions={[2]}
          pageSize={2}
          disableSelectionOnClick
          autoHeight
          components={{
            Pagination: CustomPagination,
          }}
        />
      </Router>
    )
    const segundaPagina = await screen.findByLabelText('Go to page 2')
    fireEvent.click(segundaPagina)
    expect(await screen.findByText(veiculosMock[2].modelo)).toBeInTheDocument()
  })
})
