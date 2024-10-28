import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  const [isLogin, setIsLogin] = useState(true); // Default to login

  const toggleLogin = () => {
    setIsLogin((prev) => !prev); // Toggle the login state
  };

  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
            {isLogin ? "Login" : "Register"}
          </h2>
          <button 
            onClick={toggleLogin} 
            className="mb-4 text-green-600 hover:underline focus:outline-none"
          >
            {isLogin ? "Register" : "Login"}
          </button>
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </Router>
  );
};

export default App;
