import Layout from "@/components/Layout"
import { ProductsTable } from "@/components/ProductsTable"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products')
    .then(response => {
      setProducts(response.data)
    })
    .catch(err => {
      console.error(err)
    })
  }, [])

  return (
    <Layout>
      <Link href={'/products/new'} className="btn-primary">Add new product</Link>
      <ProductsTable products={products}/>
    </Layout>
  )
}
