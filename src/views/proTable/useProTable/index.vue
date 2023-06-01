<template>
	<div class="table-box">
		<ProTable ref="proTable" :request-api="getUserList" :columns="columns" multiple>
			<!-- 表单搜索项 -->
			<template #searchForm="scope">
				<a-col :span="6">
					<a-form-item name="name" label="姓名">
						<a-input placeholder="placeholder" v-model:value="scope.formState['name']"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item name="role" label="角色类型">
						<GRoleSelect v-model:value="scope.formState['role']" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item name="gender" label="性别">
						<a-select v-model:value="scope.formState['gender']">
							<a-select-option :value="1">男</a-select-option>
							<a-select-option :value="2">女</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item name="status" label="用户状态">
						<a-select v-model:value="scope.formState['status']">
							<a-select-option :value="0">禁用</a-select-option>
							<a-select-option :value="1">启用</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="6" v-show="scope.expand">
					<a-form-item name="createTime" label="创建时间">
						<a-range-picker v-model:value="scope.formState['createTime']" value-format="YYYY-MM-DD" />
					</a-form-item>
				</a-col>
			</template>
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
				<a-button type="primary" @click="batchAdd">
					<template #icon>
						<upload-outlined />
					</template>
					批量添加用户
				</a-button>
				<!-- 导出用户数据 -->
				<a-button type="primary" @click="downloadFile">
					<template #icon>
						<download-outlined />
					</template>
					导出用户数据
				</a-button>
				<!-- To 子集详情页面 -->
				<a-button type="primary" @click="toDetail(scope.selectedListIds)"> 用户详情页面 </a-button>
			</template>
			<!-- 表格底部操作按钮 -->
			<template #footer-btn="scope">
				<!-- 批量删除 -->
				<a-button danger @click="batchDelete(scope.selectedListIds)">
					<template #icon>
						<delete-outlined />
					</template>
					批量删除
				</a-button>
				<!-- 分配角色 -->
				<a-button type="primary"> 分配角色 </a-button>
			</template>
			<template #bodyCell="{ column, record }">
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
					<a-button type="link" size="small" @click="resetPass(record)">
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
		<ImportExcel ref="importRef" />
	</div>
</template>

<script setup lang="tsx">
import { ref, createVNode } from "vue";
import { useRouter } from "vue-router";
import { User } from "@/api/interface";
import ProTable from "@/components/ProTable/index.vue";
import type { TableColumnsType } from "ant-design-vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import GRoleSelect from "@/components/GSelect/GRoleSelect.vue";
import { useDownload } from "@/hooks/useDownload";
import { useHandleData } from "@/hooks/useHandleData";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import { Modal, message } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { getUserList, exportUserInfo, BatchAddUser, deleteUser, resetUserPassWord, changeUserStatus } from "@/api/modules/user";

/* 页面按钮权限 -- 按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容 */
const { BUTTONS } = useAuthButtons();
/* 表格列表项 */
const columns = ref<TableColumnsType>([
	{
		title: "#",
		fixed: "left",
		key: "index",
		align: "center"
	},
	{
		title: "用户姓名",
		dataIndex: "username",
		fixed: "left",
		key: "username",
		align: "center"
	},
	{
		title: "角色类型",
		dataIndex: "rolename",
		key: "rolename",
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
			return BUTTONS.value.status ? (
				<a-switch
					v-model:checked={record.status}
					checked-children="启用"
					checkedValue={1}
					un-checked-children="禁用"
					unCheckedValue={0}
					onClick={() => changeStatus(record)}
				/>
			) : (
				<a-tag color={record.status ? "success" : "error"}>{record.status ? "启用" : "禁用"}</a-tag>
			);
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
		fixed: "right",
		width: 320
	}
]);
/* 获取 ProTable 实例，调用其获取刷新数据方法，获取到当前查询参数 */
const proTable = ref();
/* 路由实例 */
const router = useRouter();
/* 跳转详情页 */
const toDetail = (ids: Key[]) => {
	if (ids.length === 0 || ids.length > 1) {
		message.warning("请选择一位用户");
		return;
	}
	router.push(`/proTable/useProTable/detail/${ids[0]}?params=detail-page`);
};
/* 重置用户密码 */
const resetPass = async (params: User.ResUserList) => {
	await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
	proTable.value.getTableList();
};
/* 导出用户列表 */
const downloadFile = () => {
	Modal.confirm({
		title: "温馨提示",
		icon: createVNode(ExclamationCircleOutlined),
		content: "确认导出用户数据?",
		onOk: async () => {
			await useDownload(exportUserInfo, "用户列表", {});
		},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		onCancel() {}
	});
};
/* 批量添加用户 */
const importRef = ref<InstanceType<typeof ImportExcel> | null>(null);
const batchAdd = () => {
	const params = {
		title: "用户",
		tempApi: exportUserInfo,
		importApi: BatchAddUser,
		getTableList: proTable.value.getTableList
	};
	importRef.value?.acceptParams(params);
};
/* 批量删除用户 */
const batchDelete = async (id: Key[]) => {
	await useHandleData(deleteUser, { id }, "删除所选用户信息");
	proTable.value.clearSelection();
	proTable.value.getTableList();
};
/* 切换用户状态 */
const changeStatus = async (row: User.ResUserList) => {
	await useHandleData(changeUserStatus, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.username}】用户状态`);
	proTable.value.getTableList();
};
</script>

<style scoped lang="less"></style>
