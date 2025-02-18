'use client';

import { useEffect, useState } from 'react';
import { User } from '../../types/user';
import { fetchUsers, groupUsersByDepartment } from '../../services/userService';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const groupedUsers = groupUsersByDepartment(users);
  const departments = Object.keys(groupedUsers).sort();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div 
          role="status"
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Users by Department
      </h1>
      <div className="space-y-8">
        {departments.map((department) => (
          <div key={department} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {department} ({groupedUsers[department].length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedUsers[department].map((user) => (
                <div
                  key={user.id}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-gray-800">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{user.company.title}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
