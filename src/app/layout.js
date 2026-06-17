import './globals.css';
import { CartProvider } from '../context/CartContext';
import CartButton from '../components/CartButton';
import CartSidebar from '../components/CartSidebar';

export const metadata = {
  title: 'Jarvis Restaurant',
  description: 'Premium quality food and delivery.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <nav style={{ padding: '20px', background: 'var(--dark)', color: 'white', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
            <a href="/menu" style={{ color: 'white', textDecoration: 'none' }}>Menu</a>
            <a href="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin Panel</a>
            <CartButton />
          </nav>
          <CartSidebar />
          <main style={{ padding: '40px' }}>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
