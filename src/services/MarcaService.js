import request from '../api/request'

const urlMarcas = '/marcas'

const MarcaService = {
  async cadastrar(marca) {
    return request(urlMarcas, { method: 'POST', body: marca })
  },

  async alterar(marca) {
    return request(`${urlMarcas}/${marca.id}`, { method: 'PUT', body: marca })
  },

  async consultar(id) {
    return request(`${urlMarcas}/${id}`)
  },

  async listar() {
    return request(urlMarcas)
  },

  async excluir(id) {
    return request(`${urlMarcas}/${id}`, { method: 'DELETE' })
  },
}

export default MarcaService
