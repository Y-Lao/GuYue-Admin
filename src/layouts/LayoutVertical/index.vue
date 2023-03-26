<template>
	<a-layout class="layout">
		<a-layout-sider class="aside">
			<div class="menu" :style="{ width: isCollapse ? '65px' : '200px' }">
				<!-- logo -->
				<div class="logo flx-center">
					<img src="@/assets/images/logo.svg" alt="logo" />
					<span v-show="!isCollapse">GuYue Admin</span>
				</div>
				<!-- 菜单栏 -->
				<div class="scrollbar">
					<a-menu :inline-collapsed="isCollapse">
						<SubMenu :menuList="menuList" />
					</a-menu>
				</div>
			</div>
		</a-layout-sider>
		<a-layout>
			<a-layout-header>Header</a-layout-header>
			<a-layout-content>Content</a-layout-content>
			<a-layout-footer>Footer</a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<script setup lang="ts" name="layoutVertical">
import { computed } from "vue";
// import { useRoute } from "vue-router";
import { GlobalStore } from "@/stores";
import { AuthStore } from "@/stores/modules/auth";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";

// const route = useRoute();
const authStore = AuthStore();
const globalStore = GlobalStore();
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
const menuList = computed(() => authStore.showMenuListGet);
</script>

<style scoped lang="less">
.layout {
	width: 100%;
	min-width: 780px;
	height: 100%;
	.aside {
		width: auto;
		overflow: inherit;
		background-color: #191a20;
		border-right: 1px solid #191a20;
		.menu {
			display: flex;
			flex-direction: column;
			height: 100%;
			transition: all 0.3s ease;
			.logo {
				box-sizing: border-box;
				height: 55px;
				border-bottom: 1px solid #282a35;
				span {
					font-size: 21.5px;
					font-weight: bold;
					color: #dadada;
					white-space: nowrap;
				}
			}
			.scrollbar {
				height: calc(100% - 55px);
				background-color: aquamarine;
			}
		}
	}
}
</style>
