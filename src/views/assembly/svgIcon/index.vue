<template>
	<div class="card content-box">
		<GRoleSelect v-model:value="roleValue" @change="handleChange" />
	</div>
</template>

<script setup lang="ts" name="svgIcon">
import { ref } from "vue";
import GRoleSelect from "@/components/GSelect/GRoleSelect.vue";
import { message } from "ant-design-vue";

const roleValue = ref();

const handleChange = (value: string) => {
	message.success(`selected ${value}`);
};
</script>

<style scoped lang="less"></style>
