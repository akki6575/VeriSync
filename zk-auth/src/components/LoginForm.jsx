import { motion } from 'framer-motion';
import { useState } from "react";
import PropTypes from "prop-types";
import { generate_proof, verify_proof } from "../utils/AuthSystem";

const LoginForm = ({ setLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = localStorage.getItem(username);
      if (!userData) {
        alert("User not found!");
        return;
      }

      const { passHash } = JSON.parse(userData);
      const proof = await generate_proof(username, password);
      const isValid = await verify_proof(proof, passHash, username);

      if (isValid) {
        alert("Login successful!");
        setUsername("");
        setPassword("");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-green-500"
        >
          Login
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <a href="./RegisterForm.jsx" className="text-green-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </motion.div>
  );
};

// PropTypes validation
LoginForm.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default LoginForm;
