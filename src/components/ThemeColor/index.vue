<template>
	<div class="color-picker">
		<a-tooltip placement="top" v-for="(color, index) in colors" :key="index" :title="colorNames[index]">
			<div class="color-option" :style="{ backgroundColor: color }" @click="selectColor(index)">
				<SvgIcon v-if="selectedColorIndex === index" class="checkIcon" name="duihao" />
			</div>
		</a-tooltip>
	</div>
</template>

<script setup lang="ts" name="ColorPicker">
import { ref, onMounted } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import { ConfigProvider } from "ant-design-vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

interface ColorPickerProps {
	colors: Array<string>; // 主题色 --> 必传
	colorNames: Array<string>; // 主题色提示语 --> 必传
	defaultColor: string; // 默认颜色 --> 必传
}

const props = withDefaults(defineProps<ColorPickerProps>(), {});
const globalStore = useGlobalStore();

const selectedColorIndex = ref(0);

// 组件挂载
onMounted(() => {
	let index = props.colors.indexOf(props.defaultColor);
	if (index !== -1) selectedColorIndex.value = index;
});

const selectColor = (index: number) => {
	selectedColorIndex.value = index;
	const selectedColor = props.colors[selectedColorIndex.value];
	globalStore.setGlobalState("primary", selectedColor);
	ConfigProvider.config({
		theme: {
			primaryColor: selectedColor
		}
	});
};
</script>

<style scoped lang="less">
.color-picker {
	display: flex;
	flex-wrap: nowrap;
}
.color-option {
	position: relative;
	width: 20px;
	height: 20px;
	margin: 5px;
	cursor: pointer;
}
.checkIcon {
	position: absolute;
	top: 50%;
	left: 50%;
	font-size: 20px;
	color: white;
	transform: translate(-50%, -50%);
}
</style>
