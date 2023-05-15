<template>
	<div class="card content-box">
		<a-alert class="w-100 mb-20" message="节流指令 🍇🍇🍇🍓🍓🍓" type="info" />
		<a-button type="primary" v-throttle="throttleClick">节流按钮 (每隔1S秒后执行)</a-button>
	</div>
</template>

<script setup lang="ts" name="throttleDirect">
import { message } from "ant-design-vue";

const throttleClick = () => {
	message.success("节流按钮的事件触发成功 🍒🍒🍒");
};
</script>

<style scoped lang="less"></style>
