import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../pages/context.jsx"; 
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ FRONTEND VALIDATION FUNCTION
  const validate = () => {
    const { email, password } = formData;

    if (!email || !password) {
      return "Email and password are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔴 stop if validation fails
    const validationError = validate();
    if (validationError) {
      toast.success(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://movies-backend.up.railway.app/auth/login",
        formData,
        { withCredentials: true }
      );

login(res.data.role); 

      if (res.data.role === "admin") {
        navigate("/dashborad");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message|| "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
