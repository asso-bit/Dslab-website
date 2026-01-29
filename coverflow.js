gsap.registerPlugin(Draggable);

function buildCoverflow(scene) {

    const track = scene.querySelector('.coverflow-track');
    const cards = Array.from(track.querySelectorAll('.coverflow-card'));
    const prevBtn = scene.querySelector('.nav-btn.prev');
    const nextBtn = scene.querySelector('.nav-btn.next');

    const cardWidth = 300;
    const gap = 140;
    const spacing = cardWidth - gap;
    const totalWidth = cards.length * spacing;

    const proxy = document.createElement("div");
    gsap.set(proxy, { x: 0 });

    // Initial card placement
    gsap.set(cards, {
        left: "50%",
        xPercent: -50,
        x: i => i * spacing
    });

    function update() {
        const x = gsap.getProperty(proxy, "x");

        cards.forEach(card => card.classList.remove("is-active"));

        cards.forEach((card, i) => {

            const wrappedX = gsap.utils.wrap(
                -spacing,
                totalWidth - spacing,
                i * spacing + x
            );

            const xPos = wrappedX - totalWidth / 2;
            const dist = Math.abs(xPos) / spacing;

            const scale = gsap.utils.clamp(0.7, 1.1, 1.1 - dist * 0.4);
            const opacity = gsap.utils.clamp(0.5, 1, 1 - dist * 0.5);
            const blur = gsap.utils.clamp(0, 5, dist * 4);
            const zIndex = Math.round(100 - dist * 50);
            const rotateY = xPos > 0 ? -15 * dist : 15 * dist;

            if (dist < 0.3) card.classList.add("is-active");

            gsap.set(card, {
                x: xPos,
                scale,
                opacity,
                zIndex,
                rotateY,
                filter: `blur(${blur}px)`
            });
        });
    }

    const step = spacing;

    prevBtn.addEventListener("click", () => {
        gsap.to(proxy, { x: "+=" + step, duration: 0.6, ease: "power3.out", onUpdate: update });
    });

    nextBtn.addEventListener("click", () => {
        gsap.to(proxy, { x: "-=" + step, duration: 0.6, ease: "power3.out", onUpdate: update });
    });

    // OPTIONAL DRAG (REMOVE IF NOT WANTED)
    Draggable.create(proxy, {
        type: "x",
        trigger: scene,
        inertia: true,
        onDrag: update,
        onThrowUpdate: update
    });

    update();
}

document.querySelectorAll(".coverflow-scene").forEach(buildCoverflow);
