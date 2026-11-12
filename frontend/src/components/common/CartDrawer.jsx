import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-border"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-heading"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/80">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h2 id="cart-heading" className="text-xl font-light text-ink tracking-tight">
                    Your Cart ({totalItems})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="rounded-full p-2 text-ink-muted hover:text-ink hover:bg-canvas transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Alert Bar */}
              <div className="bg-canvas px-6 py-2.5 border-b border-border/50 flex items-center justify-center gap-2 text-xs text-ink-soft">
                <Truck className="w-3.5 h-3.5 text-primary" />
                <span>Free Worldwide Express Shipping Applied</span>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-canvas flex items-center justify-center mb-4 text-ink-muted">
                      <ShoppingBag className="w-8 h-8 opacity-40" />
                    </div>
                    <p className="text-base font-medium text-ink mb-1">Your cart is empty</p>
                    <p className="text-sm text-ink-soft mb-6 max-w-xs">
                      Select your favorite titanium finish and reserve your Founder Edition ring.
                    </p>
                    <Link
                      to="/shop"
                      onClick={closeCart}
                      className="btn-brand text-sm"
                    >
                      Shop JCRingforlife Ring
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        key={item.id}
                        className="flex gap-4 p-4 rounded-2xl bg-canvas border border-border/60 hover:border-border transition-colors"
                      >
                        <div className="w-20 h-20 rounded-xl bg-white p-2 border border-border/50 flex items-center justify-center shrink-0">
                          <img
                            src={item.image}
                            alt={`${item.name} - ${item.finishName}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-semibold text-ink leading-tight">
                                {item.name}
                              </h3>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-ink-muted hover:text-red-500 transition-colors p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-xs text-ink-soft">
                              <span>Finish: <strong className="text-ink">{item.finishName}</strong></span>
                              <span>•</span>
                              <span>Size: <strong className="text-ink">{item.size}</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/40">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-border rounded-full bg-white px-2 py-0.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 text-ink-muted hover:text-ink transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-semibold text-ink">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 text-ink-muted hover:text-ink transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-sm font-semibold text-ink">
                                ${item.price * item.quantity}
                              </div>
                              {item.originalPrice && (
                                <div className="text-[11px] text-ink-muted line-through">
                                  ${item.originalPrice * item.quantity}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border bg-white space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-ink-soft">
                      <span>Subtotal</span>
                      <span className="font-medium text-ink">${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-xs text-ink-soft">
                      <span>Shipping</span>
                      <span className="text-emerald-600 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-xs text-ink-soft">
                      <span>JCRingforlife Vitals Lifetime App</span>
                      <span className="text-emerald-600 font-medium">Included ($0)</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold text-ink pt-2 border-t border-border">
                      <span>Total Due Today</span>
                      <span className="text-lg text-primary font-bold">${totalPrice}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full btn-brand py-3.5 text-base flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-ink-muted text-center pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>30-Day Money-Back Guarantee · Ships Q3 2026</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

