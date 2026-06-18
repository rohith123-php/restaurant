"use client";
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Confetti from '../../components/Confetti';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isFlipped, setIsFlipped] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shipping, setShipping] = useState({ name: '', phone: '', address: '', city: '' });
  const [payment, setPayment] = useState({ number: '', holder: '', expiry: '', cvv: '' });

  const totalWithTax = (cartTotal * 1.05).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create new order record
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: shipping.name,
        address: `${shipping.address}, ${shipping.city}`,
        phone: shipping.phone,
        items: cartItems.map(i => `${i.name} (x${i.quantity})`).join(', '),
        total: totalWithTax
      })
    });

    if (res.ok) {
      setOrderPlaced(true);
      clearCart();
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Confetti active={orderPlaced} />

      {orderPlaced ? (
        <div className="glass-card animate-fade-in" style={{ textAlign: 'center', padding: '60px', margin: '50px auto', maxWidth: '600px' }}>
          <div style={{ fontSize: '4rem', color: 'var(--accent)', marginBottom: '20px' }}>👑</div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Order Placed Successfully!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '30px' }}>
            Thank you for choosing Jarvis Restaurant. Your gourmet meal is being prepared by our Master Chefs and is estimated to arrive in 35 minutes.
          </p>
          <a href="/">
            <button className="btn-primary">Return Home</button>
          </a>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
          {/* Checkout billing fields */}
          <div className="glass-card">
            <h2 style={{ color: 'var(--accent)', marginBottom: '30px' }}>Gourmet Checkout</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3>Delivery Details</h3>
              <input type="text" placeholder="Full Name" required value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} style={inputStyle} />
              <input type="tel" placeholder="Phone Number" required value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} style={inputStyle} />
              <input type="text" placeholder="Street Address" required value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} style={inputStyle} />
              <input type="text" placeholder="City" required value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} style={inputStyle} />
              
              <h3>Payment Card Details</h3>
              <input type="text" maxLength="16" placeholder="Card Number (16 digits)" required value={payment.number} onChange={(e) => setPayment({ ...payment, number: e.target.value })} style={inputStyle} />
              <input type="text" placeholder="Cardholder Name" required value={payment.holder} onChange={(e) => setPayment({ ...payment, holder: e.target.value })} style={inputStyle} />
              
              <div style={{ display: 'flex', gap: '15px' }}>
                <input type="text" maxLength="5" placeholder="MM/YY" required value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
                <input 
                  type="password" maxLength="3" placeholder="CVV" required 
                  value={payment.cvv} 
                  onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} 
                  onFocus={() => setIsFlipped(true)}
                  onBlur={() => setIsFlipped(false)}
                  style={{ ...inputStyle, flex: 1 }} 
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '20px', width: '100%' }}>
                Pay & Confirm Order (${totalWithTax})
              </button>
            </form>
          </div>

          {/* Credit Card Visual & Order Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
            
            {/* Flipping Credit Card Visual */}
            <div style={{ perspective: '1000px', width: '350px', height: '200px' }}>
              <div style={{
                position: 'relative', width: '100%', height: '100%', transition: 'transform 0.6s',
                transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}>
                {/* Front Side */}
                <div style={{
                  position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                  background: 'linear-gradient(135deg, #1f1c2c, #928dab)', border: '1px solid var(--glass-border)',
                  borderRadius: '15px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontStyle: 'italic' }}>Gourmet Premium</div>
                    <div style={{ fontSize: '1.5rem' }}>💳</div>
                  </div>
                  <div style={{ fontSize: '1.4rem', letterSpacing: '2px', fontFamily: 'monospace' }}>
                    {payment.number || '•••• •••• •••• ••••'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Card Holder</div>
                      <div style={{ fontSize: '0.95rem' }}>{payment.holder || 'YOUR FULL NAME'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Expires</div>
                      <div style={{ fontSize: '0.95rem' }}>{payment.expiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div style={{
                  position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                  background: 'linear-gradient(135deg, #928dab, #1f1c2c)', border: '1px solid var(--glass-border)',
                  borderRadius: '15px', transform: 'rotateY(180deg)', padding: '20px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                  <div style={{ width: '100%', height: '40px', background: '#000' }} />
                  <div style={{ padding: '0 25px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <div style={{ background: '#fff', color: '#000', padding: '8px 15px', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 'bold' }}>
                      {payment.cvv || '•••'}
                    </div>
                  </div>
                  <div style={{ padding: '0 25px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}>
                    Authorized signature required
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="glass-card" style={{ width: '100%', padding: '25px' }}>
              <h3 style={{ margin: '0 0 20px 0' }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '150px', overflowY: 'auto', marginBottom: '20px' }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span>Tax (5%)</span>
                  <span>${(cartTotal * 0.05).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)', borderTop: '1px solid var(--glass-border)', paddingTop: '10px' }}>
                  <span>Total Amount</span>
                  <span>${totalWithTax}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: '12px 18px',
  borderRadius: '8px',
  border: '1px solid var(--glass-border)',
  background: 'rgba(255, 255, 255, 0.05)',
  color: 'white',
  outline: 'none',
  fontSize: '1rem'
};
