"use client";
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      });
  }, []);

  // Filter items based on search query
  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="section-title animate-slide-up">Our <span>Menu</span></h1>
      
      {/* Search Bar */}
      <div className="animate-slide-up delay-100" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <input 
          type="text" 
          placeholder="Search for a dish..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            padding: '15px 25px', 
            width: '100%', 
            maxWidth: '500px', 
            borderRadius: '30px', 
            border: '1px solid var(--glass-border)', 
            background: 'var(--glass-bg)', 
            color: 'white',
            fontSize: '1.1rem',
            outline: 'none'
          }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: 'var(--primary)' }}>Loading Menu...</h2>
        </div>
      ) : (
        <div className="grid-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={item.id} className={`glass-card animate-slide-up delay-${(index % 3 + 1) * 100}`}>
                <div className="card-image-wrapper">
                  <img src={item.image} alt={item.name} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{item.name}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{item.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary)' }}>${item.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(item)} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>Add to Cart</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              <h3>No dishes found matching your search.</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
