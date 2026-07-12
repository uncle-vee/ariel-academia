# Ariel Academia - Premium EdTech Platform

This is a premium, event-centric EdTech platform for **Ariel Academia** that centralizes event, school, and course registrations, simulated payments, resource delivery, certificate generation, newsletters, and marketing automation.

## Project Structure

- `index.html` - Single Page Application entrypoint and router shell.
- `index.css` - Custom premium CSS stylesheet with HSL dark/light modes.
- `app.js` - Client-side state manager (synchronized with `localStorage`) and router logic.
- `sw.js` - Service Worker for offline PWA resource delivery.
- `manifest.json` - PWA installation parameters.
- `components/`
  - `chatbot.js` - Floating AI Support assistant with handoff capabilities.
  - `pages.js` - Public facing templates (Home, Programs, Founder, Contact, Gallery, Verify, etc.).
  - `dashboard-user.js` - Interactive student portal with Canvas certificate renderer.
  - `dashboard-admin.js` - Staff dashboard with charts, manual admissions, and mail logs auditor.

## How to Run

1. Open a terminal in this directory.
2. Run the application locally using npm:
   ```bash
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`.

## Demo Accounts

To test the role-specific dashboards, use these credentials on the Login page (`#/login`):

- **Admin/Staff Dashboard**:
  - Email: `admin@ariel.edu`
  - Password: `admin123`
- **Student Dashboard**:
  - Email: `student@gmail.com`
  - Password: `student123`
- **Teacher Dashboard**:
  - Email: `teacher@school.org`
  - Password: `teacher123`
