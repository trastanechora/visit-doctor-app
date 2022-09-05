import { useEffect, useState } from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import { DataGrid } from '@mui/x-data-grid';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [header, setHeader] = useState([])
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/doctor')
      .then((res) => res.json())
      .then((data) => {
        const filteredHeader = data.data.headerObjects.filter((headerObject: any) => !headerObject.isHidden)
        const processedHeader = filteredHeader.map((headerObject: any) => headerObject.headerObject)
        setHeader(processedHeader)
        setData(data.data.list)
        setLoading(false)
        console.warn(data.data)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>Doctor | Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={header}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </main>
    </div>
  )
}

export default Home
