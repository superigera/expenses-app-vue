<template>
  <v-app>
    <v-sheet width="500" class="ma-auto" rounded="lg">
      <v-form class="pa-6 ma-12">
        <p>問い合わせ</p>
        <v-text-field v-model="inquiry.lastName" :counter="10" label="性"></v-text-field>

        <v-text-field v-model="inquiry.firstName" :counter="10" label="名"></v-text-field>

        <v-text-field v-model="inquiry.email" label="メールアドレス"></v-text-field>

        <v-textarea v-model="inquiry.content" :counter="10" label="問い合わせ内容"></v-textarea>

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

const inquiry = reactive({
  lastName: '',
  firstName: '',
  email: '',
  content: '',
})


function submit() {
  if (confirm(`この内容で送信しますか？\r\n氏名：${inquiry.lastName + " " + inquiry.firstName}\r\nメールアドレス：${inquiry.email}\r\nメールアドレス：${inquiry.email}\r\n問い合わせ内容：${inquiry.content}`)) {

    axios.post("http://localhost:8080/inquiry", {
      "lastName": inquiry.lastName,
      "firstName": inquiry.firstName,
      "email": inquiry.email,
      "content": inquiry.content
    }
      , { headers: { "Content-Type": "application/json" } }
    )
      .then(response => {
        console.log(response.data)
        alert("送信しました。\r\n問い合わせ内容についてはメールをご確認ください。\r\n3営業日以内に返信致しますので、今暫くお待ちください。")
      })
  }
}
</script>

<style></style>