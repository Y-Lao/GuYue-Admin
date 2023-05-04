<template>
	<a-result status="success" title="操作成功!" sub-title="预计两小时内到账">
		<template #extra>
			<a-descriptions :column="1" class="bill-container w-60 mb-20">
				<a-descriptions-item label="付款账户">{{ payment_account }}</a-descriptions-item>
				<a-descriptions-item label="收款账户">{{ credited_account }}</a-descriptions-item>
				<a-descriptions-item label="收款人姓名">{{ credited_name }}</a-descriptions-item>
				<a-descriptions-item label="转账金额">￥{{ transfer_amount }} 元</a-descriptions-item>
			</a-descriptions>
			<a-button type="primary" @click="props.changeCurrent(0)">再转一笔</a-button>
			<a-button @click="props.prev">查看账单</a-button>
		</template>
	</a-result>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface Steps {
	stepOne: any;
	stepTwo: any;
	stepThree: any;
}
/* 接口 */
interface SubstepProps {
	changeCurrent: (val: number) => void; // 改变当前步骤
	next: (params: object) => void; // 下一步
	prev: () => void; // 上一步
	stepsData: Steps; //分步表单数据
}
/* props */
const props = defineProps<SubstepProps>();
/* stepsData */
const { payment_account, credited_account, credited_name, transfer_amount } = toRefs(props.stepsData.stepOne);
</script>

<style scoped lang="less">
.bill-container {
	padding-top: 10px;
	padding-left: 20px;
	margin: auto;
	background-color: #fafafa;
}
</style>
