"use client";
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div style={{ padding: 0 }}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content animate-slide-up">
          <h1 className="hero-title">Jarvis Restaurant</h1>
          <p className="hero-subtitle">
            Experience culinary excellence. We serve the finest, most authentic dishes crafted with passion and premium ingredients.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <a href="/menu">
              <button className="btn-primary pulse">Order Online Now</button>
            </a>
            <a href="/menu">
              <button className="btn-outline">View Full Menu</button>
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 20px', background: 'var(--dark)' }}>
        <h2 className="section-title animate-fade-in">Why Choose <span>Us</span></h2>
        <div className="grid-3">
          <div className="glass-card animate-slide-up delay-100" style={{ textAlign: 'center' }}>
            <div className="feature-icon">🚀</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Lightning Fast Delivery</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Hot, fresh, and delivered straight to your door in under 30 minutes, guaranteed.</p>
          </div>
          <div className="glass-card animate-slide-up delay-200" style={{ textAlign: 'center' }}>
            <div className="feature-icon">✨</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Premium Ingredients</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>We source only the highest quality, farm-fresh ingredients for every dish we prepare.</p>
          </div>
          <div className="glass-card animate-slide-up delay-300" style={{ textAlign: 'center' }}>
            <div className="feature-icon">👨‍🍳</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Master Chefs</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Our recipes are crafted by award-winning culinary experts with decades of experience.</p>
          </div>
        </div>
      </div>

      {/* Featured Menu Section */}
      <div style={{ padding: '80px 20px', background: 'var(--darker)' }}>
        <h2 className="section-title animate-fade-in">Signature <span>Dishes</span></h2>
        <div className="grid-3">
          
          <div className="glass-card animate-slide-up delay-100">
            <div className="card-image-wrapper">
              <img src="/chicken_biryani.png" alt="Chicken Biryani" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Royal Chicken Biryani</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Authentic Dum Biryani cooked with fragrant basmati rice and secret spices.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary)' }}>$14.99</span>
              <button 
                onClick={() => addToCart({ id: '1', name: 'Royal Chicken Biryani', price: 14.99, image: '/chicken_biryani.png' })} 
                className="btn-primary" 
                style={{ padding: '10px 20px', fontSize: '0.9rem' }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="glass-card animate-slide-up delay-200">
            <div className="card-image-wrapper">
              <img src="/chicken_curry.png" alt="Butter Chicken Curry" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Butter Chicken Curry</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Rich, creamy tomato gravy with tender chicken chunks. A classic favorite.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary)' }}>$16.99</span>
              <button 
                onClick={() => addToCart({ id: '2', name: 'Butter Chicken Curry', price: 16.99, image: '/chicken_curry.png' })} 
                className="btn-primary" 
                style={{ padding: '10px 20px', fontSize: '0.9rem' }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="glass-card animate-slide-up delay-300">
            <div className="card-image-wrapper">
              <img src="/fried_chicken.png" alt="Crispy Fried Chicken" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Crispy Fried Chicken</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Golden, extra crispy perfection on the outside, juicy on the inside.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary)' }}>$12.99</span>
              <button 
                onClick={() => addToCart({ id: '3', name: 'Crispy Fried Chicken', price: 12.99, image: '/fried_chicken.png' })} 
                className="btn-primary" 
                style={{ padding: '10px 20px', fontSize: '0.9rem' }}
              >
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
