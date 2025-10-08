<template>
  <v-container class="pt-16">
    <v-row justify='start' class="text-h2 pa-8" style="color: white; font-family:Spotify-Mix">Artistas</v-row>
    <v-row no-gutters justify="start">
      <v-col cols="6" sm="3" lg="2" v-for="artist in artists" class="pa-3">
        <v-card class="mx-auto" flat color="transparent" style="max-width: 220px;">
          <v-avatar rounded="1" size="75%" style="aspect-ratio: 1/1;" @click="$router.push({name: '/player/:id', params: {id: album.id}})">
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
const artists = ref([])

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

onMounted(() => {
  searchArtists()
})
</script>
