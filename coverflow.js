gsap.registerPlugin(Draggable);

function buildCoverflow(scene) {

    const track = scene.querySelector('.coverflow-track');
    const cards = Array.from(track.querySelectorAll('.coverflow-card'));

    const cardWidth = 300;
    const gap = 140;
    const spacing = cardWidth - gap;
    const totalWidth = cards.length * spacing;

    gsap.set(cards, {
        x: i => i * spacing,
        left: "50%",
        xPercent: -50
    });

    const proxy = document.createElement("div");
    let x = 0;
    const prevBtn = scene.querySelector('.nav-btn.prev');
    const nextBtn = scene.querySelector('.nav-btn.next');

    const step = spacing; // move exactly one card

    prevBtn.addEventListener('click', () => {
    gsap.to(proxy, {
        x: `+=${step}`,
        duration: 0.6,
        ease: "power3.out"
    });
});

    nextBtn.addEventListener('click', () => {
    gsap.to(proxy, {
        x: `-=${step}`,
        duration: 0.6,
        ease: "power3.out"
    });
});

   
        }

        gsap.set(proxy, { x });

        cards.forEach((card, i) => {
            cards.forEach(card => card.classList.remove('is-active'));
            const wrappedX = gsap.utils.wrap(
                -spacing,
                totalWidth - spacing,
                (i * spacing) + x
            );

            const xPos = wrappedX - (totalWidth / 2);
            const dist = Math.abs(xPos) / (spacing * 2.5);

            const scale = gsap.utils.clamp(0.7, 1.1, 1.1 - dist * 0.4);
            const opacity = gsap.utils.clamp(0.5, 1, 1 - dist * 0.5);
            const blur = gsap.utils.clamp(0, 5, dist * 5);
            const zIndex = Math.round(100 - dist * 100);
            const rotY = xPos > 0 ? -15 * dist : 15 * dist;
            if (dist < 0.15) {
                card.classList.add('is-active');
                }


            gsap.set(card, {
                x: xPos,
                scale,
                opacity,
                zIndex,
                filter: `blur(${blur}px)`,
                rotateY: rotY,
                z: -dist * 100
            });
        });
    }

    Draggable.create(proxy, {
        type: "x",
        trigger: scene,
        inertia: true,
        onDrag: update,
        onThrowUpdate: update
    });

    gsap.ticker.add(update);
}

document.querySelectorAll('.coverflow-scene').forEach(scene => {
    buildCoverflow(scene);
});
