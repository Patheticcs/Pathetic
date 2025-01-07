async function checkAuth() {
  try {
    const loggedIn = localStorage.getItem('loggedIn');
    const savedKey = localStorage.getItem('loggedInKey');
    const timestamp = localStorage.getItem('loginTimestamp');

    console.debug('Auth Check - Session State:', {
      loggedIn,
      hasKey: !!savedKey,
      timestamp: new Date(parseInt(timestamp))
    });

    if (!loggedIn || !savedKey || !timestamp) {
      console.debug('Auth Check Failed - Missing session data');
      window.location.href = '/?expired=true';
      return;
    }

    const now = Date.now();
    const expires = parseInt(timestamp) + 24 * 60 * 60 * 1000;

    console.debug('Auth Check - Expiration:', {
      now: new Date(now),
      expires: new Date(expires),
      timeRemaining: Math.round((expires - now) / 1000 / 60) + ' minutes'
    });

    if (now > expires) {
      console.debug('Auth Check Failed - Session expired');
      clearSession();
      window.location.href = '/?expired=true';
      return;
    }

    try {

      const response = await fetch('oxbe.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      console.debug('Auth Check - Key validation:', {
        keyExists: data.validKeys.includes(savedKey),
        totalValidKeys: data.validKeys.length
      });

      if (!data.validKeys.includes(savedKey)) {
        console.debug('Auth Check Failed - Invalid key');
        clearSession();
        window.location.href = '/?expired=true';
        return;
      }
    } catch (error) {
      console.error('Auth Check Failed - Fetch error:', error);
      clearSession();
      window.location.href = '/?error=true';
      return;
    }
  } catch (error) {
    console.error('Auth Check Failed - General error:', error);
    clearSession();
    window.location.href = '/?expired=true';
  }
}

function clearSession() {
  console.debug('Clearing session data');
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('loggedInKey');
  localStorage.removeItem('loginTimestamp');
}

checkAuth();

setInterval(checkAuth, 5 * 60 * 1000);
