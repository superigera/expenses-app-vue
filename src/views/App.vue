<template>
  <v-layout>
    <HeaderMenu />

    <v-main>
      <router-view style="background-color: #B0BEC5;" />
    </v-main>
  </v-layout>
</template>

<script setup>
import HeaderMenu from "@/components/HeaderMenu.vue";
</script>

<style></style>