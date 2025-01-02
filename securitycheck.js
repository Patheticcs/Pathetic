async function checkAuth() {
  try {
    const auth = {
      loggedIn: localStorage.getItem('loggedIn'),
      key: localStorage.getItem('loggedInKey'),
      timestamp: localStorage.getItem('loginTimestamp')
    };
    
    if (!auth.loggedIn || !auth.key || !auth.timestamp) {
      await handleExpired('Missing auth data');
      return false;
    }

    const now = Date.now();
    const expires = parseInt(auth.timestamp) + 24 * 60 * 60 * 1000;
    if (now > expires) {
      await handleExpired('Session expired');
      return false;
    }

    const response = await fetch('0xbe.json');
    if (!response.ok) {
      throw new Error('Failed to load keys file');
    }
    const data = await response.json();
    
    if (!data.validKeys.includes(auth.key)) {
      await handleExpired('Invalid key');
      return false;
    }

    return true;

  } catch (error) {
    console.error('Auth check failed:', error);
    await handleExpired(error.message);
    return false;
  }
}

async function handleExpired(reason) {
  clearSession();
  if (!window.location.search.includes('expired')) {
    window.location.href = `/?expired=true&reason=${encodeURIComponent(reason)}`;
  }
}

function clearSession() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('loggedInKey');
  localStorage.removeItem('loginTimestamp');
  if (window._authCheckInterval) {
    clearInterval(window._authCheckInterval);
  }
}

checkAuth();

window._authCheckInterval = setInterval(checkAuth, 5 * 60 * 1000);
