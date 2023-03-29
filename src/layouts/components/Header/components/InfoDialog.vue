<template>
	<a-modal v-model:visible="modelVisible" title="个人信息" width="500px">
		<span>个人信息</span>
		<template #footer>
			<a-button key="back" @click="modelVisible = false">取消</a-button>
			<a-button key="submit" type="primary" @click="modelVisible = false">确认</a-button>
		</template>
	</a-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

const modelVisible = ref(false);

// openModal
const openModal = () => {
	modelVisible.value = true;
};

defineExpose({ openModal });
</script>

<style scoped lang="less"></style>
