import React from 'react'

export default function CartWidget({ count }) 
  return (
    <span className="d-inline-flex align-items-center">
      <img src="/cart-icon.svg" alt="cart" style={{ width: 22, height: 22, marginRight: 6 }} />
      <span className="badge bg-primary">{count}</span>
    </span>
  )