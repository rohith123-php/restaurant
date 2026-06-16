export default function Home() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)' }}>Arasu Chicken Center</h1>
        <p>Premium Quality Food. Order Online Now!</p>
        <button className="btn-primary" style={{ marginTop: '20px' }}>View Menu</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="premium-card">
          <h2>Featured Dish</h2>
          <p>Chicken Biryani - The best in town.</p>
          <button className="btn-primary">Add to Cart</button>
        </div>
        <div className="premium-card">
          <h2>Special Offer</h2>
          <p>Get 20% off on all Mutton items this weekend!</p>
          <button className="btn-primary">Claim Offer</button>
        </div>
      </div>
    </div>
  );
}
