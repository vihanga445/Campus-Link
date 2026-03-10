# CampusLink — Final Project

Short summary:
A campus community web app (CampusLink) with event posts, clubs, announcements, lost & found, user accounts, moderation dashboard and notifications. Frontend is a React (Vite/Tailwind) app and backend is a Node/Express API (MongoDB).

## Features
- Public pages: Home (carousel), Events, Clubs, Announcements, Lost & Found
- Post pages with images, event details, comments, share & calendar actions
- Authentication (signup / signin)
- Dashboard for users, moderators and admins (approve/reject posts)
- Notifications with read/unread handling
- File uploads (images, approval documents)

## Tech stack
- Frontend: React, Vite, Tailwind CSS, react-router, redux
- Backend: Node.js, Express, MongoDB (Mongoose)
- Icons: react-icons / FontAwesome
- Optional: Cloudinary (or similar) for file storage

## Prerequisites
- Node.js (>=14)
- npm or yarn
- MongoDB instance (local or Atlas)
  
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
   (or `npm start` if configured)

Adjust ports if needed and start both frontend and backend.



## Project structure (high level)
- Back/ — backend API (routes, controllers, models)
- Front/ — React app (src/components, src/Pages, assets)
- README.md — this file

## Common commands
- Front: npm run dev — start Vite dev server
- Front: npm run build — produce production build
- Back: npm run dev — start backend in dev (nodemon)
- Back: npm start — start production server




