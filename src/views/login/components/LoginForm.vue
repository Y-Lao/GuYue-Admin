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
		<a-button shape="round" size="large" class="login-button" @click="resetForm(loginFormRef)">
			<template #icon>
				<close-circle-outlined />
			</template>
			{{ $t("login.reset") }}
		</a-button>
		<a-button shape="round" size="large" type="primary" class="login-button" @click="login(loginFormRef)">
			<template #icon>
				<user-outlined />
			</template>
			{{ $t("login.register") }}
		</a-button>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Login } from "@/api/interface";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import { loginApi } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { getTimeState } from "@/utils/util";
import { HOME_URL } from "@/config";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import md5 from "js-md5";

const router = useRouter();
const tabsStore = useTabsStore();
const userStore = useUserStore();
const keepAliveStore = useKeepAliveStore();

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
	formEl.validate().then(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			// 1.执行登录接口
			const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) });
			userStore.setToken(data.access_token);

			// 2.添加动态路由
			await initDynamicRouter();

			// 3.清空 tabs、keepAlive 保留的数据
			tabsStore.closeMultipleTab();
			keepAliveStore.setKeepAliveName();

			// 4.跳转到首页
			router.push(HOME_URL);
			notification["success"]({
				message: getTimeState(),
				description: "欢迎登录 GuYue-Admin",
				style: { borderRadius: "8px" },
				duration: 3
			});
		} finally {
			loading.value = false;
		}
	});
};

// 清空登录表单
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

onMounted(() => {
	// 监听enter事件（调用登录）
	document.onkeydown = (e: any) => {
		e = window.event || e;
		if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
			if (loading.value) return;
			login(loginFormRef.value);
		}
	};
});
</script>

<style scoped lang="less">
@import url("../index.less");
</style>
