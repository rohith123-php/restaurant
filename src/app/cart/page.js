"use client";
import { useCart } from '../../context/CartContext';

export default function CartPage() {
 const { cartItems: cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <h1 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <p>Your cart is empty. Go add some delicious food!</p>
      ) : (
        <div style={{ maxWidth: '600px' }}>
          {cart.map(item => (
            <div key={item.id} className="premium-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div>
                <h3 style={{ margin: '0' }}>{item.name}</h3>
                <p style={{ margin: '5px 0 0 0', color: 'gray' }}>Qty: {item.quantity} x ${item.price}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontWeight: 'bold' }}>${item.price * item.quantity}</span>
                <button onClick={() => removeFromCart(item.id)} style={{ background: '#ff4757', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
              </div>
            </div>
          ))}
          
          <div style={{ marginTop: '30px', padding: '20px', background: 'var(--dark)', color: 'white', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Total:</h2>
            <h2>${total}</h2>
          </div>
          
          <button className="btn-primary" style={{ width: '100%', marginTop: '20px', padding: '15px', fontSize: '1.1rem' }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
