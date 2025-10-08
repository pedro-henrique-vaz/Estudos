<template>
  <v-container class="pt-16">
    <v-row justify='start' class="text-h2 pa-8" style="color: white; font-family:Spotify-Mix">Álbums</v-row>
    <v-row no-gutters justify="start" class="px-5">
      <v-col cols="6" sm="4" lg="2" v-for="album in albums.slice(0, 6)" class="pa-3">
        <v-card flat color="transparent" class="mx-auto" width="170" rounded="lg" style="max-width: 170px;" @click="$router.push({name: '/player/:id', params: {id: album.id}})">
          <v-avatar rounded="lg" size="100%" class="d-block" style="aspect-ratio: 1/1;">
            <v-img :src="url + '/' + album.album_cover"></v-img>
          </v-avatar>
          <div class="mt-3">
            <v-card-title class="text-subtitle-1 font-weight-bold pa-0 text-white text-wrap">
              {{ album.name }}
            </v-card-title>
            <v-card-subtitle class="pa-0 mt-1">{{ album.artist }}</v-card-subtitle>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="pt-16">
    <v-row justify='start' class="text-h2 pa-8" style="color: white; font-family:Spotify-Mix">Artistas</v-row>
    <v-row no-gutters justify="start">
      <v-col cols="6" sm="3" lg="2" v-for="artist in artists.slice(0, 6)" class="pa-3">
        <v-card class="mx-auto" flat color="transparent" style="max-width: 220px;">
          <v-avatar rounded="1" size="75%" style="aspect-ratio: 1/1;">
            <v-img :src="url + '/' + artist.artist_cover"></v-img>
          </v-avatar>
          <div class="mt-2">
            <v-card-title class="text-subtitle-1 font-weight-bold pa-0 text-white text-wrap"> {{ artist.name }}
            </v-card-title>
            <v-card-subtitle class="pa-0 mt-1 text-subtitle-1"> Artista </v-card-subtitle>
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
const albums = ref([])
const artists = ref([])
const songs = ref([])

function searchArtists() {
  axios.get(`${url}/artists?name=${search.value}`)
    .then(function (resposta) {
      console.log(resposta.data)
      artists.value = resposta.data
    })
    .catch(function (err) {
      console.log("Artista Inexistente", err);
    })
}

function searchAlbums() {
  axios.get(`${url}/album?name=${search.value}`)
    .then(function (resposta) {
      console.log(resposta.data)
      albums.value = resposta.data
    })
    .catch(function (err) {
      console.log("Album Inexistente", err);
    })
}

function searchSongs() {
  if (event.key === 'Enter') {
    axios.get(`${url}/songs?name=${search.value}`)
      .then(function (resposta) {
        console.log(resposta.data)
        songs.value = resposta.data
      })
      .catch(function (err) {
        console.log("Música Inexistente", err);
      })
  }
}

onMounted(() => {
  searchAlbums()
  searchArtists()
})
</script>
