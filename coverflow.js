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

    // reset active state
    cards.forEach(card => card.classList.remove("is-active"));

    cards.forEach((card, i) => {

        // position relative normalisée
        const rawX = i * spacing + x;

        // wrap pour boucle infinie
        const wrappedX = gsap.utils.wrap(
            -spacing,
            totalWidth - spacing,
            rawX
        );

        // centre exact
        const xPos = wrappedX - totalWidth / 2;

        // distance normalisée depuis le centre
        const dist = xPos / spacing;
        const absDist = Math.abs(dist);

        /* -------------------------
           VISUAL LOGIC
        -------------------------- */

        // carte active (au centre)
        const isActive = absDist < 0.25;
        if (isActive) card.classList.add("is-active");

        // échelle progressive
        const scale = gsap.utils.clamp(
            0.82,
            1.1,
            1.1 - absDist * 0.35
        );

        // opacité douce
        const opacity = gsap.utils.clamp(
            0.65,
            1,
            1 - absDist * 0.4
        );

        // flou réduit (meilleure lisibilité)
        const blur = gsap.utils.clamp(
            0,
            2.5,
            absDist * 2
        );

        // rotation vers le CENTRE
        const rotateY = gsap.utils.clamp(
            -25,
            25,
            -dist * 18
        );

        // profondeur
        const zIndex = Math.round(100 - absDist * 40);

        /* -------------------------
           APPLY
        -------------------------- */
        gsap.set(card, {
            x: xPos,
            scale,
            opacity,
            rotateY,
            zIndex,
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
