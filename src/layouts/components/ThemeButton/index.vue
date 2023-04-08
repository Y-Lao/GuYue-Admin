<template>
	<a-button shape="circle" class="theme-btn" @click="openThemeDrawer">
		<template #icon>
			<setting-outlined />
		</template>
	</a-button>
</template>

<script setup lang="ts">
import mittBus from "@/utils/mittBus";
const openThemeDrawer = () => {
	mittBus.emit("openThemeDrawer");
};
</script>

<style lang="less">
.theme-btn {
	position: fixed;
	right: 30px;
	bottom: 60px;
	width: 50px;
	height: 50px;
	background-color: #ffffff;
	box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
}
</style>
