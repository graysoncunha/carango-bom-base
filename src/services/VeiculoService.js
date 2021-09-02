import api from '../api/request'

const urlVeiculos = '/veiculos'

const VeiculoService = {
  async cadastrar(veiculo) {
    return await api(urlVeiculos, { method: 'POST', body: veiculo })
  },

  async alterar(veiculo) {
    return await api(`${urlVeiculos}/${veiculo.id}`, { method: 'PUT', body: veiculo })
  },

  async consultar(id) {
    return await api(`${urlVeiculos}/${id}`)
  },

  async listar() {
    return await api(urlVeiculos)
  },

  async excluir(id) {
    return await api(`${urlVeiculos}/${id}`, { method: 'DELETE' })
  },
}

export default VeiculoService
