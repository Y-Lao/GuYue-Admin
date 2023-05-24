<template>
	<!-- 查询表单 -->
	<!-- 表格内容 card -->
	<div class="card table-main">
		<!-- 表格头部 操作按钮 -->
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader"></slot>
			</div>
			<div class="header-button-ri">
				<a-space>
					<slot name="toolButton">
						<!-- 刷新 -->
						<a-button shape="circle" class="tool-btn">
							<template #icon>
								<sync-outlined />
							</template>
						</a-button>
						<!-- 打印 -->
						<a-button shape="circle" class="tool-btn">
							<template #icon>
								<printer-outlined />
							</template>
						</a-button>
						<!-- 表格配置 -->
						<a-button shape="circle" class="tool-btn">
							<template #icon>
								<setting-outlined />
							</template>
						</a-button>
						<!-- 搜索栏显隐 -->
						<a-button shape="circle" class="tool-btn">
							<template #icon>
								<SearchOutlined />
							</template>
						</a-button>
					</slot>
				</a-space>
			</div>
		</div>
		<!-- 表格主体 -->
		<a-table
			ref="tableRef"
			:columns="columns"
			v-bind="$attrs"
			:dataSource="data ?? tableData"
			:border="border"
			:rowKey="rowKey"
			:pagination="pagination"
			:scroll="{ x: 1500, y: getTableScroll() }"
		>
			<!-- <template v-for="slot in Object.keys($slots)" #[slot]="scope">
				<slot :name="slot" v-bind="scope"></slot>
			</template> -->
			<!-- 个性化头部单元格 -->
			<!-- <template #headerCell="{ title, column }">
				<slot name="headerCell" :title="title" :column="column"></slot>
			</template> -->
			<!-- 个性化单元格 -->
			<template #bodyCell="{ text, record, index, column }">
				<slot name="bodyCell" :text="text" :record="record" :index="index" :column="column"></slot>
				<template v-if="column.ellipsis">
					<!-- <a-tooltip placement="top">
						<template #title>
							<span>{{text}}</span>
						</template>
						<span>{{text}}</span>
					</a-tooltip> -->
					<TableTooltip :content="text">{{ text }}</TableTooltip>
				</template>
			</template>
		</a-table>
		<!-- 分页组件 -->
		<Pagination :pageabale="pageable" :handle-page-and-page-size="handlePageAndPageSize" />
	</div>
</template>

<script setup lang="tsx" name="ProTable">
import { onMounted } from "vue";
import type { TableProps } from "ant-design-vue";
import { useTable } from "@/hooks/useTable";
// import { useSelection } from "@/hooks/useSelection";
import Pagination from "./components/Pagination.vue";
import { getTableScroll } from "@/utils/table";
import TableTooltip from "@/components/TableTooltip/index.vue";

interface ProTableProps extends Partial<TableProps<any>> {
	data?: any[]; // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ---> 非必传
	requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ---> 非必传
	requestAuto?: boolean; // 是否自动执行请求 api ---> 非必传（默认为true）
	requestError?: (params: any) => void; // 表格 api 请求错误监听 ---> 非必传
	dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ---> 非必传
	isPagination?: boolean; // 是否需要分页组件 ---> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ---> 非必传（默认为{}）
	border?: boolean; // 是否带有纵向边框 ---> 非必传(默认值为true)
	toolButton?: boolean; // 是否显示表格功能按钮 ---> 非必传(默认值为true)
	rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ---> 非必传(默认值为id)
}
/* 接受父组件参数，配置默认值 */
const props = withDefaults(defineProps<ProTableProps>(), {
	requestAuto: true,
	isPagination: true,
	initParam: {},
	border: true,
	toolButton: true,
	rowKey: "id"
});
/* 表格多选 Hooks */
// const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);
/* 表格操作 Hooks */
const { tableData, pageable, getTableList, handlePageAndPageSize } = useTable(
	props.requestApi,
	props.initParam,
	props.isPagination,
	props.dataCallback,
	props.requestError
);
/* 初始化请求 */
onMounted(() => props.requestAuto && getTableList());
</script>
