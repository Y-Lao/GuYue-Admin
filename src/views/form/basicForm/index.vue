<template>
	<div class="card content-box">
		<a-alert
			class="w-100 mb-20"
			message="基础表单 🍓🍓🍓🍇🍇🍇"
			description="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
			type="info"
		/>
		<a-form ref="formRef" :model="formState" v-bind="formItemLayout" :colon="false" :rules="rules" class="w-60">
			<!-- 预约姓名 -->
			<a-form-item label="预约姓名" name="appointment_name">
				<a-input v-model:value="formState.appointment_name" placeholder="请输入姓名" />
			</a-form-item>
			<!-- 预约号码 -->
			<a-form-item label="预约号码" name="appointment_phone">
				<a-input v-model:value="formState.appointment_phone" placeholder="电话号码" />
			</a-form-item>
			<!-- 预约时间 -->
			<a-form-item label="预约时间" name="appointment_date">
				<a-date-picker v-model:value="formState.appointment_date" value-format="YYYY-MM-DD" />
			</a-form-item>
			<!-- 预约医生 -->
			<a-form-item label="预约医生" name="appointment_doctor">
				<a-select v-model:value="formState.appointment_doctor" placeholder="请选择预约医生">
					<a-select-option value="Doctor Li">李医生</a-select-option>
					<a-select-option value="Doctor Yang">杨医生</a-select-option>
					<a-select-option value="Doctor Zhang">张医生</a-select-option>
				</a-select>
			</a-form-item>
			<!-- 预约事项 -->
			<a-form-item label="预约事项" name="appointment_item">
				<a-select v-model:value="formState.appointment_item" placeholder="请选择预约事项" mode="multiple">
					<a-select-option value="fillTooth">补牙</a-select-option>
					<a-select-option value="implantTeeth">种牙</a-select-option>
					<a-select-option value="toothwash">洗牙</a-select-option>
				</a-select>
			</a-form-item>
			<!-- 性别 -->
			<a-form-item label="性别" name="appointment_gender">
				<a-radio-group v-model:value="formState.appointment_gender">
					<a-radio value="1">男</a-radio>
					<a-radio value="2">女</a-radio>
				</a-radio-group>
			</a-form-item>
			<!-- 预约备注 -->
			<a-form-item label="预约备注" name="appointment_comment">
				<a-textarea v-model:value="formState.appointment_comment" placeholder="请输入预约备注" :rows="4" />
			</a-form-item>
			<!-- 操作 -->
			<a-form-item :wrapper-col="{ span: 14, offset: 6 }" class="mt-20">
				<a-button type="primary" @click="onFinish">提交预约</a-button>
				<a-button class="ml-20" @click="() => formRef!.resetFields()">重置</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script setup lang="ts" name="basicForm">
import { ref } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import type { FormInstance } from "ant-design-vue";
import { message } from "ant-design-vue";

/* 表单实例 */
const formRef = ref<FormInstance>();
/* 表单规则 */
const rules: Record<string, Rule[]> = {
	appointment_name: [{ type: "string", required: true, message: "请输入预约姓名", trigger: ["change", "blur"] }],
	appointment_phone: [{ type: "string", required: true, message: "请输入预约号码", trigger: "change" }],
	appointment_date: [{ type: "string" as const, required: true, message: "请选择预约时间", trigger: ["change", "blur"] }],
	appointment_doctor: [{ type: "string" as const, required: true, message: "请选择预约医生", trigger: ["change", "blur"] }],
	appointment_comment: [{ type: "string" as const, required: true, message: "请输入预约备注", trigger: ["change", "blur"] }]
};
/* 表单布局 */
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 }
};
/* 表单状态 */
const formState = ref<Record<string, any>>({
	appointment_name: "",
	appointment_phone: "",
	appointment_gender: "1",
	appointment_comment: ""
});
/* 提交 */
const onFinish = async () => {
	try {
		const values = await formRef.value!.validateFields();
		message.success("提交的数据为 : " + JSON.stringify(values));
	} catch (errorInfo) {
		message.error("验证失败，请填写完整信息");
	}
};
</script>

<style scoped lang="less"></style>
