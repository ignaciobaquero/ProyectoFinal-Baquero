import React, { useState } from 'react';

export default function ItemCount({ initial = 1, stock = 10, onAdd }) {
  const [qty, setQty] = useState(initial);

  function inc() {
    setQty(q => Math.min(stock, q + 1));
  }
  function dec() {
    setQty(q => Math.max(1, q - 1));
  }
  function handleAdd() {
    if (qty < 1) return;
    onAdd(qty);
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <div className="input-group" style={{ width: 120 }}>
        <button type="button" className="btn btn-outline-secondary" onClick={dec} disabled={qty <= 1}>-</button>
        <input type="text" className="form-control text-center" value={qty} readOnly />
        <button type="button" className="btn btn-outline-secondary" onClick={inc} disabled={qty >= stock}>+</button>
      </div>
      <button className="btn btn-primary" onClick={handleAdd} disabled={stock === 0}>
        Agregar
      </button>
    </div>
  );
}