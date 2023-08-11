const design_card_butttons = document.querySelectorAll('.design-card');
const introduction_text = document.querySelectorAll('.introduction-text');

const single_profile_card = document.querySelectorAll('.single-profile-card');

design_card_butttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        introduction_text.forEach((introduction, introductionIndex) => {
            if (index === introductionIndex) {
                introduction.style.display = 'block';
            } else {
                introduction.style.display = 'none';
            }
        });
        design_card_butttons.forEach((btn, btnIndex) => {
            if (index === btnIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
                
            }
        });
    });
});


// Function to handle animations based on element position
function animateElements() {
  const sections = document.querySelectorAll('.animate');

  sections.forEach(section => {
    if (isElementInViewport(section)) {
      const rect = section.getBoundingClientRect();
      const center = window.innerWidth / 2;

      if (rect.left < center && rect.right < center) {
        section.classList.add('animate-left');
      } else if (rect.left > center && rect.right > center) {
        section.classList.add('animate-right');
      } else {
        section.classList.add('animate-center');
      }

      // Once the animation is applied, remove the observer for this element
      observer.unobserve(section);
    }
  });
}

// Create the Intersection Observer
document.addEventListener('DOMContentLoaded', function () {
  const navigationLinks = document.querySelectorAll('.navbar-menu a');
  const contentBodySection = document.getElementById('content-body');
  const introductionSection = document.getElementById('introduction');
  const projectsSection = document.getElementById('projects');
  const footerSection = document.getElementById('footer');

  function handleIntersection(entries) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const targetId = entry.target.id;
              navigationLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${targetId}`) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }

  const animateObserver = new IntersectionObserver(handleIntersection, { threshold: 0.2 });
  animateObserver.observe(contentBodySection);
  animateObserver.observe(introductionSection);
  animateObserver.observe(projectsSection);
  animateObserver.observe(footerSection);

  navigationLinks.forEach(link => {
      link.addEventListener('click', function (event) {
          event.preventDefault();
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          targetSection.scrollIntoView({ behavior: 'smooth' });
      });
  });
});


// Observe all the elements with the 'animate' class
const animateElementsList = document.querySelectorAll('.animate');
animateElementsList.forEach(element => observer.observe(element));


document.addEventListener('DOMContentLoaded', function () {
  const navigationLinks = document.querySelectorAll('.navbar-menu a');
  const introductionSection = document.getElementById('introduction');
  const contactsSection = document.getElementById('footer');

  navigationLinks.forEach(link => {
      link.addEventListener('click', function (event) {
          event.preventDefault();
          
          // Remove active class from all links
          navigationLinks.forEach(link => link.classList.remove('active'));
          
          // Add active class to the clicked link
          link.classList.add('active');
          
          // Scroll to the corresponding section
          if (link.getAttribute('href') === '#introduction') {
              introductionSection.scrollIntoView({ behavior: 'smooth' });
          } else if (link.getAttribute('href') === '#footer') {
              contactsSection.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });
});

document.getElementById('footer').addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const jsonData = {};

  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  fetch('/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => response.text())
    .then((message) => {
      document.getElementById('messageStatus').textContent = message;
    })
    .catch((error) => {
      console.error(error);
      document.getElementById('messageStatus').textContent =
        'Failed to send the message. Please try again later.';
    });
});
