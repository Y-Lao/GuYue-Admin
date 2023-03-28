<template>
	<div class="message">
		<a-popover placement="bottom" trigger="click">
			<a-badge count="5" class="item">
				<i :class="'iconfont icon-xiaoxi'" class="toolBar-icon"></i>
			</a-badge>
			<template #content>
				<p>Content</p>
				<p>Content</p>
			</template>
		</a-popover>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less"></style>
