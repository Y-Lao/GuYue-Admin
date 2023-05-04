<template>
	<div class="layout-search-modal">
		<i :class="'iconfont icon-sousuo'" class="toolBar-icon" @click="handleOpen" id="searchMenuGuide"></i>
		<a-modal
			v-model:visible="isShowSearch"
			:closable="false"
			:footer="null"
			:bodyStyle="{ padding: 0 }"
			:width="550"
			:cancel="(isOpen = false)"
		>
			<a-auto-complete ref="menuInputRef" style="width: 100%" :options="menuList" :open="isOpen" :filterOption="searchMenuList">
				<template #default>
					<a-input v-model:value="searchMenu" placeholder="菜单搜索 ： 支持菜单名称、路径">
						<template #prefix>
							<i :class="'iconfont icon-sousuo'" class="search-icon"></i>
						</template>
					</a-input>
				</template>
				<template #option="item">
					<div class="search-menu-item" @click="handleClickMenu(item)">
						<component :is="item.meta.icon"></component>
						<span class="search-menu-title">{{ item.meta.title }}</span>
					</div>
				</template>
			</a-auto-complete>
		</a-modal>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
const authStore = useAuthStore();
const router = useRouter();
const menuList = computed(() => authStore.flatMenuListGet.filter(item => !item.meta.isHide));

// 筛选菜单
const searchMenuList = (queryString: string, option: Menu.MenuOptions) => {
	return (
		option.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
		option.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
	);
};

// 打开搜索菜单
const isShowSearch = ref(false);
// 是否展开菜单
const isOpen = ref(false);
const menuInputRef = ref();
const searchMenu = ref("");
const handleOpen = () => {
	isShowSearch.value = true;
	searchMenu.value = "";
	nextTick(() => {
		setTimeout(() => {
			menuInputRef.value.focus();
			isOpen.value = true;
		}, 500);
	});
};

// 点击菜单跳转
const handleClickMenu = (menuItem: Menu.MenuOptions) => {
	console.log("menuItem", menuItem);
	searchMenu.value = "";
	if (menuItem.meta.isLink) window.open(menuItem.meta.isLink, "_blank");
	else router.push(menuItem.path);
	isShowSearch.value = false;
};
</script>

<style scoped lang="less">
.layout-search-modal {
	.search-icon {
		margin-right: 5px;
		font-size: 12px;
	}
	:global(.search-menu-item) {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 0 0 15px;
	}
	:global(.search-menu-item:hover) {
		background-color: #f5f7fa;
	}
	.ant-select-item-option {
		padding: 0;
	}
	:global(.search-menu-title) {
		margin: 0 0 0 10px;
		font-size: 14px;
	}
}
</style>
