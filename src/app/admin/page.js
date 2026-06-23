"use client";
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load Menu & Orders
    Promise.all([
      fetch('/api/menu').then(res => res.json()),
      fetch('/api/orders').then(res => res.json())
    ]).then(([menuData, orderData]) => {
      setMenuItems(menuData);
      setOrders(orderData);
      setLoading(false);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      setFormData({ name: '', description: '', price: '', image: '' });
    }
  };

  const handleDeleteItem = async (id) => {
    const res = await fetch(`/api/menu?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    const res = await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, status: newStatus })
    });
    if (res.ok) {
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    }
  };

  // Stats Calculations
  const calculatedRevenue = orders.reduce((sum, order) => sum + order.total, 0).toFixed(2);
  const totalCustomers = [...new Set(orders.map(o => o.phone))].length;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--accent)', marginBottom: '30px' }}>Royal Admin Dashboard</h1>
      
      {/* Dynamic Statistics cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '50px' }}>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent)' }}>
          <h3 style={{ color: 'var(--text-muted)', margin: '0 0 10px 0' }}>Est. Revenue</h3>
          <p style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: 0, color: 'var(--accent)' }}>₹{calculatedRevenue}</p>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <h3 style={{ color: 'var(--text-muted)', margin: '0 0 10px 0' }}>Total Orders</h3>
          <p style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: 0 }}>{orders.length}</p>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid #00d2fc' }}>
          <h3 style={{ color: 'var(--text-muted)', margin: '0 0 10px 0' }}>Menu Choices</h3>
          <p style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: 0 }}>{menuItems.length}</p>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid #2ed573' }}>
          <h3 style={{ color: 'var(--text-muted)', margin: '0 0 10px 0' }}>Total Guests</h3>
          <p style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: 0 }}>{totalCustomers}</p>
        </div>
      </div>

      {/* Orders queue grid */}
      <div className="glass-card" style={{ marginBottom: '40px' }}>
        <h2>Live Orders Queue ({orders.filter(o => o.status !== 'Delivered').length} Active)</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--accent)' }}>
                <th style={{ padding: '12px' }}>Order ID</th>
                <th style={{ padding: '12px' }}>Time</th>
                <th style={{ padding: '12px' }}>Customer Details</th>
                <th style={{ padding: '12px' }}>Address</th>
                <th style={{ padding: '12px' }}>Items Ordered</th>
                <th style={{ padding: '12px' }}>Total Paid</th>
                <th style={{ padding: '12px' }}>Status Tracker</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice().reverse().map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '15px 12px', fontWeight: 'bold' }}>{order.id}</td>
                  <td style={{ padding: '15px 12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{order.date}</td>
                  <td style={{ padding: '15px 12px' }}>
                    <div>{order.customer}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.phone}</div>
                  </td>
                  <td style={{ padding: '15px 12px', color: 'var(--text-muted)' }}>{order.address}</td>
                  <td style={{ padding: '15px 12px', fontSize: '0.9rem' }}>{order.items}</td>
                  <td style={{ padding: '15px 12px', color: 'var(--accent)', fontWeight: 'bold' }}>₹{order.total}</td>
                  <td style={{ padding: '15px 12px' }}>
                    <select 
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      style={{ 
                        padding: '6px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', 
                        color: order.status === 'Delivered' ? '#2ed573' : 'white', border: '1px solid var(--glass-border)'
                      }}
                    >
                      <option value="Pending" style={{background: '#121212'}}>Pending</option>
                      <option value="Preparing" style={{background: '#121212'}}>Preparing</option>
                      <option value="Out for Delivery" style={{background: '#121212'}}>Out for Delivery</option>
                      <option value="Delivered" style={{background: '#121212'}}>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        {/* Add Item Form & Interactive Preview */}
        <div className="glass-card">
          <h2 style={{ marginBottom: '20px', color: 'var(--accent)' }}>Add New Dish</h2>
          <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" name="name" placeholder="Dish Name" required value={formData.name} onChange={handleInputChange} style={formInputStyle} />
            <textarea name="description" placeholder="Short description..." required rows="3" value={formData.description} onChange={handleInputChange} style={formInputStyle} />
            <input type="number" step="0.01" name="price" placeholder="Price (INR)" required value={formData.price} onChange={handleInputChange} style={formInputStyle} />
            <input type="text" name="image" placeholder="Image URL (e.g., /paneer_tikka.png)" value={formData.image} onChange={handleInputChange} style={formInputStyle} />
            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>+ Publish to Menu</button>
          </form>
          
          {formData.name && (
            <div style={{ marginTop: '35px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
              <h4 style={{ color: 'var(--accent)', margin: '0 0 15px 0' }}>Live Card Preview</h4>
              <div className="glass-card" style={{ padding: '20px' }}>
                <h3>{formData.name}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{formData.description || 'Description will show here...'}</p>
                <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>₹{parseFloat(formData.price || 0).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Database List */}
        <div className="glass-card" style={{ overflowX: 'auto' }}>
          <h2 style={{ marginBottom: '20px' }}>Current Menu Inventory</h2>
          {loading ? (
            <p>Loading database...</p>
          ) : (
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '10px' }}>Image</th>
                  <th style={{ padding: '10px' }}>Name</th>
                  <th style={{ padding: '10px' }}>Price</th>
                  <th style={{ padding: '10px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '10px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }} />
                    </td>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.name}</td>
                    <td style={{ padding: '10px', color: 'var(--accent)' }}>₹{parseFloat(item.price).toFixed(2)}</td>
                    <td style={{ padding: '10px' }}>
                      <button onClick={() => handleDeleteItem(item.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
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

const formInputStyle = {
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid var(--glass-border)',
  background: 'rgba(255,255,255,0.04)',
  color: 'white',
  outline: 'none'
};
