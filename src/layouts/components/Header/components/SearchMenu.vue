<template>
	<div>
		<i :class="'iconfont icon-sousuo'" class="toolBar-icon" @click="handleOpen"></i>
		<a-modal v-model:visible="isShowSearch" :closable="false" :footer="null" :bodyStyle="{ padding: 0 }" :width="550">
			<a-auto-complete
				v-model:value="searchMenu"
				ref="menuInputRef"
				style="width: 100%"
				placeholder="菜单搜索 ： 支持菜单名称、路径"
			/>
		</a-modal>
	</div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

// 打开搜索菜单
const isShowSearch = ref(false);
const menuInputRef = ref();
const searchMenu = ref("");
const handleOpen = () => {
	isShowSearch.value = true;
	searchMenu.value = "";
	nextTick(() => {
		setTimeout(() => {
			menuInputRef.value.focus();
		});
	});
};
</script>

<style scoped lang="less"></style>
