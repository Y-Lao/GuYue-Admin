<template>
	<a-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<a-form-item class="login-form-item">
			<a-input v-model="loginForm.username" placeholder="用户名：admin / user">
				<template #prefix>
					<user-outlined />
				</template>
			</a-input>
		</a-form-item>
		<a-form-item class="login-form-item">
			<a-input-password v-model="loginForm.password" placeholder="密码：123456" :rules="loginRules.password">
				<template #prefix>
					<lock-outlined />
				</template>
			</a-input-password>
		</a-form-item>
	</a-form>
	<div class="login-btn">
		<a-button shape="round" size="large" class="login-button">
			<template #icon>
				<close-circle-outlined />
			</template>
			重置
		</a-button>
		<a-button shape="round" size="large" type="primary" class="login-button" @click="login(loginFormRef)">
			<template #icon>
				<user-outlined />
			</template>
			登录
		</a-button>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Login } from "@/api/interface";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons-vue";
import type { Form } from "ant-design-vue";

// 定义 formRef (校验规则)
type FormInstance = InstanceType<typeof Form>;
const loginFormRef = ref<FormInstance>();
const loginRules = ref({
	username: [{ required: true, message: "请输入用户名!" }],
	password: [{ required: true, message: "请输入密码!" }]
});

const loginForm = ref<Login.ReqLoginForm>({ username: "", password: "" });
const login = (formEl: FormInstance | undefined) => {
	console.log("formEl", formEl);
};
</script>

<style scoped lang="less">
@import url("../index.less");
</style>
