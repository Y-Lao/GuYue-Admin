<template>
	<a-dropdown :trigger="[trigger]" @visibleChange="PopoverShow">
		<div class="table-filter-title-container">
			<p class="table-filter-title">
				<span class="mr-12">{{ title }}</span>
				<component
					:is="iconUpOrDowm ? UpOutlined : DownOutlined"
					class="title-icon"
					:style="{ color: iconUpOrDowm ? primary : '' }"
				/>
			</p>
		</div>
		<template #overlay>
			<a-menu @click="onClick" v-bind="$attrs">
				<a-menu-item v-for="item in filterOptions" :key="item.value">
					<span>{{ item.label }}</span>
					<span class="select-icon" v-show="checkedValue.includes(item.value)"><check-outlined /></span>
				</a-menu-item>
			</a-menu>
		</template>
	</a-dropdown>
</template>

<script setup lang="ts" name="TableFilter">
import { ref, toRefs, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import { isArray } from "@/utils/is";
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();
const { primary } = storeToRefs(globalStore);
/* 选项 */
type filterOptions = {
	label: string;
	value: string | number | null;
};
/* Props */
type EventType = "click" | "hover" | "contextmenu";
interface TableFilterProps {
	title: string; // 表头标题 ---> 必传
	trigger?: EventType; // 触发下拉的行为 ---> 非必传(默认为click)
	options: Array<filterOptions>; // 下拉框值 ---> 必传
	isMultiple?: boolean; // 是否多选 ---> 非必传(默认为false)
	titleChange?: boolean; // 是否改变标题 ---> 非必传(默认为false)
	emptyValue?: string | number | null; // 全部值 ---> 非必传(默认为null)
}
const props = withDefaults(defineProps<TableFilterProps>(), {
	title: "Table Filter",
	trigger: "click",
	isMultiple: false,
	titleChange: false,
	emptyValue: null
});
const emits = defineEmits<{
	(e: "update:filterValue", value: any): void;
}>();
const { options, isMultiple, emptyValue } = toRefs(props);
const iconUpOrDowm = ref(false);
const title = ref(props.title);
/* 选中值 */
const checkedValue = ref<Array<string | number | null>>([emptyValue.value]);
/* 选项 0ptions */
const filterOptions = computed(() => {
	const data: Array<filterOptions> = [{ label: "全部", value: emptyValue.value }];
	if (isArray(options.value)) {
		return data.concat(options.value);
	} else {
		return null;
	}
});
/* 点击选项 */
const onClick: MenuProps["onClick"] = ({ key }) => {
	iconUpOrDowm.value = false;
	let value: string | number = key;
	if (isMultiple.value && value !== emptyValue.value) {
		let newCheckedValue: Array<string | number | null> = checkedValue.value.filter(item => item !== emptyValue.value);
		if (checkedValue.value.includes(value)) {
			newCheckedValue = checkedValue.value.filter(item => item !== value);
			if (!newCheckedValue.length) {
				checkedValue.value = [emptyValue.value];
			} else {
				checkedValue.value = [...newCheckedValue];
			}
		} else {
			checkedValue.value = [...newCheckedValue, value];
		}
	} else {
		checkedValue.value = [value];
	}
	// 判断是否多选
	if (isMultiple.value) {
		emits("update:filterValue", [...checkedValue.value]);
	} else {
		emits("update:filterValue", checkedValue.value[0]);
	}
};
/* 点击标题 */
const PopoverShow = (value: boolean) => {
	iconUpOrDowm.value = value;
};
/* 改变标题 */
watch(
	() => checkedValue.value,
	() => {
		if (!isMultiple.value) {
			const data = options.value.find(option => option.value === checkedValue.value[0]);
			title.value = data?.label || props.title;
		}
	}
);
</script>

<style scoped lang="less">
.table-filter-title-container {
	display: flex;
	align-items: center;
	justify-content: center;
}
.table-filter-title {
	display: flex;
	align-items: center;
	cursor: pointer;
}
.title-icon {
	font-size: 10px;
	font-weight: bold;
}
.select-icon {
	position: absolute;
	right: 6px;
	bottom: 4px;
	font-size: 14px;
	font-weight: 700;
	color: var(--ant-primary-color);
	pointer-events: none;
}
</style>
