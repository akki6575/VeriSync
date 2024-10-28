import { useState } from 'react';
import { hashPassword } from '../utils/zkAuth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Trim inputs to avoid whitespace-only usernames or passwords
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      alert("Please enter both username and password.");
      return;
    }

    // Check if the username already exists in localStorage
    if (localStorage.getItem(trimmedUsername)) {
      alert("Username already exists. Please choose a different username.");
      return;
    }

    try {
      const hashedPassword = await hashPassword(trimmedPassword);
      localStorage.setItem(trimmedUsername, hashedPassword); // Simulating backend storage
      alert('Registration successful!');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-80 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold text-center text-green-600">Register</h2>
      <input
        type="text"
        placeholder="Username"
        className="mt-4 w-full p-2 border border-gray-300 rounded-md"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="mt-4 w-full p-2 border border-gray-300 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        onClick={handleRegister}
        className="mt-4 bg-green-600 text-white p-2 w-full rounded-md transition-colors duration-300 hover:bg-green-700"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
