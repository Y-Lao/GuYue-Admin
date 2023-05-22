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
		</a-table>
		<!-- 分页组件 -->
		<Pagination :pageabale="pageable" :handle-page-and-page-size="handlePageAndPageSize" />
	</div>
</template>

<script setup lang="tsx" name="ProTable">
import { ref, onMounted } from "vue";
import type { TableProps } from "ant-design-vue";
import { useTable } from "@/hooks/useTable";
import Pagination from "./components/Pagination.vue";
import type { TableColumnsType } from "ant-design-vue";
import { getTableScroll } from "@/utils/table";

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
const columns = ref<TableColumnsType>([
	{
		title: "用户姓名",
		dataIndex: "username",
		key: "username"
	},
	{
		title: "性别",
		dataIndex: "gender",
		key: "age"
	},
	{
		title: "年龄",
		dataIndex: ["user", "detail", "age"],
		key: "user.detail.age"
	},
	{
		title: "身份证号",
		key: "idCard",
		dataIndex: "idCard",
		ellipsis: true
	},
	{
		title: "邮箱",
		key: "email",
		dataIndex: "email",
		ellipsis: true
	},
	{
		title: "居住地址",
		key: "address",
		dataIndex: "address"
	},
	{
		title: "用户状态",
		key: "status",
		dataIndex: "status",
		customRender: ({ record }) => {
			return <a-tag color={record.status ? "success" : "error"}>{record.status ? "启用" : "禁用"}</a-tag>;
		}
	},
	{
		title: "创建时间",
		key: "createTime",
		dataIndex: "createTime"
	},
	{
		title: "操作",
		key: "operation",
		dataIndex: "operation"
	}
]);
</script>
