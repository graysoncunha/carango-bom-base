import { handleError } from './request'

describe('Função handleError', () => {
  it('Deve retornar uma mensagem de erro', async () => {
    const mensagemErroTeste = 'Mensagem de erro teste'
    const response = await handleError({
      status: 400,
      text: () =>
        Promise.resolve(
          JSON.stringify({
            httpStatus: 'BAD_REQUEST',
            message: 'Mensagem de erro teste',
          })
        ),
    })
    expect(response).toEqual(mensagemErroTeste)
  })
})
