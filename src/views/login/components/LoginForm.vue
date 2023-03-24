<template>
	<a-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<a-form-item class="login-form-item" name="username">
			<a-input v-model:value="loginForm.username" placeholder="用户名：admin / user">
				<template #prefix>
					<user-outlined />
				</template>
			</a-input>
		</a-form-item>
		<a-form-item class="login-form-item" name="password">
			<a-input-password v-model:value="loginForm.password" placeholder="密码：123456">
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
import { ref, reactive } from "vue";
import { Login } from "@/api/interface";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";

// 定义 formRef (校验规则)
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名!", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码!", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive<Login.ReqLoginForm>({ username: "", password: "" });
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl
		.validate()
		.then(valid => {
			if (!valid) return;
			loading.value = true;
			try {
				// 1.执行登录接口
				console.log("loginForm", loginForm);
			} catch (error) {}
			console.log(valid);
		})
		.catch(() => {
			console.log(2);
		})
		.finally(() => {
			console.log(3);
		});
};
</script>

<style scoped lang="less">
@import url("../index.less");
</style>
