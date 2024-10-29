import PropTypes from 'prop-types';

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="flex space-x-4 mb-6">
    <button
      className={`flex-1 py-2 text-center rounded-lg transition duration-300 ${activeTab === 'register' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700'}`}
      onClick={() => setActiveTab('register')}
    >
      Register
    </button>
    <button
      className={`flex-1 py-2 text-center rounded-lg transition duration-300 ${activeTab === 'login' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700'}`}
      onClick={() => setActiveTab('login')}
    >
      Login
    </button>
  </div>
);



Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,     // Validates `activeTab` as a required string
  setActiveTab: PropTypes.func.isRequired,    // Validates `setActiveTab` as a required function
};

export default Tabs;
