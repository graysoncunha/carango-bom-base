import React from 'react'

import { Switch, Route, BrowserRouter } from 'react-router-dom'

import CadastroMarca from '../pages/CadastroMarca'
import CadastroVeiculo from '../pages/CadastroVeiculo'
import ListagemMarcas from '../pages/ListagemMarcas'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ListagemMarcas} />
        <Route path="/cadastro-marca" component={CadastroMarca} />
        <Route path="/alteracao-marca/:id" component={CadastroMarca} />
        <Route path="/cadastro-veiculo" component={CadastroVeiculo} />
        <Route path="/alteracao-veiculo/:id" component={CadastroVeiculo} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
