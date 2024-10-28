import { useState } from "react";
import { createProof, verifyZKProof } from "../utils/zkAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password.");
      return;
    }

    const hashedPassword = localStorage.getItem(username);

    if (!hashedPassword) {
      alert("User not found!");
      return;
    }

    setLoading(true);
    try {
      const proof = await createProof(username, password);
      console.log("Generated proof:", proof);
      
      if (!proof) {
        throw new Error("Proof generation failed. Please check the inputs.");
      }

      const isVerified = await verifyZKProof(proof, hashedPassword, username);
      if (isVerified) {
        alert("Login successful!");
        // Proceed with login success actions (e.g., redirect)
      } else {
        alert("Login failed! Invalid credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed due to an error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-80 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold text-center text-green-600">Login</h2>
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
        onClick={handleLogin}
        disabled={loading}
        className={`mt-4 bg-green-600 text-white p-2 w-full rounded-md transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"}`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
