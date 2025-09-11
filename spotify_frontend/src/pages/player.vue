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

      <button id="like" class="button" :class="{'light-color': !likeButton, 'button-active-like': likeButton}" @click="likeButtonClicked">
        <i class="mdi" :class="{'mdi mdi-heart-outline': !likeButton, 'mdi-heart': likeButton}"></i>
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
      <button id="shuffle" class="button button-disable" v-show="!shuffleButton" @click="shuffle">
        <i class="mdi-shuffle mdi"></i>
      </button>
      <button id="unshuffle" class="button button-active" v-show="shuffleButton" @click="unshuffle">
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
const media = ref("");
const cover = ref("");
const likeButton = ref(false);
const shuffleButton = ref(false);
const repeatButton = ref(false);
const isPlaying = ref(false);
const musicName = ref("");
const bandName = ref("");
let repeatOn = false;
const idSong = ref(0);

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
  if (!repeatOn) {
    pause()
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
</script>
