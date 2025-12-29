// ThemeToggle.tsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons from react-icons

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className=" text-gray-800 dark:text-gray-200 px-4 py-2 rounded">
       {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />} {/* Use icons instead of text */}
    </button>
  );
};

export default ThemeToggle;
