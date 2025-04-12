// Navigation functionality
document.querySelectorAll(".nav-links li").forEach((item) => {
  item.addEventListener("click", function () {
    // Remove active class from all links and sections
    document
      .querySelectorAll(".nav-links li")
      .forEach((link) => link.classList.remove("active"));
    document
      .querySelectorAll(".section")
      .forEach((section) => section.classList.remove("active"));

    // Add active class to clicked link
    this.classList.add("active");

    // Show corresponding section
    const sectionId = this.getAttribute("data-section");
    document.getElementById(sectionId).classList.add("active");
  });
});

// Toggle school details
function toggleDetails(id) {
  const details = document.getElementById(id);
  if (details.style.display === "block") {
    details.style.display = "none";
  } else {
    details.style.display = "block";
  }
}

// Image detail modal functions
function showImageDetails(imgSrc, title, description) {
  const modal = document.getElementById("imageDetailModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");

  modalImg.src = imgSrc;
  modalTitle.textContent = title;
  modalDesc.textContent = description;

  modal.style.display = "flex";

  // Prevent page scrolling when modal is open
  document.body.style.overflow = "hidden";
}

function closeImageModal() {
  document.getElementById("imageDetailModal").style.display = "none";
  // Restore page scrolling
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside of content
window.onclick = function (event) {
  const modal = document.getElementById("imageDetailModal");
  if (event.target === modal) {
    closeImageModal();
  }
};

// Particle cursor effect
class ParticleCanvas {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.init();
  }

  init() {
    // Set canvas to full window size
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    // Track mouse movement
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Start animation loop
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    // Only create particles when mouse moves
    if (
      Math.abs(this.mouseX - this.lastMouseX) > 5 ||
      Math.abs(this.mouseY - this.lastMouseY) > 5
    ) {
      // Create particles in the trail of mouse movement
      for (let i = 0; i < 3; i++) {
        this.particles.push({
          x: this.mouseX + (Math.random() - 0.5) * 20,
          y: this.mouseY + (Math.random() - 0.5) * 20,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: `hsla(190, 100%, ${50 + Math.random() * 30}%, ${
            Math.random() * 0.5 + 0.5
          })`,
          life: 100,
        });
      }

      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;
    }
  }

  updateParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Update position
      p.x += p.speedX;
      p.y += p.speedY;

      // Reduce life
      p.life -= 1;

      // Remove dead particles
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        i--;
      }
    }
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      this.ctx.globalAlpha = p.life / 100;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  animate() {
    this.createParticle();
    this.updateParticles();
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize the particle canvas
window.addEventListener("DOMContentLoaded", () => {
  new ParticleCanvas();
});
