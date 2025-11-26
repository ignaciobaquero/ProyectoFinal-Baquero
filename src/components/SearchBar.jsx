
import React from 'react'

export default function SearchBar({ query, setQuery, categories, category, setCategory, priceRange, setPriceRange }) {
  return (
    <div className="mb-4">
      <div className="row g-2">
        <div className="col-md-5">
          <input className="form-control" placeholder="Buscar producto..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-md-4 d-flex">
          <input type="number" className="form-control me-2" placeholder="Min $" value={priceRange.min} onChange={e => setPriceRange({...priceRange, min: e.target.value})} />
          <input type="number" className="form-control" placeholder="Max $" value={priceRange.max} onChange={e => setPriceRange({...priceRange, max: e.target.value})} />
        </div>
      </div>
    </div>
  )
}
