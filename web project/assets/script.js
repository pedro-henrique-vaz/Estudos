const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");

const badboys = {
    songName: "Bad Boys",
    file: "bad_boys",
    artist: "Inner Cycle",
};
const havana = {
    songName: "Havana",
    file: "havana",
    artist: "Camila Cabello",
};
const saveyourstears = {
    songName: "Save Yours Tears",
    file: "save_yours_tears",
    artist: "The Weeknd",
};
let isPlaying = false;
const playlist = [badboys, havana, saveyourstears];
let index = 0;

function playSong() {
    isPlaying = true;
    play.querySelector("i.bi").classList.remove("bi-play-circle-fill");
    play.querySelector("i.bi").classList.add("bi-pause-circle-fill");
    song.play();
}

function pauseSong() {
    isPlaying = false;
    play.querySelector("i.bi").classList.add("bi-play-circle-fill");
    play.querySelector("i.bi").classList.remove("bi-pause-circle-fill");
    song.pause();
}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
}

function initializeSong() {
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
    song.src = `assets/songs${playlist[index].file}.mp3`;
    cover.src = `assets/img${playlist[index].file}.jpeg`;
}

function nextSong() {
    if(index === playlist.length - 1){
        index = 0;
    }
    else {
        index += 1;
    }
    initializeSong();
    playSong();
}

function previousSong() {
    if(index === 0){
        index = playlist.length - 1;
    }
    else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

initializeSong();
play.addEventListener("click", playPauseDecider);
next.addEventListener("click", nextSong);
previous.addEventListener("click", previousSong);