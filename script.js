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


// 🌸 Q2: User Activity Logging (click/view)
function logEvent(event) {
  const timestamp = new Date().toISOString();
  const eventType = event.type === 'click' ? 'click' : 'view';

  let targetType = event.target.tagName.toLowerCase();
  if (event.target.tagName.toLowerCase() === 'img') {
    targetType = 'image';
  } else if (event.target.tagName.toLowerCase() === 'select') {
    targetType = 'dropdown';
  } else if (['p', 'h1', 'h2', 'h3', 'span'].includes(targetType)) {
    targetType = 'text';
  } else if (event.target.tagName.toLowerCase() === 'a') {
    targetType = 'link';
  }

  console.log(`${timestamp} , ${eventType} , ${targetType}`);
}

window.addEventListener("load", () => {
  logEvent({ type: "view", target: document.body });
});

document.addEventListener("click", logEvent);

// 🌼 Q3: Text Analyzer with Counts

// 🌷 Show initial "0" stats on page load
window.addEventListener("DOMContentLoaded", () => {
  const result = `
Letters: 0
Words: 0
Spaces: 0
Newlines: 0
Special Symbols: 0

Pronoun Count: 0
Pronoun Counts: {}

Preposition Count: 0
Preposition Counts: {}

Indefinite Article Count: 0
Indefinite Article Counts: {}
  `;
  const output = document.getElementById("analysisResult");
  if (output) {
    output.innerText = result;
  }
});


function analyzeText() {
  const text = document.getElementById("textInput").value;
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const words = (text.match(/\b\w+\b/g) || []).length;
  const spaces = (text.match(/ /g) || []).length;
  const newlines = (text.match(/\n/g) || []).length;
  const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

  const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
  const prepositions = ['in', 'on', 'at', 'with', 'by', 'for', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below'];
  const articles = ['a', 'an', 'the'];

  const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

  const countOccurrences = (group) =>
    group.reduce((acc, word) => {
      const count = tokens.filter(token => token === word).length;
      if (count) acc[word] = count;
      return acc;
    }, {});

  const pronounCounts = countOccurrences(pronouns);
  const prepositionCounts = countOccurrences(prepositions);
  const articleCounts = countOccurrences(articles);

  const totalPronouns = Object.values(pronounCounts).reduce((a, b) => a + b, 0);
  const totalPrepositions = Object.values(prepositionCounts).reduce((a, b) => a + b, 0);
  const totalArticles = Object.values(articleCounts).reduce((a, b) => a + b, 0);

  const result = `
Letters: ${letters}
Words: ${words}
Spaces: ${spaces}
Newlines: ${newlines}
Special Symbols: ${specialSymbols}

Pronoun Count: ${totalPronouns}
Pronoun Counts: ${JSON.stringify(pronounCounts, null, 2)}

Preposition Count: ${totalPrepositions}
Preposition Counts: ${JSON.stringify(prepositionCounts, null, 2)}

Indefinite Article Count: ${totalArticles}
Indefinite Article Counts: ${JSON.stringify(articleCounts, null, 2)}
  `;

  document.getElementById("analysisResult").innerText = result;
}

// 💫 Reset text analyzer when leaving the contact section
const navLinks = document.querySelectorAll(".nav-links li");
const sections = document.querySelectorAll(".section");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("data-section");

    // Hide all sections
    sections.forEach(section => {
      section.classList.remove("active");

      // Clear text area if leaving the contact section
      if (section.id === "contact") {
        const textInput = document.getElementById("textInput");
        const result = document.getElementById("analysisResult");
        if (textInput && result) {
          textInput.value = "";
          result.innerText = "";
        }
      }
    });

    // Show target section
    document.getElementById(targetId).classList.add("active");

    // Update nav active link
    navLinks.forEach(link => link.classList.remove("active"));
    link.classList.add("active");
  });
});

