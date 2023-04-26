<template>
	<div class="maximize" @click="exitMaximize">
		<close-outlined class="maximize-icon" />
	</div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();
const exitMaximize = () => {
	globalStore.setGlobalState("maximize", false);
};
</script>

<style scoped lang="less">
.maximize {
	position: fixed;
	top: -25px;
	right: -25px;
	z-index: 999;
	width: 52px;
	height: 52px;
	cursor: pointer;
	background-color: #909399;
	border-radius: 50%;
	opacity: 0.7;
	&:hover {
		background-color: #73767a;
	}
	.maximize-icon {
		position: relative;
		top: 60%;
		left: 32%;
		font-size: 12px;
		color: #ffffff;
		transform: translate(-50%, -50%);
	}
}
</style>
