async function checkAuth() {
  try {
    const loggedIn = localStorage.getItem('loggedIn');
    const savedKey = localStorage.getItem('loggedInKey');
    const timestamp = localStorage.getItem('loginTimestamp');

    console.debug('Auth Check - Session State:', {
      loggedIn,
      hasKey: !!savedKey,
      timestamp: timestamp ? new Date(parseInt(timestamp)) : null
    });

    // If missing any session data
    if (!loggedIn || !savedKey || !timestamp) {
      console.debug('Auth Check Failed - Missing session data');
      redirectToErrorPage('expired');
      return;
    }

    const now = Date.now();
    const expires = parseInt(timestamp) + 24 * 60 * 60 * 1000; // 24 hours expiry

    console.debug('Auth Check - Expiration:', {
      now: new Date(now),
      expires: new Date(expires),
      timeRemaining: Math.round((expires - now) / 1000 / 60) + ' minutes'
    });

    // If session expired
    if (now > expires) {
      console.debug('Auth Check Failed - Session expired');
      clearSession();
      redirectToErrorPage('expired');
      return;
    }

    // Fetch valid key list and validate the saved key
    const response = await fetch('oxbe.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.debug('Auth Check - Key validation:', {
      keyExists: data.validKeys.includes(savedKey),
      totalValidKeys: data.validKeys.length
    });

    // If the saved key is invalid
    if (!data.validKeys.includes(savedKey)) {
      console.debug('Auth Check Failed - Invalid key');
      clearSession();
      redirectToErrorPage('expired');
      return;
    }

  } catch (error) {
    console.error('Auth Check Failed - General error:', error);
    clearSession();
    redirectToErrorPage('error');
  }
}

// Clears all session data from localStorage
function clearSession() {
  console.debug('Clearing session data');
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('loggedInKey');
  localStorage.removeItem('loginTimestamp');
}

// Redirect to error page with a specific error code
function redirectToErrorPage(errorType) {
  window.location.href = `/?${errorType}=true`;
}

// Start the initial check and set an interval for periodic checks
checkAuth();
setInterval(checkAuth, 5 * 60 * 1000); // Every 5 minutes
