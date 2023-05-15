<template>
	<div class="card content-box">
		<a-alert class="w-100 mb-20" message="按钮权限 🍇🍒🥭🍏" type="info" />
		<a-alert class="mb-20" :message="`当前用户按钮权限：${JSON.stringify(Object.keys(BUTTONS))}`" type="success" />
		<div class="w-100"><a-divider orientation="left">使用 Hooks 方式绑定权限</a-divider></div>
		<a-space :size="16" class="mb-20">
			<a-button type="primary" v-if="BUTTONS.add">
				<template #icon> <plus-circle-outlined /> </template>新增
			</a-button>
			<a-button v-if="BUTTONS.edit">
				<template #icon> <form-outlined /> </template>编辑
			</a-button>
			<a-button danger v-if="BUTTONS.delete">
				<template #icon> <delete-outlined /> </template>删除
			</a-button>
			<a-button v-if="BUTTONS.import">
				<template #icon> <to-top-outlined /> </template>导入数据
			</a-button>
			<a-button v-if="BUTTONS.export">
				<template #icon> <vertical-align-bottom-outlined /> </template>导出数据
			</a-button>
			<!-- 测试无权限 -->
			<a-button type="primary" v-if="BUTTONS.batchAdd">
				<template #icon> <plus-circle-outlined /> </template>批量添加
			</a-button>
		</a-space>
		<div class="w-100"><a-divider orientation="left">使用 v-auth 指令方式绑定单个权限</a-divider></div>
		<a-space :size="16" class="mb-20">
			<a-button type="primary" v-auth="'add'">
				<template #icon> <plus-circle-outlined /> </template>新增
			</a-button>
			<a-button v-auth="'edit'">
				<template #icon> <form-outlined /> </template>编辑
			</a-button>
			<a-button danger v-auth="'delete'">
				<template #icon> <delete-outlined /> </template>删除
			</a-button>
			<a-button v-auth="'import'">
				<template #icon> <to-top-outlined /> </template>导入数据
			</a-button>
			<a-button v-auth="'export'">
				<template #icon> <vertical-align-bottom-outlined /> </template>导出数据
			</a-button>
			<!-- 测试无权限 -->
			<a-button type="primary" v-auth="'batchAdd'">
				<template #icon> <plus-circle-outlined /> </template>批量添加
			</a-button>
		</a-space>
		<div class="w-100"><a-divider orientation="left">使用 v-auth 指令绑定多个权限</a-divider></div>
		<a-space :size="16" class="mb-20">
			<a-button type="primary" v-auth="['add', 'edit', 'delete', 'import', 'export']">
				<template #icon> <plus-circle-outlined /> </template>新增
			</a-button>
			<a-button v-auth="['add', 'edit', 'delete', 'import', 'export']">
				<template #icon> <form-outlined /> </template>编辑
			</a-button>
			<a-button danger v-auth="['add', 'edit', 'delete', 'import', 'export']">
				<template #icon> <delete-outlined /> </template>删除
			</a-button>
			<a-button v-auth="['add', 'edit', 'delete', 'import', 'export']">
				<template #icon> <to-top-outlined /> </template>导入数据
			</a-button>
			<a-button v-auth="['add', 'edit', 'delete', 'import', 'export']">
				<template #icon> <vertical-align-bottom-outlined /> </template>导出数据
			</a-button>
			<!-- 测试无权限 -->
			<a-button type="primary" v-auth="['add', 'edit', 'delete', 'import', 'export', 'batchAdd']">
				<template #icon> <plus-circle-outlined /> </template>批量添加
			</a-button>
		</a-space>
	</div>
</template>

<script setup lang="ts" name="buttonAuth">
import { useAuthButtons } from "@/hooks/useAuthButtons";

const { BUTTONS } = useAuthButtons();
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
