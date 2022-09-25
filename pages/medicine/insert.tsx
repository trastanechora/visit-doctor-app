import { useState, forwardRef, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NumericFormat } from 'react-number-format';
import { Typography, Box, Divider, Container, TextField, FormControl, Button } from '@mui/material';

import { useNotificationContext } from '../../context/notification'
import { useAuthContext } from '../../context/auth'
import styles from '../../styles/Medicine.module.css'

import type { ChangeEvent } from 'react'
import type { NextPageWithCustomProps } from '../../types/custom'

const InsertMedicinePage: NextPageWithCustomProps = () => {
  const [_, dispatch] = useNotificationContext()
  const [authState] = useAuthContext()
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)
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

  const InputFieldCustom = forwardRef<any, any>(function TextField(props, ref) {
    const { onChange, event, ...other } = props;

    return (
      <NumericFormat getInputRef={ref} onValueChange={onChange} thousandSeparator='.' decimalSeparator=',' prefix="Rp." suffix=',00' {...other} />
    );
  });


  const handleSubmit = () => {
    console.warn('data', formRef.current);
    setLoading(true)
    fetch('/api/medicine', { method: 'POST', body: JSON.stringify(formRef.current) })
      .then((res) => res.json())
      .then((responseObject) => {
        setLoading(false)
        console.warn('responseObject', responseObject)
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Berhasil menambahkan obat ${formRef.current.name}` } })
        router.replace('/medicine')
      })
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>Insert New Medicine | Medicine Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
          Tambahkan Obat
        </Typography>

        <Container maxWidth={false} disableGutters sx={{ width: '100%', marginTop: 2 }}>
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <Box sx={{ width: '70%', paddingRight: 1 }}>
              <FormControl fullWidth>
                <TextField
                  id="name-input"
                  label="Nama Obat"
                  name="name"
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                onChange={handleChange}
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
                  onChange={handleChange}
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

InsertMedicinePage.isRequireAuth = true;
export default InsertMedicinePage;
