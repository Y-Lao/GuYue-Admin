<template>
	<Tabs v-if="themeConfig.tabs" />
	<a-layout-content>
		<router-view v-slot="{ Component, route }">
			<transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="keepAliveStore.keepAliveName">
					<component :is="Component" :key="route.path" v-if="isRouterShow"></component>
				</keep-alive>
			</transition>
		</router-view>
	</a-layout-content>
	<a-layout-footer v-if="themeConfig.footer">
		<Footer />
	</a-layout-footer>
	<!-- 主题设置按钮 -->
	<ThemeButton />
</template>

<script setup lang="ts">
import { ref, provide, computed } from "vue";
import { GlobalStore } from "@/stores";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";
import ThemeButton from "@/layouts/components/ThemeButton/index.vue";

const globalStore = GlobalStore();
const keepAliveStore = KeepAliveStore();
const themeConfig = computed(() => globalStore.themeConfig);

// 刷新当前页面
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide("refresh", refreshCurrentPage);
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
