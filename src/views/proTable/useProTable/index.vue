<template>
	<div class="table-box">
		<ProTable :request-api="getUserList" :columns="columns">
			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'operation'">
					<span>
						<a>Invite 一 {{ record.name }}</a>
						<a-divider type="vertical" />
						<a>Delete</a>
						<a-divider type="vertical" />
						<a class="ant-dropdown-link">
							More actions
							<down-outlined />
						</a>
					</span>
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
		align: "center"
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
		align: "center",
		width: 100
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
		align: "center"
	},
	{
		title: "操作",
		key: "operation",
		dataIndex: "operation",
		align: "center"
	}
]);
</script>

<style scoped lang="less"></style>
