import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Star, MessageSquare, Play } from 'lucide-react';

const COMMUNITY_POSTS = [
  {
    author: 'Dr. Marcus Vance, MD',
    handle: '@marcusvance_longevity',
    tag: 'Longevity Physician',
    comment: 'The single Vitality Score and daily quest approach is revolutionary. Patients don’t need 50 charts, they need one clear physiological priority each morning.',
    rating: 5,
  },
  {
    author: 'Elena Rostova',
    handle: '@elena_runs',
    tag: 'Ultramarathoner',
    comment: 'Titanium build is virtually weightless. It survived 100 miles of mountain trail and never pinched my grip. Battery lasted the entire week effortlessly.',
    rating: 5,
  },
  {
    author: 'David Chen',
    handle: '@dchen_tech',
    tag: 'Wearables Reviewer',
    comment: 'No monthly subscription is the killer feature. Oura charges $70/yr just to see your own sleep data. aiOn giving lifetime vitals for $149 changes the entire market.',
    rating: 5,
  },
  {
    author: 'Sarah Jenkins',
    handle: '@sarahj_wellness',
    tag: 'Breathwork Instructor',
    comment: 'The box breathing quest when my daytime HRV dipped saved my afternoon meetings from burnout. It genuinely feels like having an autonomic nervous system coach on your hand.',
    rating: 5,
  },
];

export default function SocialEmbedsPage() {
  useEffect(() => {
    document.title = 'Community & Social Reviews | aiOn';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Community</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow text-primary">Voices from the Community</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink mt-1 tracking-tight">
            Loved by Physicians, Athletes & Early Believers
          </h1>
          <p className="mt-3 text-base font-light text-ink-soft leading-relaxed">
            See what doctors, fitness leaders, and wearable enthusiasts are saying about the screenless aiOn ring.
          </p>
        </div>

        {/* Video / Photo Showcase Preview */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="relative rounded-3xl overflow-hidden aspect-video bg-ink shadow-soft group">
            <img
              src="/assets/poster-life-early-CwSaqYEV.jpg"
              alt="Community lifestyle unboxing"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-6 flex flex-col justify-end text-white">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Unboxing & Sizing Experience
              </span>
              <h3 className="text-lg font-medium mt-1">
                "How the 24-hour sizing kit eliminated guessing"
              </h3>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-video bg-ink shadow-soft group">
            <img
              src="/assets/nature-walk-ring-BdKlJFoj.jpg"
              alt="Backcountry trail performance"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-6 flex flex-col justify-end text-white">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Real-World Durability
              </span>
              <h3 className="text-lg font-medium mt-1">
                "7 Days in the Canadian Rockies: Battery & 5ATM Water Test"
              </h3>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {COMMUNITY_POSTS.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-7 rounded-3xl bg-white border border-border shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-ink">{post.author}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-ink-muted">{post.handle}</span>
                    <span>•</span>
                    <span className="text-[11px] font-medium text-primary px-2 py-0.5 rounded-full bg-primary/10">
                      {post.tag}
                    </span>
                  </div>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(post.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm font-light text-ink-soft leading-relaxed italic">
                "{post.comment}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pre-order banner */}
        <div className="rounded-3xl bg-white border border-border p-8 text-center shadow-card">
          <h2 className="text-2xl font-light text-ink">Join the Founder Circle</h2>
          <p className="text-sm text-ink-soft max-w-md mx-auto mt-2 leading-relaxed">
            Reserve your ring at the early $149 price before public retail launch.
          </p>
          <div className="mt-6">
            <Link to="/preorder" className="btn-brand py-3.5 px-8 text-sm">
              Pre-Order Founder Edition →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

