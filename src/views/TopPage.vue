<template>
  <v-app>
    <v-carousel>
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
      ></v-carousel-item>
    </v-carousel>

  </v-app>
  <InquiryButton />
</template>

<script setup>
import InquiryButton from '@/components/button/InquiryButton.vue'
</script>

<style scoped>
.body{
  background-color: aqua;
}
</style>