# 🩺 Doclynk – Doctor Appointment Booking System

An advanced full-stack doctor appointment booking system designed to seamlessly connect patients with doctors. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), Doclynk provides an intuitive, responsive, and feature-rich platform for modern healthcare management.

---

### Contents
- [Live Demo](#-live-demo)
- [⚡ Core Features](#-core-features)
- [💻 Technology Stack](#-technology-stack)
- [⚙️ Local Development Setup](#️-local-development-setup)
- [🛣️ Future Roadmap](#️-future-roadmap)
- [🤝 Contact](#-contact)

---

### 🚀 Live Demo

**(Link to your deployed Heroku/Vercel/Netlify site here)**

---


### ⚡ Core Features

**For Patients:**
- **Secure Authentication:** Easy registration and login with JWT.
- **Doctor Discovery:** Search for doctors and filter by specialty.
- **Detailed Profiles:** View doctor credentials, experience, fees, and availability.
- **Seamless Booking:** Interactive calendar to book appointments in available slots.
- **User Dashboard:** Manage personal profile information and view appointment history.
- **AI Assistant:** An integrated chatbot powered by the Gemini API to answer questions.

**For Admins/Doctors:**
- **Admin Dashboard:** Centralized panel to view all appointments and manage doctor listings.
- **Doctor Dashboard:** Centralized panel to view all appointments and manage patient listings.
- **Appointment Management:** Admins can view and cancel appointments system-wide.
- **Doctor Management:** Admins can add new doctors to the platform.

---

### 💻 Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, React Router, Axios |
| **Backend** | Node.js, Express.js, JWT Authentication |
| **Database** | MongoDB with Mongoose |
| **APIs & Services** | Google Gemini API, EmailJS |
| **Image Hosting**| Cloudinary |

---

### ⚙️ Local Development Setup

Follow these steps to get the project running on your local machine.

**1. Prerequisites**
- Node.js (v18 or later)
- npm or yarn
- Git
- A MongoDB instance (local or a free Atlas account)

**2. Clone the Repository**
```bash
git clone https://github.com/Satthvik1026/Doclynk-Doctor-Appointment-Booking-System.git
cd Doclynk-Doctor-Appointment-Booking-System
```

**3. Configure the Backend**

- Navigate to the backend directory and install dependencies
```bash
cd backend
npm install
```

**4. Configure the Frontend**

- Navigate to the frontend directory install dependencies

```bash
cd frontend
npm install
```

**5. Configure the Admin Panel**
- Navigate to the admin directory install dependencies
```bash
cd admin
npm install
```

**6. Run the Application**

Start the Backend Server: In the backend directory, run:

```bash
npm start server
```

Start the Frontend App: In a separate terminal, from the frontend directory, run:

```bash
npm run dev
```

Start the Admin App: In a separate terminal, from the admin directory, run:
```bash
npm run dev
```

The application should now be live, with the frontend at http://localhost:5173 , backend server at http://localhost:4000 and admin panel at http://localhost:5174.

---

### 🛣️ Future Roadmap
[ ] Implement online payment integration (e.g., Stripe or Razorpay).

[ ] Add real-time notifications for appointment reminders.

[ ] Allow patients to write reviews for doctors.

---

### 🤝 Contact
Sathvik - [https://www.linkedin.com/in/sathvik-kaparthi] - [satthvik1026@gmail.com]

Project Link: https://github.com/Satthvik1026/Doclynk-Doctor-Appointment-Booking-System
