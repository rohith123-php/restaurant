export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div className="premium-card" style={{ borderTop: '4px solid var(--primary)' }}>
          <h3>Total Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>152</p>
        </div>
        <div className="premium-card" style={{ borderTop: '4px solid var(--secondary)' }}>
          <h3>Total Revenue</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>$4,520</p>
        </div>
        <div className="premium-card" style={{ borderTop: '4px solid var(--dark)' }}>
          <h3>Total Customers</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>89</p>
        </div>
      </div>
      <h2>Recent Orders</h2>
      <div className="premium-card" style={{ marginTop: '20px' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 0' }}>#1001</td>
              <td>John Doe</td>
              <td style={{ color: 'var(--secondary)' }}>Completed</td>
              <td><button className="btn-primary" style={{ padding: '5px 10px' }}>View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
