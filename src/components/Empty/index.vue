<template>
	<div style="text-align: center" class="empty-wrapper">
		<img :src="EmptySrc" alt="" />
		<p>暂无数据</p>
	</div>
</template>

<script setup lang="ts">
import EmptySrc from "@/assets/images/empty.png";
</script>

<style scoped lang="less">
.empty-wrapper {
	img {
		height: 60px;
	}
	p {
		font-size: 14px;
		color: #666666;
		text-align: center;
	}
}
</style>
