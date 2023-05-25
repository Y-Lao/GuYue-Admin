<template>
	<div class="table-box">
		<ProTable :request-api="getUserList" :columns="columns" multiple>
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<!-- 新增用户 -->
				<a-button type="primary">
					<template #icon>
						<plus-circle-outlined />
					</template>
					新增用户
				</a-button>
				<!-- 批量添加用户 -->
				<a-button type="primary">
					<template #icon>
						<upload-outlined />
					</template>
					批量添加用户
				</a-button>
				<!-- 导出用户数据 -->
				<a-button type="primary">
					<template #icon>
						<download-outlined />
					</template>
					导出用户数据
				</a-button>
				<!-- To 子集详情页面 -->
				<a-button type="primary"> To 子集详情页面 </a-button>
				<!-- 批量删除用户 -->
				<a-button danger :disabled="!scope.isSelected">
					<template #icon>
						<delete-outlined />
					</template>
					批量删除用户
				</a-button>
			</template>
			<template #bodyCell="{ column }">
				<!-- 表格操作 -->
				<template v-if="column.key === 'operation'">
					<!-- 查看 -->
					<a-button type="link" size="small">
						<template #icon>
							<eye-outlined />
						</template>
						查看
					</a-button>
					<!-- 编辑 -->
					<a-button type="link" size="small">
						<template #icon>
							<form-outlined />
						</template>
						编辑
					</a-button>
					<!-- 重置密码 -->
					<a-button type="link" size="small">
						<template #icon>
							<sync-outlined />
						</template>
						重置密码
					</a-button>
					<!-- 删除 -->
					<a-button type="link" size="small">
						<template #icon>
							<exception-outlined />
						</template>
						删除
					</a-button>
				</template>
			</template>
		</ProTable>
	</div>
</template>

<script setup lang="tsx">
import { ref } from "vue";
import ProTable from "@/components/ProTable/index.vue";
import { getUserList } from "@/api/modules/user";
import type { TableColumnsType } from "ant-design-vue";

const columns = ref<TableColumnsType>([
	{
		title: "用户姓名",
		dataIndex: "username",
		key: "username",
		align: "center"
	},
	{
		title: "性别",
		dataIndex: "gender",
		key: "age",
		align: "center",
		customRender: ({ text }) => {
			return text == 1 ? "男" : "女";
		}
	},
	{
		title: "年龄",
		dataIndex: ["user", "detail", "age"],
		key: "user.detail.age",
		align: "center"
	},
	{
		title: "身份证号",
		key: "idCard",
		dataIndex: "idCard",
		ellipsis: true,
		align: "center"
	},
	{
		title: "邮箱",
		key: "email",
		dataIndex: "email",
		ellipsis: true,
		align: "center"
	},
	{
		title: "居住地址",
		key: "address",
		dataIndex: "address",
		ellipsis: true,
		align: "center"
	},
	{
		title: "用户状态",
		key: "status",
		dataIndex: "status",
		align: "center",
		customRender: ({ record }) => {
			return <a-tag color={record.status ? "success" : "error"}>{record.status ? "启用" : "禁用"}</a-tag>;
		}
	},
	{
		title: "创建时间",
		key: "createTime",
		dataIndex: "createTime",
		ellipsis: true,
		align: "center"
	},
	{
		title: "操作",
		key: "operation",
		dataIndex: "operation",
		align: "center",
		width: 400
	}
]);
</script>

<style scoped lang="less"></style>
