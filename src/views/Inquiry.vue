<template>
  <v-app>
    <v-sheet width="500" class="ma-auto" rounded="lg">
      <v-form class="pa-6 ma-12" @submit.prevent="inquirySubmit">
        <p>問い合わせ</p>
        <v-text-field v-model="inquiry.lastName" label="性" :rules="requiredRules"></v-text-field>

        <v-text-field v-model="inquiry.firstName" label="名" :rules="requiredRules"></v-text-field>

        <v-text-field v-model="inquiry.email" label="メールアドレス" :rules="emailRules"></v-text-field>

        <v-textarea v-model="inquiry.content" label="問い合わせ内容" :rules="requiredRules"></v-textarea>

        <div class="d-flex flex-column">
          <v-btn type="submit" rounded="lg" color="indigo-darken-1" size="large">
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
import { useRouter } from "vue-router";
const BASE_URL = process.env.VUE_APP_API_BASE_URL
const router = useRouter();

const inquiry = reactive({
  lastName: '',
  firstName: '',
  email: '',
  content: '',
})

const requiredRules = [
  value => !!value || '必須項目です.'
]

const emailRules = [
  (value) => !!value || '必須項目です',
  (value) => /.+@.+\..+/.test(value) || 'メールアドレスの形式で入力してください',
]

function inquirySubmit() {
  //formのバリデーションを確認
  if (inquiry.lastName == "" || inquiry.firstName == "" || inquiry.email == "" || inquiry.content == "") {
    alert("必須項目を入力してください。")
    return
  } else if (inquiry.email.match(/.+@.+\..+/) == null) {
    alert("メールアドレスの形式で入力してください。")
    return
  }

  if (confirm(`この内容で送信しますか？\r\n氏名：${inquiry.lastName + " " + inquiry.firstName}\r\nメールアドレス：${inquiry.email}\r\nメールアドレス：${inquiry.email}\r\n問い合わせ内容：${inquiry.content}`)) {

    axios.post(BASE_URL + "/inquiry", {
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

        router.push('/top')
      }).catch(error => {
        console.log(error)
        alert("送信に失敗しました。\r\n再度お試し頂くか、下記営業時間内にご連絡ください。\r\n営業時間：10:00～18:00\r\n電話番号：03-1234-5678")
      })
  }
}
</script>

<style></style>