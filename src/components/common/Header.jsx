import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '../../context/CartContext';

const NAV_LINKS = [
  { href: '#how', label: 'How It Works' },
  { href: '#signals', label: 'Signals' },
  { href: '/app', label: 'The App', route: true },
  { href: '#ring', label: 'The Ring' },
  { href: '/partners', label: 'Partners', route: true },
  { href: '/preorder', label: 'Pre-Order', route: true },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (link.route) {
      navigate(link.href);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/' + link.href);
      return;
    }

    const targetEl = document.querySelector(link.href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-[250ms]"
        style={{
          background: scrolled ? 'rgba(255, 255, 255, 0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid hsl(var(--border))' : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            aria-label="JCRingforlife home"
            className="focus:outline-none flex items-center"
          >
            <Logo width={145} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, idx) =>
              link.route ? (
                <Link
                  key={idx}
                  to={link.href}
                  className="text-[14px] font-medium text-[#3F5068] hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleNavClick(link)}
                  className="text-[14px] font-medium text-[#3F5068] hover:text-ink transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger Button (always available when items added) */}
            {totalItems > 0 && (
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 rounded-full text-ink-soft hover:text-ink transition-all"
                aria-label={`Shopping Cart (${totalItems} items)`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#00A9E0] to-[#1878E0] text-[10px] font-bold text-white shadow-sm">
                  {totalItems}
                </span>
              </button>
            )}

            {/* Pre-order CTA matching exact original button */}
            <Link
              to="/preorder"
              aria-label="Pre-order JCRingforlife Ring"
              className="hidden sm:inline-flex items-center rounded-full px-6 py-2.5 text-[14px] font-semibold text-white transition-all duration-150 hover:brightness-110 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg,#00A9E0,#1878E0,#6D28D9)',
              }}
            >
              Pre-Order →
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden text-ink p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white md:hidden">
          {NAV_LINKS.map((link, idx) =>
            link.route ? (
              <Link
                key={idx}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-medium text-ink"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={idx}
                type="button"
                onClick={() => handleNavClick(link)}
                className="text-2xl font-medium text-ink"
              >
                {link.label}
              </button>
            )
          )}

          <Link
            to="/preorder"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 rounded-full px-8 py-4 text-[15px] font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg,#00A9E0,#1878E0,#6D28D9)',
            }}
          >
            Pre-Order →
          </Link>
        </div>
      )}
    </>
  );
}
