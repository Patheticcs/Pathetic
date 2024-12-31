      function navigateTo(url) {
        window.location.href = url;
      }
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
      const buttons = document.querySelectorAll('.button');
      buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
          const {
            offsetWidth: width,
            offsetHeight: height
          } = button;
          const rect = button.getBoundingClientRect();
          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;
          const x = (offsetX / width) * 2 - 1;
          const y = (offsetY / height) * 2 - 1;
          button.style.transform = `perspective(1000px) scale(1.03) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
        });
        button.addEventListener('mouseleave', () => {
          button.style.transform = 'perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)';
        });
      });
      document.addEventListener('contextmenu', (e) => e.preventDefault());
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.keyCode === 123) {
          e.preventDefault();
        }
      });
