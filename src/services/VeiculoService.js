const VeiculoService = {
  cadastrar(veiculo) {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos', {
      method: 'POST',
      body: JSON.stringify(veiculo),
    }).then((r) => r.json())
  },

  alterar(veiculo) {
    return fetch(`https://carango-bom-api.herokuapp.com/veiculos/${veiculo.id}`, {
      method: 'PUT',
      body: JSON.stringify(veiculo),
    }).then((r) => r.json())
  },

  consultar(id) {
    return fetch(`https://carango-bom-api-grupo1.herokuapp.com/veiculos/${id}`).then((r) => r.json())
  },

  listar() {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos')
      .then((r) => {
        if (!r.ok) {
          throw new Error('Ocorreu um erro ao listar os veículos.')
        }
        return r.json()
      })
      .catch((erro) => {
        throw new Error(erro)
      })
  },

  excluir(id) {
    return fetch(`https://carango-bom-api.herokuapp.com/veiculos/${id}`, {
      method: 'DELETE',
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error('Ocorreu um erro ao excluir o veículo.')
        }
        return r.json()
      })
      .catch((erro) => {
        throw new Error(erro)
      })
  },
}

export default VeiculoService
