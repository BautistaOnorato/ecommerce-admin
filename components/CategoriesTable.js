import React from 'react'
import { DeleteIcon, EditIcon } from './icons/icons'

const CategoriesTable = ({ categories, editCategory, deleteCategory }) => {

  return (
    <table className="basic">
    <thead>
      <tr>
        <td>Category name</td>
        <td>Parnet category</td>
        <td></td>
      </tr>
    </thead>
    <tbody>
      {
        categories.length > 0 && categories?.map(category => (
          <tr key={category._id}>
            <td>{category.name}</td>
            <td>{category?.parent?.name || 'No parent'}</td>
            <td>
              <button 
                className='btn-edit mr-1'
                onClick={() => editCategory(category)}
              >
                Edit 
                <EditIcon />
              </button>
              <button 
                className='btn-red'
                onClick={() => deleteCategory(category)}
              >
                Delete 
                <DeleteIcon />
              </button>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
  )
}

export default CategoriesTable