<template>
	<a-modal class="table-head-modal" :visible="tableHeadPop" title="列表视图设置" :width="750" @cancel="handleCancel">
		<div class="Custom-list-container">
			<!-- 可选字段 -->
			<div class="left">
				<div class="choosableField">
					<p class="optionalField">
						可选字段
						<span class="amount">{{ checkedList.length }}</span>
					</p>
				</div>
				<div class="check-all">
					<a-checkbox> 全选 </a-checkbox>
				</div>
				<a-checkbox-group v-model:value="checkedList" @change="onChange">
					<ul class="check-ul">
						<li v-for="(item, index) in columnsAll" :key="index" class="check-li" :class="{ isChecked: item.checked }">
							<a-checkbox :value="item.key" @change="getCheckOne">
								<span :class="{ checkCode: item.checked }" class="commonCode">{{ item.title }}</span>
							</a-checkbox>
						</li>
					</ul>
				</a-checkbox-group>
			</div>
			<!-- 已选字段 -->
			<div class="right">
				<div class="checkedField">
					<p class="optionalField">
						已选字段
						<span class="amount">{{ columnsAll.length }}</span>
					</p>
					<a-button type="link">清空</a-button>
				</div>
				<Draggable v-model="columnsAll" item-key="key" :animation="100" :sort="true" class="drag-container">
					<template #item="{ element }">
						<div class="draggable-item-container">
							<div class="drag-item">
								<a-space style=" justify-content: space-between;width: 100%">
									<div>
										<a-space>
											<SvgIcon name="move" />
											<span>{{ element.title }}</span>
										</a-space>
									</div>
									<a-button type="text" size="small">
										<template #icon>
											<SvgIcon name="close" />
										</template>
									</a-button>
								</a-space>
							</div>
						</div>
					</template>
				</Draggable>
			</div>
		</div>

		<template #footer>
			<div class="pop-btn-box">
				<div class="btn-left">
					<a-button @click="checkAll">全选</a-button>
					<a-button @click="checkNoAll">全不选</a-button>
				</div>
				<div class="btn-right">
					<a-button @click="handleCancel">返回</a-button>
					<a-button type="primary" class="search-btn" @click="handleOk">确定</a-button>
				</div>
			</div>
		</template>
	</a-modal>
</template>

<script setup lang="ts" name="CompactHeaders">
import { onMounted, ref, toRaw, watch } from "vue";
import type { TableColumnType } from "ant-design-vue";
import { message } from "ant-design-vue";
import { getJsonArrEqual } from "@/utils/table";
import Draggable from "vuedraggable";
import SvgIcon from "@/components/SvgIcon/index.vue";

interface CompactHeadersProps {
	columns: TableColumnType[]; // 必传
}

export interface ColumnProps<T = any> extends TableColumnType<T> {
	checked: boolean;
}
export declare type Key = string | number;

const props = withDefaults(defineProps<CompactHeadersProps>(), {});

const emits = defineEmits<{
	(e: "update:columns", columns: any): void;
}>();

const checkedList = ref<Key[]>([]);
const columnsAll = ref<ColumnProps[]>([]);

const tableHeadPop = ref(false);
/* 接受父组件参数 */
const acceptParams = () => {
	tableHeadPop.value = true;
	setValues();
};
/* 关闭弹窗 */
const handleCancel = () => {
	tableHeadPop.value = false;
};
/* 初始化 */
const setValues = () => {
	checkedList.value = [];
	// 获取相同项
	let newColumns = getJsonArrEqual(toRaw(props.columns), columnsAll.value);
	// 初始化checked属性
	columnsAll.value.forEach(i => {
		i.checked = false;
	});
	const keySet = new Set(newColumns.map(i => i.key));
	columnsAll.value.forEach(item => {
		if (keySet.has(item.key)) {
			item.checked = true;
			item.key && checkedList.value.push(item.key);
		}
	});
};
/* 选中 */
const onChange = (checkedValue: any) => {
	checkedList.value = checkedValue;
};
/* 单个选中 */
const getCheckOne = (e: any) => {
	columnsAll.value.forEach((item, index) => {
		if (item.key === e.target.value) {
			// 根据选中与否赋值
			columnsAll.value[index].checked = e.target.checked;
		}
	});
};
/* 全选 */
const checkAll = () => {
	if (columnsAll.value.length) {
		// 防止叠加
		checkedList.value = [];
		columnsAll.value.map(i => {
			i.key && checkedList.value.push(i.key);
			return (i.checked = true);
		});
	}
};
/* 全不选 */
const checkNoAll = () => {
	checkedList.value = [];
	columnsAll.value.map(i => {
		return (i.checked = false);
	});
};
/* 获取选中 */
const getValues = (): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		// 必须选择三项或者三项以上
		if (checkedList.value.length >= 3) {
			let newColumns: any = [];
			checkedList.value.forEach(item => {
				columnsAll.value.map(i => {
					if (i.dataIndex == item) {
						newColumns.push(i);
					}
				});
			});
			resolve(newColumns);
		} else {
			message.warning("必须选中三项或者三项以上");
			reject([]);
		}
	});
};
/* 确定 */
const handleOk = async () => {
	let newColumns = await getValues();
	console.log("newColumns: ", newColumns);
	if (newColumns.length) {
		tableHeadPop.value = false;
		emits("update:columns", newColumns);
	}
};

watch(
	() => checkedList.value,
	newVal => {
		console.log("新的", newVal);
	}
);
/* 组件挂载 */
onMounted(() => {
	// 初始化columns与checked属性
	let newColumns = props.columns.map(item => ({ ...item, checked: false }));
	columnsAll.value = newColumns;
});

defineExpose({
	acceptParams
});
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
