/* =====================================================
   NEXTGEN CONSOLE
   PS5-INSPIRED ORIGINAL INTERFACE
===================================================== */

const gameCards = document.querySelectorAll(".gameCard");

const selectedTitle = document.getElementById("selectedTitle");
const selectedDescription =
    document.getElementById("selectedDescription");

const startGame =
    document.getElementById("startGame");

const searchBtn =
    document.getElementById("searchBtn");

const settingsBtn =
    document.getElementById("settingsBtn");

const fullscreenBtn =
    document.getElementById("fullscreenBtn");

const profile =
    document.querySelector(".profile");

const searchPanel =
    document.getElementById("searchPanel");

const settingsPanel =
    document.getElementById("settingsPanel");

const profilePanel =
    document.getElementById("profilePanel");

const gameLaunch =
    document.getElementById("gameLaunch");

const searchInput =
    document.getElementById("searchInput");

const searchResults =
    document.getElementById("searchResults");

const themeToggle =
    document.getElementById("themeToggle");

const animationToggle =
    document.getElementById("animationToggle");

const soundToggle =
    document.getElementById("soundToggle");

const clock =
    document.getElementById("clock");

const loadingProgress =
    document.getElementById("loadingProgress");

const loadingText =
    document.getElementById("loadingText");

const cancelLaunch =
    document.getElementById("cancelLaunch");


/* =====================================================
   GAME INFORMATION
===================================================== */

const games = {

    fighter: {
        title: "Ultimate Clash",
        description:
            "Enter a realistic 3D fighting arena and battle your way through powerful opponents.",
        type: "3D Fighting Game"
    },

    racing: {
        title: "NextGen Racing",
        description:
            "High-speed racing through detailed tracks and futuristic environments.",
        type: "Racing"
    },

    adventure: {
        title: "Lost Horizon",
        description:
            "Explore a mysterious world filled with mountains, ruins and hidden discoveries.",
        type: "Adventure"
    },

    football: {
        title: "Ultimate Football",
        description:
            "Take your team onto the pitch and compete in intense football matches.",
        type: "Sports"
    }

};


/* =====================================================
   STATE
===================================================== */

let selectedIndex = 0;

let animationsEnabled =
    localStorage.getItem("consoleAnimations") !== "false";

let soundEnabled =
    localStorage.getItem("consoleSound") !== "false";

let lightTheme =
    localStorage.getItem("consoleTheme") === "light";

let loadingTimer = null;


/* =====================================================
   SELECT GAME
===================================================== */

function selectGame(index) {

    if (index < 0) {
        index = gameCards.length - 1;
    }

    if (index >= gameCards.length) {
        index = 0;
    }

    selectedIndex = index;

    gameCards.forEach(card => {
        card.classList.remove("active");
    });

    const card = gameCards[selectedIndex];

    card.classList.add("active");

    const gameKey = card.dataset.game;
    const game = games[gameKey];

    selectedTitle.textContent = game.title;
    selectedDescription.textContent =
        game.description;

    card.scrollIntoView({
        behavior: animationsEnabled ? "smooth" : "auto",
        block: "nearest",
        inline: "center"
    });

    playSound("select");
}


/* =====================================================
   GAME CARD CLICK
===================================================== */

gameCards.forEach((card, index) => {

    card.addEventListener("click", () => {
        selectGame(index);
    });

});


/* =====================================================
   START GAME
===================================================== */

startGame.addEventListener("click", () => {

    const selectedGame =
        gameCards[selectedIndex].dataset.game;

    if (selectedGame === "fighter") {

        launchFightingGame();
        return;

    }

    if (selectedGame === "racing") {

        window.location.href =
            "racing-game/race.html";

        return;

    }

    alert(
        games[selectedGame].title +
        " is coming soon."
    );

});


/* =====================================================
   LAUNCH FIGHTING GAME
===================================================== */

function launchFightingGame() {

    gameLaunch.classList.remove("hidden");

    let progress = 0;

    loadingProgress.style.width = "0%";
    loadingText.textContent = "Loading 0%";

    clearInterval(loadingTimer);

    loadingTimer = setInterval(() => {

        progress += Math.floor(Math.random() * 7) + 3;

        if (progress >= 100) {
            progress = 100;
        }

        loadingProgress.style.width =
            progress + "%";

        loadingText.textContent =
            `Loading ${progress}%`;

        if (progress >= 100) {

            clearInterval(loadingTimer);

            setTimeout(() => {

                /*
                 * The 3D fighting engine will be loaded here.
                 * For now the console interface completes
                 * its launch sequence.
                 */

                loadingText.textContent =
                    "Ready to fight";

                setTimeout(() => {

                    alert(
                        "Ultimate Clash is ready!\n\n" +
                        "The 3D fighting arena will open here."
                    );

                    gameLaunch.classList.add("hidden");

                }, 500);

            }, 300);

        }

    }, 120);

    playSound("confirm");
}


/* =====================================================
   CANCEL LAUNCH
===================================================== */

cancelLaunch.addEventListener("click", () => {

    clearInterval(loadingTimer);

    gameLaunch.classList.add("hidden");

    loadingProgress.style.width = "0%";

    loadingText.textContent =
        "Loading 0%";

});


/* =====================================================
   SEARCH
===================================================== */

const searchableGames = Object.entries(games);

function renderSearchResults(query = "") {

    const normalized =
        query.trim().toLowerCase();

    const results =
        searchableGames.filter(([key, game]) => {

            return (
                game.title
                    .toLowerCase()
                    .includes(normalized) ||
                game.type
                    .toLowerCase()
                    .includes(normalized)
            );

        });

    if (results.length === 0) {

        searchResults.innerHTML = `
            <div class="searchResult">
                <span>🔎</span>
                <div>
                    <strong>No games found</strong>
                    <small>Try another search</small>
                </div>
            </div>
        `;

        return;
    }

    searchResults.innerHTML =
        results.map(([key, game]) => {

            const index =
                [...gameCards].findIndex(
                    card => card.dataset.game === key
                );

            const card =
                gameCards[index];

            const emoji =
                key === "fighter"
                    ? "🥊"
                    : key === "racing"
                        ? "🏎️"
                        : key === "adventure"
                            ? "🏔️"
                            : "⚽";

            return `
                <button
                    class="searchResult"
                    data-index="${index}"
                >
                    <span class="searchFlag">
                        ${emoji}
                    </span>

                    <div>
                        <strong>
                            ${game.title}
                        </strong>

                        <small>
                            ${game.type}
                        </small>
                    </div>
                </button>
            `;

        }).join("");

    document
        .querySelectorAll(".searchResult[data-index]")
        .forEach(button => {

            button.addEventListener("click", () => {

                selectGame(
                    Number(button.dataset.index)
                );

                closePanel(searchPanel);

            });

        });
}


searchBtn.addEventListener("click", () => {

    searchPanel.classList.remove("hidden");

    searchInput.value = "";

    renderSearchResults();

    setTimeout(() => {
        searchInput.focus();
    }, 50);

});


searchInput.addEventListener("input", () => {

    renderSearchResults(
        searchInput.value
    );

});


/* =====================================================
   SETTINGS
===================================================== */

settingsBtn.addEventListener("click", () => {

    settingsPanel.classList.remove("hidden");

});


themeToggle.addEventListener("click", () => {

    lightTheme = !lightTheme;

    document.body.classList.toggle(
        "light",
        lightTheme
    );

    themeToggle.textContent =
        lightTheme ? "LIGHT" : "DARK";

    localStorage.setItem(
        "consoleTheme",
        lightTheme ? "light" : "dark"
    );

});


animationToggle.addEventListener("click", () => {

    animationsEnabled =
        !animationsEnabled;

    animationToggle.textContent =
        animationsEnabled ? "ON" : "OFF";

    animationToggle.classList.toggle(
        "active",
        animationsEnabled
    );

    localStorage.setItem(
        "consoleAnimations",
        animationsEnabled
    );

});


soundToggle.addEventListener("click", () => {

    soundEnabled = !soundEnabled;

    soundToggle.textContent =
        soundEnabled ? "ON" : "OFF";

    soundToggle.classList.toggle(
        "active",
        soundEnabled
    );

    localStorage.setItem(
        "consoleSound",
        soundEnabled
    );

});


/* =====================================================
   PROFILE
===================================================== */

profile.addEventListener("click", () => {

    profilePanel.classList.remove("hidden");

});


/* =====================================================
   CLOSE PANELS
===================================================== */

document
    .querySelectorAll("[data-close]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const id =
                button.dataset.close;

            const panel =
                document.getElementById(id);

            closePanel(panel);

        });

    });


function closePanel(panel) {

    if (panel) {
        panel.classList.add("hidden");
    }

}


/* =====================================================
   CLICK OUTSIDE PANEL
===================================================== */

[
    searchPanel,
    settingsPanel,
    profilePanel
].forEach(panel => {

    panel.addEventListener("click", event => {

        if (event.target === panel) {
            closePanel(panel);
        }

    });

});


/* =====================================================
   FULLSCREEN
===================================================== */

fullscreenBtn.addEventListener("click", async () => {

    try {

        if (!document.fullscreenElement) {

            await document.documentElement
                .requestFullscreen();

        } else {

            await document.exitFullscreen();

        }

    } catch (error) {

        console.log(
            "Fullscreen unavailable:",
            error
        );

    }

});


/* =====================================================
   CLOCK
===================================================== */

function updateClock() {

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}

updateClock();

setInterval(updateClock, 1000);


/* =====================================================
   KEYBOARD / CONTROLLER NAVIGATION
===================================================== */

document.addEventListener("keydown", event => {

    const activeOverlay =
        document.querySelector(
            ".overlay:not(.hidden)"
        );

    /*
     * Escape = back
     */

    if (event.key === "Escape") {

        if (activeOverlay) {
            closePanel(activeOverlay);
            return;
        }

    }


    /*
     * Arrow right / D
     */

    if (
        event.key === "ArrowRight" ||
        event.key.toLowerCase() === "d"
    ) {

        if (!activeOverlay) {

            selectGame(
                selectedIndex + 1
            );

        }

    }


    /*
     * Arrow left / A
     */

    if (
        event.key === "ArrowLeft" ||
        event.key.toLowerCase() === "a"
    ) {

        if (!activeOverlay) {

            selectGame(
                selectedIndex - 1
            );

        }

    }


    /*
     * Enter = select
     */

    if (
        event.key === "Enter" &&
        !activeOverlay
    ) {

        startGame.click();

    }


    /*
     * F = fullscreen
     */

    if (
        event.key.toLowerCase() === "f" &&
        !activeOverlay
    ) {

        fullscreenBtn.click();

    }

});


/* =====================================================
   SOUND
===================================================== */

let audioContext = null;

function playSound(type) {

    if (!soundEnabled) return;

    try {

        if (!audioContext) {
            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();
        }

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(
            audioContext.destination
        );

        if (type === "select") {
            oscillator.frequency.value = 420;
        }

        if (type === "confirm") {
            oscillator.frequency.value = 650;
        }

        gain.gain.setValueAtTime(
            0.025,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.08
        );

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.08
        );

    } catch (error) {
        // Audio may be blocked until user interaction.
    }

}


/* =====================================================
   INITIAL STATE
===================================================== */

document.body.classList.toggle(
    "light",
    lightTheme
);

themeToggle.textContent =
    lightTheme ? "LIGHT" : "DARK";

animationToggle.textContent =
    animationsEnabled ? "ON" : "OFF";

animationToggle.classList.toggle(
    "active",
    animationsEnabled
);

soundToggle.textContent =
    soundEnabled ? "ON" : "OFF";

soundToggle.classList.toggle(
    "active",
    soundEnabled
);

selectGame(0);
```
