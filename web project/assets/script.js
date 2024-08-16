const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleBottom = document.getElementById("shuffle");
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

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
let isShuffled = false;
let repeatOn = false;
const originPlaylist = [badboys, havana, saveyourstears];
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
    playSong();
}
function updateProgressBar(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
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
        shuffleBottom.classList.add('button-active')
    } else {
        isShuffled = false
        sortedPlaylist = [...originPlaylist]
        shuffleBottom.classList.remove('button-active')
    }
}

function repeatBottom (){

}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);
shuffleBottom.addEventListener("click", shuffleBottomClicked)
repeatBottom.addEventListener("click", repeatBottomClicked)