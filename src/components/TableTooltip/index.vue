<!-- 
    placement	气泡框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
    overlayClassName	卡片类名
    trigger	触发行为，可选 hover/focus/click/contextmenu
 -->
<template>
	<a-tooltip v-if="isShowTooltip" placement="top" trigger="hover" overlayClassName="table-tooltip" v-model:visible="isShow">
		<template #title>
			<span>{{ content }}</span>
		</template>
		<div class="content" @mouseleave="mouseleave">
			<span ref="contentRef">
				<slot></slot>
			</span>
		</div>
	</a-tooltip>
	<div v-else class="content" @mouseenter="mouseenter">
		<span ref="contentRef">
			<slot></slot>
		</span>
	</div>
</template>

<script setup lang="ts" name="tableTooltip">
import { ref } from "vue";
/* Props接口 */
interface TableTooltipProps {
	content: string;
}
/* 接受父组件参数，配置默认值 */
withDefaults(defineProps<TableTooltipProps>(), {
	content: ""
});

const isShow = ref(true);
/* 内容实例 */
const contentRef = ref();
/* tooltip显隐 */
const isShowTooltip = ref(false);
/* 鼠标移出 */
const mouseleave = () => {
	// isShowTooltip.value = false;
};
/* 鼠标移入 */
const mouseenter = () => {
	// 关键代码逻辑
	const tooltipWidth = contentRef.value.parentNode.offsetWidth;
	const contentWidth = contentRef.value.offsetWidth;
	isShowTooltip.value = tooltipWidth > contentWidth ? false : true;
};
</script>

<style scoped lang="less">
.content {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
