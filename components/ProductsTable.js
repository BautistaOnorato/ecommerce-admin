import Link from "next/link"
import { DeleteIcon, EditIcon } from "./icons/icons"

export const ProductsTable = ({ products }) => {
  return (
    <table className="basic">
      <thead>
        <tr>
          <td>Product name</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {
          products?.map(product => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                <Link className="btn-edit" href={'/products/edit/'+product._id}>Edit <EditIcon /></Link>
                <Link className="btn-red" href={'/products/delete/'+product._id}>Delete <DeleteIcon /></Link>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
