// 1. Inisialisasi AOS Animation
AOS.init({
    duration: 650,
    once: true
});

// 2. Efek Mengetik (Typing Effect) - Role IT Entry-Level
const roles = [
    "Web Development",
    "System Analysis",
    "Application Support",
    "Frond-End Dev",
    "UI/UX Wireframing"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex--);
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex++);
    }

    let speed = isDeleting ? 45 : 95;

    if (!isDeleting && charIndex === currentRole.length + 1) {
        speed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 350;
    }
    setTimeout(typeEffect, speed);
}
typeEffect();

// 3. Dark / Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const htmlEl = document.documentElement;

themeToggle.addEventListener("click", () => {
    const currentTheme = htmlEl.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-bs-theme", newTheme);
    themeIcon.className = newTheme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
});

// 4. Fungsi Lightbox Otomatis (Mendeteksi PDF Sertifikat maupun Gambar JPG/PNG)
function openLightbox(fileUrl, captionText) {
    const imgEl = document.getElementById("lightboxImage");
    const pdfEl = document.getElementById("lightboxPdf");
    const openTabBtn = document.getElementById("lightboxOpenTab");
    
    document.getElementById("lightboxCaption").textContent = captionText;
    openTabBtn.href = fileUrl;

    // Cek apakah file berformat .pdf (huruf kecil maupun besar)
    if (fileUrl.toLowerCase().endsWith(".pdf")) {
        imgEl.classList.add("d-none");
        imgEl.src = "";
        
        pdfEl.classList.remove("d-none");
        pdfEl.src = fileUrl;
    } else {
        pdfEl.classList.add("d-none");
        pdfEl.src = "";
        
        imgEl.classList.remove("d-none");
        imgEl.src = fileUrl;
    }

    const modal = new bootstrap.Modal(document.getElementById("imageLightboxModal"));
    modal.show();
}

// Bersihkan memori PDF saat modal ditutup
document.getElementById("imageLightboxModal").addEventListener("hidden.bs.modal", () => {
    document.getElementById("lightboxPdf").src = "";
});

// 5. Filter Keahlian (Skills Filter)
const filterButtons = document.querySelectorAll(".btn-filter");
const skillItems = document.querySelectorAll(".skill-item");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");
        skillItems.forEach(item => {
            if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// 6. Integrasi Form Kontak ke WhatsApp
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("senderName").value;
    const msg = document.getElementById("senderMsg").value;
    const waUrl = `https://wa.me/6285179601554?text=${encodeURIComponent(`Halo Dinda, saya ${name}.\n\n${msg}`)}`;
    window.open(waUrl, "_blank");
});