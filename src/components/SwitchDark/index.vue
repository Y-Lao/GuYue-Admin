<template>
	<a-switch v-model:checked="checked1" class="switch-dark">
		<template #checkedChildren><SvgIcon name="sunny" /></template>
		<template #unCheckedChildren><SvgIcon name="moon" /></template>
	</a-switch>
</template>

<script setup lang="ts" name="SwitchDark">
import { ref } from "vue";
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
