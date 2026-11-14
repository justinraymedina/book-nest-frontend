import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MainLayout from './layouts/MainLayout'
import ProductListPage from './pages/ProductListPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductFormDialog from './components/ProductFormDialog'
import DeleteProductDialog from './components/DeleteProductDialog'
import api from './api/axios'

export default function App() {
  const [products, setProducts] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products')
      const data = res.data.data ?? res.data
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Fetch failed:', err)
      setProducts([])
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (location.pathname === '/add-product') {
      setEditing(null)
      setFormOpen(true)
    }
  }, [location.pathname])

  const handleAdd = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const handleEdit = (p) => {
    setEditing(p)
    setFormOpen(true)
  }

  const handleDelete = (p) => {
    setToDelete(p)
    setDeleteOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditing(null)
    if (location.pathname === '/add-product') navigate('/')
  }

  const handleSave = async (data) => {
    const payload = {
      name: data.name,
      description: data.description || '',
      price: Number(data.price),
      stock: Number(data.stock) || 10,
      category_id: Number(data.category_id || data.category || 1),
      image: data.image || data.image_url || 'https://picsum.photos/seed/book/400/300',
    }

    try {
      if (editing) {
        await api.put(`/products/${editing.id}`, payload)
      } else {
        await api.post('/products', payload)
      }
      await fetchProducts()
      setFormOpen(false)
      setEditing(null)
      if (location.pathname === '/add-product') navigate('/')
    } catch (err) {
      console.error(err)
      const msg = err.response?.data?.message || err.response?.data?.error || err.message
      alert('Save failed: ' + msg)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/products/${toDelete.id}`)
      setProducts(prev => prev.filter(p => p.id !== toDelete.id))
      setDeleteOpen(false)
      setToDelete(null)
    } catch (err) {
      console.error(err)
      alert('Delete failed')
    }
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<ProductListPage products={products} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />} />
        <Route path="/add-product" element={<ProductListPage products={products} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />} />
        <Route path="/products/:id" element={<ProductDetailsPage products={products} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ProductFormDialog open={formOpen} onClose={handleCloseForm} onSave={handleSave} initialData={editing} />
      <DeleteProductDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={handleConfirmDelete} product={toDelete} />
    </MainLayout>
  )
}