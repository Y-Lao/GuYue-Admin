<template>
	<a-popover v-model:visible="visible" placement="bottom" trigger="click">
		<template #content>
			<!-- 图片 -->
			<a-image-preview-group v-if="props.type === 'image'">
				<a-image v-for="src in srcList" @click="hide" :key="src" :width="80" :height="80" :src="src" />
			</a-image-preview-group>
			<!-- 视频 -->
			<template v-if="props.type === 'video'">
				<video v-for="src in srcList" :key="src" :src="src" controls width="260"></video>
			</template>
		</template>
		<a-tag :color="primary" style="cursor: pointer">查看{{ srcList.length }}个文件</a-tag>
	</a-popover>
</template>

<script setup lang="ts" name="TablePreview">
import { ref, computed, watchEffect } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import { isArray, isString } from "@/utils/is";

/* 接口 */
export interface TablePreviewProps {
	src: string[] | string; // 图片路径 --> 必传
	type?: "image" | "video"; // 展示类型 --> 不必传，默认image
}
/* 主题颜色 */
const globalStore = useGlobalStore();
const primary = computed(() => globalStore.primary);
/* Props */
const props = withDefaults(defineProps<TablePreviewProps>(), {
	type: "image"
});
/* 气泡卡片状态 */
const visible = ref<boolean>(false);
/* 隐藏 */
const hide = () => {
	visible.value = false;
};
/* srcList */
const srcList = ref<string[]>([]);
/* 监听 */
watchEffect(() => {
	if (isArray(props.src)) srcList.value = props.src;
	if (isString(props.src)) srcList.value = [props.src];
});
</script>
