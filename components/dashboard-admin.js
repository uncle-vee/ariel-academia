/* ==========================================
   ARIEL ACADEMIA - STAFF/ADMIN DASHBOARD
   ========================================== */

export function renderAdminDashboard() {
  const app = document.getElementById('app');
  const user = window.App.currentUser;

  // Route protection - admin only
  if (!user || user.role !== 'Admin') {
    window.showToast('Access denied: staff credentials required.', 'error');
    window.location.hash = '#/login';
    return;
  }

  // Load database metrics
  const users = window.App.get('users');
  const regs = window.App.get('registrations');
  const certs = window.App.get('certificates');
  const emails = window.App.get('emails');
  const events = window.App.get('events');
  const flows = window.App.get('marketing');
  const subs = window.App.get('subscribers');

  // Compute metrics
  const totalStudents = users.filter(u => u.role === 'Student').length;
  const totalTeachers = users.filter(u => u.role === 'Teacher').length;
  const totalSubscribers = subs.length;
  const totalRevenueNGN = regs.reduce((sum, r) => sum + r.price, 0);

  app.innerHTML = `
    <div class="container dashboard-layout">
      <!-- Admin Sidebar -->
      <aside class="glass-card dash-sidebar">
        <div class="dash-user-profile">
          <div class="dash-avatar-circle" style="background:var(--accent-emerald);">
            A
          </div>
          <h3 class="dash-user-name">${user.name}</h3>
          <span class="dash-user-role" style="color:var(--accent-pink);">STAFF PORTAL</span>
        </div>
        
        <nav class="dash-nav">
          <button class="dash-nav-btn active" data-tab="analytics"><i class="fa-solid fa-chart-line"></i> Analytics &amp; Reports</button>
          <button class="dash-nav-btn" data-tab="users"><i class="fa-solid fa-users"></i> Student Database</button>
          <button class="dash-nav-btn" data-tab="marketing"><i class="fa-solid fa-sliders"></i> Marketing Sequences</button>
          <button class="dash-nav-btn" data-tab="emails"><i class="fa-solid fa-envelope-open-text"></i> System Email Logs</button>
        </nav>
      </aside>

      <!-- Dynamic Sub-view mount -->
      <section class="dash-content" id="admin-view-target">
        <!-- Renders sub-views -->
      </section>
    </div>
  `;

  const navBtns = app.querySelectorAll('.dash-nav-btn');
  const target = document.getElementById('admin-view-target');

  const loadTab = (tabId) => {
    navBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    target.innerHTML = '';

    switch(tabId) {
      case 'analytics':
        renderAnalyticsTab(target, totalStudents, totalTeachers, totalSubscribers, totalRevenueNGN, regs, events);
        break;
      case 'users':
        renderUsersTab(target, users, regs, events);
        break;
      case 'marketing':
        renderMarketingTab(target, flows);
        break;
      case 'emails':
        renderEmailsTab(target, emails);
        break;
    }
  };

  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      loadTab(e.currentTarget.getAttribute('data-tab'));
    });
  });

  // Default tab
  loadTab('analytics');
}

// -------------------------------------------------------------
// ANALYTICS & CHARTS
// -------------------------------------------------------------
function renderAnalyticsTab(target, students, teachers, subscribers, revenue, regs, events) {
  // Compute registrations counts per course
  const regCounts = {};
  events.forEach(e => {
    regCounts[e.title] = regs.filter(r => r.eventId === e.id).length;
  });

  const maxVal = Math.max(...Object.values(regCounts), 1);

  target.innerHTML = `
    <div>
      <h2 class="font-outfit">Analytics Reporting Hub</h2>
      <p style="color:var(--text-secondary); font-size:0.9rem;">Real-time registration numbers, gross revenues, and platform usage metrics.</p>
    </div>

    <!-- Stats row cards -->
    <div class="dash-stats-row">
      <div class="glass-card dash-stat-card">
        <div class="dash-stat-info">
          <h4>Enrolled Students</h4>
          <span class="num">${students}</span>
        </div>
        <div class="dash-stat-icon"><i class="fa-solid fa-user-graduate"></i></div>
      </div>

      <div class="glass-card dash-stat-card">
        <div class="dash-stat-info">
          <h4>Active Teachers</h4>
          <span class="num">${teachers}</span>
        </div>
        <div class="dash-stat-icon" style="color:var(--accent-pink); background:rgba(236,72,153,0.1);"><i class="fa-solid fa-chalkboard-user"></i></div>
      </div>

      <div class="glass-card dash-stat-card">
        <div class="dash-stat-info">
          <h4>Gross Revenue</h4>
          <span class="num">₦${revenue.toLocaleString()}</span>
        </div>
        <div class="dash-stat-icon" style="color:var(--accent-emerald); background:rgba(16,185,129,0.1);"><i class="fa-solid fa-money-bill-wave"></i></div>
      </div>

      <div class="glass-card dash-stat-card">
        <div class="dash-stat-info">
          <h4>Newsletter Subs</h4>
          <span class="num">${subscribers}</span>
        </div>
        <div class="dash-stat-icon" style="color:hsl(45,100%,50%); background:rgba(245,158,11,0.1);"><i class="fa-solid fa-envelope"></i></div>
      </div>
    </div>

    <div class="dash-grid-two">
      <!-- High-fidelity Custom Chart -->
      <div class="glass-card dash-panel">
        <h3 class="panel-title">Enrollment Distribution by Course</h3>
        <div class="chart-container" style="margin-top: 1rem;">
          ${Object.entries(regCounts).map(([title, count]) => {
            const pct = (count / maxVal) * 80; // Scale chart bars to fit height
            return `
              <div class="chart-bar-col">
                <div class="chart-bar" style="height: ${pct}%;">
                  <span class="chart-bar-tooltip">${count} Regs</span>
                </div>
                <span class="chart-label" title="${title}">${title.split(' ')[0]}...</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Recent logs summary -->
      <div class="glass-card dash-panel">
        <h3 class="panel-title">Recent Registrations</h3>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:1rem;">
          ${regs.slice(0, 4).map(r => {
            const c = events.find(course => course.id === r.eventId) || {};
            return `
              <li style="display:flex; justify-content:space-between; align-items:center; font-size:0.88rem; padding-bottom:0.5rem; border-bottom:1px solid var(--border-color);">
                <div>
                  <strong style="color:var(--text-primary);">${r.userEmail}</strong>
                  <div style="font-size:0.75rem; color:var(--text-muted);">${c.title}</div>
                </div>
                <span style="font-size:0.8rem; font-weight:600; color:var(--accent-emerald);">${r.price === 0 ? 'FREE' : `₦${r.price.toLocaleString()}`}</span>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// STUDENT DATABASE & ROLE MANAGER & SCHOLARSHIP BYPASS
// -------------------------------------------------------------
function renderUsersTab(target, users, regs, events) {
  target.innerHTML = `
    <div class="dash-header-block">
      <div>
        <h2 class="font-outfit">Student &amp; Staff Database</h2>
        <p style="color:var(--text-secondary); font-size:0.9rem;">Assign user privileges, create tag segmentation, or register scholarship admissions.</p>
      </div>
    </div>

    <div class="dash-grid-two" style="grid-template-columns: 2fr 1fr;">
      
      <!-- Users Directory Table -->
      <div class="glass-card dash-panel">
        <h3 class="panel-title">Registered Accounts</h3>
        <div class="table-wrapper">
          <table class="dash-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td style="font-weight:600; color:var(--text-primary);">${u.name}</td>
                  <td><code>${u.email}</code></td>
                  <td>
                    <select class="role-select form-control" data-email="${u.email}" style="padding:0.25rem 0.5rem; font-size:0.8rem; background-color: var(--bg-tertiary); max-width:120px;">
                      <option value="Student" ${u.role === 'Student' ? 'selected' : ''}>Student</option>
                      <option value="Teacher" ${u.role === 'Teacher' ? 'selected' : ''}>Teacher</option>
                      <option value="Admin" ${u.role === 'Admin' ? 'selected' : ''}>Admin</option>
                    </select>
                  </td>
                  <td>
                    <div style="display:flex; gap:0.2rem; flex-wrap:wrap;">
                      ${(u.tags || []).map(t => `<span style="font-size:0.7rem; background:var(--bg-tertiary); padding:0.1rem 0.3rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">${t}</span>`).join('')}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Scholarship Manual Admission Trigger -->
      <div class="glass-card dash-panel">
        <h3 class="panel-title">Manual Admissions</h3>
        <p style="font-size:0.85rem; color:var(--text-secondary);">
          Manually bypass checkout to admit students/volunteers into specific program tracks.
        </p>

        <form id="scholarship-admit-form" style="display:flex; flex-direction:column; gap:1rem; margin-top:0.5rem;">
          <div class="form-group">
            <label>Select Recipient Profile</label>
            <select id="admit-user-select" class="form-control" style="background-color: var(--bg-tertiary);" required>
              ${users.map(u => `<option value="${u.email}">${u.name} (${u.email})</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label>Admit Into Track</label>
            <select id="admit-course-select" class="form-control" style="background-color: var(--bg-tertiary);" required>
              ${events.map(e => `<option value="${e.id}">${e.title} (${e.school})</option>`).join('')}
            </select>
          </div>

          <button type="submit" class="btn btn-accent" style="width:100%; justify-content:center;">
            <i class="fa-solid fa-user-plus"></i> Grant Admission
          </button>
        </form>
      </div>

    </div>
  `;

  // Attach role-switch updates listener
  target.querySelectorAll('.role-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const email = e.currentTarget.getAttribute('data-email');
      const targetRole = e.currentTarget.value;
      const allUsers = window.App.get('users');

      const match = allUsers.find(u => u.email === email);
      if (match) {
        match.role = targetRole;
        window.App.set('users', allUsers);
        window.showToast(`Updated role for ${match.name} to ${targetRole}`, 'success');
      }
    });
  });

  // Attach manual admission submit listener
  const form = document.getElementById('scholarship-admit-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const studentEmail = document.getElementById('admit-user-select').value;
    const courseId = document.getElementById('admit-course-select').value;

    const allRegs = window.App.get('registrations');
    const studentProfile = users.find(u => u.email === studentEmail);
    const courseObj = events.find(ev => ev.id === courseId);

    // Double check registration duplicate
    const duplicate = allRegs.find(r => r.userEmail === studentEmail && r.eventId === courseId);
    if (duplicate) {
      window.showToast('This user is already enrolled in this course!', 'error');
      return;
    }

    const regId = 'reg_' + Math.random().toString(36).substr(2, 9);
    const meetCode = Math.random().toString(36).substr(2, 3) + '-' + Math.random().toString(36).substr(2, 4) + '-' + Math.random().toString(36).substr(2, 3);
    const zoomLink = `https://meet.google.com/${meetCode}`;

    allRegs.push({
      id: regId,
      userEmail: studentEmail,
      eventId: courseId,
      status: 'paid',
      price: 0, // Bypass payment amount
      date: new Date().toISOString().substring(0, 10),
      zoomLink
    });
    window.App.set('registrations', allRegs);

    // Dynamic Tag updates (e.g. tag student with campaign segment tags)
    const allUsers = window.App.get('users');
    const matchedUser = allUsers.find(u => u.email === studentEmail);
    if (matchedUser) {
      if (!matchedUser.tags) matchedUser.tags = [];
      const tagSegmentName = courseObj.category === 'aims' ? 'AIMS-Admitted' : 'Volunteers';
      if (!matchedUser.tags.includes(tagSegmentName)) matchedUser.tags.push(tagSegmentName);
      window.App.set('users', allUsers);
    }

    // System email notification logs dispatch
    window.App.sendSystemEmail(
      studentEmail,
      `Scholarship Admitted: ${courseObj.title}`,
      `Hi ${studentProfile.name},\n\nYou have been granted manual admission into the program "${courseObj.title}".\n\nLive Class Meeting Link:\n${zoomLink}\n\nAccess recordings and templates vaults directly inside your student dashboard.\n\nBest,\nUncleVictor`
    );

    window.showToast(`Admitted ${studentProfile.name} to ${courseObj.title} successfully!`, 'success');
    renderAdminDashboard(); // Reload current view
  });
}

// -------------------------------------------------------------
// MARKETING AUTOMATION SEQUENCE BUILDER
// -------------------------------------------------------------
function renderMarketingTab(target, flows) {
  target.innerHTML = `
    <div class="dash-header-block">
      <div>
        <h2 class="font-outfit">Marketing Automation Flows</h2>
        <p style="color:var(--text-secondary); font-size:0.9rem;">Map behavioral triggers, custom delay timers, and welcome workflows.</p>
      </div>
      <button id="create-flow-btn" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i> New Automation Sequence</button>
    </div>

    <!-- Create Flow Modal -->
    <div id="flow-modal" class="app-modal">
      <div class="glass-card modal-body">
        <div class="modal-header">
          <h3>Create Campaign Sequence</h3>
          <button id="close-flow-modal" class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form id="new-flow-form" style="display:flex; flex-direction:column; gap:1.25rem;">
          <div class="form-group">
            <label>Sequence Name</label>
            <input type="text" id="flow-name" class="form-control" placeholder="e.g. Graphic design Upsell Flow" required>
          </div>

          <div class="form-group">
            <label>Trigger Event</label>
            <select id="flow-trigger" class="form-control" style="background-color: var(--bg-tertiary);">
              <option value="User Signup">User Signup</option>
              <option value="Course Completed">Course Completed</option>
              <option value="Abandoned Registration">Abandoned Registration</option>
            </select>
          </div>

          <div class="form-group">
            <label>Primary Campaign Action</label>
            <input type="text" id="flow-action-1" class="form-control" value="Welcome Email Sequence" required>
          </div>

          <div class="form-group">
            <label>Secondary Campaign Action (Follow-up)</label>
            <input type="text" id="flow-action-2" class="form-control" value="Coupon discount prompt after 3 days">
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;">Create Flow</button>
        </form>
      </div>
    </div>

    <div class="glass-card dash-panel">
      <h3 class="panel-title">Active Campaign Maps</h3>
      
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:2rem; margin-top:0.5rem;">
        ${flows.map(flow => `
          <div class="glass-card" style="padding:1.5rem; display:flex; flex-direction:column; gap:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h4 style="font-size:1.1rem; color:var(--text-primary);">${flow.name}</h4>
              <span class="status-badge active" style="font-size:0.7rem;">Active</span>
            </div>
            
            <!-- Marketing Flow visual canvas mapping -->
            <div class="canvas-flow">
              <div class="flow-step trigger">
                <div class="flow-step-icon"><i class="fa-solid fa-play"></i></div>
                <div class="flow-step-info">
                  <h5>Trigger: ${flow.trigger}</h5>
                  <p>User behaviors initiator</p>
                </div>
              </div>
              
              ${flow.steps.map(step => `
                <div class="flow-step ${step.type}">
                  <div class="flow-step-icon">
                    <i class="fa-solid ${step.type === 'delay' ? 'fa-clock' : 'fa-envelope-open'}"></i>
                  </div>
                  <div class="flow-step-info">
                    <h5>${step.label}</h5>
                    <p>Delay: ${step.delay || 'Instant'}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Flow Modals bindings
  const fModal = document.getElementById('flow-modal');
  const openFlowBtn = document.getElementById('create-flow-btn');
  const closeFlowBtn = document.getElementById('close-flow-modal');
  const formFlow = document.getElementById('new-flow-form');

  openFlowBtn.addEventListener('click', () => fModal.classList.add('active'));
  
  const closeFModal = () => fModal.classList.remove('active');
  closeFlowBtn.addEventListener('click', closeFModal);
  fModal.addEventListener('click', (e) => {
    if (e.target === fModal) closeFModal();
  });

  formFlow.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('flow-name').value;
    const trigger = document.getElementById('flow-trigger').value;
    const act1 = document.getElementById('flow-action-1').value;
    const act2 = document.getElementById('flow-action-2').value;

    const allFlows = window.App.get('marketing');
    const newFlow = {
      id: 'flow_' + Math.random().toString(36).substr(2, 9),
      name,
      trigger,
      steps: [
        { type: 'action', delay: 'Instant', label: act1 }
      ]
    };

    if (act2.trim()) {
      newFlow.steps.push({ type: 'delay', delay: '3 Days', label: act2 });
    }

    allFlows.push(newFlow);
    window.App.set('marketing', allFlows);

    closeFModal();
    window.showToast(`Marketing flow "${name}" created successfully!`, 'success');
    renderAdminDashboard(); // Reload page view
  });
}

// -------------------------------------------------------------
// SYSTEM EMAIL LOGS AUDITOR
// -------------------------------------------------------------
function renderEmailsTab(target, emails) {
  target.innerHTML = `
    <div>
      <h2 class="font-outfit">System Emails Dispatch Log</h2>
      <p style="color:var(--text-secondary); font-size:0.9rem;">Audit auto-reminders, invoice deliveries, and webinar zoom invitations dispatched to users.</p>
    </div>

    <!-- Email Reader Modal Popup -->
    <div id="email-reader-modal" class="app-modal">
      <div class="glass-card modal-body" style="padding: 2.5rem;">
        <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;">
          <div>
            <h3 id="read-subject">Email Subject</h3>
            <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.25rem;">
              Recipient: <code id="read-to">email@target.com</code> | Time: <span id="read-date">2026-07-12 12:00</span>
            </p>
          </div>
          <button id="close-email-modal" class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div style="white-space: pre-wrap; font-family: monospace; font-size:0.9rem; color:var(--text-secondary); padding: 1.5rem 0; line-height:1.6;" id="read-body">
          Email content goes here...
        </div>
      </div>
    </div>

    <div class="glass-card dash-panel">
      <h3 class="panel-title">Mail Delivery History</h3>
      <div class="table-wrapper">
        <table class="dash-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Recipient (To)</th>
              <th>Subject Line</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${emails.length === 0 ? `
              <tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No system emails dispatched yet.</td></tr>
            ` : emails.map(mail => `
              <tr>
                <td><code>${mail.date}</code></td>
                <td><strong>${mail.to}</strong></td>
                <td>${mail.subject}</td>
                <td>
                  <button class="btn btn-secondary btn-sm read-mail-btn" data-mail-id="${mail.id}">
                    <i class="fa-solid fa-envelope-open"></i> Read Log
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Reader Modal Bindings
  const eModal = document.getElementById('email-reader-modal');
  const rSub = document.getElementById('read-subject');
  const rTo = document.getElementById('read-to');
  const rDate = document.getElementById('read-date');
  const rBody = document.getElementById('read-body');
  const closeEBtn = document.getElementById('close-email-modal');

  const openEmailReader = (mailId) => {
    const mail = window.App.get('emails').find(m => m.id === mailId);
    if (!mail) return;

    rSub.textContent = mail.subject;
    rTo.textContent = mail.to;
    rDate.textContent = mail.date;
    rBody.textContent = mail.body;
    eModal.classList.add('active');
  };

  target.querySelectorAll('.read-mail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      openEmailReader(e.currentTarget.getAttribute('data-mail-id'));
    });
  });

  const closeEReader = () => eModal.classList.remove('active');
  closeEBtn.addEventListener('click', closeEReader);
  eModal.addEventListener('click', (e) => {
    if (e.target === eModal) closeEReader();
  });
}
