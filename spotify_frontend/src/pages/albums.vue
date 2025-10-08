<template>
  <v-container class="pt-16">
    <v-row justify='start' class="text-h2 pa-8" style="color: white; font-family:Spotify-Mix">Álbums</v-row>
    <v-row no-gutters justify="start" class="px-5">
      <v-col cols="6" sm="4" lg="2" v-for="album in albums" class="pa-3">
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
</template>

<script lang="ts" setup>
import {defineProps, onMounted, ref} from "vue";
import axios from "axios";

let url = "http://127.0.0.1:1212"
defineProps({search: String})
const albums = ref([])

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

onMounted(() => {
  searchAlbums()
})
</script>
