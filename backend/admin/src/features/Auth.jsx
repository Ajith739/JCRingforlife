import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Eye, EyeOff, KeyRound, Loader2, LockKeyhole, Mail, ShieldCheck, Sparkles, } from "lucide-react";
import { api, localMode, useSession } from "../services/api.js";
import { demoEmail, demoPassword } from "../services/localDemo.js";
import { BackLink, FormError, Loading, Logo, useToast } from "../components/UI.jsx";
import { images } from "../../../shared/types.js";
const titles = {
    login: "Welcome back",
    "forgot-password": "Forgot your password?",
    "reset-password": "Set a new password",
    "verify-email": "Verify your email",
    "lock-screen": "Your workspace is locked",
    logout: "Signing you out",
};
const subtitles = {
    login: "Sign in to your JCRingforlife workspace.",
    "forgot-password": "We’ll send you a secure link to reset your password.",
    "reset-password": "A fresh password. A secure new start.",
    "verify-email": "Confirm your email to keep your account secure.",
    "lock-screen": "Re-enter your password to pick up where you left off.",
    logout: "Securely closing your session…",
};
export default function Auth({ page }) {
    const session = useSession(), qc = useQueryClient(), navigate = useNavigate(), toast = useToast();
    const [params] = useSearchParams();
    const [email, setEmail] = useState(""), [password, setPassword] = useState(""), [confirm, setConfirm] = useState(""), [remember, setRemember] = useState(false), [visible, setVisible] = useState(false), [pending, setPending] = useState(false), [error, setError] = useState(""), [success, setSuccess] = useState("");
    const logoutStarted = useRef(false);
    const redirect = () => {
        const v = params.get("redirect") ||
            sessionStorage.getItem("aion-return") ||
            "/admin";
        return v.startsWith("/admin") && !v.startsWith("//") ? v : "/admin";
    };
    useEffect(() => {
        document.title = `${titles[page]} · JCRingforlife`;
        setError("");
        setSuccess("");
    }, [page]);
    useEffect(() => {
        if (page === "logout" && session.data && !logoutStarted.current) {
            logoutStarted.current = true;
            api("/auth/logout", { method: "POST" })
                .then(async () => {
                qc.clear();
                navigate("/login", { replace: true });
                toast("You have been signed out");
            })
                .catch((e) => {
                setError(e.message);
                logoutStarted.current = false;
            });
        }
    }, [page, session.data, qc, navigate, toast]);
    const signIn = async (demo = false) => {
        setPending(true);
        setError("");
        try {
            await api(demo
                ? "/auth/demo"
                : page === "lock-screen"
                    ? "/auth/unlock"
                    : "/auth/login", { method: "POST", body: JSON.stringify({ email, password, remember }) });
            await qc.invalidateQueries({ queryKey: ["session"] });
            navigate(redirect(), { replace: true });
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setPending(false);
        }
    };
    if (session.isLoading)
        return <Loading />;
    const login = page === "login", forgot = page === "forgot-password", reset = page === "reset-password", lock = page === "lock-screen", verify = page === "verify-email";
    const token = params.get("token");
    return (<div className={`ad-auth-page ${login ? "ad-auth-split" : ""}`}>
      {login && (<aside className="ad-auth-art">
          <Logo />
          <div className="ad-auth-art-center">
            <span className="ad-eyebrow">
              <Sparkles size={14}/> SMALL RING. BIGGER POSSIBILITIES.
            </span>
            <div className="ad-auth-orbit">
              <div />
              <img src={images["Silver"]} alt="Silver titanium smart ring"/>
            </div>
            <h2>
              A more connected
              <br />
              way to run your business.
            </h2>
            <p>
              Thoughtful technology. Meaningful connections.
              <br />
              Everything you need, in one place.
            </p>
          </div>
          <span className="ad-auth-art-footer">
            JCRINGFORLIFE · AION SMART RINGS
          </span>
        </aside>)}
      <main className="ad-auth-main">
        <div className="ad-auth-card">
          {!login && <Logo />}
          <div className="ad-auth-icon">
            {login ? (<LockKeyhole size={23}/>) : forgot ? (<Mail size={26}/>) : (<ShieldCheck size={26}/>)}
          </div>
          <h1>{titles[page]}</h1>
          <p className="ad-auth-subtitle">{subtitles[page]}</p>
          {session.error && (<FormError error="Cannot reach the admin API. Start the server and retry."/>)}
          {success ? (<div className="ad-auth-success">
              <ShieldCheck size={32}/>
              <p>{success}</p>
              <Link className="ad-btn ad-primary" to="/login">
                Back to sign in
                <ArrowRight size={15}/>
              </Link>
            </div>) : page === "logout" ? (<div className="ad-auth-logout">
              <Loader2 className="ad-spin" size={23}/>
              <FormError error={error}/>
              {error && (<Link to="/login" className="ad-link">
                  Return to sign in
                </Link>)}
            </div>) : (<form className="ad-form" onSubmit={async (e) => {
                e.preventDefault();
                if (login || lock) {
                    await signIn();
                    return;
                }
                setError("");
                setPending(true);
                try {
                    if (reset && password !== confirm)
                        throw new Error("Passwords do not match");
                    if (reset && !token)
                        throw new Error("This link is missing its security token. Request a new link from your administrator.");
                    const result = await api(`/auth/${verify && !token ? "verification-request" : page}`, {
                        method: "POST",
                        body: JSON.stringify(forgot || (verify && !token)
                            ? { email }
                            : reset
                                ? { token, password }
                                : { token }),
                    });
                    setSuccess(result.message);
                }
                catch (err) {
                    setError(err.message);
                }
                finally {
                    setPending(false);
                }
            }}>
              {lock && (<div className="ad-locked-user">
                  <span className="ad-avatar large">
                    {session.data?.user?.name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("") || "A"}
                  </span>
                  <strong>{session.data?.user?.name || "Administrator"}</strong>
                  <small>{session.data?.user?.email}</small>
                </div>)}
              {(login || forgot || (verify && !token)) && (<label>
                  <span>Email address</span>
                  <div className="ad-input-icon">
                    <Mail size={16}/>
                    <input type="email" name="email" aria-label="Email address" autoComplete="username" required placeholder="name@aionrings.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                </label>)}
              {(login || lock || reset) && (<label>
                  <span>{reset ? "New password" : "Password"}</span>
                  <div className="ad-input-icon">
                    <KeyRound size={16}/>
                    <input type={visible ? "text" : "password"} name="password" aria-label={reset ? "New password" : "Password"} autoComplete={reset ? "new-password" : "current-password"} required={!session.data?.user?.demo || !lock} minLength={reset ? 12 : undefined} maxLength={200} placeholder={lock && session.data?.user?.demo
                    ? "Development session — no password needed"
                    : "Enter your password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type="button" aria-label={visible ? "Hide password" : "Show password"} onClick={() => setVisible(!visible)}>
                      {visible ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </div>
                  {reset && (<small>
                      12+ characters, uppercase, lowercase, and a number.
                    </small>)}
                </label>)}
              {reset && (<label>
                  <span>Confirm password</span>
                  <input type="password" required minLength={12} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)}/>
                </label>)}
              {login && (<div className="ad-auth-options">
                  <label>
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}/>
                    Remember me
                  </label>
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>)}
              {verify && !token && (<p className="ad-help-text">
                  Request a fresh verification link for your staff account.
                  Access is provisioned by your administrator.
                </p>)}
              <FormError error={error}/>
              <button className="ad-btn ad-primary ad-auth-submit" type="submit" disabled={pending || !!session.error}>
                {pending ? <Loader2 className="ad-spin" size={16}/> : null}
                {login
                ? "Sign in"
                : forgot
                    ? "Send reset link"
                    : reset
                        ? "Reset password"
                        : lock
                            ? "Unlock workspace"
                            : token
                                ? "Verify email"
                                : "Send verification link"}
                <ArrowRight size={16}/>
              </button>
              {login && session.data?.demoAvailable && (<>
                  <div className="ad-auth-divider">BROWSER DEMO</div>
                  <button className="ad-btn ad-demo-login" type="button" disabled={pending} onClick={() => signIn(true)}>
                    Explore development workspace <ArrowRight size={15}/>
                  </button>
                  <p className="ad-auth-demo-note">
                    Demo login: <strong>{demoEmail}</strong> / <strong>{demoPassword}</strong>
                    <br />
                    {localMode ? "Sample data stays in this browser. No server is needed." : "Synthetic data in a local development database."}
                  </p>
                </>)}
              {!login && (<div className="ad-auth-back">
                  <BackLink to={lock ? "/logout" : "/login"}>
                    {lock ? "Sign out instead" : "Back to sign in"}
                  </BackLink>
                </div>)}
            </form>)}
          <p className="ad-auth-secure">
            <LockKeyhole size={12}/>
            Secure access. Thoughtfully protected.
          </p>
        </div>
        <footer>
          © {new Date().getFullYear()} JCRingforlife · Admin workspace
        </footer>
      </main>
    </div>);
}
