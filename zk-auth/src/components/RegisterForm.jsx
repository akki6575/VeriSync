import { motion } from 'framer-motion';
import { useState } from "react";
import PropTypes from "prop-types";
import { get_pass_hash } from "../utils/AuthSystem.js";

const RegisterForm = ({ setLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const passHash = await get_pass_hash(password);
      const userData = { username, passHash };
      localStorage.setItem(username, JSON.stringify(userData));
      alert("Registration successful!");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
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
        Register
      </h2>
      <form onSubmit={handleRegister} className="space-y-4">
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
          Register
        </button>
      </form>
    </motion.div>
  );
};

RegisterForm.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default RegisterForm;
