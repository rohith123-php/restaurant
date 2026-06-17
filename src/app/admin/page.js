"use client";
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: '' });
  const [loading, setLoading] = useState(true);

  // Fetch items on load
  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      });
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleAddItem = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (res.ok) {
      const newItem = await res.json();
      setMenuItems([...menuItems, newItem]);
      setFormData({ name: '', description: '', price: '', image: '' }); // Reset form
    }
  };

  // Handle delete item
  const handleDeleteItem = async (id) => {
    const res = await fetch(`/api/menu?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Admin Dashboard</h1>
      
      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '50px' }}>
        <div className="glass-card" style={{ borderTop: '4px solid var(--primary)' }}>
          <h3>Total Items in DB</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>{menuItems.length}</p>
        </div>
        <div className="glass-card" style={{ borderTop: '4px solid var(--secondary)' }}>
          <h3>Total Revenue</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>$4,520</p>
        </div>
        <div className="glass-card" style={{ borderTop: '4px solid var(--dark)' }}>
          <h3>Total Customers</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>89</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        
        {/* Add Item Form */}
        <div className="glass-card">
          <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Add New Menu Item</h2>
          <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <input 
              type="text" name="name" placeholder="Item Name (e.g., Spicy Tacos)" required
              value={formData.name} onChange={handleInputChange}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white' }}
            />
            
            <textarea 
              name="description" placeholder="Description" required rows="3"
              value={formData.description} onChange={handleInputChange}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white' }}
            />
            
            <input 
              type="number" step="0.01" name="price" placeholder="Price (e.g., 9.99)" required
              value={formData.price} onChange={handleInputChange}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white' }}
            />
            
            <input 
              type="text" name="image" placeholder="Image URL (e.g., /chicken_biryani.png)"
              value={formData.image} onChange={handleInputChange}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white' }}
            />
            
            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
              + Add to Database
            </button>
          </form>
        </div>

        {/* Database List */}
        <div className="glass-card" style={{ overflowX: 'auto' }}>
          <h2 style={{ marginBottom: '20px' }}>Current Database Items</h2>
          {loading ? (
            <p>Loading database...</p>
          ) : (
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '10px' }}>ID</th>
                  <th style={{ padding: '10px' }}>Image</th>
                  <th style={{ padding: '10px' }}>Name</th>
                  <th style={{ padding: '10px' }}>Price</th>
                  <th style={{ padding: '10px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>{item.id}</td>
                    <td style={{ padding: '15px 10px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} />
                    </td>
                    <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>{item.name}</td>
                    <td style={{ padding: '15px 10px', color: 'var(--secondary)' }}>${item.price.toFixed(2)}</td>
                    <td style={{ padding: '15px 10px' }}>
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
      </div>
    </div>
  );
}
