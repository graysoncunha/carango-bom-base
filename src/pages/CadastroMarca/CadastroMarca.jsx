import { Button, TextField, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import useErros from '../../hooks/useErros'
import Alert from '@material-ui/lab/Alert'
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

function CadastroMarca() {
  const [{ status, error }, setStatus] = useState({ status: 'idle', error: null })
  const [marca, setMarca] = useState('')

  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()

  const validacoes = {
    marca: (dado) => {
      if (dado && dado.length >= 3) {
        return { valido: true }
      } else {
        return { valido: false, texto: 'Marca deve ter ao menos 3 letras.' }
      }
    },
  }

  const [erros, validarCampos, possoEnviar] = useErros(validacoes)

  function cancelar() {
    history.goBack()
  }

  useEffect(() => {
    if (id) {
      MarcaService.consultar(id).then((m) => setMarca(m.nome))
    }
  }, [id])

  async function cadastrar() {
    try {
      setStatus({ status: 'loading' })
      await MarcaService.cadastrar({ nome: marca })
      setMarca('')
      history.goBack()
      setStatus({ status: 'fulfilled' })
    } catch (e) {
      setStatus({ status: 'rejected', error: e.message })
    }
  }

  return (
    <>
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
              MarcaService.alterar({ id, nome: marca }).then(() => {
                history.goBack()
              })
            } else {
              cadastrar()
            }
          }
        }}
      >
        <TextField
          value={marca}
          onChange={(evt) => setMarca(evt.target.value)}
          onBlur={validarCampos}
          helperText={erros.marca.texto}
          error={!erros.marca.valido}
          name="marca"
          id="marca"
          label="Marca"
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
    </>
  )
}

export default CadastroMarca
