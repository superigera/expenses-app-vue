<template>
    <router-link :to=to>
        <v-btn rounded="lg" color="indigo-darken-1" size="large">
            {{ label }}
        </v-btn>
    </router-link>
</template>

<script setup>
defineProps(["to","label"]);
</script>

<style scoped>
a {
text-decoration: none;
}
</style>
