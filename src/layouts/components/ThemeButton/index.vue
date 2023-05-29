<template>
	<a-button class="theme-btn" @click="openThemeDrawer" @mouseover="spin = true" @mouseout="spin = false">
		<template #icon>
			<setting-outlined :spin="spin" style="color: #ffffff" />
		</template>
	</a-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import mittBus from "@/utils/mittBus";

const spin = ref(false);
const openThemeDrawer = () => {
	mittBus.emit("openThemeDrawer");
};
</script>

<style lang="less">
.theme-btn {
	position: fixed;
	top: 50%;
	right: -2px;
	z-index: 200;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	background-color: @primary-color;
	border-radius: 10px 0 0 10px;
	&:hover {
		background-color: var(--ant-primary-color-hover);
	}
}
</style>
