module.exports = {
    extends: [
    'plugin:vue/vue3-recommended',  
    ],
    rules: {
        "vue/multi-word-component-names": "off"
    },
    "globals": {
        "defineProps": "readonly",
        "defineEmits": "readonly",
        "defineExpose": "readonly",
        "withDefaults": "readonly"
    }
}