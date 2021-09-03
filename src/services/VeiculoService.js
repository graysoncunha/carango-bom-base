import request from '../api/request'

const urlVeiculos = '/veiculos'

const VeiculoService = {
  async cadastrar(veiculo) {
    return request(urlVeiculos, { method: 'POST', body: veiculo })
  },

  async alterar(veiculo) {
    return request(`${urlVeiculos}/${veiculo.id}`, { method: 'PUT', body: veiculo })
  },

  async consultar(id) {
    return request(`${urlVeiculos}/${id}`)
  },

  async listar() {
    return request(urlVeiculos)
  },

  async excluir(id) {
    return request(`${urlVeiculos}/${id}`, { method: 'DELETE' })
  },
}

export default VeiculoService
