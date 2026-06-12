const html = document.documentElement;
const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const animatedElements = document.querySelectorAll(".fade-up");

const savedTheme = localStorage.getItem("altepet-theme");

if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    themeIcon.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", nextTheme);
    localStorage.setItem("altepet-theme", nextTheme);
    themeIcon.textContent = nextTheme === "dark" ? "☀️" : "🌙";
});

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

animatedElements.forEach((element) => observer.observe(element));
