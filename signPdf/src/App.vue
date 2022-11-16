<script setup lang="ts">
import Header from './components/Header.vue';


</script>

<template>
  <div>
    <Header />
    <div class="menu">
    </div>
    <router-view />
  </div>
</template>

<style scoped>



body{
   font-family: Arial, Helvetica, sans-serif;
   margin: 0;
}

</style>
