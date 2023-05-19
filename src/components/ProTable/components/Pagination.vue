<template>
	<div class="antd-custom-pagination">
		<a-pagination
			v-model:current="pageabale.pageNum"
			v-model:pageSize="pageabale.pageSize"
			show-size-changer
			show-quick-jumper
			:page-size-options="pageSizeOptions"
			:total="pageabale.total"
			:show-total="(total: number) => `共 ${total} 条`"
			@change="handlePageAndPageSize"
		/>
	</div>
</template>

<script setup lang="ts" name="pagination">
import { ref } from "vue";

interface Pageable {
	pageNum: number;
	pageSize: number;
	total: number;
}

interface PaginationProps {
	pageabale: Pageable;
	handlePageAndPageSize: (page: number, pageSize: number) => void;
}

const pageSizeOptions = ref<string[]>(["10", "25", "50", "100"]);

defineProps<PaginationProps>();
</script>
