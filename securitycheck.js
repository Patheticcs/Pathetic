async function checkAuth() {
  try {
    const loggedIn = localStorage.getItem('loggedIn');
    const savedKey = localStorage.getItem('loggedInKey');
    const timestamp = localStorage.getItem('loginTimestamp');
    if (!loggedIn || !savedKey || !timestamp) {
      window.location.href = '/?expired=true';
      return;
    }
    const now = Date.now();
    const expires = parseInt(timestamp) + 24 * 60 * 60 * 1000;
    if (now > expires) {
      clearSession();
      window.location.href = '/?expired=true';
      return;
    }
    const response = await fetch('validkeys.json');
    const data = await response.json();
    if (!data.validKeys.includes(savedKey)) {
      clearSession();
      window.location.href = '/?expired=true';
      return;
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    clearSession();
    window.location.href = '/?expired=true';
  }
}

function clearSession() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('loggedInKey');
  localStorage.removeItem('loginTimestamp');
}

checkAuth();

setInterval(() => {
  checkAuth().catch((error) => {
    console.error('Periodic auth check failed:', error);
  });
}, 5 * 60 * 1000);