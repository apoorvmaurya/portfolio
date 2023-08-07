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
const observer = new IntersectionObserver(animateElements, { threshold: 0.2 });

// Observe all the elements with the 'animate' class
const animateElementsList = document.querySelectorAll('.animate');
animateElementsList.forEach(element => observer.observe(element));

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
