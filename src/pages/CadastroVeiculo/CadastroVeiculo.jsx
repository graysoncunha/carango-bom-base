import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button, TextField, MenuItem, makeStyles } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import useErros from '../../hooks/useErros'
import VeiculoService from '../../services/VeiculoService'
import MarcaService from '../../services/MarcaService'

const useStyles = makeStyles((theme) => ({
  actions: {
    top: '10px',
    marginRight: '10px',
  },
  alert: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}))

function CadastroVeiculo() {
  const [{ status, error }, setStatus] = useState({ status: 'idle', error: null })
  const [veiculo, setVeiculo] = useState({
    marcaId: '',
    modelo: '',
    ano: '',
    valor: '',
  })
  const [marcas, setMarcas] = useState([])

  const classes = useStyles()
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
        marcaId: veiculo.marca.id,
        modelo: veiculo.modelo,
        ano: veiculo.ano,
        valor: veiculo.valor,
      })
    }
  }, [id])

  function cancelar() {
    history.goBack()
  }

  async function cadastrar() {
    try {
      setStatus({ status: 'loading' })
      await VeiculoService.cadastrar({ ...veiculo })
      setVeiculo({
        marcaId: '',
        modelo: '',
        ano: '',
        valor: '',
      })
      history.goBack()
      setStatus({ status: 'fulfilled' })
    } catch (e) {
      setStatus({ status: 'rejected', error: e.message })
    }
  }

  return (
    <div>
      {status === 'rejected' ? (
        <Alert severity="error" className={classes.alert}>
          {error}
        </Alert>
      ) : null}
      <form
        onSubmit={(event) => {
          event.preventDefault()

          if (possoEnviar()) {
            if (id) {
              VeiculoService.alterar({ id, ...veiculo }).then(() => {
                history.goBack()
              })
            } else {
              cadastrar()
            }
          }
        }}
      >
        <TextField
          value={veiculo.marcaId}
          onChange={(evt) =>
            setVeiculo((prevState) => ({
              ...prevState,
              marcaId: evt.target.value,
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

        <Button variant="contained" color="primary" type="submit" disabled={!possoEnviar()} className={classes.actions}>
          {id ? 'Alterar' : 'Cadastrar'}
        </Button>

        <Button variant="contained" color="secondary" onClick={cancelar} className={classes.actions}>
          Cancelar
        </Button>
      </form>
    </div>
  )
}

export default CadastroVeiculo
