/* =====================================================
   ULTIMATE CLASH
   ORIGINAL 3D FIGHTING GAME
===================================================== */


/* =====================================================
   THREE.JS SETUP
===================================================== */

const container =
    document.getElementById("canvasContainer");

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x050912);

scene.fog =
    new THREE.Fog(
        0x050912,
        18,
        42
    );


/* =====================================================
   CAMERA
===================================================== */

const camera =
    new THREE.PerspectiveCamera(
        48,
        window.innerWidth /
        window.innerHeight,
        0.1,
        100
    );

camera.position.set(
    0,
    5.2,
    15
);

camera.lookAt(
    0,
    2.8,
    0
);


/* =====================================================
   RENDERER
===================================================== */

const renderer =
    new THREE.WebGLRenderer({
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

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

container.appendChild(renderer.domElement);


/* =====================================================
   LIGHTING
===================================================== */

const ambient =
    new THREE.HemisphereLight(
        0x9fc9ff,
        0x090b12,
        2.2
    );

scene.add(ambient);


const keyLight =
    new THREE.DirectionalLight(
        0xffffff,
        3.5
    );

keyLight.position.set(
    -6,
    10,
    8
);

keyLight.castShadow = true;

keyLight.shadow.mapSize.width = 2048;
keyLight.shadow.mapSize.height = 2048;

scene.add(keyLight);


const blueLight =
    new THREE.PointLight(
        0x168cff,
        12,
        18
    );

blueLight.position.set(
    -8,
    5,
    3
);

scene.add(blueLight);


const redLight =
    new THREE.PointLight(
        0xff3045,
        10,
        18
    );

redLight.position.set(
    8,
    5,
    3
);

scene.add(redLight);


/* =====================================================
   ARENA
===================================================== */

const floorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.72,
        metalness: 0.35
    });

const floor =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            22,
            0.4,
            9
        ),
        floorMaterial
    );

floor.position.y = -0.2;

floor.receiveShadow = true;

scene.add(floor);


/* Floor lines */

const lineMaterial =
    new THREE.LineBasicMaterial({
        color: 0x2f8cff,
        transparent: true,
        opacity: 0.28
    });


function makeLine(
    x1,
    z1,
    x2,
    z2
) {

    const points = [
        new THREE.Vector3(
            x1,
            0.015,
            z1
        ),

        new THREE.Vector3(
            x2,
            0.015,
            z2
        )
    ];

    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);

    const line =
        new THREE.Line(
            geometry,
            lineMaterial
        );

    scene.add(line);
}


makeLine(-10, -4, 10, -4);
makeLine(-10, 4, 10, 4);
makeLine(-10, -4, -10, 4);
makeLine(10, -4, 10, 4);
makeLine(0, -4, 0, 4);


/* =====================================================
   ARENA BACK WALL
===================================================== */

const wallMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x090e18,
        roughness: 0.65,
        metalness: 0.4
    });

const wall =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            22,
            9,
            0.35
        ),
        wallMaterial
    );

wall.position.set(
    0,
    4.3,
    -4.4
);

wall.receiveShadow = true;

scene.add(wall);


/* =====================================================
   NEON BACK WALL STRIPS
===================================================== */

for (
    let i = -9;
    i <= 9;
    i += 3
) {

    const strip =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.06,
                7,
                0.04
            ),
            new THREE.MeshBasicMaterial({
                color:
                    i % 2 === 0
                        ? 0x168cff
                        : 0xff3045
            })
        );

    strip.position.set(
        i,
        4,
        -4.18
    );

    scene.add(strip);
}


/* =====================================================
   ARENA LIGHTS
===================================================== */

function addArenaLight(
    x,
    color
) {

    const light =
        new THREE.PointLight(
            color,
            4,
            10
        );

    light.position.set(
        x,
        6,
        -2
    );

    scene.add(light);

    const bulb =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.15,
                12,
                12
            ),
            new THREE.MeshBasicMaterial({
                color
            })
        );

    bulb.position.copy(
        light.position
    );

    scene.add(bulb);
}


addArenaLight(
    -7,
    0x168cff
);

addArenaLight(
    7,
    0xff3045
);


/* =====================================================
   FIGHTER CREATION
===================================================== */

function createFighter(
    color,
    accent,
    name
) {

    const group =
        new THREE.Group();

    group.name = name;


    const bodyMaterial =
        new THREE.MeshStandardMaterial({
            color,
            roughness: 0.48,
            metalness: 0.25
        });


    const accentMaterial =
        new THREE.MeshStandardMaterial({
            color: accent,
            roughness: 0.4,
            metalness: 0.35
        });


    /* BODY */

    const body =
        new THREE.Mesh(
            new THREE.CapsuleGeometry(
                0.48,
                1.15,
                8,
                16
            ),
            bodyMaterial
        );

    body.position.y = 2.15;

    body.castShadow = true;

    group.add(body);


    /* HEAD */

    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.38,
                24,
                18
            ),
            bodyMaterial
        );

    head.position.y = 3.25;

    head.castShadow = true;

    group.add(head);


    /* HAIR / HELMET */

    const hair =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.39,
                24,
                12,
                0,
                Math.PI * 2,
                0,
                Math.PI * 0.55
            ),
            accentMaterial
        );

    hair.position.y = 3.42;

    group.add(hair);


    /* EYES */

    const eyeMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffffff
        });

    const eyeGeometry =
        new THREE.SphereGeometry(
            0.045,
            8,
            8
        );

    const eye1 =
        new THREE.Mesh(
            eyeGeometry,
            eyeMaterial
        );

    const eye2 =
        new THREE.Mesh(
            eyeGeometry,
            eyeMaterial
        );

    eye1.position.set(
        -0.13,
        3.27,
        0.34
    );

    eye2.position.set(
        0.13,
        3.27,
        0.34
    );

    group.add(eye1);
    group.add(eye2);


    /* ARMS */

    const armGeometry =
        new THREE.CapsuleGeometry(
            0.17,
            0.7,
            6,
            10
        );


    const leftArm =
        new THREE.Mesh(
            armGeometry,
            bodyMaterial
        );

    const rightArm =
        new THREE.Mesh(
            armGeometry,
            bodyMaterial
        );

    leftArm.position.set(
        -0.62,
        2.35,
        0
    );

    rightArm.position.set(
        0.62,
        2.35,
        0
    );

    leftArm.rotation.z =
        -0.35;

    rightArm.rotation.z =
        0.35;

    leftArm.castShadow = true;
    rightArm.castShadow = true;

    group.add(leftArm);
    group.add(rightArm);


    /* FISTS */

    const fistGeometry =
        new THREE.SphereGeometry(
            0.22,
            12,
            10
        );

    const leftFist =
        new THREE.Mesh(
            fistGeometry,
            accentMaterial
        );

    const rightFist =
        new THREE.Mesh(
            fistGeometry,
            accentMaterial
        );

    leftFist.position.set(
        -0.82,
        2.05,
        0
    );

    rightFist.position.set(
        0.82,
        2.05,
        0
    );

    group.add(leftFist);
    group.add(rightFist);


    /* LEGS */

    const legGeometry =
        new THREE.CapsuleGeometry(
            0.22,
            0.9,
            6,
            10
        );

    const leftLeg =
        new THREE.Mesh(
            legGeometry,
            bodyMaterial
        );

    const rightLeg =
        new THREE.Mesh(
            legGeometry,
            bodyMaterial
        );

    leftLeg.position.set(
        -0.27,
        0.95,
        0
    );

    rightLeg.position.set(
        0.27,
        0.95,
        0
    );

    leftLeg.castShadow = true;
    rightLeg.castShadow = true;

    group.add(leftLeg);
    group.add(rightLeg);


    /* BOOTS */

    const bootGeometry =
        new THREE.BoxGeometry(
            0.4,
            0.25,
            0.65
        );

    const leftBoot =
        new THREE.Mesh(
            bootGeometry,
            accentMaterial
        );

    const rightBoot =
        new THREE.Mesh(
            bootGeometry,
            accentMaterial
        );

    leftBoot.position.set(
        -0.27,
        0.35,
        0.08
    );

    rightBoot.position.set(
        0.27,
        0.35,
        0.08
    );

    group.add(leftBoot);
    group.add(rightBoot);


    /* NAME */

    const label =
        createNameLabel(name);

    label.position.set(
        0,
        4.15,
        0
    );

    group.add(label);


    return {
        group,

        body,

        head,

        leftArm,
        rightArm,

        leftFist,
        rightFist,

        leftLeg,
        rightLeg,

        leftBoot,
        rightBoot,

        health: 100,

        velocityY: 0,

        grounded: true,

        blocking: false,

        attacking: false,

        attackType: "",

        attackTimer: 0,

        hitCooldown: 0
    };
}


/* =====================================================
   NAME LABEL
===================================================== */

function createNameLabel(
    text
) {

    const canvas =
        document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 100;

    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.font =
        "bold 40px Arial";

    ctx.textAlign =
        "center";

    ctx.fillStyle =
        "rgba(255,255,255,0.9)";

    ctx.fillText(
        text,
        256,
        58
    );

    const texture =
        new THREE.CanvasTexture(
            canvas
        );

    const material =
        new THREE.SpriteMaterial({
            map: texture,
            transparent: true
        });

    const sprite =
        new THREE.Sprite(
            material
        );

    sprite.scale.set(
        2.2,
        0.43,
        1
    );

    return sprite;
}


/* =====================================================
   CREATE FIGHTERS
===================================================== */

const player =
    createFighter(
        0x1c5fa8,
        0x53c9ff,
        "VORTEX"
    );

const enemy =
    createFighter(
        0x9d202d,
        0xff6573,
        "TITAN"
    );


player.group.position.set(
    -3.5,
    0,
    0
);

enemy.group.position.set(
    3.5,
    0,
    0
);

player.group.rotation.y =
    Math.PI / 2;

enemy.group.rotation.y =
    -Math.PI / 2;

scene.add(player.group);
scene.add(enemy.group);


/* =====================================================
   GAME STATE
===================================================== */

const keys = {};

let gameRunning = true;

let timeLeft = 60;

let lastTime =
    performance.now();

let aiTimer = 0;

let messageTimer = null;


/* =====================================================
   DOM
===================================================== */

const playerHealth =
    document.getElementById(
        "playerHealth"
    );

const enemyHealth =
    document.getElementById(
        "enemyHealth"
    );

const timerElement =
    document.getElementById(
        "timer"
    );

const message =
    document.getElementById(
        "message"
    );

const gameOver =
    document.getElementById(
        "gameOver"
    );

const winnerText =
    document.getElementById(
        "winnerText"
    );

const winnerSmall =
    document.getElementById(
        "winnerSmall"
    );

const restartButton =
    document.getElementById(
        "restartButton"
    );

const backButton =
    document.getElementById(
        "backButton"
    );


/* =====================================================
   KEYBOARD
===================================================== */

window.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();

        keys[key] = true;


        if (
            key === "j" &&
            !event.repeat
        ) {

            playerAttack(
                "punch"
            );

        }


        if (
            key === "k" &&
            !event.repeat
        ) {

            playerAttack(
                "kick"
            );

        }


        if (key === "l") {

            player.blocking = true;

        }


        if (
            key === "w" &&
            !event.repeat &&
            player.grounded
        ) {

            jump(player);

        }

    }
);


window.addEventListener(
    "keyup",
    event => {

        const key =
            event.key.toLowerCase();

        keys[key] = false;

        if (key === "l") {
            player.blocking = false;
        }

    }
);


/* =====================================================
   PLAYER MOVEMENT
===================================================== */

function updatePlayer(
    delta
) {

    if (!gameRunning) {
        return;
    }

    if (player.attacking) {
        return;
    }


    let movement = 0;


    if (keys["a"]) {
        movement -= 1;
    }

    if (keys["d"]) {
        movement += 1;
    }


    const speed =
        4.4 * delta;


    player.group.position.x +=
        movement * speed;


    player.group.position.x =
        THREE.MathUtils.clamp(
            player.group.position.x,
            -8.5,
            8.5
        );


    if (
        player.grounded &&
        movement !== 0
    ) {

        player.group.position.y =
            Math.sin(
                performance.now() * 0.015
            ) * 0.025;

    }

}


/* =====================================================
   JUMP
===================================================== */

function jump(
    fighter
) {

    if (!fighter.grounded) {
        return;
    }

    fighter.grounded = false;

    fighter.velocityY = 8.5;
}


/* =====================================================
   PHYSICS
===================================================== */

function updatePhysics(
    fighter,
    delta
) {

    if (!fighter.grounded) {

        fighter.velocityY -=
            22 * delta;

        fighter.group.position.y +=
            fighter.velocityY * delta;


        if (
            fighter.group.position.y <= 0
        ) {

            fighter.group.position.y = 0;

            fighter.velocityY = 0;

            fighter.grounded = true;

        }

    }

}


/* =====================================================
   ATTACK
===================================================== */

function playerAttack(
    type
) {

    if (
        !gameRunning ||
        player.attacking
    ) {
        return;
    }

    player.attacking = true;

    player.attackType = type;

    player.attackTimer =
        type === "punch"
            ? 0.42
            : 0.58;


    animateAttack(
        player,
        type
    );

}


/* =====================================================
   ATTACK ANIMATION
===================================================== */

function animateAttack(
    fighter,
    type
) {

    const arm =
        fighter.group === player.group
            ? fighter.rightArm
            : fighter.leftArm;

    const fist =
        fighter.group === player.group
            ? fighter.rightFist
            : fighter.leftFist;


    const originalX =
        arm.position.x;

    const originalZ =
        arm.position.z;


    arm.position.x +=
        fighter.group === player.group
            ? 0.65
            : -0.65;

    arm.rotation.z =
        fighter.group === player.group
            ? -0.95
            : 0.95;


    fist.position.x +=
        fighter.group === player.group
            ? 0.75
            : -0.75;


    setTimeout(
        () => {

            arm.position.x =
                originalX;

            arm.position.z =
                originalZ;

            arm.rotation.z =
                fighter.group === player.group
                    ? 0.35
                    : -0.35;

            fist.position.x =
                fighter.group === player.group
                    ? 0.82
                    : -0.82;

        },
        type === "punch"
            ? 170
            : 230
    );

}


/* =====================================================
   ATTACK UPDATE
===================================================== */

function updateAttack(
    fighter,
    opponent,
    delta
) {

    if (!fighter.attacking) {
        return;
    }


    fighter.attackTimer -=
        delta;


    if (
        fighter.attackTimer <
        (
            fighter.attackType === "punch"
                ? 0.28
                : 0.38
        ) &&
        fighter.hitCooldown <= 0
    ) {

        const distance =
            Math.abs(
                fighter.group.position.x -
                opponent.group.position.x
            );


        const range =
            fighter.attackType === "punch"
                ? 1.65
                : 1.9;


        if (distance <= range) {

            dealDamage(
                fighter,
                opponent,
                fighter.attackType === "punch"
                    ? 7
                    : 11
            );

            fighter.hitCooldown =
                0.35;

        }

    }


    fighter.hitCooldown -=
        delta;


    if (
        fighter.attackTimer <= 0
    ) {

        fighter.attacking = false;

    }

}


/* =====================================================
   DAMAGE
===================================================== */

function dealDamage(
    attacker,
    defender,
    damage
) {

    if (!gameRunning) {
        return;
    }


    if (defender.blocking) {

        damage *= 0.25;

    }


    defender.health =
        Math.max(
            0,
            defender.health - damage
        );


    updateHealthBars();


    defender.group.position.x +=
        attacker.group.position.x <
        defender.group.position.x
            ? 0.12
            : -0.12;


    if (
        defender.health <= 0
    ) {

        finishGame(
            attacker === player
        );

    }

}


/* =====================================================
   HEALTH BARS
===================================================== */

function updateHealthBars() {

    playerHealth.style.width =
        player.health + "%";

    enemyHealth.style.width =
        enemy.health + "%";

}


/* =====================================================
   CPU AI
===================================================== */

function updateAI(
    delta
) {

    if (!gameRunning) {
        return;
    }


    aiTimer -= delta;


    const distance =
        Math.abs(
            enemy.group.position.x -
            player.group.position.x
        );


    if (
        enemy.attacking
    ) {
        return;
    }


    /* Move toward player */

    if (distance > 2.2) {

        const direction =
            player.group.position.x >
            enemy.group.position.x
                ? 1
                : -1;

        enemy.group.position.x +=
            direction *
            2.1 *
            delta;

    }


    /* Attack */

    if (
        distance <= 2.15 &&
        aiTimer <= 0
    ) {

        const random =
            Math.random();


        if (random < 0.58) {

            enemyAttack(
                "punch"
            );

        } else {

            enemyAttack(
                "kick"
            );

        }


        aiTimer =
            0.7 +
            Math.random() * 0.9;

    }


    /* Random block */

    if (
        distance < 2.8 &&
        Math.random() < 0.008
    ) {

        enemy.blocking = true;

        setTimeout(
            () => {
                enemy.blocking = false;
            },
            450
        );

    }

}


/* =====================================================
   CPU ATTACK
===================================================== */

function enemyAttack(
    type
) {

    if (enemy.attacking) {
        return;
    }


    enemy.attacking = true;

    enemy.attackType = type;

    enemy.attackTimer =
        type === "punch"
            ? 0.42
            : 0.58;


    animateEnemyAttack(
        type
    );

}


function animateEnemyAttack(
    type
) {

    enemy.leftArm.position.x =
        -1.25;

    enemy.leftArm.rotation.z =
        0.95;


    enemy.leftFist.position.x =
        -1.55;


    setTimeout(
        () => {

            enemy.leftArm.position.x =
                -0.62;

            enemy.leftArm.rotation.z =
                -0.35;

            enemy.leftFist.position.x =
                -0.82;

        },
        type === "punch"
            ? 170
            : 230
    );

}


/* =====================================================
   AI ATTACK UPDATE
===================================================== */

function updateEnemyAttack(
    delta
) {

    if (!enemy.attacking) {
        return;
    }


    enemy.attackTimer -=
        delta;


    if (
        enemy.attackTimer < 0.28 &&
        enemy.hitCooldown <= 0
    ) {

        const distance =
            Math.abs(
                enemy.group.position.x -
                player.group.position.x
            );


        if (
            distance <=
            (
                enemy.attackType === "punch"
                    ? 1.7
                    : 2
            )
        ) {

            dealDamage(
                enemy,
                player,
                enemy.attackType === "punch"
                    ? 7
                    : 11
            );

            enemy.hitCooldown =
                0.35;

        }

    }


    enemy.hitCooldown -=
        delta;


    if (
        enemy.attackTimer <= 0
    ) {

        enemy.attacking = false;

    }

}


/* =====================================================
   FIGHTER FACING
===================================================== */

function updateFacing() {

    if (
        player.group.position.x <
        enemy.group.position.x
    ) {

        player.group.rotation.y =
            Math.PI / 2;

        enemy.group.rotation.y =
            -Math.PI / 2;

    } else {

        player.group.rotation.y =
            -Math.PI / 2;

        enemy.group.rotation.y =
            Math.PI / 2;

    }

}


/* =====================================================
   CAMERA
===================================================== */

function updateCamera() {

    const center =
        (
            player.group.position.x +
            enemy.group.position.x
        ) / 2;


    const distance =
        Math.abs(
            player.group.position.x -
            enemy.group.position.x
        );


    const targetX =
        THREE.MathUtils.clamp(
            center * 0.35,
            -2,
            2
        );


    const targetZ =
        15 +
        Math.min(
            distance * 0.25,
            2
        );


    camera.position.x +=
        (
            targetX -
            camera.position.x
        ) * 0.04;


    camera.position.z +=
        (
            targetZ -
            camera.position.z
        ) * 0.04;


    camera.lookAt(
        center,
        2.5,
        0
    );

}


/* =====================================================
   TIMER
===================================================== */

let timerAccumulator = 0;

function updateTimer(
    delta
) {

    if (!gameRunning) {
        return;
    }


    timerAccumulator +=
        delta;


    if (
        timerAccumulator >= 1
    ) {

        timerAccumulator = 0;

        timeLeft--;

        timerElement.textContent =
            Math.max(
                0,
                timeLeft
            );


        if (
            timeLeft <= 0
        ) {

            finishByHealth();

        }

    }

}


/* =====================================================
   FINISH BY HEALTH
===================================================== */

function finishByHealth() {

    if (
        player.health >
        enemy.health
    ) {

        finishGame(true);

    } else if (
        enemy.health >
        player.health
    ) {

        finishGame(false);

    } else {

        finishGame(null);

    }

}


/* =====================================================
   GAME FINISH
===================================================== */

function finishGame(
    playerWon
) {

    if (!gameRunning) {
        return;
    }


    gameRunning = false;


    if (playerWon === true) {

        winnerSmall.textContent =
            "VICTORY";

        winnerText.textContent =
            "VORTEX WINS";

    } else if (
        playerWon === false
    ) {

        winnerSmall.textContent =
            "DEFEAT";

        winnerText.textContent =
            "TITAN WINS";

    } else {

        winnerSmall.textContent =
            "DRAW";

        winnerText.textContent =
            "TIME UP";

    }


    setTimeout(
        () => {

            gameOver.classList.remove(
                "hidden"
            );

        },
        500
    );

}


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(
    text
) {

    message.textContent =
        text;

    message.classList.add(
        "show"
    );


    clearTimeout(
        messageTimer
    );


    messageTimer =
        setTimeout(
            () => {

                message.classList.remove(
                    "show"
                );

            },
            900
        );

}


/* =====================================================
   RESTART
===================================================== */

function resetGame() {

    player.health = 100;
    enemy.health = 100;

    player.group.position.set(
        -3.5,
        0,
        0
    );

    enemy.group.position.set(
        3.5,
        0,
        0
    );

    player.velocityY = 0;
    enemy.velocityY = 0;

    player.grounded = true;
    enemy.grounded = true;

    player.attacking = false;
    enemy.attacking = false;

    player.blocking = false;
    enemy.blocking = false;

    player.hitCooldown = 0;
    enemy.hitCooldown = 0;

    timeLeft = 60;

    timerAccumulator = 0;

    gameRunning = true;

    updateHealthBars();

    timerElement.textContent =
        "60";

    gameOver.classList.add(
        "hidden"
    );

    showMessage(
        "ROUND 1"
    );

    setTimeout(
        () => {
            showMessage("FIGHT!");
        },
        700
    );

}


restartButton.addEventListener(
    "click",
    resetGame
);


/* =====================================================
   BACK TO CONSOLE
===================================================== */

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


    updatePlayer(delta);

    updateAI(delta);

    updatePhysics(
        player,
        delta
    );

    updatePhysics(
        enemy,
        delta
    );

    updateAttack(
        player,
        enemy,
        delta
    );

    updateEnemyAttack(
        delta
    );

    updateFacing();

    updateCamera();

    updateTimer(delta);


    renderer.render(
        scene,
        camera
    );

}


/* =====================================================
   START
===================================================== */

updateHealthBars();

showMessage(
    "ROUND 1"
);

setTimeout(
    () => {
        showMessage("FIGHT!");
    },
    900
);

animate(
    performance.now()
);
