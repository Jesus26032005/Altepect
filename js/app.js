document.documentElement.classList.add("js-enabled");
const html = document.documentElement;
const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("altepet-theme");
if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    themeIcon.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        document.body.classList.remove("menu-open");
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

const animatedElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .stagger");
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);

        counter.textContent = target === 100 ? `${value}` : `${value}`;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            counter.textContent = target === 100 ? "100" : String(target);
        }
    };

    requestAnimationFrame(step);
};

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                if (!countersStarted && entry.target.classList.contains("stats")) {
                    counters.forEach(animateCounter);
                    countersStarted = true;
                }
            }
        });
    },
    { threshold: 0.18 }
);

animatedElements.forEach((element) => observer.observe(element));

const stats = document.querySelector(".stats");
if (stats) observer.observe(stats);


/* Comparador de distribuciones */
const compareData = {
    gaming: {
        title: "Bazzite, Nobara o Garuda",
        text: "Para gaming buscamos buen soporte de drivers, Steam, Proton y configuraciones listas para jugar. Pop!_OS también es buena si quieres equilibrio entre trabajo y juegos.",
        tags: ["Bazzite", "Nobara", "Garuda", "Pop!_OS"]
    },
    oficina: {
        title: "Linux Mint, Ubuntu LTS o Zorin OS",
        text: "Para oficina conviene priorizar estabilidad, facilidad de uso, buen soporte de impresoras, navegador, documentos y videollamadas.",
        tags: ["Linux Mint", "Ubuntu LTS", "Zorin OS"]
    },
    antiguo: {
        title: "Lubuntu, MX Linux o Linux Lite",
        text: "Para equipos antiguos buscamos bajo consumo de recursos, escritorios ligeros y una experiencia sencilla para tareas básicas.",
        tags: ["Lubuntu", "MX Linux", "Linux Lite"]
    },
    desarrollo: {
        title: "Fedora, Ubuntu u openSUSE",
        text: "Para desarrollo importa la compatibilidad con herramientas, contenedores, documentación y paquetes actualizados.",
        tags: ["Fedora", "Ubuntu", "openSUSE"]
    },
    rendimiento: {
        title: "CachyOS",
        text: "Para máximo rendimiento y usuarios avanzados, CachyOS ofrece optimizaciones modernas y base Arch. No es la opción más tranquila para principiantes.",
        tags: ["CachyOS", "Arch-based", "Kernel optimizado"]
    }
};

const compareButtons = document.querySelectorAll(".compare-btn");
const compareResult = document.getElementById("compareResult");

if (compareButtons.length && compareResult) {
    compareButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const profile = button.dataset.profile;
            const data = compareData[profile];

            compareButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            compareResult.classList.add("changing");

            setTimeout(() => {
                compareResult.innerHTML = `
                    <p class="eyebrow">Recomendación Altépet</p>
                    <h3>${data.title}</h3>
                    <p>${data.text}</p>
                    <div class="result-tags">
                        ${data.tags.map((tag) => `<span>${tag}</span>`).join("")}
                    </div>
                `;

                compareResult.classList.remove("changing");
            }, 220);
        });
    });
}


/* Recomendador de gestores y entornos */
const wmData = {
    familiar: {
        title: "Cinnamon o KDE Plasma",
        text: "Si vienes de Windows, Cinnamon suele sentirse muy natural. KDE también es familiar, pero permite personalizar casi todo.",
        tags: ["Cinnamon", "KDE Plasma", "Fácil"]
    },
    moderno: {
        title: "GNOME o Niri",
        text: "GNOME ofrece una experiencia moderna y pulida para usuarios nuevos. Niri es más experimental y atractivo para usuarios curiosos.",
        tags: ["GNOME", "Niri", "Wayland"]
    },
    ligero: {
        title: "XFCE o i3",
        text: "XFCE es la opción ligera más amigable. i3 consume muy poco, pero exige aprender atajos y configuración.",
        tags: ["XFCE", "i3", "Rendimiento"]
    },
    personalizable: {
        title: "KDE Plasma o Hyprland",
        text: "KDE es la opción más cómoda para personalizar sin complicarse demasiado. Hyprland es visual y potente para usuarios avanzados.",
        tags: ["KDE Plasma", "Hyprland", "Personalización"]
    },
    atajos: {
        title: "Hyprland, Niri o i3",
        text: "Si quieres controlar ventanas con teclado, mosaicos y flujos rápidos, estos gestores pueden mejorar mucho tu productividad.",
        tags: ["Hyprland", "Niri", "i3"]
    }
};

const wmButtons = document.querySelectorAll(".wm-btn");
const wmResult = document.getElementById("wmResult");

if (wmButtons.length && wmResult) {
    wmButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const profile = button.dataset.wm;
            const data = wmData[profile];

            wmButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            wmResult.classList.add("changing");

            setTimeout(() => {
                wmResult.innerHTML = `
                    <p class="eyebrow">Recomendación Altépet</p>
                    <h3>${data.title}</h3>
                    <p>${data.text}</p>
                    <div class="result-tags">
                        ${data.tags.map((tag) => `<span>${tag}</span>`).join("")}
                    </div>
                `;
                wmResult.classList.remove("changing");
            }, 220);
        });
    });
}


/* Atajos por entorno */
const shortcutData = {
    gnome: [
        ["Super", "", "", "Vista de actividades", "Abre la vista principal para buscar apps y ventanas."],
        ["Alt", "+", "Tab", "Cambiar ventana", "Salta entre aplicaciones abiertas."],
        ["Super", "+", "L", "Bloquear pantalla", "Protege tu sesión cuando te alejas."]
    ],
    kde: [
        ["Meta", "", "", "Menú de aplicaciones", "Abre el lanzador principal de KDE Plasma."],
        ["Alt", "+", "Space", "KRunner", "Busca apps, archivos y ejecuta acciones rápidas."],
        ["Meta", "+", "L", "Bloquear pantalla", "Bloquea tu sesión."]
    ],
    hyprland: [
        ["Super", "+", "Enter", "Abrir terminal", "Atajo común para abrir una terminal."],
        ["Super", "+", "Q", "Cerrar ventana", "Cierra la ventana activa."],
        ["Super", "+", "1-9", "Cambiar workspace", "Cambia entre escritorios de trabajo."]
    ],
    i3: [
        ["Mod", "+", "Enter", "Abrir terminal", "Atajo clásico para abrir terminal."],
        ["Mod", "+", "D", "Lanzador", "Abre el menú/lanzador configurado."],
        ["Mod", "+", "Shift+Q", "Cerrar ventana", "Cierra la ventana activa."]
    ],
    general: [
        ["Ctrl", "+", "C", "Copiar", "Copia texto o archivos seleccionados."],
        ["Ctrl", "+", "V", "Pegar", "Pega texto o archivos."],
        ["Alt", "+", "Tab", "Cambiar ventana", "Salta entre ventanas abiertas."]
    ]
};

const shortcutTabs = document.querySelectorAll(".shortcut-tab");
const shortcutPanel = document.getElementById("shortcutPanel");

function renderShortcuts(profile) {
    const rows = shortcutData[profile] || shortcutData.gnome;
    shortcutPanel.innerHTML = rows.map(([a, plus, b, title, text]) => `
        <article class="shortcut-card">
            <kbd>${a}</kbd>
            ${plus ? `<span>${plus}</span>` : ""}
            ${b ? `<kbd>${b}</kbd>` : ""}
            <div><h3>${title}</h3><p>${text}</p></div>
        </article>
    `).join("");
}

if (shortcutTabs.length && shortcutPanel) {
    shortcutTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            shortcutTabs.forEach((item) => item.classList.remove("active"));
            tab.classList.add("active");

            shortcutPanel.classList.add("changing");
            setTimeout(() => {
                renderShortcuts(tab.dataset.shortcut);
                shortcutPanel.classList.remove("changing");
            }, 180);
        });
    });
}

/* Copiar comandos */
const copyButtons = document.querySelectorAll(".copy-btn");
const copyToast = document.getElementById("copyToast");

function showToast(message = "Comando copiado") {
    if (!copyToast) return;
    copyToast.textContent = message;
    copyToast.classList.add("show");
    setTimeout(() => copyToast.classList.remove("show"), 1500);
}

copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        const text = button.dataset.copy || "";
        try {
            await navigator.clipboard.writeText(text);
            showToast("Comando copiado");
        } catch (error) {
            showToast("Copia manualmente el comando");
        }
    });
});


/* Buscador de problemas comunes */
const problemSearch = document.getElementById("problemSearch");
const problemCards = document.querySelectorAll(".problem-card");
const problemCount = document.getElementById("problemCount");
const emptyProblems = document.getElementById("emptyProblems");

function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function filterProblems() {
    if (!problemSearch || !problemCards.length) return;

    const query = normalizeText(problemSearch.value.trim());
    let visible = 0;

    problemCards.forEach((card) => {
        const haystack = normalizeText(`${card.textContent} ${card.dataset.tags || ""}`);
        const match = !query || haystack.includes(query);

        card.classList.toggle("hidden-by-search", !match);

        if (match) visible += 1;
    });

    if (problemCount) {
        problemCount.textContent = query
            ? `${visible} resultado${visible === 1 ? "" : "s"} para “${problemSearch.value.trim()}”`
            : "Mostrando todos los problemas";
    }

    if (emptyProblems) {
        emptyProblems.hidden = visible !== 0;
    }
}

if (problemSearch) {
    problemSearch.addEventListener("input", filterProblems);
}


/* Fase 7 — detalles finales */
document.querySelectorAll("img:not([loading])").forEach((img) => {
    img.setAttribute("loading", "lazy");
});

const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.type = "button";
backToTop.setAttribute("aria-label", "Volver arriba");
backToTop.textContent = "↑";
backToTop.style.position = "fixed";
backToTop.style.right = "1rem";
backToTop.style.bottom = "1rem";
backToTop.style.zIndex = "1600";
backToTop.style.opacity = "0";
backToTop.style.pointerEvents = "none";
backToTop.style.transition = "opacity .25s ease, transform .25s ease";
backToTop.style.transform = "translateY(10px)";
document.body.appendChild(backToTop);

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
    const show = window.scrollY > 700;
    backToTop.classList.toggle("show", show);
});
