import './globals.css';
import { CartProvider } from '../context/CartContext';
import CartButton from '../components/CartButton';
import CartSidebar from '../components/CartSidebar';

export const metadata = {
  title: 'Jarvis Restaurant | Exquisite Dining',
  description: 'Premium culinary experiences delivered directly to your doorstep.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header className="navbar">
            <a href="/" className="navbar-logo">Jarvis Restaurant</a>
            <nav className="navbar-links">
              <a href="/" className="navbar-link">Home</a>
              <a href="/menu" className="navbar-link">Menu</a>
              <a href="/admin" className="navbar-link">Admin Dashboard</a>
            </nav>
            <CartButton />
          </header>
          <CartSidebar />
          <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
