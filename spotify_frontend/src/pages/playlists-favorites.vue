<template>
  <v-container fluid class="pa-4">

    <v-list lines="two" class="bg-transparent pa-0">
      <v-list-item v-for="playItem in playlistTest" class="list-item-spotify my-2 py-2 text-white" rounded="lg" link :active="false">
        <template v-slot:prepend>
          <v-avatar rounded="sm" size="58" class="mr-4" :color="playItem.color">
            <v-icon v-if="playItem.icon" :icon="playItem.icon" color="white" size="30"></v-icon>
          </v-avatar>
        </template>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold text-subtitle-1">
            {{ playItem.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-white opacity-75">
            {{ playItem.details }}
            <span v-html="playItem.emotes"></span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import {ref} from 'vue';

const playlistTest = ref([
  {
    title: 'Playlist 01',
    details: 'Playlist',
    color: '#000080',
  },
  {
    title: 'Brega Funk',
    details: 'Playlist',
    color: '#343a40'
  },
  {
    title: 'Samba Ha Mais',
    details: 'Playlist',
    color: '#006400'
  },
  {
    title: 'Igor Kannario',
    details: 'Playlist',
    color: '#8b0000'
  },
  {
    title: 'Cabelo de Milho',
    details: 'Álbum',
    color: '#6c757d'
  },
  {
    title: 'Brega sem Limites',
    details: 'Playlist',
    color: '#495057'
  },
  {
    title: 'Esquenta Sao Joao',
    details: 'Playlist',
    color: '#000080',
  },
  {
    title: 'Musicas de Treino',
    details: 'Playlist',
    color: '#ff8c00',
  },
]);
</script>
