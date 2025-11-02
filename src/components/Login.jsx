import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";
import "../styles/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication - in real app, this would call an API
    dispatch(
      login({
        email,
        name: email.split("@")[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          email.split("@")[0]
        )}`,
      })
    );
    setEmail("");
    setPassword("");
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDemoLogin = () => {
    dispatch(
      login({
        email: "demo@weather.com",
        name: "Demo User",
        avatar: "https://ui-avatars.com/api/?name=Demo+User",
      })
    );
    setIsOpen(false);
  };

  return (
    <div className="login-container">
      {isAuthenticated ? (
        <div className="user-menu">
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <span className="user-name">Hi, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <>
          <button className="login-btn" onClick={() => setIsOpen(true)}>
            🔐 Login
          </button>

          {isOpen && (
            <div className="login-modal">
              <div className="login-content">
                <div className="login-header">
                  <h3>Sign In</h3>
                  <button
                    className="close-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <button type="submit" className="login-submit">
                    Sign In
                  </button>
                </form>

                <div className="demo-section">
                  <p>Or try the demo:</p>
                  <button onClick={handleDemoLogin} className="demo-btn">
                    🚀 Quick Demo Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
