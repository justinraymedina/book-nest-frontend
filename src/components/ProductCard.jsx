export default function ProductCard({ product, onEdit, onDelete }) {
  const price = Number(product?.price || 0)
  const image = product?.image || 'https://picsum.photos/seed/book/400/300'
  // FIX: category is an OBJECT, so we must use .name
  const categoryName = product?.category?.name || 'General'
  const name = product?.name || 'Untitled'
  const desc = product?.description || ''

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      <img src={image} alt={name} style={{ width: '100%', height: 180, objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://picsum.photos/seed/book/400/300' }} />
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 12, color: '#888' }}>{categoryName}</div>
        <h3 style={{ margin: '8px 0' }}>{name}</h3>
        <p style={{ fontSize: 14, color: '#555', minHeight: 40 }}>{desc}</p>
        <div style={{ fontWeight: 'bold', marginBottom: 12 }}>₱{price.toFixed(2)}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onEdit && onEdit(product)}>Edit</button>
          <button onClick={() => onDelete && onDelete(product)}>Delete</button>
        </div>
      </div>
    </div>
  )
}