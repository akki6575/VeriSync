import { useState } from 'react';
import Tabs from './components/Tabs';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import LoadingIndicator from './components/LoadingIndicator';  // Default import

const App = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {loading && <LoadingIndicator />}
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'register' ? (
          <RegisterForm setLoading={setLoading} />
        ) : (
          <LoginForm setLoading={setLoading} />
        )}
      </div>
    </div>
  );
};

export default App;
