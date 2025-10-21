import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="p-8">Loading users...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">All Users Data</h2>
      
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Mobile: {user.mobile}</h3>
                <p className="text-gray-600">Name: {user.name || 'Not set'}</p>
              </div>
              <div className="text-sm text-gray-500">
                <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                <p>Last Login: {new Date(user.lastLogin).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-semibold text-blue-800">Progress</h4>
                <p>Completed: {user.progress.completedLessons}</p>
                <p>Total: {user.progress.totalLessons}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-semibold text-green-800">Lessons</h4>
                <p>Count: {user.completedLessons.length}</p>
                {user.completedLessons.length > 0 && (
                  <p className="text-sm">Latest: {user.completedLessons[user.completedLessons.length - 1]}</p>
                )}
              </div>
              
              <div className="bg-purple-50 p-4 rounded">
                <h4 className="font-semibold text-purple-800">Practice Scores</h4>
                <p>Attempts: {user.progress.practiceScores.length}</p>
                {user.progress.practiceScores.length > 0 && (
                  <p className="text-sm">
                    Avg: {Math.round(user.progress.practiceScores.reduce((a, b) => a + b.score, 0) / user.progress.practiceScores.length)}%
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {users.length === 0 && (
        <p className="text-gray-500 text-center py-8">No users found</p>
      )}
    </div>
  );
};

export default AdminPanel;