// Constants
const WEBHOOK_URL = "https://your-n8n-or-form-backend/webhook";

// Data Arrays
const highlights = [
    {
        icon: "🏆",
        title: "Youngest Achiever",
        desc: "Cleared Class 10 at the youngest age in the region"
    },
    {
        icon: "📺",
        title: "Media Recognition",
        desc: "Featured across multiple national and international media outlets"
    },
    {
        icon: "🤖",
        title: "Automation Builder",
        desc: "Created intelligent agents and workflows for business process optimization"
    }
];

const projects = [
    {
        title: "Faceless Video",
        desc: "Automated video generation system that creates engaging content without showing faces, perfect for social media and marketing.",
        image: "🎬",
        badges: ["Python", "Automation", "AI", "Video Processing"],
        github: "https://github.com/sahejpreet",
        live: "https://faceless-video.demo"
    },
    {
        title: "Sahej X",
        desc: "Advanced AI assistant powered by machine learning algorithms, designed to help with data analysis and business intelligence tasks.",
        image: "🤖",
        badges: ["AI", "Machine Learning", "Python", "NLP"],
        github: "https://github.com/sahejpreet/sahejx",
        live: "https://sahejx.demo"
    }
];

const skillsByCategory = {
    "Programming": ["Python", "SQL", "JavaScript", "R", "DAX", "M Query"],
    "Data Analysis": ["Pandas", "NumPy", "scikit-learn", "Statistics", "Machine Learning"],
    "Business Intelligence": ["Power BI", "Tableau", "Looker Studio", "Excel", "Google Analytics"],
    "Cloud & APIs": ["Google Cloud", "BigQuery", "REST APIs", "Google Sheets API", "Azure"],
    "Automation": ["n8n", "Power Automate", "Zapier", "Python Scripts", "Web Scraping"],
    "AI & Voice": ["TTS/STT", "NLP", "OpenAI API", "Speech Recognition", "Text Analysis"]
};

const certs = [
  // Infosys Core (24)
  { name: "Programming Using C++", issuer: "Infosys", logo: "C++", pdf: "certs/c-plus-plus.pdf" },
  { name: "Programming Using Java", issuer: "Infosys", logo: "JAVA", pdf: "certs/java.pdf" },
  { name: "Introduction to Python", issuer: "Infosys", logo: "PY", pdf: "certs/python.pdf" },
  { name: "Robotics (RPA)", issuer: "Infosys", logo: "ROB", pdf: "certs/robotics.pdf" },
  { name: "JavaScript", issuer: "Infosys", logo: "JS", pdf: "certs/javascript.pdf" },
  { name: "Data Science", issuer: "Infosys", logo: "DS", pdf: "certs/data-science.pdf" },
  { name: "Introduction to Deep Learning", issuer: "Infosys", logo: "DL", pdf: "certs/deep-learning.pdf" },
  { name: "Introduction to Cyber Security", issuer: "Infosys", logo: "SEC", pdf: "certs/cybersecurity.pdf" },
  { name: "Design Thinking", issuer: "Infosys", logo: "DT", pdf: "certs/design-thinking.pdf" },
  { name: "Essentials of Cloud Computing", issuer: "Infosys", logo: "CC", pdf: "certs/cloud-computing.pdf" },
  { name: "Internet of Things (IoT)", issuer: "Infosys", logo: "IoT", pdf: "certs/iot.pdf" },
  { name: "Time Management", issuer: "Infosys", logo: "TM", pdf: "certs/time-management.pdf" },
  { name: "Fundamentals of Information Security", issuer: "Infosys", logo: "IS", pdf: "certs/information-security.pdf" },
  { name: "Introduction to Artificial Intelligence", issuer: "Infosys", logo: "AI", pdf: "certs/artificial-intelligence.pdf" },
  { name: "Software Engineering", issuer: "Infosys", logo: "SE", pdf: "certs/software-engineering.pdf" },
  { name: "Business Communication", issuer: "Infosys", logo: "BC", pdf: "certs/business-communication.pdf" },
  { name: "Introduction to Natural Language Processing", issuer: "Infosys", logo: "NLP", pdf: "certs/nlp.pdf" },
  { name: "HTML5 Programming", issuer: "Infosys", logo: "HTML5", pdf: "certs/html5.pdf" },
  { name: "CSS3 Programming", issuer: "Infosys", logo: "CSS3", pdf: "certs/css3.pdf" },
  { name: "ITIL Awareness", issuer: "Infosys", logo: "ITIL", pdf: "certs/itil-awareness.pdf" },
  { name: "Banking (Young Industry Enthusiast)", issuer: "Infosys", logo: "BANK", pdf: "certs/banking.pdf" },
  { name: "Email Writing Skills", issuer: "Infosys", logo: "MAIL", pdf: "certs/email-writing.pdf" },
  { name: "Regression Analysis", issuer: "Infosys", logo: "REG", pdf: "certs/regression-analysis.pdf" },
  { name: "Capital Markets (Young Industry Enthusiast)", issuer: "Infosys", logo: "CAP", pdf: "certs/capital-markets.pdf" },

  // IBM Extras (3)
  { name: "AI for Everyone: Master the Basics", issuer: "IBM", logo: "AI", pdf: "certs/ai-for-everyone.pdf" },
  { name: "Beginners Guide to Cybersecurity", issuer: "IBM", logo: "IBM-SEC", pdf: "certs/cybersecurity-ibm.pdf" },
  { name: "Models and Platforms for Generative AI", issuer: "IBM", logo: "GEN-AI", pdf: "certs/generative-ai-platforms.pdf" },

  // NYIF (1)
  { name: "Stock Trading Professional Certification", issuer: "NYIF (edX)", logo: "TRADE", pdf: "certs/trading-professional.pdf" }
];

const press = [
    { name: "Times of India", url: "https://timesofindia.com", logo: "TOI" },
    { name: "ABP Majha", url: "https://abpmajha.com", logo: "ABP" },
    { name: "Red FM Canada", url: "https://redfm.ca", logo: "RED" },
    { name: "Prime Asia TV", url: "https://primeasiatv.com", logo: "PAT" }
];

// DOM Elements
let currentSection = 'home';
let isScrolling = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderContent();
    setupNavigation();
    setupContactForm();
    setupScrollReveal();
});

// Render all dynamic content
function renderContent() {
    renderHighlights();
    renderProjects();
    renderSkills();
    renderCerts();
    renderPress();
}

// Render About highlights
function renderHighlights() {
    const container = document.getElementById('highlights-grid');
    if (!container) return;
    
    container.innerHTML = highlights.map(highlight => `
        <div class="highlight-card glass-card scroll-reveal">
            <div class="highlight-icon">${highlight.icon}</div>
            <h3 class="highlight-title">${highlight.title}</h3>
            <p class="highlight-desc">${highlight.desc}</p>
        </div>
    `).join('');
}

// Render Projects
function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    
    if (projects.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Projects coming soon...</p>';
        return;
    }
    
    container.innerHTML = projects.map(project => `
        <div class="project-card scroll-reveal">
            <div class="project-image">${project.image}</div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.desc}</p>
                <div class="project-badges">
                    ${project.badges.map(badge => `<span class="badge">${badge}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="link-btn" target="_blank" rel="noopener">GitHub</a>
                    <a href="${project.live}" class="link-btn" target="_blank" rel="noopener">Live Demo</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Skills
function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    container.innerHTML = Object.entries(skillsByCategory).map(([category, skills]) => `
        <div class="skill-category scroll-reveal">
            <h3 class="skill-category-title">${category}</h3>
            <div class="skills-pills">
                ${skills.map(skill => `<span class="pill">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Render Certifications (UPDATED to include "View PDF" when available)
function renderCerts() {
    const container = document.getElementById('certs-grid');
    if (!container) return;
    
    if (certs.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Nothing here yet.</p>';
        return;
    }
    
    container.innerHTML = certs.map(cert => `
        <div class="cert-card scroll-reveal">
            <div class="cert-logo">${cert.logo}</div>
            <h3 class="cert-name">${cert.name}</h3>
            <p class="cert-issuer">${cert.issuer}</p>
            ${cert.pdf ? `<a class="link-btn" href="${cert.pdf}" target="_blank" rel="noopener" aria-label="Open ${cert.name} certificate PDF">View PDF</a>` : ""}
        </div>
    `).join('');
}

// Render Press Coverage
function renderPress() {
    const container = document.getElementById('press-grid');
    if (!container) return;
    
    container.innerHTML = press.map(outlet => `
        <a href="${outlet.url}" class="press-card scroll-reveal" target="_blank" rel="noopener">
            <div class="press-logo">${outlet.logo}</div>
            <h3 class="press-name">${outlet.name}</h3>
        </a>
    `).join('');
}

// Setup Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting on scroll
    function updateActiveNav() {
        if (isScrolling) return;
        
        const scrollPos = window.scrollY + 100;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        if (current !== currentSection) {
            currentSection = current;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Throttled scroll event
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNav, 100);
    });
}

// Setup Contact Form
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusDiv = document.getElementById('form-status');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = (formData.get('name') || "").trim();
        const email = (formData.get('email') || "").trim();
        const purpose = (formData.get('purpose') || "").trim();
        const message = (formData.get('message') || "").trim();
        const website = formData.get('website'); // Honeypot
        
        // Honeypot check
        if (website) {
            return;
        }
        
        // Demo message (hook this to your backend later)
        showFormStatus('This is a demo portfolio. In production, this would send your message!', 'success');
        form.reset();
    });
}

// Show form status message
function showFormStatus(message, type) {
    const statusDiv = document.getElementById('form-status');
    if (!statusDiv) return;
    
    statusDiv.textContent = message;
    statusDiv.className = `form-status ${type} show`;
    
    // Hide after 5 seconds
    setTimeout(() => {
        statusDiv.classList.remove('show');
    }, 5000);
}

// Setup Scroll Reveal Animation
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll-reveal class
    function observeScrollElements() {
        const scrollElements = document.querySelectorAll('.scroll-reveal');
        scrollElements.forEach(el => {
            if (!el.classList.contains('revealed')) {
                observer.observe(el);
            }
        });
    }
    
    // Initial observation
    setTimeout(observeScrollElements, 100);
    
    // Re-observe after content is rendered
    setTimeout(observeScrollElements, 500);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle resize events for performance
const handleResize = debounce(() => {
    // Handle any resize logic here
}, 250);

window.addEventListener('resize', handleResize);

// Performance optimization: Lazy load images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('loading');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading after content is rendered
setTimeout(setupLazyLoading, 100);

// Export for external use
window.portfolioApp = {
    showFormStatus,
    currentSection,
    highlights,
    projects,
    skillsByCategory,
    certs,
    press
};
