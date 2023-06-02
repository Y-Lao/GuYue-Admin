<template>
	<a-switch v-model:checked="checked1" class="switch-dark" v-bind="$attrs">
		<template #checkedChildren><SvgIcon name="sunny" :iconStyle="{ width: '12px', height: '12px' }" /></template>
		<template #unCheckedChildren><SvgIcon name="moon" :iconStyle="{ width: '12px', height: '12px' }" /></template>
	</a-switch>
</template>

<script setup lang="ts" name="SwitchDark">
import { ref } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

const checked1 = ref(false);
</script>

<style scoped lang="less">
.switch-dark {
	:global(.ant-switch-inner) {
		display: flex;
		align-items: center;
	}
}
</style>
