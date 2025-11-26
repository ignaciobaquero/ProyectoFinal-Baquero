
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart, useDispatchCart } from '../context/CartContext'
import { saveOrder } from '../firebase'

export default function CheckoutPage() {
  const { items } = useCart()
  const dispatch = useDispatchCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', address: '' })

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const order = {
        buyer: form,
        items,
        total,
        createdAt: new Date().toISOString()
      }
      const id = await saveOrder(order)
      setSuccess(id)
      dispatch({ type: 'CLEAR' })
      setTimeout(() => navigate('/'), 2000)
    } catch (e) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  if (success) return <div className="alert alert-success">Compra realizada. ID: {success}</div>

  return (
    <div>
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input className="form-control" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-success" disabled={loading}>{loading ? 'Enviando...' : `Pagar $${total}`}</button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>Resumen</h4>
          <ul className="list-group">
            {items.map(i => <li key={i.id} className="list-group-item d-flex justify-content-between align-items-center">{i.title} x{i.qty} <span>${i.price * i.qty}</span></li>)}
          </ul>
          <h5 className="mt-3">Total: ${total}</h5>
        </div>
      </div>
    </div>
  )
}
