document.addEventListener('DOMContentLoaded', () => {
  const glassImage = document.querySelector('.section7 img');
  
  if (!glassImage) return;

  // Add initial transform style
  glassImage.style.transform = 'rotate(0deg)';
  glassImage.style.transition = 'transform 0.5s ease-in-out';

  // Function to calculate glass rotation based on scroll position
  function handleScroll() {
    const section = document.querySelector('.section7');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = section.offsetHeight;
    
    // Calculate scroll progress through section
    const progress = Math.min(
      1,
      Math.max(0, (rect.top - windowHeight) / (sectionHeight - windowHeight))
    );

    // Rotate glass from 0 to 180 degrees
    const rotation = progress * 180;
    glassImage.style.transform = `rotate(${rotation}deg)`;
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Initial call
  handleScroll();
});