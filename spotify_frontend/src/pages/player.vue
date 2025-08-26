<template>
  <div class="music-container">
    <h4 id="playlist-title">As Melhores Músicas Estão Aqui</h4>
    <img
      id="cover"
      alt="Disc Cover."
      src="http://192.168.1.108:1212/src/Coldplay/Moon%20Music/moon_music_cover.jpg"
    />
    <audio id="audio"></audio>
    <div id="below-cover">
      <div id="song-info">
        <div id="song-name">Nome da música</div>
        <div id="band-name" class="light-color">Nome da banda</div>
      </div>
      <button id="like" class="button light-color">
        <i class="bi bi-heart"></i>
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
      <button id="play" class="button button-biggest" @click="tocarMusica">
        <i class="mdi-play-circle"></i>
      </button>

      <button
        id="next"
        class="button button-navigate"@click="proximaMusica">
        <i class="mdi-skip-next"></i>
      </button>

      <button
        id="previous"
        class="button button-navigate"@click="musicaAnterior">
        <i class="mdi-skip-previous"></i>
      </button>

      <button id="shuffle" class="button" @click="embaralharMusicas">
        <i class="mdi-shuffle"></i>
      </button>

      <button id="repeat" class="button" @click="desembralharMusicas">
        <i class="mdi-repeat"></i>
      </button>
    </div>
  </div>
  <div>
    <input type="text" id="search" placeholder="O que vocẽ quer ouvir?" />
  </div>
</template>

<script lang="ts" setup>

</script>
