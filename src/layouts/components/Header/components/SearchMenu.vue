<template>
	<div>
		<i :class="'iconfont icon-sousuo'" class="toolBar-icon" @click="handleOpen"></i>
		<a-modal
			v-model:visible="isShowSearch"
			:closable="false"
			:footer="null"
			:bodyStyle="{ padding: 0 }"
			:width="550"
			:cancel="(isOpen = false)"
		>
			<a-auto-complete
				v-model:value="searchMenu"
				ref="menuInputRef"
				style="width: 100%"
				:options="menuList"
				:open="isOpen"
				:filterOption="searchMenuList"
				placeholder="菜单搜索 ： 支持菜单名称、路径"
			>
				<template #option="item">
					<div style="display: flex; justify-content: space-between">
						<div class="item" @click="handleClickMenu(item)">
							<span>{{ item.meta.title }}</span>
						</div>
					</div>
				</template>
			</a-auto-complete>
		</a-modal>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import { AuthStore } from "@/stores/modules/auth";
const authStore = AuthStore();
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
		}, 300);
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
.item {
	width: 100%;
}
</style>
