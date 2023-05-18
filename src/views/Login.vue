<template>
  <v-app>
    <v-sheet width="500" class="ma-auto" rounded="lg">
      <v-form class="pa-6 ma-12">
        <p>ログイン</p>

        <v-text-field v-model="login.email" label="メールアドレス"></v-text-field>

        <v-text-field v-model="login.password" label="パスワード"></v-text-field>

        <div class="d-flex flex-column">
          <v-btn rounded="lg" color="indigo-darken-1" size="large" @click="submit">
            ログイン
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-app>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios';

const login = reactive({
  email: '',
  password: '',
})

function submit() {

  axios.post("http://localhost:8080/login", {
    "email": login.email,
    "password": login.password
  }
    , { headers: { "Content-Type": "application/json" } }
  )
    .then(response => {
      console.log(response.data)
      alert("ログインしました")
      //Mypageにpush
    })
    .catch(error => {
      console.log(error)
      alert("ログインに失敗しました")
    })

}
</script>

<style></style>