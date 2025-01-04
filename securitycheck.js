     document.addEventListener('DOMContentLoaded', () => new KeySystem());
      document.addEventListener('contextmenu', e => e.preventDefault());
      document.addEventListener('keydown', e => {
        if ((e.ctrlKey && !['a', 'v'].includes(e.key)) || e.keyCode === 123) {
          e.preventDefault();
        }
      });

      // KEY SYSTEM
    class KeySystem {
    constructor() {
    this.submitBtn = document.getElementById('submitBtn');
    this.discordBtn = document.getElementById('discordBtn');
    this.keyInput = document.getElementById('key');
    this.alert = document.getElementById('alert');
    this.container = document.getElementById('login-container');
    this.attempts = 0;
    this.lastAttemptTime = 0;
    this.maxAttempts = 5;
    this.cooldownPeriod = 2000;
    this.keysCache = null;

    this.initEventListeners();
    this.checkExpiredStatus();
    this.checkExistingSession();
  }

  initEventListeners() {
    this.submitBtn.addEventListener('click', () => this.validateKey());
    this.discordBtn.addEventListener('click', () => this.openDiscord());
    this.keyInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.validateKey();
    });
  }

  checkExpiredStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('expired')) {
      this.showAlert('Session expired. Please enter a new key', 'error');
      urlParams.delete('expired'); // Clean up the URL after displaying the alert
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  async validateKey() {
    const key = this.keyInput.value.trim();
    if (!key) {
      this.showAlert('Please enter a key', 'error');
      return;
    }
    const now = Date.now();
    if (now - this.lastAttemptTime < this.cooldownPeriod) {
      this.showAlert('Please wait before trying again', 'error');
      return;
    }
    if (this.attempts >= this.maxAttempts) {
      this.showAlert('Too many attempts. Please try again later', 'error');
      return;
    }
    this.attempts++;
    this.lastAttemptTime = now;
    this.submitBtn.disabled = true;
    try {
      const isValid = await this.checkKeyValidity(key);
      if (isValid) {
        this.handleSuccessfulLogin(key);
      } else {
        this.handleFailedLogin();
      }
    } catch (error) {
      console.error('Key validation error:', error);
      this.showAlert('Error checking key. Please try again', 'error');
    } finally {
      this.submitBtn.disabled = false;
    }
  }

  async checkKeyValidity(key) {
    if (!this.keysCache) {
      try {
        const response = await fetch('oxbe.json');
        if (!response.ok) throw new Error('Failed to fetch keys');
        const data = await response.json();
        this.keysCache = data.validKeys;
      } catch (error) {
        console.error('Error fetching keys:', error);
        throw error;
      }
    }
    return this.keysCache.includes(key);
  }

  handleSuccessfulLogin(key) {
    this.showAlert('Success! Redirecting...', 'success');
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('loggedInKey', key);
    localStorage.setItem('loginTimestamp', Date.now().toString());
    setTimeout(() => (window.location.href = '/home'), 1500);
  }

  handleFailedLogin() {
    this.showAlert('Invalid key! Please try again or get a new key', 'error');
    this.container.classList.add('shake');
    setTimeout(() => this.container.classList.remove('shake'), 500);
    this.keyInput.value = '';
  }

  showAlert(message, type) {
    this.alert.textContent = message;
    this.alert.style.background = type === 'success' ? 'rgba(48, 209, 88, 0.15)' : 'rgba(255, 59, 48, 0.15)';
    this.alert.classList.add('show');
    this.container.style.height = 'auto';
    setTimeout(() => {
      this.alert.classList.remove('show');
      this.alert.textContent = '';
    }, 3000);
  }

  openDiscord() {
    window.open('https://discord.gg/Eg2EWXwYcn', '_blank', 'noopener,noreferrer');
  }

  clearSession() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInKey');
    localStorage.removeItem('loginTimestamp');
  }

  async checkExistingSession() {
    try {
      const loggedIn = localStorage.getItem('loggedIn');
      const savedKey = localStorage.getItem('loggedInKey');
      const timestamp = localStorage.getItem('loginTimestamp');
      if (!loggedIn || !savedKey || !timestamp) return;
      const now = Date.now();
      const expires = parseInt(timestamp) + 24 * 60 * 60 * 1000;
      const isValid = await this.checkKeyValidity(savedKey);
      if (!isValid) {
        this.clearSession();
        this.showAlert('Invalid session. Please enter a new key', 'error');
        return;
      }
      if (now > expires) {
        this.clearSession();
        this.showAlert('Session expired. Please enter a new key', 'error');
        return;
      }
      window.location.href = '/home.html';
    } catch (error) {
      console.error('Session check error:', error);
      this.clearSession();
    }
  }
}
