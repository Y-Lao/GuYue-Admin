<template>
	<a-drawer v-model:visible="drawerVisible" title="布局设置" placement="right" width="300" :bodyStyle="{ paddingTop: 0 }">
		<!-- 布局切换 -->
		<a-divider
			><a-space><qrcode-outlined />布局切换</a-space></a-divider
		>
		<div class="setting-drawer-block-checbox">
			<a-tooltip>
				<template #title> 侧边菜单布局 </template>
				<div class="ant-gw-checkbox-item ant-gw-checkbox-item-side">
					<div class="inner"></div>
					<span class="anticon anticon-check select-icon">
						<check-outlined />
					</span>
				</div>
			</a-tooltip>
			<a-tooltip>
				<template #title> 顶部菜单布局 </template>
				<div class="ant-gw-checkbox-item ant-gw-checkbox-item-top">
					<div class="inner"></div>
					<span class="anticon anticon-check select-icon">
						<check-outlined />
					</span>
				</div>
			</a-tooltip>
			<a-tooltip>
				<template #title> 混合布局 </template>
				<div class="ant-gw-checkbox-item ant-gw-checkbox-item-mix">
					<div class="inner"></div>
					<span class="anticon anticon-check select-icon">
						<check-outlined />
					</span>
				</div>
			</a-tooltip>
			<a-tooltip>
				<template #title> 左侧混合布局 </template>
				<div class="ant-gw-checkbox-item ant-gw-checkbox-item-left">
					<div class="inner"></div>
					<span class="anticon anticon-check select-icon">
						<check-outlined />
					</span>
				</div>
			</a-tooltip>
		</div>
		<!-- 全局主题 -->
		<a-divider
			><a-space> <SvgIcon name="cold-drink" />全局主题 </a-space></a-divider
		>
		<div class="theme-item">
			<span>主题色</span>
			<ThemeColor :colors="colors" :colorNames="colorNames" />
		</div>
		<!-- 界面设置 -->
		<a-divider
			><a-space><setting-outlined />界面设置</a-space></a-divider
		>
	</a-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import mittBus from "@/utils/mittBus";
import { DEFAULT_PRIMARY } from "@/config/config";
import ThemeColor from "@/components/ThemeColor/index.vue";

const colors = ref([DEFAULT_PRIMARY, "#F5222D", "#FA541C", "#FAAD14", "#13C2C2", "#52C41A", "#1890FF", "#722ED1"]);
const colorNames = ref(["极客蓝(默认)", "薄暮", "火山", "日暮", "明青", "极光绿", "拂晓蓝", "酱紫"]);

// 打开主题设置
const drawerVisible = ref(false);
mittBus.on("openThemeDrawer", () => (drawerVisible.value = true));
</script>

<style scoped lang="less">
@import url("./index.less");
.setting-drawer-block-checbox {
	display: flex;
	.ant-gw-checkbox-item {
		position: relative;
		width: 44px;
		height: 36px;
		margin-right: 16px;
		overflow: hidden;
		cursor: pointer;
		background-color: #f0f2f5;
		border-radius: 4px;
		box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 33%;
			height: 100%;
			content: "";
			background-color: #ffffff;
		}
		&::after {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 25%;
			content: "";
			background-color: #ffffff;
		}
		.select-icon {
			position: absolute;
			right: 6px;
			bottom: 4px;
			font-size: 14px;
			font-weight: 700;
			color: var(--ant-primary-color);
			pointer-events: none;
		}
	}
	.ant-gw-checkbox-item-side {
		&::before {
			z-index: 1;
			content: "";
			background-color: #001529;
		}
		.inner {
			display: none;
		}
	}
	.ant-gw-checkbox-item-top {
		&::before {
			background-color: #f0f2f5;
		}
		&::after {
			background-color: #001529;
		}
		.inner {
			display: none;
		}
	}
	.ant-gw-checkbox-item-mix {
		&::before {
			content: " ";
			background-color: #ffffff;
		}
		&::after {
			background-color: #001529;
		}
		.inner {
			display: none;
		}
	}
	.ant-gw-checkbox-item-left {
		&::before {
			z-index: 1;
			width: 16%;
			content: "";
			background-color: #001529;
		}
		.inner {
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: 33%;
			height: 100%;
			content: "";
			background-color: #ffffff;
		}
	}
}
</style>
