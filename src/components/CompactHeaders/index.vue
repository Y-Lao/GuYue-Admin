<template>
	<a-modal class="table-head-modal" :visible="tableHeadPop" title="列表视图设置" :width="750" @cancel="handleCancel">
		<div></div>
		<template #footer>
			<div class="pop-btn-box">
				<!-- <div class="btn-left">
                    <a-button>全选</a-button>
                    <a-button>全不选</a-button>
                </div> -->
				<div class="btn-right">
					<a-button @click="handleCancel">返回</a-button>
					<a-button type="primary" class="search-btn">确定</a-button>
				</div>
			</div>
		</template>
	</a-modal>
</template>

<script setup lang="ts" name="CompactHeaders">
import { ref } from "vue";

const tableHeadPop = ref(false);
/* 接受父组件参数 */
const acceptParams = () => {
	tableHeadPop.value = true;
};
/* 关闭弹窗 */
const handleCancel = () => {
	tableHeadPop.value = false;
};

defineExpose({
	acceptParams
});
</script>

<style scoped lang="less"></style>
