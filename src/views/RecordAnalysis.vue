<template>
  <p>RecordAnalysis</p>
  <!-- 家計簿入力欄 -->
  <HouseholdAccountBook />

  <!-- 最近の記録欄 -->
  <RecentRecord />

</template>

<script setup>
import HouseholdAccountBook from '@/components/HouseholdAccountBook.vue';
import RecentRecord from '@/components/RecentRecord.vue';
</script>

<style>
</style>