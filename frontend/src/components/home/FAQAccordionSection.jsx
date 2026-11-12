import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_ITEMS = [
  {
    question: 'What is the JCRingforlife smart ring?',
    answer:
      'JCRingforlife is an AI-native smart wellness ring in aircraft-grade titanium. Worn day and night, it reads sleep, resting heart rate, heart-rate variability, SpO₂, skin temperature, stress and activity, then reduces all of it to one daily Vitality Score and one clear action in the JCRingforlife app.',
  },
  {
    question: 'What does the JCRingforlife ring track?',
    answer:
      "Sleep duration and stages, resting heart rate, HRV, blood-oxygen saturation, skin-temperature deviation, daytime stress balance, steps, workouts and active calories, plus cycle-phase awareness for women's health, all compared to your own baseline rather than a population average.",
  },
  {
    question: 'Is a smart ring better than a smartwatch for sleep and recovery?',
    answer:
      'Many people wear a ring more consistently because it is lightweight, screenless and does not press against the wrist overnight. Finger sensors also sit where blood-flow signals are strong, and multi-day battery life means fewer gaps in your data.',
  },
  {
    question: 'How long does the JCRingforlife ring battery last?',
    answer:
      'JCRingforlife is designed for multi-day battery life, so a short daily top-up is enough and the ring can stay on through the night when the most useful recovery signals are captured.',
  },
  {
    question: 'Does the JCRingforlife ring require a subscription?',
    answer:
      'The JCRingforlife app is included with the ring. Reservation details are listed on the pre-order page.',
  },
  {
    question: 'Which finishes and sizes are available?',
    answer:
      'JCRingforlife comes in Midnight, Silver and Rose Gold titanium, each with the JCRingforlife wordmark laser-etched into the surface. Sizing guidance is shown during pre-order so you can confirm fit before reserving.',
  },
  {
    question: 'Is the JCRingforlife Ring a medical device?',
    answer:
      'No. JCRingforlife Ring is a general wellness product. It is not a medical device and is not cleared or approved to diagnose, treat, cure, or prevent any disease or medical condition.',
  },
  {
    question: 'Can JCRingforlife detect a heart condition, sleep disorder, or diabetes?',
    answer:
      'No. JCRingforlife shows trends and patterns in your everyday wellness signals. It cannot detect, screen for, or rule out any condition. If something feels off, speak with a qualified healthcare professional.',
  },
  {
    question: 'What does “(EST)” mean on Blood Pressure and Glucose?',
    answer:
      'Those are non-medical wellness estimates that illustrate general directional trends only. They are not measurements and must never be used for any health or treatment decision.',
  },
  {
    question: 'Should I change medication or treatment based on JCRingforlife insights?',
    answer:
      'Never. All insights are informational only. Do not start, stop, or adjust any medication, therapy, or treatment without consulting your healthcare professional.',
  },
  {
    question: 'How accurate are the readings?',
    answer:
      'Signals are captured for wellness and lifestyle awareness, not clinical accuracy. Results can vary with fit, activity, skin, and environment, and should not be compared to medical-grade equipment.',
  },
  {
    question: 'Can I share my data with my doctor?',
    answer:
      'You can export your data and share it if you choose. It is context for a conversation with your healthcare professional, not a diagnostic report, and it does not replace professional evaluation.',
  },
  {
    question: 'What should I do in an emergency?',
    answer:
      'Do not rely on JCRingforlife. Contact your local emergency services or a qualified healthcare professional immediately.',
  },
];

export default function FAQAccordionSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="relative py-14 sm:py-16 md:py-24" style={{ background: 'rgb(246, 248, 252)' }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="eyebrow">Questions, answered</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-extralight tracking-tight text-ink">
            Smart ring questions, and what JCRingforlife isn’t
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm md:text-base font-light text-ink-soft">
            Sleep, recovery, battery, fit and finishes, plus the limits of a wellness companion.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.03 }}
              >
                <div
                  className="rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: isOpen ? 'rgba(24, 120, 224, 0.35)' : 'rgb(227, 233, 242)',
                    background: 'rgb(255, 255, 255)',
                    boxShadow: isOpen
                      ? 'rgba(24, 120, 224, 0.45) 0px 22px 50px -30px'
                      : 'rgba(10, 22, 40, 0.04) 0px 1px 2px',
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left focus:outline-none"
                  >
                    <span className="text-[15px] md:text-base font-light text-ink">
                      {item.question}
                    </span>
                    <span
                      className="shrink-0 text-xl font-extralight text-ink-muted transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-[15px] font-light leading-relaxed text-ink-soft">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs md:text-[13px] font-light leading-relaxed text-ink-muted">
            All JCRingforlife results are informational only and are not intended to diagnose, treat, cure, or prevent any disease or medical condition. Always consult a qualified healthcare professional regarding any medical concerns or before making healthcare decisions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
