<template>
	<div class="card content-box">
		<a-alert class="w-100 mb-20" message="防抖指令 🍇🍇🍇🍊🍊🍊" type="info" />
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
