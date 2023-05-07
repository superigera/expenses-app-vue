<template>
  <v-app>
    <HeaderMenu />
    <v-sheet width="400" class="mx-auto">
      <v-form ref="form" id="padding">
        <p>新規会員登録</p>
        <v-text-field v-model="signupInfo.lastName" :counter="10" label="性"></v-text-field>

        <v-text-field v-model="signupInfo.firstName" :counter="10" label="名"></v-text-field>

        <v-text-field v-model="signupInfo.email" :counter="10" label="メールアドレス"></v-text-field>

        <v-text-field v-model="signupInfo.password" :counter="10" label="パスワード"></v-text-field>

        <v-text-field v-model="signupInfo.confirmPassword" :counter="10" label="パスワード確認"></v-text-field>

        <div class="d-flex flex-column">
          <v-btn rounded="lg" color="indigo-darken-1" size="large" @click="submit">
            送信
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-app>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios';

const signupInfo = reactive({
  lastName: '',
  firstName: '',
  email: '',
  password: '',
})


function submit() {
  if (confirm(`この内容で送信しますか？\r\n氏名：${signupInfo.lastName + " " + signupInfo.firstName}\r\nメールアドレス：${signupInfo.email}\r\nメールアドレス：${signupInfo.email}\r\nパスワード：${signupInfo.password}`)) {

    axios.post("http://localhost:8080/signup", {
      "lastName": signupInfo.lastName,
      "firstName": signupInfo.firstName,
      "email": signupInfo.email,
      "password": signupInfo.password
    }
      , { headers: { "Content-Type": "application/json" } }
    )
  }
}
</script>

<style>
#padding {
  padding-top: 180px;
}
</style>