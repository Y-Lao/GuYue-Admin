<template>
	<div class="card content-box">
		<a-alert class="w-100 mb-20" message="复制指令🍇🍇🍇🍒🍒🍒" type="info" />
		<div class="box-content">
			<a-input-search placeholder="请输入内容" v-model:value="data" style="width: 500px" class="mb-20">
				<template #enterButton>
					<a-button v-copy="data">复制</a-button>
				</template>
			</a-input-search>
			<a-textarea placeholder="测试粘贴效果" :rows="4" />
		</div>
	</div>
</template>

<script setup lang="ts" name="copyDirect">
import { ref } from "vue";

const data = ref("我是被复制的内容 🍒🍇🍊，2023-4-21 14:02:59");
</script>

<style scoped lang="less"></style>
