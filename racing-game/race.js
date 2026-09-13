/* =====================================================
   ULTIMATE STREET RACING
   ORIGINAL 3D RACING GAME
===================================================== */


/* =====================================================
   THREE.JS
===================================================== */

const scene = new THREE.Scene();

scene.background =
    new THREE.Color(0x07101c);

scene.fog =
    new THREE.Fog(
        0x07101c,
        35,
        120
    );


const camera =
    new THREE.PerspectiveCamera(
        55,
        window.innerWidth /
        window.innerHeight,
        0.1,
        250
    );


const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

document
    .getElementById("game")
    .appendChild(renderer.domElement);


/* =====================================================
   LIGHTS
===================================================== */

scene.add(
    new THREE.HemisphereLight(
        0x9ec9ff,
        0x111111,
        2.4
    )
);


const sun =
    new THREE.DirectionalLight(
        0xffffff,
        3
    );

sun.position.set(
    -20,
    30,
    15
);

sun.castShadow = true;

scene.add(sun);


/* =====================================================
   ROAD
===================================================== */

const roadMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x151a20,
        roughness: 0.9,
        metalness: 0.1
    });

const road =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            18,
            500
        ),
        roadMaterial
    );

road.rotation.x =
    -Math.PI / 2;

road.position.z = -180;

road.receiveShadow = true;

scene.add(road);


/* =====================================================
   GRASS
===================================================== */

const grassMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x18251c,
        roughness: 1
    });


function createGround(
    x
) {

    const ground =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                80,
                500
            ),
            grassMaterial
        );

    ground.rotation.x =
        -Math.PI / 2;

    ground.position.set(
        x,
        -0.04,
        -180
    );

    scene.add(ground);
}


createGround(-49);
createGround(49);


/* =====================================================
   ROAD MARKINGS
===================================================== */

const markingMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffffff
    });


for (
    let z = 15;
    z > -500;
    z -= 12
) {

    const line =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.18,
                0.025,
                5
            ),
            markingMaterial
        );

    line.position.set(
        0,
        0.02,
        z
    );

    scene.add(line);
}


/* Lane lines */

for (
    const x of [-3, 3]
) {

    for (
        let z = 15;
        z > -500;
        z -= 12
    ) {

        const line =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.08,
                    0.025,
                    5
                ),
                new THREE.MeshBasicMaterial({
                    color: 0xb8c4d0
                })
            );

        line.position.set(
            x,
            0.025,
            z
        );

        scene.add(line);

    }
}


/* =====================================================
   CITY BUILDINGS
===================================================== */

const buildingColors = [
    0x172131,
    0x202a36,
    0x263342,
    0x111b27,
    0x29313a
];


function createBuilding(
    x,
    z
) {

    const width =
        4 +
        Math.random() * 7;

    const height =
        4 +
        Math.random() * 17;

    const depth =
        5 +
        Math.random() * 7;


    const material =
        new THREE.MeshStandardMaterial({
            color:
                buildingColors[
                    Math.floor(
                        Math.random() *
                        buildingColors.length
                    )
                ],
            roughness: 0.82,
            metalness: 0.15
        });


    const building =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),
            material
        );

    building.position.set(
        x,
        height / 2,
        z
    );

    building.castShadow = true;
    building.receiveShadow = true;

    scene.add(building);


    /* windows */

    const windowMaterial =
        new THREE.MeshBasicMaterial({
            color:
                Math.random() > 0.5
                    ? 0x63b9ff
                    : 0xffc95c
        });


    for (
        let y = 2;
        y < height - 1;
        y += 2.5
    ) {

        const window =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.35,
                    0.5,
                    0.04
                ),
                windowMaterial
            );

        window.position.set(
            x,
            y,
            z - depth / 2 - 0.03
        );

        scene.add(window);

    }

}


for (
    let z = 5;
    z > -480;
    z -= 18
) {

    createBuilding(
        -14 -
        Math.random() * 15,
        z
    );

    createBuilding(
        14 +
        Math.random() * 15,
        z - 7
    );

}


/* =====================================================
   STREET LIGHTS
===================================================== */

function createStreetLight(
    x,
    z
) {

    const poleMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x343c45,
            metalness: 0.8,
            roughness: 0.4
        });


    const pole =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.07,
                0.09,
                5,
                10
            ),
            poleMaterial
        );

    pole.position.set(
        x,
        2.5,
        z
    );

    scene.add(pole);


    const lamp =
        new THREE.PointLight(
            x < 0
                ? 0x55aaff
                : 0xffd27a,
            2,
            12
        );

    lamp.position.set(
        x,
        5.1,
        z
    );

    scene.add(lamp);


    const bulb =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.14,
                8,
                8
            ),
            new THREE.MeshBasicMaterial({
                color:
                    x < 0
                        ? 0x55aaff
                        : 0xffd27a
            })
        );

    bulb.position.copy(
        lamp.position
    );

    scene.add(bulb);
}


for (
    let z = 0;
    z > -480;
    z -= 20
) {

    createStreetLight(
        -10,
        z
    );

    createStreetLight(
        10,
        z - 10
    );

}


/* =====================================================
   CAR CREATION
===================================================== */

function createCar(
    color,
    accent
) {

    const car =
        new THREE.Group();


    const bodyMaterial =
        new THREE.MeshStandardMaterial({
            color,
            metalness: 0.65,
            roughness: 0.28
        });


    const accentMaterial =
        new THREE.MeshStandardMaterial({
            color: accent,
            metalness: 0.6,
            roughness: 0.25
        });


    /* MAIN BODY */

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.8,
                0.45,
                3.5
            ),
            bodyMaterial
        );

    body.position.y =
        0.48;

    body.castShadow = true;

    car.add(body);


    /* CABIN */

    const cabin =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.25,
                0.45,
                1.55
            ),
            new THREE.MeshStandardMaterial({
                color: 0x101923,
                metalness: 0.7,
                roughness: 0.18
            })
        );

    cabin.position.set(
        0,
        0.86,
        -0.15
    );

    cabin.castShadow = true;

    car.add(cabin);


    /* ROOF STRIPE */

    const stripe =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.2,
                0.03,
                1.7
            ),
            accentMaterial
        );

    stripe.position.set(
        0,
        1.1,
        -0.15
    );

    car.add(stripe);


    /* WHEELS */

    const wheelMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x07090c,
            roughness: 0.8
        });


    const wheelGeometry =
        new THREE.CylinderGeometry(
            0.34,
            0.34,
            0.22,
            18
        );


    const wheelPositions = [
        [-0.96, 0.35, 1.05],
        [0.96, 0.35, 1.05],
        [-0.96, 0.35, -1.05],
        [0.96, 0.35, -1.05]
    ];


    wheelPositions.forEach(
        position => {

            const wheel =
                new THREE.Mesh(
                    wheelGeometry,
                    wheelMaterial
                );

            wheel.rotation.z =
                Math.PI / 2;

            wheel.position.set(
                ...position
            );

            wheel.castShadow = true;

            car.add(wheel);

        }
    );


    /* HEADLIGHTS */

    const headlightMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xbde9ff
        });


    for (
        const x of [-0.58, 0.58]
    ) {

        const light =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.3,
                    0.12,
                    0.08
                ),
                headlightMaterial
            );

        light.position.set(
            x,
            0.53,
            -1.78
        );

        car.add(light);

    }


    /* TAIL LIGHTS */

    const tailMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xff263d
        });


    for (
        const x of [-0.58, 0.58]
    ) {

        const light =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.3,
                    0.12,
                    0.08
                ),
                tailMaterial
            );

        light.position.set(
            x,
            0.55,
            1.78
        );

        car.add(light);

    }


    return car;
}


/* =====================================================
   PLAYER
===================================================== */

const player =
    createCar(
        0x146fd1,
        0x56caff
    );

player.position.set(
    -3,
    0,
    5
);

scene.add(player);


/* =====================================================
   AI CARS
===================================================== */

const aiColors = [
    [0xd52c3e, 0xff7580],
    [0xf28c18, 0xffd05a],
    [0x6d3bd1, 0xb28cff],
    [0x159b64, 0x55e7a5],
    [0xd6d9df, 0xffffff]
];


const opponents = [];


aiColors.forEach(
    (colors, index) => {

        const car =
            createCar(
                colors[0],
                colors[1]
            );

        const lane =
            [-6, -3, 0, 3, 6][index];

        car.position.set(
            lane,
            0,
            2 + index * 4
        );

        scene.add(car);


        opponents.push({
            mesh: car,

            speed:
                0.86 +
                Math.random() * 0.12,

            progress: 0
        });

    }
);


/* =====================================================
   GAME VARIABLES
===================================================== */

const keys = {};

let started = false;
let finished = false;

let speed = 0;

let nitro = 100;

let raceTime = 0;

let startTime = 0;


/* =====================================================
   INPUT
===================================================== */

window.addEventListener(
    "keydown",
    event => {

        keys[
            event.key.toLowerCase()
        ] = true;

    }
);


window.addEventListener(
    "keyup",
    event => {

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


/* =====================================================
   DOM
===================================================== */

const positionElement =
    document.getElementById(
        "position"
    );

const speedElement =
    document.getElementById(
        "speed"
    );

const nitroFill =
    document.getElementById(
        "nitroFill"
    );

const countdown =
    document.getElementById(
        "countdown"
    );

const finishScreen =
    document.getElementById(
        "finishScreen"
    );

const finishTitle =
    document.getElementById(
        "finishTitle"
    );

const finishPosition =
    document.getElementById(
        "finishPosition"
    );

const finishTime =
    document.getElementById(
        "finishTime"
    );

const restartButton =
    document.getElementById(
        "restart"
    );

const backButton =
    document.getElementById(
        "back"
    );


/* =====================================================
   COUNTDOWN
===================================================== */

function startCountdown() {

    let count = 3;

    countdown.textContent =
        count;


    const interval =
        setInterval(
            () => {

                count--;

                if (count > 0) {

                    countdown.textContent =
                        count;

                } else {

                    countdown.textContent =
                        "GO!";

                    started = true;

                    startTime =
                        performance.now();

                    setTimeout(
                        () => {
                            countdown.textContent =
                                "";
                        },
                        700
                    );

                    clearInterval(
                        interval
                    );

                }

            },
            1000
        );

}


/* =====================================================
   PLAYER CAR
===================================================== */

function updatePlayer(
    delta
) {

    if (
        !started ||
        finished
    ) {
        return;
    }


    const accelerating =
        keys["w"] ||
        keys["arrowup"];


    const braking =
        keys["s"] ||
        keys["arrowdown"];


    const steeringLeft =
        keys["a"] ||
        keys["arrowleft"];


    const steeringRight =
        keys["d"] ||
        keys["arrowright"];


    const drifting =
        keys[" "];


    const boosting =
        keys["shift"] &&
        nitro > 0;


    /* acceleration */

    if (accelerating) {

        speed +=
            18 * delta;

    } else {

        speed -=
            7 * delta;

    }


    if (braking) {

        speed -=
            25 * delta;

    }


    if (boosting) {

        speed +=
            30 * delta;

        nitro -=
            35 * delta;

    } else {

        nitro +=
            8 * delta;

    }


    nitro =
        THREE.MathUtils.clamp(
            nitro,
            0,
            100
        );


    const maximum =
        boosting
            ? 62
            : 45;


    speed =
        THREE.MathUtils.clamp(
            speed,
            0,
            maximum
        );


    /* steering */

    let steering = 0;


    if (steeringLeft) {
        steering -= 1;
    }

    if (steeringRight) {
        steering += 1;
    }


    const steeringPower =
        (
            0.045 +
            speed * 0.0009
        ) *
        (
            drifting
                ? 1.55
                : 1
        );


    player.position.x +=
        steering *
        steeringPower;


    player.position.x =
        THREE.MathUtils.clamp(
            player.position.x,
            -7,
            7
        );


    /* drift rotation */

    const targetRotation =
        -steering *
        (
            drifting
                ? 0.22
                : 0.1
        );


    player.rotation.y +=
        (
            targetRotation -
            player.rotation.y
        ) * 0.15;


    /* move forward */

    player.position.z -=
        speed *
        delta *
        0.38;


    /* keep road direction */

    if (
        player.position.z <
        -470
    ) {

        finishRace();

    }


    speedElement.textContent =
        Math.round(
            speed * 4
        );


    nitroFill.style.width =
        nitro + "%";

}


/* =====================================================
   AI
===================================================== */

function updateAI(
    delta
) {

    if (
        !started ||
        finished
    ) {
        return;
    }


    opponents.forEach(
        opponent => {

            const targetSpeed =
                34 *
                opponent.speed;


            opponent.mesh.position.z -=
                targetSpeed *
                delta *
                0.38;


            opponent.progress =
                Math.abs(
                    opponent.mesh.position.z
                );


            /* gentle lane movement */

            const desiredLane =
                Math.sin(
                    (
                        performance.now() /
                        2000
                    ) +
                    opponent.progress
                ) *
                2.5;


            opponent.mesh.position.x +=
                (
                    desiredLane -
                    opponent.mesh.position.x
                ) *
                delta *
                0.3;


            /* recycle cars behind */

            if (
                opponent.mesh.position.z >
                player.position.z + 18
            ) {

                opponent.mesh.position.z =
                    player.position.z -
                    20 -
                    Math.random() * 20;

            }

        }
    );

}


/* =====================================================
   POSITION
===================================================== */

function updatePosition() {

    const racers = [
        {
            player: true,
            z: player.position.z
        }
    ];


    opponents.forEach(
        opponent => {

            racers.push({
                player: false,
                z:
                    opponent.mesh
                        .position.z
            });

        }
    );


    racers.sort(
        (a, b) =>
            b.z - a.z
    );


    const playerPosition =
        racers.findIndex(
            racer =>
                racer.player
        ) + 1;


    positionElement.textContent =
        playerPosition;

}


/* =====================================================
   CAMERA
===================================================== */

function updateCamera() {

    const targetX =
        player.position.x *
        0.35;


    const targetZ =
        player.position.z +
        11;


    camera.position.x +=
        (
            targetX -
            camera.position.x
        ) * 0.08;


    camera.position.y +=
        (
            5.1 -
            camera.position.y
        ) * 0.08;


    camera.position.z +=
        (
            targetZ -
            camera.position.z
        ) * 0.08;


    camera.lookAt(
        player.position.x,
        1,
        player.position.z - 8
    );

}


/* =====================================================
   COLLISIONS
===================================================== */

function checkCollisions() {

    opponents.forEach(
        opponent => {

            const distance =
                player.position.distanceTo(
                    opponent.mesh.position
                );


            if (
                distance < 2
            ) {

                const push =
                    player.position.x <
                    opponent.mesh.position.x
                        ? -0.12
                        : 0.12;


                player.position.x +=
                    push;


                speed *= 0.72;

            }

        }
    );

}


/* =====================================================
   RACE FINISH
===================================================== */

function finishRace() {

    if (finished) {
        return;
    }

    finished = true;

    const position =
        Number(
            positionElement.textContent
        );


    let suffix = "TH";

    if (position === 1) {
        suffix = "ST";
    }

    if (position === 2) {
        suffix = "ND";
    }

    if (position === 3) {
        suffix = "RD";
    }


    finishTitle.textContent =
        position + suffix + " PLACE";


    finishPosition.textContent =
        position + suffix;


    const seconds =
        Math.floor(
            raceTime
        );


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        seconds % 60;


    finishTime.textContent =
        String(minutes).padStart(
            2,
            "0"
        ) +
        ":" +
        String(remaining).padStart(
            2,
            "0"
        );


    setTimeout(
        () => {

            finishScreen.classList.remove(
                "hidden"
            );

        },
        500
    );

}


/* =====================================================
   RESTART
===================================================== */

function restartRace() {

    player.position.set(
        -3,
        0,
        5
    );

    player.rotation.y = 0;

    speed = 0;

    nitro = 100;

    raceTime = 0;

    finished = false;

    started = false;


    opponents.forEach(
        (opponent, index) => {

            const lanes =
                [-6, -3, 0, 3, 6];

            opponent.mesh.position.set(
                lanes[index],
                0,
                2 + index * 4
            );

        }
    );


    finishScreen.classList.add(
        "hidden"
    );


    startCountdown();

}


/* =====================================================
   BUTTONS
===================================================== */

restartButton.addEventListener(
    "click",
    restartRace
);


backButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "../index.html";

    }
);


/* =====================================================
   RESIZE
===================================================== */

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


/* =====================================================
   MAIN LOOP
===================================================== */

let lastTime =
    performance.now();


function animate(
    currentTime
) {

    requestAnimationFrame(
        animate
    );


    const delta =
        Math.min(
            (
                currentTime -
                lastTime
            ) / 1000,
            0.05
        );


    lastTime =
        currentTime;


    if (started && !finished) {

        raceTime += delta;

    }


    updatePlayer(delta);

    updateAI(delta);

    updatePosition();

    updateCamera();

    checkCollisions();


    renderer.render(
        scene,
        camera
    );

}


startCountdown();

animate(
    performance.now()
);
