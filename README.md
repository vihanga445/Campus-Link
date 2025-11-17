# CampusLink — Final Project

A campus community web app (CampusLink) for events, clubs, announcements, lost & found, user accounts, moderation, and notifications.

## Features
- Public pages: Home (carousel), Events, Clubs, Announcements, Lost & Found
- Post pages with images, event details, comments, share & calendar actions
- Authentication: sign up / sign in
- Moderation dashboard for users, moderators and admins
- Notifications with read/unread handling
- File uploads (images, approval documents)

## Tech stack
- Frontend: React (Vite), Tailwind CSS, react-router, Redux
- Backend: Node.js, Express, MongoDB (Mongoose)
- Icons: react-icons / FontAwesome
- Optional: Cloudinary (or similar) for file storage

## Prerequisites
- Node.js (>=14)
- npm or yarn
- MongoDB (local or Atlas)

## Quick setup (Windows)
1. Clone repository
   > git clone <repo-url> c:\Users\vihan\OneDrive\Desktop\final_project\final_project

2. Frontend
   > cd c:\Users\vihan\OneDrive\Desktop\final_project\final_project\Front
   > npm install
   > npm run dev

3. Backend
   > cd c:\Users\vihan\OneDrive\Desktop\final_project\final_project\Back
   > npm install
   > npm run dev

Adjust ports and env variables as needed.

## Environment variables (examples)
Back/.env:
```
MONGO_URI=your_mongo_uri
PORT=5000
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=cloudinary://key:secret@cloud_name
```

Front/.env:
```
VITE_BACKEND_URL=http://localhost:5000
VITE_APP_NAME=CampusLink
```

## Project structure (high level)
- Back/ — backend API (routes, controllers, models)
- Front/ — React app (src/components, src/Pages, assets)

## Useful commands
- Front: npm run dev — start Vite dev server
- Front: npm run build — create production build
- Back: npm run dev — start backend in dev (nodemon)
- Back: npm start — start backend

## Notes & tips
- Ensure frontend uses correct backend URL (VITE_BACKEND_URL).
- Install FontAwesome if used:
  > npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
- Use `object-contain` and `h-auto` on <img> to avoid cropping.
- Conditionally render UI (e.g., Sign In) using Redux `currentUser`.

## Testing & QA
- Manual functional tests: carousel, conditional buttons, notifications, moderation flows.
- Consider unit/integration tests: Jest, React Testing Library, supertest.

## Contributing
- Open issues for bugs/features.
- Use feature branches and PRs.

## License
Add a LICENSE file (e.g., MIT) if needed.
```// filepath: c:\Users\vihan\OneDrive\Desktop\final_project\final_project\README.md
// ...existing code...
# CampusLink — Final Project

A campus community web app (CampusLink) for events, clubs, announcements, lost & found, user accounts, moderation, and notifications.

## Features
- Public pages: Home (carousel), Events, Clubs, Announcements, Lost & Found
- Post pages with images, event details, comments, share & calendar actions
- Authentication: sign up / sign in
- Moderation dashboard for users, moderators and admins
- Notifications with read/unread handling
- File uploads (images, approval documents)

## Tech stack
- Frontend: React (Vite), Tailwind CSS, react-router, Redux
- Backend: Node.js, Express, MongoDB (Mongoose)
- Icons: react-icons / FontAwesome
- Optional: Cloudinary (or similar) for file storage

## Prerequisites
- Node.js (>=14)
- npm or yarn
- MongoDB (local or Atlas)

## Quick setup (Windows)
1. Clone repository
   > git clone <repo-url> c:\Users\vihan\OneDrive\Desktop\final_project\final_project

2. Frontend
   > cd c:\Users\vihan\OneDrive\Desktop\final_project\final_project\Front
   > npm install
   > npm run dev

3. Backend
   > cd c:\Users\vihan\OneDrive\Desktop\final_project\final_project\Back
   > npm install
   > npm run dev

Adjust ports and env variables as needed.

## Environment variables (examples)
Back/.env:
```
MONGO_URI=your_mongo_uri
PORT=5000
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=cloudinary://key:secret@cloud_name
```

Front/.env:
```
VITE_BACKEND_URL=http://localhost:5000
VITE_APP_NAME=CampusLink
```

## Project
