<template>
	<div class="card content-box">
		<a-alert class="w-100 mb-20" message="菜单权限 🍇🍒🥭🍏" type="info" />
		<a-alert
			class="w-100"
			:message="'目前菜单权限使用动态路由实现,模拟后台根据不同用户角色返回对应路由,注意观察左侧菜单变化(admin 账号可查看所有菜单、user 账号只可查看部分菜单)'"
			type="success"
		/>
		<a-button class="mt-20" type="primary" @click="handleToLogin"
			><template #icon><user-outlined /></template>登录其他账号</a-button
		>
	</div>
</template>

<script setup lang="ts" name="menuAuth">
import { useRouter } from "vue-router";
import { LOGIN_URL } from "@/config";
import { useUserStore } from "@/stores/modules/user";

const router = useRouter();
const userStore = useUserStore();

const handleToLogin = () => {
	userStore.setToken("");
	router.push(LOGIN_URL);
};
</script>

<style scoped lang="less"></style>
