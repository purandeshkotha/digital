import React from 'react';
import { CheckCircle } from 'lucide-react';

const TaskList = ({ tasks, completedTasks = [], currentTask = 0, onTaskComplete }) => {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border-2 transition-all ${
            completedTasks.includes(index)
              ? 'border-green-500 bg-green-50'
              : index === currentTask
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm font-semibold ${
                completedTasks.includes(index) ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {completedTasks.includes(index) ? '✓' : index + 1}
              </div>
              <span className={`font-medium ${
                completedTasks.includes(index) ? 'text-green-800' : 'text-gray-900'
              }`}>
                {typeof task === 'string' ? task : task.text}
              </span>
            </div>
            {onTaskComplete && index === currentTask && !completedTasks.includes(index) && (
              <button
                onClick={() => onTaskComplete(index)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Mark Complete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;