let currentSlide = 0;
const slides = document.querySelectorAll(".slides img");
const totalSlides = slides.length;

// Initialize slideshow
function showSlide(index, direction = 1) {
  const prevSlide = currentSlide;
  currentSlide = (index + totalSlides) % totalSlides;

  // Reset all slides
  slides.forEach((slide) => {
    slide.style.display = "none";
    slide.style.position = "absolute";
    slide.style.transition = "transform 0.5s ease-in-out";
    slide.style.width = "100%";
    slide.style.height = "100%";
    slide.style.objectFit = "cover"; // Ensure images fit within the container without cropping
  });

  // Prepare current and previous slides
  slides[prevSlide].style.display = "block";
  slides[currentSlide].style.display = "block";
  slides[currentSlide].style.transform =
    direction > 0 ? "translateX(100%)" : "translateX(-100%)";

  // Trigger animation
  requestAnimationFrame(() => {
    slides[prevSlide].style.transform =
      direction > 0 ? "translateX(-100%)" : "translateX(100%)";
    slides[currentSlide].style.transform = "translateX(0)";
  });
}

// Navigate slides
function navigateSlide(direction) {
  showSlide(currentSlide + direction, direction);
}

// Auto-slide every 3 seconds
let autoSlide = setInterval(() => {
  navigateSlide(1);
}, 3000);

// Pause auto-slide on button hover
const buttons = document.querySelectorAll(".slidbutton");
buttons.forEach((button) => {
  button.addEventListener("mouseover", () => clearInterval(autoSlide));
  button.addEventListener("mouseout", () => {
    autoSlide = setInterval(() => {
      navigateSlide(1);
    }, 3000);
  });
});

// Initialize the first slide
showSlide(currentSlide);
