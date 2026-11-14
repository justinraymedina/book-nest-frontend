import { useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function ProductListPage({ products = [], onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState('')
  const safeProducts = Array.isArray(products) ? products : []

  const filtered = safeProducts.filter(p => {
    if (!search) return true
    return (p?.name || '').toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Product Catalog</h1>
          <p>{filtered.length} products found</p>
        </div>
        <button onClick={onAdd} style={{ padding: '10px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8 }}>ADD PRODUCT</button>
      </div>

      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: 12, margin: '16px 0', borderRadius: 8, border: '1px solid #ddd' }}
      />

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
          {filtered.map(p => (
            <ProductCard key={p?.id} product={p} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}