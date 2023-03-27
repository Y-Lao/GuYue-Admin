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
					<a-menu :inline-collapsed="isCollapse" mode="inline">
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
// import { useRoute } from "vue-router";
import { GlobalStore } from "@/stores";
import { AuthStore } from "@/stores/modules/auth";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import Main from "@/layouts/components/Main/index.vue";

// const route = useRoute();
const authStore = AuthStore();
const globalStore = GlobalStore();
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
const menuList = computed(() => authStore.showMenuListGet);
</script>

<style scoped lang="less">
.layout {
	width: 100%;
	min-width: 760px;
	height: 100%;
	.aside {
		flex: 0 0 auto !important;
		width: auto !important;
		min-width: 65px !important;
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
	.header {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 55px;
		padding: 0 15px;
		background-color: #ffffff;
		border-bottom: 1px solid #f1f1f1;
		:global(.tool-bar-If) {
			color: #ffffff;
			.a-breadcrumb__inner.is-link {
				color: #e5eaf3;
				&:hover {
					color: #009688;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
