import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import UsersPage from '../page';
import { fetchUsers } from '../../../services/userService';

// Mock the userService
jest.mock('../../../services/userService', () => ({
  fetchUsers: jest.fn(),
  groupUsersByDepartment: jest.requireActual('../../../services/userService').groupUsersByDepartment,
}));

const mockUsers = {
  users: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      company: {
        department: 'IT',
        title: 'Developer',
      },
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      company: {
        department: 'HR',
        title: 'Manager',
      },
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      company: {
        department: 'IT',
        title: 'Designer',
      },
    },
  ],
  total: 3,
  skip: 0,
  limit: 10,
};

describe('UsersPage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (fetchUsers as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<UsersPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays users grouped by department', async () => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
    render(<UsersPage />);

    // Wait for the users to be loaded
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Check if departments are displayed
    expect(screen.getByText('IT (2)')).toBeInTheDocument();
    expect(screen.getByText('HR (1)')).toBeInTheDocument();

    // Check if users are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();

    // Check if job titles are displayed
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Manager')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  it('displays error message when API call fails', async () => {
    const errorMessage = 'Failed to fetch users';
    (fetchUsers as jest.Mock).mockRejectedValue(new Error(errorMessage));
    render(<UsersPage />);

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
