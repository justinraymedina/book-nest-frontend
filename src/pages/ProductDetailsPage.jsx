import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        const res = await api.get(`/products/${id}`)
        const data = res.data?.data ?? res.data
        if (active) setProduct(data)
      } catch {
        if (active) setError('Unable to find this product.')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [id])

  if (loading) return <main style={{ padding: 20 }}>Loading...</main>
  if (error || !product) return <main style={{ padding: 20 }}>{error || 'Product not found.'} <Link to="/">Back</Link></main>

  // FIX: category is object, price is string
  const categoryName = product?.category?.name || 'General'
  const price = Number(product?.price || 0)

  return (
    <main style={{ padding: 20 }}>
      <Link to="/">← Back</Link>
      <h1>{product?.name}</h1>
      <p>Category: {categoryName}</p>
      <p>Price: ₱{price.toFixed(2)}</p>
      <p>{product?.description}</p>
      {product?.image && <img src={product.image} alt={product.name} style={{ width: 300, height: 200, objectFit: 'cover' }} />}
    </main>
  )
}