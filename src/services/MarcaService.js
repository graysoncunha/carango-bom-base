import api from '../api/request'

const urlMarcas = '/marcas'

const MarcaService = {
  async cadastrar(marca) {
    return await api(urlMarcas, { method: 'POST', body: marca })
  },

  async alterar(marca) {
    return await api(`${urlMarcas}/${marca.id}`, { method: 'PUT', body: marca })
  },

  async consultar(id) {
    return await api(`${urlMarcas}/${id}`)
  },

  async listar() {
    return await api(urlMarcas)
  },

  async excluir(id) {
    return await api(`${urlMarcas}/${id}`, { method: 'DELETE' })
  },
}

export default MarcaService
