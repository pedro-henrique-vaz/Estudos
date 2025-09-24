<template>
  <v-container class="pt-16">
    <v-row justify='start' class="text-h2" style="color: white">Album</v-row>
    <v-row no-gutters justify="start">
      <v-col class="ma-2" cols="1" v-for="song in songs">
        <v-card>
          <v-avatar
            class="ma-3"
            rounded="0"
            size="125"
          >
            <v-img :src="url + '/' + song.album_cover"></v-img>
          </v-avatar>

          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h6">{{ song.name }}</v-card-title>
              <v-card-subtitle>{{ song.artist }}</v-card-subtitle>

              <v-card-actions>
                <v-btn
                  class="ms-2"
                  icon="mdi-play"
                  variant="text"
                ></v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {defineProps, onMounted, ref} from "vue";
import axios from "axios";

let url = "http://127.0.0.1:1212"
defineProps({search: String})
const songs = ref([])

function searchArtists(event) {
  if (event.key === 'Enter') {
    const nameArtist = event.target.value;
    axios.get(`${url}/artists?name=${nameArtist.value}`)
      .then(function (resposta) {
        console.log(resposta.data)
      })
      .catch(function (err) {
        console.log("Artista Inexistente", err);
      })
  }
}

function searchAlbums() {
    axios.get(`${url}/album?name=${search.value}`)
      .then(function (resposta) {
        console.log(resposta.data)
        songs.value = resposta.data
      })
      .catch(function (err) {
        console.log("Album Inexistente", err);
      })
}

function searchSongs(event) {
  if (event.key === 'Enter') {
    const nameSong = event.target.value;
    axios.get(`${url}/songs?name=${nameSong.value}`)
      .then(function (resposta) {
        console.log(resposta.data)
        songs.value = resposta.data;
      })
      .catch(function (err) {
        console.log("Música Inexistente", err);
      })
  }
}

onMounted(() => {
  searchAlbums()
})

</script>
