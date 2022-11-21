<script setup lang="ts">
import Header from './components/Header.vue';
import MainVue from './components/Main.vue';


</script>

<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<style scoped>
.menu{
  @apply
    absolute
    right-0
  ;
}

body{
   font-family: Arial, Helvetica, sans-serif;
   margin: 0;
}

</style>
