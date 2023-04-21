<template>
	<div class="card content-box">
		<span class="text">防抖指令 🍇🍇🍇🍊🍊🍊</span>
		<a-button type="primary" v-debounce="debounceClick">防抖按钮(0.5秒后执行)</a-button>
	</div>
</template>

<script setup lang="ts" name="debounceDirect">
import { message } from "ant-design-vue";

const debounceClick = () => {
	message.success("我是防抖按钮触发的事件 🍒🍇🍒");
};
</script>

<style scoped lang="less"></style>
