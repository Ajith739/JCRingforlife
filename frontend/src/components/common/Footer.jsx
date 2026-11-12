import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="relative bg-white text-[#5A6B80] border-t border-border">
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background: 'linear-gradient(90deg, rgb(0, 169, 224), rgb(24, 120, 224), rgb(109, 40, 217))',
        }}
      />
      <div className="mx-auto max-w-[1200px] px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Logo width={180} />
            <p className="mt-3 text-[14px] text-[#6B7A8C]">The Full Circle of Health</p>
            <p className="mt-2 text-[13px] text-[#6B7A8C]">JCRingforlife LLC · A Mazo Solutions Inc company</p>
          </div>
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[3px] text-[#5A6B80]">Product</h4>
            <ul className="space-y-3">
              <li><a href="/#how" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">How It Works</a></li>
              <li><Link to="/app" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">The App</Link></li>
              <li><a href="/#ring" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">The Ring</a></li>
              <li><Link to="/preorder" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">Pre-Order</Link></li>
              <li><Link to="/preorder" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">Size Guide</Link></li>
              <li><Link to="/faq" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">Sizing FAQ</Link></li>
              <li><Link to="/smart-ring-guide" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">Smart Ring Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[3px] text-[#5A6B80]">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">About</Link></li>
              <li><Link to="/support" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">Support</Link></li>
              <li><Link to="/privacy-policy" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-[14px] text-[#5A6B80] transition-colors hover:text-ink">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-[13px] text-[#6B7A8C]">© 2026 JCRingforlife LLC. All rights reserved.</p>
          <div className="flex gap-5 text-[#6B7A8C]">
            <a
              href="https://jcringforlife.com/"
              aria-label="YouTube"
              className="transition-colors hover:text-[#1878E0]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>
            <a
              href="https://jcringforlife.com/"
              aria-label="LinkedIn"
              className="transition-colors hover:text-[#1878E0]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://jcringforlife.com/"
              aria-label="Facebook"
              className="transition-colors hover:text-[#1878E0]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://jcringforlife.com/"
              aria-label="Instagram"
              className="transition-colors hover:text-[#1878E0]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://jcringforlife.com/"
              aria-label="X / Twitter"
              className="transition-colors hover:text-[#1878E0]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-center text-[12px] text-[#6B7A8C]">
          JCRingforlife Ring is intended for general wellness purposes only and is not a medical device.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[12px] text-[#6B7A8C]">
          The information provided by JCRingforlife Ring is for informational purposes only and is not intended to diagnose, treat, cure, or prevent any disease or medical condition.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[12px] text-[#6B7A8C]">
          Always consult a qualified healthcare professional regarding any medical concerns or before making healthcare decisions.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[12px] text-[#6B7A8C]">
          Blood Pressure (EST) and Blood Glucose (EST) are non-medical wellness estimates showing general trends only, they are not measurements and must not be used for any health or treatment decision.
        </p>
      </div>
    </footer>
  );
}
