"use client";
import { useCart } from '../context/CartContext';

export default function CartButton() {
  const { toggleCart, cartCount } = useCart();

  return (
    <button 
      onClick={toggleCart}
      style={{ 
        background: 'transparent', 
        border: 'none', 
        color: 'var(--primary)', 
        marginLeft: 'auto', 
        fontWeight: 'bold', 
        fontSize: '1.1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      🛒 Cart
      {cartCount > 0 && (
        <span style={{ 
          background: 'var(--primary)', 
          color: 'white', 
          padding: '2px 8px', 
          borderRadius: '20px', 
          fontSize: '0.9rem' 
        }}>
          {cartCount}
        </span>
      )}
    </button>
  );
}
