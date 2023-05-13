<template>
	<Maximize v-if="maximize" />
	<Tabs v-if="tabs" />
	<a-layout-content>
		<router-view v-slot="{ Component, route }">
			<!-- <transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="keepAliveName"> -->
			<component :is="Component" :key="route.path" v-if="isRouterShow"></component>
			<!-- </keep-alive>
			</transition> -->
		</router-view>
	</a-layout-content>
	<a-layout-footer v-if="footer">
		<Footer />
	</a-layout-footer>
	<!-- 主题设置按钮 -->
	<ThemeButton />
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/modules/global";
// import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import Maximize from "./components/Maximize.vue";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";
import ThemeButton from "@/layouts/components/ThemeButton/index.vue";

const globalStore = useGlobalStore();
const { maximize, tabs, footer } = storeToRefs(globalStore);

// const keepAliveStore = useKeepAliveStore();
// const { keepAliveName } = storeToRefs(keepAliveStore);

// 刷新当前页面
const isRouterShow = computed(() => globalStore.refreshPage);

// 监听当前页面是否最大化，动态添加 class
watch(
	() => maximize.value,
	() => {
		const app = document.getElementById("app") as HTMLElement;
		if (maximize.value) app.classList.add("main-maximize");
		else app.classList.remove("main-maximize");
	},
	{ immediate: true }
);
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
