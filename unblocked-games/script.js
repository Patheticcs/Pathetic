      document.addEventListener('DOMContentLoaded', () => {
        const sections = document.querySelectorAll('.section');
        const PERSPECTIVE = '1000px';
        const SCALE = 1.02;
        const ROTATION_MULTIPLIER = 5;
        
        sections.forEach((section) => {
          section.style.transition = 'transform 0.4s ease-out';
          
          section.addEventListener('mousemove', (e) => {
            const { offsetWidth: width, offsetHeight: height } = section;
            const rect = section.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            const x = (offsetX / width) * 2 - 1;
            const y = (offsetY / height) * 2 - 1;
            
            section.style.transform = `
              perspective(${PERSPECTIVE})
              scale(${SCALE})
              rotateX(${y * -ROTATION_MULTIPLIER}deg)
              rotateY(${x * ROTATION_MULTIPLIER}deg)
            `;
          });
          
          section.addEventListener('mouseleave', () => {
            section.style.transform = `
              perspective(${PERSPECTIVE})
              scale(1)
              rotateX(0deg)
              rotateY(0deg)
            `;
          });
        });
      });

      function loadGameIframe(game) {
        let iframeSrc = '';
        if (game === 'roblox') {
          iframeSrc = 'https://pathetic-roblox-main.vercel.app';
        } else if (game === 'minecraft') {
          iframeSrc = 'https://pathetic-minecraft.vercel.app';
        }
        
        const iframe = document.createElement('iframe');
        iframe.src = iframeSrc;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.position = 'fixed';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.zIndex = '9999';
        document.body.appendChild(iframe);
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
