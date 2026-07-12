/* ==========================================
   ARIEL ACADEMIA - FLOATING AI CHATBOT
   ========================================== */

export function initChatbot(mountPoint) {
  if (!mountPoint) return;

  // Insert HTML skeleton
  mountPoint.innerHTML = `
    <!-- Floating FAB -->
    <button id="chatbot-fab" class="chatbot-fab" aria-label="Open Chatbot">
      <i class="fa-solid fa-comments"></i>
    </button>

    <!-- Chat window wrapper -->
    <div id="chatbot-window" class="chatbot-window">
      <div class="chatbot-header">
        <div class="chatbot-agent-info">
          <div class="chatbot-avatar">
            <i class="fa-solid fa-robot"></i>
          </div>
          <div class="chatbot-agent-title">
            <h4>Ariel Support Bot</h4>
            <span>Online | Responds Instantly</span>
          </div>
        </div>
        <button id="chatbot-close" class="chatbot-close" aria-label="Close Chatbot">
          <i class="fa-solid fa-minus"></i>
        </button>
      </div>

      <!-- Messages View -->
      <div id="chatbot-messages" class="chatbot-messages">
        <div class="chat-msg bot">
          <div class="chat-msg-bubble">
            Welcome to <strong>Ariel Academia</strong>! 👋 I am your automated assistant. How can I help you jumpstart your tech career today?
          </div>
        </div>
      </div>

      <!-- Quick replies -->
      <div class="chat-suggested">
        <button class="chat-chip" data-query="Schools & Courses">📚 Schools & Courses</button>
        <button class="chat-chip" data-query="How to Register?">✏️ Register & Fees</button>
        <button class="chat-chip" data-query="Annual Events">📅 Annual Events</button>
        <button class="chat-chip" data-query="Connect with Human">👤 Contact Representative</button>
      </div>

      <!-- User input -->
      <div class="chatbot-input-area">
        <input type="text" id="chatbot-input" placeholder="Type a message..." autocomplete="off">
        <button id="chatbot-send" class="chatbot-send-btn" aria-label="Send Message">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;

  // UI Bindings
  const fab = document.getElementById('chatbot-fab');
  const win = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const msgContainer = document.getElementById('chatbot-messages');
  const chips = document.querySelectorAll('.chat-chip');

  // Toggle chatbot visibility
  fab.addEventListener('click', () => {
    win.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    win.classList.remove('active');
  });

  // Handle message sending
  const sendMessage = (text) => {
    if (!text.trim()) return;

    // Add user bubble
    appendMessage(text, 'user');
    input.value = '';

    // Scroll to bottom
    msgContainer.scrollTop = msgContainer.scrollHeight;

    // Simulate bot thinking
    setTimeout(() => {
      const response = generateBotResponse(text);
      appendMessage(response, 'bot');
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }, 600);
  };

  sendBtn.addEventListener('click', () => sendMessage(input.value));
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage(input.value);
  });

  // Handle chip clicks
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      sendMessage(query);
    });
  });

  // Append new message bubble
  function appendMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = `
      <div class="chat-msg-bubble">
        ${text}
      </div>
    `;
    msgContainer.appendChild(msg);
  }

  // Automated bot intelligence parsing
  function generateBotResponse(inputVal) {
    const text = inputVal.toLowerCase();

    // Handoff to human simulation
    if (text.includes('human') || text.includes('person') || text.includes('representative') || text.includes('connect')) {
      return `
        🔄 <strong>Connecting to Support Representative...</strong><br><br>
        UncleVictor or a staff representative will respond to your registered email/phone shortly. For urgent inquiries, call us directly at <strong>+234 812 345 6789</strong> or email <strong>support@ariel.edu</strong>.
      `;
    }

    // Courses & Schools
    if (text.includes('school') || text.includes('course') || text.includes('aims') || text.includes('class') || text.includes('learn')) {
      return `
        📚 <strong>Ariel Academia - The Digital Literacy Schools</strong>:<br><br>
        1. <strong>School of AI (AIMS)</strong>: Graphics Design with AI, WebApps with AI, Cinematic Image/Video Gen, Content Writing, AI Automation.<br>
        2. <strong>School of Computer Literacy</strong>: Core computer usage, spreadsheet models, cloud productivity tools.<br>
        3. <strong>School of Content Creation</strong>: Video editing, audio processing, and branding.<br><br>
        👉 Visit the <a href="#/programs" style="color:var(--accent-emerald);text-decoration:underline;">Programs Hub</a> for curricula and fees.
      `;
    }

    // Payment & Registration
    if (text.includes('register') || text.includes('fee') || text.includes('price') || text.includes('pay') || text.includes('cost') || text.includes('naira') || text.includes('usd')) {
      return `
        💳 <strong>Easy Registration & Payments</strong>:<br><br>
        - Sign up for a free student profile.<br>
        - Select your desired course in the <strong>Programs</strong> portal.<br>
        - Pay using <strong>Paystack</strong> (Naira cards, Bank transfer, USSD) or <strong>Flutterwave</strong> (USD/International credit cards).<br>
        - Once paid, your private dashboard instantly unlocks materials and Meet links.<br><br>
        👉 Register now: <a href="#/signup" style="color:var(--accent-indigo);text-decoration:underline;">Create Student Account</a>
      `;
    }

    // Annual Events
    if (text.includes('event') || text.includes('tech4students') || text.includes('tech4teachers') || text.includes('annual')) {
      return `
        📅 <strong>Annual Flagship Programs (Free)</strong>:<br><br>
        - <strong>TECH4STUDENTS</strong>: Empowering secondary/tertiary students with core IT and AI tools.<br>
        - <strong>TECH4TEACHERS</strong>: Equipping teachers with digital methodologies for high-impact classrooms.<br><br>
        Registration includes certificate generation and resource vaults. Navigate to <a href="#/programs" style="color:var(--accent-emerald);text-decoration:underline;">Programs</a> to register.
      `;
    }

    // Greetings
    if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('greet')) {
      return 'Hello! Ask me about our courses, fees, registration process, or how to get certified. 😊';
    }

    // Default Fallback
    return `
      Thank you for writing. I parsed your query. For detailed answers, check out:<br>
      - <a href="#/programs" style="color:var(--accent-emerald);">Programs Hub</a> (Course list & prices)<br>
      - <a href="#/verify" style="color:var(--accent-indigo);">Certificate Verifier</a> (Confirm certificates)<br>
      - Or type <strong>"Connect with Human"</strong> to speak to a representative.
    `;
  }
}
