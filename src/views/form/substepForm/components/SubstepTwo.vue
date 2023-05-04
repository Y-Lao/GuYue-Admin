<template>
	<div class="w-60">
		<a-descriptions :column="1" class="bill-container">
			<a-descriptions-item label="付款账户">{{ payment_account }}</a-descriptions-item>
			<a-descriptions-item label="收款类型">{{ credited_account_type }}</a-descriptions-item>
			<a-descriptions-item label="收款账户">{{ credited_account }}</a-descriptions-item>
			<a-descriptions-item label="收款人姓名">{{ credited_name }}</a-descriptions-item>
			<a-descriptions-item label="转账金额">￥{{ transfer_amount }}</a-descriptions-item>
		</a-descriptions>
		<a-divider />
		<a-form ref="formRef" :model="formState" name="SubstepTwo" @finish="onFinish">
			<!-- 支付密码 -->
			<a-form-item label="支付密码" name="payment_password" :rules="[{ required: true, message: '请输入支付密码' }]" class="w-80">
				<a-input-password v-model:value="formState.payment_password" />
			</a-form-item>
			<!-- 操作 -->
			<a-form-item :wrapper-col="{ span: 8, offset: 3 }">
				<a-button type="primary" @click="onFinish" :loading="loading">提交</a-button>
				<a-button style="margin-left: 10px" @click="props.prev()">上一步</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import type { FormInstance } from "ant-design-vue";
import { message } from "ant-design-vue";

interface Steps {
	stepOne: any;
	stepTwo: any;
	stepThree: any;
}
/* 接口 */
interface SubstepProps {
	next: (params: object) => void; // 下一步
	prev: () => void; // 上一步
	stepsData: Steps; //分步表单数据
}
/* props */
const props = defineProps<SubstepProps>();
/* stepsData */
const { payment_account, credited_account_type, credited_account, credited_name, transfer_amount } = toRefs(
	props.stepsData.stepOne
);
/* 表单实例 */
const formRef = ref<FormInstance>();
/* 表单状态 */
const formState = ref<Record<string, any>>({
	payment_password: "888888"
});
/* 提交状态 */
const loading = ref(false);
/* 提交 */
const onFinish = async () => {
	try {
		const values = await formRef.value!.validateFields();
		loading.value = true;
		setTimeout(() => {
			loading.value = false;
			message.success("转账成功");
			props.next(values);
		}, 2000);
	} catch (errorInfo) {
		message.error("转账失败");
	}
};
</script>

<style scoped lang="less">
.bill-container {
	padding-top: 10px;
	padding-left: 20px;
	background-color: #fafafa;
	border: 1px dashed #e9e9e9;
}
</style>
