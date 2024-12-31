    function initializeButtons() {
      const buttons = document.querySelectorAll('.button');
      buttons.forEach((button, index) => {
        button.style.animationDelay = `${index * 0.05}s`;
      });
    }

    function filterButtons() {
      const input = document.getElementById('searchInput');
      const filter = input.value.toLowerCase();
      const buttons = document.querySelectorAll('.button');
      
      buttons.forEach(button => {
        const text = button.textContent || button.innerText;
        const shouldShow = text.toLowerCase().includes(filter);
        
        if(shouldShow) {
          button.style.display = '';
          button.style.animation = 'fadeIn 0.3s ease-out forwards';
        } else {
          button.style.display = 'none';
        }
      });
    }

    function navigateTo(path) {
      window.location.href = path;
    }

    function openLink(url) {
      window.open(url, '_blank');
    }

    document.addEventListener('DOMContentLoaded', initializeButtons);

      document.addEventListener('contextmenu', e => e.preventDefault());
      document.addEventListener('keydown', e => {
        if ((e.ctrlKey && !['a', 'v'].includes(e.key)) || e.keyCode === 123) {
          e.preventDefault();
        }
      });
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
