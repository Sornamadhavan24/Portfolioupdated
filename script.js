const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const navLinks = document.querySelectorAll(".sidebar a");
const projectCards = document.querySelectorAll(".project-card[data-url]");

function toggleMenu(event) {
    if (event) {
        event.stopPropagation();
    }
    sidebar.classList.toggle("active");
}

function closeMenu() {
    sidebar.classList.remove("active");
}

menuBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", closeMenu);
navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target) && sidebar.classList.contains("active")) {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

const roles = [
    "responsive web experiences",
    "full-stack projects",
    "clean and practical interfaces"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[index];
    const displayedText = isDeleting
        ? currentRole.substring(0, charIndex--)
        : currentRole.substring(0, charIndex++);

    document.getElementById("typing-effect").textContent = displayedText;

    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 1100);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % roles.length;
    }

    setTimeout(typeEffect, isDeleting ? 55 : 95);
}

typeEffect();

projectCards.forEach((card) => {
    card.addEventListener("click", () => {
        const { url } = card.dataset;
        if (!url) {
            return;
        }

        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = url;
        }, 220);
    });
});
