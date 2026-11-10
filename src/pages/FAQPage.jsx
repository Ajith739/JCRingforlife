import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/faqs';

const CATEGORIES = ['All', 'Hardware', 'Sensors & Metrics', 'Sizing & Fit', 'Membership', 'Medical Disclaimer'];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndices, setOpenIndices] = useState([0]);

  useEffect(() => {
    document.title = 'Frequently Asked Questions & Support | JCRingforlife';
    window.scrollTo(0, 0);
  }, []);

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleIndex = (idx) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">FAQ</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow text-primary">Knowledgebase</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink mt-1 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-base font-light text-ink-soft leading-relaxed">
            Everything you need to know about the JCRingforlife smart wellness ring, sensors, sizing kits, and transparent membership.
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="text"
              placeholder="Search questions by keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-full border border-border bg-white text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-ink text-white shadow-xs'
                  : 'bg-white text-ink-soft border border-border hover:border-ink-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-border">
              <p className="text-base text-ink-soft">No questions matched your search query.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
                className="mt-3 text-xs text-primary font-semibold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-2xl border bg-white overflow-hidden transition-all shadow-sm"
                  style={{
                    borderColor: isOpen ? 'rgba(24, 120, 224, 0.3)' : '#E2E8F0',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleIndex(idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none"
                  >
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1 block">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-light text-ink">
                        {faq.q}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-ink-muted shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-2 text-sm font-light text-ink-soft leading-relaxed border-t border-border/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Contact Support CTA Box */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-ink">
                Still have questions?
              </h4>
              <p className="text-xs text-ink-soft mt-0.5">
                Our clinical science and support team is available 7 days a week.
              </p>
            </div>
          </div>
          <Link to="/contact" className="btn-brand py-3 px-6 text-xs font-semibold shrink-0">
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}

