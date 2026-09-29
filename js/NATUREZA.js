// Lista de músicas
const sounds = [
    { title: "Chuva", file: "../audio/chuva.mp3" },
    { title: "Mar", file: "../audio/mar.mp3" },
    { title: "Pássaros", file: "../audio/passaros.mp3" },
    { title: "Rio", file: "../audio/rio.mp3" }
];

let current = 0;
const titleEl = document.getElementById("title");
const audioEl = document.getElementById("audioPlayer");

function loadSound(index) {
    titleEl.textContent = sounds[index].title;
    audioEl.src = sounds[index].file;
    audioEl.play(); // já toca automaticamente
}

function next() {
    current = (current + 1) % sounds.length;
    loadSound(current);
}

function prev() {
    current = (current - 1 + sounds.length) % sounds.length;
    loadSound(current);
}