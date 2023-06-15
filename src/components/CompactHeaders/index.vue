<template>
	<a-modal class="table-head-modal" :visible="tableHeadPop" title="列表视图设置" :width="750" @cancel="handleCancel">
		<div class="Custom-list-container">
			<!-- 可选字段 -->
			<div class="left">
				<div class="choosableField">
					<p class="optionalField">
						可选字段
						<span class="amount">{{ columnsAll.length }}</span>
					</p>
				</div>
				<div class="check-all">
					<a-checkbox v-model:checked="state.checkAll" :indeterminate="state.indeterminate" @change="onCheckAllChange">
						全选
					</a-checkbox>
				</div>
				<a-checkbox-group v-model:value="checkedList" @change="onChange">
					<ul class="check-ul">
						<li v-for="(item, index) in columnsAll" :key="index" class="check-li">
							<a-checkbox :value="item.key" @change="getCheckOne" :disabled="item?.disabled ?? false">
								<span class="commonCode">{{ item.title }}</span>
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
						<span class="amount">{{ sort.length }}</span>
					</p>
					<a-button v-show="sort.length" type="link" @click="clearAll">清空</a-button>
				</div>
				<Draggable v-model="sort" item-key="key" :animation="100" :sort="true" class="drag-container">
					<template #item="{ element }">
						<div class="draggable-item-container">
							<div class="drag-item">
								<a-space style="justify-content: space-between; width: 100%">
									<div>
										<a-space>
											<SvgIcon name="move" />
											<span>{{ element.title }}</span>
										</a-space>
									</div>
									<a-button type="text" size="small" @click="sortDeleteOne(element.key)">
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
		<!-- 底部 -->
		<template #footer>
			<a-button @click="handleCancel">返回</a-button>
			<a-button type="primary" class="search-btn" @click="handleOk">保存到本地</a-button>
		</template>
	</a-modal>
</template>

<script setup lang="ts" name="CompactHeaders">
import { onMounted, ref, toRaw, watch, reactive } from "vue";
import type { TableColumnType } from "ant-design-vue";
import { message } from "ant-design-vue";
import { getJsonArrEqual } from "@/utils/table";
import Draggable from "vuedraggable";
import SvgIcon from "@/components/SvgIcon/index.vue";

interface CompactHeadersProps {
	columns: TableColumnType[]; // 必传
}
interface ColumnProps<T = any> extends TableColumnType<T> {
	checked?: boolean;
	disabled?: boolean;
}
declare type Key = string | number;

const props = withDefaults(defineProps<CompactHeadersProps>(), {});

const emits = defineEmits<{
	(e: "update:columns", columns: any): void;
}>();

const checkedList = ref<Key[]>([]);
const columnsAll = ref<ColumnProps[]>([]);
/* 固定列 */
const fixedColumns = reactive<{
	fixedLeft: ColumnProps[];
	fixedRight: ColumnProps[];
}>({
	fixedLeft: [],
	fixedRight: []
});
/* 排序数据 */
const sort = ref<ColumnProps[]>([]);
/* 全选状态与indeterminate状态 */
const state = reactive({
	indeterminate: false,
	checkAll: false
});
/* 自定义列表弹窗状态 */
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
	sort.value = [];
	// 获取相同项
	let newColumns = getJsonArrEqual(toRaw(props.columns), columnsAll.value);
	// 初始化checked属性
	columnsAll.value.forEach(i => {
		i.checked = false;
		// 是否禁用(禁用fixed--> left/right)
		if (i.fixed === "left" || i.fixed === "right") {
			i.disabled = true;
		}
	});
	const keySet = new Set(newColumns.map(i => i.key));
	columnsAll.value.forEach(item => {
		if (keySet.has(item.key)) {
			item.checked = true;
			item.key && checkedList.value.push(item.key);
			// 排序数据(剔除固定列)
			if (!item.disabled) {
				sort.value.push(item);
			}
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
			// 判断是否选中还是取消选中
			if (e.target.checked) {
				// 选中添加一个排序数据
				sort.value.push(item);
			} else {
				let index = sort.value.findIndex(i => i.key === item.key);
				if (index !== -1) sort.value.splice(index, 1);
			}
		}
	});
};
/* 点击全选 */
const onCheckAllChange = (e: any) => {
	sort.value = [];
	// 判断是否全选
	if (e.target.checked) {
		if (columnsAll.value.length) {
			// 防止叠加
			checkedList.value = [];
			columnsAll.value.map(i => {
				i.key && checkedList.value.push(i.key);
				return (i.checked = true);
			});
			// 排序数据为全部
			sort.value = columnsAll.value;
		}
	} else {
		checkedList.value = [];
		columnsAll.value.map(i => {
			return (i.checked = false);
		});
	}
};
/* 清空排序数据 */
const clearAll = () => {
	sort.value = [];
	checkedList.value = [];
};
/* 单个排序数据删除 */
const sortDeleteOne = (key: number | string) => {
	// 删除数据
	const sortIndex = sort.value.findIndex(i => i.key === key);
	if (sortIndex !== -1) sort.value.splice(sortIndex, 1);
	// 删除该key的checkedList
	const checkIndex = checkedList.value.findIndex(i => i === key);
	if (checkIndex !== -1) checkedList.value.splice(checkIndex, 1);
};
/* 获取选中 */
const getValues = (): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		// 必须选择三项或者三项以上
		if (checkedList.value.length >= 3) {
			resolve(sort.value);
		} else {
			message.warning("必须选中三项或者三项以上");
			reject([]);
		}
	});
};
/* 确定 */
const handleOk = async () => {
	let newColumns = await getValues();
	let _totalCols = [...fixedColumns.fixedLeft, ...newColumns, ...fixedColumns.fixedRight];
	if (_totalCols.length) {
		tableHeadPop.value = false;
		emits("update:columns", _totalCols);
	}
};
/* 监听全选按钮 */
watch(
	() => checkedList.value,
	newVal => {
		state.indeterminate = !!newVal.length && newVal.length < columnsAll.value.length;
		state.checkAll = newVal.length === columnsAll.value.length;
	}
);
/* 组件挂载 */
onMounted(() => {
	// 初始化columns与checked属性
	let newColumns = props.columns.map(item => ({ ...item, checked: false }));
	// 过滤掉不需要设置的列
	let filtrationKeys: (string | number)[] = ["index"];
	newColumns = newColumns!.filter(item => !filtrationKeys.includes(item.key!));
	columnsAll.value = newColumns;
	// 筛选固定左右列
	columnsAll.value.forEach(item => {
		if (item.fixed === "left") {
			fixedColumns.fixedLeft.push(item);
		}
		if (item.fixed === "right") {
			fixedColumns.fixedRight.push(item);
		}
	});
});

defineExpose({
	acceptParams
});
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
