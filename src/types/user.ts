export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: {
    department: string;
    title: string;
  };
}

export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export type DepartmentGroup = Record<string, User[]>;
