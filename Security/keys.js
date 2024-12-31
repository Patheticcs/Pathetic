        async function checkAuth() {
          try {
            const response = await fetch('keys.json');
            const data = await response.json();
            const savedKey = localStorage.getItem('loggedInKey');
            if (!localStorage.getItem('loggedIn') || !data.validKeys.includes(savedKey)) {
              window.location.href = '/';
            }
          } catch (error) {
            console.error('Auth check failed:', error);
            window.location.href = '/';
          }
        }
        checkAuth();
