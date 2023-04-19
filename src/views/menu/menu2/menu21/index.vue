<template>
	<div class="card content-box">
		<span class="text">我是menu2-1 🍓🍇🍈🍉</span>
		<a-input v-model:value="value" placeholder="测试缓存"></a-input>
	</div>
</template>

<script setup lang="ts" name="menu21">
import { ref } from "vue";
const value = ref<string>("");
</script>

<style scoped lang="less"></style>
