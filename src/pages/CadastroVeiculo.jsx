import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button, TextField, MenuItem } from '@material-ui/core'
import useErros from '../hooks/useErros'
import VeiculoService from '../services/VeiculoService'
import MarcaService from '../services/MarcaService'

function CadastroVeiculo() {
  const [veiculo, setVeiculo] = useState({
    marca: '',
    modelo: '',
    ano: '',
    valor: '',
  })
  const [marcas, setMarcas] = useState([])

  const history = useHistory()
  const { id } = useParams()

  const validacoes = {
    marca: (dado) => {
      if (dado) {
        return { valido: true }
      } else {
        return { valido: false, texto: 'Marca é obrigatória.' }
      }
    },
    modelo: (dado) => {
      if (!dado || dado.length < 2) {
        return {
          valido: false,
          texto: 'Modelo deve ter ao menos 2 caracteres.',
        }
      } else {
        return { valido: true }
      }
    },
    ano: (dado) => {
      if (!dado || dado.length < 4) {
        return { valido: false, texto: 'Ano deve ter ao menos 4 caracteres.' }
      } else {
        return { valido: true }
      }
    },
    valor: (dado) => {
      if (dado) {
        return { valido: true }
      } else {
        return { valido: false, texto: 'Valor é obrigatório.' }
      }
    },
  }

  const [erros, validarCampos, possoEnviar] = useErros(validacoes)

  useEffect(async () => {
    const marcas = await MarcaService.listar()
    setMarcas(marcas)
  }, [])

  useEffect(async () => {
    if (id) {
      const veiculo = await VeiculoService.consultar(id)

      setVeiculo({
        marca: veiculo.marca.id,
        modelo: veiculo.modelo,
        ano: veiculo.ano,
        valor: veiculo.valor,
      })
    }
  }, [id])

  function cancelar() {
    history.goBack()
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        if (possoEnviar()) {
          if (id) {
            VeiculoService.alterar({ id, ...veiculo }).then((res) => {
              history.goBack()
            })
          } else {
            VeiculoService.cadastrar({ ...veiculo }).then((res) => {
              setVeiculo({
                marca: '',
                modelo: '',
                ano: '',
                valor: '',
              })
              history.goBack()
            })
          }
        }
      }}
    >
      <TextField
        value={veiculo.marca}
        onChange={(evt) =>
          setVeiculo((prevState) => ({
            ...prevState,
            marca: evt.target.value,
          }))
        }
        helperText={erros.marca.texto}
        error={!erros.marca.valido}
        name="marca"
        id="marca"
        label="Marca"
        select
        variant="outlined"
        fullWidth
        required
        margin="normal"
      >
        {marcas &&
          marcas.map(({ id, nome }) => (
            <MenuItem key={id} value={id}>
              {nome}
            </MenuItem>
          ))}
      </TextField>

      <TextField
        value={veiculo.modelo}
        onChange={(evt) =>
          setVeiculo((prevState) => ({
            ...prevState,
            modelo: evt.target.value,
          }))
        }
        onBlur={validarCampos}
        helperText={erros.modelo.texto}
        error={!erros.modelo.valido}
        name="modelo"
        id="modelo"
        label="Modelo"
        type="text"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <TextField
        value={veiculo.ano}
        onChange={(evt) =>
          setVeiculo((prevState) => ({
            ...prevState,
            ano: evt.target.value,
          }))
        }
        onBlur={validarCampos}
        helperText={erros.ano.texto}
        error={!erros.ano.valido}
        name="ano"
        id="ano"
        label="Ano"
        type="text"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <TextField
        value={veiculo.valor}
        onChange={(evt) =>
          setVeiculo((prevState) => ({
            ...prevState,
            valor: evt.target.value,
          }))
        }
        onBlur={validarCampos}
        helperText={erros.valor.texto}
        error={!erros.valor.valido}
        name="valor"
        id="valor"
        label="Valor"
        type="text"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <Button variant="contained" color="primary" type="submit" disabled={!possoEnviar()}>
        {id ? 'Alterar' : 'Cadastrar'}
      </Button>

      <Button variant="contained" color="secondary" onClick={cancelar}>
        Cancelar
      </Button>
    </form>
  )
}

export default CadastroVeiculo
