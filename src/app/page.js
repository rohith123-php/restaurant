"use client";
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterStatus('Thank you for subscribing to our culinary journal!');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus(''), 5000);
    }
  };

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
              <button className="btn-primary">Order Online Now</button>
            </a>
            <a href="/menu">
              <button className="btn-outline">View Full Menu</button>
            </a>
          </div>
        </div>
      </div>

      {/* Culinary Story Section */}
      <div style={{ padding: '100px 20px', background: 'var(--dark)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <div className="glass-card" style={{ padding: '0', borderRadius: '20px', height: '400px', overflow: 'hidden' }}>
            <img src="/hero_background.png" alt="Chef Culinary Craft" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="animate-fade-in">
            <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 10px 0' }}>Our Legacy</h4>
            <h2 style={{ fontSize: '3rem', margin: '0 0 20px 0' }}>The Art of Gastronomy</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
              Founded in 2026, Jarvis Restaurant blends ancient cooking styles with contemporary creativity. Led by award-winning chefs, every single menu item represents a dedicated journey of flavor profiling.
            </p>
            <blockquote style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '20px', margin: '30px 0', fontSize: '1.2rem', fontStyle: 'italic', color: '#fff' }}>
              "Food is not just sustenance. It is an art form that speaks directly to the soul."
            </blockquote>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div style={{ padding: '100px 20px', background: 'var(--darker)' }}>
        <h2 className="section-title">What Our Guests <span>Say</span></h2>
        <div className="grid-3">
          {[
            { name: "Sophia Reynolds", review: "The Butter Chicken Curry was velvety smooth, and the attention to table detail was exceptional.", rating: "★★★★★" },
            { name: "David Chen", review: "Hands down the best Chicken Biryani in town! It was aromatic, flavorful, and delivered hot.", rating: "★★★★★" },
            { name: "Marcus Vance", review: "A luxurious experience. Ordering online is straightforward, and the packaging is premium.", rating: "★★★★★" }
          ].map((item, idx) => (
            <div key={idx} className="glass-card">
              <span style={{ color: 'var(--accent)', fontSize: '1.2rem', display: 'block', marginBottom: '10px' }}>{item.rating}</span>
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.6' }}>"{item.review}"</p>
              <h4 style={{ margin: 0, color: 'white' }}>- {item.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Footer */}
      <footer style={{ background: '#050505', borderTop: '1px solid var(--glass-border)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ color: 'var(--accent)', margin: '0 0 20px 0' }}>Jarvis Restaurant</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Exquisite dining experiences delivered with absolute luxury.</p>
          </div>
          <div>
            <h4 style={{ color: 'white', margin: '0 0 20px 0' }}>Operating Hours</h4>
            <p style={{ color: 'var(--text-muted)', margin: '5px 0' }}>Mon - Fri: 11:00 AM - 10:00 PM</p>
            <p style={{ color: 'var(--text-muted)', margin: '5px 0' }}>Sat - Sun: 10:00 AM - 11:30 PM</p>
          </div>
          <div>
            <h4 style={{ color: 'white', margin: '0 0 20px 0' }}>Stay Updated</h4>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{ flex: 1, padding: '10px 15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '30px', color: 'white' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>Join</button>
            </form>
            {newsletterStatus && <p style={{ color: 'var(--accent)', fontSize: '0.9rem', marginTop: '10px' }}>{newsletterStatus}</p>}
          </div>
        </div>
      </footer>
    </div>
  );
}
