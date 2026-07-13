/* ==========================================
   ARIEL ACADEMIA - PUBLIC-FACING PAGES
   ========================================== */

import { updateHeaderAuth } from '../app.js';

export function renderPage(pageId) {
  const app = document.getElementById('app');
  
  switch(pageId) {
    case 'home':
      renderHome(app);
      break;
    case 'about':
      renderAbout(app);
      break;
    case 'programs':
      renderPrograms(app);
      break;
    case 'gallery':
      renderGallery(app);
      break;
    case 'blog':
      renderBlog(app);
      break;
    case 'verify':
      renderVerify(app);
      break;
    case 'contact':
      renderContact(app);
      break;
    case 'login':
      renderLogin(app);
      break;
    case 'signup':
      renderSignup(app);
      break;
    case 'privacy':
      renderStaticPage(app, 'Privacy Policy', 'Your privacy is important to us. Ariel Academia will never sell your personal information or spam your email inbox. Data collected during registration is used purely to unlock courses, generate certificates, and issue webinar reminders.');
      break;
    case 'terms':
      renderStaticPage(app, 'Terms of Service', 'By enrolling in courses or attending annual webinars at Ariel Academia, you agree to respect academic integrity. Resources distributed (recordings, templates, prompt packs) are for personal use only. Sharing materials publicly is prohibited.');
      break;
  }
}

// -------------------------------------------------------------
// HOME PAGE
// -------------------------------------------------------------
function renderHome(container) {
  container.innerHTML = `
    <!-- Hero Header -->
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-badge"><i class="fa-solid fa-fire"></i> Tech education that transforms</div>
          <h1 class="hero-title">Empowering the Next Generation of <span class="text-gradient">Tech Leaders</span></h1>
          <p class="hero-description">
            Welcome to Ariel Academia, the home of <strong>The Digital Literacy Schools</strong>. Master AI engineering, content creation, and computer fluency through hands-on bootcamps and annual global events.
          </p>
          <div class="hero-actions">
            <a href="#/programs" class="btn btn-primary"><i class="fa-solid fa-graduation-cap"></i> Explore Programs</a>
            <a href="#/about" class="btn btn-secondary"><i class="fa-solid fa-magnifying-glass"></i> Meet UncleVictor</a>
          </div>
          
          <div class="hero-stats">
            <div class="stat-box">
              <h3>5,000+</h3>
              <p>Students Empowered</p>
            </div>
            <div class="stat-box">
              <h3>3,000+</h3>
              <p>Teachers Trained</p>
            </div>
            <div class="stat-box">
              <h3>100%</h3>
              <p>Practical Labs</p>
            </div>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="glass-card hero-glow-card">
            <img class="hero-card-img" src="assets/unclevictor.png,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='600' height='400' fill='%230f172a'/><circle cx='300' cy='200' r='120' fill='none' stroke='%236366f1' stroke-width='4'/><path d='M250 200 L350 200 M300 150 L300 250' stroke='%2310b981' stroke-width='4'/><text x='50%' y='85%' dominant-baseline='middle' text-anchor='middle' font-family='Outfit' font-size='20' fill='%236366f1'>Ariel Academia Center</text></svg>" alt="Ariel Learning Hub">
            <div class="hero-card-content">
              <h3>Next-Gen Learning Portal</h3>
              <p style="color:var(--text-secondary); font-size:0.9rem; margin-top:0.25rem;">
                Access live webinars, automated credentials, and private asset vaults on any mobile or desktop screen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- The Digital Literacy Schools Overview -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Core Pillars</span>
          <h2 class="section-title">The Digital Literacy Schools</h2>
          <p style="color:var(--text-secondary);">We scale digital competency into targeted specialized schools tailored for modern career relevance.</p>
        </div>
        
        <div class="features-grid">
          <div class="glass-card feature-card">
            <div class="feature-icon"><i class="fa-solid fa-keyboard"></i></div>
            <h3>School of Computer Literacy</h3>
            <p>Master desktop operating systems, cloud productivity sheets, and fundamental safety practices essential for any workplace.</p>
          </div>
          
          <div class="glass-card feature-card alt">
            <div class="feature-icon"><i class="fa-solid fa-brain"></i></div>
            <h3>School of AI (AIMS)</h3>
            <p>Our AI Mini School provides five intense tracks covering graphics automation, video synthesis, content writing, and custom agent programming.</p>
          </div>
          
          <div class="glass-card feature-card">
            <div class="feature-icon" style="color:var(--accent-pink); background:rgba(236,72,153,0.1); border-color:rgba(236,72,153,0.2);"><i class="fa-solid fa-photo-film"></i></div>
            <h3>School of Content Creation</h3>
            <p>Translate ideas into viral assets. Master professional video editing, lighting setup, audio processing, and personal branding models.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Annual Impact Highlights -->
    <section class="features-section" style="background:var(--bg-secondary); border-top:1px solid var(--border-color); border-bottom:1px solid var(--border-color);">
      <div class="container" style="display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center;">
        <div>
          <img style="border-radius:var(--radius-lg); box-shadow:var(--glass-shadow);" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='600' height='400' fill='%2310b981'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Outfit' font-size='24' fill='white'>Impact Seminars & Webinars</text></svg>" alt="Tech4Teachers Impact">
        </div>
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <span class="section-subtitle" style="color:var(--accent-indigo);">Annual Social Footprint</span>
          <h2 class="section-title" style="font-size:2rem;">TECH4STUDENTS & TECH4TEACHERS</h2>
          <p style="color:var(--text-secondary);">
            Every year, Ariel Academia hosts massive digital bootcamps for thousands of students and teachers absolutely free. We distribute prompt templates, record specialized tutorials, and grant verifiable credentials.
          </p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:0.75rem; color:var(--text-secondary);">
            <li><i class="fa-solid fa-circle-check" style="color:var(--accent-emerald); margin-right:0.5rem;"></i> Free access to live Q&amp;A zoom masterclasses</li>
            <li><i class="fa-solid fa-circle-check" style="color:var(--accent-emerald); margin-right:0.5rem;"></i> Automatical generation of certificates with QR checks</li>
            <li><i class="fa-solid fa-circle-check" style="color:var(--accent-emerald); margin-right:0.5rem;"></i> Post-event resource packs &amp; recordings vault</li>
          </ul>
          <a href="#/programs" class="btn btn-primary" style="align-self:flex-start; margin-top:1rem;">Register for Next Event</a>
        </div>
      </div>
    </section>

    <!-- Testimonials Slider -->
    <section class="testimonials-section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Reviews</span>
          <h2 class="section-title">Success Stories</h2>
          <p style="color:var(--text-secondary);">Here is what business owners, school administrators, and students say about Ariel Academia.</p>
        </div>
        
        <div class="testimonials-grid">
          <div class="glass-card testimonial-card">
            <div class="test-stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="test-quote">
              "Before I met Mr. Victor, I thought AI was something only engineers needed to understand. He broke it down with such warmth and clarity that I walked out of his workshop knowing that I could actually use these tools to transform my classroom. He doesn't just train — he inspires."
            </p>
            <div class="test-author">
              <div class="test-author-img" style="background:var(--accent-indigo); display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">OO</div>
              <div>
                <h4 class="test-author-name">Mr. Didam</h4>
                <p class="test-author-title">Secondary School Teacher</p>
              </div>
            </div>
          </div>
          
          <div class="glass-card testimonial-card">
            <div class="test-stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="test-quote">
              "Attending TECH4TEACHERS was the turning point in my teaching career. I learned to structure exams and generate lesson presentations using AI templates."
            </p>
            <div class="test-author">
              <div class="test-author-img" style="background:var(--accent-emerald); display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">CN</div>
              <div>
                <h4 class="test-author-name">Miss. Grace.</h4>
                <p class="test-author-title">High School Educator, Abuja</p>
              </div>
            </div>
          </div>
          
          <div class="glass-card testimonial-card">
            <div class="test-stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="test-quote">
              "Working with Mr. Victor as our school's academic consultant was one of the best decisions our administration ever made. His strategic insight, combined with his genuine love for education, resulted in visible improvements in both teacher performance and student engagement within just one term.."
            </p>
            <div class="test-author">
              <div class="test-author-img" style="background:var(--accent-pink); display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">TK</div>
              <div>
                <h4 class="test-author-name">Mrs. Kola</h4>
                <p class="test-author-title">School Principal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Marketing Newsletter Signup Segment -->
    <section class="features-section" style="border-top:1px solid var(--border-color);">
      <div class="container">
        <div class="glass-card" style="padding:3.5rem; text-align:center; max-width:850px; margin:0 auto; display:flex; flex-direction:column; gap:1.5rem; background:radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 80%);">
          <h2 class="section-title">Subscribe to the Ariel Academia Newsletter</h2>
          <p style="color:var(--text-secondary); max-width:600px; margin:0 auto;">
            Get free AI prompt packs, tutorials, and early enrollment announcements for our annual events directly in your inbox. No spam.
          </p>
          <form id="newsletter-form" style="display:flex; gap:1rem; max-width:550px; margin:1rem auto 0 auto; width:100%; flex-wrap:wrap;">
            <input type="email" id="newsletter-email" class="form-control" placeholder="Enter your email address" required style="flex:1; min-width:250px;">
            <button type="submit" class="btn btn-primary" style="margin:0 auto;"><i class="fa-solid fa-paper-plane"></i> Subscribe Now</button>
          </form>
        </div>
      </div>
    </section>
  `;

  // Attach Newsletter submission listener
  document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    const subs = window.App.get('subscribers');
    
    if (subs.includes(email)) {
      window.showToast('You are already subscribed!', 'success');
      return;
    }
    
    subs.push(email);
    window.App.set('subscribers', subs);
    
    // Log automation welcome newsletter email
    window.App.sendSystemEmail(email, 'Subscribed: Ariel Academia Newsletter', `Hi there,\n\nThanks for signing up to the Ariel Academia Newsletter!\n\nYou'll receive monthly digests full of prompt packs, video guides, and exclusive course discounts.\n\nWarm regards,\nUncleVictor`);

    window.showToast('Subscription successful! Check your email.', 'success');
    document.getElementById('newsletter-email').value = '';
  });
}

// -------------------------------------------------------------
// ABOUT & FOUNDER PAGE
// -------------------------------------------------------------
function renderAbout(container) {
  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Our Journey</span>
        <h1 class="section-title">About Ariel Academia</h1>
        <p style="color:var(--text-secondary);">Empowering individuals and schools in digital literacy and artificial intelligence applications.</p>
      </div>

      <div class="founder-layout" style="margin-bottom:5rem;">
        <div class="founder-profile-img-block">
          <div class="glass-card" style="padding:1rem;">
            <img class="founder-img" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='350' height='450' viewBox='0 0 350 450'><rect width='350' height='450' fill='%236366f1'/><circle cx='175' cy='180' r='80' fill='%230f172a'/><path d='M80 360 C80 280 270 280 270 360' fill='%230f172a'/><text x='50%' y='92%' dominant-baseline='middle' text-anchor='middle' font-family='Outfit' font-size='22' fill='white'>UncleVictor</text></svg>" alt="UncleVictor - Founder">
          </div>
          <h3 style="margin-top:1.5rem;">UncleVictor</h3>
          <p style="color:var(--text-muted); font-size:0.9rem;">Founder, Ariel Academia</p>
        </div>

        <div class="founder-story">
          <h2>Bridging the Digital Divide</h2>
          <p>
            Ariel Academia was founded with a clear, singular vision: to make high-quality, practical tech education accessible to every student, teacher, entrepreneur and institution, regardless of location or prior skills. We believe that technology should be an equalizer, not a barrier.
          </p>
          <div class="founder-quote">
            "True digital literacy is not just knowing how to operate tools; it is understanding how to apply technology to solve local problems, automate businesses, and elevate how we educate the next generation."
          </div>
          <p>
            Through our specialized training cohorts, namely: <strong>AI Mini School</strong>, <strong>School of Computer Literacy</strong>, <strong>School of Content Creation</strong>, and our premier <strong>School of AI</strong>, we train our students in direct, portfolio-driven modules. We also maintain a solid social commitment, hosting two annual free bootcamps: <strong>TECH4STUDENTS</strong> and <strong>TECH4TEACHERS</strong>.
          </p>
          
          <h3 style="margin-top:2.5rem; margin-bottom:1rem;">Our Core Principles</h3>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
            <div class="glass-card" style="padding:1.5rem;">
              <h4 style="color:var(--accent-emerald); margin-bottom:0.5rem;"><i class="fa-solid fa-bolt"></i> Action-Oriented</h4>
              <p style="font-size:0.9rem; color:var(--text-secondary);">We don't teach abstract theories. Every single module involves building an asset, script, or model.</p>
            </div>
            <div class="glass-card" style="padding:1.5rem;">
              <h4 style="color:var(--accent-indigo); margin-bottom:0.5rem;"><i class="fa-solid fa-lock"></i> Verifiable Value</h4>
              <p style="font-size:0.9rem; color:var(--text-secondary);">Every certificate issued is recorded on our public ledger and verified instantly via custom QR portals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PROGRAMS & REGISTRATION
// -------------------------------------------------------------
function renderPrograms(container) {
  const events = window.App.get('events');
  const user = window.App.currentUser;

  // Split programs by category
  const compLit = events.filter(e => e.category === 'comp-lit');
  const AI = events.filter(e => e.category === 'AI');
  const content = events.filter(e => e.category === 'content-creation');
  const annual = events.filter(e => e.category === 'annual');

  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Academic Portals</span>
        <h1 class="section-title">Programs &amp; Course Registration</h1>
        <p style="color:var(--text-secondary);">Register for courses or events below. Dashboard content and resource links will unlock instantly upon checkout.</p>
      </div>

      <!-- Sandbox Payment Gateway Modal (Initially hidden) -->
      <div id="payment-modal" class="app-modal">
        <div class="glass-card modal-body">
          <div class="modal-header">
            <h3>Secure Sandbox Checkout</h3>
            <button id="close-payment-modal" class="modal-close"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="modal-content-area" id="payment-modal-body">
            <!-- Populated dynamically by JS -->
          </div>
        </div>
      </div>

      <div class="programs-grid">
        
        <!-- School of AI  -->
        <div class="glass-card school-block ai">
          <div class="school-header">
            <div class="school-info">
              <h2 class="school-title">School of AI</h2>
              <p class="school-desc">The School of AI comprises four separate high-fidelity courses empowering creatives, designers, writers, and developer enthusiasts.</p>
            </div>
            <span class="hero-badge" style="background:rgba(16,185,129,0.15); border-color:rgba(16,185,129,0.3); color:var(--accent-emerald);">Active Cohort</span>
          </div>

          <div class="courses-subgrid">
            ${aims.map(course => renderCourseCardHTML(course, user)).join('')}
          </div>
        </div>

        <!-- Annual Events -->
        <div class="glass-card school-block" style="border-left-color: var(--accent-pink);">
          <div class="school-header">
            <div class="school-info">
              <h2 class="school-title">Annual Flagship Programs</h2>
              <p class="school-desc">Our annual societal impact seminars bridging the gap for students and teachers. Registration is 100% free.</p>
            </div>
            <span class="hero-badge" style="background:rgba(236,72,153,0.15); border-color:rgba(236,72,153,0.3); color:var(--accent-pink);">Free Registration</span>
          </div>

          <div class="courses-subgrid">
            ${annual.map(course => renderCourseCardHTML(course, user)).join('')}
          </div>
        </div>

        <!-- School of Computer Literacy -->
        <div class="glass-card school-block">
          <div class="school-header">
            <div class="school-info">
              <h2 class="school-title">School of Computer Literacy</h2>
              <p class="school-desc">Essential skills for absolute beginners to enter the workspace with digital fluency.</p>
            </div>
          </div>

          <div class="courses-subgrid">
            ${compLit.map(course => renderCourseCardHTML(course, user)).join('')}
          </div>
        </div>

        <!-- School of Content Creation -->
        <div class="glass-card school-block content">
          <div class="school-header">
            <div class="school-info">
              <h2 class="school-title">School of Content Creation</h2>
              <p class="school-desc">Learn principles of content creation, photography and videography.</p>
            </div>
          </div>

          <div class="courses-subgrid">
            ${content.map(course => renderCourseCardHTML(course, user)).join('')}
          </div>
        </div>

      </div>
    </div>
  `;

  // Attach dynamic checkout listeners
  container.querySelectorAll('.register-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = e.currentTarget.getAttribute('data-course-id');
      const targetCourse = events.find(c => c.id === courseId);
      
      if (!user) {
        window.showToast('Please login or create an account to register.', 'error');
        window.location.hash = '#/login';
        return;
      }

      // Check if already registered
      const regs = window.App.get('registrations');
      const alreadyRegistered = regs.find(r => r.userEmail === user.email && r.eventId === courseId);
      if (alreadyRegistered) {
        window.showToast('You are already registered for this program!', 'success');
        window.location.hash = user.role === 'Admin' ? '#/admin' : '#/dashboard';
        return;
      }

      openCheckout(targetCourse, user);
    });
  });
}

function renderCourseCardHTML(course, user) {
  // Check registration status
  let regStatus = '';
  if (user) {
    const regs = window.App.get('registrations');
    const match = regs.find(r => r.userEmail === user.email && r.eventId === course.id);
    if (match) regStatus = match.status;
  }

  const priceText = course.price === 0 ? 'FREE' : `₦${course.price.toLocaleString()} / $${course.priceUSD}`;
  const btnLabel = regStatus === 'paid' ? '<i class="fa-solid fa-circle-check"></i> Enrolled' : (course.price === 0 ? 'Register Free' : 'Enroll Now');
  const btnClass = regStatus === 'paid' ? 'btn-secondary' : 'btn-primary';

  return `
    <div class="glass-card course-card">
      <div class="course-badge">${course.school}</div>
      <h3 class="course-title">${course.title}</h3>
      <p class="course-summary">${course.desc}</p>
      <div class="course-details">
        <span class="course-price">${priceText}</span>
        <button class="btn btn-sm ${btnClass} register-btn" data-course-id="${course.id}" ${regStatus === 'paid' ? 'disabled' : ''}>
          ${btnLabel}
        </button>
      </div>
    </div>
  `;
}

// Payment Checkout Simulator
function openCheckout(course, user) {
  const modal = document.getElementById('payment-modal');
  const modalBody = document.getElementById('payment-modal-body');
  modal.classList.add('active');

  const isFree = course.price === 0;

  if (isFree) {
    modalBody.innerHTML = `
      <div style="text-align:center; padding: 1.5rem 0;">
        <i class="fa-solid fa-gift" style="font-size:3rem; color:var(--accent-emerald); margin-bottom:1rem;"></i>
        <h4>Free Registration: ${course.title}</h4>
        <p style="color:var(--text-secondary); margin-top:0.5rem; font-size:0.95rem;">
          You are about to register for this event. No payment is required. You will instantly get Zoom links and certificate access on dashboard.
        </p>
        <button id="confirm-free-register" class="btn btn-primary" style="margin-top:1.5rem; width:100%;">Complete Registration</button>
      </div>
    `;

    document.getElementById('confirm-free-register').addEventListener('click', () => {
      completeRegistration(course, user, 'free');
    });
  } else {
    modalBody.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <p style="font-size:0.95rem; color:var(--text-secondary);">
          Enrolling in <strong>${course.title}</strong>
        </p>
        
        <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
          <span>Total Price:</span>
          <strong style="font-size:1.15rem; color:var(--accent-emerald);">₦${course.price.toLocaleString()} / $${course.priceUSD}</strong>
        </div>

        <div class="form-group">
          <label>Select Gateway</label>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <label class="glass-card" style="padding:1rem; display:flex; align-items:center; gap:0.5rem; cursor:pointer; border-color:var(--accent-emerald);">
              <input type="radio" name="gateway" value="paystack" checked>
              <strong>Paystack</strong> (NGN)
            </label>
            <label class="glass-card" style="padding:1rem; display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="gateway" value="flutterwave">
              <strong>Flutterwave</strong> (USD)
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Mock Card Number</label>
          <input type="text" class="form-control" value="4000 1234 5678 9010" placeholder="Card Number">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Expiry Date</label>
            <input type="text" class="form-control" value="12/29" placeholder="MM/YY">
          </div>
          <div class="form-group">
            <label>CVV</label>
            <input type="password" class="form-control" value="123" placeholder="CVV">
          </div>
        </div>

        <button id="confirm-mock-payment" class="btn btn-primary" style="width:100%; margin-top:0.5rem;">
          <i class="fa-solid fa-lock"></i> Pay Securely
        </button>
      </div>
    `;

    document.getElementById('confirm-mock-payment').addEventListener('click', () => {
      const selectedGateway = document.querySelector('input[name="gateway"]:checked').value;
      
      const confirmBtn = document.getElementById('confirm-mock-payment');
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Securely...';

      setTimeout(() => {
        completeRegistration(course, user, selectedGateway);
      }, 1500);
    });
  }

  // Close listeners
  const closeModal = () => modal.classList.remove('active');
  document.getElementById('close-payment-modal').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function completeRegistration(course, user, gateway) {
  const regs = window.App.get('registrations');
  const regId = 'reg_' + Math.random().toString(36).substr(2, 9);
  
  // Generate random Google Meet link
  const meetCode = Math.random().toString(36).substr(2, 3) + '-' + Math.random().toString(36).substr(2, 4) + '-' + Math.random().toString(36).substr(2, 3);
  const zoomLink = `https://meet.google.com/${meetCode}`;

  const newReg = {
    id: regId,
    userEmail: user.email,
    eventId: course.id,
    status: 'paid',
    price: course.price,
    date: new Date().toISOString().substring(0, 10),
    zoomLink
  };

  regs.push(newReg);
  window.App.set('registrations', regs);

  // Trigger system notification email
  let paymentDetailsMsg = gateway === 'free' ? 'This is a free event.' : `Processed successfully via ${gateway.toUpperCase()}. Amount Paid: ₦${course.price.toLocaleString()} / $${course.priceUSD}`;
  window.App.sendSystemEmail(
    user.email,
    `Enrollment Confirmed: ${course.title}`,
    `Hi ${user.name},\n\nYour registration for "${course.title}" was verified!\n\n${paymentDetailsMsg}\n\nLive Class Meeting Link:\n${zoomLink}\n\nYou can access lesson materials and download templates on your private user dashboard inside Ariel Academia.\n\nEnjoy the learning track!\n\nWarmly,\nUncleVictor & The Ariel Team`
  );

  // Close modal
  document.getElementById('payment-modal').classList.remove('active');
  window.showToast(`Successfully registered for ${course.title}! Check your email.`, 'success');

  // Redirect to dashboard
  setTimeout(() => {
    window.location.hash = user.role === 'Admin' ? '#/admin' : '#/dashboard';
  }, 500);
}

// -------------------------------------------------------------
// GALLERY SECTION
// -------------------------------------------------------------
function renderGallery(container) {
  const defaultPhotos = [
    { title: 'Tech4Teachers2025 Kaduna', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80' },
    { title: 'Tech4Students2025 Kaduna', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80' },
      ];

  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Moments</span>
        <h1 class="section-title">Program Gallery</h1>
        <p style="color:var(--text-secondary);">Photos from our global webinars, computer workshops, and impact summits.</p>
      </div>

      <div class="gallery-grid">
        ${defaultPhotos.map((photo, index) => `
          <div class="gallery-item glass-card" data-index="${index}">
            <img src="${photo.url}" alt="${photo.title}">
            <div class="gallery-caption">
              <h4>${photo.title}</h4>
              <p style="font-size:0.8rem; opacity:0.8;">Ariel Academia Event</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Lightbox Window -->
      <div id="gallery-lightbox" class="gallery-lightbox">
        <button id="lightbox-close" class="lightbox-close"><i class="fa-solid fa-xmark"></i></button>
        <img id="lightbox-img" class="lightbox-img" src="" alt="">
        <div id="lightbox-caption" class="lightbox-caption"></div>
      </div>
    </div>
  `;

  // Attach Lightbox event bindings
  const items = container.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const idx = item.getAttribute('data-index');
      const photo = defaultPhotos[idx];
      lightboxImg.src = photo.url;
      lightboxCap.textContent = photo.title;
      lightbox.classList.add('active');
    });
  });

  const closeLightbox = () => lightbox.classList.remove('active');
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

// -------------------------------------------------------------
// NEWS BLOG SECTION
// -------------------------------------------------------------
function renderBlog(container) {
  const blogs = window.App.get('blogs');

  // Check if viewing single post query in route
  const hash = window.location.hash;
  if (hash.includes('?id=')) {
    const blogId = hash.split('?id=')[1];
    const post = blogs.find(b => b.id === blogId);
    if (post) {
      renderSingleBlogPost(container, post);
      return;
    }
  }

  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Newsroom</span>
        <h1 class="section-title">Blog &amp; Program Updates</h1>
        <p style="color:var(--text-secondary);">Stay informed with our stories, event summaries, and free digital literacy tutorials.</p>
      </div>

      <div class="blog-grid">
        ${blogs.map(post => `
          <div class="glass-card blog-card">
            <img class="blog-card-img" src="${post.image}" alt="${post.title}">
            <div class="blog-card-body">
              <div class="blog-card-meta">
                <span><i class="fa-solid fa-user"></i> ${post.author}</span>
                <span><i class="fa-solid fa-calendar"></i> ${post.date}</span>
              </div>
              <h3 class="blog-card-title">${post.title}</h3>
              <p class="blog-card-desc">${post.desc}</p>
              <a href="#/blog?id=${post.id}" class="btn btn-secondary btn-sm" style="margin-top:1rem; align-self:flex-start;">Read Article <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSingleBlogPost(container, post) {
  container.innerHTML = `
    <div class="container" style="max-width:800px;">
      <a href="#/blog" class="btn btn-secondary btn-sm" style="margin-bottom:2rem;"><i class="fa-solid fa-arrow-left"></i> Back to Blog</a>
      
      <img src="${post.image}" alt="${post.title}" style="width:100%; border-radius:var(--radius-lg); margin-bottom:2rem; max-height:400px; object-fit:cover; border:1px solid var(--border-color);">
      
      <div style="display:flex; justify-content:space-between; color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">
        <span>Published by <strong>${post.author}</strong></span>
        <span>${post.date}</span>
      </div>

      <h1 class="hero-title" style="font-size:2.5rem; margin-bottom:2rem;">${post.title}</h1>
      
      <div style="color:var(--text-secondary); display:flex; flex-direction:column; gap:1.5rem; line-height:1.8; font-size:1.05rem;">
        <p>
          We are thrilled to share this update with our Ariel Academia community. Over the past several cohorts, our dedication to high-impact educational frameworks has shown how modern technology tools, especially artificial intelligence (AI), can be democratized.
        </p>
        <p><strong>Key Highlights from UncleVictor:</strong></p>
        <p style="background:var(--bg-secondary); border-left:4px solid var(--accent-emerald); padding:1rem; border-radius:var(--radius-sm); font-style:italic;">
          "The response from our partners, students, and hard-working school educators has been monumental. We are expanding our servers and visual classrooms to handle even more applicants in the upcoming session."
        </p>
        <p>
          Whether you are looking to pivot your career with the School of AI or trying to gain fundamental operations fluency in the School of Computer Literacy, our core mission remains unchanged. We provide practical labs, verified certifications, and lifelong resources.
        </p>
        <p>
          Stay tuned to this channel or check your email logs for upcoming reminder sequences and registration announcements.
        </p>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// CERTIFICATE VERIFICATION PORTAL
// -------------------------------------------------------------
function renderVerify(container) {
  // Check if ID is preset in URL query (e.g. from QR code click)
  const hash = window.location.hash;
  let prefillId = '';
  if (hash.includes('?id=')) {
    prefillId = hash.split('?id=')[1];
  }

  container.innerHTML = `
    <div class="container" style="max-width: 650px;">
      <div class="section-header">
        <span class="section-subtitle">Credential Security</span>
        <h1 class="section-title">Certificate Verification</h1>
        <p style="color:var(--text-secondary);">Confirm the legitimacy of any Ariel Academia certificate by scanning its QR or inputting the credentials code.</p>
      </div>

      <div class="glass-card" style="padding: 2.5rem;">
        <div class="form-group">
          <label>Certificate Code (e.g. ACAD-9A4B-3E7F)</label>
          <div style="display:flex; gap:0.75rem;">
            <input type="text" id="verify-input-id" class="form-control" placeholder="Enter Certificate Code" value="${prefillId}">
            <button id="verify-submit-btn" class="btn btn-primary">Verify</button>
          </div>
        </div>

        <div style="text-align:center; margin: 1.5rem 0;">
          <span style="color:var(--text-muted); font-size:0.9rem;">OR</span>
        </div>

        <div class="verify-box" id="simulate-scan-box">
          <div class="verify-box-icon"><i class="fa-solid fa-qrcode"></i></div>
          <h4>Simulate QR Code Scan</h4>
          <p style="color:var(--text-muted); font-size:0.85rem; margin-top:0.25rem;">
            Simulate using a webcam / scanner to verify the demo certificate instantly.
          </p>
        </div>

        <!-- Render Target for Results -->
        <div id="verify-result-mount"></div>
      </div>
    </div>
  `;

  const inputId = document.getElementById('verify-input-id');
  const submitBtn = document.getElementById('verify-submit-btn');
  const scanBox = document.getElementById('simulate-scan-box');
  const resultMount = document.getElementById('verify-result-mount');

  const runVerification = (certId) => {
    if (!certId.trim()) {
      window.showToast('Please type a certificate code first', 'error');
      return;
    }

    const certs = window.App.get('certificates');
    const matched = certs.find(c => c.id.toUpperCase() === certId.trim().toUpperCase());

    if (matched) {
      resultMount.innerHTML = `
        <div class="verify-results">
          <h4 style="color:var(--accent-emerald); font-size:1.1rem; margin-bottom:0.75rem;"><i class="fa-solid fa-circle-check"></i> Verified Authentic Credential</h4>
          <table style="width:100%; border-collapse:collapse; font-size:0.9rem;">
            <tr><td style="padding:0.4rem 0; font-weight:600;">Student Name:</td><td style="color:var(--text-primary);">${matched.name}</td></tr>
            <tr><td style="padding:0.4rem 0; font-weight:600;">Program Title:</td><td style="color:var(--text-primary);">${matched.eventTitle}</td></tr>
            <tr><td style="padding:0.4rem 0; font-weight:600;">Issue Date:</td><td style="color:var(--text-primary);">${matched.issueDate}</td></tr>
            <tr><td style="padding:0.4rem 0; font-weight:600;">Certificate ID:</td><td style="color:var(--text-primary);">${matched.id}</td></tr>
            <tr><td style="padding:0.4rem 0; font-weight:600;">Issuer Code:</td><td style="color:var(--accent-emerald);">Ariel Academia (Verifiable)</td></tr>
          </table>
        </div>
      `;
      window.showToast('Certificate successfully verified!', 'success');
    } else {
      resultMount.innerHTML = `
        <div class="verify-results invalid">
          <h4 style="color:var(--accent-pink); font-size:1.1rem; margin-bottom:0.75rem;"><i class="fa-solid fa-triangle-exclamation"></i> Invalid Certificate Code</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary);">
            The code you entered does not match any certificate on the Ariel Academia system. Verify capitalization and dashes.
          </p>
        </div>
      `;
      window.showToast('Verification failed: invalid code.', 'error');
    }
  };

  submitBtn.addEventListener('click', () => runVerification(inputId.value));
  inputId.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') runVerification(inputId.value);
  });

  // Simulated scan box overlay animation
  scanBox.addEventListener('click', () => {
    scanBox.innerHTML = `
      <div class="qr-scanner-mock">
        <div class="scanner-laser"></div>
        <div class="scanner-frame"></div>
      </div>
      <p style="margin-top:1rem; font-weight:600; color:var(--accent-emerald);"><i class="fa-solid fa-circle-notch fa-spin"></i> Aligning QR Code...</p>
    `;

    setTimeout(() => {
      // Find the first certificate in DB and prefill + scan it
      const defaultCert = window.App.get('certificates')[0];
      scanBox.innerHTML = `
        <div class="verify-box-icon" style="color:var(--accent-emerald);"><i class="fa-solid fa-qrcode"></i></div>
        <h4>Simulate QR Code Scan</h4>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-top:0.25rem;">
          Click to re-scan.
        </p>
      `;
      inputId.value = defaultCert.id;
      runVerification(defaultCert.id);
    }, 1500);
  });

  // If prefilled query exists, verify automatically
  if (prefillId) {
    runVerification(prefillId);
  }
}

// -------------------------------------------------------------
// CONTACT PAGE
// -------------------------------------------------------------
function renderContact(container) {
  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Communication</span>
        <h1 class="section-title">Contact &amp; Inquiries</h1>
        <p style="color:var(--text-secondary);">Have questions about our School of AI, sponsorship, or volunteering? Let us know.</p>
      </div>

      <div class="contact-grid">
        <div class="contact-info-block">
          <h2>Get in Touch Directly</h2>
          <p style="color:var(--text-secondary);">
            Ariel Academia serves students and organizations worldwide. Drop us an inquiry, and a representative will reply within 24 hours.
          </p>

          <div class="contact-detail-item">
            <div class="contact-detail-icon"><i class="fa-solid fa-location-dot"></i></div>
            <div class="contact-detail-text">
              <h4>Headquarters</h4>
              <p>PP3 Trikania, Kaduna, Nigeria</p>
            </div>
          </div>

          <div class="contact-detail-item">
            <div class="contact-detail-icon"><i class="fa-solid fa-phone"></i></div>
            <div class="contact-detail-text">
              <h4>Contact Support</h4>
              <p>+234 7057740554 (Mon - Fri, 9am - 5pm NGT)</p>
            </div>
          </div>

          <div class="contact-detail-item">
            <div class="contact-detail-icon"><i class="fa-solid fa-envelope"></i></div>
            <div class="contact-detail-text">
              <h4>Electronic Mail</h4>
              <p>thearielacademia@gmail.com | support@arielacademia.edu</p>
            </div>
          </div>
        </div>

        <div class="glass-card contact-form-panel">
          <h3>Send Us a Message</h3>
          <form id="contact-form" style="margin-top:1.5rem; display:flex; flex-direction:column; gap:1.25rem;">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" id="contact-name" class="form-control" placeholder="Enter your name" required>
            </div>
            
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" id="contact-email" class="form-control" placeholder="Enter your email" required>
            </div>

            <div class="form-group">
              <label>Role</label>
              <select id="contact-role" class="form-control" style="background-color: var(--bg-tertiary);">
                <option value="student">Student / Hobbyist</option>
                <option value="educator">School Educator / Principal</option>
                <option value="business">Business / Corporate Client</option>
                <option value="sponsor">Sponsor / Volunteer</option>
              </select>
            </div>

            <div class="form-group">
              <label>Your Inquiry Message</label>
              <textarea id="contact-message" class="form-control" rows="5" placeholder="Write your message details..." required style="resize:vertical;"></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="align-self:flex-start;"><i class="fa-solid fa-paper-plane"></i> Submit Inquiry</button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const role = document.getElementById('contact-role').value;
    const msg = document.getElementById('contact-message').value;

    // Trigger welcome/confirmation email logs
    window.App.sendSystemEmail(
      email,
      'Ariel Academia Inquiry Logged',
      `Hi ${name},\n\nWe received your inquiry regarding our "${role}" programs.\n\nOur team is reviewing your message:\n"${msg}"\n\nA representative will get back to you shortly.\n\nBest regards,\nUncleVictor`
    );

    window.showToast('Thank you! Your message was logged successfully.', 'success');
    document.getElementById('contact-form').reset();
  });
}

// -------------------------------------------------------------
// USER LOGIN
// -------------------------------------------------------------
function renderLogin(container) {
  container.innerHTML = `
    <div class="container" style="max-width: 480px;">
      <div class="glass-card" style="padding: 2.5rem; display:flex; flex-direction:column; gap:1.5rem;">
        <div style="text-align:center;">
          <h2 class="font-outfit">Welcome Back</h2>
          <p style="color:var(--text-secondary); font-size:0.9rem; margin-top:0.25rem;">Log in to access your course files and certificates.</p>
        </div>

        <form id="login-form" style="display:flex; flex-direction:column; gap:1.25rem;">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="login-email" class="form-control" placeholder="name@domain.com" required>
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="login-password" class="form-control" placeholder="••••••••" required>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">Sign In</button>
        </form>

        <div style="text-align:center; font-size:0.88rem; color:var(--text-secondary);">
          <span>Don't have an account? </span><a href="#/signup" style="color:var(--accent-emerald); font-weight:600;">Create Profile</a>
        </div>

        <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color); font-size:0.8rem; color:var(--text-muted);">
          <strong>Demo Credentials:</strong><br>
          - Student: <code>student@gmail.com</code> / <code>student123</code><br>
          - Admin: <code>admin@ariel.edu</code> / <code>admin123</code>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;

    const res = window.App.login(email, pass);
    if (res.success) {
      window.showToast(`Welcome back, ${res.user.name}!`, 'success');
      updateHeaderAuth();
      setTimeout(() => {
        window.location.hash = res.user.role === 'Admin' ? '#/admin' : '#/dashboard';
      }, 500);
    } else {
      window.showToast(res.error, 'error');
    }
  });
}

// -------------------------------------------------------------
// USER SIGNUP
// -------------------------------------------------------------
function renderSignup(container) {
  container.innerHTML = `
    <div class="container" style="max-width: 480px;">
      <div class="glass-card" style="padding: 2.5rem; display:flex; flex-direction:column; gap:1.5rem;">
        <div style="text-align:center;">
          <h2 class="font-outfit">Create Student Profile</h2>
          <p style="color:var(--text-secondary); font-size:0.9rem; margin-top:0.25rem;">Unlock AIMS courses and register for annual bootcamps.</p>
        </div>

        <form id="signup-form" style="display:flex; flex-direction:column; gap:1.25rem;">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="signup-name" class="form-control" placeholder="Jane Doe" required>
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="signup-email" class="form-control" placeholder="name@domain.com" required>
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="signup-password" class="form-control" placeholder="••••••••" required>
          </div>

          <div style="display:flex; align-items:flex-start; gap:0.5rem; font-size:0.8rem; color:var(--text-secondary);">
            <input type="checkbox" required style="margin-top:0.2rem;">
            <span>I agree to the <a href="#/terms" style="color:var(--accent-indigo);">Terms of Service</a> and <a href="#/privacy" style="color:var(--accent-indigo);">Privacy Policy</a>.</span>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">Register Account</button>
        </form>

        <div style="text-align:center; font-size:0.88rem; color:var(--text-secondary);">
          <span>Already have an profile? </span><a href="#/login" style="color:var(--accent-emerald); font-weight:600;">Sign In</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const pass = document.getElementById('signup-password').value;

    const res = window.App.signup(name, email, pass);
    if (res.success) {
      window.showToast(`Profile created successfully! Welcome ${name}.`, 'success');
      updateHeaderAuth();
      setTimeout(() => {
        window.location.hash = '#/dashboard';
      }, 500);
    } else {
      window.showToast(res.error, 'error');
    }
  });
}

// -------------------------------------------------------------
// STATIC TERMS / PRIVACY RENDERS
// -------------------------------------------------------------
function renderStaticPage(container, title, contentText) {
  container.innerHTML = `
    <div class="container" style="max-width:800px;">
      <h1 class="hero-title" style="margin-bottom:1.5rem;">${title}</h1>
      <p style="color:var(--text-secondary); line-height:1.8; font-size:1.1rem; margin-bottom:2rem;">
        ${contentText}
      </p>
      <a href="#/" class="btn btn-primary">Return Home</a>
    </div>
  `;
}
