import Layout from "@/components/Layout";
import { ProductForm } from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [product, setProduct] = useState(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if(!id) return;
    axios.get('/api/products?id='+id)
      .then(response => {
        setProduct(response.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [id])

  return (
    <Layout>
      <h1>Edit product</h1>
      {
        product && (<ProductForm {...product}/>)
      }
    </Layout>
  )
}