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
  { href: '/faq', label: 'FAQ', route: true },
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
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid hsl(var(--border))' : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            aria-label="aiOn home"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-transform hover:opacity-90"
          >
            <Logo width={110} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
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
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Trigger Button */}
            <button
              type="button"
              onClick={openCart}
              className="relative p-2.5 rounded-full text-ink-soft hover:text-ink hover:bg-white/80 transition-all border border-border/60 shadow-sm"
              aria-label={`Shopping Cart (${totalItems} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#00A9E0] to-[#1878E0] text-[11px] font-bold text-white shadow-sm animate-in zoom-in-50 duration-200">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Pre-order CTA */}
            <Link
              to="/preorder"
              aria-label="Pre-order aiOn Ring"
              className="hidden sm:inline-flex items-center rounded-full px-5 py-2.5 text-[14px] font-semibold text-white transition-all duration-150 hover:brightness-110 hover:scale-[1.02] shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #00A9E0 0%, #1878E0 50%, #6D28D9 100%)',
              }}
            >
              Pre-Order →
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden text-ink p-2 rounded-lg hover:bg-canvas transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-7 bg-white/98 backdrop-blur-2xl md:hidden px-6 text-center animate-in fade-in duration-200">
          <button
            onClick={handleLogoClick}
            className="mb-4 focus:outline-none"
          >
            <Logo width={130} showTagline={true} />
          </button>

          {NAV_LINKS.map((link, idx) =>
            link.route ? (
              <Link
                key={idx}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-light text-ink hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={idx}
                type="button"
                onClick={() => handleNavClick(link)}
                className="text-2xl font-light text-ink hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            )
          )}

          <div className="pt-4 flex flex-col gap-3 w-full max-w-xs">
            <Link
              to="/preorder"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full px-8 py-4 text-[15px] font-semibold text-white shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #00A9E0, #1878E0, #6D28D9)',
              }}
            >
              Pre-Order Founder Edition →
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-secondary py-3 text-sm"
            >
              Explore Shop
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

