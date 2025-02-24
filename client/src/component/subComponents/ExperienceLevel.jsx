import React, { useState } from 'react';

const ExperienceLevel = ({ onLevelChange }) => {
  const [level, setLevel] = useState('intermediate');
  const levels = [
    { id: 'beginner', label: 'Beginner', color: 'bg-green-200' },
    { id: 'intermediate', label: 'Intermediate', color: 'bg-blue-200' },
    { id: 'expert', label: 'Expert', color: 'bg-purple-200' }
  ];

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    onLevelChange?.(newLevel);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 dark:text-white">Experience Level</h3>
      <div className="flex gap-4">
        {levels.map((item) => (
          <button
            key={item.id}
            onClick={() => handleLevelChange(item.id)}
            className={`px-4 py-2 rounded-lg transition-all ${
              level === item.id 
                ? `${item.color} dark:bg-opacity-50 ring-2 ring-offset-2 ring-${item.color}`
                : 'bg-gray-100 dark:bg-gray-700'
            } dark:text-white`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};