<template>
    <v-app-bar app>
      <v-toolbar-title>家計簿アプリ</v-toolbar-title>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" @click="navigateTo(item.route)">
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';

const drawer = ref(false);

const items = [
  { title: 'TOP', icon: 'mdi-home', route: '/top' },
  { title: '新規会員登録', icon: 'mdi-account', route: '/signup' },
  { title: 'ログイン', icon: 'mdi-login', route: '/login' },
  { title: '問い合わせ', icon: 'mdi-email', route: '/inquiry' },
  { title: 'テスト記録分析', icon: 'mdi-email', route: '/record' },
];

function navigateTo(route) {
  router.push(route)
}

</script>

<style>
</style>