import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Server, Lock, Eye, AlertTriangle } from 'lucide-react';

const CIS_CONTROLS = [
  {
    title: 'Asset & Inventory Management',
    desc: 'Maintain an accurate inventory of all hardware, software, and cloud telemetry endpoints.',
    icon: Server,
    points: [
      'Automated discovery and classification of connected devices',
      'Unauthorized asset detection and quarantine procedures',
      'Regular asset audits with documented change tracking',
    ],
  },
  {
    title: 'Data Protection & Encryption',
    desc: 'End-to-end cryptographic defense across every storage and transit tier.',
    icon: Lock,
    points: [
      'AES-256 stationary database encryption for all user vitals',
      'TLS 1.3 enforced for all external web API traffic',
      'Hardware security modules (HSM) for cryptographic key storage',
    ],
  },
  {
    title: 'Access Control & Identity Management',
    desc: 'Principle of least privilege and multi-factor authorization across all systems.',
    icon: ShieldCheck,
    points: [
      'Hardware-based FIDO2 / WebAuthn MFA required for all engineering access',
      'Role-based access control (RBAC) with just-in-time elevation',
      'Immediate revocation upon employee or contractor transition',
    ],
  },
  {
    title: 'Continuous Monitoring & Logging',
    desc: 'Real-time telemetry and audit trails preserving forensic integrity.',
    icon: Eye,
    points: [
      'Centralized, append-only SIEM log aggregation',
      'Anomaly detection flagging unauthorized database reads',
      'Quarterly third-party SOC2 Type II compliance reviews',
    ],
  },
  {
    title: 'Vulnerability & Threat Management',
    desc: 'Proactive penetration testing, static code analysis, and rapid remediation.',
    icon: AlertTriangle,
    points: [
      'Automated CI/CD dependency vulnerability scanning',
      'Responsible disclosure bug bounty program',
      'Critical zero-day patching SLA under 24 hours',
    ],
  },
];

export default function CISPolicyPage() {
  useEffect(() => {
    document.title = 'CIS Information Security Policy - JCRingforlife Health Science';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">CIS Information Security</span>
        </nav>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-14 shadow-card space-y-8">
          <div>
            <span className="eyebrow text-primary">Cybersecurity Framework</span>
            <h1 className="text-3xl sm:text-4xl font-light text-ink mt-1 tracking-tight">
              CIS Information Security Policy
            </h1>
            <p className="text-xs text-ink-muted mt-2">
              Center for Internet Security (CIS) Controls Baseline · SOC2 Type II Certified
            </p>
          </div>

          <p className="text-sm md:text-base font-light text-ink-soft leading-relaxed">
            JCRingforlife operates under a Zero Trust security paradigm. We adhere to the Center for Internet Security (CIS) Controls v8 to ensure our connected hardware, embedded firmware, cloud infrastructure, and client mobile apps protect human biometric telemetry against advanced cyber threats.
          </p>

          <div className="space-y-6 pt-4">
            {CIS_CONTROLS.map((ctrl, idx) => {
              const Icon = ctrl.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-canvas border border-border/80 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary shrink-0 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-ink">
                        {ctrl.title}
                      </h2>
                      <p className="text-xs text-ink-soft">{ctrl.desc}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5 pl-12 text-xs text-ink-soft list-disc">
                    {ctrl.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

