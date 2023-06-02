<template>
	<div class="card content-box">
		<a-alert
			class="mb-20 w-100"
			message="选择器 🍓"
			description="扩展选择器组件，用于各种表单选择器，简化使用，内置缓存，可对相同的数据减少http请求，也可手动刷新数据源"
			type="info"
		/>
		<a-alert
			class="mb-20 w-100"
			message="基础使用"
			description="自动加载数据，首次加载缓存数据，可设置缓存时间，之后同一个KEY不在获取新数据"
			type="info"
		/>
		<div class="w-100">
			<a-space>
				<GRoleSelect ref="RoleSelectRef" v-model:value="roleValue" @change="handleChange" isImmediately />
				<a-button @click="setSelectValue">设置选中值</a-button>
				<a-button @click="getValue">获取选中值</a-button>
				<a-button @click="getDataOrigin">获取数据源</a-button>
				<a-button @click="RoleSelectRef!.refresh()">刷新数据</a-button>
			</a-space>
		</div>
	</div>
</template>

<script setup lang="ts" name="Select">
import { ref } from "vue";
import GRoleSelect from "@/components/GSelect/GRoleSelect.vue";
import { message } from "ant-design-vue";

/* select Value */
const roleValue = ref("3");
/* select组件实例 */
const RoleSelectRef = ref();

const handleChange = (value: string) => {
	message.success(`selected ${value}`);
};
/* 获取数据源 */
const getDataOrigin = () => {
	message.success(`Data: ${JSON.stringify(RoleSelectRef.value!.getData())}`);
};
/* 获取选中值 */
const getValue = () => {
	message.success(`Value: ${roleValue.value}`);
};
/* 设置选中值 */
const setSelectValue = () => {
	roleValue.value = "1";
};
</script>

<style scoped lang="less"></style>
