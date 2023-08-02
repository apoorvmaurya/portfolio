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

// ... Your existing JavaScript code ...

// Function to show the main section and start animations
function showMainSectionAndAnimate() {
    const mainSection = document.querySelector('main');
    mainSection.style.display = 'block';
    playAnimationsOnScroll(); // Start animations when the main section becomes visible
  }
  
  // Add an event listener to trigger showing the main section and animations when the page loads
  window.addEventListener('load', showMainSectionAndAnimate);
  
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const elementCenter = rect.left + rect.width / 2;
  
    if (elementCenter < viewportWidth / 3) {
      return 'left';
    } else if (elementCenter > (2 * viewportWidth) / 3) {
      return 'right';
    } else {
      return 'center';
    }
  }
  
  // Function to trigger animations based on element position in the viewport
  function playAnimationsOnScroll() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      if (isElementInViewport(card)) {
        const position = getElementPosition(card);
        if (position === 'left') {
          card.style.animation = 'fadeInLeft 1.5s forwards';
        } else if (position === 'right') {
          card.style.animation = 'fadeInRight 1.5s forwards';
        } else {
          card.style.animation = 'fadeInCenter 1.5s forwards';
        }
      }
    });
  }
  
  // Add an event listener to trigger the animations on scroll
  window.addEventListener('scroll', playAnimationsOnScroll);
  
  // Trigger the animations when the page loads (in case elements are already visible)
  playAnimationsOnScroll();
  