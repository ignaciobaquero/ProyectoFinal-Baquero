
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProductById } from '../firebase'
import { useDispatchCart } from '../context/CartContext'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatchCart()
  const navigate = useNavigate()

  useEffect(() => {
    fetchProductById(id).then(p => setProduct(p)).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div>Cargando...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  function addToCart() {
    dispatch({ type: 'ADD', payload: { id: product.id, title: product.title, price: product.price, image: product.image } })
    navigate('/cart')
  }

  return (
    <div className="row">
      <div className="col-md-6"><img src={product.image || 'https://via.placeholder.com/600x400'} className="img-fluid" alt={product.title} /></div>
      <div className="col-md-6">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        <button className="btn btn-success" onClick={addToCart}>Agregar al carrito</button>
      </div>
    </div>
  )
}
