<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <div>
      <input type="text" id="search" placeholder="O que vocẽ quer ouvir?" @keydown.enter="$router.push({name: '/list', props: true})" />
    </div>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
