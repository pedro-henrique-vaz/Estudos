<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>

    <v-navigation-drawer
      app
      permanent
      width="250"
      color="black"
      dark
      class="pa-3 d-flex flex-column fill-height"
    >

      <div class="mb-5">
        <v-img :src="'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png'" alt="Logo" max-height="45" contain ></v-img>
      </div>

      <div class="flex-grow-1">
        <v-list dense nav class="pa-0">
          <v-list-item link to="/albums-artist">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Página Inicial</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list dense nav class="pa-0">
          <v-list-item link to="/artists">
            <v-list-item-icon>
              <v-icon>mdi-account-music</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Artistas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list dense nav class="pa-0">
          <v-list-item link to="/albums">
            <v-list-item-icon>
              <v-icon>mdi-image-album</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Álbuns</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider class="my-3"></v-divider>

        <v-list dense nav class="pa-0">
          <v-list-item link to="/music-favorites">
            <v-list-item-icon>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Músicas Favoritas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list dense nav class="pa-0">
          <v-list-item link to="/playlists-favorites">
            <v-list-item-icon>
              <v-icon>mdi-bookshelf</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">Sua Biblioteca</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <v-footer class="d-flex align-center justify-center flex-wrap py-2" color="black">
        <div class="flex-1-0-100 text-center mt-2">
          {{ new Date().getFullYear() }} — <strong>Spotify</strong>
        </div>
      </v-footer>
    </v-navigation-drawer>

    <v-app-bar :elevation="2" style="background-color: black">
      <v-container>
        <h2 style="text-align: center; font-family:Spotify-mix">Ás Melhores Músicas Estão Aqui</h2>
      </v-container>
      <input type="text" id="search" placeholder="O que você quer ouvir?"  @keydown.enter="$router.push({name: '/list', props: true})" />
    </v-app-bar>
  </v-app>
</template>
<script lang="ts" setup>
import {ref} from 'vue'

const value = ref(0)
</script>
