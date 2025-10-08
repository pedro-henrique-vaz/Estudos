<template>
  <v-container fluid class="pa-4">

    <v-list lines="two" class="bg-transparent pa-0">
      <v-list-item v-for="musicItem in musicTest" class="list-item-spotify my-2 py-2 text-white" rounded="lg" link :active="false">
        <template v-slot:prepend>
          <v-avatar rounded="sm" size="58" class="mr-4" :color="musicItem.color">
            <v-icon v-if="musicItem.icon" :icon="musicItem.icon" color="white" size="30"></v-icon>
          </v-avatar>
        </template>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold text-subtitle-1">
            {{ musicItem.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-white opacity-75">
            {{ musicItem.details }}
            <span v-html="musicItem.emotes"></span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const musicTest = ref([
  {
    title: 'Teste 01',
    details: 'Música',
    color: 'black',
  },
  {
    title: 'Teste 02',
    details: 'Música',
    color: '#343a40'
  },
  {
    title: 'Teste 03',
    details: 'Música',
    color: '#006400'
  },
  {
    title: 'Teste 04',
    details: 'Música',
    color: '#8b0000'
  },
  {
    title: 'Teste 05',
    details: 'Música',
    color: '#6c757d'
  },
  {
    title: 'Teste 06',
    details: 'Música',
    color: '#495057'
  },
  {
    title: 'Teste 07',
    details: 'Música',
    color: '#000080',
  },
  {
    title: 'Teste 08',
    details: 'Música',
    color: '#ff8c00',
  },
]);
</script>
