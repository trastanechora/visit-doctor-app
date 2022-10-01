import { useState, forwardRef, useRef, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NumericFormat } from 'react-number-format';
import { Typography, Box, Divider, Container, TextField, FormControl, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useNotificationContext } from '@/context/notification'
import { useAuthContext } from '@/context/auth'
import styles from '@/styles/Medicine.module.css'

import type { ChangeEvent } from 'react'
import type { NextPageWithCustomProps } from '@/types/custom'

const EditMedicinePage: NextPageWithCustomProps = () => {
  const router = useRouter()
  const id = router.query.id;
  const [_, dispatch] = useNotificationContext()
  const [authState] = useAuthContext()
  const [isLoading, setLoading] = useState<boolean>(false)

  const [values, setValues] = useState({
    name: '',
    code: '',
    description: '',
    stock: '',
    price: '',
    currentUser: authState.user.id
  });
  const handleFormChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const formRef = useRef({
    name: '',
    code: '',
    description: '',
    stock: '',
    price: '',
    currentUser: authState.user.id
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    formRef.current = {
      ...formRef.current,
      [event.target.name]: event.target.value,
    }
  };

  const handlePriceChange = (newValue: string) => {
    formRef.current.price = newValue;
  }

  useEffect(() => {
    if (id && authState) {
      setLoading(true)
      fetch(`/api/medicine?id=${id}`)
        .then((res) => res.json())
        .then((responseObject) => {
          setLoading(false)
          console.warn('responseObject.data', responseObject.data)
          formRef.current = {
            ...formRef.current,
            name: responseObject.data.name,
            code: responseObject.data.code,
            description: responseObject.data.active_substance,
            stock: responseObject.data.stock,
            price: responseObject.data.price_raw,
          }
          setValues({
            name: responseObject.data.name,
            code: responseObject.data.code,
            description: responseObject.data.active_substance,
            stock: responseObject.data.stock,
            price: responseObject.data.price_raw,
            currentUser: authState.user.id
          })
          console.warn('formRef.current', formRef.current)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, authState]);

  const handleSubmit = () => {
    const bodyData = { ...values, price: formRef.current.price }
    console.warn('bodyData', bodyData)
    setLoading(true)
    fetch(`/api/medicine/${id}`, { method: 'PUT', body: JSON.stringify(bodyData) })
      .then((res) => res.json())
      .then((responseObject) => {
        console.log('SUCCESS!', responseObject)
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Berhasil ubah data obat ${formRef.current.name}`, severity: 'success' } })
        router.replace('/medicine')
        setLoading(false)
      }).then((err) => {
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Gagal ubah data obat, error: ${err}`, severity: 'error' } })
        setLoading(false)
      })
  }

  const InputFieldCustom = forwardRef<any, any>(function TextField(props, ref) {
    const { onChange, event, ...other } = props;

    return (
      <NumericFormat getInputRef={ref} onValueChange={onChange} thousandSeparator='.' decimalSeparator=',' prefix="Rp." suffix=',00' {...other} />
    );
  });

  if (isLoading) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>Edit Medicine | Medicine Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Button variant="outlined" onClick={() => router.back()} startIcon={<ChevronLeftIcon />} sx={{ marginRight: 3, textTransform: 'none' }}>Kembali</Button>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
            Ubah Data Obat
          </Typography>
        </Box>

        <Container maxWidth={false} disableGutters sx={{ width: '100%', marginTop: 2 }}>
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <Box sx={{ width: '70%', paddingRight: 1 }}>
              <FormControl fullWidth>
                <TextField
                  id="name-input"
                  label="Nama Obat"
                  name="name"
                  value={values.name}
                  onChange={handleFormChange('name')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Box>
            <Box sx={{ width: '30%', paddingLeft: 1 }}>
              <FormControl fullWidth>
                <TextField
                  id="code-input"
                  label="Kode Obat"
                  name="code"
                  value={values.code}
                  onChange={handleFormChange('code')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Box>
          </Container>
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <FormControl fullWidth>
              <TextField
                id="descripton-input"
                label="Deskripsi Obat"
                name="description"
                value={values.description}
                onChange={handleFormChange('description')}
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                rows={3}
                maxRows={6}
              />
            </FormControl>
          </Container>
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <Box sx={{ width: '50%', paddingRight: 1 }}>
              <FormControl fullWidth>
                <TextField
                  id="stock-input"
                  label="Stok"
                  type="number"
                  name="stock"
                  value={values.stock}
                  onChange={handleFormChange('stock')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Box>
            <Box sx={{ width: '50%', paddingLeft: 1 }}>
              <FormControl fullWidth>
                <TextField
                  id="price-input"
                  label="Harga"
                  name="price"
                  value={formRef.current.price}
                  onChange={(input: any) => handlePriceChange(input.value)}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    inputComponent: InputFieldCustom,
                  }}
                />
              </FormControl>
            </Box>
          </Container>

          <Divider sx={{ marginBottom: 3 }} />
          <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignSelf: 'center' }}>
              <Button variant="contained" onClick={handleSubmit} disabled={isLoading} sx={{ textTransform: 'none' }}>Simpan</Button>
            </Box>
          </Container>
        </Container>
      </main>
    </div>
  )
}

EditMedicinePage.isRequireAuth = true;
export default EditMedicinePage;
