<template>
  <v-app id="back-color">
    <v-carousel>
      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
    </v-carousel>


    <div class="d-flex justify-space-around pt-12">
      <LoginButton />
      <SignupButton />
      <InquiryButton />
    </div>

  </v-app>
</template>

<script setup>
import LoginButton from '@/components/button/LoginButton.vue';
import InquiryButton from '@/components/button/InquiryButton.vue'
import SignupButton from '@/components/button/SignupButton.vue';

</script>

<style scoped>
#back-color {
  background: #E8EAF6;
}
</style>