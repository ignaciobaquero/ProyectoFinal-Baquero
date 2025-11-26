
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatchCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const dispatch = useDispatchCart()
  function addToCart() {
    dispatch({ type: 'ADD', payload: { id: product.id, title: product.title, price: product.price, image: product.image } })
  }
  return (
    <div className="card h-100">
      <img src={product.image || 'https://via.placeholder.com/400x300'} className="card-img-top" alt={product.title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-truncate">{product.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link className="btn btn-outline-primary" to={`/product/${product.id}`}>Ver</Link>
          <div>
            <strong>${product.price}</strong>
            <button className="btn btn-primary btn-sm ms-2" onClick={addToCart}>Agregar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
