/* ==========================================
   ARIEL ACADEMIA - USER DASHBOARD
   ========================================== */

export function renderUserDashboard() {
  const app = document.getElementById('app');
  const user = window.App.currentUser;

  // Route protection - if user is admin, redirect to admin. If not logged in, redirect to login
  if (!user) {
    window.showToast('Please login to view dashboard', 'error');
    window.location.hash = '#/login';
    return;
  }
  if (user.role === 'Admin') {
    window.location.hash = '#/admin';
    return;
  }

  // Load user registrations and certificates
  const regs = window.App.get('registrations').filter(r => r.userEmail === user.email);
  const certs = window.App.get('certificates').filter(c => c.userEmail === user.email);
  const events = window.App.get('events');

  // Renders Dashboard Scaffold
  app.innerHTML = `
    <div class="container dashboard-layout">
      <!-- User Sidebar Panel -->
      <aside class="glass-card dash-sidebar">
        <div class="dash-user-profile">
          <div class="dash-avatar-circle">
            ${user.name.charAt(0)}
          </div>
          <h3 class="dash-user-name">${user.name}</h3>
          <span class="dash-user-role">${user.role}</span>
          <div style="margin-top:0.5rem; display:flex; gap:0.25rem; justify-content:center; flex-wrap:wrap;">
            ${(user.tags || []).map(t => `<span style="font-size:0.7rem; background:rgba(255,255,255,0.06); padding:0.15rem 0.4rem; border-radius:var(--radius-sm);">${t}</span>`).join('')}
          </div>
        </div>
        
        <nav class="dash-nav">
          <button class="dash-nav-btn active" data-tab="events"><i class="fa-solid fa-graduation-cap"></i> My Programs</button>
          <button class="dash-nav-btn" data-tab="vault"><i class="fa-solid fa-folder-open"></i> Resource Vault</button>
          <button class="dash-nav-btn" data-tab="certs"><i class="fa-solid fa-award"></i> Certificate Vault</button>
          <button class="dash-nav-btn" data-tab="settings"><i class="fa-solid fa-sliders"></i> Preferences</button>
        </nav>
      </aside>

      <!-- Dynamic Dashboard Sub-View Content -->
      <section class="dash-content" id="dashboard-view-target">
        <!-- Rendered by loadTab() -->
      </section>
    </div>
  `;

  // Dynamic Sub-routing inside user dashboard
  const navBtns = app.querySelectorAll('.dash-nav-btn');
  const target = document.getElementById('dashboard-view-target');

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
      case 'events':
        renderEventsTab(target, regs, events);
        break;
      case 'vault':
        renderVaultTab(target, regs, events);
        break;
      case 'certs':
        renderCertsTab(target, certs, regs, events, user);
        break;
      case 'settings':
        renderSettingsTab(target, user);
        break;
    }
  };

  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      loadTab(e.currentTarget.getAttribute('data-tab'));
    });
  });

  // Load default tab
  loadTab('events');
}

// -------------------------------------------------------------
// MY EVENTS & LOGS TAB
// -------------------------------------------------------------
function renderEventsTab(target, regs, events) {
  target.innerHTML = `
    <div class="dash-header-block">
      <div>
        <h2 class="font-outfit">My Registered Programs</h2>
        <p style="color:var(--text-secondary); font-size:0.9rem;">Review your live lectures schedules and payment audit receipts.</p>
      </div>
      <a href="#/programs" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i> Enroll in New Course</a>
    </div>

    <div class="glass-card dash-panel">
      <h3 class="panel-title">Active Live Lectures</h3>
      ${regs.length === 0 ? `
        <div style="text-align:center; padding: 2rem 0; color:var(--text-muted);">
          <i class="fa-solid fa-calendar-xmark" style="font-size:2.5rem; margin-bottom:1rem;"></i>
          <p>You have not registered for any upcoming cohorts or annual bootcamps yet.</p>
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${regs.map(reg => {
            const course = events.find(e => e.id === reg.eventId) || {};
            return `
              <div class="glass-card" style="padding:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.25rem;">
                <div>
                  <span style="font-size:0.75rem; color:var(--accent-emerald); font-weight:600; text-transform:uppercase;">${course.school || 'General'}</span>
                  <h4 style="margin-top:0.25rem; font-size:1.15rem;">${course.title || 'Untitled Course'}</h4>
                  <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;">Enrolled on: ${reg.date}</p>
                </div>
                <div style="display:flex; gap:0.75rem;">
                  <a href="${reg.zoomLink}" target="_blank" class="btn btn-accent btn-sm">
                    <i class="fa-solid fa-video"></i> Launch Zoom Room
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>

    <div class="glass-card dash-panel">
      <h3 class="panel-title">Receipts &amp; Payments Ledger</h3>
      <div class="table-wrapper">
        <table class="dash-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Program Title</th>
              <th>Payment Gate</th>
              <th>Amount NGN/USD</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${regs.length === 0 ? `
              <tr><td colspan="6" style="text-align:center; color:var(--text-muted);">No transaction logs recorded.</td></tr>
            ` : regs.map(reg => {
              const course = events.find(e => e.id === reg.eventId) || {};
              const priceText = reg.price === 0 ? 'FREE' : `₦${reg.price.toLocaleString()}`;
              return `
                <tr>
                  <td><code>${reg.id}</code></td>
                  <td style="font-weight:600; color:var(--text-primary);">${course.title || 'Event Registration'}</td>
                  <td>${reg.price === 0 ? 'System Bypass' : 'Paystack Sandbox'}</td>
                  <td>${priceText}</td>
                  <td>${reg.date}</td>
                  <td><span class="status-badge paid">Success</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PRIVATE RESOURCE VAULT
// -------------------------------------------------------------
function renderVaultTab(target, regs, events) {
  target.innerHTML = `
    <div>
      <h2 class="font-outfit">Private Resource Vault</h2>
      <p style="color:var(--text-secondary); font-size:0.9rem;">Access premium lesson records, slides, prompt templates, and exercises anytime.</p>
    </div>

    <div class="glass-card dash-panel">
      <h3 class="panel-title">Asset Deliverables</h3>
      ${regs.length === 0 ? `
        <div style="text-align:center; padding: 3rem 0; color:var(--text-muted);">
          <i class="fa-solid fa-lock" style="font-size:3.5rem; color:var(--text-muted); margin-bottom:1.5rem;"></i>
          <h4>Vault Locked</h4>
          <p style="margin-top:0.5rem; max-width:400px; margin-left:auto; margin-right:auto;">
            Enroll in our digital literacy schools or free annual bootcamps to unlock video links, guides, and prompts sheets.
          </p>
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          ${regs.map(reg => {
            const course = events.find(e => e.id === reg.eventId) || {};
            return `
              <div class="glass-card" style="padding:1.75rem;">
                <div style="border-bottom:1px solid var(--border-color); padding-bottom:0.75rem; margin-bottom:1.25rem;">
                  <span style="font-size:0.75rem; color:var(--accent-indigo); font-weight:600; text-transform:uppercase;">${course.school}</span>
                  <h4 style="font-size:1.2rem; margin-top:0.25rem;">${course.title} Classroom Package</h4>
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem;">
                  <a href="#" class="glass-card resource-link-box" style="padding:1rem; display:flex; align-items:center; gap:0.75rem; border-left:4px solid var(--accent-emerald);">
                    <i class="fa-solid fa-circle-play" style="font-size:1.5rem; color:var(--accent-emerald);"></i>
                    <div>
                      <h5 style="font-size:0.9rem;">Session Recordings</h5>
                      <p style="font-size:0.75rem; color:var(--text-muted);">Stream full high-definition video archives</p>
                    </div>
                  </a>

                  <a href="#" class="glass-card resource-link-box" style="padding:1rem; display:flex; align-items:center; gap:0.75rem; border-left:4px solid var(--accent-indigo);">
                    <i class="fa-solid fa-file-powerpoint" style="font-size:1.5rem; color:var(--accent-indigo);"></i>
                    <div>
                      <h5 style="font-size:0.9rem;">Class Slides &amp; PDFs</h5>
                      <p style="font-size:0.75rem; color:var(--text-muted);">Download guide presentations &amp; guides</p>
                    </div>
                  </a>

                  <a href="#" class="glass-card resource-link-box" style="padding:1rem; display:flex; align-items:center; gap:0.75rem; border-left:4px solid var(--accent-pink);">
                    <i class="fa-solid fa-box-open" style="font-size:1.5rem; color:var(--accent-pink);"></i>
                    <div>
                      <h5 style="font-size:0.9rem;">Prompt &amp; Asset Packs</h5>
                      <p style="font-size:0.75rem; color:var(--text-muted);">Copy direct workflows &amp; design tools</p>
                    </div>
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;

  // Attach toast reminders for offline capability demonstration
  target.querySelectorAll('.resource-link-box').forEach(box => {
    box.addEventListener('click', (e) => {
      e.preventDefault();
      window.showToast('Resource downloaded successfully. (Offline PWA file matching active)', 'success');
    });
  });
}

// -------------------------------------------------------------
// CERTIFICATE VAULT & CANVAS GENERATOR
// -------------------------------------------------------------
function renderCertsTab(target, certs, regs, events, user) {
  target.innerHTML = `
    <div class="dash-header-block">
      <div>
        <h2 class="font-outfit">Certificate Vault</h2>
        <p style="color:var(--text-secondary); font-size:0.9rem;">Download authentic, verifiable credentials for successfully finished programs.</p>
      </div>
    </div>

    <!-- Certificate Visual Canvas Modal -->
    <div id="cert-viewer-modal" class="app-modal">
      <div class="glass-card modal-body" style="max-width: 850px; padding:1.5rem;">
        <div class="modal-header">
          <h3>Academic Diploma Preview</h3>
          <button id="close-cert-modal" class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; gap:1.25rem;">
          <div class="cert-card-preview">
            <div class="canvas-cert-container">
              <canvas id="cert-canvas" width="800" height="560"></canvas>
            </div>
          </div>
          <div style="display:flex; gap:1rem; width:100%;">
            <button id="download-cert-png-btn" class="btn btn-primary" style="flex:1; justify-content:center;"><i class="fa-solid fa-download"></i> Save as Image (PNG)</button>
            <button id="verify-on-portal-btn" class="btn btn-secondary" style="flex:1; justify-content:center;"><i class="fa-solid fa-shield-halved"></i> Verify on Public Ledger</button>
          </div>
        </div>
      </div>
    </div>

    <div class="glass-card dash-panel">
      <h3 class="panel-title">Your Issued Certificates</h3>
      ${certs.length === 0 ? `
        <div style="text-align:center; padding: 2.5rem 0; color:var(--text-muted);">
          <i class="fa-solid fa-award" style="font-size:3rem; margin-bottom:1rem;"></i>
          <p>You have not been awarded any credentials yet.</p>
          <span style="font-size:0.8rem; display:block; margin-top:0.25rem;">(Complete coursework or live lectures to trigger manual/auto certificate generation).</span>
        </div>
      ` : `
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:1.5rem;">
          ${certs.map(cert => `
            <div class="glass-card" style="padding:1.5rem; display:flex; flex-direction:column; gap:1rem;">
              <div style="font-size:2rem; color:var(--accent-indigo);"><i class="fa-solid fa-award"></i></div>
              <div>
                <h4 style="font-size:1.1rem; line-height:1.2;">${cert.eventTitle}</h4>
                <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.25rem;">Issued Code: <code>${cert.id}</code></p>
                <p style="font-size:0.8rem; color:var(--text-muted);">Date: ${cert.issueDate}</p>
              </div>
              <button class="btn btn-accent btn-sm view-cert-btn" data-cert-id="${cert.id}" style="width:100%; justify-content:center;">
                <i class="fa-solid fa-eye"></i> View Certificate
              </button>
            </div>
          `).join('')}
        </div>
      `}
    </div>

    <div class="glass-card dash-panel" style="margin-top:2rem;">
      <h3 class="panel-title">Simulate Course Completion</h3>
      <p style="font-size:0.88rem; color:var(--text-secondary);">
        Select any course/event you are currently registered in, and trigger automatic certificate generation for evaluation.
      </p>
      <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:0.5rem;">
        <select id="simulate-course-select" class="form-control" style="max-width:320px; background-color: var(--bg-tertiary);">
          ${regs.map(r => {
            const course = events.find(e => e.id === r.eventId) || {};
            // Disable if certificate already exists
            const alreadyIssued = certs.find(c => c.eventId === r.eventId);
            return `<option value="${r.eventId}" ${alreadyIssued ? 'disabled' : ''}>${course.title} ${alreadyIssued ? '(Cert Issued)' : ''}</option>`;
          }).join('')}
        </select>
        <button id="simulate-complete-btn" class="btn btn-primary"><i class="fa-solid fa-wand-magic-sparkles"></i> Claim Certificate</button>
      </div>
    </div>
  `;

  // Certificate Modal Popup Bindings
  const certModal = document.getElementById('cert-viewer-modal');
  const canvas = document.getElementById('cert-canvas');
  const closeCert = document.getElementById('close-cert-modal');
  const downloadPngBtn = document.getElementById('download-cert-png-btn');
  const verifyLedgerBtn = document.getElementById('verify-on-portal-btn');

  let activeCertCode = '';

  const openCertViewer = (certId) => {
    const cert = window.App.get('certificates').find(c => c.id === certId);
    if (!cert) return;

    activeCertCode = cert.id;
    certModal.classList.add('active');
    
    // Draw on canvas asynchronously to guarantee DOM mounting complete
    setTimeout(() => {
      drawCertificateOnCanvas(canvas, cert);
    }, 150);
  };

  target.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      openCertViewer(e.currentTarget.getAttribute('data-cert-id'));
    });
  });

  const closeViewer = () => certModal.classList.remove('active');
  closeCert.addEventListener('click', closeViewer);
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeViewer();
  });

  // PNG Downloader extractor
  downloadPngBtn.addEventListener('click', () => {
    const imageURI = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Ariel-Certificate-${activeCertCode}.png`;
    link.href = imageURI;
    link.click();
    window.showToast('Certificate PNG downloaded successfully!', 'success');
  });

  verifyLedgerBtn.addEventListener('click', () => {
    closeViewer();
    window.location.hash = `#/verify?id=${activeCertCode}`;
  });

  // Simulation handler
  const selectNode = document.getElementById('simulate-course-select');
  const completeBtn = document.getElementById('simulate-complete-btn');

  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      const courseId = selectNode.value;
      if (!courseId) {
        window.showToast('No active courses found for simulation.', 'error');
        return;
      }

      const allCerts = window.App.get('certificates');
      const alreadyHas = allCerts.find(c => c.userEmail === user.email && c.eventId === courseId);
      if (alreadyHas) {
        window.showToast('Certificate already claimed.', 'error');
        return;
      }

      const courseObj = events.find(e => e.id === courseId);
      const newCertId = 'ACAD-' + Math.random().toString(36).substr(2, 4).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
      
      const newCert = {
        id: newCertId,
        userEmail: user.email,
        eventId: courseId,
        name: user.name,
        eventTitle: courseObj.title,
        issueDate: new Date().toISOString().substring(0, 10),
        qrHash: `ariel-verify-${newCertId}`
      };

      allCerts.push(newCert);
      window.App.set('certificates', allCerts);

      // System email notification dispatch
      window.App.sendSystemEmail(
        user.email,
        `Certificate Generated: ${courseObj.title}`,
        `Hi ${user.name},\n\nCongratulations on completing your program "${courseObj.title}"!\n\nYour verified certificate is ready. Certificate ID: ${newCertId}.\n\nDownload PNG or inspect authenticity code directly via Ariel Academia dashboard portal.\n\nKeep learning!\n- UncleVictor`
      );

      window.showToast(`Congratulations! Certificate ${newCertId} generated.`, 'success');
      
      // Reload sub-dashboard target view
      renderUserDashboard();
    });
  }
}

// -------------------------------------------------------------
// DYNAMIC CANVAS DRAWING ENGINE (HIGH FIDELITY)
// -------------------------------------------------------------
function drawCertificateOnCanvas(canvas, cert) {
  const ctx = canvas.getContext('2d');
  
  // Clean canvas background
  ctx.fillStyle = '#fbfbfb';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Border Grid
  ctx.strokeStyle = '#c5a880'; // Golden beige
  ctx.lineWidth = 14;
  ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);

  // Inner Border Grid
  ctx.strokeStyle = '#d4b795';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Corner floral geometry lines
  drawCornerDecorations(ctx, canvas.width, canvas.height);

  // Header Title
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 32px Outfit';
  ctx.textAlign = 'center';
  ctx.fillText('ARIEL ACADEMIA', canvas.width / 2, 95);

  ctx.fillStyle = '#10b981'; // Emerald brand accent
  ctx.font = '600 12px Inter';
  ctx.fillText('THE DIGITAL LITERACY & AI SCHOOLS', canvas.width / 2, 118);

  ctx.fillStyle = '#64748b';
  ctx.font = 'italic 16px Inter';
  ctx.fillText('This is to certify that', canvas.width / 2, 180);

  // Student Name (Elegant Serif representation)
  ctx.fillStyle = '#0a0f1d';
  ctx.font = 'bold 36px Outfit';
  ctx.fillText(cert.name, canvas.width / 2, 230);

  // Separator divider line
  ctx.beginPath();
  ctx.moveTo((canvas.width / 2) - 120, 250);
  ctx.lineTo((canvas.width / 2) + 120, 250);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Course Body Explanation
  ctx.fillStyle = '#475569';
  ctx.font = '500 15px Inter';
  ctx.fillText('has successfully completed the curriculum requirements for the program', canvas.width / 2, 285);

  ctx.fillStyle = '#6366f1'; // Indigo Accent
  ctx.font = 'bold 24px Outfit';
  ctx.fillText(cert.eventTitle, canvas.width / 2, 325);

  ctx.fillStyle = '#64748b';
  ctx.font = '13px Inter';
  ctx.fillText(`Awarded on ${cert.issueDate} | Credential Verification Code: ${cert.id}`, canvas.width / 2, 360);

  // Signatures
  // Left: Founder
  ctx.fillStyle = '#0a0f1d';
  ctx.font = 'italic 16px Courier New';
  ctx.fillText('UncleVictor', 180, 445);
  ctx.beginPath();
  ctx.moveTo(100, 455);
  ctx.lineTo(260, 455);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = '#64748b';
  ctx.font = '600 11px Inter';
  ctx.fillText('FOUNDER & PRINCIPAL', 180, 475);

  // Right: Registrar
  ctx.fillStyle = '#0a0f1d';
  ctx.font = 'italic 16px Courier New';
  ctx.fillText('A. Academia Registry', 620, 445);
  ctx.beginPath();
  ctx.moveTo(540, 455);
  ctx.lineTo(700, 455);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = '#64748b';
  ctx.font = '600 11px Inter';
  ctx.fillText('DEAN OF STUDIES', 620, 475);

  // Draw simulated QR Code in bottom center
  drawMockQR(ctx, (canvas.width / 2) - 35, 420, cert.id);
}

function drawCornerDecorations(ctx, w, h) {
  // Top Left
  ctx.beginPath();
  ctx.moveTo(30, 60); ctx.lineTo(60, 30);
  ctx.moveTo(30, 75); ctx.lineTo(75, 30);
  ctx.strokeStyle = '#d4b795';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Top Right
  ctx.beginPath();
  ctx.moveTo(w - 30, 60); ctx.lineTo(w - 60, 30);
  ctx.moveTo(w - 30, 75); ctx.lineTo(w - 75, 30);
  ctx.stroke();

  // Bottom Left
  ctx.beginPath();
  ctx.moveTo(30, h - 60); ctx.lineTo(60, h - 30);
  ctx.moveTo(30, h - 75); ctx.lineTo(75, h - 30);
  ctx.stroke();

  // Bottom Right
  ctx.beginPath();
  ctx.moveTo(w - 30, h - 60); ctx.lineTo(w - 60, h - 30);
  ctx.moveTo(w - 30, h - 75); ctx.lineTo(w - 75, h - 30);
  ctx.stroke();
}

function drawMockQR(ctx, x, y, code) {
  // Draws QR Border frame
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y, 70, 70);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x, y, 70, 70);

  // Draw 3 primary corner anchor markers
  ctx.fillStyle = '#0f172a';
  // Top-left corner anchor
  ctx.fillRect(x + 5, y + 5, 18, 18);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 9, y + 9, 10, 10);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x + 12, y + 12, 4, 4);

  // Top-right corner anchor
  ctx.fillRect(x + 47, y + 5, 18, 18);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 51, y + 9, 10, 10);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x + 54, y + 12, 4, 4);

  // Bottom-left corner anchor
  ctx.fillRect(x + 5, y + 47, 18, 18);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 9, y + 51, 10, 10);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x + 12, y + 54, 4, 4);

  // Scatter some mock QR data noise pixels based on character hashes of code string
  ctx.fillStyle = '#334155';
  let seed = 0;
  for (let i = 0; i < code.length; i++) {
    seed += code.charCodeAt(i);
  }

  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      // Exclude anchor squares
      if ((r < 4 && c < 4) || (r < 4 && c > 7) || (r > 7 && c < 4)) continue;
      
      const val = (r * c + seed + (r * 7) + (c * 3)) % 5;
      if (val === 0 || val === 2) {
        ctx.fillRect(x + 23 + (c * 2), y + 23 + (r * 2), 2, 2);
      }
    }
  }

  // Draw small validation stamp icon label
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 6px Inter';
  ctx.fillText('VERIFY', x + 35, y + 66);
}

// -------------------------------------------------------------
// USER PREFERENCES TAB
// -------------------------------------------------------------
function renderSettingsTab(target, user) {
  // Check newsletter subscription state
  const subs = window.App.get('subscribers');
  const isSubbed = subs.includes(user.email);

  target.innerHTML = `
    <div>
      <h2 class="font-outfit">Student Preferences &amp; Subscriptions</h2>
      <p style="color:var(--text-secondary); font-size:0.9rem;">Manage how you receive event reminders and automated class emails.</p>
    </div>

    <div class="glass-card dash-panel">
      <h3 class="panel-title">Notifications Manager</h3>
      <form id="settings-pref-form" style="display:flex; flex-direction:column; gap:1.5rem;">
        <div style="display:flex; align-items:flex-start; gap:0.75rem;">
          <input type="checkbox" id="pref-newsletter" ${isSubbed ? 'checked' : ''} style="margin-top:0.3rem; width:18px; height:18px; cursor:pointer;">
          <div>
            <label for="pref-newsletter" style="font-weight:600; cursor:pointer;">Ariel Academia News &amp; Campaigns</label>
            <p style="font-size:0.8rem; color:var(--text-muted);">Receive newsletters, prompt guides, and announcements for future program launches.</p>
          </div>
        </div>

        <div style="display:flex; align-items:flex-start; gap:0.75rem;">
          <input type="checkbox" checked disabled style="margin-top:0.3rem; width:18px; height:18px;">
          <div>
            <label style="font-weight:600; color:var(--text-secondary);">Transactional Alerts (Mandatory)</label>
            <p style="font-size:0.8rem; color:var(--text-muted);">Zoom links delivery, automated course registration receipts, and certificates announcements.</p>
          </div>
        </div>

        <div style="display:flex; align-items:flex-start; gap:0.75rem;">
          <input type="checkbox" id="pref-pwa-push" style="margin-top:0.3rem; width:18px; height:18px; cursor:pointer;">
          <div>
            <label for="pref-pwa-push" style="font-weight:600; cursor:pointer;">Enable Web Push Notifications (PWA)</label>
            <p style="font-size:0.8rem; color:var(--text-muted);">Get instant notifications for reminders (24h, 1h before class) directly on your device desktop.</p>
          </div>
        </div>

        <button type="submit" class="btn btn-primary" style="align-self:flex-start;">Save Preferences</button>
      </form>
    </div>
  `;

  const form = document.getElementById('settings-pref-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const checkedSub = document.getElementById('pref-newsletter').checked;
    const currentSubs = window.App.get('subscribers');

    if (checkedSub && !currentSubs.includes(user.email)) {
      currentSubs.push(user.email);
    } else if (!checkedSub && currentSubs.includes(user.email)) {
      const idx = currentSubs.indexOf(user.email);
      currentSubs.splice(idx, 1);
    }
    window.App.set('subscribers', currentSubs);

    // Push permission simulator
    const pwaPush = document.getElementById('pref-pwa-push').checked;
    if (pwaPush && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          window.showToast('Push notifications enabled successfully!', 'success');
        }
      });
    }

    window.showToast('Preferences updated successfully.', 'success');
  });
}
