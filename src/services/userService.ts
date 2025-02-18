import { User, UserResponse, DepartmentGroup } from '../types/user';

export const fetchUsers = async (): Promise<UserResponse> => {
  try {
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const groupUsersByDepartment = (users: User[]): DepartmentGroup => {
  return users.reduce((groups: DepartmentGroup, user: User) => {
    const department = user.company.department;
    if (!groups[department]) {
      groups[department] = [];
    }
    groups[department].push(user);
    return groups;
  }, {});
};
