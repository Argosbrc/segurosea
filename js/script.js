/* =====================================================
   S.E.A. SEGUROS
   SCRIPT.JS
===================================================== */

/* ================= MENU MOBILE ================= */
const menuButton = document.getElementById("menu-button");
const nav = document.getElementById("nav");

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

const navLinks = document.querySelectorAll(".nav a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});


/* ================= SELECTOR WHATSAPP FLOTANTE Y EN TARJETAS ================= */
const waToggle = document.getElementById("wa-toggle");
const waMenu = document.getElementById("wa-menu");
const cardWaToggles = document.querySelectorAll(".card-wa-toggle");

function closeAllMenus(exceptMenu = null) {
    if (waMenu && waMenu !== exceptMenu) {
        waMenu.classList.remove("active");
    }
    document.querySelectorAll(".card-wa-menu").forEach(menu => {
        if (menu !== exceptMenu) {
            menu.classList.remove("active");
        }
    });
}

if (waToggle && waMenu) {
    waToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = waMenu.classList.contains("active");
        closeAllMenus();
        if (!isOpen) waMenu.classList.add("active");
    });
}

cardWaToggles.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const menu = btn.nextElementSibling;
        if (!menu) return;
        const isOpen = menu.classList.contains("active");
        closeAllMenus();
        if (!isOpen) menu.classList.add("active");
    });
});

document.addEventListener("click", () => {
    closeAllMenus();
});


/* ================= COTIZACIÓN DIRECTA POR MAIL DESDE TARJETAS ================= */
const quoteButtons = document.querySelectorAll(".quote-link");
const contactForm = document.getElementById("contact-form");
const inputNombre = document.getElementById("input-nombre");
const inputMensaje = document.getElementById("input-mensaje");

quoteButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const cobertura = btn.getAttribute("data-cobertura");
        if (inputMensaje && cobertura) {
            inputMensaje.value = `Hola, me gustaría solicitar asesoramiento y cotización para: ${cobertura}.`;
        }
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => {
                if (inputNombre) inputNombre.focus();
            }, 600);
        }
    });
});


/* ================= CARRUSEL COMPAÑÍAS (LOOP + FOCO CENTRAL A COLOR) ================= */
const brandsWrapper = document.getElementById("brands-wrapper");
const brandsTrack = document.getElementById("brands-track");

if (brandsWrapper && brandsTrack) {
    const brandItems = brandsTrack.querySelectorAll(".brand-item");
    let brandScroll = 0;
    let brandPaused = false;
    const brandSpeed = 0.85;

    brandsWrapper.addEventListener("mouseenter", () => {
        brandPaused = true;
    });

    brandsWrapper.addEventListener("mouseleave", () => {
        brandPaused = false;
    });

    function updateCenterBrand() {
        const wrapperRect = brandsWrapper.getBoundingClientRect();
        const centerX = wrapperRect.left + wrapperRect.width / 2;

        let closestItem = null;
        let minDistance = Infinity;

        brandItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(centerX - itemCenterX);

            if (distance < minDistance) {
                minDistance = distance;
                closestItem = item;
            }
        });

        brandItems.forEach(item => {
            if (item === closestItem && minDistance < 120) {
                item.classList.add("is-center");
            } else {
                item.classList.remove("is-center");
            }
        });
    }

    function brandsLoop() {
        const halfWidth = brandsTrack.scrollWidth / 2;

        if (!brandPaused && halfWidth > 0) {
            brandScroll += brandSpeed;
            if (brandScroll >= halfWidth) {
                brandScroll -= halfWidth;
            }
            brandsWrapper.scrollLeft = Math.floor(brandScroll);
        }

        updateCenterBrand();
        requestAnimationFrame(brandsLoop);
    }

    requestAnimationFrame(brandsLoop);
}


/* ================= CARRUSEL SECTORES (AUTO + MOUSE + TOUCH) ================= */
const sectorWrapper = document.getElementById("sector-wrapper");
const sectorSlider = document.getElementById("sector-slider");

if (sectorWrapper && sectorSlider) {
    let isDown = false;
    let isPaused = false;
    let startX = 0;
    let scrollStart = 0;
    let currentScroll = 0;
    const autoSpeed = 1;

    sectorWrapper.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    sectorWrapper.addEventListener("mouseleave", () => {
        isPaused = false;
        isDown = false;
        sectorWrapper.classList.remove("dragging");
        currentScroll = sectorWrapper.scrollLeft;
    });

    sectorWrapper.addEventListener("mousedown", (e) => {
        isDown = true;
        isPaused = true;
        sectorWrapper.classList.add("dragging");
        startX = e.pageX - sectorWrapper.offsetLeft;
        scrollStart = sectorWrapper.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
        if (!isDown) return;
        isDown = false;
        sectorWrapper.classList.remove("dragging");
        currentScroll = sectorWrapper.scrollLeft;
    });

    sectorWrapper.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sectorWrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        sectorWrapper.scrollLeft = scrollStart - walk;
        currentScroll = sectorWrapper.scrollLeft;
    });

    sectorWrapper.addEventListener("touchstart", () => {
        isPaused = true;
    }, { passive: true });

    sectorWrapper.addEventListener("touchend", () => {
        currentScroll = sectorWrapper.scrollLeft;
        setTimeout(() => {
            isPaused = false;
        }, 1200);
    }, { passive: true });

    function autoScrollLoop() {
        const halfWidth = sectorSlider.scrollWidth / 2;

        if (!isPaused && !isDown && halfWidth > 0) {
            currentScroll += autoSpeed;

            if (currentScroll >= halfWidth) {
                currentScroll -= halfWidth;
            }

            sectorWrapper.scrollLeft = Math.floor(currentScroll);
        } else if (halfWidth > 0) {
            if (sectorWrapper.scrollLeft >= halfWidth) {
                sectorWrapper.scrollLeft -= halfWidth;
                scrollStart -= halfWidth;
                currentScroll = sectorWrapper.scrollLeft;
            } else if (sectorWrapper.scrollLeft <= 0 && isDown) {
                sectorWrapper.scrollLeft += halfWidth;
                scrollStart += halfWidth;
                currentScroll = sectorWrapper.scrollLeft;
            }
        }

        requestAnimationFrame(autoScrollLoop);
    }

    requestAnimationFrame(autoScrollLoop);
}


/* ================= ANIMACIONES SCROLL ================= */
const elements = document.querySelectorAll(
    ".service-card, .about-image, .about-text, .step-item, .faq-item"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

elements.forEach(element => {
    element.classList.add("hidden");
    observer.observe(element);
});


/* ================= AÑO FOOTER ================= */
const year = new Date().getFullYear();
const footerCopy = document.getElementById("footer-copy");

if (footerCopy) {
    footerCopy.textContent = `S.E.A. Seguros © ${year} - Todos los derechos reservados`;
}