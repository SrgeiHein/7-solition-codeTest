# Interactive Item Management and User Directory

This Next.js application showcases two main features: an interactive item management system and a user directory grouped by departments.

## Features

### 1. Item Management Page (/)

- Interactive drag-and-drop interface for managing items
- Items can be moved between three columns:
  - Main List: Contains all available items
  - Fruit Column: Temporary storage for fruit items (5-second duration)
  - Vegetable Column: Temporary storage for vegetable items (5-second duration)
- Items automatically return to the main list after 5 seconds
- Items can be manually moved back by clicking them in their respective columns
- Responsive design with fixed column heights to prevent layout shifts

### 2. User Directory Page (/users)

- Fetches user data from [DummyJSON API](https://dummyjson.com/users)
- Groups users by their departments
- Features:
  - Dynamic department grouping
  - User cards showing:
    - Full name
    - Job title
    - Email address
  - Loading state with spinner
  - Error handling with user-friendly messages
  - Responsive grid layout
- Performance optimized with efficient data transformation

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the item management page
4. Visit [http://localhost:3000/users](http://localhost:3000/users) to see the user directory

## Testing

The application includes comprehensive tests for the user directory page. Run tests using:

```bash
npm test
```

Or run in watch mode:

```bash
npm run test:watch
```

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Jest & React Testing Library
- DummyJSON API

## Project Structure

```
src/
├── app/
│   ├── page.tsx                # Item management page
│   └── users/
│       ├── page.tsx           # User directory page
│       └── __tests__/         # User page tests
├── services/
│   └── userService.ts         # API and data transformation
└── types/
    └── user.ts               # TypeScript interfaces
```
