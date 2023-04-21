<template>
	<div class="tool-bar-lf">
		<CollapseIcon id="collapseIcon" />
		<Breadcrumb id="breadcrumb" v-if="breadcrumb" />
	</div>
</template>

<script setup lang="ts" name="ToolBarLeft">
import { computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from "./components/Breadcrumb.vue";

const globalStore = useGlobalStore();
const breadcrumb = computed(() => globalStore.breadcrumb);
</script>

<style scoped lang="less">
.tool-bar-lf {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 55px;
	overflow: hidden;
	white-space: nowrap;
}
</style>
