<template>
	<a-select
		v-bind="$attrs"
		:loading="isLoading"
		:options="roleList"
		allowClear
		@focus="getRoleList"
		placeholder="请选择角色类型"
		class="roleSelect"
	></a-select>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { getRolesListApi } from "@/api/modules/role";
import { createCacheStorage } from "@/utils/cache/storageCache";
import { CacheConfig } from "@/utils/cache/config";
import { message } from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";
import type { Role } from "@/api/interface/index";

/* Props */
const props = withDefaults(
	defineProps<{
		isImmediately?: boolean;
	}>(),
	{
		isImmediately: false
	}
);

/* 是否加载中 */
const isLoading = ref(false);
/* 角色列表 */
const roleList = ref<SelectProps["options"]>([]);
/* 筛选、转化{label: '', value: ''} */
const handleRoleData = (filterData: Role.RoleList[]) => {
	return filterData.map(item => {
		return { label: item.name, value: item.id };
	});
};
/* 获取角色列表 */
const getRoleList = async () => {
	try {
		isLoading.value = true;
		const useRoleList = createCacheStorage(CacheConfig.RoleSelect);
		const oldRoleListData = useRoleList.get();
		if (!oldRoleListData) {
			let { data } = await getRolesListApi();
			if (data && data.length > 0) {
				roleList.value = handleRoleData(data);
				useRoleList.set(data);
			}
		} else {
			roleList.value = handleRoleData(oldRoleListData);
		}
	} catch (error) {
		console.log("error", error);
		message.error("获取角色列表失败");
	} finally {
		isLoading.value = false;
	}
};
/* 刷新数据 */
const refresh = () => {
	const useRoleList = createCacheStorage(CacheConfig.RoleSelect);
	useRoleList.remove();
	getRoleList();
};
/* 获取数据源 */
const getData = () => {
	return roleList.value;
};

watchEffect(() => {
	if (props.isImmediately) {
		getRoleList();
	}
});

defineExpose({
	refresh,
	getData
});
</script>

<style scoped lang="less">
.roleSelect {
	min-width: 200px;
}
</style>
