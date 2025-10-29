import React, { useState } from "react";
import "./LoginPanel.css";

/*
  Browser-friendly version of the LoginPanel component.
  This file is loaded via <script type="text/babel"> in index.html (Babel does JSX transform in-browser).
  It does not import CSS; style is linked from style.css already present in the workspace.
*/

export default function LoginPanel({ onSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data?.message || "Login failed");
            onSuccess?.(data);
        } catch (err) {
            setError(err?.message || String(err));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-panel">
            <form className="login-card" onSubmit={handleSubmit}>
                <h2 className="login-title">Sign in</h2>
                {error && <div className="login-error">{error}</div>}
                <label className="login-label">
                    Email
                    <input
                        className="login-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </label>
                <label className="login-label">
                    Password
                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </label>
                <button className="login-button" type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                </button>
                <div className="login-footer">
                    <a href="/signup">Create an account</a>
                </div>
            </form>
        </div>
    );
}

// Small demo app that shows result on successful login
function App() {
    const [user, setUser] = useState(null);

    return (
        <div>
            {!user ? (
                <LoginPanel onSuccess={(data) => {
                    // demo: show returned user and keep it in state
                    setUser(data?.user ?? { email: data?.email ?? "unknown" });
                }} />
            ) : (
                <div style={{ padding: 24 }}>
                    <h2>Welcome</h2>
                    <p>Signed in as: <strong>{user.email}</strong></p>
                    <button onClick={() => setUser(null)}>Sign out</button>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

