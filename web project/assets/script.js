const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const likeButtom = document.getElementById("like");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButtom = document.getElementById("shuffle");
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const badboys = {
    songName: "Bad Boys",
    file: "bad_boys",
    artist: "Inner Cycle",
    liked: false
};
const havana = {
    songName: "Havana",
    file: "havana",
    artist: "Camila Cabello",
    liked: false
};
const saveyourstears = {
    songName: "Save Yours Tears",
    file: "save_yours_tears",
    artist: "The Weeknd",
    liked: false
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [badboys, havana, saveyourstears,];
let sortedPlaylist = [...originPlaylist];
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
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    song.src = `assets/songs/${sortedPlaylist[index].file}.mp3`;
    cover.src = `assets/img/${sortedPlaylist[index].file}.png`;
}

function nextSong() {
    if(index === sortedPlaylist.length - 1){
        index = 0;
    }
    else {
        index += 1;
    }
    initializeSong();
    likeButtonRender();
    playSong();
}

function previousSong() {
    if(index === 0){
        index = sortedPlaylist.length - 1;
    }
    else {
        index -= 1;
    }
    initializeSong();
    likeButtonRender();
    playSong();
}
function updateProgressBar(){
    const barWidth = (song.currentTime/song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
    const size = sortedPlaylist.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleBottomClicked(){
    if (isShuffled === false){
        isShuffled = true
        shuffleArray(sortedPlaylist)
        shuffleButtom.classList.add('button-active')
    } else {
        isShuffled = false
        sortedPlaylist = [...originPlaylist]
        shuffleButtom.classList.remove('button-active')
    }
}

function repeatButtomClicked (){
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active');
    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat () {
    if (repeatOn === false) {
        nextSong()
    } else {
        playSong()
    }
}

function toHHMMSS (originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let minutes = Math.floor((originalNumber - hours * 3600) / 60);
    let seconds = Math.floor(originalNumber - hours * 3600 - minutes * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonRender() {
    if (sortedPlaylist[index].liked === true) {
        likeButtom.querySelector('.bi').classList.remove('bi-heart');
        likeButtom.querySelector('.bi').classList.add('bi-heart-fill');
        likeButtom.querySelector('.bi').classList.add('button-active-like');
    } else {
        likeButtom.querySelector('.bi').classList.add('bi-heart');
        likeButtom.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButtom.querySelector('.bi').classList.remove('button-active-like');
    }
}

function likeButtonClicked () {
    if (sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originPlaylist));
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButtom.addEventListener("click", shuffleBottomClicked)
repeatButton.addEventListener("click", repeatButtomClicked)
likeButtom.addEventListener("click", likeButtonClicked)
