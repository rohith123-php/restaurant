"use client";
import { useCart } from '../../context/CartContext';

export default function MenuPage() {
  const { addToCart } = useCart();

  const menuItems = [
    { id: 1, name: 'Chicken Biryani', price: 12, category: 'Chicken', desc: 'Aromatic basmati rice with tender chicken.' },
    { id: 2, name: 'Mutton Curry', price: 18, category: 'Mutton', desc: 'Spicy and rich mutton gravy.' },
    { id: 3, name: 'Fried Fish', price: 15, category: 'Fish', desc: 'Crispy fried seasonal fish.' },
    { id: 4, name: 'Egg Masala', price: 8, category: 'Eggs', desc: 'Boiled eggs in a rich tomato gravy.' },
  ];

  return (
    <div>
      <h1 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Our Menu</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {menuItems.map(item => (
          <div key={item.id} className="premium-card">
            <span style={{ fontSize: '0.8rem', color: 'gray', textTransform: 'uppercase' }}>{item.category}</span>
            <h2 style={{ margin: '10px 0' }}>{item.name}</h2>
            <p style={{ color: '#555', marginBottom: '15px' }}>{item.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${item.price}</span>
              <button className="btn-primary" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
