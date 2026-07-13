/* ==========================================
   ARIEL ACADEMIA - CLIENT-SIDE ENGINE
   ========================================== */

import { initChatbot } from './components/chatbot.js';
import { renderPage } from './components/pages.js';
import { renderUserDashboard } from './components/dashboard-user.js';
import { renderAdminDashboard } from './components/dashboard-admin.js';

// Global Application State Class
class AppStore {
  constructor() {
    this.initDatabase();
  }

  initDatabase() {
    // Check and populate default courses & events
    const defaultEvents = [
      { id: 'tech4students', title: 'TECH4STUDENTS 2026', type: 'event', category: 'annual', price: 0, priceUSD: 0, school: 'Ariel Programs', desc: 'Empowering students across secondary and tertiary levels with essential digital skills.' },
      { id: 'tech4teachers', title: 'TECH4TEACHERS 2026', type: 'event', category: 'annual', price: 0, priceUSD: 0, school: 'Ariel Programs', desc: 'Equipping educators with advanced teaching tools, AI methodologies, and classroom management systems.' },
      { id: 'graphics-ai', title: 'Graphics Design with AI', type: 'course', category: 'aims', price: 10000, priceUSD: 15, school: 'School of AI', desc: 'Master prompt-based vector design, brand aesthetics, and modern marketing assets.' },
      { id: 'webapps-ai', title: 'WEBApps Design with AI', type: 'course', category: 'aims', price: 25000, priceUSD: 40, school: 'School of AI', desc: 'Build premium landing pages and fully functional front-ends directly with AI assistance.' },
      { id: 'media-ai', title: 'Professional Image & Video Gen', type: 'course', category: 'aims', price: 15000, priceUSD: 25, school: 'School of AI', desc: 'Generate high-fidelity cinematic outputs and video ads using Midjourney and Runway.' },
      { id: 'writing-ai', title: 'Content Writing with AI', type: 'course', category: 'aims', price: 10000, priceUSD: 15, school: 'School of AI', desc: 'Perfect your copy, email campaigns, academic writing, and SEO strategy via LLM workflows.' },
      { id: 'automation-ai', title: 'AI Automation & Agents', type: 'course', category: 'aims', price: 30000, priceUSD: 50, school: 'School of AI', desc: 'Deploy autonomous agents, hook up custom databases, and connect APIs to streamline business workflows.' },
      { id: 'comp-lit-basic', title: 'Essential Computer Literacy', type: 'course', category: 'comp-lit', price: 0, priceUSD: 0, school: 'School of Computer Literacy', desc: 'Navigate filesystems, master browser operations, and grasp cloud computing basics.' },
      { id: 'content-editing', title: 'Professional Video Editing', type: 'course', category: 'content-creation', price: 20000, priceUSD: 30, school: 'School of Content Creation', desc: 'Cut, grade, and structure engaging short-form/long-form content for social platforms.' }
    ];

    const defaultUsers = [
      { email: 'admin@ariel.edu', password: 'admin123', name: 'UncleVictor (Admin)', role: 'Admin', tags: ['Staff'] },
      { email: 'student@gmail.com', password: 'student123', name: 'Jane Doe', role: 'Student', tags: ['Student', 'AIMS'] },
      { email: 'teacher@school.org', password: 'teacher123', name: 'Dr. John Kay', role: 'Teacher', tags: ['Teacher', 'Tech4Teachers'] }
    ];

    const defaultRegistrations = [
      { id: 'reg_1', userEmail: 'student@gmail.com', eventId: 'tech4students', status: 'paid', price: 0, date: '2026-06-10', zoomLink: 'https://meet.google.com/abc-defg-hij' },
      { id: 'reg_2', userEmail: 'student@gmail.com', eventId: 'graphics-ai', status: 'paid', price: 10000, date: '2026-07-02', zoomLink: 'https://meet.google.com/xyz-pqrs-tuv' },
      { id: 'reg_3', userEmail: 'teacher@school.org', eventId: 'tech4teachers', status: 'paid', price: 0, date: '2026-06-15', zoomLink: 'https://meet.google.com/mno-rstu-vwx' }
    ];

    const defaultCertificates = [
      { id: 'ACAD-9A4B-3E7F', userEmail: 'student@gmail.com', eventId: 'tech4students', name: 'Jane Doe', eventTitle: 'TECH4STUDENTS 2026', issueDate: '2026-06-12', qrHash: 'ariel-verify-ACAD-9A4B-3E7F' }
    ];

    const defaultEmails = [
      { id: 'mail_1', to: 'student@gmail.com', subject: 'Registration Confirmed: TECH4STUDENTS', body: 'Hi Jane Doe,\n\nYour registration for TECH4STUDENTS 2026 is confirmed! Access link: https://meet.google.com/abc-defg-hij\n\nSee you there!\n- Ariel Academia Team', date: '2026-06-10 14:32' },
      { id: 'mail_2', to: 'student@gmail.com', subject: 'Your Certificate is Ready!', body: 'Hi Jane Doe,\n\nCongratulations on completing TECH4STUDENTS 2026! Your certificate is available on your dashboard for download.\n\nVerify Link: #/verify?id=ACAD-9A4B-3E7F\n\nBest,\nAriel Academia', date: '2026-06-12 18:00' }
    ];

    const defaultBlogs = [
      { id: 'blog_1', title: 'Empowering 5000 Teachers: Tech4Teachers Impact Report', date: 'July 5, 2026', desc: 'Read how our annual Tech4Teachers training is transforming classrooms across Nigeria and beyond with AI-powered curriculums.', author: 'UncleVictor', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%236366f1"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Outfit" font-size="28" fill="white">Tech4Teachers 2026</text></svg>' },
      { id: 'blog_2', title: 'The Rise of AI in EdTech: How Ariel Academia is Leading', date: 'June 28, 2026', desc: 'Exploring the deployment of prompt packs, visual generator workflows, and frontend automation models in digital learning.', author: 'UncleVictor', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2310b981"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Outfit" font-size="28" fill="white">AI in EdTech</text></svg>' },
      { id: 'blog_3', title: 'AIMS: Why Graphics Design with AI is a Must-Have Skill', date: 'May 14, 2026', desc: 'Unlock business value, automate design drafts, and scale creative branding operations utilizing modern AI frameworks.', author: 'Ariel Editorial', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23ec4899"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Outfit" font-size="28" fill="white">Graphics Design + AI</text></svg>' }
    ];

    const defaultMarketingFlows = [
      { id: 'flow_welcome', name: 'Welcome & Onboarding Sequence', trigger: 'User Signup', steps: [
        { type: 'delay', delay: 'Instant', label: 'Welcome Email (Ariel Storytelling)' },
        { type: 'delay', delay: '1 Day', label: 'Offer Free Computer Literacy Course' },
        { type: 'delay', delay: '3 Days', label: 'Invite to AI Mini School' }
      ] },
      { id: 'flow_payment', name: 'Tech4Teachers Post-Event Automation', trigger: 'Certificate Issued', steps: [
        { type: 'delay', delay: 'Instant', label: 'Deliver Certificate + Feedback Form' },
        { type: 'delay', delay: '2 Days', label: 'Upsell Content Writing with AI Course' }
      ] }
    ];

    const DB_VERSION = 2; // Increment this to force overwrite local storage defaults when code changes
    const currentDbVersion = localStorage.getItem('ariel_db_version');

    if (currentDbVersion !== String(DB_VERSION)) {
      // Overwrite static default database entities
      localStorage.setItem('ariel_events', JSON.stringify(defaultEvents));
      localStorage.setItem('ariel_blogs', JSON.stringify(defaultBlogs));
      localStorage.setItem('ariel_marketing', JSON.stringify(defaultMarketingFlows));
      localStorage.setItem('ariel_db_version', String(DB_VERSION));
      
      // Seed users and registrations only if they do not exist
      if (!localStorage.getItem('ariel_users')) localStorage.setItem('ariel_users', JSON.stringify(defaultUsers));
      if (!localStorage.getItem('ariel_registrations')) localStorage.setItem('ariel_registrations', JSON.stringify(defaultRegistrations));
      if (!localStorage.getItem('ariel_certificates')) localStorage.setItem('ariel_certificates', JSON.stringify(defaultCertificates));
      if (!localStorage.getItem('ariel_emails')) localStorage.setItem('ariel_emails', JSON.stringify(defaultEmails));
      if (!localStorage.getItem('ariel_subscribers')) localStorage.setItem('ariel_subscribers', JSON.stringify(['newsletter1@gmail.com', 'newsletter2@gmail.com']));
    } else {
      if (!localStorage.getItem('ariel_events')) localStorage.setItem('ariel_events', JSON.stringify(defaultEvents));
      if (!localStorage.getItem('ariel_users')) localStorage.setItem('ariel_users', JSON.stringify(defaultUsers));
      if (!localStorage.getItem('ariel_registrations')) localStorage.setItem('ariel_registrations', JSON.stringify(defaultRegistrations));
      if (!localStorage.getItem('ariel_certificates')) localStorage.setItem('ariel_certificates', JSON.stringify(defaultCertificates));
      if (!localStorage.getItem('ariel_emails')) localStorage.setItem('ariel_emails', JSON.stringify(defaultEmails));
      if (!localStorage.getItem('ariel_blogs')) localStorage.setItem('ariel_blogs', JSON.stringify(defaultBlogs));
      if (!localStorage.getItem('ariel_marketing')) localStorage.setItem('ariel_marketing', JSON.stringify(defaultMarketingFlows));
      if (!localStorage.getItem('ariel_subscribers')) localStorage.setItem('ariel_subscribers', JSON.stringify(['newsletter1@gmail.com', 'newsletter2@gmail.com']));
    }

    // Load session
    this.currentUser = JSON.parse(localStorage.getItem('ariel_current_user')) || null;
  }

  // Database helper methods
  get(key) { return JSON.parse(localStorage.getItem(`ariel_${key}`)); }
  set(key, val) { localStorage.setItem(`ariel_${key}`, JSON.stringify(val)); }

  login(email, password) {
    const users = this.get('users');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('ariel_current_user', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid email or password.' };
  }

  signup(name, email, password) {
    const users = this.get('users');
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered.' };
    }
    
    const newUser = { email, password, name, role: 'Student', tags: ['Student'] };
    users.push(newUser);
    this.set('users', users);
    
    // Auto-trigger welcome email marketing campaign
    this.sendSystemEmail(email, 'Welcome to Ariel Academia!', `Hi ${name},\n\nWelcome to Ariel Academia, the center for excellence in Digital Literacy and AI instruction.\n\nStart your journey today by exploring our AIMS classes! Check out your dashboard for upcoming resource files.\n\nBest wishes,\nUncleVictor`);

    this.currentUser = newUser;
    localStorage.setItem('ariel_current_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('ariel_current_user');
  }

  // System Email Logger
  sendSystemEmail(to, subject, body) {
    const emails = this.get('emails');
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    emails.unshift({ id: 'mail_' + Math.random().toString(36).substr(2, 9), to, subject, body, date: dateStr });
    this.set('emails', emails);
  }
}

// Global App Instance
window.App = new AppStore();

// Router Implementation
const routes = {
  '/': () => renderPage('home'),
  '/about': () => renderPage('about'),
  '/programs': () => renderPage('programs'),
  '/gallery': () => renderPage('gallery'),
  '/blog': () => renderPage('blog'),
  '/verify': () => renderPage('verify'),
  '/contact': () => renderPage('contact'),
  '/login': () => renderPage('login'),
  '/signup': () => renderPage('signup'),
  '/dashboard': () => renderUserDashboard(),
  '/admin': () => renderAdminDashboard(),
  '/privacy': () => renderPage('privacy'),
  '/terms': () => renderPage('terms')
};

// Route matching engine
function router() {
  const path = window.location.hash.slice(1) || '/';
  
  // Clean routing with sub-routes handling (e.g. blog detail or verify query)
  let routeHandler = routes[path];
  
  // Custom query parameters extraction
  const queryIndex = path.indexOf('?');
  let cleanPath = path;
  if (queryIndex !== -1) {
    cleanPath = path.substring(0, queryIndex);
    routeHandler = routes[cleanPath];
  }

  const appView = document.getElementById('app');
  appView.classList.add('page-fade-out');

  setTimeout(() => {
    // Clear screen loader
    appView.innerHTML = '';
    
    // Update active state of desktop navigation menu links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      if (linkRoute && (cleanPath === linkRoute || (cleanPath === '/' && linkRoute === '/'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (routeHandler) {
      routeHandler();
    } else {
      // 404 handler
      appView.innerHTML = `
        <div class="container" style="text-align: center; padding: 5rem 0;">
          <h1 class="hero-title" style="font-size: 6rem; color: var(--accent-pink);">404</h1>
          <h2>Page Not Found</h2>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">The link might be broken or the course page has moved.</p>
          <a href="#/" class="btn btn-primary">Return Home</a>
        </div>
      `;
    }
    appView.classList.remove('page-fade-out');
  }, 180);

  // Auto scroll to top
  window.scrollTo(0, 0);
  
  // Refresh header session buttons
  updateHeaderAuth();
}

// Function to dynamically update headers based on login session state
export function updateHeaderAuth() {
  const container = document.getElementById('auth-nav-container');
  const mobContainer = document.getElementById('mobile-auth-container');
  const user = window.App.currentUser;

  if (user) {
    const dashboardLink = user.role === 'Admin' ? '#/admin' : '#/dashboard';
    const authHtml = `
      <div style="display:flex; align-items:center; gap: 1rem;">
        <a href="${dashboardLink}" class="btn btn-secondary btn-sm">
          <i class="fa-solid fa-gauge"></i> Dashboard
        </a>
        <button id="logout-btn" class="btn btn-primary btn-sm" style="background: var(--accent-pink); box-shadow: none;">
          <i class="fa-solid fa-power-off"></i> Logout
        </button>
      </div>
    `;
    container.innerHTML = authHtml;
    mobContainer.innerHTML = `
      <a href="${dashboardLink}" class="mobile-nav-link" data-route="/dashboard"><i class="fa-solid fa-gauge"></i> Dashboard</a>
      <a href="#" id="mob-logout-btn" class="mobile-nav-link" style="color: var(--accent-pink);"><i class="fa-solid fa-power-off"></i> Logout</a>
    `;

    const triggerLogout = () => {
      window.App.logout();
      showToast('Logged out successfully', 'success');
      window.location.hash = '#/';
      updateHeaderAuth();
    };

    document.getElementById('logout-btn')?.addEventListener('click', triggerLogout);
    document.getElementById('mob-logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      triggerLogout();
      document.getElementById('mobile-menu').classList.remove('active');
    });
  } else {
    container.innerHTML = `<a href="#/login" class="btn btn-primary btn-sm"><i class="fa-solid fa-right-to-bracket"></i> Login</a>`;
    mobContainer.innerHTML = `<a href="#/login" class="mobile-nav-link" data-route="/login"><i class="fa-solid fa-right-to-bracket"></i> Login / Register</a>`;
  }
}

// Toast helper system mount
window.showToast = function(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideInLeft var(--transition-normal) reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// UI Toggles & Mobile Navigation listeners
document.addEventListener('DOMContentLoaded', () => {
  // Theme management logic
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('ariel_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.innerHTML = savedTheme === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('ariel_theme', targetTheme);
    themeToggle.innerHTML = targetTheme === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    showToast(`Switched to ${targetTheme} mode`, 'success');
  });

  // Mobile Drawer Toggle logic
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const menuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  menuToggle.addEventListener('click', () => mobileMenu.classList.add('active'));
  menuClose.addEventListener('click', () => mobileMenu.classList.remove('active'));

  // Close mobile drawer on route click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target.closest('.mobile-nav-link')) {
      mobileMenu.classList.remove('active');
    }
  });

  // PWA installation trigger
  let deferredPrompt;
  const pwaBadge = document.getElementById('pwa-install-badge');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    pwaBadge.style.display = 'inline-block';
  });

  pwaBadge.addEventListener('click', () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('Thank you for installing Ariel Academia App!', 'success');
      }
      deferredPrompt = null;
      pwaBadge.style.display = 'none';
    });
  });

  // Service worker check
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Ariel Academia Service Worker Registered'))
      .catch(err => console.error('Service Worker registration failed:', err));
  }

  // Launch Bot
  initChatbot(document.getElementById('chatbot-root'));
});

// App routing event listeners
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
