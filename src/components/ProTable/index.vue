<template>
	<!-- 查询表单 -->
	<SearchForm
		ref="searchForm"
		:getScrollY="getScrollY"
		:search="search"
		:reset="reset"
		:search-param="searchParam"
		v-show="isShowSearch"
	>
		<template #searchItem="scope">
			<slot name="searchForm" :expand="scope.expand" :formState="scope.formState"></slot>
		</template>
	</SearchForm>
	<!-- 表格内容 card -->
	<div class="card table-main">
		<!-- 表格头部 操作按钮 -->
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader" :selectedListIds="selectedListIds" :selectedList="selectedList" :isSelected="isSelected"></slot>
			</div>
			<div class="header-button-ri">
				<slot name="toolButton">
					<!-- 刷新 -->
					<a-button shape="circle" class="tool-btn" @click="getTableList">
						<template #icon>
							<sync-outlined />
						</template>
					</a-button>
					<!-- 打印 -->
					<a-tooltip placement="top">
						<template #title>
							<span>暂不支持表格打印功能</span>
						</template>
						<a-button shape="circle" class="tool-btn">
							<template #icon>
								<printer-outlined />
							</template>
						</a-button>
					</a-tooltip>
					<!-- 表格配置 -->
					<a-button shape="circle" class="tool-btn" @click="openCompactHeaders">
						<template #icon>
							<setting-outlined />
						</template>
					</a-button>
					<!-- 搜索栏显隐 -->
					<a-button shape="circle" class="tool-btn" @click="isShowSearch = !isShowSearch">
						<template #icon>
							<SearchOutlined />
						</template>
					</a-button>
				</slot>
			</div>
		</div>
		<!-- 表格主体 -->
		<a-table
			ref="tableRef"
			:loading="isLoading"
			:columns="tableColumns"
			v-bind="$attrs"
			:dataSource="data ?? tableData"
			:bordered="border"
			:rowKey="rowKey"
			:row-selection="multiple ? rowSelection : false"
			:pagination="false"
			:scroll="{ x: 2000, y: scrollY }"
			@resizeColumn="handleResizeColumn"
		>
			<!-- 个性化头部单元格 -->
			<template #headerCell="{ title, column }">
				<slot name="headerCell" :title="title" :column="column"></slot>
			</template>
			<!-- 个性化单元格 -->
			<template #bodyCell="{ text, record, index, column }">
				<slot name="bodyCell" :text="text" :record="record" :index="index" :column="column"></slot>
				<template v-if="column.ellipsis">
					<a-tooltip placement="top">
						<template #title>
							<span>{{ text }}</span>
						</template>
						<span>{{ text }}</span>
					</a-tooltip>
					<!-- <TableTooltip :content="text">{{ text }}</TableTooltip> -->
				</template>
				<!-- 序号 -->
				<template v-if="column.key === 'index'">
					<span>{{ parseInt(index) + 1 }}</span>
				</template>
			</template>
			<!-- 额外的展开行 -->
			<template #expandedRowRender="scope">
				<slot name="expandedRowRender" v-bind="scope"></slot>
			</template>
			<!-- 总结栏 -->
			<!-- <template #summary>
				<slot name="summary"></slot>
			</template> -->
			<!-- 无数据 -->
			<template #emptyText>
				<div class="table-empty" :style="{ height: noDataHeight }">
					<slot name="emptyText">
						<div class="notData-container">
							<img src="@/assets/images/emptyData.png" alt="notData" />
							<div class="notice">暂无数据</div>
						</div>
					</slot>
				</div>
			</template>
			<!-- antd vue table 插槽 -->
			<!-- <template v-for="slot in Object.keys($slots)" #[slot]="scope">
				<slot :name="slot" v-bind="scope"></slot>
			</template> -->
		</a-table>
		<!-- 分页组件 -->
		<Pagination :pageabale="pageable" :handle-page-and-page-size="handlePageAndPageSize" />
		<!-- 底部操作按钮 -->
		<transition appear name="fade-transform" mode="out-in">
			<div class="footer-slot-wrapper" v-show="selectedList.length">
				<a-space>
					<a-checkbox v-model:checked="state.checkAll" @change="onCheckAllChange" :indeterminate="state.indeterminate">
						已选择
						<span class="footer-selected-count">{{ selectedList.length }}</span>
						项
					</a-checkbox>
					<!-- 按钮插槽 -->
					<slot name="footer-btn" :selectedListIds="selectedListIds" :selectedList="selectedList" :isSelected="isSelected"></slot>
				</a-space>
			</div>
		</transition>
		<!-- 列表设置 -->
		<CompactHeaders ref="CompactHeadersRef" :table-key="props.tableKey" v-model:columns="tableColumns" />
	</div>
</template>

<script setup lang="tsx" name="ProTable">
import { ref, reactive, onMounted, nextTick, watch } from "vue";
import type { TableColumnType } from "ant-design-vue";
import { Table } from "ant-design-vue";
import { useTable } from "@/hooks/useTable";
import { useSelection } from "@/hooks/useSelection";
import Pagination from "./components/Pagination.vue";
import SearchForm from "@/components/SearchForm/index.vue";
import { getTableScroll } from "@/utils/table";
import CompactHeaders from "@/components/CompactHeaders/index.vue";
// import TableTooltip from "@/components/TableTooltip/index.vue";
import { createCacheStorage } from "@/utils/cache/storageCache";
import { StorageType } from "@/enums/cache";
import { isArray } from "@/utils/is";

interface ProTableProps {
	columns: TableColumnType[];
	tableKey: string; // table 唯一标识，缓存自定义列使用 --> 必传
	data?: any[]; // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ---> 非必传
	requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ---> 非必传
	requestAuto?: boolean; // 是否自动执行请求 api ---> 非必传（默认为true）
	requestError?: (params: any) => void; // 表格 api 请求错误监听 ---> 非必传
	dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ---> 非必传
	isPagination?: boolean; // 是否需要分页组件 ---> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ---> 非必传（默认为{}）
	multiple?: boolean; //表格是否多选 ---> 非必传(默认为false)
	border?: boolean; // 是否带有纵向边框 ---> 非必传(默认值为true)
	toolButton?: boolean; // 是否显示表格功能按钮 ---> 非必传(默认值为true)
	rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ---> 非必传(默认值为id)
	isSummary?: boolean; // 表格总结栏，用来优化 Table 滚动条的渲染 ---> 非必传(默认值为false)
}
/* 接受父组件参数，配置默认值 */
const props = withDefaults(defineProps<ProTableProps>(), {
	requestAuto: true,
	isPagination: true,
	initParam: {},
	multiple: false,
	border: true,
	toolButton: true,
	rowKey: "id",
	isSummary: false
});
/* 是否显示搜索模块 */
const isShowSearch = ref(true);
/* 表格 DOM 元素 */
const tableRef = ref();
/* 底部全选按钮状态 */
const state = reactive({
	indeterminate: false,
	checkAll: false
});
/* 底部全选 */
const onCheckAllChange = (e: any) => {
	if (e.target.checked) selectionChange(tableData.value);
	else selectionChange([]);
};
/* 表格多选 Hooks */
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);
/* 表格操作 Hooks */
const { tableData, isLoading, searchParam, pageable, getTableList, search, reset, handlePageAndPageSize } = useTable(
	props.requestApi,
	props.initParam,
	props.isPagination,
	props.dataCallback,
	props.requestError
);
/* 表格选择操作 */
const rowSelection = {
	selectedRowKeys: selectedListIds,
	onChange: (selectedRowKeys: Key[], selectedRows: DefaultRecordType[]) => {
		// 表格行选中操作
		selectionChange(selectedRows);
	},
	selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
};
/* 清空选中数据列表 */
const clearSelection = () => selectionChange([]);
/* 接受 columns 并设置为响应式 */
const tableColumns = ref<TableColumnType[]>(props.columns);
/* 搜索表单实例 */
const scrollY = ref("0");
const searchForm = ref();
/* 空状态高度 */
const noDataHeight = ref("0");
/* 获取table scrollY */
const getScrollY = () => {
	nextTick(() => {
		let scrol_Y = getTableScroll({ isSummary: props.isSummary });
		let height = getTableScroll({ extraHeight: 108 });
		scrollY.value = scrol_Y;
		noDataHeight.value = height;
	});
};
/* 可伸缩列，伸缩距离(100 - 400) --> 单页数据量大，拖拽表头与表体不同步（待优化） */
const handleResizeColumn = (w: string | number, col: TableColumnType) => {
	if (100 > Number(w) || Number(w) > 400) return;
	if (col.width) col.width = w;
};
/* 打开列表设置 */
const CompactHeadersRef = ref<InstanceType<typeof CompactHeaders> | null>(null);
const openCompactHeaders = () => {
	CompactHeadersRef.value?.acceptParams();
};
/* 自定义列缓存 */
const storageConfig = {
	key: "sortTable-" + props.tableKey,
	type: StorageType.LOCAL,
	hasEncrypt: false
};
const sortStorage = createCacheStorage(storageConfig);
/* 初始化请求 */
onMounted(() => {
	props.requestAuto && getTableList();
	scrollY.value = getTableScroll({ isSummary: props.isSummary });
	noDataHeight.value = getTableScroll({ extraHeight: 108 });
	// 判断是否存在自定义列缓存
	let _cache = sortStorage.get();
	if (_cache && isArray(_cache)) {
		let newColumns: TableColumnType[] = [];
		_cache.forEach(item => {
			tableColumns.value.forEach(column => {
				if (item === column.key) {
					newColumns.push(column);
				}
			});
		});
		tableColumns.value = [...newColumns];
	}
});
/* 监听搜索栏显隐 */
watch(
	() => isShowSearch.value,
	() => {
		getScrollY();
	}
);
/* 监听 selectedList */
watch(
	() => selectedList.value,
	newVal => {
		state.indeterminate = !!newVal.length && newVal.length < tableData.value.length;
		state.checkAll = newVal.length === tableData.value.length;
	}
);
/* 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去) */
defineExpose({
	tableData,
	searchParam,
	pageable,
	getTableList,
	reset,
	isSelected,
	selectedList,
	selectedListIds,
	clearSelection
});
</script>

<style scoped lang="less">
.notData-container {
	box-sizing: border-box;
	width: 100%;
	padding: 70px;
	text-align: center;
	img {
		height: 210px;
	}
	.notice {
		font-size: 16px;
		line-height: 29px;
		color: #333333;
	}
}
.footer-slot-wrapper {
	position: absolute;
	bottom: 15px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	width: calc(100% - 30px);
	height: 32px;
	background: #ffffff;
	.footer-selected-count {
		font-weight: 600;
		color: @primary-color;
	}
}
:deep(.ant-table-summary) {
	height: 48px;
}
</style>
