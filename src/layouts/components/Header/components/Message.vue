<template>
	<div class="message">
		<a-popover placement="bottom" trigger="click">
			<a-badge count="5" class="item">
				<i :class="'iconfont icon-xiaoxi'" class="toolBar-icon"></i>
			</a-badge>
			<template #content>
				<a-tabs v-model:activeKey="activeKey">
					<a-tab-pane key="inform" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
					<a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
					<a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
				</a-tabs>
			</template>
		</a-popover>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeKey = ref("1");
</script>

<style scoped lang="less"></style>
