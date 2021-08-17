import React from 'react'

import { Switch, Route } from 'react-router-dom'

import CadastroMarca from '../pages/CadastroMarca'
import ListagemMarcas from '../pages/ListagemMarcas'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ListagemMarcas} />
      <Route exact path="/cadastro-marca" component={CadastroMarca} />
      <Route exact path="/alteracao-marca/:id" component={CadastroMarca} />
    </Switch>
  )
}

export default Routes
