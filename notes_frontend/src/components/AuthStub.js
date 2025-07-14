import React, { useState } from "react";

// PUBLIC_INTERFACE
function AuthStub({ user, setUser }) {
  /**
   * AuthStub: Very basic authentication stub component.
   * Allows switching between "signed in" and "signed out" for demo/functionality separation.
   * Not real auth, but enough to demonstrate layout branches.
   */
  const [email, setEmail] = useState("");

  if (user) {
    return (
      <div className="auth-stub auth-loggedin">
        <span className="auth-user">
          <span role="img" aria-label="User">👤</span> {user.email}
        </span>
        <button
          className="auth-logout-btn"
          onClick={() => setUser(null)}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <form
      className="auth-stub auth-login"
      onSubmit={e => {
        e.preventDefault();
        if (email) setUser({ email });
      }}
    >
      <input
        className="auth-email-in"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        size={18}
        aria-label="Email"
      />
      <button
        className="auth-login-btn"
        type="submit"
        disabled={!email.trim()}
      >
        Login
      </button>
    </form>
  );
}

export default AuthStub;
