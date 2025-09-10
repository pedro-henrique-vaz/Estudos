<template>
  <div class="music-container">
    <h4 id="playlist-title">As Melhores Músicas Estão Aqui</h4>
    <v-img id="cover" alt="Disc Cover." :src="cover"></v-img>
    <audio ref="audio" id="audio" :src="media"></audio>

    <div id="below-cover">
      <div id="song-info">
        <div id="song-name">{{musicName}}</div>
        <div id="band-name" class="light-color">{{bandName}}</div>
      </div>

      <button id="like" class="button light-color" v-show="!likeButton" @click="like">
        <i class="mdi mdi-heart-outline"></i>
      </button>
      <button id="dontLike" class="button light-color" v-show="likeButton" @click="dontLike">
        <i class="mdi mdi-heart"></i>
      </button>

    </div>

    <div id="progress-container">
      <div id="progress-bar">
        <div id="current-progress"></div>
      </div>
      <div id="time-box">
        <div id="song-time">00:00:00</div>
        <div id="total-time">00:00:00</div>
      </div>
    </div>

    <div id="button-container">
      <button id="shuffle" class="button" @click="shuffle">
        <i class="mdi-shuffle mdi"></i>
      </button>

      <button id="previous" class="button button-navigate" @click="previousSong">
        <i class="mdi-skip-previous mdi"></i>
      </button>

      <button id="play" class="button button-biggest" v-show="!isPlaying" @click="play">
        <i class="mdi-play-circle mdi"></i>
      </button>
      <button id="pause" class="button button-biggest" v-show="isPlaying" @click="pause">
        <i class="mdi-pause-circle mdi"></i>
      </button>

      <button id="next" class="button button-navigate" @click="nextSong">
        <i class="mdi-skip-next mdi"></i>
      </button>

      <button id="repeat" class="button" @click="unshuffle">
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
const media = ref("");
const cover = ref("");
const likeButton = ref(false);
const isPlaying = ref(false);
const musicName = ref("");
const bandName = ref("");
let isShuffled = false;
let repeatOn = false;
let idSong;

function play() {
  isPlaying.value = !isPlaying.value
  audio.value.play();
}

function pause() {
  isPlaying.value = !isPlaying.value
  audio.value.pause();
}

onMounted(() => {
  initializeSong();
})

function initializeSong() {
  axios.get(`${url}/play/album/4/song/69`)
    .then(function (resposta) {
      idSong = resposta.data.id
      musicName.value = resposta.data.name
      bandName.value = resposta.data.artist_name
      media.value = url+resposta.data.song_link
      cover.value = url+resposta.data.album_cover
      console.log(resposta.data)
      // likeButtonRender(resposta.data.liked);
    })
}

function nextSong() {
  axios.get(`${url}/next-song`)
    .then(function (resposta) {
      idSong = resposta.data.id
      musicName.value = resposta.data.name
      bandName.value = resposta.data.artist_name
      media.value = url+resposta.data.song_link
      cover.value = url+resposta.data.album_cover
      play();
      // likeButtonRender(resposta.data.liked);
    });
}

function previousSong() {
  axios.get(`${url}/previous-song`)
    .then(function (resposta) {
      idSong = resposta.data.id
      musicName.value = resposta.data.name
      bandName.value = resposta.data.artist_name
      media.value = url+resposta.data.song_link
      cover.value = url+resposta.data.album_cover
      play();
      // likeButtonRender(resposta.data.liked);
    })
}

function shuffle(){
  axios.get(`${url}/shuffle`)
    .then(function () {
      isShuffled = true
      // shuffleButton.classList.add('button-active')
    })
}

function unshuffle(){
  axios.get(`${url}/unshuffle`)
    .then(function () {
      isShuffled = false
      // shuffleButton.classList.remove('button-active')
    })
}

function likeButtonClicked () {
  axios.post(`${url}/like/${idSong}`)
    .then(function (resposta) {
      // likeButtonRender(resposta.data)
    })
}

function like() {
  likeButton.value = !likeButton.value
}

function dontLike() {
  likeButton.value = !likeButton.value
}
// function likeButtonRender(liked) {
//   if (liked === true){
//     likeButton.querySelector('.bi').classList.remove('bi-heart');
//     likeButton.querySelector('.bi').classList.add('bi-heart-fill');
//     likeButton.querySelector('.bi').classList.add('button-active-like');
//   } else {
//     likeButton.querySelector('.bi').classList.add('bi-heart');
//     likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
//     likeButton.querySelector('.bi').classList.remove('button-active-like');
//   }
// }
</script>
