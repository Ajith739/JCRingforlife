import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Page Not Found - aiOn';
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-canvas flex flex-col pt-20">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md py-16">
          <div className="text-[120px] font-extralight leading-none text-primary/15 mb-4 select-none">
            404
          </div>
          <h1 className="text-4xl font-light text-ink mb-4">
            Page not found
          </h1>
          <p className="text-ink-soft mb-8 leading-relaxed text-sm md:text-base">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-brand">
              Return to Home
            </Link>
            <Link to="/shop" className="btn-secondary">
              Explore Shop
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

