<template>
	<a-dropdown :trigger="['click']" placement="bottom">
		<div class="avatar">
			<img src="@/assets/images/avatar.gif" alt="avatar" />
		</div>
		<template #overlay>
			<a-menu>
				<a-menu-item>
					<div class="item-choice"><user-outlined />{{ $t("header.personalData") }}</div>
				</a-menu-item>
				<a-menu-item>
					<div class="item-choice"><form-outlined />{{ $t("header.changePassword") }}</div>
				</a-menu-item>
				<a-menu-divider />
				<a-menu-item>
					<div class="item-choice"><poweroff-outlined />{{ $t("header.logout") }}</div>
				</a-menu-item>
			</a-menu>
		</template>
	</a-dropdown>
	<!--  -->
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.avatar {
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 50%;
	img {
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
