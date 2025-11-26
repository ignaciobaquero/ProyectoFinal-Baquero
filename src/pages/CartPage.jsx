
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart, useDispatchCart } from '../context/CartContext'

export default function CartPage() {
  const { items } = useCart()
  const dispatch = useDispatchCart()
  const navigate = useNavigate()
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  if (items.length === 0) return (
    <div>
      <h2>Tu carrito está vacío</h2>
      <Link to="/">Ir al catálogo</Link>
    </div>
  )

  return (
    <div>
      <h2>Carrito</h2>
      <table className="table">
        <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th></th></tr></thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td>{i.title}</td>
              <td>
                <input type="number" min="1" value={i.qty} onChange={e => dispatch({ type: 'CHANGE_QTY', payload: { id: i.id, qty: Number(e.target.value) } })} style={{width: '70px'}} />
              </td>
              <td>${i.price * i.qty}</td>
              <td><button className="btn btn-sm btn-danger" onClick={() => dispatch({ type: 'REMOVE', payload: i.id })}>Quitar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Total: ${total}</h3>
        <div>
          <button className="btn btn-secondary me-2" onClick={() => dispatch({ type: 'CLEAR' })}>Vaciar</button>
          <button className="btn btn-primary" onClick={() => navigate('/checkout')}>Finalizar compra</button>
        </div>
      </div>
    </div>
  )
}
