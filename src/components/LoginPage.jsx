// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css";

// const LoginPage = ({ onLoginSuccess }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Please enter username and password.");
//       return;
//     }

//     // Hardcoded credentials
//     if (email === "Mannaiuser1" && password === "123") {
//       // Call callback to update in-memory login state in App.jsx
//       onLoginSuccess?.();
//       navigate("/index", { replace: true });
//     } else {
//       setError("Invalid username or password!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-icon">
//           <img
//             src="/mannai logosmall.jpg"
//             alt="Logo"
//             className="header-logo w-32 md:w-52"
//           />
//         </div>

//         <h2 className="login-title">IT Portfolio</h2>
//         <p className="login-subtitle">
//           Sign in to access your enterprise dashboard
//         </p>

//         <form onSubmit={handleLogin}>
//           <div className="input-group">
//             <label>Username</label>
//             <input
//               type="text"
//               placeholder="Enter your username"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

//           <button type="submit" className="login-btn bg-primary mt-4">
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (
      username.trim().toLowerCase() === "mannaiuser1" &&
      password === "admin123"
    ) {
      setIsLoggedIn(true);
      navigate("/index", { replace: true });
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">IT Portfolio</h2>

        <div className="logo-container">
          <img
            src="/mannai logosmall.jpg"
            alt="Logo"
            className="header-logo w-20"
          />
        </div>

        <p className="login-subtitle">
          Sign in to access your enterprise dashboard
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
