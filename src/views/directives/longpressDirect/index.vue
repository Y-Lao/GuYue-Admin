<template>
	<div class="card content-box">
		<span class="text">长按指令 🍇🍇🍇🍓🍓🍓</span>
		<a-button type="primary" v-longpress="longpress">长按2秒触发事件</a-button>
	</div>
</template>

<script setup lang="ts" name="longpressDirect">
import { message } from "ant-design-vue";

const longpress = () => {
	message.success("长按事件触发成功 🍒🍒🍒");
};
</script>

<style scoped lang="less"></style>
