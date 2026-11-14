import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from '@mui/material'

export default function ProductFormDialog({ open, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    name: '',
    category: '1',
    price: '',
    description: '',
    image: '',
    stock: '10',
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        category: String(initialData.category_id || initialData.category?.id || initialData.category || '1'),
        price: String(initialData.price || ''),
        description: initialData.description || '',
        image: initialData.image || initialData.image_url || '',
        stock: String(initialData.stock || '10'),
      })
    } else {
      setForm({
        name: '',
        category: '1',
        price: '',
        description: '',
        image: 'https://picsum.photos/seed/book1/400/300',
        stock: '10',
      })
    }
  }, [initialData, open])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    if (!form.name || !form.price) {
      alert('Please fill Name and Price')
      return
    }
    onSave({
      name: form.name,
      category: form.category,
      category_id: form.category,
      price: form.price,
      description: form.description,
      image: form.image,
      image_url: form.image,
      stock: form.stock,
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
          <TextField label="Category (type 1)" name="category" value={form.category} onChange={handleChange} fullWidth helperText="Type 1 for General" />
          <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} fullWidth required />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={3} />
          <TextField label="Image URL" name="image" value={form.image} onChange={handleChange} fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  )
}