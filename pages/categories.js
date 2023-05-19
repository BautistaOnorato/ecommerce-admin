import CategoriesTable from "@/components/CategoriesTable"
import Layout from "@/components/Layout"
import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const categories = () => {
  const [editedCategory, setEditedCategory] = useState(null)
  const [name, setName] = useState('')
  const [parentCategory,setParentCategory] = useState('');
  const [categories, setCategories] = useState('')
  const [properties, setProperties] = useState([])

  const resetValues = () => {
    setName('')
    setParentCategory('')
    setEditedCategory(null)
    setProperties([])
  }

  const fetchCategories = () => {
    axios.get('/api/categories')
      .then(res => {
        setCategories(res.data)
      })
      .catch(err => { console.error(err) })
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const saveCategory = async (e) => {
    e.preventDefault()
    const data = { 
      name, 
      parentCategory, 
      properties: properties.map(p => ({ 
        name: p.name, 
        values: p.values.split(',') 
      }))
    }
    try {
      if (editedCategory) {
        data._id = editedCategory._id
        await axios.put('/api/categories', data)
      } else {
        await axios.post('/api/categories', data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      resetValues()
      fetchCategories()
    }
  }

  const editCategory = (category) => {
    setEditedCategory(category)
    setName(category?.name)
    setParentCategory(category?.parent?._id || '')
    const newProperties = category.properties.map(({ name, values }) => ({
      name: name,
      values: values.join(',')
    }))
    setProperties(newProperties)
  }

  const deleteCategory = (category) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want ro delete ${category.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(result => {
      if(result.isConfirmed) {
        const { _id } = category
        axios.delete('/api/categories?_id=' + _id)
          .catch(err => { console.error(err) })
        setTimeout(() => {
          fetchCategories()
        }, 1000)
      }
    })
  }

  const addProperty = () => {
    setProperties(prevState => {
      return [
        ...prevState,
        {
          name: '',
          values: ''
        }
      ]
    })
  }

  const handlePropertyName = (e, i) => {
    const value = e.target.value
    setProperties(prev => {
      const properties = [...prev]
      properties[i].name = value
      return properties
    })
  }

  const handlePropertyValue = (e, i) => {
    const value = e.target.value
    setProperties(prev => {
      const properties = [...prev]
      properties[i].values = value
      return properties
    })
  }

  const removeProperty = (i) => {
    setProperties(prev => {
      const newProperties = [...prev]
      return newProperties.filter((p, pIndex) => {
        return pIndex !== i;
      })
    })
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label htmlFor="category-name-input">{editedCategory ? 'Edit category' : 'Create category'}</label>
      <form onSubmit={saveCategory} id="categories-form">
        <div className="flex gap-1">
          <input 
            type="text" 
            placeholder="ex: Shoes"
            id="category-name-input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <select value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
            <option value="">No parent category</option>
            {
              categories.length > 0 && categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label className="block">Properties</label>
          <button 
            type="button" 
            className="btn-default text-sm my-2"
            onClick={addProperty}
          >
            Add new property
          </button>
          {
            properties.length > 0 && properties.map((property, i) => (
              <div className="flex gap-2 mb-2" key={i}>
                <input className="my-0" type="text" onChange={(e) => handlePropertyName(e, i)} value={property.name} placeholder="Property name (exapmle: color)"/>
                <input className="my-0" type="text" onChange={(e) => handlePropertyValue(e, i)} value={property.values} placeholder="values, comma separated"/>
                <button 
                  type="button" 
                  className="btn-red text-sm"
                  onClick={() => removeProperty(i)}
                >
                  Remove
                </button>
              </div>
            ))
          }
        </div>
        <div className="flex gap-1">
          <button className="btn-primary" type="submit" form="categories-form">Save</button>
          {
            editedCategory && (<button className="btn-default bg-red-300" type="button" onClick={resetValues}>Cancel</button>)
          } 
        </div>
      </form>
      {
        !editedCategory && (
          <CategoriesTable categories={categories} editCategory={editCategory} deleteCategory={deleteCategory}/>
        )
      }
    </Layout>
  )
}

export default categories