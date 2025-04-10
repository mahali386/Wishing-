<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>WishCrazeEarn Login/Register</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    * {box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif;}
    body {
      background: #6ba5cc; display: flex; justify-content: center; align-items: center; height: 100vh;
    }
    .container {
      width: 350px; background: #fff; padding: 2rem; border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    h2 {text-align: center; margin-bottom: 1rem;}
    form {display: flex; flex-direction: column;}
    label {margin-top: 10px; font-weight: 600;}
    input {
      padding: 10px; border: 1px solid #ccc; border-radius: 5px;
      margin-top: 5px;
    }
    button {
      margin-top: 20px; padding: 10px; border: none; border-radius: 5px;
      background: #e91e63; color: white; font-weight: bold; cursor: pointer;
    }
    button:hover {background: #d81b60;}
    .link {text-align: center; margin-top: 1rem; font-size: 14px;}
    .link a {text-decoration: none; font-weight: bold; color: #444;}
    .msg {text-align: center; margin-top: 1rem; font-size: 14px;}
  </style>
</head>
<body>

<div class="container">
  <h2 id="form-title">Login</h2>
  <form id="auth-form">
    <label for="email">Email</label>
    <input type="email" id="email" required />

    <label for="password">Password</label>
    <input type="password" id="password" required />

    <button type="submit" id="submit-btn">Login</button>
  </form>

  <div class="link">
    <span id="toggle-text">Don't have an account? <a href="#" id="toggle-link">Sign Up</a></span>
  </div>
  <div class="msg" id="msg"></div>
</div>

<!-- Firebase SDKs -->
<script type="module">
  // Import Firebase modules
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

  // Your Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBHo_897YOFw3-v1ZYpMswzEBOxa2IBy7E",
    authDomain: "wishcrazeearn-90312.firebaseapp.com",
    projectId: "wishcrazeearn-90312",
    storageBucket: "wishcrazeearn-90312.appspot.com",
    messagingSenderId: "39730033666",
    appId: "1:39730033666:web:625d3ff13ae76c88d6231b",
    measurementId: "G-M0Q5NWL3DK"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const form = document.getElementById("auth-form");
  const formTitle = document.getElementById("form-title");
  const toggleText = document.getElementById("toggle-text");
  const toggleLink = document.getElementById("toggle-link");
  const msg = document.getElementById("msg");
  let isLogin = true;

  toggleLink.addEventListener("click", () => {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? "Login" : "Register";
    toggleLink.textContent = isLogin ? "Sign Up" : "Login";
    toggleText.innerHTML = isLogin ? `Don't have an account? <a href="#" id="toggle-link">Sign Up</a>` : `Already have an account? <a href="#" id="toggle-link">Login</a>`;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;

    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => msg.textContent = "Login successful!")
        .catch(err => msg.textContent = "Login failed: " + err.message);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => msg.textContent = "Registered successfully!")
        .catch(err => msg.textContent = "Registration failed: " + err.message);
    }
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      msg.innerHTML = `Welcome, ${user.email} <br><button onclick="logout()">Logout</button>`;
    }
  });

  window.logout = () => {
    auth.signOut();
    msg.textContent = "Logged out!";
  };
</script>
</body>
</html>