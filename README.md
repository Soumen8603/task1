# Company Registration Module

This is a MERN stack project implementing a company registration and management module with a user dashboard. It supports secure authentication, multi-step onboarding, company profile creation, logo/banner uploads, social media linking, and profile editing.

---

## Features

- User authentication using JWT.
- Multi-step registration wizard for company onboarding:
  - Upload company logo and banner.
  - Fill out company information (name, industry, type, team size, website).
  - Add social media profile links.
- Persistent company profile state stored in PostgreSQL.
- Dashboard displaying company details with editing capabilities.
- Instant dashboard updates after profile changes.
- Frontend built with React and Redux Toolkit.
- Backend powered by Node.js, Express, and PostgreSQL.
- File uploads handled through Cloudinary integration.
- State persistence with localStorage for seamless user experience.

---

## Technologies Used

- Frontend: React, Redux Toolkit, Material-UI
- Backend: Node.js, Express.js, PostgreSQL, Cloudinary
- Authentication: JWT Tokens
- Development Tools: VS Code, Postman, Git/GitHub

---

## Project Structure Overview

- **backend/src**: Express server code with API routes, controllers, middlewares, and database models.
- **frontend/src**: React app with components for Dashboard, Registration Wizard, Company Profile, and Redux slices for auth and company state.
- **config**: Configuration files for database and cloudinary setup.
- **store**: Redux slices and store configuration.
- **api**: Service files for API communication from frontend.

---

## Setup & Run

### Backend

1. Set up your PostgreSQL database.
2. Rename `.env.example` to `.env` and provide your DB credentials and JWT secret.
3. Run:
cd backend
npm install
npm run dev
4. Server starts on `http://localhost:5001`

### Frontend

1. Run:
cd frontend
npm install
npm start
2. React app runs on `http://localhost:5173`

---

## Usage

- Register or log in to your user account.
- If no company exists, the registration wizard starts automatically.
- Complete the wizard steps: upload logo/banner, fill company info, add social links.
- View, edit, or update your company profile from the dashboard.
- Changes are saved instantly with real-time UI updates.

---

## Future Enhancements

- Support for multiple companies per user with add/delete functionality.
- Role-based access control (admin, user capabilities).
- Enhanced validation and error handling.
- Responsive design improvements.
- Integration with third-party APIs for company info enrichment.

---

## Author

- [Soumen Pal] - SDE Intern

---

