<template>
  <div class="music-container">
    <h4 id="playlist-title">As Melhores Músicas Estão Aqui</h4>
    <v-img id="cover" alt="Disc Cover." :src="cover"></v-img>
    <audio ref="audio" id="audio" :src="media" @timeupdate="updateProgressBar" @ended="nextOrRepeat" @loadedmetadata="updateTotalTime"></audio>


    <div id="below-cover">
      <div id="song-info">
        <div id="song-name">{{musicName}}</div>
        <div id="band-name" class="light-color">{{bandName}}</div>
      </div>

      <button id="like" class="button" :class="{'light-color': !likeButton, 'button-active-like': likeButton}" @click="likeButtonClicked">
        <i class="mdi" :class="{'mdi mdi-heart-outline': !likeButton, 'mdi-heart': likeButton}"></i>
      </button>
    </div>

    <div id="progress-container" ref="progressContainer" @click="jumpTo">
      <div id="progress-bar">
        <div id="current-progress" :style="{'--progress': `${progressBar}%`}"></div>
      </div>
      <div id="time-box">
        <div id="song-time" class="songTime">{{ songTime }}</div>
        <div id="total-time" class="songTime">{{ totalTime }}</div>
      </div>
    </div>

    <div id="button-container">
      <button id="shuffle" class="button button-disable" v-show="!shuffleButton" @click="shuffle">
        <i class="mdi-shuffle mdi"></i>
      </button>
      <button id="unshuffle" class="button button-active" v-show="shuffleButton" @click="unshuffle">
        <i class="mdi-shuffle mdi"></i>
      </button>

      <button id="previous" class="button button-navigate" @click="previousSong">
        <i class="mdi-skip-previous mdi"></i>
      </button>

      <button id="play" class="button button-biggest" v-show="!isPlaying" @click="playPauseDecider">
        <i class="mdi-play-circle mdi"></i>
      </button>
      <button id="pause" class="button button-biggest" v-show="isPlaying" @click="pause">
        <i class="mdi-pause-circle mdi"></i>
      </button>

      <button id="next" class="button button-navigate" @click="nextSong">
        <i class="mdi-skip-next mdi"></i>
      </button>

      <button id="repeat" class="button" :class="{'button-disable': !repeatButton, 'button-active': repeatButton}" @click="repeatButtonClicked">
        <i class="mdi-repeat mdi"></i>
      </button>
    </div>
  </div>
  <div>
    <input type="text" id="search" placeholder="O que vocẽ quer ouvir?" />
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";
import axios from "axios";

let url = "http://127.0.0.1:1212"
const audio = ref(null);
const progressContainer = ref(null);
const media = ref("");
const cover = ref("");
const likeButton = ref(false);
const shuffleButton = ref(false);
const repeatButton = ref(false);
const isPlaying = ref(false);
const songTime = ref("00:00:00");
const totalTime = ref("00:00:00");
const progressBar = ref(0);
const musicName = ref("");
const bandName = ref("");
const repeatOn = ref(false);
const idSong = ref(0);

function play() {
  if(!isPlaying.value){
    isPlaying.value = false;
    audio.value.play();
  }
}

function pause() {
  if(isPlaying.value){
    isPlaying.value = false;
    audio.value.pause();
  }
}

// function playPauseDecider() {
//   if (isPlaying === true) {
//     pause();
//   } else {
//     play();
//   }
// }

onMounted(() => {
  initializeSong();
})

function initializeSong() {
  axios.get(`${url}/play/album/3/song/10`)
    .then(function (resposta) {
      idSong.value = resposta.data.id
      musicName.value = resposta.data.name
      bandName.value = resposta.data.artist_name
      media.value = url+resposta.data.song_link
      cover.value = url+resposta.data.album_cover
      likeButton.value = resposta.data.liked
      console.log(resposta.data)
    })
}

function nextSong() {
  axios.get(`${url}/next-song`)
    .then(function (resposta) {
      idSong.value = resposta.data.id
      musicName.value = resposta.data.name
      bandName.value = resposta.data.artist_name
      media.value = url+resposta.data.song_link
      cover.value = url+resposta.data.album_cover
      likeButton.value = resposta.data.liked
      play();
    });
}

function previousSong() {
  axios.get(`${url}/previous-song`)
    .then(function (resposta) {
      idSong.value = resposta.data.id
      musicName.value = resposta.data.name
      bandName.value = resposta.data.artist_name
      media.value = url+resposta.data.song_link
      cover.value = url+resposta.data.album_cover
      likeButton.value = resposta.data.liked
      play();
    })
}

function shuffle(){
  axios.get(`${url}/shuffle`)
    .then(function () {
      shuffleButton.value = !shuffleButton.value
    })
}

function unshuffle(){
  axios.get(`${url}/unshuffle`)
    .then(function () {
      shuffleButton.value = !shuffleButton.value
    })
}

function repeatButtonClicked (){
  repeatButton.value = !repeatButton.value
}

function nextOrRepeat () {
  if (!repeatOn.value) {
    nextSong()
  } else {
    play()
  }
}

function likeButtonClicked () {
  axios.post(`${url}/like/${idSong.value}`)
    .then(function (resposta) {
      likeButton.value = resposta.data
    })
}

function updateProgressBar(){
  progressBar.value = (audio.value.currentTime/audio.value.duration) * 100;
  songTime.value = toHHMMSS(audio.value.currentTime??0);
}

function jumpTo(event){
  const width = progressContainer.value.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition/width)* audio.value.duration;
  audio.value.currentTime = jumpToTime;
}

function toHHMMSS (originalNumber) {
  let hours = Math.floor(originalNumber / 3600);
  let minutes = Math.floor((originalNumber - hours * 3600) / 60);
  let seconds = Math.floor(originalNumber - hours * 3600 - minutes * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
  totalTime.value = toHHMMSS(audio.value.duration??0);
}

function searchArtists(event){
  if(event.key === 'Enter'){
    const nameArtist = event.target.value;
    axios.get(`${url}/artists?name=${nameArtist}`)
      .then(function (resposta) {
        console.log(resposta.data)
      })
      .catch (function (err) {
        console.log("Artista Inexistente", err);
      })
  }
}

function searchAlbums(event){
  if(event.key === 'Enter'){
    const nameAlbum = event.target.value;
    axios.get(`${url}/album?name=${nameAlbum}`)
      .then(function (resposta) {
        console.log(resposta.data)
      })
      .catch (function (err) {
        console.log("Album Inexistente", err);
      })
  }
}

function searchSongs(event){
  if(event.key === 'Enter'){
    const nameSong = event.target.value;
    axios.get(`${url}/songs?name=${nameSong}`)
      .then(function (resposta) {
        console.log(resposta.data)
      })
      .catch (function (err) {
        console.log("Música Inexistente", err);
      })
  }
}
</script>
