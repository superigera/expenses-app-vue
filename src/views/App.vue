<template>
  <v-layout>
    <HeaderMenu />

    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import HeaderMenu from "@/components/HeaderMenu.vue";
</script>

<style></style>