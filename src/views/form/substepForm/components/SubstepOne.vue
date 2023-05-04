<template>
	<a-form ref="formRef" :model="formState" name="SubstepOne" v-bind="formItemLayout" class="w-60" @finish="onFinish">
		<!-- 付款账户 -->
		<a-form-item name="payment_account" label="付款账户" has-feedback :rules="[{ required: true, message: '请选择付款账户' }]">
			<a-select v-model:value="formState.payment_account" placeholder="请选择付款账户">
				<a-select-option value="laoy0702@163.com">laoy0702@163.com</a-select-option>
				<a-select-option value="986953860@qq.com">986953860@qq.com</a-select-option>
			</a-select>
		</a-form-item>
		<!-- 收款账户 -->
		<a-form-item name="credited_account_type" label="收款账户" :rules="[{ required: true, message: '请选择收款账户' }]">
			<a-input-group compact>
				<a-select v-model:value="formState.credited_account_type" @change="handleAccountType" style="width: 30%">
					<a-select-option value="微信">微信</a-select-option>
					<a-select-option value="支付宝">支付宝</a-select-option>
				</a-select>
				<a-form-item name="credited_account" style="width: 70%; margin-bottom: 0">
					<a-input v-model:value="formState.credited_account" />
				</a-form-item>
			</a-input-group>
		</a-form-item>
		<!-- 收款人姓名 -->
		<a-form-item label="收款人姓名" name="credited_name" :rules="[{ required: true, message: '请输入收款人姓名' }]">
			<a-input v-model:value="formState.credited_name" />
		</a-form-item>
		<!-- 转账金额 -->
		<a-form-item name="transfer_amount" label="转账金额" :rules="[{ required: true, message: '请输入转账金额' }]">
			<a-input prefix="￥" v-model:value="formState.transfer_amount" />
		</a-form-item>
		<!-- 操作 -->
		<a-form-item :wrapper-col="{ span: 14, offset: 6 }">
			<a-button type="primary" @click="onFinish">下一步</a-button>
			<a-button style="margin-left: 10px" @click="() => formRef!.resetFields()">重置</a-button>
		</a-form-item>
	</a-form>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import type { FormInstance } from "ant-design-vue";
import { message } from "ant-design-vue";

/* 接口 */
interface SubstepProps {
	next: (params: object) => void; // 下一步
	prev: () => void; // 上一步
	stepsData: Ref<object>; //分步表单数据
}
/* props */
const props = defineProps<SubstepProps>();
/* 表单实例 */
const formRef = ref<FormInstance>();
/* 表单布局 */
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 }
};
/* 表单状态 */
const formState = ref<Record<string, any>>({
	payment_account: "",
	credited_account_type: "微信",
	credited_account: "136*****130",
	credited_name: "Gu Yue",
	transfer_amount: "2023"
});
/* 切换收款账户 */
const handleAccountType = (value: string) => {
	if (value === "微信") formState.value.credited_account = "136****4130";
	if (value === "支付宝") formState.value.credited_account = "132****7984";
};
/* 下一步 */
const onFinish = async () => {
	try {
		const values = await formRef.value!.validateFields();
		message.success("提交的数据为 : " + JSON.stringify(values));
		props.next(values);
	} catch (errorInfo) {
		message.error("验证失败，请填写完整信息");
	}
};
</script>
