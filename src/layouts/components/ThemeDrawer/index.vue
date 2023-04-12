<template>
	<a-drawer v-model:visible="drawerVisible" title="布局设置" placement="right" width="300" :bodyStyle="{ paddingTop: 0 }">
		<!-- 风格设置 -->
		<a-divider
			><a-space><fire-outlined />风格设置</a-space></a-divider
		>
		<div class="setting-drawer-block-checbox style-setting">
			<a-tooltip :mouseEnterDelay="0.3">
				<template #title> 亮色主题风格 </template>
				<div class="ant-gw-checkbox-item ant-gw-checkbox-item-light" @click="changeTheme('light')">
					<div class="inner"></div>
					<span class="anticon anticon-check select-icon" v-show="themeConfig.styleSetting == 'light'">
						<check-outlined />
					</span>
				</div>
			</a-tooltip>
			<a-tooltip :mouseEnterDelay="0.3">
				<template #title> 暗色主题风格 </template>
				<div class="ant-gw-checkbox-item ant-gw-checkbox-item-dark" @click="changeTheme('dark')">
					<div class="inner"></div>
					<span class="anticon anticon-check select-icon" v-show="themeConfig.styleSetting == 'dark'">
						<check-outlined />
					</span>
				</div>
			</a-tooltip>
			<a-tooltip :mouseEnterDelay="0.3">
				<template #title> 暗黑模式 </template>
				<div class="ant-gw-checkbox-item ant-gw-checkbox-item-realDark" @click="changeTheme('realDark')">
					<div class="inner"></div>
					<span class="anticon anticon-check select-icon" v-show="themeConfig.styleSetting == 'realDark'">
						<check-outlined />
					</span>
				</div>
			</a-tooltip>
		</div>
		<!-- 布局切换 -->
		<a-divider
			><a-space><qrcode-outlined />布局切换</a-space></a-divider
		>
		<div class="setting-drawer-block-checbox layout-checbox">
			<a-tooltip :mouseEnterDelay="0.3">
				<template #title> 侧边菜单布局 </template>
				<div class="ant-gw-checkbox-item ant-gw-checkbox-item-side" @click="changeLayout('vertical')">
					<div class="inner"></div>
					<span class="anticon anticon-check select-icon" v-show="themeConfig.layout == 'vertical'">
						<check-outlined />
					</span>
				</div>
			</a-tooltip>
			<a-tooltip :mouseEnterDelay="0.3">
				<template #title> 顶部菜单布局 </template>
				<div class="ant-gw-checkbox-item ant-gw-checkbox-item-top" @click="changeLayout('classic')">
					<div class="inner"></div>
					<span class="anticon anticon-check select-icon" v-show="themeConfig.layout == 'classic'">
						<check-outlined />
					</span>
				</div>
			</a-tooltip>
			<a-tooltip :mouseEnterDelay="0.3">
				<template #title> 混合布局 </template>
				<div class="ant-gw-checkbox-item ant-gw-checkbox-item-mix" @click="changeLayout('transverse')">
					<div class="inner"></div>
					<span class="anticon anticon-check select-icon" v-show="themeConfig.layout == 'transverse'">
						<check-outlined />
					</span>
				</div>
			</a-tooltip>
			<a-tooltip :mouseEnterDelay="0.3">
				<template #title> 左侧混合布局 </template>
				<div class="ant-gw-checkbox-item ant-gw-checkbox-item-left" @click="changeLayout('columns')">
					<div class="inner"></div>
					<span class="anticon anticon-check select-icon" v-show="themeConfig.layout == 'columns'">
						<check-outlined />
					</span>
				</div>
			</a-tooltip>
		</div>
		<!-- 全局主题 -->
		<a-divider
			><a-space> <SvgIcon name="cold-drink" />全局主题 </a-space></a-divider
		>
		<div class="theme-item-vertical">
			<h3 class="ant-gw-setting-drawer-title">主题颜色</h3>
			<ThemeColor :colors="colors" :colorNames="colorNames" :defaultColor="themeConfig.primary" />
		</div>
		<div class="theme-item-Horizontal">
			<span>灰色模式</span>
			<a-switch v-model:checked="themeConfig.isGrey" size="small" class="switch-btn" @change="changeGreyOrWeak($event, 'grey')" />
		</div>
		<div class="theme-item-Horizontal">
			<span>色弱模式</span>
			<a-switch v-model:checked="themeConfig.isWeak" size="small" class="switch-btn" @change="changeGreyOrWeak($event, 'weak')" />
		</div>
		<!-- 界面设置 -->
		<a-divider
			><a-space><setting-outlined />界面设置</a-space></a-divider
		>
		<div class="theme-item-Horizontal">
			<span>折叠菜单</span>
			<a-switch v-model:checked="themeConfig.isCollapse" size="small" class="switch-btn" />
		</div>
		<div class="theme-item-Horizontal">
			<span>面包屑</span>
			<a-switch v-model:checked="themeConfig.breadcrumb" size="small" class="switch-btn" />
		</div>
		<div class="theme-item-Horizontal">
			<span>面包屑图标</span>
			<a-switch v-model:checked="themeConfig.breadcrumbIcon" size="small" class="switch-btn" />
		</div>
		<div class="theme-item-Horizontal">
			<span>标签栏</span>
			<a-switch v-model:checked="themeConfig.tabs" size="small" class="switch-btn" />
		</div>
		<div class="theme-item-Horizontal">
			<span>标签栏图标</span>
			<a-switch v-model:checked="themeConfig.tabsIcon" size="small" class="switch-btn" />
		</div>
		<div class="theme-item-Horizontal">
			<span>页脚</span>
			<a-switch v-model:checked="themeConfig.footer" size="small" class="switch-btn" />
		</div>
	</a-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import mittBus from "@/utils/mittBus";
import { useTheme } from "@/hooks/useTheme";
import { GlobalStore } from "@/stores";
import { LayoutType, StyleType } from "@/stores/interface";
import { DEFAULT_PRIMARY } from "@/config/config";
import ThemeColor from "@/components/ThemeColor/index.vue";

const { changeGreyOrWeak } = useTheme();

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

const colors = ref([DEFAULT_PRIMARY, "#F5222D", "#FA541C", "#FAAD14", "#13C2C2", "#52C41A", "#1890FF", "#722ED1"]);
const colorNames = ref(["极客蓝(默认)", "薄暮", "火山", "日暮", "明青", "极光绿", "拂晓蓝", "酱紫"]);

// 切换主题
const changeTheme = (val: StyleType) => {
	globalStore.setThemeConfig({ ...themeConfig.value, styleSetting: val });
};
// 切换布局方式
const changeLayout = (val: LayoutType) => {
	globalStore.setThemeConfig({ ...themeConfig.value, layout: val });
};

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
	() => themeConfig.value.layout,
	() => {
		const body = document.body as HTMLElement;
		body.setAttribute("class", themeConfig.value.layout);
	},
	{ immediate: true }
);

// 打开主题设置
const drawerVisible = ref(false);
mittBus.on("openThemeDrawer", () => (drawerVisible.value = true));
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
