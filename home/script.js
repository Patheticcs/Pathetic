      document.addEventListener('DOMContentLoaded', () => {
        const header = document.querySelector('header');
        const getStartedBtn = document.getElementById('get-started-btn');
        const welcomeSection = document.getElementById('welcome');
        let lastScrollY = window.scrollY;
        const links = document.querySelectorAll('header nav ul li a');
        links.forEach(link => {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
              targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        });
        window.addEventListener('scroll', () => {
          const currentScrollY = window.scrollY;
          header.classList.toggle('visible', currentScrollY > 50);
          lastScrollY = currentScrollY;
        });
        getStartedBtn.addEventListener('click', () => {
          document.querySelector('#roblox').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          header.classList.add('visible');
        });
        const observerOptions = {
          threshold: 0.1
        };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        document.querySelectorAll('.section').forEach(section => {
          observer.observe(section);
        });
        window.addEventListener('load', () => {
          if (window.location.hash !== "#welcome" && !document.querySelector('#welcome').classList.contains('visible')) {
            window.scrollTo(0, 0);
            welcomeSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
        window.addEventListener('beforeunload', () => {
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo(0, 0);
        });
        window.addEventListener('load', () => {
          setTimeout(() => {
            document.documentElement.style.scrollBehavior = 'smooth';
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, 0);
        });
      });
      document.getElementById('get-started-btn').addEventListener('click', () => {
        document.documentElement.style.overflow = 'auto';
      });
      document.addEventListener('DOMContentLoaded', () => {
        const observerOptions = {
          threshold: 0.1
        };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            } else {
              entry.target.classList.remove("visible");
            }
          });
        }, observerOptions);
        document.querySelectorAll('.section').forEach(section => {
          observer.observe(section);
        });
        observer.observe(document.querySelector('.about'));
      });
      document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      });
      document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && !(e.key === 'a' || e.key === 'v')) {
          e.preventDefault();
        }
        if (e.keyCode === 123) {
          e.preventDefault();
        }
      });
