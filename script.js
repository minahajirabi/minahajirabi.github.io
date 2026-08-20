(() => {
    "use strict";

    const viewer = document.querySelector("#project-viewer");
    const viewerTitle = viewer.querySelector("#viewer-title");
    const image = viewer.querySelector(".lightbox-image");
    const canvas = viewer.querySelector(".lightbox-canvas");
    const counter = viewer.querySelector(".lightbox-counter");
    const previousButton = viewer.querySelector(".lightbox-prev");
    const nextButton = viewer.querySelector(".lightbox-next");
    const closeButton = viewer.querySelector(".lightbox-close");
    const zoomOutButton = viewer.querySelector(".zoom-out");
    const zoomResetButton = viewer.querySelector(".zoom-reset");
    const zoomInButton = viewer.querySelector(".zoom-in");

    let artworks = [];
    let currentIndex = 0;
    let zoom = 1;
    let lastTrigger = null;

    const setImageSize = () => {
        if (!image.naturalWidth || !image.naturalHeight) {
            return;
        }

        const availableWidth = canvas.clientWidth;
        const availableHeight = canvas.clientHeight;
        const fit = Math.min(
            availableWidth / image.naturalWidth,
            availableHeight / image.naturalHeight,
            1
        );

        image.style.width = `${Math.round(image.naturalWidth * fit * zoom)}px`;
        image.style.height = `${Math.round(image.naturalHeight * fit * zoom)}px`;
        zoomResetButton.textContent = `${Math.round(zoom * 100)}%`;
        zoomOutButton.disabled = zoom <= 0.5;
        zoomInButton.disabled = zoom >= 3;
    };

    const setZoom = (value) => {
        zoom = Math.min(3, Math.max(0.5, value));
        canvas.classList.toggle("is-zoomed", zoom > 1);
        setImageSize();
    };

    const showArtwork = (index) => {
        currentIndex = (index + artworks.length) % artworks.length;
        const artwork = artworks[currentIndex];

        zoom = 1;
        canvas.classList.remove("is-zoomed");
        image.removeAttribute("style");
        image.src = artwork.src;
        image.alt = artwork.alt;
        counter.textContent = `${currentIndex + 1} / ${artworks.length}`;
        previousButton.disabled = artworks.length === 1;
        nextButton.disabled = artworks.length === 1;
        canvas.scrollTo(0, 0);
    };

    const openViewer = (title, items, startIndex, trigger) => {
        if (typeof viewer.showModal !== "function") {
            return;
        }

        artworks = items;
        lastTrigger = trigger;
        viewerTitle.textContent = title;
        document.body.classList.add("viewer-open");
        viewer.showModal();
        showArtwork(startIndex);
    };

    document.querySelectorAll(".artwork-image").forEach((button) => {
        button.addEventListener("click", () => {
            if (typeof viewer.showModal !== "function") {
                return;
            }

            const project = button.closest(".portfolio-project");
            const buttons = [...project.querySelectorAll(".artwork-image")];
            const items = buttons.map((item) => {
                const artworkImage = item.querySelector("img");
                return {
                    src: artworkImage.src,
                    alt: artworkImage.alt
                };
            });
            const heading = project.querySelector("h1, h2").textContent;

            openViewer(heading, items, buttons.indexOf(button), button);
        });
    });

    image.addEventListener("load", setImageSize);
    previousButton.addEventListener("click", () => showArtwork(currentIndex - 1));
    nextButton.addEventListener("click", () => showArtwork(currentIndex + 1));
    zoomOutButton.addEventListener("click", () => setZoom(zoom - 0.25));
    zoomResetButton.addEventListener("click", () => setZoom(1));
    zoomInButton.addEventListener("click", () => setZoom(zoom + 0.25));
    closeButton.addEventListener("click", () => viewer.close());

    viewer.addEventListener("click", (event) => {
        if (event.target === viewer) {
            viewer.close();
        }
    });

    viewer.addEventListener("close", () => {
        document.body.classList.remove("viewer-open");
        image.src = "";
        lastTrigger?.focus();
    });

    document.addEventListener("keydown", (event) => {
        if (!viewer.open || artworks.length < 2) {
            return;
        }

        if (event.key === "ArrowLeft") {
            showArtwork(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showArtwork(currentIndex + 1);
        }

        if (event.key === "+" || event.key === "=") {
            setZoom(zoom + 0.25);
        }

        if (event.key === "-") {
            setZoom(zoom - 0.25);
        }
    });

    window.addEventListener("resize", setImageSize);

    const projectLinks = [...document.querySelectorAll(".portfolio-nav a")];
    const projectSections = projectLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if ("IntersectionObserver" in window) {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                projectLinks.forEach((link) => {
                    link.classList.toggle("active", link.hash === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: "-20% 0px -70% 0px" });

        projectSections.forEach((section) => projectObserver.observe(section));
    }
})();
