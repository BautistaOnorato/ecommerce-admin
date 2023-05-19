import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UploadIcon } from "./icons/icons";
import Spinner from "./Spinner";
import { ReactSortable } from 'react-sortablejs'

export const ProductForm = ({ 
  _id,
  title: existingTitle, 
  description: existingDescription, 
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: existingProperties
 }) => {

  const [title, setTitle] = useState(existingTitle || '')
  const [description, setDescription] = useState(existingDescription || '')
  const [price, setPrice] = useState(existingPrice || '')
  const [images, setImages] = useState(existingImages || [])
  const [category, setCategory] = useState(existingCategory || '')
  const [productProperties, setProductProperties] = useState(existingProperties || {})
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const propertiesToFill = [];

  useEffect(() => {
    axios.get('/api/categories')
      .then(res => {
        setCategories(res.data)
      })
      .catch(err => { console.error(err) })
  }, [])

  const uploadImages = async (e) => {
    const files = e.target?.files
    if (files?.length > 0) {
      const data = new FormData()
      
      for (const file of files) {
        data.append('file', file)
      }

      try {
        setIsLoading(true)
        const res = await axios.post('/api/upload', data)
        setImages(prevState => {
          return [...prevState, ...res.data.links]
        })
      } catch (err) {
        setIsLoading(false)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      title, 
      description, 
      price, 
      images, 
      category, 
      properties: productProperties 
    }
    if (_id) {
      axios.put('/api/products', {...data, _id})
        .then(() => {
          router.push('/products')
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      axios.post(`/api/products`, data)
        .then(() => {
          router.push('/products')
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  const updateImagesOrder = (images) => {
    setImages(images)
  }

  const handleProductProp = (pName, value) => {
    setProductProperties(prev => {
      const newProductProps = {...prev}
      newProductProps[pName] = value
      return newProductProps
    })
  }

  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category)
    propertiesToFill.push(...catInfo.properties)
    while(catInfo?.parent?._id) {
      const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id)
      propertiesToFill.push(...parentCat.properties)
      catInfo = parentCat;
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="product-name-input" onClick={() => console.log(productProperties, propertiesToFill)}>Product name</label>
      <input id="product-name-input" type="text" placeholder="Product name" value={title} onChange={e => setTitle(e.target.value)}/>
      <label htmlFor="product-category-input">
        <label>Category</label>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value={''}>Uncategorized</option>
          {
            categories.length > 0 && categories.map(c => (
              <option value={c._id} key={c._id}>{c.name}</option>
            ))
          }
        </select>
      </label>
      {
        propertiesToFill.length > 0 && propertiesToFill.map((p, i) => (
          <div key={i}>
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <select value={productProperties[p.name]} onChange={(e) => handleProductProp(p.name, e.target.value)}>
              <option value={''}>Select value...</option>
              {
                p.values.map((pValue, index) => (
                  <option key={index} value={pValue}>{pValue}</option>
                ))
              }
            </select>
          </div>
        ))
      }
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable 
          list={images} 
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {
            !!images?.length && images.map(link => (
              <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <img src={link} alt="product image" className="rounded-lg" />
              </div>
            )) 
          }
        </ReactSortable>
        {isLoading && (
          <div className="h-24 bg-gray-300 flex items-center p-1 rounded-lg">
            <Spinner />
          </div>
        )}
        <label 
          className="w-24 h-24 cursor-pointer text-sm gap-1 text-primary text-center flex items-center justify-center bg-white shadow-md border border-highlight rounded-sm">
          <UploadIcon />
          <div>Upload</div>
          <input type="file" className="hidden" onChange={uploadImages}/>
        </label>
      </div>
      <label htmlFor="product-description-input">Description</label>
      <textarea id="product-description-input" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
      <label htmlFor="product-price-input">Price (in USD)</label>
      <input id="product-price-input" type="number" placeholder="100" value={price} onChange={e => setPrice(e.target.value)}/>
      <button className="btn-primary" type="submit">Save</button>
    </form>
  )
}
