import Layout from '@/components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function DeleteProductPage() {
  const [product, setProduct] = useState(null)
  const router = useRouter()
  const { id } = router.query

  const goBack = () => {
    router.push('/products')
  }

  const deleteProduct = () => {
    axios.delete('/api/products?id='+id)
      .then(goBack)
      .catch(err => {console.error(err)})
  }

  useEffect(() => {
    if(!id) return;

    axios.get('/api/products?id='+id)
      .then(res => {
        setProduct(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [id])

  return (
    <Layout>
      <h1 className='text-center'>
        Do you really want to delete "{product?.title}"?
      </h1>
      <div className='flex gap-2 justify-center'>
        <button onClick={deleteProduct} className='btn-red'>Yes</button>
        <button onClick={goBack} className='btn-default'>No</button>
      </div>
    </Layout>
  )
}
