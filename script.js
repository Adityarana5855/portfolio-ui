/* =====================================================
   ADITYA PRATAP SINGH
   CINEMATIC 3D PORTFOLIO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ==================================================
       GLOBAL VARIABLES
    ================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const isTouch =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    /* ==================================================
       LOADER
    ================================================== */

    const loader =
        document.getElementById("loader");

    const loaderNumber =
        document.getElementById("loader-number");

    const loaderLine =
        document.getElementById("loader-line");


    let progress = 0;

    function updateLoader(value) {

        progress = Math.min(
            Math.max(value, 0),
            100
        );

        if (loaderNumber) {

            loaderNumber.textContent =
                Math.floor(progress);

        }

        if (loaderLine) {

            loaderLine.style.width =
                `${progress}%`;

        }

    }


    function hideLoader() {

        if (!loader) return;

        updateLoader(100);

        setTimeout(() => {

            loader.classList.add("loaded");

            document.body.classList.add(
                "page-loaded"
            );

        }, 300);

    }


    /* Smooth fake loading */

    const loadingInterval =
        setInterval(() => {

            if (progress >= 100) {

                clearInterval(
                    loadingInterval
                );

                hideLoader();

                return;
            }

            const amount =
                Math.random() * 8 + 3;

            updateLoader(
                progress + amount
            );

        }, 100);


    /* FAILSAFE */

    setTimeout(() => {

        clearInterval(
            loadingInterval
        );

        hideLoader();

    }, 5000);



    /* ==================================================
       CUSTOM CURSOR
    ================================================== */

    const cursorDot =
        document.getElementById(
            "cursor-dot"
        );

    const cursorRing =
        document.getElementById(
            "cursor-ring"
        );

    const cursorText =
        document.getElementById(
            "cursor-text"
        );


    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;

    let dotX = mouseX;
    let dotY = mouseY;

    let ringX = mouseX;
    let ringY = mouseY;

    let textX = mouseX;
    let textY = mouseY;


    if (!isTouch) {

        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            }
        );


        function animateCursor() {

            dotX +=
                (mouseX - dotX) *
                0.25;

            dotY +=
                (mouseY - dotY) *
                0.25;


            ringX +=
                (mouseX - ringX) *
                0.12;

            ringY +=
                (mouseY - ringY) *
                0.12;


            textX +=
                (mouseX - textX) *
                0.15;

            textY +=
                (mouseY - textY) *
                0.15;


            if (cursorDot) {

                cursorDot.style.transform =
                    `translate3d(
                        ${dotX}px,
                        ${dotY}px,
                        0
                    )`;

            }


            if (cursorRing) {

                cursorRing.style.transform =
                    `translate3d(
                        ${ringX}px,
                        ${ringY}px,
                        0
                    )`;

            }


            if (cursorText) {

                cursorText.style.transform =
                    `translate3d(
                        ${textX}px,
                        ${textY}px,
                        0
                    )`;

            }


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        /* ----------------------------------------------
           CURSOR LABELS
        ---------------------------------------------- */

        const cursorTargets =
            document.querySelectorAll(
                "[data-cursor]"
            );


        cursorTargets.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        const label =
                            element.getAttribute(
                                "data-cursor"
                            ) || "EXPLORE";


                        if (cursorText) {

                            cursorText.textContent =
                                label;

                            cursorText.classList.remove(
                                "show"
                            );


                            /* Restart animation */

                            void cursorText.offsetWidth;

                            cursorText.classList.add(
                                "show"
                            );

                        }


                        if (cursorRing) {

                            cursorRing.classList.add(
                                "hover"
                            );

                        }

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        if (cursorText) {

                            cursorText.classList.remove(
                                "show"
                            );

                        }


                        if (cursorRing) {

                            cursorRing.classList.remove(
                                "hover"
                            );

                        }

                    }
                );

            }
        );


        /* ----------------------------------------------
           CLICK BOUNCE
        ---------------------------------------------- */

        document.addEventListener(
            "mousedown",
            () => {

                if (cursorRing) {

                    cursorRing.classList.add(
                        "click"
                    );

                }

                if (cursorText) {

                    cursorText.classList.add(
                        "click"
                    );

                }

            }
        );


        document.addEventListener(
            "mouseup",
            () => {

                if (cursorRing) {

                    cursorRing.classList.remove(
                        "click"
                    );

                }

                if (cursorText) {

                    cursorText.classList.remove(
                        "click"
                    );

                }

            }
        );

    }



    /* ==================================================
       MAGNETIC ELEMENTS
    ================================================== */

    if (!isTouch && !reducedMotion) {

        const magneticElements =
            document.querySelectorAll(
                ".magnetic"
            );


        magneticElements.forEach(
            (element) => {

                element.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            element.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;


                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;


                        element.style.transform =
                            `translate(
                                ${x * 0.18}px,
                                ${y * 0.18}px
                            )`;

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        element.style.transform =
                            "translate(0, 0)";

                    }
                );

            }
        );

    }



    /* ==================================================
       NAVBAR
    ================================================== */

    const navbar =
        document.getElementById(
            "navbar"
        );


    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 60) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();



    /* ==================================================
       SMOOTH ANCHOR SCROLL
    ================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth"
                    });

                }
            );

        }
    );



    /* ==================================================
       SCROLL REVEAL
    ================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );



    /* ==================================================
       PROJECT 3D TILT
    ================================================== */

    if (!isTouch && !reducedMotion) {

        const projectCards =
            document.querySelectorAll(
                "[data-project]"
            );


        projectCards.forEach(
            (card) => {

                card.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        const rotateY =
                            (
                                (x - centerX) /
                                centerX
                            ) * 4;


                        const rotateX =
                            (
                                (centerY - y) /
                                centerY
                            ) * 4;


                        card.style.transform =
                            `perspective(1400px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             scale(1.01)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            `perspective(1400px)
                             rotateX(0deg)
                             rotateY(0deg)
                             scale(1)`;

                    }
                );

            }
        );

    }



    /* ==================================================
       HERO THREE.JS
    ================================================== */

    function initHero3D() {

        const canvas =
            document.getElementById(
                "three-canvas"
            );


        if (
            !canvas ||
            typeof THREE === "undefined"
        ) {

            console.warn(
                "Three.js is not available."
            );

            return;
        }


        /* ----------------------------------------------
           SCENE
        ---------------------------------------------- */

        const scene =
            new THREE.Scene();


        /* ----------------------------------------------
           CAMERA
        ---------------------------------------------- */

        const camera =
            new THREE.PerspectiveCamera(
                45,
                window.innerWidth /
                    window.innerHeight,
                0.1,
                100
            );


        camera.position.z = 7;



        /* ----------------------------------------------
           RENDERER
        ---------------------------------------------- */

        const renderer =
            new THREE.WebGLRenderer({
                canvas: canvas,

                alpha: true,

                antialias: true
            });


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );



        /* ----------------------------------------------
           MAIN TORUS KNOT
        ---------------------------------------------- */

        const geometry =
            new THREE.TorusKnotGeometry(
                1.45,
                0.38,
                120,
                20
            );


        const material =
            new THREE.MeshStandardMaterial({

                color: 0x8c5cff,

                metalness: 0.75,

                roughness: 0.22

            });


        const object =
            new THREE.Mesh(
                geometry,
                material
            );


        object.position.set(
            2.2,
            0,
            0
        );


        scene.add(object);



        /* ----------------------------------------------
           WIREFRAME
        ---------------------------------------------- */

        const wireGeometry =
            new THREE.TorusKnotGeometry(
                1.65,
                0.025,
                100,
                10
            );


        const wireMaterial =
            new THREE.MeshBasicMaterial({

                color: 0xffffff,

                transparent: true,

                opacity: 0.22

            });


        const wire =
            new THREE.Mesh(
                wireGeometry,
                wireMaterial
            );


        wire.position.copy(
            object.position
        );


        scene.add(wire);



        /* ----------------------------------------------
           LIGHTS
        ---------------------------------------------- */

        const ambient =
            new THREE.AmbientLight(
                0xffffff,
                0.7
            );


        scene.add(ambient);


        const purpleLight =
            new THREE.PointLight(
                0x8c5cff,
                5,
                20
            );


        purpleLight.position.set(
            3,
            3,
            5
        );


        scene.add(
            purpleLight
        );


        const pinkLight =
            new THREE.PointLight(
                0xff2bd6,
                4,
                20
            );


        pinkLight.position.set(
            -4,
            -2,
            3
        );


        scene.add(
            pinkLight
        );



        /* ----------------------------------------------
           PARTICLES
        ---------------------------------------------- */

        const particleCount = 600;

        const positions =
            new Float32Array(
                particleCount * 3
            );


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            positions[i * 3] =
                (Math.random() - 0.5) * 18;


            positions[i * 3 + 1] =
                (Math.random() - 0.5) * 12;


            positions[i * 3 + 2] =
                (Math.random() - 0.5) * 15;

        }


        const particleGeometry =
            new THREE.BufferGeometry();


        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );


        const particleMaterial =
            new THREE.PointsMaterial({

                color: 0xffffff,

                size: 0.025,

                transparent: true,

                opacity: 0.65

            });


        const particles =
            new THREE.Points(
                particleGeometry,
                particleMaterial
            );


        scene.add(
            particles
        );



        /* ----------------------------------------------
           MOUSE
        ---------------------------------------------- */

        let targetX = 0;

        let targetY = 0;


        if (!isTouch) {

            document.addEventListener(
                "mousemove",
                (event) => {

                    targetX =
                        (
                            event.clientX /
                            window.innerWidth
                        ) - 0.5;


                    targetY =
                        (
                            event.clientY /
                            window.innerHeight
                        ) - 0.5;

                }
            );

        }



        /* ----------------------------------------------
           ANIMATION
        ---------------------------------------------- */

        const clock =
            new THREE.Clock();


        function animate() {

            requestAnimationFrame(
                animate
            );


            const time =
                clock.getElapsedTime();


            object.rotation.x +=
                0.003;


            object.rotation.y +=
                0.006;


            wire.rotation.x =
                object.rotation.x;


            wire.rotation.y =
                object.rotation.y;


            object.position.y =
                Math.sin(time * 1.2) *
                0.12;


            object.rotation.z +=
                targetX * 0.003;


            wire.position.y =
                object.position.y;


            particles.rotation.y =
                time * 0.015;


            particles.rotation.x =
                Math.sin(time * 0.2) *
                0.1;


            renderer.render(
                scene,
                camera
            );

        }


        animate();



        /* ----------------------------------------------
           RESIZE
        ---------------------------------------------- */

        window.addEventListener(
            "resize",
            () => {

                camera.aspect =
                    window.innerWidth /
                    window.innerHeight;


                camera.updateProjectionMatrix();


                renderer.setSize(
                    window.innerWidth,
                    window.innerHeight
                );

            }
        );

    }



    /* ==================================================
       3D CHARACTER
    ================================================== */

    function initCharacter3D() {

        const canvas =
            document.getElementById(
                "character-canvas"
            );


        if (
            !canvas ||
            typeof THREE === "undefined"
        ) {

            console.warn(
                "Character canvas or Three.js missing."
            );

            return;
        }



        /* ----------------------------------------------
           SCENE
        ---------------------------------------------- */

        const scene =
            new THREE.Scene();



        /* ----------------------------------------------
           CAMERA
        ---------------------------------------------- */

        const camera =
            new THREE.PerspectiveCamera(
                35,
                1,
                0.1,
                100
            );


        camera.position.set(
            0,
            1,
            8
        );



        /* ----------------------------------------------
           RENDERER
        ---------------------------------------------- */

        const renderer =
            new THREE.WebGLRenderer({

                canvas: canvas,

                alpha: true,

                antialias: true

            });


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );



        /* ----------------------------------------------
           CHARACTER GROUP
        ---------------------------------------------- */

        const character =
            new THREE.Group();


        character.position.y =
            -1.25;


        character.position.x =
            0.5;


        scene.add(
            character
        );



        /* ----------------------------------------------
           MATERIALS
        ---------------------------------------------- */

        const darkMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x15151b,

                metalness: 0.7,

                roughness: 0.28

            });


        const purpleMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x8c5cff,

                metalness: 0.5,

                roughness: 0.25

            });


        const whiteMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xf3f3f3,

                metalness: 0.25,

                roughness: 0.3

            });


        const blackMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x050507,

                metalness: 0.8,

                roughness: 0.12

            });


        const glowMaterial =
            new THREE.MeshBasicMaterial({

                color: 0xffffff

            });



        /* ==============================================
           BODY
        =============================================== */

        const bodyGeometry =
            new THREE.BoxGeometry(
                1.5,
                1.9,
                0.9
            );


        const body =
            new THREE.Mesh(
                bodyGeometry,
                darkMaterial
            );


        body.position.y =
            0;


        character.add(
            body
        );



        /* ==============================================
           CHEST PANEL
        =============================================== */

        const chestGeometry =
            new THREE.BoxGeometry(
                0.85,
                0.75,
                0.12
            );


        const chest =
            new THREE.Mesh(
                chestGeometry,
                purpleMaterial
            );


        chest.position.set(
            0,
            0.05,
            0.52
        );


        character.add(
            chest
        );



        /* ==============================================
           CHEST CORE
        =============================================== */

        const coreGeometry =
            new THREE.SphereGeometry(
                0.16,
                24,
                24
            );


        const core =
            new THREE.Mesh(
                coreGeometry,
                glowMaterial
            );


        core.position.set(
            0,
            0.05,
            0.64
        );


        character.add(
            core
        );



        /* ==============================================
           HEAD
        =============================================== */

        const headGeometry =
            new THREE.SphereGeometry(
                0.78,
                32,
                32
            );


        const head =
            new THREE.Mesh(
                headGeometry,
                whiteMaterial
            );


        head.position.y =
            1.5;


        character.add(
            head
        );



        /* ==============================================
           VISOR
        =============================================== */

        const visorGeometry =
            new THREE.BoxGeometry(
                0.95,
                0.3,
                0.12
            );


        const visor =
            new THREE.Mesh(
                visorGeometry,
                blackMaterial
            );


        visor.position.set(
            0,
            1.53,
            0.7
        );


        character.add(
            visor
        );



        /* ==============================================
           EYES
        =============================================== */

        const eyeGeometry =
            new THREE.SphereGeometry(
                0.075,
                16,
                16
            );


        const leftEye =
            new THREE.Mesh(
                eyeGeometry,
                glowMaterial
            );


        leftEye.position.set(
            -0.21,
            1.53,
            0.78
        );


        character.add(
            leftEye
        );


        const rightEye =
            new THREE.Mesh(
                eyeGeometry,
                glowMaterial
            );


        rightEye.position.set(
            0.21,
            1.53,
            0.78
        );


        character.add(
            rightEye
        );



        /* ==============================================
           NECK
        =============================================== */

        const neckGeometry =
            new THREE.CylinderGeometry(
                0.25,
                0.25,
                0.3,
                20
            );


        const neck =
            new THREE.Mesh(
                neckGeometry,
                darkMaterial
            );


        neck.position.y =
            0.95;


        character.add(
            neck
        );



        /* ==============================================
           ARMS
        =============================================== */

        const armGeometry =
            new THREE.CylinderGeometry(
                0.2,
                0.24,
                1.4,
                24
            );


        const leftArm =
            new THREE.Mesh(
                armGeometry,
                purpleMaterial
            );


        leftArm.position.set(
            -0.98,
            0.05,
            0
        );


        leftArm.rotation.z =
            -0.15;


        character.add(
            leftArm
        );


        const rightArm =
            new THREE.Mesh(
                armGeometry,
                purpleMaterial
            );


        rightArm.position.set(
            0.98,
            0.05,
            0
        );


        rightArm.rotation.z =
            0.15;


        character.add(
            rightArm
        );



        /* ==============================================
           HANDS
        =============================================== */

        const handGeometry =
            new THREE.SphereGeometry(
                0.26,
                24,
                24
            );


        const leftHand =
            new THREE.Mesh(
                handGeometry,
                whiteMaterial
            );


        leftHand.position.set(
            -1.08,
            -0.63,
            0
        );


        character.add(
            leftHand
        );


        const rightHand =
            new THREE.Mesh(
                handGeometry,
                whiteMaterial
            );


        rightHand.position.set(
            1.08,
            -0.63,
            0
        );


        character.add(
            rightHand
        );



        /* ==============================================
           LEGS
        =============================================== */

        const legGeometry =
            new THREE.CylinderGeometry(
                0.26,
                0.3,
                1.5,
                24
            );


        const leftLeg =
            new THREE.Mesh(
                legGeometry,
                darkMaterial
            );


        leftLeg.position.set(
            -0.42,
            -1.55,
            0
        );


        character.add(
            leftLeg
        );


        const rightLeg =
            new THREE.Mesh(
                legGeometry,
                darkMaterial
            );


        rightLeg.position.set(
            0.42,
            -1.55,
            0
        );


        character.add(
            rightLeg
        );



        /* ==============================================
           SHOES
        =============================================== */

        const shoeGeometry =
            new THREE.BoxGeometry(
                0.62,
                0.3,
                0.85
            );


        const leftShoe =
            new THREE.Mesh(
                shoeGeometry,
                whiteMaterial
            );


        leftShoe.position.set(
            -0.42,
            -2.35,
            0.15
        );


        character.add(
            leftShoe
        );


        const rightShoe =
            new THREE.Mesh(
                shoeGeometry,
                whiteMaterial
            );


        rightShoe.position.set(
            0.42,
            -2.35,
            0.15
        );


        character.add(
            rightShoe
        );



        /* ==============================================
           HALO
        =============================================== */

        const haloGeometry =
            new THREE.TorusGeometry(
                1.6,
                0.025,
                16,
                100
            );


        const haloMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x8c5cff,

                transparent: true,

                opacity: 0.8

            });


        const halo =
            new THREE.Mesh(
                haloGeometry,
                haloMaterial
            );


        halo.rotation.x =
            Math.PI / 2;


        halo.position.y =
            0.1;


        character.add(
            halo
        );



        /* ==============================================
           FLOATING PARTICLES
        =============================================== */

        const particleCount = 300;

        const positions =
            new Float32Array(
                particleCount * 3
            );


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            positions[i * 3] =
                (Math.random() - 0.5) * 7;


            positions[i * 3 + 1] =
                (Math.random() - 0.5) * 7;


            positions[i * 3 + 2] =
                (Math.random() - 0.5) * 5;

        }


        const particlesGeometry =
            new THREE.BufferGeometry();


        particlesGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );


        const particlesMaterial =
            new THREE.PointsMaterial({

                color: 0xffffff,

                size: 0.025,

                transparent: true,

                opacity: 0.65

            });


        const particles =
            new THREE.Points(
                particlesGeometry,
                particlesMaterial
            );


        scene.add(
            particles
        );



        /* ==============================================
           LIGHTING
        =============================================== */

        const ambient =
            new THREE.AmbientLight(
                0xffffff,
                1.1
            );


        scene.add(
            ambient
        );


        const keyLight =
            new THREE.PointLight(
                0x8c5cff,
                7,
                20
            );


        keyLight.position.set(
            4,
            4,
            5
        );


        scene.add(
            keyLight
        );


        const fillLight =
            new THREE.PointLight(
                0xff2bd6,
                4,
                20
            );


        fillLight.position.set(
            -4,
            1,
            3
        );


        scene.add(
            fillLight
        );



        /* ==============================================
           MOUSE INTERACTION
        =============================================== */

        let mouseTargetX = 0;

        let mouseTargetY = 0;


        if (!isTouch) {

            document.addEventListener(
                "mousemove",
                (event) => {

                    mouseTargetX =
                        (
                            event.clientX /
                            window.innerWidth
                        ) - 0.5;


                    mouseTargetY =
                        (
                            event.clientY /
                            window.innerHeight
                        ) - 0.5;

                }
            );

        }



        /* ==============================================
           ANIMATION
        =============================================== */

        const clock =
            new THREE.Clock();


        function animateCharacter() {

            requestAnimationFrame(
                animateCharacter
            );


            const time =
                clock.getElapsedTime();


            /* Breathing */

            character.scale.y =
                1 +
                Math.sin(
                    time * 2
                ) * 0.025;


            /* Floating */

            character.position.y =
                -1.25 +
                Math.sin(
                    time * 1.3
                ) * 0.08;


            /* Mouse rotation */

            character.rotation.y +=
                (
                    mouseTargetX * 0.6 -
                    character.rotation.y
                ) * 0.04;


            /* Head movement */

            head.rotation.y +=
                (
                    mouseTargetX * 0.3 -
                    head.rotation.y
                ) * 0.05;


            head.rotation.x +=
                (
                    mouseTargetY * 0.2 -
                    head.rotation.x
                ) * 0.05;


            /* Arms */

            leftArm.rotation.z =
                -0.15 +
                Math.sin(
                    time * 1.5
                ) * 0.025;


            rightArm.rotation.z =
                0.15 +
                Math.sin(
                    time * 1.5 + 1
                ) * 0.025;


            /* Halo */

            halo.rotation.z =
                time * 0.4;


            halo.rotation.y =
                Math.sin(
                    time
                ) * 0.2;


            /* Particles */

            particles.rotation.y =
                time * 0.02;


            particles.rotation.x =
                Math.sin(
                    time * 0.2
                ) * 0.08;


            renderer.render(
                scene,
                camera
            );

        }


        animateCharacter();



        /* ==============================================
           CHARACTER RESIZE
        =============================================== */

        function resizeCharacter() {

            const width =
                canvas.clientWidth ||
                600;


            const height =
                canvas.clientHeight ||
                window.innerHeight;


            camera.aspect =
                width / height;


            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height,
                false
            );

        }


        resizeCharacter();


        window.addEventListener(
            "resize",
            resizeCharacter
        );

    }



    /* ==================================================
       SCROLL PARALLAX
    ================================================== */

    function initParallax() {

        if (reducedMotion) {
            return;
        }


        const heroTitle =
            document.querySelector(
                ".hero-title"
            );


        const statement =
            document.querySelector(
                ".statement-bg"
            );


        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;


                if (heroTitle) {

                    heroTitle.style.transform =
                        `translateY(
                            ${scroll * 0.08}px
                        )`;

                }


                if (statement) {

                    statement.style.transform =
                        `translateX(
                            ${scroll * -0.04}px
                        )`;

                }

            },
            {
                passive: true
            }
        );

    }



    /* ==================================================
       ACTIVE NAVIGATION
    ================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            navLinks.forEach(
                                (link) => {

                                    link.classList.remove(
                                        "active"
                                    );


                                    const href =
                                        link.getAttribute(
                                            "href"
                                        );


                                    if (
                                        href ===
                                        `#${entry.target.id}`
                                    ) {

                                        link.classList.add(
                                            "active"
                                        );

                                    }

                                }
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.45
            }
        );


    sections.forEach(
        (section) => {

            navObserver.observe(
                section
            );

        }
    );



    /* ==================================================
       INITIALIZE THREE.JS
    ================================================== */

    if (typeof THREE !== "undefined") {

        initHero3D();

        initCharacter3D();

    } else {

        console.error(
            "Three.js failed to load."
        );

    }


    /* ==================================================
       OTHER EFFECTS
    ================================================== */

    initParallax();



    /* ==================================================
       CONSOLE
    ================================================== */

    console.log(
        "%c ADITYA PRATAP SINGH ",
        "background:#8c5cff;color:white;font-size:16px;padding:8px;"
    );

    console.log(
        "Creative Developer • 3D • Web • ML"
    );

});