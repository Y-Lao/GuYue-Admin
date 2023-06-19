<template>
	<a-tooltip placement="bottom">
		<template #title>
			<span>{{ value }}</span>
		</template>
		<a-button :type="type" :size="size" :ghost="isGhost" v-copy="value">{{ label }}</a-button>
	</a-tooltip>
</template>

<script setup lang="ts" name="copyOptBtn">
import { toRefs } from "vue";

interface copyOptBtnProps {
	value: string; // 复制的值 --> 必传
	label?: string; // 按钮的label值 --> 非必传，默认值为 -- 复制
	type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default"; // 按钮类型 --> 非必传，默认值为 primary
	size?: "large" | "middle" | "small"; // 按钮类型大小 --> 非必传，默认值为 small
	isGhost?: boolean; // 幽灵属性，使按钮背景透明 --> 非必传，默认值为 true
}
/* Props */
const props = withDefaults(defineProps<copyOptBtnProps>(), {
	label: "复制",
	type: "primary",
	size: "small",
	isGhost: true
});
const { value, label, type, size, isGhost } = toRefs(props);
</script>
