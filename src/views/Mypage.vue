<template>
  <v-app>
    <v-sheet width="500" class="ma-auto" rounded="lg">
      <v-form class="pa-6 ma-12">
        <p>Mypage</p>

        <!-- readonly -->
        <!-- 編集ボタン押すと変更でき、変更ボタン押下で更新 -->
        <v-text-field v-model="memberInfo.lastName" disabled label="性"></v-text-field>

        <v-text-field v-model="memberInfo.firstName" disabled label="名"></v-text-field>

        <v-text-field v-model="memberInfo.email" disabled label="メールアドレス"></v-text-field>

        <v-text-field v-model="memberInfo.password" disabled label="パスワード"></v-text-field>

        <v-text-field v-model="memberInfo.content" disabled label="過去の問い合わせ内容"></v-text-field>

        <div class="d-flex flex-column">
          <v-btn rounded="lg" color="indigo-darken-1" size="large" @click="submit">
            編集
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-app>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios';

const memberInfo = reactive({
  lastName: '',
  firstName: '',
  email: '',
  password: '',
  content: ''
})

axios.get("http://localhost:8080/member", { headers: { "Content-Type": "application/json" } })
  .then((response) => {
    memberInfo.lastName = response.data.lastName
    memberInfo.firstName = response.data.firstName
    memberInfo.email = response.data.email
    memberInfo.password = response.data.password
    memberInfo.content = response.data.content
  })

function submit() {
  console.log("submit")
}
</script>

<style></style>