import { motion } from 'framer-motion';

const LoadingIndicator = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <motion.div
      className="loader border-8 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

export default LoadingIndicator;  