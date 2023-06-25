<template>
  <v-app id="back-color">
    <v-carousel>
      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
    </v-carousel>


    <div class="d-flex justify-space-around pt-12">
      <InputHouseholdAccountBookButton />
      <RecordAnalysisButton />
      <InquiryButton />
    </div>

  </v-app>
</template>

<script setup>
import InquiryButton from '@/components/button/InquiryButton.vue'
import InputHouseholdAccountBookButton from '@/components/button/InputHouseholdAccountBookButton.vue';
import RecordAnalysisButton from '@/components/button/RecordAnalysisButton.vue';

</script>

<style></style>