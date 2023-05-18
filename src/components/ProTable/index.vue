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
		<!-- <a-table ref="tableRef" v-bind="$attrs" :dataSource="[]" :border="border" :rowKey="rowKey" :pagination="pagination">
        </a-table> -->
	</div>
</template>

<script setup lang="ts" name="ProTable">
// import { computed } from 'vue';
// import type { TableProps } from 'ant-design-vue';

// interface ProTableProps extends Partial<TableProps<any>> {
//     border?: boolean; // 是否带有纵向边框 ---> 非必传(默认值为true)
//     toolButton?: boolean; // 是否显示表格功能按钮 ---> 非必传(默认值为true)
//     rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ---> 非必传(默认值为id)
// }

/* 列表分页 */
// const pagination = computed(() => ({
//     total: total.value,
//     current: current.value,
//     pageSize: pageSize.value,
//     showTotal: total => `总共 ${total} 项`,
//     defaultPageSize: 10,
//     // pageSizeOptions: ['5', '10', '15', '20'], // 可不设置使用默认
//     showSizeChanger: true, // 是否显示pagesize选择
//     showQuickJumper: true, // 是否显示跳转窗
// }));
/* 接受父组件参数，配置默认值 */
// const props = withDefaults(defineProps<ProTableProps>(), {
//     border: true,
//     toolButton: true,
//     rowKey: "id",
// })
</script>
