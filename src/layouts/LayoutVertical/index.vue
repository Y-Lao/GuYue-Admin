<template>
	<a-layout class="layout">
		<a-layout-sider v-model:collapsed="isCollapse" class="aside" :trigger="null" collapsible>
			<div class="menu" :style="{ width: isCollapse ? '65px' : '200px' }">
				<!-- logo -->
				<div class="logo flx-center">
					<img src="@/assets/images/logo.svg" alt="logo" />
					<span v-show="!isCollapse">GuYue Admin</span>
				</div>
				<!-- 菜单栏 -->
				<div class="scrollbar">
					<a-menu v-model:selectedKeys="activeMenu" :theme="theme" mode="inline">
						<SubMenu :menuList="menuList" />
					</a-menu>
				</div>
			</div>
		</a-layout-sider>
		<a-layout>
			<a-layout-header class="header">
				<ToolBarLeft />
				<ToolBarRight />
			</a-layout-header>
			<Main />
		</a-layout>
	</a-layout>
</template>

<script setup lang="ts" name="layoutVertical">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { GlobalStore } from "@/stores";
import { AuthStore } from "@/stores/modules/auth";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import Main from "@/layouts/components/Main/index.vue";

const route = useRoute();
const authStore = AuthStore();
const globalStore = GlobalStore();
const activeMenu = computed(() => {
	let key = route.meta.activeMenu ? route.meta.activeMenu : route.path;
	return [key + ""];
});
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
const menuList = computed(() => authStore.showMenuListGet);
const theme = computed(() => {
	return globalStore.themeConfig.styleSetting === "realDark" ? "" : globalStore.themeConfig.styleSetting;
});
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
