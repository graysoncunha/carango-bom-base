import React, { useEffect, useState } from 'react'
import { Button, TextField, MenuItem } from '@material-ui/core'
import { useHistory, useParams } from 'react-router'
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
      if (dado && dado.length >= 3) {
        return { valido: true }
      } else {
        return {
          valido: false,
          texto: 'Modelo deve ter ao menos 3 caracteres.',
        }
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

  function cancelar() {
    history.goBack()
  }

  useEffect(() => carregarMarcas(), [])

  function carregarMarcas() {
    MarcaService.listar().then((dados) => setMarcas(dados))
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        if (possoEnviar()) {
          if (id) {
            MarcaService.alterar({ id, nome: veiculo }).then((res) => {
              history.goBack()
            })
          } else {
            MarcaService.cadastrar({ nome: veiculo }).then((res) => {
              setVeiculo('')
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
        helperText={erros.modelo.texto}
        error={!erros.modelo.valido}
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
