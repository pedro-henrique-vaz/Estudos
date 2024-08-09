const songName = document.getElementById('song-name');
const song = document.getElementById('audio');

songName.innerText = 'Bad Boys';

function playSong() {
    song.play();
}
play.addEventListener('click', playSong);
