import Layout from "@/components/Layout";

export default function NewProduct() {
  return(
    <Layout>
      <h1>New Product</h1>
      <label>Product name</label>
      <input type="text" placeholder="Product name"/>
      <label>Description</label>
      <textarea placeholder="Description"/>
      <label>Price (in USD)</label>
      <input type="number" placeholder="100"/>
    </Layout>
  )
}