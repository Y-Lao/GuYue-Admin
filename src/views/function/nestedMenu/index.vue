<!-- 右键菜单 -->
<template>
	<div class="card content-box">
		<div class="containter">
			<ContextMenu class="normal-menu" :menu="menu" @select="handleSelect1">
				<p>{{ choose1 }}</p>
			</ContextMenu>
			<ContextMenu class="nested-menu" :menu="menu1" @select="handleSelect2">
				<p style="position: absolute; top: 10px; left: 10px">{{ choose2 }}</p>
				<ContextMenu class="nested-child-menu" :menu="menu2" @select="handleSelect3">
					<p>{{ choose3 }}</p>
				</ContextMenu>
			</ContextMenu>
		</div>
	</div>
</template>

<script setup lang="ts" name="context-menu">
import { ref } from "vue";
import ContextMenu from "./context-menu.vue";

const menu = [
	{
		label: "添加",
		value: "add"
	},
	{
		label: "编辑",
		value: "edit"
	},
	{
		label: "删除",
		value: "delete"
	},
	{
		label: "查看",
		value: "view"
	},
	{
		label: "复制",
		value: "copy"
	}
];
const menu1 = [
	{
		label: "员工",
		value: "employee"
	},
	{
		label: "部门",
		value: "employee"
	},
	{
		label: "角色",
		value: "employee"
	},
	{
		label: "权限",
		value: "jurisdiction"
	},
	{
		label: "菜单",
		value: "menu"
	}
];
const menu2 = [
	{
		label: "菜单1",
		value: "menu1"
	},
	{
		label: "菜单2",
		value: "menu2"
	},
	{
		label: "菜单3",
		value: "menu3"
	},
	{
		label: "菜单4",
		value: "menu4"
	}
];

const choose1 = ref("");
const choose2 = ref("");
const choose3 = ref("");

const handleSelect1 = (val: string) => {
	choose1.value = val;
};
const handleSelect2 = (val: string) => {
	choose2.value = val;
};
const handleSelect3 = (val: string) => {
	choose3.value = val;
};
</script>

<style scoped lang="less">
.containter {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
	.normal-menu {
		width: 600px;
		height: 400px;
		margin-right: 12px;
		background-color: #edd1d8;
	}
	.nested-menu {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600px;
		height: 400px;
		background-color: #f9906f;
		.nested-child-menu {
			width: 400px;
			height: 200px;
			background-color: #ffc773;
		}
	}
}
</style>
