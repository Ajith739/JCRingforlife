import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, LockKeyhole, RefreshCw, Settings2, Sparkles, WifiOff, } from "lucide-react";
import { Logo } from "../components/UI.jsx";
const content = {
    "403": {
        title: "This space is protected.",
        text: "Your account doesn’t have permission to view this page. Your administrator can help with the right access.",
        label: "ACCESS RESTRICTED",
    },
    "404": {
        title: "A little off the beaten path.",
        text: "We couldn’t find the page you’re looking for. Let’s get you back to a familiar place.",
        label: "PAGE NOT FOUND",
    },
    "500": {
        title: "A small pause in the connection.",
        text: "Something went wrong on our side. Try again in a moment, or head back to your workspace.",
        label: "SERVER ERROR",
    },
    maintenance: {
        title: "A little care behind the scenes.",
        text: "We’re making things better for you. Your JCRingforlife workspace will be back as soon as maintenance is complete.",
        label: "WORKSPACE MAINTENANCE",
    },
    "coming-soon": {
        title: "Something thoughtful is on its way.",
        text: "We’re building the next chapter of connected wellness. A new experience is coming to your JCRingforlife workspace.",
        label: "A NEW CHAPTER",
    },
};
export default function Utility({ code }) {
    const data = content[code] || content["404"], navigate = useNavigate();
    const Icon = code === "403"
        ? LockKeyhole
        : code === "500"
            ? WifiOff
            : code === "maintenance"
                ? Settings2
                : Sparkles;
    return (<div className={`ad-utility ad-utility-${code}`}>
      <header>
        <Link to="/admin">
          <Logo />
        </Link>
      </header>
      <main>
        <div className="ad-utility-copy">
          <span className="ad-eyebrow">{data.label}</span>
          {/^\d+$/.test(code) && (<div className="ad-error-number" aria-hidden="true">
              {code}
              <span>{code}</span>
            </div>)}
          <h1>{data.title}</h1>
          <p>{data.text}</p>
          <div className="ad-actions">
            {(code === "500" || code === "maintenance") && (<button className="ad-btn ad-primary" onClick={() => window.location.reload()}>
                <RefreshCw size={16}/>
                Try again
              </button>)}
            <Link to="/admin" className={`ad-btn ${code === "500" || code === "maintenance" ? "" : "ad-primary"}`}>
              Back to dashboard
              <ArrowRight size={16}/>
            </Link>
          </div>
          <button className="ad-utility-back" onClick={() => {
            if (window.history.length > 1)
                navigate(-1);
            else
                navigate("/admin");
        }}>
            <ArrowLeft size={15}/>
            Return to previous page
          </button>
        </div>
        <div className="ad-utility-illustration" aria-hidden="true">
          <div className="ad-illustration-orbit"/>
          <div className="ad-illustration-orbit second"/>
          <div className="ad-illustration-ring"/>
          <div className="ad-illustration-card">
            <Icon size={36}/>
          </div>
          <span className="ad-illustration-star one">+</span>
          <span className="ad-illustration-star two">+</span>
          <span className="ad-illustration-dot"/>
        </div>
      </main>
      <footer>
        Thoughtfully connected. JCRingforlife © {new Date().getFullYear()}
      </footer>
    </div>);
}
