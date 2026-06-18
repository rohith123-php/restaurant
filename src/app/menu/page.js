"use client";
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDish, setSelectedDish] = useState(null);
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      });
  }, []);

  // Determine Category Tag from Item name to simulate DB categories
  const getCategory = (item) => {
    const name = item.name.toLowerCase();
    if (name.includes('biryani') || name.includes('thali')) return 'Mains';
    if (name.includes('curry') || name.includes('tikka')) return 'Mains';
    if (name.includes('dosa') || name.includes('idli') || name.includes('crispy') || name.includes('fried')) return 'Starters';
    return 'Drinks';
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || getCategory(item) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="section-title animate-slide-up">Our Exquisite <span>Menu</span></h1>
      
      {/* Search & Category Layout */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', marginBottom: '50px' }}>
        <input 
          type="text" 
          placeholder="Search for an exquisite dish..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            padding: '15px 25px', width: '100%', maxWidth: '500px', 
            borderRadius: '30px', border: '1px solid var(--glass-border)', 
            background: 'var(--glass-bg)', color: 'white', fontSize: '1.1rem', outline: 'none'
          }}
        />

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['All', 'Mains', 'Starters', 'Drinks'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '10px 25px', borderRadius: '30px', border: '1px solid var(--glass-border)',
                background: activeCategory === category ? 'var(--accent)' : 'var(--glass-bg)',
                color: activeCategory === category ? 'black' : 'white',
                fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: 'var(--accent)' }}>Sourcing Flavors...</h2>
        </div>
      ) : (
        <div className="grid-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="glass-card animate-slide-up"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedDish(item);
                  setSpiceLevel('Medium');
                }}
              >
                <div className="card-image-wrapper">
                  <img src={item.image} alt={item.name} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{item.name}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px', height: '45px', overflow: 'hidden' }}>{item.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent)' }}>${item.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(item)} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              <h3>No culinary items match your criteria.</h3>
            </div>
          )}
        </div>
      )}

      {/* Dish Detailed Modal Overlay */}
      {selectedDish && (
        <div 
          onClick={() => setSelectedDish(null)}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-card" 
            style={{ width: '90%', maxWidth: '600px', padding: '40px', background: 'var(--dark)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '2.2rem' }}>{selectedDish.name}</h2>
              <button onClick={() => setSelectedDish(null)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>
            
            <img src={selectedDish.image} alt={selectedDish.name} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }} />
            
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '20px' }}>{selectedDish.description}</p>

            {/* Custom Options */}
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: 'white' }}>Customize Spice Level</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['Mild', 'Medium', 'Hot'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSpiceLevel(level)}
                    style={{
                      flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)',
                      background: spiceLevel === level ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                      color: spiceLevel === level ? 'black' : 'white', cursor: 'pointer', fontWeight: 'bold'
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>${selectedDish.price.toFixed(2)}</span>
              <button 
                onClick={() => {
                  addToCart({ ...selectedDish, name: `${selectedDish.name} (${spiceLevel})` });
                  setSelectedDish(null);
                }} 
                className="btn-primary" 
                style={{ padding: '12px 30px' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
