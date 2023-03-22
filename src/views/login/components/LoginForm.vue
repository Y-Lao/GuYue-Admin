<template>
	<a-form>
		<a-form-item name="username" class="login-form-item">
			<a-input placeholder="用户名：admin / user">
				<template #prefix>
					<user-outlined />
				</template>
			</a-input>
		</a-form-item>
		<a-form-item name="password" class="login-form-item">
			<a-input-password placeholder="密码：123456">
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
		<a-button shape="round" size="large" type="primary" class="login-button">
			<template #icon>
				<user-outlined />
			</template>
			登录
		</a-button>
	</div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons-vue";
</script>

<style scoped lang="less">
@import url("../index.less");
</style>
