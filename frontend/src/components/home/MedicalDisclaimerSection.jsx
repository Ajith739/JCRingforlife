import React from 'react';

export default function MedicalDisclaimerSection() {
  return (
    <section className="relative py-16 md:py-20" style={{ background: 'rgb(255, 255, 255)' }}>
      <div className="container mx-auto px-6">
        <div
          className="mx-auto max-w-3xl rounded-3xl border p-7 md:p-9 text-center backdrop-blur-xl"
          style={{
            borderColor: 'rgb(227, 233, 242)',
            background: 'rgb(246, 248, 252)',
          }}
        >
          <p className="eyebrow">General wellness product</p>
          <div className="mt-4 space-y-3 text-sm md:text-[15px] font-light text-ink-soft leading-relaxed">
            <p>JCRingforlife Ring is intended for general wellness purposes only and is not a medical device.</p>
            <p>
              The information provided by JCRingforlife Ring is for informational purposes only and is not intended to diagnose, treat, cure, or prevent any disease or medical condition.
            </p>
            <p>
              Always consult a qualified healthcare professional regarding any medical concerns or before making healthcare decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
