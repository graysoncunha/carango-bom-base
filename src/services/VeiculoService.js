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
    return fetch(`https://carango-bom-api.herokuapp.com/veiculos/${id}`).then((r) => r.json())
  },

  listar() {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos').then((r) => r.json())
  },
}

export default VeiculoService
