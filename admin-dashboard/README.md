# BTS Network Admin Dashboard

React web dashboard for managing The BTS Network platform.

## Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

## Installation

```bash
npm install
npm run dev
```

The dashboard will be available at `http://localhost:3000`

## Features

### User Management
- View pending BTS Connecté registrations
- Approve or reject student accounts
- Manage official student list

### Course Management
- Add, edit, delete subjects
- Manage chapters, lessons, exercises, exams
- Upload PDF files
- Changes reflect immediately in mobile app

### Notifications
- Send announcements to students
- Manage notification settings

### Reports
- View problem reports from students
- Update report status

### Monitoring
- View platform statistics
- Track user activity

## Admin Login

Use the admin email configured in backend `.env`:
- Email: `admin@btsnetwork.com` (or your ADMIN_EMAIL)
- Password: Your admin account password

## Configuration

Update the API URL in `src/services/api.ts`:

```typescript
const API_URL = 'http://your-backend-url:5000/api';
```

## Build for Production

```bash
npm run build
npm run preview
```

## Pages

- LoginPage - Admin authentication
- DashboardPage - Overview and quick access
- UsersPage - Pending user approvals
- CoursesPage - Course management
- NotificationsPage - Send announcements
- ReportsPage - View student reports

## Colors

- Primary: #0A1AFF (Blue)
- Secondary: #FFD43B (Yellow)
- Background: #F5F5F5 (Light Gray)
- Text: #333333 (Dark Gray)

## Security

- JWT authentication
- Protected routes
- Admin-only access
- Token stored in localStorage
