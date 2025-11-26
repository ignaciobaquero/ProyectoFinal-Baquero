
import React, { useEffect, useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import { fetchProducts } from '../firebase'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  useEffect(() => {
    let mounted = true
    fetchProducts().then(data => { if (mounted) setProducts(data) }).catch(e => setError(e.message)).finally(() => setLoading(false))
    return () => { mounted = false }
  }, [])

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean))
    return Array.from(set)
  }, [products])

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (query && !(`${p.title} ${p.description}`.toLowerCase().includes(query.toLowerCase()))) return false
      if (category && p.category !== category) return false
      if (priceRange.min && Number(p.price) < Number(priceRange.min)) return false
      if (priceRange.max && Number(p.price) > Number(priceRange.max)) return false
      return true
    })
  }, [products, query, category, priceRange])

  if (loading) return <div>Cargando productos...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <h1>Catálogo</h1>
      <SearchBar query={query} setQuery={setQuery} categories={categories} category={category} setCategory={setCategory} priceRange={priceRange} setPriceRange={setPriceRange} />
      <div className="row">
        {filtered.length === 0 && <div className="col-12"><div className="alert alert-info">No se encontraron productos.</div></div>}
        {filtered.map(p => (
          <div key={p.id} className="col-md-4 mb-4"><ProductCard product={p} /></div>
        ))}
      </div>
    </div>
  )
}
