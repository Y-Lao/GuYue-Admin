<template>
	<a-dropdown :trigger="['click']" placement="bottom">
		<div class="avatar">
			<img src="@/assets/images/avatar.gif" alt="avatar" />
		</div>
		<template #overlay>
			<a-menu>
				<a-menu-item @click="openPwdOrInfoModal('infoRef')">
					<div class="item-choice"><user-outlined />{{ $t("header.personalData") }}</div>
				</a-menu-item>
				<a-menu-item @click="openPwdOrInfoModal('passwordRef')">
					<div class="item-choice"><form-outlined />{{ $t("header.changePassword") }}</div>
				</a-menu-item>
				<a-menu-divider />
				<a-menu-item @click="logout">
					<div class="item-choice"><poweroff-outlined />{{ $t("header.logout") }}</div>
				</a-menu-item>
			</a-menu>
		</template>
	</a-dropdown>
	<!-- 个人信息 -->
	<InfoDialog ref="infoRef" />
	<!-- 修改密码 -->
	<PasswordDialog ref="passwordRef" />
</template>

<script setup lang="ts">
import { ref, createVNode } from "vue";
import { GlobalStore } from "@/stores";
import { LOGIN_URL } from "@/config/config";
import { logoutApi } from "@/api/modules/login";
import { useRouter } from "vue-router";
import { Modal, message } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";

const router = useRouter();
const globalStore = GlobalStore();

// 退出登录
const logout = () => {
	Modal.confirm({
		title: "温馨提示",
		icon: createVNode(ExclamationCircleOutlined),
		content: "您是否确认退出登录？",
		okText: "确定",
		okType: "danger",
		cancelText: "取消",
		async onOk() {
			try {
				// 1.调出退出登录接口
				await logoutApi();
				// 2.清除token
				globalStore.setToken("");
				// 3.重定向到登录页
				router.replace(LOGIN_URL);
				message.success("退出登录成功！");
			} catch {
				message.success("退出登录失败！");
			}
		},
		onCancel() {}
	});
};

interface ModalExpose {
	openModal: () => void;
}
const infoRef = ref<null | ModalExpose>();
const passwordRef = ref<null | ModalExpose>();
// 打开个人信息或修改密码弹窗
const openPwdOrInfoModal = (refName: string) => {
	if (refName == "infoRef") {
		infoRef.value?.openModal();
	} else {
		passwordRef.value?.openModal();
	}
};
</script>

<style scoped lang="less">
.avatar {
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 50%;
	img {
		float: left;
		width: 100%;
		height: 100%;
	}
}
.item-choice {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 80px;
	height: 28px;
}
</style>
