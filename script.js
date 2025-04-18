const images = {
    map: "assets/images/map.png",
    generator: "assets/images/generator.png",
    hacker_room: "assets/images/hacker_room.png",
    secret_exit: "assets/images/secret_exit.png",
    surgical_room: "assets/images/surgical_room.png",
    death_hallucination: "assets/images/death_hallucination.png",
    // Добавь сюда другие сцены по мере добавления
};

const sounds = {
    theme: new Audio("assets/sounds/theme.mp3"),
    ambient: new Audio("assets/sounds/ambient_loop.mp3"),
    surgical: new Audio("assets/sounds/surgical_room.mp3"),
    death: new Audio("assets/sounds/death_hallucination.mp3"),
    generator: new Audio("assets/sounds/generator.mp3"),
    exit_battle: new Audio("assets/sounds/final_exit_battle.mp3"),
    scp096: new Audio("assets/sounds/scp096_encounter.mp3"),
    secret_exit: new Audio("assets/sounds/secret_exit.mp3"),
};

let currentScene = "map";
let playerName = "";
let killCount = 0;
let reachedEnding = "";

function preloadSounds() {
    for (let key in sounds) {
        sounds[key].load();
    }
}

function switchScene(sceneName) {
    currentScene = sceneName;

    // Обновить фон
    const bg = document.getElementById("background");
    bg.src = images[sceneName] || images.map;

    // Остановить все звуки
    for (let key in sounds) {
        sounds[key].pause();
        sounds[key].currentTime = 0;
    }

    // Воспроизвести звук сцены
    if (sounds[sceneName]) {
        sounds[sceneName].play();
    } else {
        sounds.theme.play();
    }

    // Вызов события по сцене
    if (sceneName === "death_hallucination") {
        reachedEnding = "галлюцинации";
        endGame();
    }
    if (sceneName === "secret_exit") {
        reachedEnding = "спасение";
        endGame();
    }
    if (sceneName === "generator") {
        killCount += 1;
    }
}

function endGame() {
    setTimeout(() => {
        const name = prompt("Введите имя для таблицы лидеров:");
        if (name) {
            playerName = name;
            saveResult();
        }
    }, 1000);
}

function saveResult() {
    fetch("/leaderboard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: playerName,
            ending: reachedEnding,
            kills: killCount
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("Игра завершена. Результат сохранён.");
        location.reload();
    })
    .catch(err => {
        console.error("Ошибка при сохранении:", err);
        alert("Ошибка сохранения результата.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    preloadSounds();
    switchScene("map");

    document.getElementById("btn-hacker").addEventListener("click", () => switchScene("hacker_room"));
    document.getElementById("btn-generator").addEventListener("click", () => switchScene("generator"));
    document.getElementById("btn-surgery").addEventListener("click", () => switchScene("surgical_room"));
    document.getElementById("btn-secret").addEventListener("click", () => switchScene("secret_exit"));
    document.getElementById("btn-death").addEventListener("click", () => switchScene("death_hallucination"));
});
