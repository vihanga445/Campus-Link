# 🎓 CampusLink — Social Media Platform for University Students



## 📖 About

CampusLink is a full-stack social media web application designed to streamline communication and increase student engagement at the University of Ruhuna. It consolidates fragmented communication channels (WhatsApp groups, Facebook posts, notice boards) into a single, moderated platform where students can discover events, join clubs, report lost items, and stay updated on announcements.

---

## ✨ Features

### 👤 For Students
- **User Authentication** — Sign up / sign in with email & password or Google OAuth
- **Profile Management** — Update profile picture, username, email, and password
- **Events** — Browse, search, filter, create, save, and register for campus events; add events to Google Calendar
- **Clubs & Societies** — Discover clubs by category, apply for membership, and create new clubs
- **Lost & Found** — Report lost or found items with images and location; contact reporters; mark items as found/returned
- **Announcements** — View university-wide announcements filtered by category, priority, and date
- **Notifications** — Real-time in-app alerts for post approvals, event updates, and more
- **Dark Mode** — Toggle between light and dark themes
- **Invite Friends** — Invite peers to the platform via email

### 🛡️ For Moderators
| Role | Responsibilities |
|------|-----------------|
| **Event Moderator** | Review, approve/reject, edit, delete, and feature events |
| **Club Moderator** | Approve/reject new club requests and moderate club posts |
| **Lost & Found Moderator** | Review lost/found submissions and validate return requests |
| **Announcement Moderator** | Create, review, edit, and publish university announcements |

### ⚙️ For Admins
- Full user management (create, update, deactivate accounts; assign roles)
- Content oversight across all categories
- System settings and configuration
- Analytics and platform usage monitoring

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (via Mongoose) |
| **Media Storage** | Cloudinary |
| **Authentication** | JWT + Google OAuth |
| **API Testing** | Postman / Insomnia |
| **Version Control** | Git & GitHub |
| **Styling** | Tailwind CSS |

---

## 🏗️ System Architecture

CampusLink follows the **MERN stack** architecture:

```
Browser (React UI)
       ↕  HTTP Requests (Axios / Fetch API)
   Express.js API Server (Node.js)
       ↕  Mongoose ORM
     MongoDB Database
       ↕
   Cloudinary (Media Storage)
```

**Request Flow:**
- `GET` — Retrieve data (events, clubs, announcements, lost items)
- `POST` — Create new records (submit posts, join clubs, report items)
- `PUT` — Update existing records (edit profile, mark item as found)
- `DELETE` — Remove records (delete posts, withdraw membership)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)
- Cloudinary account
- Google OAuth credentials (optional, for Google sign-in)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/vihanga445/Campus-Link.git
cd campuslink
```

**2. Install backend dependencies**
```bash
cd Back
npm install
```

**3. Install frontend dependencies**
```bash
cd ../Front
npm install
```



**5. Run the development servers**

Backend:
```bash
cd Back
npm run dev
```

Frontend (in a new terminal):
```bash
cd Front
npm run dev
```


---


## 👥 User Roles

| Role | Access Level | Description |
|------|-------------|-------------|
| `student` | Standard | Primary users — can post, browse, apply, and interact |
| `moderator_event` | Elevated | Reviews and manages event posts |
| `moderator_club` | Elevated | Reviews and manages club registrations |
| `moderator_lostfound` | Elevated | Reviews lost & found reports |
| `moderator_announcement` | Elevated | Creates and manages announcements |
| `admin` | Full | Complete platform oversight and user management |

---

## 🧪 Testing

The following testing strategies were applied:

- **Functional Testing** — Verified all links, forms, CRUD operations, login, and role-based access
- **Usability Testing** — Assessed navigation clarity, UI responsiveness, and accessibility compliance
- **Backend / API Testing** — Used Insomnia to test all REST endpoints (GET, POST, PUT, DELETE) with data validation and JWT auth checks
- **End-to-End Testing** — Validated complete user workflows using browser DevTools network inspection

---

## 📊 Survey Findings

Requirements were gathered from **69 University of Ruhuna students**. Key findings:

- **66.7%** currently rely on social media to find campus updates
- **69.6%** have missed important events due to lack of a centralized source
- **91.3%** want to use an app to apply for part-time jobs
- **97.1%** would use a digital platform to report or find lost items
- **98.6%** would recommend a campus centralisation app to other students

---

## 🔮 Future Work

- 📱 **Mobile Application** (React Native / Flutter) with push notifications
- 📊 **Advanced Analytics Dashboard** for event organizers and admins
- 🤖 **AI-Powered Content Moderation** for automated post screening
- 📍 **IoT Integration** — RFID tracking for lost items, QR code event check-ins
- 💳 **Online Payment Gateway** for event ticketing
- 🌐 **Multi-Language Support** for international students
- 💬 **AI Chatbot** for instant student assistance
- 📚 **Course Groups & Study Forums** for academic collaboration

---

## 📄 License

This project was developed for academic purposes at the **University of Ruhuna, Department of Computer Science**.

---

## 🙏 Acknowledgements

Special thanks to **Dr. Sugandima Vidanagamachchi** for her guidance throughout the development process, and to all University of Ruhuna students who participated in our requirements survey.

---
