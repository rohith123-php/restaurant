"use client";
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Dark Overlay */}
      <div 
        onClick={toggleCart}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 999
        }}
      />
      
      {/* Sidebar */}
      <div 
        className="glass-card animate-slide-up"
        style={{
          position: 'fixed', top: 0, right: 0, width: '400px', maxWidth: '100vw', height: '100vh',
          zIndex: 1000, borderRadius: '0', display: 'flex', flexDirection: 'column',
          borderLeft: '1px solid var(--glass-border)',
          background: 'var(--dark)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: 'var(--primary)', margin: 0 }}>Your Cart</h2>
          <button 
            onClick={toggleCart} 
            style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {cartItems.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '50px' }}>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '15px', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px solid var(--glass-border)' }}>
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>${item.price.toFixed(2)}</span>
                    
                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', padding: '5px 10px', borderRadius: '20px' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--text-muted)' }}>
              <span>Tax (5%)</span>
              <span>${(cartTotal * 0.05).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>${(cartTotal * 1.05).toFixed(2)}</span>
            </div>
            <a href="/checkout" onClick={toggleCart} style={{ textDecoration: 'none' }}>
              <button className="btn-primary pulse" style={{ width: '100%', padding: '15px', fontSize: '1.2rem', cursor: 'pointer' }}>
                Proceed to Checkout
              </button>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
