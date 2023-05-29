<template>
	<div class="card table-search">
		<a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="searchParam">
			<a-row :gutter="24">
				<slot name="searchItem" :expand="expand" :formState="searchParam"></slot>
			</a-row>
			<a-row>
				<a-col :span="24" style="text-align: right">
					<!-- 搜索 -->
					<a-button type="primary" @click="search">
						<template #icon>
							<SearchOutlined />
						</template>
						搜索
					</a-button>
					<!-- 重置 -->
					<a-button style="margin: 0 8px" @click="reset">
						<template #icon>
							<rest-outlined />
						</template>
						重置
					</a-button>
					<!-- 展开、合并 -->
					<a-button type="link" @click="expand = !expand">
						<template #icon>
							<component :is="expand ? UpOutlined : DownOutlined"></component>
						</template>
						{{ expand ? "合并" : "展开" }}
					</a-button>
				</a-col>
			</a-row>
		</a-form>
	</div>
</template>

<script setup lang="ts" name="SearchForm">
import { ref, watch } from "vue";
import { UpOutlined, DownOutlined } from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";
/* 接口 */
interface SearchFormProps {
	searchParam?: { [key: string]: any }; // 搜索参数
	search: (params?: any) => void; // 搜索方法
	reset: (params: any) => void; // 重置方法
	getScrollY: () => void; // 获取表格高度
}
/* 默认值 */
const props = withDefaults(defineProps<SearchFormProps>(), {
	searchParam: () => ({})
});
/* 展开、合并 */
const expand = ref(false);
/* 表单实例 */
const formRef = ref<FormInstance>();

watch(
	() => expand.value,
	() => {
		props.getScrollY();
	}
);
</script>

<style scoped lang="less"></style>
