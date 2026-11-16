import { useState } from "react";
import API from "../api";

export default function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(false); //  REGISTER

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const { name, email, password } = form;

    //  COMMON VALIDATIONS
    if (!email || !password) {
      alert("Email and Password are required");
      return;
    }

    //  EMAIL 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Enter a valid email");
      return;
    }

    //  PASSWORD 
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    //  REGISTER 
    if (!isLogin && !name) {
      alert("Name is required");
      return;
    }

    try {
      let res;

      if (isLogin) {
        res = await API.post("/auth/login", form);

        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Login successful ");
        window.location.reload();
      } else {
        await API.post("/auth/register", form);

        alert("Registered successfully, now login");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="modal">
      <div className="glass">
        <h3>{isLogin ? "Login" : "Register"}</h3>

        {/* registration */}
        {!isLogin && (
          <input
            placeholder="Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>

        {/* SWITCH TEXT */}
        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{ cursor: "pointer", marginTop: "10px" }}
        >
          {isLogin
            ? "New user? Register"
            : "Already have account? Login"}
        </p>
      </div>
    </div>
  );
}